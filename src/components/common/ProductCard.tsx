import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { SmartImage } from "./SmartImage";
import { formatBDT } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const badgeColor: Record<string, string> = {
  Bestseller: "bg-gold text-gold-foreground",
  New: "bg-primary text-primary-foreground",
  Limited: "bg-foreground text-background",
  Grafted: "bg-primary-light/90 text-primary-foreground",
  Organic: "bg-primary/10 text-primary border border-primary/20",
};

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const cart = useCart();
  const wish = useWishlist();
  const liked = wish.has(product.slug);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card p-3 shadow-soft transition-all duration-500 hover-lift"
    >
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="relative block overflow-hidden rounded-2xl"
        aria-label={product.name}
      >
        <SmartImage
          src={product.image}
          alt={product.name}
          aspect="square"
          className="transition-transform duration-700 group-hover:scale-105"
        />

        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between">
          <div className="flex flex-col gap-1.5">
            {product.badges?.slice(0, 2).map((b) => (
              <span key={b} className={cn("rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase shadow-sm", badgeColor[b])}>
                {b}
              </span>
            ))}
            {discount > 0 && (
              <span className="rounded-full bg-destructive px-2.5 py-1 text-[10px] font-bold uppercase text-destructive-foreground shadow-sm">
                −{discount}%
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => { e.preventDefault(); wish.toggle(product.slug); }}
          aria-label="Toggle wishlist"
          aria-pressed={liked}
          className="pointer-events-auto absolute right-3 top-3 grid size-9 place-items-center rounded-full glass-strong text-foreground transition hover:scale-110"
        >
          <Heart className={cn("size-4 transition", liked && "fill-destructive text-destructive")} />
        </button>

        {!product.inStock && (
          <div className="absolute inset-x-3 bottom-3 rounded-full bg-foreground/85 px-3 py-1.5 text-center text-xs font-medium text-background backdrop-blur">
            Out of stock
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-gold text-gold" />
          <span className="font-medium text-foreground">{product.rating.toFixed(1)}</span>
          <span>· {product.reviews} reviews</span>
        </div>

        <Link to="/products/$slug" params={{ slug: product.slug }} className="line-clamp-1 font-semibold text-foreground transition group-hover:text-primary">
          {product.name}
        </Link>
        <p className="font-bn line-clamp-1 text-sm text-muted-foreground">{product.nameBn}</p>

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div>
            <div className="text-lg font-bold text-primary">{formatBDT(product.price)}</div>
            {product.oldPrice && (
              <div className="text-xs text-muted-foreground line-through">{formatBDT(product.oldPrice)}</div>
            )}
          </div>
          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => { cart.add(product); toast.success(`${product.name} added to cart`); }}
            className="inline-flex size-10 items-center justify-center rounded-full gradient-primary text-primary-foreground shadow-soft transition hover:scale-110 hover:shadow-elegant disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            aria-label="Add to cart"
          >
            <ShoppingBag className="size-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
