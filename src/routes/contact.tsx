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
      { title: "যোগাযোগ — অল ট্রি বিডি শপ" },
      { name: "description", content: "ফোন, হোয়াটসঅ্যাপ বা ইমেইলে আমাদের বাংলাভাষী কেয়ার টিমের সাথে যোগাযোগ করুন।" },
      { property: "og:title", content: "যোগাযোগ — অল ট্রি বিডি শপ" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const items = [
    { Icon: Phone, label: "ফোন করুন", value: site.phone, href: `tel:${site.phone}` },
    { Icon: MessageCircle, label: "হোয়াটসঅ্যাপ", value: site.phone, href: `https://wa.me/${site.whatsapp.replace(/\D/g, "")}` },
    { Icon: Mail, label: "ইমেইল", value: site.email, href: `mailto:${site.email}` },
    { Icon: MapPin, label: "ঠিকানা", value: site.address },
    { Icon: Clock, label: "খোলার সময়", value: "শনি – বৃহস্পতি · সকাল ৯টা – রাত ৮টা" },
  ];
  return (
    <PageLayout>
      <PageHeader
        crumbs={[{ label: "হোম", to: "/" }, { label: "যোগাযোগ" }]}
        title="চলুন গাছ নিয়ে কথা বলি"
        subtitle="ক্রয়-পূর্ব পরামর্শ, পরিচর্যার সাহায্য বা পাইকারি অর্ডার — আমরা মিনিটেই উত্তর দেই।"
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
                  <div className="font-bn text-xs tracking-wide text-muted-foreground">{label}</div>
                  <div className="font-bn truncate font-semibold">{value}</div>
                </div>
              </a>
            ))}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); toast.success("বার্তা পাঠানো হয়েছে — শীঘ্রই উত্তর পাবেন।"); (e.target as HTMLFormElement).reset(); }}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
          >
            <h3 className="font-bn font-display text-2xl font-bold">আমাদের বার্তা পাঠান</h3>
            <p className="font-bn mt-1 text-sm text-muted-foreground">সাধারণত এক ঘণ্টার মধ্যেই উত্তর দেই।</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="font-bn mb-1.5 block text-xs tracking-wide text-muted-foreground">নাম</span>
                <input required className={input} />
              </label>
              <label className="block">
                <span className="font-bn mb-1.5 block text-xs tracking-wide text-muted-foreground">ফোন</span>
                <input required type="tel" className={input} />
              </label>
              <label className="block sm:col-span-2">
                <span className="font-bn mb-1.5 block text-xs tracking-wide text-muted-foreground">ইমেইল</span>
                <input type="email" className={input} />
              </label>
              <label className="block sm:col-span-2">
                <span className="font-bn mb-1.5 block text-xs tracking-wide text-muted-foreground">বার্তা</span>
                <textarea required rows={5} className={input} />
              </label>
            </div>
            <button type="submit" className="font-bn mt-6 inline-flex rounded-full gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:shadow-elegant">
              বার্তা পাঠান
            </button>
          </form>
        </div>
      </Container>
    </PageLayout>
  );
}

const input = "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 font-bn";
