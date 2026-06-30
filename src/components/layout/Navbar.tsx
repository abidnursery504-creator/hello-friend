import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Heart, Leaf, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ThemeToggle } from "./ThemeToggle";
import { SearchOverlay } from "./SearchOverlay";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";
import { categories } from "@/data/categories";
import { SmartImage } from "@/components/common/SmartImage";
import { toBnDigits } from "@/lib/format";

const nav = [
  { to: "/", label: "হোম" },
  { to: "/shop", label: "শপ" },
  { to: "/categories", label: "বিভাগ", mega: true },
  { to: "/blog", label: "ব্লগ" },
  { to: "/care-guide", label: "পরিচর্যা গাইড" },
  { to: "/about", label: "আমাদের সম্পর্কে" },
  { to: "/contact", label: "যোগাযোগ" },
] as const;

export function Navbar() {
  const cart = useCart();
  const wish = useWishlist();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      {/* Top promo bar */}
      <div className="hidden bg-primary-dark text-primary-foreground sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs sm:px-6 lg:px-8">
          <p className="font-bn opacity-90">৳{toBnDigits(site.shipping.freeAbove)}+ অর্ডারে ফ্রি ডেলিভারি · ৬৪ জেলায় ক্যাশ অন ডেলিভারি</p>
          <div className="font-bn flex items-center gap-4 opacity-90">
            <a href={`tel:${site.phone}`} className="hover:text-gold">{site.phone}</a>
            <span className="opacity-40">|</span>
            <Link to="/track-order" className="hover:text-gold">অর্ডার ট্র্যাক করুন</Link>
          </div>
        </div>
      </div>

      {/* Mobile promo strip — sits above the header */}
      <div className="bg-[#0E3A18] text-white lg:hidden">
        <div className="flex items-center justify-center gap-2 px-3 py-1.5">
          <span className="font-bn inline-flex items-center gap-1.5 rounded-full border border-gold/60 px-3 py-1 text-[11px] font-medium">
            <Leaf className="size-3 text-gold" />
            সারা বাংলাদেশে হোম ডেলিভারি
          </span>
          <span className="font-bn inline-flex items-center gap-1.5 rounded-full border border-gold/60 px-3 py-1 text-[11px] font-medium">
            <Leaf className="size-3 text-gold" />
            ক্যাশ অন ডেলিভারির সুবিধা
          </span>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled ? "glass-strong shadow-soft" : "bg-background lg:bg-background/0",
        )}
      >
        {/* Mobile header: hamburger | centered logo | actions */}
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 px-3 py-2.5 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-xl text-foreground"
            aria-label="মেনু খুলুন"
            aria-expanded={open}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>

          <Link to="/" className="flex flex-col items-center justify-center leading-tight">
            <span className="flex items-center gap-1.5">
              <Leaf className="size-4 text-primary" />
              <span className="font-display text-[22px] font-extrabold tracking-tight text-primary">Abid</span>
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-primary/80">Nursery and Plants</span>
            <span className="font-bn -mt-0.5 text-[10px] text-muted-foreground">ফল ও ফুলের গাছ বিক্রয় কেন্দ্র</span>
          </Link>

          <div className="flex items-center justify-end gap-0.5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="খুঁজুন"
              className="grid size-10 place-items-center rounded-xl text-foreground"
            >
              <Search className="size-5" />
            </button>
            <Link to="/login" aria-label="একাউন্ট" className="grid size-10 place-items-center rounded-xl text-foreground">
              <User className="size-5" />
            </Link>
            <Link to="/cart" aria-label="কার্ট" className="relative grid size-10 place-items-center rounded-xl text-foreground">
              <ShoppingBag className="size-5" />
              {cart.totalQty > 0 && (
                <span className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-gold text-[9px] font-bold text-gold-foreground">
                  {toBnDigits(cart.totalQty)}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Desktop header */}
        <div className="mx-auto hidden max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 lg:grid lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-10 shrink-0 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-soft">
              <Leaf className="size-5" />
            </span>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="font-display truncate text-base font-bold text-foreground">All Tree BD</span>
              <span className="font-bn -mt-0.5 truncate text-[11px] text-muted-foreground">গাছের চারা বিক্রয়</span>
            </span>
          </Link>


          {/* Desktop nav */}
          <nav className="flex items-center justify-center gap-1" aria-label="মূল নেভিগেশন">
            {nav.map((n) => {
              const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
              const isMega = "mega" in n && n.mega;
              return (
                <div
                  key={n.to}
                  className="relative"
                  onMouseEnter={() => isMega && setMegaOpen(true)}
                  onMouseLeave={() => isMega && setMegaOpen(false)}
                >
                  <Link
                    to={n.to}
                    className={cn(
                      "font-bn relative inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition",
                      active ? "text-primary" : "text-foreground/80 hover:text-primary",
                    )}
                  >
                    {n.label}
                    {isMega && <ChevronDown className="size-3.5 opacity-70" />}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>

                  {isMega && (
                    <AnimatePresence>
                      {megaOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-1/2 top-full z-40 mt-3 w-[min(900px,90vw)] -translate-x-1/2"
                        >
                          <div className="glass-strong rounded-3xl border border-border p-5 shadow-elegant">
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                              {categories.slice(0, 6).map((c) => (
                                <Link
                                  key={c.slug}
                                  to="/categories/$slug"
                                  params={{ slug: c.slug }}
                                  className="group flex items-center gap-3 rounded-2xl border border-transparent bg-card/40 p-2 transition hover:-translate-y-0.5 hover:border-border hover:shadow-soft"
                                >
                                  <SmartImage src={c.image} alt={c.name} aspect="square" className="size-14 shrink-0 rounded-xl" />
                                  <div className="min-w-0">
                                    <div className="font-bn truncate text-sm font-semibold text-foreground group-hover:text-primary">{c.name}</div>
                                    <div className="font-bn truncate text-[11px] text-muted-foreground">{c.nameBn}</div>
                                    <div className="font-bn text-[11px] text-primary/80">{toBnDigits(c.count)}টি জাত</div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                            <div className="font-bn mt-4 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                              <span>প্রিমিয়াম গ্রাফটিং চারা · ৭ দিনের গ্যারান্টি</span>
                              <Link to="/categories" className="font-semibold text-primary hover:underline">সব বিভাগ দেখুন →</Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="খুঁজুন"
              className="grid size-10 place-items-center rounded-full border border-border bg-card text-foreground transition hover:bg-accent"
            >
              <Search className="size-4" />
            </button>
            <ThemeToggle />
            <Link to="/account/wishlist" aria-label="ইচ্ছার তালিকা" className="relative grid size-10 place-items-center rounded-full border border-border bg-card text-foreground transition hover:bg-accent">
              <Heart className="size-4" />
              {wish.slugs.length > 0 && (
                <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                  {toBnDigits(wish.slugs.length)}
                </span>
              )}
            </Link>
            <Link to="/cart" aria-label="কার্ট" className="relative grid size-10 place-items-center rounded-full gradient-primary text-primary-foreground shadow-soft transition hover:shadow-elegant">
              <ShoppingBag className="size-4" />
              {cart.totalQty > 0 && (
                <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-gold text-[10px] font-bold text-gold-foreground">
                  {toBnDigits(cart.totalQty)}
                </span>
              )}
            </Link>
            <Link to="/login" aria-label="একাউন্ট" className="grid size-10 place-items-center rounded-full border border-border bg-card text-foreground transition hover:bg-accent">
              <User className="size-4" />
            </Link>
          </div>

        </div>


        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-border bg-background lg:hidden"
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
                {nav.map((n) => {
                  const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
                  return (
                    <Link
                      key={n.to}
                      to={n.to}
                      className={cn(
                        "font-bn flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition",
                        active ? "bg-primary/10 text-primary" : "text-foreground hover:bg-accent",
                      )}
                    >
                      <span>{n.label}</span>
                    </Link>
                  );
                })}
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => { setOpen(false); setSearchOpen(true); }}
                    className="font-bn flex flex-1 items-center gap-2 rounded-2xl border border-border px-4 py-3 text-sm"
                  >
                    <Search className="size-4" /> গাছ খুঁজুন
                  </button>
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
