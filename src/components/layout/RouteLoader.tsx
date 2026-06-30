import { useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Leaf } from "lucide-react";

export function RouteLoader() {
  const isLoading = useRouterState({ select: (s) => s.isLoading || s.isTransitioning });
  return (
    <>
      {/* Top progress bar */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="bar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-x-0 top-0 z-[60] h-[3px] overflow-hidden bg-transparent"
          >
            <motion.div
              className="h-full gradient-primary"
              initial={{ width: "0%" }}
              animate={{ width: ["0%", "70%", "92%"] }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Centered leaf pulse — only on slower loads */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="leaf"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.4 }}
            className="pointer-events-none fixed bottom-6 right-1/2 z-[60] translate-x-1/2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
              className="grid size-10 place-items-center rounded-full glass-strong text-primary shadow-elegant"
            >
              <Leaf className="size-5" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
