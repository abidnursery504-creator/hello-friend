import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, BadgeCheck, Camera, Headphones, Package, Truck,
} from "lucide-react";
import type { Product } from "@/data/products";
import { useProducts } from "@/hooks/useCatalog";
import { formatBDT } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { onImgError, unsplash, unsplashSrcSet } from "@/lib/img";
import hero2 from "@/assets/mobile-hero-2.jpg";
import deliveryBanner from "@/assets/delivery-banner.jpg";
import catFruit from "@/assets/cat-fruit-tree.png";
import catFlower from "@/assets/cat-flower-tree.png";
import pMango from "@/assets/p-mango.png";
import pJackfruit from "@/assets/p-jackfruit.png";
import pLitchi from "@/assets/p-litchi.png";
import pRose from "@/assets/p-rose.png";

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
  return (
    <section className="px-3 pt-3">
      <Link to="/shop" aria-label="ফল ও ফুলের গাছ" className="block overflow-hidden rounded-[28px] shadow-elegant">
        <motion.img
          src={hero2}
          alt="ফল ও ফুলের গাছ"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-auto w-full object-contain"
          width={1600}
          height={941}
          onError={onImgError}
        />
      </Link>
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
      <div className="overflow-hidden rounded-2xl shadow-elegant">
        <img
          src={deliveryBanner}
          alt="ক্যাশ অন ডেলিভারি"
          className="h-auto w-full object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}
