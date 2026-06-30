import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";
import { site } from "@/data/site";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.81 11.81 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  );
}

function MessengerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.652V24l4.088-2.242c1.092.302 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.26L19.752 8l-6.561 6.963z"/>
    </svg>
  );
}

export function FloatingActions() {
  const [show, setShow] = useState(false);
  const phoneDigits = site.phone.replace(/\D/g, "");
  const waDigits = site.whatsapp.replace(/\D/g, "");

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const buttons = [
    {
      key: "wa",
      label: "WhatsApp",
      href: `https://wa.me/${waDigits}`,
      bg: "bg-[#25D366]",
      ring: "ring-[#25D366]/40",
      icon: <WhatsAppIcon className="size-6" />,
    },
  ];

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
      <div className="mx-auto flex max-w-7xl items-end justify-between px-4 pb-24 sm:px-6 lg:px-8 lg:pb-5">
        {/* Left: back to top */}
        <AnimatePresence>
          {show && (
            <motion.button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Back to top"
              className="pointer-events-auto grid size-12 place-items-center rounded-full glass-strong text-foreground shadow-elegant"
            >
              <ArrowUp className="size-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Right: chat stack */}
        <div className="pointer-events-auto flex flex-col items-end gap-3">
          {buttons.map((b, i) => (
            <motion.a
              key={b.key}
              href={b.href}
              target={b.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={b.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.08, type: "spring", stiffness: 220, damping: 18 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className={`group relative grid size-12 place-items-center rounded-full text-white shadow-elegant ring-4 ${b.ring} ${b.bg}`}
            >
              <span className="absolute inset-0 -z-10 rounded-full opacity-70">
                <span className={`absolute inset-0 animate-ping rounded-full ${b.bg} opacity-30`} />
              </span>
              {b.icon}
              <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background opacity-0 transition group-hover:opacity-100 sm:block">
                {b.label}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
