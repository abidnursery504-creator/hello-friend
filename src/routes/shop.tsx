import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Filter, SlidersHorizontal, X } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { ProductCard } from "@/components/common/ProductCard";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";
import { z } from "zod";

const search = z.object({
  category: z.string().optional(),
  sort: z.enum(["new", "bestseller", "price-asc", "price-desc", "rating"]).optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Shop All Plants — All Tree BD Shop" },
      { name: "description", content: "Browse our full collection of grafted fruit plants, indoor greens, herbs and rare tropicals." },
      { property: "og:title", content: "Shop All Plants — All Tree BD Shop" },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: Shop,
});

function Shop() {
  const sp = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (sp.category) list = list.filter((p) => p.category === sp.category);
    if (sp.q) {
      const q = sp.q.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.nameBn.includes(sp.q!));
    }
    switch (sp.sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "new": list = list.filter((p) => p.badges?.includes("New")).concat(list.filter((p) => !p.badges?.includes("New"))); break;
      case "bestseller": list = list.filter((p) => p.badges?.includes("Bestseller")).concat(list.filter((p) => !p.badges?.includes("Bestseller"))); break;
    }
    return list;
  }, [sp]);

  return (
    <PageLayout>
      <PageHeader
        crumbs={[{ label: "Home", to: "/" }, { label: "Shop" }]}
        title="All plants"
        subtitle={`${filtered.length} hand-picked varieties ready to ship across Bangladesh.`}
        actions={
          <>
            <select
              value={sp.sort ?? ""}
              onChange={(e) => navigate({ search: { ...sp, sort: (e.target.value || undefined) as typeof sp.sort } })}
              className="rounded-full border border-border bg-card px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
            >
              <option value="">Featured</option>
              <option value="new">Newest</option>
              <option value="bestseller">Bestsellers</option>
              <option value="rating">Top rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium lg:hidden">
              <SlidersHorizontal className="size-4" /> Filters
            </button>
          </>
        }
      />
      <Container className="grid gap-8 py-12 lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className={cn("fixed inset-0 z-50 bg-background/95 p-4 backdrop-blur lg:static lg:bg-transparent lg:p-0", !open && "hidden lg:block")}>
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <h3 className="font-semibold">Filters</h3>
            <button aria-label="Close filters" onClick={() => setOpen(false)} className="grid size-9 place-items-center rounded-full border"><X className="size-4" /></button>
          </div>
          <div className="space-y-6 rounded-3xl border border-border bg-card p-5">
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground"><Filter className="size-4" /> Categories</h4>
              <div className="space-y-1">
                <button
                  onClick={() => navigate({ search: { ...sp, category: undefined } })}
                  className={cn("w-full rounded-full px-3 py-2 text-left text-sm transition", !sp.category ? "bg-primary/10 text-primary font-medium" : "hover:bg-accent")}
                >
                  All categories
                </button>
                {categories.map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => navigate({ search: { ...sp, category: c.slug } })}
                    className={cn("flex w-full items-center justify-between rounded-full px-3 py-2 text-left text-sm transition", sp.category === c.slug ? "bg-primary/10 text-primary font-medium" : "hover:bg-accent")}
                  >
                    <span>{c.name}</span>
                    <span className="text-xs text-muted-foreground">{c.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="grid place-items-center rounded-3xl border border-dashed py-24 text-center">
            <p className="text-muted-foreground">No plants match your filters.</p>
            <button onClick={() => navigate({ search: {} })} className="mt-4 rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground">Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
          </div>
        )}
      </Container>
    </PageLayout>
  );
}
