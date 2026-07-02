import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, ChevronLeft, ChevronRight, Truck, Wallet, ShieldCheck,
  Headphones, Sparkles, Star, Quote, ArrowUpRight, Leaf,
} from "lucide-react";
import { Container } from "@/components/common/Container";
import { SmartImage } from "@/components/common/SmartImage";
import { ProductCard } from "@/components/common/ProductCard";
import type { Product } from "@/data/products";
import type { Testimonial, BlogPost } from "@/data/site";
import { useProducts, useTestimonials, useBlogPosts, selectBestsellers, selectNewArrivals, selectByCategory } from "@/hooks/useCatalog";
import { cn } from "@/lib/utils";
import { onImgError } from "@/lib/img";
import hero1 from "@/assets/hero-plants-1.jpg";
import hero2 from "@/assets/hero-plants-2.jpg";
import hero3 from "@/assets/hero-plants-3.jpg";
import deliveryBanner from "@/assets/delivery-banner.jpg";
import catFruitBanner from "@/assets/cat-fruit-banner.jpg";
import catFlowerBanner from "@/assets/cat-flower-banner.jpg";


/* ───────────── HERO SLIDER (light, split layout — reference style) ───────────── */
const SLIDES = [
  {
    image: hero1,
    eyebrowBn: "প্রিমিয়াম নার্সারি",
    titleBn: "ফল ও ফুলের গাছ",
    subBn: "এখন আপনার হাতের নাগালে",
    metaBn: "উন্নত মানের গাছ | সঠিক পরিচর্যার গাইড | সারা বাংলাদেশে ডেলিভারি",
    to: "/shop",
  },
  {
    image: hero2,
    eyebrowBn: "ফুলের সংগ্রহ",
    titleBn: "প্রিমিয়াম ফুলের গাছ",
    subBn: "রঙিন বাগানের শুরু এখানেই",
    metaBn: "গোলাপ · জবা · বাগানবিলাস · মৌসুমী ফুল — সবই এক জায়গায়",
    to: "/categories/flowering",
  },
  {
    image: hero3,
    eyebrowBn: "গ্রাফটিং ফলের চারা",
    titleBn: "ফলদ গাছের সেরা সংগ্রহ",
    subBn: "দ্রুত ফলদানে সক্ষম মাতৃ গাছ",
    metaBn: "আম · লেবু · মাল্টা · ড্রাগন — ১৮–২৪ মাসেই ফল",
    to: "/categories/mango",
  },
];

