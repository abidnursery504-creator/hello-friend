import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import {
  ArrowRight, Award, Leaf, Sparkles, Star, ShieldCheck, Headphones,
  Phone, ChevronLeft, ChevronRight, Play, Instagram, Facebook, Mail,
  MapPin, PackageCheck, Sprout, Heart, MessageCircle, Quote,
  CalendarDays, Clock, ArrowUpRight, ChevronDown,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { ProductCard } from "@/components/common/ProductCard";
import { CategoryCard } from "@/components/common/CategoryCard";
import { SmartImage } from "@/components/common/SmartImage";
import { categories } from "@/data/categories";
import { bestsellers, getProductsByCategory } from "@/data/products";
import { testimonials, posts, faqs, site } from "@/data/site";
import { cn } from "@/lib/utils";
import { MobileHome } from "@/components/mobile/MobileHome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "All Tree BD Shop — Premium Online Nursery in Bangladesh" },
      { name: "description", content: "Shop grafted mango, litchi, lemon and rare tropical plants. 64-district cash on delivery & a 30-day living guarantee." },
      { property: "og:title", content: "All Tree BD Shop — Premium Online Nursery" },
      { property: "og:description", content: "Grafted fruit plants & indoor greens, delivered fresh across Bangladesh." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1600&q=80" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <PageLayout>
      <MobileHome />
      <div className="hidden lg:block">
        <HeroSlider />
        <FeaturedCategories />
        <WhyChooseUs />
        <FeaturedProducts />
        <MangoCollection />
        <SeasonalPlants />
        <IndoorPlants />
        <GardenGallery />
        <StatsCounter />
        <DeliveryProcess />
        <ReviewsSlider />
        <VideoGallery />
        <InstagramGallery />
        <FacebookFeed />
        <LatestBlog />
        <FaqSection />
        <NewsletterSection />
        <GoogleMap />
        <ContactBanner />
      </div>
    </PageLayout>
  );
}

/* 1. HERO SLIDER ============================================ */
const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=2000&q=85&auto=format&fit=crop",
    eyebrow: "#1 Online Nursery in Bangladesh",
    eyebrowBn: "বাংলাদেশের প্রিমিয়াম অনলাইন নার্সারি",
    title: "Grow what truly belongs to you",
    titleBn: "গড়ে তুলুন নিজের সবুজ জগৎ",
    subtitle: "Premium grafted fruit plants from Bangladesh's best growers — delivered fresh to your doorstep.",
  },
  {
    image: "https://images.unsplash.com/photo-1591735026282-bb24fd6c0451?w=2000&q=85&auto=format&fit=crop",
    eyebrow: "Mango Season Specials",
    eyebrowBn: "আমের মৌসুম শুরু",
    title: "Heritage mangoes, grafted to fruit fast",
    titleBn: "আম্রপালি · হাঁড়িভাঙ্গা · বারি-৪",
    subtitle: "Amrapali, Haribhanga, Bari-4 — dwarf grafted saplings ready to fruit in 18-24 months.",
  },
  {
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=2000&q=85&auto=format&fit=crop",
    eyebrow: "Indoor Sanctuary",
    eyebrowBn: "ঘরের ভেতরে সবুজ",
    title: "Turn your home into a forest",
    titleBn: "মনস্টেরা · স্নেক · জেডজেড · পথোস",
    subtitle: "Hand-picked, air-purifying indoor plants for every corner of your home.",
  },
  {
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=2000&q=85&auto=format&fit=crop",
    eyebrow: "Bloom All Year",
    eyebrowBn: "সারা বছর ফুল",
    title: "Roses, hibiscus & seasonal bloomers",
    titleBn: "গোলাপ · জবা · বাগানবিলাস",
    subtitle: "Fragrant, hardy flowering plants that bring color to your garden all year long.",
  },
  {
    image: "https://images.unsplash.com/photo-1610917040803-1fccf9623064?w=2000&q=85&auto=format&fit=crop",
    eyebrow: "Rare & Tropical",
    eyebrowBn: "বিরল ও বিদেশী",
    title: "Dragon fruit, rambutan & collector finds",
    titleBn: "ড্রাগন ফল · রাম্বুটান · মাল্টা",
    subtitle: "Limited stock tropical exotics from our partner nurseries in Cumilla and Rajshahi.",
  },
];

