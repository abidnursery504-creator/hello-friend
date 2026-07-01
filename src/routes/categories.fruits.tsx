import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { CategoryCard } from "@/components/common/CategoryCard";
import { ensureCategories, useCategories } from "@/hooks/useCatalog";

const FRUIT_SLUGS = ["mango", "citrus", "guava", "litchi", "tropical"];

export const Route = createFileRoute("/categories/fruits")({
  loader: ({ context }) => ensureCategories(context.queryClient),
  head: () => ({
    meta: [
      { title: "ফল গাছ — সব বিভাগ" },
      { name: "description", content: "আম, লেবু, পেয়ারা, লিচু, বিদেশি ফল — সব ধরনের ফল গাছের চারা।" },
      { property: "og:title", content: "ফল গাছ — সব বিভাগ" },
    ],
    links: [{ rel: "canonical", href: "/categories/fruits" }],
  }),
  component: FruitsHub,
});

function FruitsHub() {
  const { data: categories = [] } = useCategories();
  const items = categories.filter((c) => FRUIT_SLUGS.includes(c.slug));
  return (
    <PageLayout>
      <PageHeader
        crumbs={[{ label: "হোম", to: "/" }, { label: "বিভাগ", to: "/categories" }, { label: "ফল গাছ" }]}
        title="ফল গাছ"
        subtitle="দেশি-বিদেশি বিভিন্ন প্রজাতির ফল গাছের চারা — যেকোনো ক্যাটাগরিতে ক্লিক করুন।"
      />
      <Container className="py-10">
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {items.map((c, i) => <CategoryCard key={c.slug} category={c} index={i} />)}
        </div>
      </Container>
    </PageLayout>
  );
}
