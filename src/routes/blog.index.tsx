import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, User } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { SmartImage } from "@/components/common/SmartImage";
import { posts } from "@/data/site";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "ব্লগ ও পরিচর্যা গাইড — অল ট্রি বিডি শপ" },
      { name: "description", content: "গাছ পরিচর্যার গাইড, মৌসুমী টিপস ও আমাদের চাষিদের গল্প।" },
      { property: "og:title", content: "ব্লগ — অল ট্রি বিডি শপ" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <PageLayout>
      <PageHeader crumbs={[{ label: "হোম", to: "/" }, { label: "ব্লগ" }]} title="গাছের গল্প ও পরিচর্যা গাইড" subtitle="ছাদে আম চাষ থেকে বর্ষার সংগ্রাম — বাগানিদের জন্য বাগানিদের লেখা।" />
      <Container className="py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition hover-lift">
              <SmartImage src={p.cover} alt={p.title} aspect="video" rounded={false} />
              <div className="flex flex-1 flex-col p-6">
                <span className="font-bn text-xs font-semibold tracking-wide text-primary">{p.category}</span>
                <h3 className="font-bn mt-2 font-display text-xl font-semibold leading-tight transition group-hover:text-primary">{p.title}</h3>
                <p className="font-bn mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
                <div className="font-bn mt-4 flex items-center gap-4 border-t pt-4 text-xs text-muted-foreground">
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
