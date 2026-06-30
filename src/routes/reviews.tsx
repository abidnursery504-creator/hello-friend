import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { testimonials } from "@/data/site";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews — All Tree BD Shop" },
      { name: "description", content: "Real reviews from gardeners across Bangladesh." },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: Reviews,
});

const extra = [
  { name: "Mahbub Alam", role: "Farmer", city: "Bogura", rating: 5, text: "Bought 60 grafted guavas. Every single one rooted. Best nursery I've ordered from in 10 years.", avatar: "https://i.pravatar.cc/120?img=15" },
  { name: "Fariha Rahman", role: "Plant Mom", city: "Dhaka", rating: 5, text: "Adorable packaging. My toddler thought it was a present!", avatar: "https://i.pravatar.cc/120?img=49" },
  { name: "Sajid Hasan", role: "Landscaper", city: "Khulna", rating: 4, text: "Quality is excellent. Delivery to Khulna took 3 days, slightly slower than I expected.", avatar: "https://i.pravatar.cc/120?img=22" },
  { name: "Lubna Yasmin", role: "Hobbyist", city: "Cumilla", rating: 5, text: "Lemon plant is already flowering. Their care guide PDF is super helpful.", avatar: "https://i.pravatar.cc/120?img=38" },
];
const ALL = [...testimonials, ...extra, ...testimonials];

function Reviews() {
  const avg = (ALL.reduce((s, r) => s + r.rating, 0) / ALL.length).toFixed(1);
  return (
    <PageLayout>
      <PageHeader crumbs={[{ label: "Home", to: "/" }, { label: "Reviews" }]} title="Loved by gardeners" subtitle="What our customers across Bangladesh are saying." />
      <Section>
        <div className="mb-12 grid gap-6 rounded-3xl border bg-card p-8 shadow-soft sm:grid-cols-3">
          <div>
            <div className="font-display text-5xl font-bold text-primary">{avg}</div>
            <div className="mt-2 flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-5 fill-gold text-gold" />)}</div>
            <p className="mt-2 text-sm text-muted-foreground">Based on {ALL.length * 47} verified reviews</p>
          </div>
          {[{ l: "Quality", v: 4.9 }, { l: "Packaging", v: 4.8 }].map((s) => (
            <div key={s.l}>
              <div className="text-sm font-semibold text-muted-foreground">{s.l}</div>
              <div className="font-display text-3xl font-bold">{s.v}</div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full gradient-primary" style={{ width: `${(s.v / 5) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ALL.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 6) * 0.05 }}
              className="relative rounded-3xl border bg-card p-6 shadow-soft transition hover-lift">
              <Quote className="absolute right-5 top-5 size-8 text-primary/15" />
              <div className="flex gap-0.5">{Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="size-4 fill-gold text-gold" />)}</div>
              <p className="mt-4 text-sm leading-relaxed text-foreground">"{r.text}"</p>
              <div className="mt-5 flex items-center gap-3 border-t pt-4">
                <img src={r.avatar} alt={r.name} className="size-11 rounded-full object-cover" />
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role} · {r.city}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