function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, [paused]);
  const go = (n: number) => setI((n + SLIDES.length) % SLIDES.length);
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); }
  };
  const s = SLIDES[i];

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-[#EAF8E7] via-[#F2FBEE] to-[#E2F2DA]"
      aria-label="Featured collections"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Soft decorative blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 size-[460px] rounded-full bg-[#2E7D32]/10 blur-3xl" />
        <div className="absolute -right-24 top-40 size-[520px] rounded-full bg-[#C8A415]/10 blur-3xl" />
        <Leaf className="absolute left-10 bottom-10 size-28 -rotate-12 text-[#2E7D32]/10" />
      </div>

      <Container className="relative pt-6">
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Homepage hero slider"
          aria-live={paused ? "polite" : "off"}
          tabIndex={0}
          onKeyDown={onKey}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className="relative h-[520px] overflow-hidden rounded-[36px] bg-gradient-to-br from-[#EAF8E7] via-[#F2FBEE] to-[#D7F0CC] shadow-soft ring-1 ring-[#2E7D32]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D32] focus-visible:ring-offset-2 lg:h-[600px]"
        >
          {/* Full-bleed background image */}
          <AnimatePresence mode="sync">
            <motion.div
              key={`img-${i}`}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-0 z-0"
              aria-hidden="true"
            >
              <img
                src={s.image}
                alt=""
                width={1600}
                height={1024}
                fetchPriority={i === 0 ? "high" : "auto"}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                sizes="100vw"
                className="h-full w-full object-cover"
              />
              {/* Readability overlay for centered text */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/55" />
            </motion.div>
          </AnimatePresence>

          {/* Centered text */}
          <div className="relative z-10 flex h-full items-center justify-center px-6 py-10 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`copy-${i}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                className="mx-auto max-w-3xl"
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${i + 1} of ${SLIDES.length}`}
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1B5E20] shadow-soft ring-1 ring-white/40 backdrop-blur">
                  <Sparkles className="size-3.5 text-gold" aria-hidden="true" /> {s.eyebrowBn}
                </div>
                <h1 className="font-bn mt-5 text-[40px] font-extrabold leading-[1.05] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] sm:text-5xl xl:text-[64px]">
                  {s.titleBn}
                </h1>
                <p className="font-bn mt-4 text-2xl font-semibold text-white/95 drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] xl:text-3xl">
                  {s.subBn}
                </p>
                <p className="font-bn mx-auto mt-5 max-w-xl text-base text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)] xl:text-lg">
                  {s.metaBn}
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link
                    to={s.to as any}
                    className="group inline-flex items-center gap-2 rounded-full bg-[#2E7D32] px-8 py-4 text-sm font-bn font-semibold text-white shadow-elegant transition hover:-translate-y-0.5 hover:bg-[#1B5E20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                  >
                    এখনই অর্ডার করুন
                    <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrows */}
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(i - 1)}
            className="absolute left-4 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-[#1B5E20] shadow-soft ring-1 ring-[#2E7D32]/15 transition hover:scale-110 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D32] focus-visible:ring-offset-2"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(i + 1)}
            className="absolute right-4 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-[#1B5E20] shadow-soft ring-1 ring-[#2E7D32]/15 transition hover:scale-110 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D32] focus-visible:ring-offset-2"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>

          {/* Dots */}
          <div
            className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2"
            role="tablist"
            aria-label="Hero slides"
          >
            {SLIDES.map((_, n) => (
              <button
                key={n}
                type="button"
                role="tab"
                aria-selected={n === i}
                aria-current={n === i ? "true" : undefined}
                aria-label={`Go to slide ${n + 1} of ${SLIDES.length}`}
                onClick={() => go(n)}
                className={cn(
                  "h-2 rounded-full transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D32] focus-visible:ring-offset-2",
                  n === i ? "w-10 bg-[#2E7D32]" : "w-2.5 bg-[#2E7D32]/30 hover:bg-[#2E7D32]/60",
                )}
              />
            ))}
          </div>
        </div>
      </Container>

      {/* Floating Trust Card overlapping bottom */}
      <Container className="relative -mt-12 pb-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-20 grid grid-cols-2 gap-2 rounded-[28px] border border-border/40 bg-white p-6 shadow-elegant md:grid-cols-4 md:p-8"
        >
          {[
            { Icon: Truck, t: "সারা বাংলাদেশে ডেলিভারি", d: "দ্রুত ও নিরাপদ কুরিয়ার" },
            { Icon: Wallet, t: "ক্যাশ অন ডেলিভারি", d: "পণ্য বুঝে পেমেন্ট করুন" },
            { Icon: ShieldCheck, t: "উন্নত মানের গাছ", d: "সুস্থ ও পরিচর্যা করা চারা" },
            { Icon: Headphones, t: "২৪/৭ কাস্টমার সাপোর্ট", d: "আমরা আছি আপনার পাশে" },
          ].map((f, idx) => (
            <div
              key={f.t}
              className={cn(
                "group flex items-center gap-4 px-5 py-2 transition",
                idx < 3 && "md:border-r md:border-border/50",
              )}
            >
              <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#EAF8E7] text-[#1B5E20] transition group-hover:scale-110 group-hover:bg-[#2E7D32] group-hover:text-white">
                <f.Icon className="size-7" strokeWidth={2.2} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="font-bn text-sm font-semibold text-foreground sm:text-base">{f.t}</p>
                <p className="font-bn mt-0.5 text-xs text-muted-foreground sm:text-sm">{f.d}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}


/* ───────────── CATEGORY BANNER GRID ───────────── */
function CategoryBanners() {
  return (
    <section className="py-14">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2">
          <CatBanner to="/categories/mango" title="ফল গাছ" img={catFruitBanner} />
          <CatBanner to="/categories/flowering" title="ফুল গাছ" img={catFlowerBanner} />
        </div>
      </Container>
    </section>
  );
}

function CatBanner({ to, title, img }: { to: string; title: string; img: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="group overflow-hidden rounded-[28px] shadow-soft ring-1 ring-black/5 transition-all duration-500 hover:shadow-elegant hover:-translate-y-1"
    >
      <Link to={to as any} aria-label={title}>
        <img
          src={img}
          alt={title}
          className="h-auto w-full object-contain transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
          onError={onImgError}
        />
      </Link>
    </motion.div>
  );
}


/* ───────────── POPULAR PRODUCTS ───────────── */
function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-10 flex items-center justify-center gap-4">
      <span className="hidden h-px w-16 bg-gradient-to-r from-transparent to-[#2E7D32]/60 sm:block" />
      <span className="text-[#2E7D32]">→→</span>
      <h2 className="font-bn text-3xl font-extrabold text-foreground sm:text-4xl">{title}</h2>
      <span className="text-[#2E7D32]">←←</span>
      <span className="hidden h-px w-16 bg-gradient-to-l from-transparent to-[#2E7D32]/60 sm:block" />
    </div>
  );
}

function PopularProducts({ products }: { products: Product[] }) {
  const items = selectBestsellers(products).slice(0, 8);
  return (
    <section className="py-14">
      <Container>
        <SectionTitle title="জনপ্রিয় গাছ সমূহ" />
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-[#2E7D32] px-8 py-4 text-sm font-bn font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#1B5E20] hover:shadow-elegant"
          >
            সব গাছ দেখুন <ArrowRight className="size-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

/* ───────────── PROMO BANNER (COD) ───────────── */
function CodBanner() {
  return (
    <section className="py-14">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-[32px] shadow-elegant"
        >
          <Link to="/shop" aria-label="ক্যাশ অন ডেলিভারি">
            <img
              src={deliveryBanner}
              alt="ক্যাশ অন ডেলিভারি"
              width={1600}
              height={533}
              className="h-auto w-full object-contain"
              loading="lazy"
              decoding="async"
              onError={onImgError}
            />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

/* ───────────── MORE PRODUCT SECTIONS ───────────── */
function MoreProducts({ products }: { products: Product[] }) {
  const fresh = selectNewArrivals(products).slice(0, 8);
  const featured = selectBestsellers(products).slice(0, 8);
  const fruit = [
    ...selectByCategory(products, "guava"),
    ...selectByCategory(products, "litchi"),
    ...selectByCategory(products, "citrus"),
    ...selectByCategory(products, "tropical"),
  ].slice(0, 8);
  const flowers = [
    ...selectByCategory(products, "flowering"),
    ...selectByCategory(products, "indoor"),
    ...selectByCategory(products, "herbs"),
  ].slice(0, 8);

  const Rail = ({ title, items, href, ctaBn }: { title: string; items: typeof fruit; href: string; ctaBn: string }) => (
    <section className="py-10" aria-label={title}>
      <Container>
        <SectionTitle title={title} />
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
        </div>
        <div className="mt-10 text-center">
          <Link
            to={href as any}
            className="inline-flex items-center gap-2 rounded-full border border-[#2E7D32]/30 bg-white px-7 py-3.5 text-sm font-bn font-semibold text-[#1B5E20] shadow-soft transition hover:-translate-y-0.5 hover:bg-[#EAF8E7] hover:shadow-elegant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D32] focus-visible:ring-offset-2"
          >
            {ctaBn} <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );

  return (
    <>
      {fresh.length > 0 && <Rail title="নতুন এসেছে" items={fresh} href="/shop?sort=new" ctaBn="সব নতুন গাছ" />}
      {featured.length > 0 && <Rail title="বেস্ট সেলার" items={featured} href="/shop?sort=bestsellers" ctaBn="সব বেস্ট সেলার" />}
      <Rail title="ফল গাছের সংগ্রহ" items={fruit} href="/categories/mango" ctaBn="সব ফল গাছ" />
      <Rail title="ফুল ও ইনডোর গাছ" items={flowers} href="/categories/flowering" ctaBn="সব ফুল গাছ" />
    </>
  );
}

/* ───────────── REVIEWS ───────────── */
function Reviews({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="bg-[#F8FFF7] py-16">
      <Container>
        <SectionTitle title="কাস্টমার রিভিউ" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-3xl border border-border/50 bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-elegant"
            >
              <Quote className="absolute right-5 top-5 size-9 text-[#EAF8E7]" />
              <div className="flex items-center gap-1 text-gold">
                {Array.from({ length: t.rating }).map((_, n) => (
                  <Star key={n} className="size-4 fill-gold" />
                ))}
              </div>
              <p className="font-bn mt-4 text-sm leading-relaxed text-foreground/85">{t.text}</p>
              <div className="mt-6 flex items-center gap-3 border-t border-border/50 pt-5">
                <img src={t.avatar} alt={`${t.name} avatar`} width={44} height={44} className="size-11 rounded-full object-cover" loading="lazy" decoding="async" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.city} · {t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ───────────── BLOG ───────────── */
function BlogSection({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="py-16">
      <Container>
        <SectionTitle title="গার্ডেনিং টিপস ও ব্লগ" />
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group overflow-hidden rounded-3xl border border-border/50 bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-elegant"
            >
              <Link to="/blog/$slug" params={{ slug: p.slug }} className="block">
                <div className="relative overflow-hidden">
                  <SmartImage src={p.cover} alt={p.title} aspect="video" rounded={false} className="rounded-none transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#1B5E20] shadow-soft">
                    {p.category}
                  </div>
                </div>
                <div className="p-6">
                  <p className="font-bn text-xs text-muted-foreground">{p.date} · {p.readTime}</p>
                  <h3 className="font-bn mt-2 font-display text-lg font-semibold text-foreground line-clamp-2 transition group-hover:text-[#2E7D32]">
                    {p.title}
                  </h3>
                  <p className="font-bn mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                  <div className="font-bn mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#2E7D32]">
                    আরও পড়ুন <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function DesktopHome() {
  const { data: products = [] } = useProducts();
  const { data: testimonials = [] } = useTestimonials();
  const { data: posts = [] } = useBlogPosts();
  return (
    <>
      <Hero />
      <CategoryBanners />
      <PopularProducts products={products} />
      <CodBanner />
      <MoreProducts products={products} />
      <Reviews testimonials={testimonials} />
      <BlogSection posts={posts} />
    </>
  );
}
