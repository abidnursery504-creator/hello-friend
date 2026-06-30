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
import { getProductBySlug, getProductsByCategory } from "@/data/products";
import { getCategoryBySlug } from "@/data/categories";
import { formatBDT } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return {};
    return {
      meta: [
        { title: `${p.name} — All Tree BD Shop` },
        { name: "description", content: p.shortDescription },
        { property: "og:title", content: `${p.name} — All Tree BD Shop` },
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
        <h1 className="font-display text-3xl font-bold">Plant not found</h1>
        <Link to="/shop" className="mt-4 inline-block text-primary underline">Back to shop</Link>
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
  const category = getCategoryBySlug(product.category);
  const related = getProductsByCategory(product.category).filter((p) => p.slug !== product.slug).slice(0, 4);
  const gallery = product.gallery.length > 0 ? product.gallery : [product.image];

  return (
    <PageLayout>
      <PageHeader
        bg="default"
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Shop", to: "/shop" },
          ...(category ? [{ label: category.name, to: `/categories/${category.slug}` as const }] : []),
          { label: product.name },
        ]}
        title={product.name}
        subtitle={product.shortDescription}
      />

      <Container className="grid gap-12 py-12 lg:grid-cols-[1.05fr_1fr]">
        {/* Gallery */}
        <div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={active}>
            <SmartImage src={gallery[active]} alt={product.name} aspect="square" className="rounded-3xl shadow-soft" />
          </motion.div>
          {gallery.length > 1 && (
            <div className="mt-4 grid grid-cols-5 gap-3">
              {gallery.map((g: string, i: number) => (
                <button key={g + i} onClick={() => setActive(i)} className={cn("overflow-hidden rounded-xl border-2 transition", i === active ? "border-primary" : "border-transparent opacity-70 hover:opacity-100")}>
                  <SmartImage src={g} alt="" aspect="square" rounded={false} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {product.badges?.map((b: string) => (
              <span key={b} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{b}</span>
            ))}
          </div>

          <p className="font-bn mt-3 text-lg text-primary-dark dark:text-primary-light">{product.nameBn}</p>

          <div className="mt-3 flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1 text-gold">
              {Array.from({ length: Math.round(product.rating) }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}
            </div>
            <span className="font-medium">{product.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">· {product.reviews} reviews</span>
          </div>

          <div className="mt-6 flex items-end gap-3">
            <span className="font-display text-4xl font-bold text-primary">{formatBDT(product.price)}</span>
            {product.oldPrice && (
              <span className="pb-1 text-base text-muted-foreground line-through">{formatBDT(product.oldPrice)}</span>
            )}
          </div>

          <p className="mt-6 text-base leading-relaxed text-foreground/85">{product.description}</p>

          <dl className="mt-6 grid grid-cols-2 gap-3 rounded-3xl border border-border bg-card p-5 text-sm sm:grid-cols-3">
            {[
              { Icon: Ruler, label: "Height", v: product.height },
              { Icon: Leaf, label: "Age", v: product.age },
              { Icon: Sun, label: "Sunlight", v: product.sunlight },
              { Icon: Droplets, label: "Water", v: product.water },
              { Icon: ShieldCheck, label: "Care", v: product.careLevel },
              { Icon: Check, label: "Pot", v: product.potIncluded ? "Included" : "Not included" },
            ].map(({ Icon, label, v }) => (
              <div key={label} className="flex items-start gap-2">
                <Icon className="mt-0.5 size-4 shrink-0 text-primary" />
                <div className="min-w-0">
                  <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</dt>
                  <dd className="truncate font-medium text-foreground">{v}</dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card p-1.5">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease" className="grid size-9 place-items-center rounded-full hover:bg-accent"><MinusCircle className="size-4" /></button>
              <span className="min-w-6 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Increase" className="grid size-9 place-items-center rounded-full hover:bg-accent"><PlusCircle className="size-4" /></button>
            </div>
            <button
              onClick={() => { cart.add(product, qty); toast.success(`${product.name} × ${qty} added`); }}
              disabled={!product.inStock}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:shadow-elegant disabled:opacity-50 sm:flex-initial"
            >
              <ShoppingBag className="size-4" /> {product.inStock ? "Add to cart" : "Out of stock"}
            </button>
            <button
              onClick={() => wish.toggle(product.slug)}
              aria-label="Wishlist"
              className={cn("grid size-12 place-items-center rounded-full border border-border bg-card transition hover:bg-accent", wish.has(product.slug) && "text-destructive")}
            >
              <Heart className={cn("size-4", wish.has(product.slug) && "fill-destructive")} />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl bg-primary/5 p-4 text-sm">
              <Truck className="size-5 text-primary" />
              <div>
                <div className="font-semibold">Free delivery</div>
                <div className="text-xs text-muted-foreground">On orders over ৳1,500</div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-gold/10 p-4 text-sm">
              <ShieldCheck className="size-5 text-gold-foreground" />
              <div>
                <div className="font-semibold">Living guarantee</div>
                <div className="text-xs text-muted-foreground">30-day cover on grafted plants</div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {related.length > 0 && (
        <Section bg="muted" eyebrow="You may also love" title="Related plants">
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {related.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
          </div>
        </Section>
      )}
    </PageLayout>
  );
}
