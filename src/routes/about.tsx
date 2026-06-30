import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Leaf, Sparkles, Truck, Users } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { SmartImage } from "@/components/common/SmartImage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — All Tree BD Shop" },
      { name: "description", content: "Our story, our growers and our mission to bring premium plants to every home in Bangladesh." },
      { property: "og:title", content: "About — All Tree BD Shop" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  const values = [
    { Icon: Leaf, t: "Plants over profits", d: "If a sapling isn't healthy enough for our own gardens, we don't sell it." },
    { Icon: Truck, t: "Last-mile obsession", d: "We engineered our own shock-proof crates because nothing off-the-shelf worked." },
    { Icon: Users, t: "Grower partnerships", d: "Direct, multi-generational relationships with family nurseries across BD." },
    { Icon: Award, t: "Bangla-first service", d: "Our care team speaks your language — literally and figuratively." },
  ];
  return (
    <PageLayout>
      <PageHeader
        crumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
        title="A nursery, grown with love."
        subtitle="We started in 2020 with one rooftop, one mango grafting and one stubborn belief: Bangladesh deserves a nursery that ships premium plants without the premium attitude."
      />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <SmartImage src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1400&q=80" alt="Nursery" aspect="4/5" className="rounded-3xl shadow-elegant" />
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary">
              <Sparkles className="size-3.5" /> Our story
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">From a Dhanmondi rooftop to 64 districts.</h2>
            <p className="mt-4 text-muted-foreground">
              Six years ago we couldn't find a single Bangladeshi nursery that took grafted fruit plants seriously. Plants arrived broken, mislabeled or simply wrong variety. So we built the nursery we wished existed.
            </p>
            <p className="mt-3 text-muted-foreground">
              Today we partner with 14 family-run nurseries across Rajshahi, Rangpur, Cumilla and Savar — and ship over 12,000 plants every month to gardeners, farmers and balcony lovers across the country.
            </p>
          </div>
        </div>
      </Section>

      <Section bg="muted" eyebrow="Our values" title="What we obsess over.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ Icon, t, d }) => (
            <div key={t} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <div className="mb-4 inline-grid size-12 place-items-center rounded-2xl gradient-primary text-primary-foreground"><Icon className="size-5" /></div>
              <h3 className="font-display text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="overflow-hidden rounded-[2rem] gradient-primary p-10 text-center text-primary-foreground sm:p-16">
          <h3 className="font-display text-3xl font-bold sm:text-4xl">Let's grow something beautiful.</h3>
          <p className="mx-auto mt-3 max-w-xl opacity-90">Explore our full collection — over 180 plants, hand-picked and ready for your space.</p>
          <Link to="/shop" className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary hover:bg-gold hover:text-gold-foreground">Shop the collection</Link>
        </div>
      </Section>
    </PageLayout>
  );
}
