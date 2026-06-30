import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, Bell, Heart, MapPin, Search, ShieldCheck, ShoppingBag,
  Sparkles, Star, Truck, Wallet, Headphones, Leaf, ChevronRight, Play, Quote,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SmartImage } from "@/components/common/SmartImage";
import { categories } from "@/data/categories";
import { bestsellers, products } from "@/data/products";
import { posts, site, testimonials } from "@/data/site";
import { formatBDT } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1200&q=85&auto=format&fit=crop",
    eyebrow: "প্রিমিয়াম নার্সারি",
    title: "গড়ুন নিজের সবুজ জগৎ",
    cta: "এখনই অর্ডার করুন",
    to: "/shop",
  },
  {
    image: "https://images.unsplash.com/photo-1591735026282-bb24fd6c0451?w=1200&q=85&auto=format&fit=crop",
    eyebrow: "আমের মৌসুম",
    title: "গ্রাফটিং আম গাছ",
    cta: "কালেকশন দেখুন",
    to: "/categories/mango",
  },
  {
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&q=85&auto=format&fit=crop",
    eyebrow: "ইনডোর গ্রিনস",
    title: "ঘর সাজান সবুজে",
    cta: "ইনডোর গাছ",
    to: "/categories/indoor",
  },
  {
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&q=85&auto=format&fit=crop",
    eyebrow: "ফুলের বাগান",
    title: "সারা বছর ফুটুক",
    cta: "ফুলের চারা",
    to: "/categories/flowering",
  },
  {
    image: "https://images.unsplash.com/photo-1610917040803-1fccf9623064?w=1200&q=85&auto=format&fit=crop",
    eyebrow: "বিরল বিদেশি গাছ",
    title: "দুর্লভ বিদেশি চারা",
    cta: "দেখুন",
    to: "/categories/tropical",
  },
];

const TRUST_TILES = [
  { icon: Wallet, label: "ক্যাশ অন ডেলিভারি", sub: "পণ্য বুঝে পেমেন্ট", color: "from-emerald-500/15 to-emerald-500/5", iconColor: "text-emerald-600" },
  { icon: Truck, label: "৬৪ জেলায় ডেলিভারি", sub: "সারা বাংলাদেশে", color: "from-sky-500/15 to-sky-500/5", iconColor: "text-sky-600" },
  { icon: ShieldCheck, label: "৩০ দিনের গ্যারান্টি", sub: "লিভিং গ্যারান্টি", color: "from-amber-500/15 to-amber-500/5", iconColor: "text-amber-600" },
  { icon: Headphones, label: "এক্সপার্ট সাপোর্ট", sub: "যেকোনো সাহায্য", color: "from-rose-500/15 to-rose-500/5", iconColor: "text-rose-600" },
];

const CAT_COLORS = [
  "from-emerald-400/30 to-emerald-600/10",
  "from-amber-400/30 to-orange-500/10",
  "from-rose-400/30 to-pink-500/10",
  "from-sky-400/30 to-indigo-500/10",
  "from-violet-400/30 to-fuchsia-500/10",
  "from-lime-400/30 to-green-500/10",
  "from-teal-400/30 to-cyan-500/10",
  "from-orange-400/30 to-red-500/10",
];

export function MobileHome() {
  return (
    <div className="lg:hidden">
      <MobileGreetingBar />
      <MobileSearchBar />
      <MobileHero />
      <MobileTrustGrid />
      <MobileCategoryStrip />
      <MobilePopularProducts />
      <MobilePromoBanner />
      <MobileNewArrivals />
      <MobileReviewsStrip />
      <MobileTipsStrip />
      <MobileBlogPreview />
      <MobileNewsletter />
    </div>
  );
}

/* Greeting / location pill */
function MobileGreetingBar() {
  return (
    <div className="px-4 pt-3">
      <div className="flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid size-9 shrink-0 place-items-center rounded-full gradient-primary text-primary-foreground shadow-soft">
            <MapPin className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="font-bn text-[10px] tracking-wider text-muted-foreground">ডেলিভারি ঠিকানা</p>
            <p className="font-bn truncate text-sm font-semibold text-foreground">পুরান বগুড়া · বাংলাদেশ</p>
          </div>
        </div>
        <Link
          to="/account"
          aria-label="নোটিফিকেশন"
          className="relative grid size-10 shrink-0 place-items-center rounded-full border border-border bg-card text-foreground"
        >
          <Bell className="size-4" />
          <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-destructive ring-2 ring-background" />
        </Link>
      </div>
    </div>
  );
}

