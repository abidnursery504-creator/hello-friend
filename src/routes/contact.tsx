import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { site } from "@/data/site";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — All Tree BD Shop" },
      { name: "description", content: "Reach our Bangla-speaking care team by phone, WhatsApp or email." },
      { property: "og:title", content: "Contact — All Tree BD Shop" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const items = [
    { Icon: Phone, label: "Call us", value: site.phone, href: `tel:${site.phone}` },
    { Icon: MessageCircle, label: "WhatsApp", value: site.whatsapp, href: `https://wa.me/${site.whatsapp.replace(/\D/g, "")}` },
    { Icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { Icon: MapPin, label: "Visit", value: site.address },
    { Icon: Clock, label: "Hours", value: "Sat–Thu · 9am – 8pm" },
  ];
  return (
    <PageLayout>
      <PageHeader
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
        title="Let's talk plants."
        subtitle="Pre-purchase advice, after-care help or wholesale inquiries — we reply in minutes."
      />
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-3">
            {items.map(({ Icon, label, value, href }) => (
              <a
                key={label}
                href={href ?? "#"}
                className="group flex items-center gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft transition hover:border-primary/40 hover:shadow-elegant"
              >
                <span className="grid size-12 place-items-center rounded-2xl gradient-primary text-primary-foreground"><Icon className="size-5" /></span>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
                  <div className="truncate font-semibold">{value}</div>
                </div>
              </a>
            ))}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); toast.success("Message sent — we'll get back to you shortly."); (e.target as HTMLFormElement).reset(); }}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
          >
            <h3 className="font-display text-2xl font-bold">Send us a message</h3>
            <p className="mt-1 text-sm text-muted-foreground">Or write to us — we usually reply within an hour.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs uppercase tracking-wide text-muted-foreground">Name</span>
                <input required className={input} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs uppercase tracking-wide text-muted-foreground">Phone</span>
                <input required type="tel" className={input} />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-xs uppercase tracking-wide text-muted-foreground">Email</span>
                <input type="email" className={input} />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-xs uppercase tracking-wide text-muted-foreground">Message</span>
                <textarea required rows={5} className={input} />
              </label>
            </div>
            <button type="submit" className="mt-6 inline-flex rounded-full gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:shadow-elegant">
              Send message
            </button>
          </form>
        </div>
      </Container>
    </PageLayout>
  );
}

const input = "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";
