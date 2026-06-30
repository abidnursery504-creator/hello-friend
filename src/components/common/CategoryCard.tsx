import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Category } from "@/data/categories";
import { SmartImage } from "./SmartImage";

export function CategoryCard({ category, index = 0 }: { category: Category; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.4) }}
    >
      <Link
        to="/categories/$slug"
        params={{ slug: category.slug }}
        className="group relative block overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft transition-all duration-500 hover-lift"
      >
        <SmartImage
          src={category.image}
          alt={category.name}
          aspect="4/5"
          rounded={false}
          className="rounded-none"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white">
          <div className="min-w-0">
            <p className="font-bn text-sm opacity-80">{category.nameBn}</p>
            <h3 className="truncate font-display text-xl font-semibold">{category.name}</h3>
            <p className="mt-0.5 text-xs opacity-75">{category.count} varieties</p>
          </div>
          <div className="grid size-11 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur-md transition group-hover:bg-gold group-hover:text-gold-foreground">
            <ArrowUpRight className="size-5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
