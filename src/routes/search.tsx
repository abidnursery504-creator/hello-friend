import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { ProductCard } from "@/components/common/ProductCard";
import { products } from "@/data/products";
import { z } from "zod";

export const Route = createFileRoute("/search")({
  validateSearch: z.object({ q: z.string().optional() }),
  head: () => ({ meta: [{ title: "Search — All Tree BD Shop" }, { name: "robots", content: "noindex" }] }),
  component: SearchPage,
});

function SearchPage() {
  const sp = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const [q, setQ] = useState(sp.q ?? "");
  const results = useMemo(() => {
    if (!sp.q) return [];
    const s = sp.q.toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(s) || p.nameBn.includes(sp.q!) || p.category.includes(s));
  }, [sp.q]);

  return (
    <PageLayout>
      <PageHeader crumbs={[{ label: "Home", to: "/" }, { label: "Search" }]} title="Search plants" subtitle="Find the perfect plant by name or category." />
      <Container className="py-12">
        <form onSubmit={(e) => { e.preventDefault(); navigate({ search: { q: q || undefined } }); }} className="mx-auto flex max-w-2xl items-center gap-2 rounded-full border border-border bg-card p-2 shadow-soft">
          <Search className="ml-3 size-5 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Mango, lemon, monstera…" className="flex-1 bg-transparent px-2 py-2 text-sm focus:outline-none" autoFocus />
          <button type="submit" className="rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Search</button>
        </form>

        <div className="mt-10">
          {sp.q ? (
            results.length > 0 ? (
              <>
                <p className="mb-6 text-sm text-muted-foreground">{results.length} result{results.length === 1 ? "" : "s"} for "<span className="text-foreground">{sp.q}</span>"</p>
                <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
                  {results.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
                </div>
              </>
            ) : (
              <p className="py-16 text-center text-muted-foreground">No plants matched "{sp.q}".</p>
            )
          ) : (
            <p className="py-16 text-center text-muted-foreground">Start typing to find your next plant.</p>
          )}
        </div>
      </Container>
    </PageLayout>
  );
}
