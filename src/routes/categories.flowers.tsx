import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { CategoryCard } from "@/components/common/CategoryCard";
import { ensureCategories, useCategories } from "@/hooks/useCatalog";

const FLOWER_SLUGS = ["flowering", "indoor", "herbs"];

export const Route = createFileRoute("/categories/flowers")({
  loader: ({ context }) => ensureCategories(context.queryClient),
  head: () => ({
    meta: [
      { title: "ফুল ও সবুজ গাছ — সব বিভাগ" },
      { name: "description", content: "বিভিন্ন রঙের ফুলের গাছ, ইনডোর গাছ ও ভেষজ — আপনার বাগানের জন্য।" },
      { property: "og:title", content: "ফুল ও সবুজ গাছ — সব বিভাগ" },
    ],
    links: [{ rel: "canonical", href: "/categories/flowers" }],
  }),
  component: FlowersHub,
});

function FlowersHub() {
  const { data: categories = [] } = useCategories();
  const items = categories.filter((c) => FLOWER_SLUGS.includes(c.slug));
  return (
    <PageLayout>
      <PageHeader
        crumbs={[{ label: "হোম", to: "/" }, { label: "বিভাগ", to: "/categories" }, { label: "ফুল গাছ" }]}
        title="ফুল গাছ"
        subtitle="বিভিন্ন রঙের ফুলের গাছ আপনার বাগানের জন্য — যেকোনো ক্যাটাগরিতে ক্লিক করুন।"
      />
      <Container className="py-10">
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {items.map((c, i) => <CategoryCard key={c.slug} category={c} index={i} />)}
        </div>
      </Container>
    </PageLayout>
  );
}
