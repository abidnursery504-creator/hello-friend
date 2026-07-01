import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { ProductCard } from "@/components/common/ProductCard";
import { useProducts } from "@/hooks/useCatalog";
import { toBnDigits } from "@/lib/format";
import { z } from "zod";

export const Route = createFileRoute("/search")({
  validateSearch: z.object({ q: z.string().optional() }),
  head: () => ({ meta: [{ title: "গাছ খুঁজুন — অল ট্রি বিডি শপ" }, { name: "robots", content: "noindex" }] }),
  component: SearchPage,
});

function SearchPage() {
  const sp = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const [q, setQ] = useState(sp.q ?? "");
  const { data: products = [] } = useProducts();
  const results = useMemo(() => {
    if (!sp.q) return [];
    const s = sp.q.toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(s) || p.nameBn.includes(sp.q!) || p.category.includes(s));
  }, [sp.q, products]);

  return (
    <PageLayout>
      <PageHeader crumbs={[{ label: "হোম", to: "/" }, { label: "খোঁজ" }]} title="গাছ খুঁজুন" subtitle="নাম বা বিভাগ দিয়ে পছন্দের গাছ খুঁজে নিন।" />
      <Container className="py-12">
        <form onSubmit={(e) => { e.preventDefault(); navigate({ search: { q: q || undefined } }); }} className="mx-auto flex max-w-2xl items-center gap-2 rounded-full border border-border bg-card p-2 shadow-soft">
          <Search className="ml-3 size-5 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="আম, লেবু, মনস্টেরা…" className="font-bn flex-1 bg-transparent px-2 py-2 text-sm focus:outline-none" autoFocus />
          <button type="submit" className="font-bn rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">খুঁজুন</button>
        </form>

        <div className="mt-10">
          {sp.q ? (
            results.length > 0 ? (
              <>
                <p className="font-bn mb-6 text-sm text-muted-foreground">"{sp.q}" এর জন্য {toBnDigits(results.length)}টি ফলাফল</p>
                <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
                  {results.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
                </div>
              </>
            ) : (
              <p className="font-bn py-16 text-center text-muted-foreground">"{sp.q}" এর কোনো ফলাফল নেই।</p>
            )
          ) : (
            <p className="font-bn py-16 text-center text-muted-foreground">পছন্দের গাছ খুঁজতে টাইপ শুরু করুন।</p>
          )}
        </div>
      </Container>
    </PageLayout>
  );
}
