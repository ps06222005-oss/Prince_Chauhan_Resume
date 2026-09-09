import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ProjectConduitTransitionProps {
  type: "jarvis-to-stream" | "stream-to-decode";
  fromLabel: string;
  toLabel: string;
}

export function ProjectConduitTransition({
  type,
  fromLabel,
  toLabel,
}: ProjectConduitTransitionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const morphProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let t = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      t += 0.02;
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      ctx.clearRect(0, 0, width, height);

      // Current progress [0 to 1]
      const p = Math.min(1, Math.max(0, morphProgress.get()));
      const centerY = height / 2;

      if (type === "jarvis-to-stream") {
        // Voice waveform stretches into streaming lines
        // At p=0: purely sinusoidal acoustic wave
        // At p=1: straight parallel laser streaming lines
        const lines = 3;
        for (let i = 0; i < lines; i++) {
          const targetY = centerY + (i - 1) * 22;
          ctx.beginPath();

          const alpha = 0.2 + (1 - Math.abs(i - 1) * 0.4) * 0.5;
          ctx.strokeStyle =
            i === 1 ? `rgba(245, 158, 11, ${alpha})` : `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = i === 1 ? 1.8 : 1;

          for (let x = 0; x < width; x += 4) {
            const waveAmp = (1 - p) * 32 * Math.sin(x * 0.02 + t * 2 + i);
            const streamY = targetY;
            const y = (1 - p) * (centerY + waveAmp) + p * streamY;

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();

          // Traveling photon packet across the morph
          const packetX = ((t * 240 + i * 160) % (width + 80)) - 40;
          const packetY = (1 - p) * centerY + p * targetY;
          ctx.beginPath();
          ctx.arc(packetX, packetY, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();
        }
      } else {
        // Streaming lines converge into lattice nodes
        const pMod = p;
        const widthHalf = width / 2;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(244, 244, 242, ${0.15 + (1 - pMod) * 0.15})`;
        ctx.lineWidth = 1;

        // Converging diagonal vector rails
        ctx.moveTo(0, centerY - 24 * (1 - pMod));
        ctx.lineTo(widthHalf, centerY);
        ctx.lineTo(width, centerY - 24 * pMod);
        ctx.moveTo(0, centerY + 24 * (1 - pMod));
        ctx.lineTo(widthHalf, centerY);
        ctx.lineTo(width, centerY + 24 * pMod);
        ctx.stroke();

        // Pulsing central nexus node
        ctx.beginPath();
        ctx.arc(widthHalf, centerY, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(245, 158, 11, 0.85)";
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [type, morphProgress]);

  return (
    <div
      ref={containerRef}
      className="relative my-16 sm:my-24 py-8 flex flex-col items-center justify-center overflow-hidden border-y border-white/[0.05]"
    >
      <div className="absolute inset-0 z-0">
        <canvas ref={canvasRef} className="h-full w-full pointer-events-none" />
      </div>

      {/* Typographic Continuum Labels */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-5xl px-6 font-mono text-[10px] text-muted-foreground/70 uppercase tracking-widest">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
          <span>{fromLabel}</span>
        </span>

        <span className="text-white/30 hidden sm:inline">
          {type === "jarvis-to-stream"
            ? "ACOUSTIC WAVEFORM → STREAMING PROTOCOL CONTINUUM"
            : "DATA STREAM → ALGORITHMIC LATTICE CONTINUUM"}
        </span>

        <span className="flex items-center gap-2 text-foreground/80">
          <span>{toLabel}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        </span>
      </div>
    </div>
  );
}
