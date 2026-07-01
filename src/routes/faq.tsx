import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { ensureFaqs, useFaqs } from "@/hooks/useCatalog";

export const Route = createFileRoute("/faq")({
  loader: ({ context }) => ensureFaqs(context.queryClient),
  head: ({ loaderData }) => ({
    meta: [
      { title: "সাধারণ প্রশ্নোত্তর — অল ট্রি বিডি শপ" },
      { name: "description", content: "ডেলিভারি, গ্যারান্টি, পরিচর্যা ও পেমেন্ট সম্পর্কে সাধারণ প্রশ্নের উত্তর।" },
      { property: "og:title", content: "প্রশ্নোত্তর — অল ট্রি বিডি শপ" },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: (loaderData ?? []).map((f) => ({
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
  const { data: faqs = [] } = useFaqs();
  return (
    <PageLayout>
      <PageHeader crumbs={[{ label: "হোম", to: "/" }, { label: "প্রশ্নোত্তর" }]} title="সাধারণ প্রশ্নোত্তর" subtitle="সবচেয়ে বেশি জিজ্ঞাসিত প্রশ্নের সহজ উত্তর।" align="center" />
      <Container className="py-12">
        <Accordion type="single" collapsible className="mx-auto max-w-3xl space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={String(i)} className="overflow-hidden rounded-2xl border border-border bg-card px-5 shadow-soft">
              <AccordionTrigger className="font-bn text-left font-semibold hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="font-bn text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </PageLayout>
  );
}