function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const len = HERO_SLIDES.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % len), 6500);
    return () => clearInterval(t);
  }, [paused, len]);

  const go = (n: number) => setI((n + len) % len);
  const slide = HERO_SLIDES[i];

  return (
    <section
      className="relative h-[72svh] min-h-[520px] w-full overflow-hidden bg-black rounded-b-[32px] lg:h-[100svh] lg:rounded-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <Container className="relative z-10 flex h-full flex-col justify-center text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] backdrop-blur">
              <Sparkles className="size-3.5 text-gold" /> {slide.eyebrow}
            </div>
            <p className="font-bn mt-4 text-base text-gold sm:text-lg">{slide.eyebrowBn}</p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] text-balance sm:text-5xl lg:text-7xl">
              {slide.title}
            </h1>
            <p className="font-bn mt-3 text-lg text-white/80 sm:text-xl">{slide.titleBn}</p>
            <p className="mt-6 max-w-xl text-base text-white/85 sm:text-lg">{slide.subtitle}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link to="/shop" className="group inline-flex items-center gap-2 rounded-full gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:-translate-y-0.5 hover:shadow-gold">
                Shop Now <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </Link>
              <Link to="/about" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
                Learn More
              </Link>
              <a href={`tel:${site.phone}`} className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-gold-foreground shadow-gold transition hover:-translate-y-0.5">
                <Phone className="size-4" /> Call Now
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>

      <button type="button" aria-label="Previous slide" onClick={() => go(i - 1)}
        className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 grid-cols-1 place-items-center rounded-full border border-white/30 bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20 sm:grid">
        <ChevronLeft className="size-5" />
      </button>
      <button type="button" aria-label="Next slide" onClick={() => go(i + 1)}
        className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 grid-cols-1 place-items-center rounded-full border border-white/30 bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20 sm:grid">
        <ChevronRight className="size-5" />
      </button>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {HERO_SLIDES.map((_, n) => (
          <button key={n} type="button" aria-label={`Slide ${n + 1}`} onClick={() => go(n)}
            className={cn("h-1.5 rounded-full transition-all duration-500", n === i ? "w-10 bg-gold" : "w-4 bg-white/40 hover:bg-white/70")} />
        ))}
      </div>

      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 right-8 z-20 hidden items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/70 md:flex">
        Scroll <ChevronDown className="size-4" />
      </motion.div>
    </section>
  );
}

/* 2. FEATURED CATEGORIES ===================================== */
function FeaturedCategories() {
  return (
    <Section eyebrow="Curated collections" title={<>Shop by <span className="text-primary">category</span></>}
      subtitle="From dwarf grafted mangoes to rare tropicals — find your next green companion." align="center">
      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((c, i) => <CategoryCard key={c.slug} category={c} index={i} />)}
      </div>
    </Section>
  );
}

