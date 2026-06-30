import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, User } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { SmartImage } from "@/components/common/SmartImage";
import { posts } from "@/data/site";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog & Care Guides — All Tree BD Shop" },
      { name: "description", content: "Plant care guides, seasonal tips and gardening stories from our growers." },
      { property: "og:title", content: "Blog — All Tree BD Shop" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <PageLayout>
      <PageHeader crumbs={[{ label: "Home", to: "/" }, { label: "Blog" }]} title="Plant stories & care guides" subtitle="From rooftop mangoes to monsoon survival — written by gardeners, for gardeners." />
      <Container className="py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition hover-lift">
              <SmartImage src={p.cover} alt={p.title} aspect="video" rounded={false} />
              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">{p.category}</span>
                <h3 className="mt-2 font-display text-xl font-semibold leading-tight transition group-hover:text-primary">{p.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
                <div className="mt-4 flex items-center gap-4 border-t pt-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><User className="size-3.5" /> {p.author}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="size-3.5" /> {p.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </PageLayout>
  );
}
