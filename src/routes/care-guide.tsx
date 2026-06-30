import { createFileRoute } from "@tanstack/react-router";
import { Droplets, Leaf, Scissors, Sprout, Sun, Thermometer } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";

const guides = [
  { Icon: Sun, t: "Sunlight 101", d: "Most fruit plants need 6+ hours of direct sun. Indoor plants prefer bright, indirect light from an east window." },
  { Icon: Droplets, t: "Watering rules", d: "Water deeply and infrequently. Let the top 2-inches dry between waterings — overwatering kills more plants than drought." },
  { Icon: Leaf, t: "Feeding schedule", d: "Mix organic compost into soil quarterly. NPK 19-19-19 monthly during growing season; potassium-heavy feed during flowering." },
  { Icon: Scissors, t: "Pruning basics", d: "Remove dead, diseased and crossing branches in winter. Pinch tips to encourage bushier growth." },
  { Icon: Thermometer, t: "Seasonal care", d: "Monsoon: improve drainage, watch for fungal disease. Summer: mulch heavily, water early morning. Winter: reduce feed." },
  { Icon: Sprout, t: "Repotting", d: "Repot every 2-3 years into a pot 2 inches larger. Use 30% sand, 40% compost, 30% topsoil for fruit plants." },
];

export const Route = createFileRoute("/care-guide")({
  head: () => ({
    meta: [
      { title: "Plant Care Guide — All Tree BD Shop" },
      { name: "description", content: "Sunlight, watering, feeding and pruning — the essential care guide for healthy plants in Bangladesh." },
      { property: "og:title", content: "Plant Care Guide — All Tree BD Shop" },
      { property: "og:url", content: "/care-guide" },
    ],
    links: [{ rel: "canonical", href: "/care-guide" }],
  }),
  component: () => (
    <PageLayout>
      <PageHeader crumbs={[{ label: "Home", to: "/" }, { label: "Care Guide" }]} title="The essential plant care guide" subtitle="Everything you need to keep your plants thriving — written for Bangladesh's climate." />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map(({ Icon, t, d }) => (
            <div key={t} className="rounded-3xl border border-border bg-card p-6 shadow-soft transition hover-lift">
              <div className="mb-4 inline-grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary"><Icon className="size-5" /></div>
              <h3 className="font-display text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>
    </PageLayout>
  ),
});
