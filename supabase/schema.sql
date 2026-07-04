-- All Tree BD Shop — full schema: catalog, auth/profiles, orders, addresses, wishlists.
-- Idempotent: safe to re-run against the same project.

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────────────────
-- profiles (1:1 with auth.users)
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  phone text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Bypasses RLS on public.orders (security definer) so the order_items insert
-- policy below can see a just-inserted guest order (user_id is null), which
-- the caller's own SELECT policy on orders would otherwise hide from them
-- since auth.uid() = user_id is never true for a null user_id.
create or replace function public.order_is_guest_or_own(p_order_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.orders o
    where o.id = p_order_id
      and (o.user_id is null or o.user_id = auth.uid())
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Prevent a logged-in non-admin from granting themselves the admin role.
-- auth.uid() is null for service-role/backend calls (e.g. promoting the
-- first admin via the SQL editor or a trusted script), so those are exempt.
create or replace function public.prevent_self_role_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role <> old.role and auth.uid() is not null and not public.is_admin() then
    new.role := old.role;
  end if;
  return new;
end;
$$;

drop trigger if exists guard_profile_role on public.profiles;
create trigger guard_profile_role
  before update on public.profiles
  for each row execute function public.prevent_self_role_escalation();

-- ─────────────────────────────────────────────────────────────────────────
-- categories
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  name_bn text not null,
  description text,
  image text,
  accent text default 'green' check (accent in ('green', 'gold', 'lime')),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────
-- products
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  name_bn text not null,
  category text references public.categories(slug) on update cascade,
  price numeric(10, 2) not null default 0,
  old_price numeric(10, 2),
  rating numeric(2, 1) default 4.5,
  reviews int default 0,
  image text,
  gallery text[] default '{}',
  badges text[] default '{}',
  short_description text,
  description text,
  height text,
  age text,
  pot_included boolean default true,
  in_stock boolean default true,
  care_level text check (care_level in ('সহজ', 'মাঝারি', 'এক্সপার্ট')),
  sunlight text check (sunlight in ('পূর্ণ রোদ', 'আংশিক ছায়া', 'ইনডোর উজ্জ্বল')),
  water text check (water in ('কম', 'মাঝারি', 'বেশি')),
  free_delivery boolean not null default false,
  custom_delivery_charge numeric(10, 2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products add column if not exists free_delivery boolean not null default false;
alter table public.products add column if not exists custom_delivery_charge numeric(10, 2);

create index if not exists products_category_idx on public.products(category);
create index if not exists products_slug_idx on public.products(slug);

-- ─────────────────────────────────────────────────────────────────────────
-- site_settings: single-row key-value table for site-wide config (e.g. the
-- default delivery charge), editable from the admin dashboard instead of
-- being hardcoded in the frontend.
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (key, value)
values ('default_delivery_charge', '120')
on conflict (key) do nothing;

create or replace view public.category_counts as
  select category as slug, count(*)::int as count
  from public.products
  group by category;

-- ─────────────────────────────────────────────────────────────────────────
-- blog_posts / testimonials / faqs
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  cover text,
  author text,
  published_at date not null default current_date,
  read_time text,
  category text,
  content text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  city text,
  rating int check (rating between 1 and 5),
  text text,
  avatar text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────
-- addresses / wishlists
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text,
  line text not null,
  city text,
  district text,
  phone text,
  is_default boolean default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.wishlists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_slug text not null references public.products(slug) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, product_slug)
);

-- ─────────────────────────────────────────────────────────────────────────
-- landing_pages: standalone campaign pages, independent of the product catalog
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.landing_pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  is_active boolean not null default true,
  headline text not null,
  hero_image text,
  product_name text not null,
  price numeric(10, 2) not null default 0,
  old_price numeric(10, 2),
  description text,
  gallery text[] default '{}',
  testimonials jsonb not null default '[]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists landing_pages_slug_idx on public.landing_pages(slug);

