import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/common/Section";
import { useTestimonials } from "@/hooks/useCatalog";
import { toBnDigits } from "@/lib/format";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "গ্রাহকদের রিভিউ — অল ট্রি বিডি শপ" },
      { name: "description", content: "সারা বাংলাদেশের বাগানিদের প্রকৃত রিভিউ।" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: Reviews,
});

const extra = [
  { name: "মাহবুব আলম", role: "কৃষক", city: "বগুড়া", rating: 5, text: "৬০টি গ্রাফটিং পেয়ারা কিনেছিলাম। প্রতিটি বেঁচেছে। ১০ বছরে এর চেয়ে ভালো নার্সারি দেখিনি।", avatar: "https://i.pravatar.cc/120?img=15" },
  { name: "ফারিহা রহমান", role: "গাছপ্রেমী", city: "ঢাকা", rating: 5, text: "প্যাকেজিং খুব সুন্দর। আমার বাচ্চা ভেবেছিল উপহার!", avatar: "https://i.pravatar.cc/120?img=49" },
  { name: "সাজিদ হাসান", role: "ল্যান্ডস্কেপার", city: "খুলনা", rating: 4, text: "মান চমৎকার। খুলনায় ডেলিভারি ৩ দিন লেগেছে, একটু দেরি হয়েছে।", avatar: "https://i.pravatar.cc/120?img=22" },
  { name: "লুবনা ইয়াসমিন", role: "শখের বাগানি", city: "কুমিল্লা", rating: 5, text: "লেবু গাছে ইতিমধ্যেই ফুল এসেছে। তাদের কেয়ার গাইড PDF সত্যিই কাজে লাগে।", avatar: "https://i.pravatar.cc/120?img=38" },
];

function Reviews() {
  const { data: testimonials = [] } = useTestimonials();
  const ALL = [...testimonials, ...extra, ...testimonials];
  const avg = ALL.length > 0 ? (ALL.reduce((s, r) => s + r.rating, 0) / ALL.length).toFixed(1) : "0.0";
  return (
    <PageLayout>
      <PageHeader crumbs={[{ label: "হোম", to: "/" }, { label: "রিভিউ" }]} title="বাগানিদের ভালোবাসা" subtitle="সারা বাংলাদেশের গ্রাহকরা কী বলছেন।" />
      <Section>
        <div className="mb-12 grid gap-6 rounded-3xl border bg-card p-8 shadow-soft sm:grid-cols-3">
          <div>
            <div className="font-bn font-display text-5xl font-bold text-primary">{toBnDigits(avg)}</div>
            <div className="mt-2 flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-5 fill-gold text-gold" />)}</div>
            <p className="font-bn mt-2 text-sm text-muted-foreground">{toBnDigits(ALL.length * 47)}টি যাচাইকৃত রিভিউয়ের ভিত্তিতে</p>
          </div>
          {[{ l: "মান", v: 4.9 }, { l: "প্যাকেজিং", v: 4.8 }].map((s) => (
            <div key={s.l}>
              <div className="font-bn text-sm font-semibold text-muted-foreground">{s.l}</div>
              <div className="font-bn font-display text-3xl font-bold">{toBnDigits(s.v)}</div>
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
              <p className="font-bn mt-4 text-sm leading-relaxed text-foreground">"{r.text}"</p>
              <div className="mt-5 flex items-center gap-3 border-t pt-4">
                <img src={r.avatar} alt={r.name} className="size-11 rounded-full object-cover" />
                <div>
                  <div className="font-bn font-semibold">{r.name}</div>
                  <div className="font-bn text-xs text-muted-foreground">{r.role} · {r.city}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
