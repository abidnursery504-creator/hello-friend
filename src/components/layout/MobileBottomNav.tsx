import { Link, useRouterState } from "@tanstack/react-router";
import { Apple, Flower2, Home, Phone, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";
import { toBnDigits } from "@/lib/format";

const items = [
  { to: "/", label: "হোম", icon: Home, match: (p: string) => p === "/" },
  { to: "/categories/mango", label: "ফল গাছ", icon: Apple, match: (p: string) => p.startsWith("/categories/mango") || p.startsWith("/categories/citrus") || p.startsWith("/categories/litchi") || p.startsWith("/categories/guava") || p.startsWith("/categories/tropical") },
  { to: "/categories/flowering", label: "ফুল গাছ", icon: Flower2, match: (p: string) => p.startsWith("/categories/flowering") },
  { to: "/shop", label: "অফার", icon: Tag, match: (p: string) => p.startsWith("/shop") },
  { to: "/contact", label: "যোগাযোগ", icon: Phone, match: (p: string) => p.startsWith("/contact") },
];


export function MobileBottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const cart = useCart();
  const wish = useWishlist();

  return (
    <nav
      aria-label="মূল মেনু"
      className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
      style={{ paddingBottom: "max(0px, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-3 mb-3 overflow-hidden rounded-3xl border border-border/60 bg-background/85 shadow-elegant backdrop-blur-xl">
        <ul className="grid grid-cols-5">
          {items.map((it) => {
            const active = it.match(pathname);
            const Icon = it.icon;
            const count = 0;
            void cart; void wish;
            return (

              <li key={it.to} className="relative">
                <Link
                  to={it.to}
                  aria-label={it.label}
                  aria-current={active ? "page" : undefined}
                  className="group flex flex-col items-center justify-center gap-1 px-1 py-2.5"
                >
                  <span className="relative grid size-10 place-items-center">
                    {active && (
                      <motion.span
                        layoutId="mob-nav-active"
                        className="absolute inset-0 rounded-2xl gradient-primary shadow-soft"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <Icon
                      className={cn(
                        "relative size-5 transition",
                        active ? "text-primary-foreground" : "text-foreground/70 group-hover:text-primary",
                      )}
                    />
                    {count > 0 && (
                      <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-gold text-[10px] font-bold text-gold-foreground">
                        {count > 9 ? "৯+" : toBnDigits(count)}
                      </span>
                    )}
                  </span>
                  <span
                    className={cn(
                      "font-bn text-[10px] font-medium leading-none transition",
                      active ? "text-primary" : "text-foreground/70",
                    )}
                  >
                    {it.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
