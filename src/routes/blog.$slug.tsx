import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { SmartImage } from "@/components/common/SmartImage";
import { ensureBlogPost, ensureBlogPosts, useBlogPosts } from "@/hooks/useCatalog";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params, context }) => {
    const [post] = await Promise.all([
      ensureBlogPost(context.queryClient, params.slug),
      ensureBlogPosts(context.queryClient),
    ]);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.post;
    if (!p) return {};
    return {
      meta: [
        { title: `${p.title} — অল ট্রি বিডি` },
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
        <h1 className="font-bn font-display text-3xl font-bold">পোস্টটি পাওয়া যায়নি</h1>
        <Link to="/blog" className="font-bn mt-4 inline-block text-primary underline">সব পোস্ট দেখুন</Link>
      </Container>
    </PageLayout>
  ),
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData();
  const { data: posts = [] } = useBlogPosts();
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  return (
    <PageLayout>
      <PageHeader
        crumbs={[{ label: "হোম", to: "/" }, { label: "ব্লগ", to: "/blog" }, { label: post.title }]}
        title={post.title}
        subtitle={`${post.author} · ${post.date} · ${post.readTime} পড়তে`}
      />
      <Container className="py-12">
        <article className="mx-auto max-w-3xl">
          <SmartImage src={post.cover} alt={post.title} aspect="video" className="rounded-3xl shadow-elegant" />
          <div className="prose prose-lg mt-8 max-w-none text-foreground">
            <p className="font-bn text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
            <p className="font-bn mt-6 leading-relaxed">{post.content}</p>
            <p className="font-bn mt-4 leading-relaxed">
              আরও পরিচর্যা গাইড ও মৌসুমী পরামর্শের জন্য আমাদের কেয়ার গাইড দেখুন বা টিমের সাথে যোগাযোগ করুন — গাছ থেকে সর্বোচ্চটা পেতে আমরা সবসময়ই পাশে আছি।
            </p>
          </div>
        </article>

        <div className="mt-20 border-t pt-12">
          <h3 className="font-bn mb-6 font-display text-2xl font-bold">আরও পড়ুন</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {others.map((p) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group flex flex-col overflow-hidden rounded-3xl border bg-card shadow-soft transition hover-lift">
                <SmartImage src={p.cover} alt={p.title} aspect="video" rounded={false} />
                <div className="p-5">
                  <span className="font-bn text-xs font-semibold tracking-wide text-primary">{p.category}</span>
                  <h4 className="font-bn mt-2 font-display text-lg font-semibold leading-tight transition group-hover:text-primary">{p.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}
