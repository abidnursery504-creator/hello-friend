import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, BadgeCheck, Camera, Headphones, Package, Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Product } from "@/data/products";
import { useProducts } from "@/hooks/useCatalog";
import { formatBDT } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { onImgError, unsplash, unsplashSrcSet } from "@/lib/img";
import hero1 from "@/assets/mobile-hero-1.jpg";
import hero2 from "@/assets/mobile-hero-2.jpg";
import hero3 from "@/assets/mobile-hero-3.jpg";
import catFruit from "@/assets/cat-fruit-tree.png";
import catFlower from "@/assets/cat-flower-tree.png";
import pMango from "@/assets/p-mango.png";
import pJackfruit from "@/assets/p-jackfruit.png";
import pLitchi from "@/assets/p-litchi.png";
import pRose from "@/assets/p-rose.png";
import codBox from "@/assets/cod-box-hand.png";
import codLeaves from "@/assets/cod-leaves-left.png";

const HERO_SLIDES = [
  { image: hero1, to: "/categories/fruits", alt: "ফল গাছ" },
  { image: hero2, to: "/shop", alt: "ফল ও ফুলের গাছ" },
  { image: hero3, to: "/categories/flowers", alt: "ফুল গাছ" },
] as const;

const TRUST = [
  { Icon: Truck, t: "সারা বাংলাদেশে ডেলিভারি", s: "দ্রুত ও নিরাপদ ডেলিভারি" },
  { Icon: Camera, t: "ক্যাশ অন ডেলিভারি", s: "পণ্য বুঝে নেবেন!" },
  { Icon: BadgeCheck, t: "উন্নত মানের গাছ", s: "সুস্থ ও পরিচর্যা করা গাছ" },
  { Icon: Headphones, t: "২৪/৭ কাস্টমার সাপোর্ট", s: "আমরা আছি আপনার পাশে" },
];

const POPULAR_SLUGS = ["amrapali-mango-grafted", "thai-pink-guava", "bedana-litchi", "desi-rose"];

