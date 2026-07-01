// One-time seed: migrates src/data/{products,categories,site}.ts into Supabase.
// Local product/category images are uploaded to Cloudinary; Unsplash/Pravatar
// URLs are left as-is. Uses the service-role key to bypass RLS (trusted,
// local-only script — never runs in the deployed app). Idempotent: upserts
// on slug, safe to re-run.
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { createServer } from "vite";
import { createClient } from "@supabase/supabase-js";

const root = fileURLToPath(new URL("..", import.meta.url));

for (const line of readFileSync(join(root, ".env"), "utf-8").split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) process.env[m[1]] ??= m[2];
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const CLOUD_NAME = process.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const imageCache = new Map();

async function uploadLocalImage(assetUrl) {
  // Vite dev-serves local asset imports as absolute /@fs/... or /assets/... URLs;
  // resolve to a real file path on disk instead of fetching over HTTP.
  let filePath = assetUrl.split("?")[0];
  if (filePath.startsWith("/@fs/")) filePath = filePath.slice("/@fs".length);
  else filePath = join(root, filePath.replace(/^\//, ""));

  if (!existsSync(filePath)) return assetUrl; // already a remote URL (Unsplash etc.)
  if (imageCache.has(filePath)) return imageCache.get(filePath);

  const bytes = readFileSync(filePath);
  const form = new FormData();
  form.append("file", new Blob([bytes]), filePath.split(/[\\/]/).pop());
  form.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) throw new Error(`Cloudinary upload failed for ${filePath}: ${await res.text()}`);
  const json = await res.json();
  imageCache.set(filePath, json.secure_url);
  console.log(`  uploaded ${filePath.split(/[\\/]/).pop()} -> ${json.secure_url}`);
  return json.secure_url;
}

async function resolveImage(url) {
  if (!url) return url;
  if (/^https?:\/\/(images\.unsplash\.com|i\.pravatar\.cc|res\.cloudinary\.com)/.test(url)) return url;
  return uploadLocalImage(url);
}

async function main() {
  const server = await createServer({ root, server: { middlewareMode: true }, appType: "custom" });
  const { products } = await server.ssrLoadModule("/src/data/products.ts");
  const { categories } = await server.ssrLoadModule("/src/data/categories.ts");
  const { testimonials, posts, faqs } = await server.ssrLoadModule("/src/data/site.ts");
  await server.close();

  console.log(`Loaded ${categories.length} categories, ${products.length} products, ${posts.length} posts.`);

  console.log("Seeding categories...");
  for (const c of categories) {
    const image = await resolveImage(c.image);
    const { error } = await supabase.from("categories").upsert(
      { slug: c.slug, name: c.name, name_bn: c.nameBn, description: c.description, image, accent: c.accent },
      { onConflict: "slug" },
    );
    if (error) throw new Error(`category ${c.slug}: ${error.message}`);
  }

  console.log("Seeding products...");
  for (const p of products) {
    const image = await resolveImage(p.image);
    const gallery = await Promise.all((p.gallery ?? []).map(resolveImage));
    const { error } = await supabase.from("products").upsert(
      {
        slug: p.slug,
        name: p.name,
        name_bn: p.nameBn,
        category: p.category,
        price: p.price,
        old_price: p.oldPrice ?? null,
        rating: p.rating,
        reviews: p.reviews,
        image,
        gallery,
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
      },
      { onConflict: "slug" },
    );
    if (error) throw new Error(`product ${p.slug}: ${error.message}`);
  }

  console.log("Seeding testimonials...");
  for (const [i, t] of testimonials.entries()) {
    const { error } = await supabase.from("testimonials").insert({
      name: t.name, role: t.role, city: t.city, rating: t.rating, text: t.text, avatar: t.avatar, sort_order: i,
    });
    if (error && error.code !== "23505") throw new Error(`testimonial ${t.name}: ${error.message}`);
  }

  console.log("Seeding blog posts...");
  for (const p of posts) {
    const cover = await resolveImage(p.cover);
    const { error } = await supabase.from("blog_posts").upsert(
      {
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        cover,
        author: p.author,
        published_at: new Date().toISOString().slice(0, 10),
        read_time: p.readTime,
        category: p.category,
        content: p.content,
      },
      { onConflict: "slug" },
    );
    if (error) throw new Error(`post ${p.slug}: ${error.message}`);
  }

  console.log("Seeding FAQs...");
  for (const [i, f] of faqs.entries()) {
    const { error } = await supabase.from("faqs").insert({ question: f.q, answer: f.a, sort_order: i });
    if (error && error.code !== "23505") throw new Error(`faq ${i}: ${error.message}`);
  }

  console.log("Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
