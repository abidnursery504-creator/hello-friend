import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Truck, CheckCircle2, Search, MapPin, Clock } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/track-order")({
  head: () => ({
    meta: [
      { title: "Track Your Order — All Tree BD Shop" },
      { name: "description", content: "Track your nursery order in real time across Bangladesh." },
    ],
    links: [{ rel: "canonical", href: "/track-order" }],
  }),
  component: Track,
});

const STAGES = [
  { Icon: CheckCircle2, t: "Order placed", d: "We received your order", time: "Jun 24, 10:42 AM" },
  { Icon: Package, t: "Packed at nursery", d: "Hand-packed in our shock-proof crate", time: "Jun 25, 09:15 AM" },
  { Icon: Truck, t: "Out for delivery", d: "Currently in Savar hub", time: "Jun 26, 07:30 AM" },
  { Icon: MapPin, t: "Delivered", d: "Estimated tomorrow", time: "Jun 27" },
];

function Track() {
  const [show, setShow] = useState(false);
  return (
    <PageLayout>
      <PageHeader crumbs={[{ label: "Home", to: "/" }, { label: "Track Order" }]} title="Track your order" subtitle="Enter your order ID and phone number to see real-time progress." />
      <Section>
        <div className="mx-auto max-w-3xl rounded-3xl border bg-card p-8 shadow-soft">
          <form onSubmit={(e) => { e.preventDefault(); setShow(true); }} className="grid gap-4 sm:grid-cols-[1fr_1fr_auto]">
            <Input placeholder="Order ID (e.g. ATB-10293)" required defaultValue="ATB-10293" />
            <Input placeholder="Phone number" required defaultValue="01700000000" />
            <Button type="submit" className="gap-2"><Search className="size-4" /> Track</Button>
          </form>
        </div>

        {show && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-10 max-w-3xl rounded-3xl border bg-card p-8 shadow-soft">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b pb-5">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Order</div>
                <div className="font-display text-xl font-bold">#ATB-10293</div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary"><Clock className="size-4" /> In transit</span>
            </div>
            <ol className="relative space-y-8 border-l-2 border-dashed border-primary/30 pl-8">
              {STAGES.map((s, i) => {
                const done = i <= 2;
                return (
                  <li key={i} className="relative">
                    <span className={`absolute -left-[42px] grid size-9 place-items-center rounded-full border-2 ${done ? "border-primary gradient-primary text-primary-foreground" : "border-border bg-background text-muted-foreground"}`}>
                      <s.Icon className="size-4" />
                    </span>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className={`font-display text-lg font-semibold ${done ? "text-foreground" : "text-muted-foreground"}`}>{s.t}</h3>
                      <span className="text-xs text-muted-foreground">{s.time}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                  </li>
                );
              })}
            </ol>
          </motion.div>
        )}
      </Section>
    </PageLayout>
  );
}
