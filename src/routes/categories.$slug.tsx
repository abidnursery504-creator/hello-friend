import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { ProductCard } from "@/components/common/ProductCard";
import { ensureCategory, useCategories, useProductsByCategory } from "@/hooks/useCatalog";

export const Route = createFileRoute("/categories/$slug")({
  loader: async ({ params, context }) => {
    const category = await ensureCategory(context.queryClient, params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.category;
    if (!c) return {};
    return {
      meta: [
        { title: `${c.name} — অল ট্রি বিডি শপ` },
        { name: "description", content: c.description },
        { property: "og:title", content: `${c.name} — অল ট্রি বিডি শপ` },
        { property: "og:description", content: c.description },
        { property: "og:image", content: c.image },
        { property: "og:url", content: `/categories/${c.slug}` },
      ],
      links: [{ rel: "canonical", href: `/categories/${c.slug}` }],
    };
  },
  notFoundComponent: () => (
    <PageLayout>
      <Container className="py-24 text-center">
        <h1 className="font-bn font-display text-3xl font-bold">বিভাগটি পাওয়া যায়নি</h1>
        <Link to="/categories" className="font-bn mt-4 inline-block text-primary underline">সব বিভাগ দেখুন</Link>
      </Container>
    </PageLayout>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const { data: items = [] } = useProductsByCategory(category.slug);
  const { data: categories = [] } = useCategories();
  return (
    <PageLayout>
      <PageHeader
        crumbs={[{ label: "হোম", to: "/" }, { label: "বিভাগ", to: "/categories" }, { label: category.name }]}
        title={category.name}
        subtitle={category.description}
      />
      <Container className="py-12">
        {items.length === 0 ? (
          <div className="grid place-items-center rounded-3xl border border-dashed py-24 text-center">
            <p className="font-bn text-muted-foreground">শীঘ্রই আসছে — নতুন স্টক প্রস্তুত হচ্ছে।</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {items.map((p: typeof items[number], i: number) => <ProductCard key={p.slug} product={p} index={i} />)}
          </div>
        )}

        <div className="mt-16 border-t border-border/60 pt-10">
          <h3 className="font-bn mb-5 font-display text-xl font-semibold">অন্যান্য বিভাগ দেখুন</h3>
          <div className="flex flex-wrap gap-2">
            {categories.filter((c) => c.slug !== category.slug).map((c) => (
              <Link key={c.slug} to="/categories/$slug" params={{ slug: c.slug }} className="font-bn rounded-full border border-border bg-card px-4 py-2 text-sm transition hover:bg-accent">
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}