export function MobileHome() {
  const { data: products = [] } = useProducts();
  return (
    <div className="lg:hidden">
      <MobileHero />
      <MobileTrust />
      <MobileSectionTitle title="আমাদের ক্যাটাগরি" />
      <MobileCategoryCards />
      <MobileSectionTitle title="জনপ্রিয় গাছ সমূহ" />
      <MobilePopular products={products} />
      <MobileCodBanner />
      <div className="h-6" />
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
      <div className="relative aspect-3/2 w-full overflow-hidden rounded-[28px] bg-[#f6f4e8] shadow-elegant">
        <Link key={slide.to} to={slide.to} aria-label={slide.alt} className="absolute inset-0 block">
          <motion.img
            key={slide.image}
            src={slide.image}
            alt={slide.alt}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full w-full object-cover"
            width={1600}
            height={1000}
            onError={onImgError}
          />
        </Link>

        {/* Pagination */}
        <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`স্লাইড ${idx + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                idx === i ? "w-6 bg-[#1B5E20]" : "w-1.5 bg-white/70",
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

/* ── Section title with decorative dashed arrows ── */
function MobileSectionTitle({ title }: { title: string }) {
  return (
    <div className="mt-8 flex items-center justify-center gap-2 px-4">
      <span aria-hidden className="font-bn flex items-center gap-1 text-[13px] font-bold tracking-tight text-[#1B5E20]">
        <span className="inline-block h-px w-5 bg-[#1B5E20]/60" />
        »»
      </span>
      <h2 className="font-bn text-[15px] font-extrabold tracking-tight text-foreground">{title}</h2>
      <span aria-hidden className="font-bn flex items-center gap-1 text-[13px] font-bold tracking-tight text-[#1B5E20]">
        ««
        <span className="inline-block h-px w-5 bg-[#1B5E20]/60" />
      </span>
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
        to="/categories/fruits"
        bg="bg-[#1F7A3A]"
        text="text-white"
        sub2="text-white/85"
        btn="bg-white text-[#1B5E20]"
        img={catFruit}
      />
      <CategoryCard
        title="ফুল গাছ"
        sub="বিভিন্ন রঙের ফুলের গাছ আপনার বাগানের জন্য"
        to="/categories/flowers"
        bg="bg-[#FCE4EC]"
        text="text-[#7A1A3C]"
        sub2="text-[#7A1A3C]/80"
        btn="bg-[#9D174D] text-white"
        img={catFlower}
      />
    </section>
  );
}

function CategoryCard({
  title, sub, to, bg, text, sub2, btn, img,
}: {
  title: string; sub: string; to: string;
  bg: string; text: string; sub2: string; btn: string; img: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "relative flex h-44 flex-col justify-between overflow-hidden rounded-3xl p-3.5 shadow-soft active:scale-[0.98]",
        bg,
      )}
    >
      <div className="relative z-10 max-w-[58%]">
        <h3 className={cn("font-bn text-[17px] font-extrabold leading-tight", text)}>{title}</h3>
        <p className={cn("font-bn mt-1.5 text-[10.5px] leading-snug", sub2)}>{sub}</p>
      </div>
      <span
        className={cn(
          "relative z-10 inline-flex w-fit items-center gap-1 rounded-full px-3.5 py-1.5 text-[11px] font-bold shadow-sm",
          btn,
        )}
      >
        দেখুন <ArrowRight className="size-3" />
      </span>
      <img
        src={img}
        alt={title}
        className="pointer-events-none absolute -bottom-1 -right-2 h-36 w-28 object-contain"
        loading="lazy"
        decoding="async"
      />
    </Link>
  );
}

/* ── Popular products: 4 horizontal-scroll cards ── */
type PopItem = { slug: string; name: string; price: number; image: string };
const POPULAR: PopItem[] = [
  { slug: "amrapali-mango-grafted", name: "আম গাছ", price: 350, image: pMango },
  { slug: "kathal-jackfruit",       name: "কাঁঠাল গাছ", price: 450, image: pJackfruit },
  { slug: "bedana-litchi",          name: "লিচু গাছ", price: 400, image: pLitchi },
  { slug: "desi-rose",              name: "গোলাপ গাছ", price: 250, image: pRose },
];

function MobilePopular({ products }: { products: Product[] }) {
  return (
    <section className="mt-4 px-3">
      <div className="-mx-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {POPULAR.map((p, idx) => (
          <PopularCard key={p.slug} item={p} index={idx} products={products} />
        ))}
      </div>
    </section>
  );
}

function PopularCard({ item, index, products }: { item: PopItem; index: number; products: Product[] }) {
  const cart = useCart();
  const fallback = products.find((x) => x.slug === item.slug);

  const handleAdd = () => {
    const product: Product = fallback ?? {
      slug: item.slug,
      name: item.name,
      nameBn: item.name,
      category: "fruit",
      price: item.price,
      rating: 4.8,
      reviews: 0,
      image: item.image,
      gallery: [item.image],
      shortDescription: item.name,
      description: item.name,
      height: "১.৫-২ ফুট",
      age: "১ বছর",
      potIncluded: true,
      inStock: true,
      careLevel: "সহজ",
      sunlight: "পূর্ণ রোদ",
      water: "মাঝারি",
    };
    cart.add({ ...product, price: item.price, name: item.name });
    toast.success(`${item.name} কার্টে যোগ হয়েছে`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.2) }}
      className="flex w-[44%] shrink-0 snap-start flex-col items-center rounded-2xl border border-border/60 bg-card p-3 text-center shadow-soft"
    >
      <Link
        to={fallback ? "/products/$slug" : "/shop"}
        {...(fallback ? { params: { slug: item.slug } } : {})}
        className="grid h-24 w-full place-items-center"
      >
        <img
          src={item.image}
          alt={item.name}
          className="h-24 w-full object-contain"
          loading="lazy"
          decoding="async"
        />
      </Link>
      <p className="font-bn mt-2 line-clamp-1 text-[13px] font-bold text-foreground">{item.name}</p>
      <p className="font-bn mt-0.5 text-[15px] font-extrabold text-[#1B5E20]">{formatBDT(item.price)}</p>
      <button
        type="button"
        onClick={handleAdd}
        className="font-bn mt-2 w-full rounded-full border border-[#1B5E20]/30 bg-white py-1.5 text-[11px] font-bold text-[#1B5E20] active:scale-95"
      >
        অর্ডার করুন
      </button>
    </motion.article>
  );
}
function MobileCodBanner() {
  return (
    <section className="mt-6 px-3">
      <div className="relative flex h-24 items-center overflow-hidden rounded-2xl bg-[#5C8A3A] px-4 text-white shadow-elegant">
        {/* Left decorative leaves */}
        <img
          src={codLeaves}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -left-3 top-1/2 h-28 w-24 -translate-y-1/2 object-contain opacity-95"
          loading="lazy"
          decoding="async"
        />
        {/* Text */}
        <div className="relative z-10 ml-20 max-w-[55%]">
          <h3 className="font-bn text-[18px] font-extrabold leading-tight">ক্যাশ অন ডেলিভারি</h3>
          <p className="font-bn mt-1 text-[11px] leading-snug text-white/90">
            পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন
          </p>
        </div>
        {/* Right hand + box */}
        <img
          src={codBox}
          alt="Abid Nursery and Plants delivery"
          className="pointer-events-none absolute -right-2 top-1/2 h-24 w-32 -translate-y-1/2 object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}
