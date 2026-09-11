import { useEffect, useRef, useState } from "react";

/**
 * Luxury Minimal Spatial Cursor
 *
 * Designed strictly for fine-pointer desktop devices:
 * - Idle: 4px ivory dot with lagging metallic ring
 * - Interactive (links/buttons): subtle expansion with soft ultraviolet ring
 * - Viewing stages: subtle pill displaying "EXPLORE" or "INSPECT"
 * - Completely disabled on mobile and touch devices
 * - Zero impact on clicks or interaction flow
 */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement | null>(null);
  const ring = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [cursorMode, setCursorMode] = useState<"default" | "link" | "view" | "inspect" | "open">(
    "default",
  );
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

      const target = e.target as HTMLElement | null;
      if (!target) {
        setCursorMode("default");
        return;
      }

      if (target.closest("[data-cursor='view']") || target.closest(".project-artifact")) {
        setCursorMode("view");
      } else if (
        target.closest("[data-cursor='inspect']") ||
        target.closest(".architecture-node")
      ) {
        setCursorMode("inspect");
      } else if (
        target.closest("[data-cursor='open']") ||
        (target.closest("a[target='_blank']") && !target.closest("[data-cursor]"))
      ) {
        setCursorMode("open");
      } else if (target.closest('a, button, input, textarea, select, [role="button"], summary')) {
        setCursorMode("link");
      } else {
        setCursorMode("default");
      }
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
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
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      {/* Precision Core Dot */}
      <div
        ref={dot}
        className={`fixed left-0 top-0 rounded-full transition-all duration-150 ${
          cursorMode === "view" || cursorMode === "inspect" || cursorMode === "open"
            ? "h-0 w-0 opacity-0"
            : cursorMode === "link"
              ? "h-1.5 w-1.5 bg-violet-400 opacity-90 shadow-[0_0_8px_rgba(139,92,246,0.8)]"
              : "h-1 w-1 bg-white/80 opacity-80"
        }`}
        style={{ opacity: pressed ? 0.3 : undefined }}
      />

      {/* Lagging Contextual Outer Shell */}
      <div
        ref={ring}
        className="fixed left-0 top-0 flex items-center justify-center transition-all duration-200 ease-out will-change-transform"
        style={{
          width:
            cursorMode === "view"
              ? 80
              : cursorMode === "inspect"
                ? 84
                : cursorMode === "open"
                  ? 76
                  : cursorMode === "link"
                    ? 42
                    : 22,
          height:
            cursorMode === "view"
              ? 28
              : cursorMode === "inspect"
                ? 28
                : cursorMode === "open"
                  ? 28
                  : cursorMode === "link"
                    ? 42
                    : 22,
          borderRadius: 9999,
          border:
            cursorMode === "view"
              ? "1px solid rgba(139, 92, 246, 0.45)"
              : cursorMode === "inspect"
                ? "1px solid rgba(56, 189, 248, 0.4)"
                : cursorMode === "open"
                  ? "1px solid rgba(167, 139, 250, 0.45)"
                  : cursorMode === "link"
                    ? "1.5px solid rgba(167, 139, 250, 0.6)"
                    : "1px solid rgba(255, 255, 255, 0.18)",
          backgroundColor:
            cursorMode === "view" || cursorMode === "inspect" || cursorMode === "open"
              ? "rgba(10, 12, 18, 0.92)"
              : cursorMode === "link"
                ? "rgba(139, 92, 246, 0.08)"
                : "transparent",
          boxShadow: cursorMode === "link" ? "0 0 18px rgba(139, 92, 246, 0.3)" : "none",
          backdropFilter:
            cursorMode === "view" || cursorMode === "inspect" || cursorMode === "open"
              ? "blur(12px)"
              : cursorMode === "link"
                ? "blur(2px)"
                : "none",
          transformOrigin: "center center",
          scale: pressed ? "0.85" : "1",
        }}
      >
        {cursorMode === "view" && (
          <span className="font-mono text-[9px] font-semibold tracking-widest text-violet-300 uppercase select-none">
            EXPLORE
          </span>
        )}
        {cursorMode === "inspect" && (
          <span className="font-mono text-[9px] font-semibold tracking-wider text-sky-300 uppercase select-none">
            INSPECT
          </span>
        )}
        {cursorMode === "open" && (
          <span className="font-mono text-[9px] font-semibold tracking-widest text-violet-200 uppercase select-none flex items-center gap-1">
            OPEN ↗
          </span>
        )}
      </div>
    </div>
  );
}
