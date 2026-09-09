import { useEffect, useRef, useState } from "react";

/**
 * Phase 6.5 — Intentional Spatial Cursor System
 * Context-aware, subtle, non-gimmicky cursor:
 * - Normal: 4px precision point with lagging ring
 * - Interactive (buttons/links): soft expansion
 * - Project stage: displays "VIEW"
 * - Architecture nodes / specimens: displays "INSPECT"
 * - Automatically disabled on touch screens and prefers-reduced-motion.
 */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement | null>(null);
  const ring = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [cursorMode, setCursorMode] = useState<"default" | "link" | "view" | "inspect">("default");
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
      } else if (target.closest('a, button, input, textarea, select, [role="button"], summary')) {
        setCursorMode("link");
      } else {
        setCursorMode("default");
      }
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const loop = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
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
          cursorMode === "view" || cursorMode === "inspect"
            ? "h-0 w-0 opacity-0"
            : cursorMode === "link"
              ? "h-2 w-2 bg-amber-300 opacity-90"
              : "h-1.5 w-1.5 bg-foreground/80 opacity-80"
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
              ? 76
              : cursorMode === "inspect"
                ? 82
                : cursorMode === "link"
                  ? 44
                  : 24,
          height:
            cursorMode === "view"
              ? 30
              : cursorMode === "inspect"
                ? 30
                : cursorMode === "link"
                  ? 44
                  : 24,
          borderRadius: 9999,
          border:
            cursorMode === "view"
              ? "1px solid rgba(245, 158, 11, 0.45)"
              : cursorMode === "inspect"
                ? "1px solid rgba(56, 189, 248, 0.4)"
                : cursorMode === "link"
                  ? "1px solid rgba(245, 158, 11, 0.35)"
                  : "1px solid rgba(255, 255, 255, 0.2)",
          backgroundColor:
            cursorMode === "view"
              ? "rgba(12, 14, 20, 0.9)"
              : cursorMode === "inspect"
                ? "rgba(12, 14, 20, 0.9)"
                : cursorMode === "link"
                  ? "rgba(245, 158, 11, 0.08)"
                  : "transparent",
          backdropFilter: cursorMode === "view" || cursorMode === "inspect" ? "blur(12px)" : "none",
          transformOrigin: "center center",
          scale: pressed ? "0.85" : "1",
        }}
      >
        {cursorMode === "view" && (
          <span className="font-mono text-[9px] font-bold tracking-widest text-amber-300 uppercase select-none">
            VIEW
          </span>
        )}
        {cursorMode === "inspect" && (
          <span className="font-mono text-[9px] font-semibold tracking-wider text-sky-300 uppercase select-none">
            INSPECT
          </span>
        )}
      </div>
    </div>
  );
}
