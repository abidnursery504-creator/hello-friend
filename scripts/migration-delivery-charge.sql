-- Run this once in the Supabase SQL Editor to add per-product delivery
-- charge overrides and a dashboard-editable default delivery charge.
-- Safe to re-run (idempotent).

alter table public.products add column if not exists free_delivery boolean not null default false;
alter table public.products add column if not exists custom_delivery_charge numeric(10, 2);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (key, value)
values ('default_delivery_charge', '120')
on conflict (key) do nothing;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at on public.site_settings;
create trigger set_updated_at before update on public.site_settings
  for each row execute function public.set_updated_at();

alter table public.site_settings enable row level security;

drop policy if exists "site_settings_public_read" on public.site_settings;
create policy "site_settings_public_read" on public.site_settings for select using (true);

drop policy if exists "site_settings_admin_write" on public.site_settings;
create policy "site_settings_admin_write" on public.site_settings for all
  using (public.is_admin()) with check (public.is_admin());
