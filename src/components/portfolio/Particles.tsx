import { useEffect, useMemo, useRef, useState } from "react";

type P = { x: number; y: number; size: number; sx: number; sy: number };

/**
 * Floating particles that gently drift and are nudged away from the cursor.
 * Client-only (random positions would mismatch SSR markup) and static when the
 * user prefers reduced motion.
 */
export function Particles({ count = 40 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);
  const wrap = useRef<HTMLDivElement | null>(null);
  useEffect(() => setMounted(true), []);

  const particles = useMemo<P[]>(
    () =>
      Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        sx: (Math.random() - 0.5) * 0.02,
        sy: (Math.random() - 0.5) * 0.02,
      })),
    [count],
  );

  useEffect(() => {
    if (!mounted) return;
    const el = wrap.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(el.children) as HTMLElement[];
    const state = particles.map((p) => ({ ...p }));
    const mouse = { x: -999, y: -999 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width) * 100;
      mouse.y = ((e.clientY - r.top) / r.height) * 100;
    };

    const tick = () => {
      state.forEach((p, i) => {
        p.x += p.sx;
        p.y += p.sy;
        // repel from cursor
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 100 && d2 > 0.01) {
          const f = (1 - d2 / 100) * 0.9;
          p.x += (dx / Math.sqrt(d2)) * f;
          p.y += (dy / Math.sqrt(d2)) * f;
        }
        if (p.x < 0) p.x += 100;
        if (p.x > 100) p.x -= 100;
        if (p.y < 0) p.y += 100;
        if (p.y > 100) p.y -= 100;
        const n = nodes[i];
        if (n) n.style.transform = `translate3d(${p.x}vw, ${p.y}vh, 0)`;
      });
      raf = requestAnimationFrame(tick);
    };

    // paint initial positions even with reduced motion
    tick();
    if (reduce) {
      cancelAnimationFrame(raf);
      return;
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [mounted, particles]);

  if (!mounted) return null;

  return (
    <div ref={wrap} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute left-0 top-0 rounded-full bg-accent-blue/40"
          style={{ width: p.size, height: p.size, willChange: "transform" }}
        />
      ))}
    </div>
  );
}
