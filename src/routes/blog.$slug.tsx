import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { SmartImage } from "@/components/common/SmartImage";
import { getPostBySlug, posts } from "@/data/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.post;
    if (!p) return {};
    return {
      meta: [
        { title: `${p.title} — All Tree BD` },
        { name: "description", content: p.excerpt },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt },
        { property: "og:image", content: p.cover },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${p.slug}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${p.slug}` }],
    };
  },
  notFoundComponent: () => (
    <PageLayout>
      <Container className="py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Post not found</h1>
        <Link to="/blog" className="mt-4 inline-block text-primary underline">All posts</Link>
      </Container>
    </PageLayout>
  ),
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData();
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  return (
    <PageLayout>
      <PageHeader
        crumbs={[{ label: "Home", to: "/" }, { label: "Blog", to: "/blog" }, { label: post.title }]}
        title={post.title}
        subtitle={`${post.author} · ${post.date} · ${post.readTime} read`}
      />
      <Container className="py-12">
        <article className="mx-auto max-w-3xl">
          <SmartImage src={post.cover} alt={post.title} aspect="video" className="rounded-3xl shadow-elegant" />
          <div className="prose prose-lg mt-8 max-w-none text-foreground">
            <p className="text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
            <p className="mt-6 leading-relaxed">{post.content}</p>
            <p className="mt-4 leading-relaxed">
              For more care guides and seasonal advice, browse our care guide or get in touch with our team — we love helping gardeners get the best from every plant.
            </p>
          </div>
        </article>

        <div className="mt-20 border-t pt-12">
          <h3 className="mb-6 font-display text-2xl font-bold">Keep reading</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {others.map((p) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group flex flex-col overflow-hidden rounded-3xl border bg-card shadow-soft transition hover-lift">
                <SmartImage src={p.cover} alt={p.title} aspect="video" rounded={false} />
                <div className="p-5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">{p.category}</span>
                  <h4 className="mt-2 font-display text-lg font-semibold leading-tight transition group-hover:text-primary">{p.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}