function MobileSearchBar() {
  return (
    <div className="px-4 pt-3">
      <Link
        to="/search"
        className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-soft"
      >
        <Search className="size-4 text-muted-foreground" />
        <span className="font-bn flex-1 truncate text-sm text-muted-foreground">আম, লিচু, গোলাপ খুঁজুন...</span>
        <span className="font-bn rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">নতুন</span>
      </Link>
    </div>
  );
}

/* Hero */
function MobileHero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % HERO_SLIDES.length), 4500);
    return () => clearInterval(t);
  }, [paused]);

  const slide = HERO_SLIDES[i];
  return (
    <section className="mt-3 px-4" onTouchStart={() => setPaused(true)} onTouchEnd={() => setPaused(false)}>
      <div className="relative h-[460px] w-full overflow-hidden rounded-[28px] bg-black shadow-elegant">
        <AnimatePresence>
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-x-0 top-4 flex items-center justify-between px-5">
          <span className="font-bn rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold tracking-wider text-white backdrop-blur">
            {site.nameBn.slice(0, 18)}
          </span>
          <span className="font-bn flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold text-white backdrop-blur">
            <Star className="size-3 fill-gold text-gold" />
            ৪.৯ · ১২হাজার+
          </span>
        </div>

        <div className="absolute inset-x-5 bottom-20 text-white">
          <motion.p
            key={`eb-${i}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-bn text-xs font-medium tracking-wider text-gold"
          >
            {slide.eyebrow}
          </motion.p>
          <motion.h1
            key={`t-${i}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="font-bn mt-1 text-3xl font-bold leading-tight"
          >
            {slide.title}
          </motion.h1>

          <Link
            to={slide.to}
            className="font-bn mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-foreground shadow-elegant"
          >
            <span>{slide.cta}</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Pagination */}
        <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-1.5">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`স্লাইড ${idx + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                idx === i ? "w-6 bg-white" : "w-1.5 bg-white/40",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* Trust tiles */
function MobileTrustGrid() {
  return (
    <section className="mt-6 px-4">
      <div className="grid grid-cols-2 gap-3">
        {TRUST_TILES.map((t, idx) => {
          const Icon = t.icon;
          return (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={cn(
                "flex items-center gap-3 rounded-3xl border border-border/60 bg-gradient-to-br p-3 shadow-soft",
                t.color,
              )}
            >
              <span className={cn("grid size-10 shrink-0 place-items-center rounded-2xl bg-background/80 backdrop-blur", t.iconColor)}>
                <Icon className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="font-bn truncate text-xs font-bold text-foreground">{t.label}</p>
                <p className="font-bn truncate text-[10px] text-muted-foreground">{t.sub}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* Category strip */
function MobileCategoryStrip() {
  return (
    <section className="mt-7">
      <SectionHeader title="বিভাগ অনুযায়ী" to="/categories" />
      <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto px-4 pb-2">
        {categories.slice(0, 10).map((c, idx) => (
          <Link
            key={c.slug}
            to="/categories/$slug"
            params={{ slug: c.slug }}
            className="group flex w-24 shrink-0 flex-col items-center gap-2"
          >
            <div className={cn(
              "relative grid size-24 place-items-center overflow-hidden rounded-3xl bg-gradient-to-br shadow-soft transition group-active:scale-95",
              CAT_COLORS[idx % CAT_COLORS.length],
            )}>
              <img src={c.image} alt={c.name} className="size-20 rounded-2xl object-cover" loading="lazy" />
            </div>
            <p className="font-bn line-clamp-1 w-full text-center text-xs font-semibold text-foreground">{c.nameBn}</p>
            <p className="-mt-1 text-[10px] text-muted-foreground">{toBnDigits(c.count)}+</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* Popular products 2-col */
function MobilePopularProducts() {
  return (
    <section className="mt-7">
      <SectionHeader title="জনপ্রিয় চারা" to="/shop" />
      <div className="mt-3 grid grid-cols-2 gap-3 px-4">
        {bestsellers().slice(0, 6).map((p, i) => (
          <MobileProductCard key={p.slug} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function MobileProductCard({ product, index = 0 }: { product: typeof products[number]; index?: number }) {
  const cart = useCart();
  const wish = useWishlist();
  const liked = wish.has(product.slug);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card p-2 shadow-soft"
    >
      <Link to="/products/$slug" params={{ slug: product.slug }} className="relative block overflow-hidden rounded-2xl">
        <SmartImage src={product.image} alt={product.name} aspect="square" />
        {discount > 0 && (
          <span className="absolute left-2 top-2 rounded-full bg-destructive px-2 py-0.5 text-[10px] font-bold uppercase text-destructive-foreground">
            −{discount}%
          </span>
        )}
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); wish.toggle(product.slug); }}
          aria-label="ইচ্ছার তালিকা"
          aria-pressed={liked}
          className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-background/85 text-foreground backdrop-blur"
        >
          <Heart className={cn("size-4", liked && "fill-destructive text-destructive")} />
        </button>
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-2">
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <Star className="size-3 fill-gold text-gold" />
          <span className="font-semibold text-foreground">{product.rating.toFixed(1)}</span>
          <span>· {product.reviews}</span>
        </div>
        <Link to="/products/$slug" params={{ slug: product.slug }} className="line-clamp-1 text-sm font-semibold text-foreground">
          {product.name}
        </Link>
        <p className="font-bn line-clamp-1 text-[11px] text-muted-foreground">{product.nameBn}</p>
        <div className="mt-1 flex items-end justify-between gap-1">
          <div>
            <div className="text-sm font-bold text-primary">{formatBDT(product.price)}</div>
            {product.oldPrice && (
              <div className="text-[10px] text-muted-foreground line-through">{formatBDT(product.oldPrice)}</div>
            )}
          </div>
          <button
            type="button"
            onClick={() => { cart.add(product); toast.success(`${product.name} কার্টে যোগ হয়েছে`); }}
            aria-label="কার্টে যোগ করুন"
            className="grid size-9 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-soft active:scale-95"
          >
            <ShoppingBag className="size-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* Promo banner */
function MobilePromoBanner() {
  return (
    <section className="mt-7 px-4">
      <Link
        to="/shop"
        className="relative block overflow-hidden rounded-3xl shadow-elegant"
      >
        <img
          src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80&auto=format&fit=crop"
          alt="Monsoon planting season"
          className="h-44 w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/85 via-emerald-900/60 to-transparent" />
        <div className="absolute inset-y-0 left-0 flex max-w-[70%] flex-col justify-center gap-2 p-5 text-white">
          <span className="w-fit rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold uppercase text-gold-foreground">
            Up to 25% off
          </span>
          <h3 className="font-bn text-xl font-bold leading-tight">বর্ষায় রোপণ অফার</h3>
          <p className="text-[11px] opacity-90">Monsoon planting season — limited stock.</p>
          <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold backdrop-blur">
            Shop now <ArrowRight className="size-3.5" />
          </span>
        </div>
      </Link>
    </section>
  );
}

/* New arrivals horizontal scroll */
function MobileNewArrivals() {
  const list = products.slice(6, 14);
  return (
    <section className="mt-7">
      <SectionHeader title="নতুন এসেছে" to="/shop" />
      <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto px-4 pb-2">
        {list.map((p) => (
          <Link
            key={p.slug}
            to="/products/$slug"
            params={{ slug: p.slug }}
            className="group w-44 shrink-0 overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft"
          >
            <div className="relative">
              <SmartImage src={p.image} alt={p.name} aspect="square" rounded={false} />
              <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">
                <Sparkles className="mr-0.5 inline size-2.5" /> New
              </span>
            </div>
            <div className="p-3">
              <p className="line-clamp-1 text-sm font-semibold text-foreground">{p.name}</p>
              <p className="font-bn line-clamp-1 text-[11px] text-muted-foreground">{p.nameBn}</p>
              <div className="mt-1 text-sm font-bold text-primary">{formatBDT(p.price)}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* Reviews strip */
function MobileReviewsStrip() {
  return (
    <section className="mt-7">
      <SectionHeader title="ক্রেতাদের মতামত" to="/reviews" />
      <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto px-4 pb-2">
        {testimonials.slice(0, 5).map((t) => (
          <article
            key={t.name}
            className="w-72 shrink-0 rounded-3xl border border-border/60 bg-gradient-to-br from-primary/5 to-transparent p-4 shadow-soft"
          >
            <Quote className="size-5 text-primary/40" />
            <p className="font-bn mt-2 line-clamp-4 text-sm leading-relaxed text-foreground">{t.text}</p>
            <div className="mt-3 flex items-center gap-2.5 border-t border-border/60 pt-3">
              <img src={t.avatar} alt={t.name} className="size-10 rounded-full object-cover" loading="lazy" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">{t.name}</p>
                <p className="truncate text-[10px] text-muted-foreground">{t.city} · {t.role}</p>
              </div>
              <div className="ml-auto flex items-center gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="size-3 fill-gold text-gold" />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* Gardening tips */
const TIPS = [
  { title: "ছাদ বাগানের শুরু", titleEn: "Rooftop start", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&auto=format&fit=crop", icon: Leaf },
  { title: "গ্রাফটিং কেয়ার", titleEn: "Grafted care", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80&auto=format&fit=crop", icon: Sparkles },
  { title: "ভিডিও গাইড", titleEn: "Video guide", image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80&auto=format&fit=crop", icon: Play },
  { title: "কুরিয়ার গাইড", titleEn: "Courier tips", image: "https://images.unsplash.com/photo-1606235495906-d5e94a92e5e3?w=800&q=80&auto=format&fit=crop", icon: Truck },
];

function MobileTipsStrip() {
  return (
    <section className="mt-7">
      <SectionHeader title="গাছ পরিচর্যার টিপস" to="/care-guide" />
      <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto px-4 pb-2">
        {TIPS.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.title}
              to="/care-guide"
              className="relative h-40 w-56 shrink-0 overflow-hidden rounded-3xl shadow-soft"
            >
              <img src={t.image} alt={t.titleEn} className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 text-white">
                <div className="min-w-0">
                  <p className="font-bn line-clamp-1 text-sm font-bold">{t.title}</p>
                  <p className="line-clamp-1 text-[10px] opacity-80">{t.titleEn}</p>
                </div>
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/20 backdrop-blur">
                  <Icon className="size-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/* Blog preview */
function MobileBlogPreview() {
  return (
    <section className="mt-7 px-4">
      <SectionHeader inline title="সাম্প্রতিক ব্লগ" to="/blog" />
      <div className="mt-3 flex flex-col gap-3">
        {posts.slice(0, 3).map((p) => (
          <Link
            key={p.slug}
            to="/blog/$slug"
            params={{ slug: p.slug }}
            className="flex gap-3 rounded-3xl border border-border/60 bg-card p-2.5 shadow-soft"
          >
            <img src={p.cover} alt={p.title} className="size-24 shrink-0 rounded-2xl object-cover" loading="lazy" />
            <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">{p.category}</p>
                <h4 className="mt-1 line-clamp-2 text-sm font-semibold text-foreground">{p.title}</h4>
              </div>
              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span>{p.readTime}</span>
                <ChevronRight className="size-3.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* Newsletter */
function MobileNewsletter() {
  const [email, setEmail] = useState("");
  return (
    <section className="mt-7 px-4">
      <div className="relative overflow-hidden rounded-3xl gradient-primary p-6 text-primary-foreground shadow-elegant">
        <div className="absolute -right-8 -top-8 size-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 -left-6 size-28 rounded-full bg-white/10" />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase backdrop-blur">
            <Sparkles className="size-3" /> Newsletter
          </span>
          <h3 className="font-bn mt-3 text-xl font-bold leading-snug">নতুন চারার আপডেট পেতে সাবস্ক্রাইব করুন</h3>
          <p className="mt-1 text-xs opacity-90">Get new arrivals & care tips straight to your inbox.</p>
          <form
            onSubmit={(e) => { e.preventDefault(); toast.success("Subscribed! 🌱"); setEmail(""); }}
            className="mt-4 flex items-center gap-2 rounded-full bg-white p-1 pl-4 shadow-soft"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background active:scale-95"
            >
              Join
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  title, titleEn, to, inline = false,
}: { title: string; titleEn: string; to: string; inline?: boolean }) {
  return (
    <div className={cn("flex items-end justify-between gap-3", inline ? "" : "px-4")}>
      <div>
        <h2 className="font-bn text-lg font-bold leading-tight text-foreground">{title}</h2>
        <p className="text-[11px] text-muted-foreground">{titleEn}</p>
      </div>
      <Link to={to} className="flex shrink-0 items-center gap-1 text-xs font-semibold text-primary">
        See all <ChevronRight className="size-3.5" />
      </Link>
    </div>
  );
}