/* 3. WHY CHOOSE US =========================================== */
function WhyChooseUs() {
  const points = [
    { Icon: Sprout, t: "Grafted, not seeded", d: "True-to-type grafted saplings that fruit 3-5× faster than seed-grown plants.", img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80" },
    { Icon: PackageCheck, t: "Museum-grade packing", d: "Shock-proof crates and breathing channels — plants arrive as if hand-carried.", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80" },
    { Icon: ShieldCheck, t: "30-day living guarantee", d: "Every grafted fruit plant is covered when our care plan is followed.", img: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=900&q=80" },
    { Icon: Headphones, t: "Bangla-first care team", d: "Replies in Bangla within minutes — long after delivery.", img: "https://images.unsplash.com/photo-1521334884684-d80222895322?w=900&q=80" },
  ];
  return (
    <Section bg="gradient" eyebrow="Why All Tree BD" title="A nursery that feels like a friend." subtitle="Premium plants, premium service — without the premium attitude." align="center">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {points.map((p, i) => (
          <motion.article key={p.t} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.08, duration: 0.6 }}
            className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft transition hover:shadow-elegant hover-lift">
            <div className="relative">
              <SmartImage src={p.img} alt={p.t} aspect="video" rounded={false} className="rounded-none" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
              <div className="absolute left-4 top-4 grid size-12 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-elegant">
                <p.Icon className="size-5" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-display text-lg font-semibold text-foreground">{p.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

/* 4. FEATURED PRODUCTS ======================================= */
function FeaturedProducts() {
  const items = bestsellers().slice(0, 8);
  return (
    <Section bg="muted" eyebrow="Customer favorites" title="Featured products" subtitle="The plants our customers can't stop reordering." align="center">
      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {items.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
      </div>
      <div className="mt-12 text-center">
        <Link to="/shop" className="inline-flex items-center gap-2 rounded-full gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:shadow-elegant">
          View all plants <ArrowRight className="size-4" />
        </Link>
      </div>
    </Section>
  );
}

/* 5. PREMIUM MANGO COLLECTION ================================ */
function MangoCollection() {
  const mangoes = getProductsByCategory("mango");
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1553279768-865429fa0078?w=2000&q=85" alt="" className="h-full w-full object-cover opacity-20" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>
      <Container className="relative">
        <div className="mb-14 grid items-end gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-foreground">
              <Award className="size-3.5 text-gold" /> Heritage selection
            </div>
            <h2 className="mt-4 font-display text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
              The Premium <span className="text-gold">Mango</span> Collection
            </h2>
            <p className="font-bn mt-3 text-lg text-primary-dark dark:text-primary-light">আমের প্রিমিয়াম সংগ্রহ</p>
          </div>
          <p className="text-base text-muted-foreground sm:text-lg">
            Hand-grafted dwarf saplings of Bangladesh's most loved varieties — bred to fruit on rooftops, terraces and small gardens within 18-24 months.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1.4fr]">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-[2rem] shadow-elegant">
            <SmartImage src="https://images.unsplash.com/photo-1605027990121-cbae9e0642db?w=1400&q=85" alt="Mango harvest" aspect="4/5" rounded={false} className="rounded-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-white">
              <div className="font-bn text-sm text-gold">৭+ জাতের আম</div>
              <h3 className="mt-1 font-display text-3xl font-bold">From orchard to rooftop</h3>
              <p className="mt-2 max-w-md text-sm opacity-90">Amrapali · Haribhanga · Banganapalli · Bari-4 · Langra · Fazli · Himsagar</p>
            </div>
          </motion.div>
          <div className="grid grid-cols-2 gap-5">
            {mangoes.slice(0, 4).map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
            {mangoes.length < 2 && bestsellers().slice(0, 4 - mangoes.length).map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* 6. SEASONAL PLANTS ========================================= */
function SeasonalPlants() {
  const seasonal = [
    ...getProductsByCategory("guava"),
    ...getProductsByCategory("litchi"),
    ...getProductsByCategory("tropical"),
    ...getProductsByCategory("citrus"),
  ].slice(0, 4);
  return (
    <Section eyebrow="Monsoon picks" title={<>Best plants for <span className="text-primary">this season</span></>}
      subtitle="Planted in monsoon, established by autumn — these thrive when you plant them now." align="center">
      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {seasonal.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
      </div>
    </Section>
  );
}

/* 7. INDOOR PLANTS =========================================== */
function IndoorPlants() {
  const indoor = [...getProductsByCategory("indoor"), ...getProductsByCategory("flowering"), ...getProductsByCategory("herbs")];
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 gradient-radial-leaf" />
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary">
              <Leaf className="size-3.5" /> Indoor sanctuary
            </div>
            <h2 className="mt-4 font-display text-4xl font-bold text-foreground sm:text-5xl">
              Bring the forest <br /><span className="text-primary">indoors</span>
            </h2>
            <p className="font-bn mt-3 text-lg text-primary-dark dark:text-primary-light">ঘরের ভেতরের সবুজ সঙ্গী</p>
            <p className="mt-5 max-w-md text-base text-muted-foreground">
              NASA-certified air-purifiers, statement Monstera, hardy snake plants and easy-care pothos — for desks, balconies and bedrooms.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/categories/$slug" params={{ slug: "indoor" }} className="inline-flex items-center gap-2 rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:shadow-elegant">
                Shop indoor plants <ArrowRight className="size-4" />
              </Link>
              <Link to="/care-guide" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-accent">
                Care tips
              </Link>
            </div>
          </motion.div>
          <div className="grid grid-cols-2 gap-5">
            {indoor.slice(0, 4).map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* 8. GARDEN GALLERY ========================================== */
const GALLERY = [
  { src: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=1200&q=80", tall: true },
  { src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80", tall: false },
  { src: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=1200&q=80", tall: false },
  { src: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&q=80", tall: true },
  { src: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1200&q=80", tall: false },
  { src: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&q=80", tall: true },
  { src: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&q=80", tall: false },
  { src: "https://images.unsplash.com/photo-1591735026282-bb24fd6c0451?w=1200&q=80", tall: false },
];
function GardenGallery() {
  return (
    <Section bg="muted" eyebrow="From real gardens" title="Garden inspiration" subtitle="Real homes, real rooftops, real Bangladesh." align="center">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {GALLERY.map((g, i) => (
          <motion.div key={g.src} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }} transition={{ delay: Math.min(i * 0.05, 0.4), duration: 0.6 }}
            className={cn("group relative overflow-hidden rounded-3xl shadow-soft hover-lift", g.tall && "row-span-2")}>
            <SmartImage src={g.src} alt="Garden inspiration" aspect={g.tall ? "4/5" : "square"} rounded={false} className="rounded-none transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 flex translate-y-4 items-center justify-between p-4 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="text-xs font-medium uppercase tracking-wider">#alltreebd</span>
              <Heart className="size-4" />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* 9. STATS COUNTER =========================================== */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.floor(v).toLocaleString());
  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, { duration: 2, ease: [0.2, 0.8, 0.2, 1] });
      return controls.stop;
    }
  }, [inView, mv, to]);
  return (<span ref={ref} className="tabular-nums"><motion.span>{rounded}</motion.span>{suffix}</span>);
}
function StatsCounter() {
  const stats = [
    { v: 25000, suffix: "+", l: "Happy customers", lBn: "সন্তুষ্ট গ্রাহক" },
    { v: 180, suffix: "+", l: "Plant varieties", lBn: "চারার জাত" },
    { v: 64, suffix: "", l: "Districts served", lBn: "জেলা" },
    { v: 99, suffix: "%", l: "Survival rate", lBn: "জীবিত পৌঁছায়" },
  ];
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=2000&q=85" alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-primary-dark/85" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/40 via-transparent to-black/40" />
      <Container className="relative text-primary-foreground">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] backdrop-blur">
            <Sparkles className="size-3.5 text-gold" /> By the numbers
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            Trusted across all 64 districts of Bangladesh
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div key={s.l} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="rounded-3xl border border-white/15 bg-white/5 p-6 text-center backdrop-blur sm:p-8">
              <div className="font-display text-4xl font-bold text-gold sm:text-5xl lg:text-6xl">
                <Counter to={s.v} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm font-medium uppercase tracking-wider opacity-90">{s.l}</div>
              <div className="font-bn mt-1 text-xs opacity-70">{s.lBn}</div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* 10. DELIVERY PROCESS ======================================= */
function DeliveryProcess() {
  const steps = [
    { n: "01", t: "Order online", d: "Browse, pick your plants and check out in under 2 minutes.", img: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=900&q=80" },
    { n: "02", t: "We pack with care", d: "Each plant is hand-wrapped in shock-proof packaging.", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80" },
    { n: "03", t: "Express dispatch", d: "Inside Dhaka 24-48h · Outside Dhaka 2-4 days.", img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=900&q=80" },
    { n: "04", t: "Plant & flourish", d: "Free care plan and 30-day living guarantee.", img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80" },
  ];
  return (
    <Section eyebrow="From cart to garden" title="How delivery works" subtitle="Transparent, fast, and obsessively careful." align="center">
      <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="absolute left-0 right-0 top-24 hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent lg:block" />
        {steps.map((s, i) => (
          <motion.div key={s.n} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-6 shadow-soft transition hover-lift">
            <div className="mb-5 overflow-hidden rounded-2xl">
              <SmartImage src={s.img} alt={s.t} aspect="video" rounded={false} className="rounded-none transition-transform duration-700 hover:scale-110" />
            </div>
            <div className="font-display text-5xl font-bold text-gold/70">{s.n}</div>
            <h3 className="mt-1 font-display text-xl font-semibold text-foreground">{s.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* 11. REVIEWS SLIDER ========================================= */
function ReviewsSlider() {
  const [i, setI] = useState(0);
  const len = testimonials.length;
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % len), 6000);
    return () => clearInterval(t);
  }, [len]);
  const t = testimonials[i];
  return (
    <section className="relative overflow-hidden bg-card/40 py-20 sm:py-28">
      <div className="absolute inset-0 gradient-radial-leaf opacity-60" />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            <Star className="size-3.5 fill-gold text-gold" /> 4.9 / 5 from 2,400+ reviews
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Stories from our community
          </h2>
        </div>
        <div className="relative mx-auto mt-14 max-w-4xl">
          <Quote className="absolute -left-4 -top-6 size-24 text-primary/10" />
          <AnimatePresence mode="wait">
            <motion.figure key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.6 }}
              className="relative rounded-[2.5rem] border border-border/60 bg-card p-8 shadow-elegant sm:p-12">
              <div className="flex items-center gap-1 text-gold">
                {Array.from({ length: t.rating }).map((_, k) => <Star key={k} className="size-5 fill-current" />)}
              </div>
              <blockquote className="mt-6 font-display text-xl leading-relaxed text-foreground sm:text-2xl lg:text-3xl">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-border/60 pt-6">
                <img src={t.avatar} alt={t.name} className="size-14 rounded-full ring-2 ring-primary/20" loading="lazy" />
                <div>
                  <div className="font-semibold text-foreground">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role} · {t.city}</div>
                </div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button onClick={() => setI((i - 1 + len) % len)} aria-label="Previous" className="grid size-11 place-items-center rounded-full border border-border bg-card transition hover:bg-accent">
              <ChevronLeft className="size-5" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, n) => (
                <button key={n} onClick={() => setI(n)} aria-label={`Review ${n + 1}`} className={cn("h-2 rounded-full transition-all", n === i ? "w-8 bg-primary" : "w-2 bg-border")} />
              ))}
            </div>
            <button onClick={() => setI((i + 1) % len)} aria-label="Next" className="grid size-11 place-items-center rounded-full border border-border bg-card transition hover:bg-accent">
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* 12. VIDEO GALLERY ========================================== */
const VIDEOS = [
  { thumb: "https://images.unsplash.com/photo-1591735026282-bb24fd6c0451?w=1200&q=85", title: "How to grow Amrapali on your rooftop", duration: "8:24" },
  { thumb: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&q=85", title: "Indoor plant styling for small homes", duration: "5:12" },
  { thumb: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=85", title: "Inside our packing facility", duration: "3:48" },
];
function VideoGallery() {
  return (
    <Section eyebrow="Watch & learn" title="Care guides on video" subtitle="Quick, practical videos from our master gardeners." align="center">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {VIDEOS.map((v, i) => (
          <motion.button key={v.title} type="button" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="group relative block overflow-hidden rounded-3xl text-left shadow-soft hover-lift">
            <SmartImage src={v.thumb} alt={v.title} aspect="video" rounded={false} className="rounded-none transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-0 grid place-items-center">
              <motion.span whileHover={{ scale: 1.1 }}
                className="grid size-20 place-items-center rounded-full bg-white/95 text-primary shadow-elegant transition group-hover:bg-gold group-hover:text-gold-foreground">
                <Play className="size-7 translate-x-0.5 fill-current" />
              </motion.span>
            </div>
            <div className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">{v.duration}</div>
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <h3 className="font-display text-lg font-semibold">{v.title}</h3>
            </div>
          </motion.button>
        ))}
      </div>
    </Section>
  );
}

/* 13. INSTAGRAM ============================================== */
const INSTA = [
  "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80",
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
  "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80",
  "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=800&q=80",
  "https://images.unsplash.com/photo-1591735026282-bb24fd6c0451?w=800&q=80",
  "https://images.unsplash.com/photo-1610917040803-1fccf9623064?w=800&q=80",
];
function InstagramGallery() {
  return (
    <Section bg="muted" align="center" eyebrow="@alltreebd" title={<>Follow us on <span className="text-primary">Instagram</span></>} subtitle="Daily plant inspo, care tips and behind-the-scenes from our nursery.">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
        {INSTA.map((src, i) => (
          <motion.a key={src} href={site.socials.instagram} target="_blank" rel="noreferrer"
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            className="group relative block aspect-square overflow-hidden rounded-2xl shadow-soft">
            <SmartImage src={src} alt="Instagram post" aspect="square" rounded={false} className="rounded-none transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-primary/80 to-gold/80 opacity-0 transition group-hover:opacity-100">
              <Instagram className="size-8 text-white" />
            </div>
          </motion.a>
        ))}
      </div>
      <div className="mt-10 text-center">
        <a href={site.socials.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition hover:bg-accent">
          <Instagram className="size-4" /> @alltreebd · Follow
        </a>
      </div>
    </Section>
  );
}

/* 14. FACEBOOK FEED ========================================== */
function FacebookFeed() {
  const fbPosts = [
    { img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80", text: "New batch of grafted Amrapali mango saplings arrived! Limited stock — order now.", likes: 1240, comments: 86 },
    { img: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=900&q=80", text: "Free monsoon care guide — comment 'guide' and we'll DM you the PDF.", likes: 982, comments: 213 },
    { img: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=900&q=80", text: "Behind the scenes at our Savar packing facility this morning.", likes: 765, comments: 47 },
  ];
  return (
    <Section align="center" eyebrow="@alltreebd" title={<>Latest from <span className="text-primary">Facebook</span></>} subtitle="Join 80,000+ plant lovers in our community.">
      <div className="grid gap-6 md:grid-cols-3">
        {fbPosts.map((p, i) => (
          <motion.article key={p.text} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft hover-lift">
            <div className="flex items-center gap-3 p-4">
              <span className="grid size-10 place-items-center rounded-full gradient-primary text-primary-foreground">
                <Leaf className="size-4" />
              </span>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-foreground">All Tree BD Shop</div>
                <div className="text-xs text-muted-foreground">2 days ago · 🌱</div>
              </div>
              <Facebook className="ml-auto size-5 text-[#1877F2]" />
            </div>
            <SmartImage src={p.img} alt="" aspect="video" rounded={false} className="rounded-none" />
            <div className="p-5">
              <p className="text-sm text-foreground/90">{p.text}</p>
              <div className="mt-4 flex items-center gap-4 border-t border-border/60 pt-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Heart className="size-4 text-destructive" /> {p.likes}</span>
                <span className="inline-flex items-center gap-1.5"><MessageCircle className="size-4" /> {p.comments}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
      <div className="mt-10 text-center">
        <a href={site.socials.facebook} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#1877F2] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
          <Facebook className="size-4" /> Like our page
        </a>
      </div>
    </Section>
  );
}

/* 15. LATEST BLOG ============================================ */
function LatestBlog() {
  return (
    <Section bg="muted" align="center" eyebrow="From the journal" title="Latest gardening stories" subtitle="Tips, guides and seasonal notes from our gardeners.">
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((p, i) => (
          <motion.article key={p.slug} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="group overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft hover-lift">
            <Link to="/blog/$slug" params={{ slug: p.slug }} className="block">
              <div className="relative overflow-hidden">
                <SmartImage src={p.cover} alt={p.title} aspect="video" rounded={false} className="rounded-none transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-soft">{p.category}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><CalendarDays className="size-3.5" />{p.date}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="size-3.5" />{p.readTime}</span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold text-foreground transition group-hover:text-primary">{p.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Read more <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

/* 16. FAQ ==================================================== */
function FaqSection() {
  const [open, setOpen] = useState<number>(0);
  return (
    <Section eyebrow="Got questions?" title="Frequently asked" subtitle="Everything you need to know before ordering." align="center">
      <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="relative hidden overflow-hidden rounded-[2rem] shadow-elegant lg:block">
          <SmartImage src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=85" alt="" aspect="4/5" rounded={false} className="rounded-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-7 text-white">
            <h3 className="font-display text-2xl font-bold">Still curious?</h3>
            <p className="mt-2 text-sm opacity-90">Chat with our care team in Bangla or English — we reply in minutes.</p>
            <a href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`} className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground">
              <MessageCircle className="size-4" /> WhatsApp us
            </a>
          </div>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div key={f.q} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className={cn("overflow-hidden rounded-2xl border border-border/70 bg-card transition", isOpen && "shadow-soft")}>
                <button onClick={() => setOpen(isOpen ? -1 : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left">
                  <span className="font-semibold text-foreground">{f.q}</span>
                  <ChevronDown className={cn("size-5 shrink-0 text-primary transition-transform duration-300", isOpen && "rotate-180")} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* 17. NEWSLETTER ============================================= */
function NewsletterSection() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] shadow-elegant">
          <img src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=2000&q=85" alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-primary-dark/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/85 to-transparent" />
          <div className="relative grid gap-8 p-8 text-primary-foreground sm:p-14 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] backdrop-blur">
                <Mail className="size-3.5 text-gold" /> Plant Letter
              </div>
              <h3 className="mt-4 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
                Seasonal tips, restock alerts & member discounts.
              </h3>
              <p className="font-bn mt-3 text-base text-white/85">প্রতি সপ্তাহে গাছের যত্নের পরামর্শ ইমেইলে</p>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 sm:flex-row">
              <input type="email" required placeholder="your@email.com" className="flex-1 rounded-full border border-white/30 bg-white/15 px-5 py-4 text-sm text-white placeholder:text-white/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40 backdrop-blur" />
              <button type="submit" className="rounded-full bg-gold px-7 py-4 text-sm font-semibold text-gold-foreground shadow-gold transition hover:-translate-y-0.5">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* 18. GOOGLE MAP ============================================= */
function GoogleMap() {
  const contact = [
    { Icon: MapPin, t: "Address", v: site.address },
    { Icon: Phone, t: "Phone", v: site.phone },
    { Icon: Mail, t: "Email", v: site.email },
    { Icon: Clock, t: "Hours", v: "Sat — Thu · 9:00 am — 8:00 pm" },
  ];
  return (
    <Section align="center" eyebrow="Visit us" title="Find our nursery" subtitle="Walk-ins welcome at our Savar hub. Open every day 9am — 8pm.">
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-3xl border border-border/60 shadow-elegant">
          <iframe title="All Tree BD Shop location" src="https://www.google.com/maps?q=Savar,Dhaka,Bangladesh&output=embed"
            className="h-[420px] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </motion.div>
        <div className="space-y-4">
          {contact.map((c) => (
            <div key={c.t} className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl gradient-primary text-primary-foreground">
                <c.Icon className="size-5" />
              </span>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{c.t}</div>
                <div className="mt-1 text-base font-medium text-foreground">{c.v}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* 19. CONTACT BANNER ========================================= */
function ContactBanner() {
  return (
    <section className="relative overflow-hidden">
      <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=2000&q=85" alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/85 to-primary/70" />
      <Container className="relative grid items-center gap-8 py-16 text-primary-foreground sm:py-20 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="font-bn text-sm text-gold">আমরা আপনার জন্য আছি</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            Ready to grow something extraordinary?
          </h2>
          <p className="mt-4 max-w-xl text-base text-white/85">
            Talk to our plant specialists — we'll help you pick the right variety, the right pot, and a care plan that fits your lifestyle.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <a href={`tel:${site.phone}`} className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-semibold text-gold-foreground shadow-gold transition hover:-translate-y-0.5">
            <Phone className="size-4" /> {site.phone}
          </a>
          <Link to="/contact" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-4 text-sm font-semibold backdrop-blur transition hover:bg-white/20">
            Contact form <ArrowRight className="size-4" />
          </Link>
          <a href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5">
            <MessageCircle className="size-4" /> WhatsApp
          </a>
        </div>
      </Container>
    </section>
  );
}
