import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, BadgeCheck, Headphones, Package, Truck, Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SmartImage } from "@/components/common/SmartImage";
import { products } from "@/data/products";
import { formatBDT } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { onImgError, unsplash, unsplashSrcSet } from "@/lib/img";

const HERO_SLIDES = [
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=85&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&q=85&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1591735026282-bb24fd6c0451?w=1200&q=85&auto=format&fit=crop",
];

const TRUST = [
  { Icon: Truck, t: "সারা বাংলাদেশে ডেলিভারি", s: "দ্রুত ও নিরাপদ ডেলিভারি" },
  { Icon: Wallet, t: "ক্যাশ অন ডেলিভারি", s: "পণ্য বুঝে পেমেন্ট করুন" },
  { Icon: BadgeCheck, t: "উন্নত মানের গাছ", s: "সুস্থ ও পরিচর্যা করা গাছ" },
  { Icon: Headphones, t: "২৪/৭ কাস্টমার সাপোর্ট", s: "আমরা আছি আপনার পাশে" },
];

const POPULAR_SLUGS = ["amrapali-mango-grafted", "thai-pink-guava", "bedana-litchi", "desi-rose"];

export function MobileHome() {
  return (
    <div className="lg:hidden">
      <MobilePromoBar />
      <MobileHero />
      <MobileTrust />
      <MobileSectionTitle title="আমাদের ক্যাটাগরি" />
      <MobileCategoryCards />
      <MobileSectionTitle title="জনপ্রিয় গাছ সমূহ" />
      <MobilePopular />
      <MobileCodBanner />
      <div className="h-6" />
    </div>
  );
}

/* ── Top promo strip ───────────────────────────── */
function MobilePromoBar() {
  return (
    <div className="bg-[#1B5E20] text-white">
      <div className="flex items-center justify-center gap-4 px-4 py-2 text-[11px] font-medium">
        <span className="font-bn flex items-center gap-1.5">
          <Truck className="size-3.5 text-gold" />
          সারা বাংলাদেশে হোম ডেলিভারি
        </span>
        <span className="opacity-30">·</span>
        <span className="font-bn flex items-center gap-1.5">
          <Wallet className="size-3.5 text-gold" />
          ক্যাশ অন ডেলিভারি
        </span>
      </div>
    </div>
  );
}

