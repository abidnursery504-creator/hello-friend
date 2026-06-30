import { createFileRoute } from "@tanstack/react-router";
import { Truck, Package, MapPin, Clock } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";

export const Route = createFileRoute("/shipping-policy")({
  head: () => ({
    meta: [{ title: "Shipping Policy — All Tree BD Shop" }, { name: "description", content: "How we pack and deliver plants across Bangladesh." }],
    links: [{ rel: "canonical", href: "/shipping-policy" }],
  }),
  component: Shipping,
});

const FEATURES = [
  { Icon: Package, t: "Custom shock-proof crates", d: "Engineered in-house to protect saplings from rough handling." },
  { Icon: Truck, t: "64-district coverage", d: "We deliver across every district of Bangladesh." },
  { Icon: Clock, t: "1–4 day delivery", d: "Dhaka next-day; outer districts 2–4 working days." },
  { Icon: MapPin, t: "Free above ৳1,500", d: "Standard flat fee of ৳120 below threshold." },
];

const ZONES = [
  { zone: "Dhaka City", time: "1–2 days", fee: "৳80" },
  { zone: "Dhaka Division", time: "2–3 days", fee: "৳120" },
  { zone: "Chattogram, Sylhet, Khulna", time: "2–3 days", fee: "৳150" },
  { zone: "Other Districts", time: "3–4 days", fee: "৳180" },
  { zone: "Remote / Hill Tracts", time: "4–6 days", fee: "৳250" },
];

function Shipping() {
  return (
    <PageLayout>
      <PageHeader crumbs={[{ label: "Home", to: "/" }, { label: "Shipping" }]} title="Shipping Policy" subtitle="Built around live plants — every step engineered for safe arrival." />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.t} className="rounded-3xl border bg-card p-6 shadow-soft">
              <div className="mb-4 inline-grid size-12 place-items-center rounded-2xl gradient-primary text-primary-foreground"><f.Icon className="size-5" /></div>
              <h3 className="font-display text-lg font-semibold">{f.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section bg="muted" title="Delivery zones & timing">
        <div className="overflow-hidden rounded-3xl border bg-card shadow-soft">
          <table className="w-full text-left">
            <thead className="bg-muted/50 text-sm">
              <tr><th className="p-4">Zone</th><th className="p-4">Delivery time</th><th className="p-4">Standard fee</th></tr>
            </thead>
            <tbody>
              {ZONES.map((z, i) => (
                <tr key={i} className="border-t">
                  <td className="p-4 font-medium">{z.zone}</td>
                  <td className="p-4 text-muted-foreground">{z.time}</td>
                  <td className="p-4 font-semibold text-primary">{z.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">Free shipping is automatically applied for orders above ৳1,500. Bulk orders (50+ plants) may have custom logistics — please contact us.</p>
      </Section>
    </PageLayout>
  );
}
