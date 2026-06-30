import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [{ title: "Terms & Conditions — All Tree BD Shop" }, { name: "description", content: "Terms governing the use of our nursery services." }],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

const SECTIONS = [
  { t: "Acceptance", d: "By using alltreebd.shop you agree to these terms. If you do not agree, please do not use the service." },
  { t: "Orders & pricing", d: "All prices are in BDT and inclusive of VAT where applicable. We reserve the right to refuse or cancel orders due to pricing errors, availability or suspected fraud." },
  { t: "Plants & live products", d: "Live plants are perishable. Minor leaf drop during transit is normal. Guarantees apply only when care instructions are followed." },
  { t: "Payments", d: "We currently accept Cash on Delivery. Additional payment methods will be added; their respective terms apply." },
  { t: "Intellectual property", d: "All content, photography and branding are property of All Tree BD Shop and may not be reproduced without permission." },
  { t: "Limitation of liability", d: "We are not liable for indirect or consequential damages. Our maximum liability is limited to the value of the order in question." },
  { t: "Governing law", d: "These terms are governed by the laws of Bangladesh. Disputes will be resolved in Dhaka courts." },
];

function Terms() {
  return (
    <PageLayout>
      <PageHeader crumbs={[{ label: "Home", to: "/" }, { label: "Terms" }]} title="Terms & Conditions" subtitle="Last updated: June 1, 2026" />
      <Container className="py-14">
        <article className="mx-auto max-w-3xl space-y-8">
          {SECTIONS.map((s, i) => (
            <section key={i} className="rounded-3xl border bg-card p-7 shadow-soft">
              <h2 className="font-display text-2xl font-bold">{i + 1}. {s.t}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{s.d}</p>
            </section>
          ))}
        </article>
      </Container>
    </PageLayout>
  );
}
