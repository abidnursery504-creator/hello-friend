import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

const leaves = [
  { left: "6%", size: 28, delay: 0, dur: 14, rot: -20, op: 0.10 },
  { left: "18%", size: 18, delay: 2, dur: 18, rot: 25, op: 0.08 },
  { left: "34%", size: 36, delay: 4, dur: 16, rot: -10, op: 0.07 },
  { left: "52%", size: 22, delay: 1, dur: 20, rot: 35, op: 0.09 },
  { left: "68%", size: 30, delay: 3, dur: 17, rot: -30, op: 0.08 },
  { left: "84%", size: 20, delay: 5, dur: 22, rot: 15, op: 0.10 },
  { left: "92%", size: 26, delay: 2.5, dur: 19, rot: -15, op: 0.07 },
];

export function FloatingLeaves() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {leaves.map((l, i) => (
        <motion.div
          key={i}
          className="absolute text-primary"
          style={{ left: l.left, top: "-10%", opacity: l.op }}
          animate={{
            y: ["0vh", "115vh"],
            x: [0, 30, -20, 10, 0],
            rotate: [l.rot, l.rot + 180, l.rot + 360],
          }}
          transition={{
            duration: l.dur,
            delay: l.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Leaf style={{ width: l.size, height: l.size }} />
        </motion.div>
      ))}
    </div>
  );
}
