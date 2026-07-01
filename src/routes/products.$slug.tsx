import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Droplets, Heart, Leaf, MinusCircle, PlusCircle, Ruler, ShieldCheck, ShoppingBag, Star, Sun, Truck } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { SmartImage } from "@/components/common/SmartImage";
import { ProductCard } from "@/components/common/ProductCard";
import { ensureProduct, useCategory, useProductsByCategory } from "@/hooks/useCatalog";
import { formatBDT, toBnDigits } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/products/$slug")({
  loader: async ({ params, context }) => {
    const product = await ensureProduct(context.queryClient, params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return {};
    return {
      meta: [
        { title: `${p.name} — অল ট্রি বিডি শপ` },
        { name: "description", content: p.shortDescription },
        { property: "og:title", content: `${p.name} — অল ট্রি বিডি শপ` },
        { property: "og:description", content: p.shortDescription },
        { property: "og:image", content: p.image },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/products/${p.slug}` },
      ],
      links: [{ rel: "canonical", href: `/products/${p.slug}` }],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <PageLayout>
      <Container className="py-24 text-center">
        <h1 className="font-bn font-display text-3xl font-bold">গাছটি পাওয়া যায়নি</h1>
        <Link to="/shop" className="font-bn mt-4 inline-block text-primary underline">শপে ফিরে যান</Link>
      </Container>
    </PageLayout>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const cart = useCart();
  const wish = useWishlist();
  const { data: category } = useCategory(product.category);
  const { data: sameCategory = [] } = useProductsByCategory(product.category);
  const related = sameCategory.filter((p) => p.slug !== product.slug).slice(0, 4);
  const gallery = product.gallery.length > 0 ? product.gallery : [product.image];

  return (
    <PageLayout>
      <PageHeader
        bg="default"
        crumbs={[
          { label: "হোম", to: "/" },
          { label: "শপ", to: "/shop" },
          ...(category ? [{ label: category.name, to: `/categories/${category.slug}` as const }] : []),
          { label: product.name },
        ]}
        title={product.name}
        subtitle={product.shortDescription}
      />

      <Container className="grid gap-12 py-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={active}>
            <SmartImage src={gallery[active]} alt={product.name} aspect="square" className="rounded-3xl shadow-soft" />
          </motion.div>
          {gallery.length > 1 && (
            <div className="mt-4 grid grid-cols-5 gap-3">
              {gallery.map((g: string, i: number) => (
                <button key={g + i} type="button" onClick={() => setActive(i)} aria-label={`ছবি ${toBnDigits(i + 1)} দেখুন`} aria-pressed={i === active} className={cn("overflow-hidden rounded-xl border-2 transition", i === active ? "border-primary" : "border-transparent opacity-70 hover:opacity-100")}>
                  <SmartImage src={g} alt="" aspect="square" rounded={false} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            {product.badges?.map((b: string) => (
              <span key={b} className="font-bn rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{b}</span>
            ))}
          </div>

          <div className="font-bn mt-3 flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1 text-gold">
              {Array.from({ length: Math.round(product.rating) }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}
            </div>
            <span className="font-medium">{toBnDigits(product.rating.toFixed(1))}</span>
            <span className="text-muted-foreground">· {toBnDigits(product.reviews)} রিভিউ</span>
          </div>

          <div className="font-bn mt-6 flex items-end gap-3">
            <span className="font-display text-4xl font-bold text-primary">{formatBDT(product.price)}</span>
            {product.oldPrice && (
              <span className="pb-1 text-base text-muted-foreground line-through">{formatBDT(product.oldPrice)}</span>
            )}
          </div>

          <p className="font-bn mt-6 text-base leading-relaxed text-foreground/85">{product.description}</p>

          <dl className="mt-6 grid grid-cols-2 gap-3 rounded-3xl border border-border bg-card p-5 text-sm sm:grid-cols-3">
            {[
              { Icon: Ruler, label: "উচ্চতা", v: product.height },
              { Icon: Leaf, label: "বয়স", v: product.age },
              { Icon: Sun, label: "সূর্যালোক", v: product.sunlight },
              { Icon: Droplets, label: "পানি", v: product.water },
              { Icon: ShieldCheck, label: "পরিচর্যা", v: product.careLevel },
              { Icon: Check, label: "পাত্র", v: product.potIncluded ? "অন্তর্ভুক্ত" : "নেই" },
            ].map(({ Icon, label, v }) => (
              <div key={label} className="flex items-start gap-2">
                <Icon className="mt-0.5 size-4 shrink-0 text-primary" />
                <div className="min-w-0">
                  <dt className="font-bn text-[11px] tracking-wide text-muted-foreground">{label}</dt>
                  <dd className="font-bn truncate font-medium text-foreground">{v}</dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card p-1.5">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="কমান" className="grid size-9 place-items-center rounded-full hover:bg-accent"><MinusCircle className="size-4" /></button>
              <span className="font-bn min-w-6 text-center font-semibold">{toBnDigits(qty)}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="বাড়ান" className="grid size-9 place-items-center rounded-full hover:bg-accent"><PlusCircle className="size-4" /></button>
            </div>
            <button
              onClick={() => { cart.add(product, qty); toast.success(`${product.name} × ${toBnDigits(qty)} কার্টে যোগ হয়েছে`); }}
              disabled={!product.inStock}
              className="font-bn inline-flex flex-1 items-center justify-center gap-2 rounded-full gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:shadow-elegant disabled:opacity-50 sm:flex-initial"
            >
              <ShoppingBag className="size-4" /> {product.inStock ? "কার্টে যোগ করুন" : "স্টক শেষ"}
            </button>
            <button
              onClick={() => wish.toggle(product.slug)}
              aria-label="ইচ্ছার তালিকা"
              className={cn("grid size-12 place-items-center rounded-full border border-border bg-card transition hover:bg-accent", wish.has(product.slug) && "text-destructive")}
            >
              <Heart className={cn("size-4", wish.has(product.slug) && "fill-destructive")} />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl bg-primary/5 p-4 text-sm">
              <Truck className="size-5 text-primary" />
              <div>
                <div className="font-bn font-semibold">ফ্রি ডেলিভারি</div>
                <div className="font-bn text-xs text-muted-foreground">৳১,৫০০+ অর্ডারে</div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-gold/10 p-4 text-sm">
              <ShieldCheck className="size-5 text-gold-foreground" />
              <div>
                <div className="font-bn font-semibold">লিভিং গ্যারান্টি</div>
                <div className="font-bn text-xs text-muted-foreground">গ্রাফটিং গাছে ৩০ দিনের</div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {related.length > 0 && (
        <Section bg="muted" eyebrow="আপনি পছন্দ করতে পারেন" title="সম্পর্কিত গাছ">
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {related.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
          </div>
        </Section>
      )}
    </PageLayout>
  );
}
