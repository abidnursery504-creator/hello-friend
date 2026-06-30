import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { SmartImage } from "@/components/common/SmartImage";

export const Route = createFileRoute("/video-gallery")({
  head: () => ({
    meta: [
      { title: "Video Gallery — All Tree BD Shop" },
      { name: "description", content: "Watch nursery tours, plant care tutorials and grafting demos." },
    ],
    links: [{ rel: "canonical", href: "/video-gallery" }],
  }),
  component: VideoGallery,
});

const VIDEOS = [
  { id: "dQw4w9WgXcQ", title: "Mango Grafting Masterclass", cat: "Tutorial", thumb: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=900&q=80", duration: "12:34" },
  { id: "dQw4w9WgXcQ", title: "Nursery Tour: Savar", cat: "Tour", thumb: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=900&q=80", duration: "08:12" },
  { id: "dQw4w9WgXcQ", title: "Citrus Care in Monsoon", cat: "Care", thumb: "https://images.unsplash.com/photo-1604762524889-3e2fcc145683?w=900&q=80", duration: "06:48" },
  { id: "dQw4w9WgXcQ", title: "Rooftop Garden Setup", cat: "Guide", thumb: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80", duration: "15:02" },
  { id: "dQw4w9WgXcQ", title: "Packing & Shipping", cat: "BTS", thumb: "https://images.unsplash.com/photo-1518335935020-cfd6580c1ab4?w=900&q=80", duration: "04:21" },
  { id: "dQw4w9WgXcQ", title: "Customer Stories", cat: "Stories", thumb: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=900&q=80", duration: "09:55" },
];

function VideoGallery() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <PageLayout>
      <PageHeader crumbs={[{ label: "Home", to: "/" }, { label: "Video Gallery" }]} title="Watch & learn" subtitle="Tutorials, nursery walkthroughs and stories from our growers." />
      <Container className="py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((v, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setOpen(v.id)}
              className="group relative overflow-hidden rounded-3xl text-left shadow-soft transition hover-lift"
            >
              <SmartImage src={v.thumb} alt={v.title} aspect="video" rounded={false} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20" />
              <div className="absolute inset-0 grid place-items-center">
                <span className="grid size-16 place-items-center rounded-full bg-white/95 text-primary shadow-xl transition group-hover:scale-110">
                  <Play className="size-6 fill-current" />
                </span>
              </div>
              <span className="absolute right-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-white">{v.duration}</span>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <span className="text-xs font-semibold uppercase tracking-wide text-gold">{v.cat}</span>
                <h3 className="mt-1 font-display text-lg font-semibold">{v.title}</h3>
              </div>
            </motion.button>
          ))}
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-4" onClick={() => setOpen(null)}>
            <button aria-label="Close video" onClick={() => setOpen(null)} className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><X /></button>
            <div className="aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${open}?autoplay=1`} title="Video" allow="autoplay; encrypted-media" allowFullScreen />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