-- ─────────────────────────────────────────────────────────────────────────
-- orders / order_items
-- ─────────────────────────────────────────────────────────────────────────
create sequence if not exists public.order_number_seq start 10001;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null default ('ATB-' || nextval('public.order_number_seq')),
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  shipping_address text not null,
  shipping_division text,
  shipping_district text,
  shipping_upazila text,
  shipping_note text,
  source text,
  subtotal numeric(10, 2) not null default 0,
  shipping_fee numeric(10, 2) not null default 0,
  total numeric(10, 2) not null default 0,
  payment_method text not null default 'cod',
  status text not null default 'processing' check (status in ('processing', 'shipped', 'delivered', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_user_idx on public.orders(user_id);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_slug text,
  product_name text,
  product_image text,
  unit_price numeric(10, 2) not null,
  qty int not null default 1,
  created_at timestamptz not null default now()
);

create index if not exists order_items_order_idx on public.order_items(order_id);

create or replace view public.customer_summary as
  select
    coalesce(user_id::text, customer_phone) as customer_key,
    max(customer_name) as name,
    max(customer_phone) as phone,
    max(customer_email) as email,
    max(shipping_district) as city,
    count(*)::int as order_count,
    sum(total) as total_spent,
    min(created_at) as first_order_at
  from public.orders
  group by coalesce(user_id::text, customer_phone);

-- ─────────────────────────────────────────────────────────────────────────
-- updated_at triggers
-- ─────────────────────────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare
  t text;
begin
  foreach t in array array['profiles','categories','products','blog_posts','addresses','orders','landing_pages','site_settings']
  loop
    execute format('drop trigger if exists set_updated_at on public.%I', t);
    execute format('create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at()', t);
  end loop;
end $$;

-- ─────────────────────────────────────────────────────────────────────────
-- Row Level Security
-- ─────────────────────────────────────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.blog_posts enable row level security;
alter table public.testimonials enable row level security;
alter table public.faqs enable row level security;
alter table public.addresses enable row level security;
alter table public.wishlists enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.landing_pages enable row level security;
alter table public.site_settings enable row level security;

-- profiles
drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin" on public.profiles
  for select using (auth.uid() = id or public.is_admin());

drop policy if exists "profiles_update_own_or_admin" on public.profiles;
create policy "profiles_update_own_or_admin" on public.profiles
  for update using (auth.uid() = id or public.is_admin());

-- catalog: public read, admin write
drop policy if exists "categories_public_read" on public.categories;
create policy "categories_public_read" on public.categories for select using (true);
drop policy if exists "categories_admin_write" on public.categories;
create policy "categories_admin_write" on public.categories for all
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "products_public_read" on public.products;
create policy "products_public_read" on public.products for select using (true);
drop policy if exists "products_admin_write" on public.products;
create policy "products_admin_write" on public.products for all
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "site_settings_public_read" on public.site_settings;
create policy "site_settings_public_read" on public.site_settings for select using (true);
drop policy if exists "site_settings_admin_write" on public.site_settings;
create policy "site_settings_admin_write" on public.site_settings for all
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "blog_posts_public_read" on public.blog_posts;
create policy "blog_posts_public_read" on public.blog_posts for select using (true);
drop policy if exists "blog_posts_admin_write" on public.blog_posts;
create policy "blog_posts_admin_write" on public.blog_posts for all
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "testimonials_public_read" on public.testimonials;
create policy "testimonials_public_read" on public.testimonials for select using (true);
drop policy if exists "testimonials_admin_write" on public.testimonials;
create policy "testimonials_admin_write" on public.testimonials for all
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "faqs_public_read" on public.faqs;
create policy "faqs_public_read" on public.faqs for select using (true);
drop policy if exists "faqs_admin_write" on public.faqs;
create policy "faqs_admin_write" on public.faqs for all
  using (public.is_admin()) with check (public.is_admin());

-- addresses: user-scoped only
drop policy if exists "addresses_owner_all" on public.addresses;
create policy "addresses_owner_all" on public.addresses for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- wishlists: user-scoped only
drop policy if exists "wishlists_owner_all" on public.wishlists;
create policy "wishlists_owner_all" on public.wishlists for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- orders: owner or admin read; guest+owner insert; admin update/delete
drop policy if exists "orders_select_own_or_admin" on public.orders;
create policy "orders_select_own_or_admin" on public.orders for select
  using (auth.uid() = user_id or public.is_admin());

-- Guest checkout: allow inserts with no user_id (guest) or a user_id that
-- matches the authenticated caller. A guest (auth.uid() is null) cannot set
-- someone else's user_id, and a logged-in user cannot set a different one.
drop policy if exists "orders_insert_own" on public.orders;
drop policy if exists "orders_insert_guest_or_own" on public.orders;
create policy "orders_insert_guest_or_own" on public.orders for insert
  with check (user_id is null or user_id = auth.uid());

drop policy if exists "orders_admin_update" on public.orders;
create policy "orders_admin_update" on public.orders for update
  using (public.is_admin());

drop policy if exists "orders_admin_delete" on public.orders;
create policy "orders_admin_delete" on public.orders for delete
  using (public.is_admin());

-- order_items: readable if parent order is readable; insertable alongside order
drop policy if exists "order_items_select_via_order" on public.order_items;
create policy "order_items_select_via_order" on public.order_items for select
  using (exists (
    select 1 from public.orders o
    where o.id = order_items.order_id
      and (o.user_id = auth.uid() or public.is_admin())
  ));

drop policy if exists "order_items_insert_via_order" on public.order_items;
create policy "order_items_insert_via_order" on public.order_items for insert
  with check (public.order_is_guest_or_own(order_items.order_id));

drop policy if exists "order_items_admin_write" on public.order_items;
create policy "order_items_admin_write" on public.order_items for all
  using (public.is_admin()) with check (public.is_admin());

-- landing_pages: public can read only active pages; admin has full access
drop policy if exists "landing_pages_public_read_active" on public.landing_pages;
create policy "landing_pages_public_read_active" on public.landing_pages for select
  using (is_active or public.is_admin());

drop policy if exists "landing_pages_admin_write" on public.landing_pages;
create policy "landing_pages_admin_write" on public.landing_pages for all
  using (public.is_admin()) with check (public.is_admin());
