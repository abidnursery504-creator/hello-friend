import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { SmartImage } from "@/components/common/SmartImage";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — All Tree BD Shop" },
      { name: "description", content: "A visual journey through our nursery, plants and happy customers across Bangladesh." },
      { property: "og:title", content: "Gallery — All Tree BD Shop" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1200&q=80", h: 680, cat: "Nursery" },
  { src: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=900&q=80", h: 520, cat: "Mango" },
  { src: "https://images.unsplash.com/photo-1604762524889-3e2fcc145683?w=900&q=80", h: 740, cat: "Citrus" },
  { src: "https://images.unsplash.com/photo-1492496913980-501348b61469?w=900&q=80", h: 480, cat: "Indoor" },
  { src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80", h: 620, cat: "Trees" },
  { src: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=900&q=80", h: 560, cat: "Care" },
  { src: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=900&q=80", h: 700, cat: "Garden" },
  { src: "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?w=900&q=80", h: 500, cat: "Flowers" },
  { src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80", h: 640, cat: "Outdoor" },
  { src: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=900&q=80", h: 540, cat: "Mango" },
  { src: "https://images.unsplash.com/photo-1604762525237-4d4a0aab2a4b?w=900&q=80", h: 720, cat: "Lemon" },
  { src: "https://images.unsplash.com/photo-1518335935020-cfd6580c1ab4?w=900&q=80", h: 600, cat: "Greenhouse" },
];

function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <PageLayout>
      <PageHeader crumbs={[{ label: "Home", to: "/" }, { label: "Gallery" }]} title="Inside our nursery" subtitle="Behind every sapling there's a story. Browse moments from our growing fields, packing tables and customer gardens." />
      <Container className="py-12">
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          {IMAGES.map((img, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 6) * 0.05 }}
              onClick={() => setOpen(i)}
              className="group relative block w-full overflow-hidden rounded-2xl shadow-soft transition hover:shadow-elegant"
              style={{ breakInside: "avoid" }}
            >
              <SmartImage src={img.src} alt={img.cat} className="w-full" rounded={false} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 transition group-hover:opacity-100" />
              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-foreground opacity-0 transition group-hover:opacity-100">{img.cat}</span>
            </motion.button>
          ))}
        </div>
      </Container>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-black/85 p-4 backdrop-blur-sm"
            onClick={() => setOpen(null)}
          >
            <button className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" onClick={() => setOpen(null)}><X /></button>
            <motion.img
              key={open}
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              src={IMAGES[open].src} alt="" className="max-h-[88vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
