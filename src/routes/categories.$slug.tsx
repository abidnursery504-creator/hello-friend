import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { ProductCard } from "@/components/common/ProductCard";
import { getCategoryBySlug, categories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";

export const Route = createFileRoute("/categories/$slug")({
  loader: ({ params }) => {
    const category = getCategoryBySlug(params.slug);
    if (!category) throw notFound();
    return { category, items: getProductsByCategory(params.slug) };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.category;
    if (!c) return {};
    return {
      meta: [
        { title: `${c.name} — All Tree BD Shop` },
        { name: "description", content: c.description },
        { property: "og:title", content: `${c.name} — All Tree BD Shop` },
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
        <h1 className="font-display text-3xl font-bold">Category not found</h1>
        <Link to="/categories" className="mt-4 inline-block text-primary underline">All categories</Link>
      </Container>
    </PageLayout>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category, items } = Route.useLoaderData();
  return (
    <PageLayout>
      <PageHeader
        crumbs={[{ label: "Home", to: "/" }, { label: "Categories", to: "/categories" }, { label: category.name }]}
        title={category.name}
        subtitle={category.description}
      >
        <p className="font-bn mt-2 text-lg text-primary-dark dark:text-primary-light">{category.nameBn}</p>
      </PageHeader>
      <Container className="py-12">
        {items.length === 0 ? (
          <div className="grid place-items-center rounded-3xl border border-dashed py-24 text-center">
            <p className="text-muted-foreground">Coming soon — restock in progress.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {items.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
          </div>
        )}

        <div className="mt-16 border-t border-border/60 pt-10">
          <h3 className="mb-5 font-display text-xl font-semibold">Explore other categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.filter((c) => c.slug !== category.slug).map((c) => (
              <Link key={c.slug} to="/categories/$slug" params={{ slug: c.slug }} className="rounded-full border border-border bg-card px-4 py-2 text-sm transition hover:bg-accent">
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}
