import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { CategoryCard } from "@/components/common/CategoryCard";
import { categories } from "@/data/categories";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "All Categories — All Tree BD Shop" },
      { name: "description", content: "Explore all plant categories — fruit trees, indoor plants, herbs, flowering plants and rare exotics." },
      { property: "og:title", content: "All Categories — All Tree BD Shop" },
      { property: "og:url", content: "/categories" },
    ],
    links: [{ rel: "canonical", href: "/categories" }],
  }),
  component: () => (
    <PageLayout>
      <PageHeader
        crumbs={[{ label: "Home", to: "/" }, { label: "Categories" }]}
        title="Browse by category"
        subtitle="From dwarf grafted mangoes to rare tropicals, find the right green companion for every space."
      />
      <Container className="py-12">
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((c, i) => <CategoryCard key={c.slug} category={c} index={i} />)}
        </div>
      </Container>
    </PageLayout>
  ),
});
