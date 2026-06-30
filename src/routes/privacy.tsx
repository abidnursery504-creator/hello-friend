import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [{ title: "Privacy Policy — All Tree BD Shop" }, { name: "description", content: "How we collect, use, and protect your data." }],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

const SECTIONS = [
  { t: "Information we collect", d: "We collect your name, phone, email, shipping address and order details to process and deliver your orders. We do not store payment card details on our servers." },
  { t: "How we use your data", d: "Your information is used solely to fulfill orders, provide customer support and (with your consent) send occasional offers. We never sell or rent your data." },
  { t: "Cookies & analytics", d: "We use essential cookies for cart and checkout, plus privacy-friendly analytics to understand site usage. You can disable non-essential cookies from your browser." },
  { t: "Data sharing", d: "We share minimum required data with delivery partners (courier services), and SMS/email gateways. All partners are bound by confidentiality." },
  { t: "Your rights", d: "You can request a copy, correction or deletion of your data at any time by emailing hello@alltreebd.shop." },
  { t: "Children's privacy", d: "Our services are not directed to children under 13. We do not knowingly collect data from minors." },
  { t: "Updates to this policy", d: "We may revise this policy occasionally. The 'last updated' date at the top reflects the latest change." },
];

function Privacy() {
  return (
    <PageLayout>
      <PageHeader crumbs={[{ label: "Home", to: "/" }, { label: "Privacy Policy" }]} title="Privacy Policy" subtitle="Last updated: June 1, 2026" />
      <Container className="py-14">
        <article className="mx-auto max-w-3xl space-y-10">
          <p className="text-lg text-muted-foreground">Your privacy is fundamental to our relationship. This policy explains what we collect, why, and the controls you have.</p>
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
