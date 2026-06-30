import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, RefreshCw, AlertCircle, Phone } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";

export const Route = createFileRoute("/return-policy")({
  head: () => ({
    meta: [{ title: "Return & Refund Policy — All Tree BD Shop" }, { name: "description", content: "Our 7-day live plant guarantee and refund process." }],
    links: [{ rel: "canonical", href: "/return-policy" }],
  }),
  component: Returns,
});

const STEPS = [
  { n: 1, t: "Open within 24 hours", d: "Unbox and inspect your plant within 24 hours of delivery." },
  { n: 2, t: "Report any issue", d: "Photograph the issue and contact us via WhatsApp or email within 48 hours." },
  { n: 3, t: "We respond in <12h", d: "Our care team reviews and offers replacement, refund or credit." },
  { n: 4, t: "Free return pickup", d: "If replacement is approved, we arrange free pickup of the original plant." },
];

function Returns() {
  return (
    <PageLayout>
      <PageHeader crumbs={[{ label: "Home", to: "/" }, { label: "Returns" }]} title="Return & Refund Policy" subtitle="7-day live plant guarantee on every order." />
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl gradient-primary p-8 text-primary-foreground shadow-elegant">
            <ShieldCheck className="size-10" />
            <h2 className="mt-5 font-display text-3xl font-bold">7-day plant guarantee</h2>
            <p className="mt-3 opacity-90">If your plant arrives damaged, diseased or dies within 7 days of delivery (with reasonable care), we'll replace it free or refund in full.</p>
          </div>
          <div className="rounded-3xl border bg-card p-8 shadow-soft">
            <RefreshCw className="size-10 text-primary" />
            <h2 className="mt-5 font-display text-3xl font-bold">What's covered</h2>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>• Plants damaged in transit</li>
              <li>• Wrong variety shipped</li>
              <li>• Plants that die within 7 days despite proper care</li>
              <li>• Missing accessories (pot, soil, instructions)</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section bg="muted" title="How returns work">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-3xl border bg-card p-6 shadow-soft">
              <div className="font-display text-4xl font-bold text-primary/30">0{s.n}</div>
              <h3 className="mt-2 font-display text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="rounded-3xl border-2 border-dashed border-amber-400/40 bg-amber-50 p-6 dark:bg-amber-950/20">
          <div className="flex items-start gap-4">
            <AlertCircle className="size-6 shrink-0 text-amber-600" />
            <div>
              <h3 className="font-display text-lg font-semibold">Not covered</h3>
              <p className="mt-1 text-sm text-muted-foreground">Damage from over/under watering, pest neglect, repotting accidents or extreme weather exposure. Sale and clearance items are final.</p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border bg-card p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <Phone className="size-6 text-primary" />
            <div>
              <div className="font-semibold">Need help?</div>
              <div className="text-sm text-muted-foreground">+880 1700-000000 · hello@alltreebd.shop</div>
            </div>
          </div>
          <a href="/contact" className="rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Contact support</a>
        </div>
      </Section>
    </PageLayout>
  );
}
