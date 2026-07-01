import { getSupabaseBrowserClient } from "./browser";
import type { Product } from "@/data/products";
import type { Category } from "@/data/categories";
import type { Testimonial, BlogPost } from "@/data/site";

// snake_case DB rows -> the exact camelCase shapes the UI already expects,
// so components like ProductCard/SmartImage/product pages need no changes.

type ProductRow = {
  slug: string;
  name: string;
  name_bn: string;
  category: string;
  price: number;
  old_price: number | null;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  badges: string[];
  short_description: string;
  description: string;
  height: string;
  age: string;
  pot_included: boolean;
  in_stock: boolean;
  care_level: Product["careLevel"];
  sunlight: Product["sunlight"];
  water: Product["water"];
};

function mapProduct(row: ProductRow): Product {
  return {
    slug: row.slug,
    name: row.name,
    nameBn: row.name_bn,
    category: row.category,
    price: Number(row.price),
    oldPrice: row.old_price != null ? Number(row.old_price) : undefined,
    rating: Number(row.rating),
    reviews: row.reviews,
    image: row.image,
    gallery: row.gallery ?? [],
    badges: (row.badges ?? []) as Product["badges"],
    shortDescription: row.short_description,
    description: row.description,
    height: row.height,
    age: row.age,
    potIncluded: row.pot_included,
    inStock: row.in_stock,
    careLevel: row.care_level,
    sunlight: row.sunlight,
    water: row.water,
  };
}

type CategoryRow = {
  slug: string;
  name: string;
  name_bn: string;
  description: string;
  image: string;
  accent: Category["accent"];
};

function mapCategory(row: CategoryRow, count: number): Category {
  return {
    slug: row.slug,
    name: row.name,
    nameBn: row.name_bn,
    description: row.description,
    image: row.image,
    count,
    accent: row.accent,
  };
}

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await getSupabaseBrowserClient()
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as ProductRow[]).map(mapProduct);
}

export async function fetchProductBySlug(slug: string): Promise<Product | undefined> {
  const { data, error } = await getSupabaseBrowserClient()
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data ? mapProduct(data as ProductRow) : undefined;
}

export async function fetchProductsByCategory(slug: string): Promise<Product[]> {
  const { data, error } = await getSupabaseBrowserClient()
    .from("products")
    .select("*")
    .eq("category", slug)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as ProductRow[]).map(mapProduct);
}

export async function fetchCategories(): Promise<Category[]> {
  const client = getSupabaseBrowserClient();
  const [{ data: rows, error }, { data: counts, error: countErr }] = await Promise.all([
    client.from("categories").select("*").order("sort_order", { ascending: true }),
    client.from("category_counts").select("*"),
  ]);
  if (error) throw error;
  if (countErr) throw countErr;
  const countMap = new Map((counts as { slug: string; count: number }[]).map((c) => [c.slug, c.count]));
  return (rows as CategoryRow[]).map((r) => mapCategory(r, countMap.get(r.slug) ?? 0));
}

export async function fetchCategoryBySlug(slug: string): Promise<Category | undefined> {
  const client = getSupabaseBrowserClient();
  const [{ data: row, error }, { data: countRow }] = await Promise.all([
    client.from("categories").select("*").eq("slug", slug).maybeSingle(),
    client.from("category_counts").select("*").eq("slug", slug).maybeSingle(),
  ]);
  if (error) throw error;
  if (!row) return undefined;
  return mapCategory(row as CategoryRow, (countRow as { count: number } | null)?.count ?? 0);
}

type TestimonialRow = { name: string; role: string; city: string; rating: number; text: string; avatar: string };

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await getSupabaseBrowserClient()
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data as TestimonialRow[];
}

type BlogPostRow = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  author: string;
  published_at: string;
  read_time: string;
  category: string;
  content: string;
};

function mapBlogPost(row: BlogPostRow): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    cover: row.cover,
    author: row.author,
    date: new Date(row.published_at).toLocaleDateString("bn-BD", { year: "numeric", month: "long", day: "numeric" }),
    readTime: row.read_time,
    category: row.category,
    content: row.content,
  };
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await getSupabaseBrowserClient()
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false });
  if (error) throw error;
  return (data as BlogPostRow[]).map(mapBlogPost);
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const { data, error } = await getSupabaseBrowserClient()
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data ? mapBlogPost(data as BlogPostRow) : undefined;
}

export type OrderRow = {
  id: string;
  order_number: string;
  user_id: string | null;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  shipping_address: string;
  shipping_city: string | null;
  shipping_district: string | null;
  shipping_note: string | null;
  subtotal: number;
  shipping_fee: number;
  total: number;
  payment_method: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  created_at: string;
};

export async function fetchOrders(): Promise<OrderRow[]> {
  const { data, error } = await getSupabaseBrowserClient()
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as OrderRow[];
}

export async function fetchMyOrders(userId: string): Promise<OrderRow[]> {
  const { data, error } = await getSupabaseBrowserClient()
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as OrderRow[];
}

export type CustomerSummaryRow = {
  customer_key: string;
  name: string;
  phone: string;
  email: string | null;
  city: string | null;
  order_count: number;
  total_spent: number;
  first_order_at: string;
};

export async function fetchCustomers(): Promise<CustomerSummaryRow[]> {
  const { data, error } = await getSupabaseBrowserClient()
    .from("customer_summary")
    .select("*")
    .order("total_spent", { ascending: false });
  if (error) throw error;
  return data as CustomerSummaryRow[];
}

export type AddressRow = {
  id: string;
  label: string | null;
  line: string;
  city: string | null;
  district: string | null;
  phone: string | null;
  is_default: boolean;
};

export async function fetchAddresses(userId: string): Promise<AddressRow[]> {
  const { data, error } = await getSupabaseBrowserClient()
    .from("addresses")
    .select("*")
    .eq("user_id", userId)
    .order("is_default", { ascending: false });
  if (error) throw error;
  return data as AddressRow[];
}

export async function fetchFaqs() {
  const { data, error } = await getSupabaseBrowserClient()
    .from("faqs")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data as { question: string; answer: string }[]).map((f) => ({ q: f.question, a: f.answer }));
}
