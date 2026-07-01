import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Filter, SlidersHorizontal, X } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { ProductCard } from "@/components/common/ProductCard";
import { ensureCategories, ensureProducts, useCategories, useProducts } from "@/hooks/useCatalog";
import { cn } from "@/lib/utils";
import { toBnDigits } from "@/lib/format";
import { z } from "zod";

const search = z.object({
  category: z.string().optional(),
  sort: z.enum(["new", "bestseller", "price-asc", "price-desc", "rating"]).optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: search,
  loader: async ({ context }) => {
    await Promise.all([ensureProducts(context.queryClient), ensureCategories(context.queryClient)]);
  },
  head: () => ({
    meta: [
      { title: "সব গাছ — অল ট্রি বিডি শপ" },
      { name: "description", content: "গ্রাফটিং ফল গাছ, ইনডোর গাছ, ভেষজ ও বিদেশি দুর্লভ চারার সম্পূর্ণ কালেকশন।" },
      { property: "og:title", content: "সব গাছ — অল ট্রি বিডি শপ" },
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
  const { data: products = [] } = useProducts();
  const { data: categories = [] } = useCategories();

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
      case "new": list = list.filter((p) => p.badges?.includes("নতুন")).concat(list.filter((p) => !p.badges?.includes("নতুন"))); break;
      case "bestseller": list = list.filter((p) => p.badges?.includes("বেস্ট সেলার")).concat(list.filter((p) => !p.badges?.includes("বেস্ট সেলার"))); break;
    }
    return list;
  }, [sp, products]);

  return (
    <PageLayout>
      <PageHeader
        crumbs={[{ label: "হোম", to: "/" }, { label: "সব গাছ" }]}
        title="সব গাছ"
        subtitle={`${toBnDigits(filtered.length)}টি হাতে বাছাই করা জাত — সারা বাংলাদেশে ডেলিভারির জন্য প্রস্তুত।`}
        actions={
          <>
            <select
              value={sp.sort ?? ""}
              onChange={(e) => navigate({ search: { ...sp, sort: (e.target.value || undefined) as typeof sp.sort } })}
              className="font-bn rounded-full border border-border bg-card px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
              aria-label="সাজান"
            >
              <option value="">ফিচার্ড</option>
              <option value="new">নতুন</option>
              <option value="bestseller">বেস্ট সেলার</option>
              <option value="rating">সর্বোচ্চ রেটিং</option>
              <option value="price-asc">মূল্য: কম থেকে বেশি</option>
              <option value="price-desc">মূল্য: বেশি থেকে কম</option>
            </select>
            <button onClick={() => setOpen(true)} className="font-bn inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium lg:hidden">
              <SlidersHorizontal className="size-4" /> ফিল্টার
            </button>
          </>
        }
      />
      <Container className="grid gap-8 py-12 lg:grid-cols-[260px_1fr]">
        <aside className={cn("fixed inset-0 z-50 bg-background/95 p-4 backdrop-blur lg:static lg:bg-transparent lg:p-0", !open && "hidden lg:block")}>
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <h3 className="font-bn font-semibold">ফিল্টার</h3>
            <button aria-label="বন্ধ করুন" onClick={() => setOpen(false)} className="grid size-9 place-items-center rounded-full border"><X className="size-4" /></button>
          </div>
          <div className="space-y-6 rounded-3xl border border-border bg-card p-5">
            <div>
              <h4 className="font-bn mb-3 flex items-center gap-2 text-sm font-semibold text-foreground"><Filter className="size-4" /> বিভাগ</h4>
              <div className="space-y-1">
                <button
                  onClick={() => navigate({ search: { ...sp, category: undefined } })}
                  className={cn("font-bn w-full rounded-full px-3 py-2 text-left text-sm transition", !sp.category ? "bg-primary/10 text-primary font-medium" : "hover:bg-accent")}
                >
                  সব বিভাগ
                </button>
                {categories.map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => navigate({ search: { ...sp, category: c.slug } })}
                    className={cn("font-bn flex w-full items-center justify-between rounded-full px-3 py-2 text-left text-sm transition", sp.category === c.slug ? "bg-primary/10 text-primary font-medium" : "hover:bg-accent")}
                  >
                    <span>{c.name}</span>
                    <span className="text-xs text-muted-foreground">{toBnDigits(c.count)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {filtered.length === 0 ? (
          <div className="grid place-items-center rounded-3xl border border-dashed py-24 text-center">
            <p className="font-bn text-muted-foreground">এই ফিল্টারে কোনো গাছ পাওয়া যায়নি।</p>
            <button onClick={() => navigate({ search: {} })} className="font-bn mt-4 rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground">ফিল্টার মুছুন</button>
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
