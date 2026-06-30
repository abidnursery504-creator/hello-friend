import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Award, Leaf, Sparkles, Star, Truck, ShieldCheck, Headphones } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { ProductCard } from "@/components/common/ProductCard";
import { CategoryCard } from "@/components/common/CategoryCard";
import { SmartImage } from "@/components/common/SmartImage";
import { categories } from "@/data/categories";
import { bestsellers, newArrivals, products } from "@/data/products";
import { testimonials, site } from "@/data/site";
import { formatBn } from "@/lib/format";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "All Tree BD Shop — Premium Online Nursery in Bangladesh" },
      { name: "description", content: "Shop grafted mango, litchi, lemon and rare tropical plants. 64-district cash on delivery & a 30-day living guarantee." },
      { property: "og:title", content: "All Tree BD Shop — Premium Online Nursery" },
      { property: "og:description", content: "Grafted fruit plants & indoor greens, delivered fresh across Bangladesh." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <PageLayout>
      <Hero />
      <TrustStrip />
      <CategoriesSection />
      <BestsellersSection />
      <PromoBanner />
      <NewArrivalsSection />
      <WhyUs />
      <Testimonials />
      <Newsletter />
    </PageLayout>
  );
}

function Hero() {
  const featured = products[0];
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-radial-leaf" />
      <div className="pointer-events-none absolute -left-32 top-20 size-[480px] rounded-full bg-primary-light/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 size-[420px] rounded-full bg-gold/20 blur-3xl" />

      <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            <Sparkles className="size-3.5" />
            #1 Online Nursery in Bangladesh
          </div>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-balance text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
            Grow what
            <span className="relative inline-block px-2">
              <span className="absolute inset-0 -z-10 -skew-y-2 rounded-2xl bg-gold/30" />
              <span className="text-primary">truly</span>
            </span>
            <br />
            belongs to you.
          </h1>

          <p className="font-bn mt-3 text-xl font-semibold text-primary-dark dark:text-primary-light">
            অনলাইনে গাছের চারা বিক্রয়
          </p>

          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Premium grafted fruit plants, rare tropicals and indoor greens — hand-picked from Bangladesh's best nurseries and delivered to your doorstep, shock-proof and ready to flourish.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/shop" className="group inline-flex items-center gap-2 rounded-full gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:translate-y-[-2px] hover:shadow-gold">
              Shop the collection
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </Link>
            <Link to="/categories" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition hover:bg-card">
              Browse categories
            </Link>
          </div>

          <div className="mt-10 grid max-w-md grid-cols-3 gap-6">
            {[
              { v: "180+", l: "Plant varieties" },
              { v: "64", l: "Districts served" },
              { v: "4.9★", l: "Customer rating" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl font-bold text-foreground sm:text-3xl">{s.v}</div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Hero visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.15 }}
          className="relative mx-auto w-full max-w-lg"
        >
          <div className="relative aspect-[4/5] rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-primary-light/15 to-gold/20 p-3 shadow-elegant">
            <SmartImage
              src={featured.image}
              alt={featured.name}
              aspect="4/5"
              className="rounded-[2rem] shadow-soft"
            />

            {/* Floating cards */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-6 top-10 hidden w-52 rounded-2xl glass-strong p-3 shadow-elegant sm:block"
            >
              <div className="flex items-center gap-3">
                <SmartImage src={products[4].image} alt="" className="size-12 rounded-xl" aspect="square" />
                <div className="min-w-0">
                  <div className="truncate text-xs font-semibold text-foreground">Thai Pink Guava</div>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Star className="size-3 fill-gold text-gold" /> 4.8 · Bestseller
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="absolute -right-4 bottom-16 hidden w-56 rounded-2xl glass-strong p-4 shadow-elegant sm:block"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                <Award className="size-4" /> 30-day living guarantee
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">Every grafted fruit plant is covered.</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 6, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 left-1/4 hidden size-20 place-items-center rounded-full gradient-gold text-gold-foreground shadow-gold sm:grid"
            >
              <div className="text-center">
                <div className="text-[10px] uppercase tracking-wider">Free</div>
                <div className="text-xs font-bold">Delivery</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { Icon: Truck, t: "Free delivery", s: `On orders over ${site.currency}${site.shipping.freeAbove}` },
    { Icon: ShieldCheck, t: "Living guarantee", s: "30-day grafted plant cover" },
    { Icon: Leaf, t: "Hand-picked", s: "From Bangladesh's best growers" },
    { Icon: Headphones, t: "Care support", s: "Bangla & English, 7 days a week" },
  ];
  return (
    <section className="border-y border-border/60 bg-card/40">
      <Container>
        <div className="grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
          {items.map(({ Icon, t, s }) => (
            <div key={t} className="flex items-center gap-3">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-foreground">{t}</div>
                <div className="truncate text-xs text-muted-foreground">{s}</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CategoriesSection() {
  return (
    <Section
      eyebrow="Curated collections"
      title="Shop by category"
      subtitle="From dwarf grafted mangoes to rare tropicals — find your next green companion."
    >
      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {categories.slice(0, 8).map((c, i) => (
          <CategoryCard key={c.slug} category={c} index={i} />
        ))}
      </div>
    </Section>
  );
}

function BestsellersSection() {
  const items = bestsellers().slice(0, 8);
  return (
    <Section
      bg="muted"
      eyebrow="Customer favorites"
      title="Bestselling plants"
      subtitle="The plants our customers can't stop reordering."
    >
      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {items.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
      </div>
      <div className="mt-10 text-center">
        <Link to="/shop" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-accent">
          View all plants <ArrowRight className="size-4" />
        </Link>
      </div>
    </Section>
  );
}

function PromoBanner() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] gradient-primary p-8 text-primary-foreground sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-gold/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-12 size-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="font-bn rounded-full bg-white/15 px-3 py-1 text-xs">মৌসুমি অফার</span>
              <h3 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Monsoon planting season is here.
              </h3>
              <p className="mt-3 max-w-xl text-sm opacity-90 sm:text-base">
                Up to {formatBn(30)}% off on grafted fruit saplings. Free care guide & soil mix with every order above ৳{formatBn(2000)}.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/shop" className="inline-flex items-center gap-2 rounded-full bg-white text-primary px-6 py-3 text-sm font-semibold transition hover:bg-gold hover:text-gold-foreground">
                  Shop the sale <ArrowRight className="size-4" />
                </Link>
                <Link to="/care-guide" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold backdrop-blur transition hover:bg-white/10">
                  Care guides
                </Link>
              </div>
            </div>
            <div className="relative grid grid-cols-2 gap-3">
              {products.slice(1, 5).map((p, i) => (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="overflow-hidden rounded-2xl bg-white/10 backdrop-blur"
                >
                  <SmartImage src={p.image} alt={p.name} aspect="square" className="rounded-none" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function NewArrivalsSection() {
  const items = newArrivals().slice(0, 4);
  if (items.length === 0) return null;
  return (
    <Section
      eyebrow="Just landed"
      title="New arrivals"
      subtitle="Fresh additions from our partner growers — limited stock."
    >
      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {items.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
      </div>
    </Section>
  );
}

function WhyUs() {
  const points = [
    { t: "Grafted, not seeded", d: "We sell true-to-type grafted saplings that fruit 3-5× faster than seed-grown plants." },
    { t: "Museum-grade packing", d: "Shock-proof crates, moisture wicks and breathing channels. Plants arrive as if hand-carried." },
    { t: "Bangla-first support", d: "Our care team replies in Bangla within minutes — and stays with you long after delivery." },
    { t: "Sourced ethically", d: "Direct partnerships with family nurseries across Rajshahi, Rangpur and Cumilla." },
  ];
  return (
    <Section bg="gradient" eyebrow="Why All Tree BD" title="A nursery that feels like a friend." subtitle="Premium products, premium service — without the premium attitude.">
      <div className="grid gap-5 md:grid-cols-2">
        {points.map((p, i) => (
          <motion.div
            key={p.t}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-7 shadow-soft transition hover:shadow-elegant"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/20" />
            <div className="relative">
              <div className="mb-4 inline-grid size-12 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-soft">
                <Leaf className="size-5" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">{p.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Testimonials() {
  return (
    <Section eyebrow="Loved by gardeners" title="Stories from our community" subtitle="Real plants, real homes, real Bangladesh.">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            className="flex flex-col rounded-3xl border border-border/60 bg-card p-6 shadow-soft"
          >
            <div className="flex items-center gap-1 text-gold">
              {Array.from({ length: t.rating }).map((_, k) => <Star key={k} className="size-4 fill-current" />)}
            </div>
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">"{t.text}"</blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
              <img src={t.avatar} alt={t.name} className="size-10 shrink-0 rounded-full" loading="lazy" />
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-foreground">{t.name}</div>
                <div className="truncate text-xs text-muted-foreground">{t.role} · {t.city}</div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}

function Newsletter() {
  return (
    <Section className="!pt-0">
      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 shadow-soft sm:p-14">
        <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 size-72 rounded-full bg-gold/15 blur-3xl" />
        <div className="relative grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              Plant tips, straight from our gardeners.
            </h3>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Seasonal care guides, restock alerts and members-only discounts. No spam, ever.
            </p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 sm:flex-row">
            <input type="email" required placeholder="your@email.com" className="flex-1 rounded-full border border-border bg-background px-5 py-3.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            <button type="submit" className="rounded-full gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:shadow-elegant">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
}
