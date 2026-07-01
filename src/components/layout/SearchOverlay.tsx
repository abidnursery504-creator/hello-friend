import { AnimatePresence, motion } from "framer-motion";
import { Search, X, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useProducts } from "@/hooks/useCatalog";
import { SmartImage } from "@/components/common/SmartImage";
import { toBnDigits } from "@/lib/format";

const trending = ["আম্রপালি আম", "থাই পেয়ারা", "বীজহীন লেবু", "ড্রাগন ফল", "লিচু", "মাল্টা কমলা"];

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const { data: products = [] } = useProducts();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const results = q.trim()
    ? products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.nameBn.includes(q)).slice(0, 6)
    : [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-background/70 backdrop-blur-xl"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative mx-auto mt-[10vh] w-full max-w-3xl px-4"
          >
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-elegant">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (q.trim()) {
                    navigate({ to: "/search", search: { q } as never });
                    onClose();
                  }
                }}
                className="flex items-center gap-3 border-b border-border px-5 py-4"
              >
                <Search className="size-5 text-muted-foreground" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="আম, লেবু, পেয়ারা, ইনডোর গাছ খুঁজুন…"
                  className="font-bn flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="বন্ধ করুন"
                  className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:bg-accent"
                >
                  <X className="size-4" />
                </button>
              </form>

              <div className="max-h-[60vh] overflow-y-auto p-5">
                {!q && (
                  <div>
                    <div className="font-bn mb-3 flex items-center gap-2 text-xs font-semibold tracking-wide text-muted-foreground">
                      <TrendingUp className="size-3.5" /> জনপ্রিয় খোঁজ
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {trending.map((t) => (
                        <button
                          key={t}
                          onClick={() => setQ(t)}
                          className="font-bn rounded-full border border-border bg-secondary/60 px-4 py-2 text-sm transition hover:border-primary hover:text-primary"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {q && results.length === 0 && (
                  <p className="font-bn py-10 text-center text-sm text-muted-foreground">
                    কোনো গাছ পাওয়া যায়নি। অন্য কিছু খুঁজে দেখুন।
                  </p>
                )}

                {results.length > 0 && (
                  <ul className="space-y-2">
                    {results.map((p) => (
                      <li key={p.slug}>
                        <button
                          onClick={() => {
                            navigate({ to: "/products/$slug", params: { slug: p.slug } });
                            onClose();
                          }}
                          className="flex w-full items-center gap-3 rounded-2xl border border-transparent p-2 text-left transition hover:border-border hover:bg-accent"
                        >
                          <SmartImage src={p.image} alt={p.name} aspect="square" className="size-14 shrink-0 rounded-xl" />
                          <div className="min-w-0 flex-1">
                            <div className="font-bn truncate text-sm font-semibold">{p.name}</div>
                            <div className="font-bn truncate text-xs text-muted-foreground">{p.nameBn}</div>
                          </div>
                          <div className="font-bn text-sm font-bold text-primary">৳{toBnDigits(p.price)}</div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
