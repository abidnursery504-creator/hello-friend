import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { faqs } from "@/data/site";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — All Tree BD Shop" },
      { name: "description", content: "Answers about delivery, guarantees, plant care and payments." },
      { property: "og:title", content: "FAQ — All Tree BD Shop" },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    }],
  }),
  component: FAQPage,
});

function FAQPage() {
  return (
    <PageLayout>
      <PageHeader crumbs={[{ label: "Home", to: "/" }, { label: "FAQ" }]} title="Frequently asked questions" subtitle="Quick answers to the things we hear most." align="center" />
      <Container className="py-12">
        <Accordion type="single" collapsible className="mx-auto max-w-3xl space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={String(i)} className="overflow-hidden rounded-2xl border border-border bg-card px-5 shadow-soft">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </PageLayout>
  );
}
