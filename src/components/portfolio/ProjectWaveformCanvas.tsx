import { useEffect, useRef } from "react";

interface ProjectWaveformCanvasProps {
  mode?: "waveform" | "streaming" | "lattice";
  className?: string;
  isHovered?: boolean;
}

export function ProjectWaveformCanvas({
  mode = "waveform",
  className = "",
  isHovered = false,
}: ProjectWaveformCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let time = 0;

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
      time += isHovered ? 0.045 : 0.02;
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      if (mode === "waveform") {
        // JARVIS Acoustic Voice Waveform (multiple harmonic waves)
        const waveCount = 4;
        for (let w = 0; w < waveCount; w++) {
          ctx.beginPath();
          const alpha = 0.15 + (w / waveCount) * 0.45 + (isHovered ? 0.2 : 0);
          ctx.strokeStyle =
            w === waveCount - 1
              ? `rgba(245, 158, 11, ${alpha})`
              : `rgba(244, 244, 242, ${alpha * 0.6})`;
          ctx.lineWidth = w === waveCount - 1 ? 2 : 1;

          const freq = 0.015 + w * 0.008;
          const speed = (w + 1) * 1.4;
          const amp = height * 0.28 * (1 + w * 0.2) * (isHovered ? 1.35 : 1);

          for (let x = 0; x < width; x += 3) {
            // Gaussian envelope so waveform fades at edges
            const normX = (x / width) * 2 - 1;
            const envelope = Math.exp(-normX * normX * 3.2);

            const y =
              centerY +
              Math.sin(x * freq + time * speed) * Math.cos(x * 0.005 - time * 0.5) * amp * envelope;

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      } else if (mode === "streaming") {
        // ONLINESTREAM Parallel High-Throughput Optical Data Conduits
        const lineCount = 5;
        const spacing = height / (lineCount + 1);

        for (let l = 0; l < lineCount; l++) {
          const y = spacing * (l + 1);
          // Background rail
          ctx.beginPath();
          ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
          ctx.lineWidth = 1;
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();

          // Traveling light pulses
          const speed = (l + 2) * 120;
          const offset = ((time * speed + l * 180) % (width + 200)) - 100;
          const pulseLength = 120 + (l % 3) * 40;

          const grad = ctx.createLinearGradient(offset, y, offset + pulseLength, y);
          grad.addColorStop(0, "rgba(56, 189, 248, 0)");
          grad.addColorStop(0.5, "rgba(56, 189, 248, 0.85)");
          grad.addColorStop(1, "rgba(255, 255, 255, 0.95)");

          ctx.beginPath();
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2;
          ctx.moveTo(offset, y);
          ctx.lineTo(offset + pulseLength, y);
          ctx.stroke();
        }
      } else {
        // DECODELABS Algorithmic Lattice Graph Nodes
        const cols = 6;
        const colSpacing = width / (cols + 1);
        const nodeY1 = height * 0.3;
        const nodeY2 = height * 0.7;

        for (let c = 0; c < cols; c++) {
          const x = colSpacing * (c + 1);
          const y = c % 2 === 0 ? nodeY1 : nodeY2;

          // Connect to next column
          if (c < cols - 1) {
            const nextX = colSpacing * (c + 2);
            const nextY = (c + 1) % 2 === 0 ? nodeY1 : nodeY2;

            ctx.beginPath();
            ctx.strokeStyle = "rgba(244, 244, 242, 0.12)";
            ctx.lineWidth = 1;
            ctx.moveTo(x, y);
            ctx.lineTo(nextX, nextY);
            ctx.stroke();
          }

          // Node circle
          const pulse = Math.sin(time * 2 + c) * 2;
          ctx.beginPath();
          ctx.arc(x, y, 3.5 + (isHovered ? pulse : 0), 0, Math.PI * 2);
          ctx.fillStyle = c % 2 === 0 ? "rgba(245, 158, 11, 0.85)" : "rgba(255, 255, 255, 0.75)";
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [mode, isHovered]);

  return <canvas ref={canvasRef} className={`h-full w-full pointer-events-none ${className}`} />;
}
