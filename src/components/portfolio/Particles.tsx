import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

export function Particles({ count = 40 }: { count?: number }) {
  // Client-only: random positions would mismatch the SSR markup during hydration.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
      })),
    [count],
  );

  if (!mounted) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">

      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-accent-blue/40"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
