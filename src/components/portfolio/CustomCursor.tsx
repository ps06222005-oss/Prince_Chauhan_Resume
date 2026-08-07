import { useEffect, useRef, useState } from "react";

/**
 * Desktop-only custom cursor: a small dot plus a lagging ring that grows over
 * interactive elements and pulses on click. Hidden for touch devices and when
 * the user prefers reduced motion.
 */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement | null>(null);
  const ring = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const el = e.target as HTMLElement | null;
      setHovering(
        !!el?.closest('a, button, input, textarea, select, [role="button"], summary'),
      );
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <div
        ref={dot}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-primary transition-opacity"
        style={{ opacity: pressed ? 0.4 : 1 }}
      />
      <div
        ref={ring}
        className="fixed left-0 top-0 rounded-full border border-primary/50 transition-[width,height,background-color,border-color] duration-200 ease-out"
        style={{
          width: hovering ? 44 : 26,
          height: hovering ? 44 : 26,
          backgroundColor: hovering ? "color-mix(in oklab, var(--primary) 12%, transparent)" : "transparent",
          scale: pressed ? "0.8" : "1",
        }}
      />
    </div>
  );
}
