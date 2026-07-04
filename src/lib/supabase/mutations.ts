import { getSupabaseBrowserClient } from "./browser";
import { pushStatusToSheet } from "./sheetStatusPush.server";
import type { Product } from "@/data/products";
import type { Category } from "@/data/categories";

export type ProductInput = Omit<Product, "reviews" | "rating"> & {
  rating?: number;
  reviews?: number;
};

function toProductRow(p: ProductInput) {
  return {
    slug: p.slug,
    name: p.name,
    name_bn: p.nameBn,
    category: p.category,
    price: p.price,
    old_price: p.oldPrice ?? null,
    rating: p.rating ?? 4.5,
    reviews: p.reviews ?? 0,
    image: p.image,
    gallery: p.gallery,
    badges: p.badges ?? [],
    short_description: p.shortDescription,
    description: p.description,
    height: p.height,
    age: p.age,
    pot_included: p.potIncluded,
    in_stock: p.inStock,
    care_level: p.careLevel,
    sunlight: p.sunlight,
    water: p.water,
    free_delivery: p.freeDelivery ?? false,
    custom_delivery_charge: p.customDeliveryCharge ?? null,
  };
}

export async function upsertProduct(p: ProductInput) {
  const { error } = await getSupabaseBrowserClient()
    .from("products")
    .upsert(toProductRow(p), { onConflict: "slug" });
  if (error) throw error;
}

export async function deleteProduct(slug: string) {
  const { error } = await getSupabaseBrowserClient().from("products").delete().eq("slug", slug);
  if (error) throw error;
}

export type CategoryInput = Omit<Category, "count">;

function toCategoryRow(c: CategoryInput) {
  return {
    slug: c.slug,
    name: c.name,
    name_bn: c.nameBn,
    description: c.description,
    image: c.image,
    accent: c.accent,
  };
}

export async function upsertCategory(c: CategoryInput) {
  const { error } = await getSupabaseBrowserClient()
    .from("categories")
    .upsert(toCategoryRow(c), { onConflict: "slug" });
  if (error) throw error;
}

export async function deleteCategory(slug: string) {
  const { error } = await getSupabaseBrowserClient().from("categories").delete().eq("slug", slug);
  if (error) throw error;
}

export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

export async function updateOrderStatus(orderId: string, status: OrderStatus, orderNumber: string) {
  const { error } = await getSupabaseBrowserClient()
    .from("orders")
    .update({ status })
    .eq("id", orderId);
  if (error) throw error;
  pushStatusToSheet({ data: { orderNumber, status } }).catch(() => {});
}

export type LandingPageInput = {
  id?: string;
  slug: string;
  isActive: boolean;
  headline: string;
  heroImage: string | null;
  productName: string;
  price: number;
  oldPrice: number | null;
  description: string | null;
  gallery: string[];
  testimonials: { name: string; text: string; city?: string; avatar?: string }[];
};

function toLandingPageRow(p: LandingPageInput) {
  return {
    slug: p.slug,
    is_active: p.isActive,
    headline: p.headline,
    hero_image: p.heroImage,
    product_name: p.productName,
    price: p.price,
    old_price: p.oldPrice,
    description: p.description,
    gallery: p.gallery,
    testimonials: p.testimonials,
  };
}

export async function upsertLandingPage(p: LandingPageInput) {
  const client = getSupabaseBrowserClient();
  if (p.id) {
    const { error } = await client.from("landing_pages").update(toLandingPageRow(p)).eq("id", p.id);
    if (error) throw error;
  } else {
    const { error } = await client.from("landing_pages").insert(toLandingPageRow(p));
    if (error) throw error;
  }
}

export async function deleteLandingPage(id: string) {
  const { error } = await getSupabaseBrowserClient().from("landing_pages").delete().eq("id", id);
  if (error) throw error;
}

export async function updateDefaultDeliveryCharge(amount: number) {
  const { error } = await getSupabaseBrowserClient()
    .from("site_settings")
    .upsert({ key: "default_delivery_charge", value: amount }, { onConflict: "key" });
  if (error) throw error;
}
