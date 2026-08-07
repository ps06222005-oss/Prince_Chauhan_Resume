import { useRef, useState, type ReactNode } from "react";

/**
 * Subtle 3D tilt + spotlight follow. Pointer-only; keyboard/touch users get a
 * plain static card, and the transform is skipped when motion is reduced.
 */
export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [spot, setSpot] = useState<{ x: number; y: number } | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setSpot({ x: px * 100, y: py * 100 });
    setStyle({
      transform: `perspective(1000px) rotateX(${(0.5 - py) * 6}deg) rotateY(${(px - 0.5) * 6}deg) translateY(-6px)`,
    });
  };

  const onLeave = () => {
    setStyle({ transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)" });
    setSpot(null);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ ...style, transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)" }}
      className={`relative ${className}`}
    >
      {children}
      {spot && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity"
          style={{
            background: `radial-gradient(340px circle at ${spot.x}% ${spot.y}%, color-mix(in oklab, var(--primary) 12%, transparent), transparent 65%)`,
          }}
        />
      )}
    </div>
  );
}
