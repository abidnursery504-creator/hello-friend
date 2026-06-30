import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { CategoryCard } from "@/components/common/CategoryCard";
import { categories } from "@/data/categories";

export const Route = createFileRoute("/categories/")({
  head: () => ({
    meta: [
      { title: "সব বিভাগ — অল ট্রি বিডি শপ" },
      { name: "description", content: "ফল গাছ, ইনডোর গাছ, ভেষজ, ফুলের গাছ ও বিদেশি দুর্লভ চারা — সব বিভাগ একসাথে।" },
      { property: "og:title", content: "সব বিভাগ — অল ট্রি বিডি শপ" },
      { property: "og:url", content: "/categories" },
    ],
    links: [{ rel: "canonical", href: "/categories" }],
  }),
  component: () => (
    <PageLayout>
      <PageHeader
        crumbs={[{ label: "হোম", to: "/" }, { label: "বিভাগ" }]}
        title="বিভাগ অনুযায়ী দেখুন"
        subtitle="বামন গ্রাফটিং আম থেকে দুর্লভ বিদেশি ফল — প্রতিটি জায়গার জন্য সঠিক সবুজ সঙ্গী।"
      />
      <Container className="py-12">
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((c, i) => <CategoryCard key={c.slug} category={c} index={i} />)}
        </div>
      </Container>
    </PageLayout>
  ),
});