/* ── Hero ──────────────────────────────────────── */
function MobileHero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % HERO_SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);
  const slide = HERO_SLIDES[i];

  return (
    <section className="px-3 pt-3">
      <div className="relative h-[420px] w-full overflow-hidden rounded-[28px] shadow-elegant">
        <motion.img
          key={slide}
          src={unsplash(slide, 900, 80)}
          srcSet={unsplashSrcSet(slide, [500, 750, 1000])}
          sizes="100vw"
          alt="ফল ও ফুলের গাছ"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full object-cover"
          onError={onImgError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

        <div className="absolute inset-x-5 top-7 text-white">
          <h1 className="font-bn text-[28px] font-bold leading-tight drop-shadow-lg">
            ফল ও ফুলের গাছ
          </h1>
          <p className="font-bn mt-1 text-[20px] font-semibold leading-tight drop-shadow-lg">
            এখন আপনার হাতের নাগালে
          </p>
          <p className="font-bn mt-3 max-w-[230px] text-[12px] leading-relaxed text-white/90 drop-shadow">
            উন্নত মানের গাছ · সঠিক পরিচর্যার গাইড ·<br />
            সারা বাংলাদেশে ডেলিভারি
          </p>
          <Link
            to="/shop"
            className="font-bn mt-5 inline-flex items-center gap-2 rounded-full bg-[#1B5E20] px-5 py-2.5 text-sm font-bold text-white shadow-elegant ring-1 ring-white/20 active:scale-95"
          >
            এখনই অর্ডার করুন
          </Link>
        </div>

        {/* Pagination */}
        <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-1.5">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`স্লাইড ${idx + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                idx === i ? "w-6 bg-white" : "w-1.5 bg-white/50",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Trust strip ───────────────────────────────── */
function MobileTrust() {
  return (
    <section className="-mt-6 px-3">
      <div className="relative z-10 grid grid-cols-4 gap-2 rounded-3xl border border-border/60 bg-card p-4 shadow-elegant">
        {TRUST.map(({ Icon, t, s }) => (
          <div key={t} className="flex flex-col items-center text-center">
            <span className="grid size-10 place-items-center rounded-full bg-[#1B5E20]/10 text-[#1B5E20]">
              <Icon className="size-5" strokeWidth={2.2} />
            </span>
            <p className="font-bn mt-2 text-[10px] font-bold leading-tight text-foreground">{t}</p>
            <p className="font-bn mt-1 text-[9px] leading-tight text-muted-foreground">{s}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Section title with decorative arrows ──────── */
function MobileSectionTitle({ title }: { title: string }) {
  return (
    <div className="mt-8 flex items-center justify-center gap-3 px-4">
      <span aria-hidden className="font-display text-lg tracking-tight text-[#1B5E20]">»»</span>
      <h2 className="font-bn text-lg font-bold tracking-tight text-foreground">{title}</h2>
      <span aria-hidden className="font-display text-lg tracking-tight text-[#1B5E20]">««</span>
    </div>
  );
}

/* ── 2 category cards ──────────────────────────── */
function MobileCategoryCards() {
  return (
    <section className="mt-4 grid grid-cols-2 gap-3 px-3">
      <CategoryCard
        title="ফল গাছ"
        sub="দেশি-বিদেশি বিভিন্ন প্রজাতির ফল গাছের চারা"
        to="/categories/mango"
        bg="bg-[#E5F3D8]"
        btn="bg-[#1B5E20] text-white"
        img="https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&q=80&auto=format&fit=crop"
      />
      <CategoryCard
        title="ফুল গাছ"
        sub="বিভিন্ন রঙের ফুলের গাছ আপনার বাগানের জন্য"
        to="/categories/flowering"
        bg="bg-[#FBE0EA]"
        btn="bg-[#9D174D] text-white"
        img="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80&auto=format&fit=crop"
      />
    </section>
  );
}

function CategoryCard({
  title, sub, to, bg, btn, img,
}: { title: string; sub: string; to: string; bg: string; btn: string; img: string }) {
  return (
    <Link to={to} className={cn("relative flex h-52 flex-col justify-between overflow-hidden rounded-3xl p-4 shadow-soft active:scale-[0.98]", bg)}>
      <div className="relative z-10 max-w-[60%]">
        <h3 className="font-bn text-lg font-extrabold leading-tight text-foreground">{title}</h3>
        <p className="font-bn mt-1.5 text-[11px] leading-snug text-foreground/70">{sub}</p>
      </div>
      <span className={cn("relative z-10 inline-flex w-fit items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold", btn)}>
        দেখুন <ArrowRight className="size-3.5" />
      </span>
      <img
        src={unsplash(img, 400, 80)}
        srcSet={unsplashSrcSet(img, [240, 360, 480])}
        sizes="200px"
        alt={title}
        className="pointer-events-none absolute -bottom-2 -right-3 h-36 w-36 object-cover [mask-image:radial-gradient(circle_at_70%_60%,#000_60%,transparent_75%)]"
        loading="lazy"
        decoding="async"
        onError={onImgError}
      />
    </Link>
  );
}

/* ── Popular products grid ─────────────────────── */
function MobilePopular() {
  const list = POPULAR_SLUGS
    .map((s) => products.find((p) => p.slug === s))
    .filter((p): p is typeof products[number] => Boolean(p));

  return (
    <section className="mt-4 grid grid-cols-2 gap-3 px-3">
      {list.map((p, idx) => (
        <PopularCard key={p.slug} product={p} index={idx} />
      ))}
    </section>
  );
}

function PopularCard({ product, index }: { product: typeof products[number]; index: number }) {
  const cart = useCart();
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.2) }}
      className="flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card p-3 text-center shadow-soft"
    >
      <Link to="/products/$slug" params={{ slug: product.slug }} className="block overflow-hidden rounded-2xl bg-muted">
        <SmartImage src={product.image} alt={product.name} aspect="square" />
      </Link>
      <Link to="/products/$slug" params={{ slug: product.slug }} className="font-bn mt-3 line-clamp-1 text-sm font-bold text-foreground">
        {product.name}
      </Link>
      <p className="font-bn mt-1 text-lg font-extrabold text-[#1B5E20]">{formatBDT(product.price)}</p>
      <button
        type="button"
        onClick={() => { cart.add(product); toast.success(`${product.name} কার্টে যোগ হয়েছে`); }}
        className="font-bn mt-3 w-full rounded-full bg-[#1B5E20] py-2 text-xs font-bold text-white shadow-soft active:scale-95"
      >
        অর্ডার করুন
      </button>
    </motion.article>
  );
}

/* ── COD CTA banner ────────────────────────────── */
function MobileCodBanner() {
  return (
    <section className="mt-6 px-3">
      <div className="relative flex h-36 items-center overflow-hidden rounded-3xl bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] p-5 text-white shadow-elegant">
        <div className="relative z-10 max-w-[62%]">
          <h3 className="font-bn text-xl font-extrabold leading-tight">ক্যাশ অন ডেলিভারি</h3>
          <p className="font-bn mt-1.5 text-[12px] leading-snug text-white/90">
            পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন
          </p>
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="grid size-24 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur">
            <Package className="size-12 text-white" strokeWidth={1.6} />
          </div>
        </div>
        <div className="pointer-events-none absolute -left-6 -top-10 size-32 rounded-full bg-gold/20 blur-2xl" />
      </div>
    </section>
  );
}
