import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  ArrowUpRight,
  X,
  Radio,
  GitBranch,
  Terminal,
  Activity,
} from "lucide-react";
import { fetchGithubEcosystem, type GithubEcosystemData } from "@/services/github";
import type { EngineeringProject } from "@/types/portfolio";
import { FALLBACK_PROJECTS } from "@/data/projects";
import { MagneticButton } from "./MagneticButton";
import { ScrollReveal } from "./ScrollReveal";
import { LazyProjectImage } from "./LazyProjectImage";

function getProjectImageUrl(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("jarvis")) {
    return "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&auto=format&fit=crop&q=80";
  }
  if (n.includes("stream")) {
    return "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80";
  }
  if (n.includes("decode")) {
    return "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80";
  }
  return "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80";
}

/**
 * ============================================================================
 * TECHNICAL ART VISUALIZATION 01: JARVIS NEURAL ACOUSTIC INTENT LATTICE
 * ============================================================================
 * Generative canvas combining multi-harmonic acoustic waves, orbiting particle
 * vortices, and ambient noise calibration thresholds in Electric Blue & Sky Cyan.
 */
function JarvisTechnicalArt() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeCommand, setActiveCommand] = useState<string>("SYSTEM_IDLE");
  const [isDispatched, setIsDispatched] = useState<boolean>(false);
  const pulseIntensity = useRef<number>(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let step = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 600;
      canvas.height = canvas.parentElement?.clientHeight || 320;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particle vortex field
    const particleCount = 42;
    const particles = Array.from({ length: particleCount }, (_, i) => ({
      angle: (i / particleCount) * Math.PI * 2,
      radius: 40 + (i % 5) * 22,
      speed: 0.008 + (i % 3) * 0.006,
      size: 1 + (i % 3) * 0.8,
      alpha: 0.3 + (i % 4) * 0.15,
      isElectric: i % 3 === 0,
    }));

    const render = () => {
      step += 0.035;
      pulseIntensity.current += (1 - pulseIntensity.current) * 0.05;

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // 1. Delicate Architectural Grid
      ctx.strokeStyle = "rgba(59, 130, 246, 0.05)";
      ctx.lineWidth = 1;
      const gridSize = 36;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // 2. Ambient Noise Calibration Thresholds
      ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
      ctx.setLineDash([3, 6]);
      ctx.beginPath();
      ctx.moveTo(0, cy - 48);
      ctx.lineTo(w, cy - 48);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, cy + 48);
      ctx.lineTo(w, cy + 48);
      ctx.stroke();
      ctx.setLineDash([]);

      // 3. Central Acoustic Aperture Rings
      for (let r = 0; r < 3; r++) {
        const baseRadius = (32 + r * 22) * pulseIntensity.current;
        ctx.beginPath();
        ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2);
        ctx.strokeStyle =
          r === 0
            ? "rgba(59, 130, 246, 0.6)"
            : r === 1
              ? "rgba(56, 189, 248, 0.38)"
              : "rgba(99, 102, 241, 0.2)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // 4. Orbiting Particle Vortex
      particles.forEach((p) => {
        p.angle += p.speed * pulseIntensity.current;
        const px = cx + Math.cos(p.angle) * p.radius * pulseIntensity.current;
        const py = cy + Math.sin(p.angle) * p.radius * 0.65 * pulseIntensity.current;

        const alpha = p.alpha * (isDispatched ? 1.5 : 0.85);
        ctx.fillStyle = p.isElectric
          ? `rgba(59, 130, 246, ${alpha})`
          : `rgba(56, 189, 248, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 5. Multi-harmonic Voice Waveforms
      const ampMultiplier = isDispatched ? 2.2 : 1;
      const waves = [
        { color: "rgba(56, 189, 248, 0.88)", freq: 0.014, amp: 28 * ampMultiplier, speed: 1.3 },
        { color: "rgba(59, 130, 246, 0.72)", freq: 0.022, amp: 18 * ampMultiplier, speed: 0.9 },
        { color: "rgba(129, 140, 248, 0.45)", freq: 0.009, amp: 14 * ampMultiplier, speed: 1.6 },
      ];

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 1.8;

        for (let x = 0; x < w; x += 3) {
          const envelope = Math.sin((x / w) * Math.PI);
          const y =
            cy +
            Math.sin(x * wave.freq + step * wave.speed) *
              wave.amp *
              envelope *
              (1 + Math.sin(step * 1.8 + x * 0.008) * 0.25);

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [isDispatched]);

  const dispatchVoiceCommand = (cmd: string) => {
    if (isDispatched) return;
    setIsDispatched(true);
    setActiveCommand(cmd);
    pulseIntensity.current = 1.6;

    setTimeout(() => {
      setIsDispatched(false);
      setTimeout(() => setActiveCommand("SYSTEM_IDLE"), 4000);
    }, 2400);
  };

  return (
    <div
      role="region"
      aria-label="Acoustic Intent Lattice Simulation"
      className="relative rounded-2xl border border-blue-500/15 bg-[#070B14] p-6 sm:p-7 overflow-hidden space-y-5 shadow-xl"
    >
      {/* Visual Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[10px] text-slate-400 border-b border-blue-500/10 pb-3.5">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs tracking-wider">
            <Activity size={13} className="animate-pulse text-blue-400" />
            <span>ACOUSTIC INTENT LATTICE // TECHNICAL ART</span>
          </div>
          <p className="font-sans text-[11px] text-slate-400">
            Voice command waveform synthesis &amp; deterministic offline intent dispatch
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-sky-300 font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span>OFFLINE DISPATCH READY</span>
        </div>
      </div>

      {/* Main Generative Canvas */}
      <div className="relative h-56 sm:h-64 w-full rounded-xl bg-[#050811] border border-blue-500/15 overflow-hidden">
        <canvas
          ref={canvasRef}
          aria-label="Live acoustic generative wave simulation canvas"
          className="absolute inset-0 w-full h-full block"
        />

        {/* Live Intent Overlay Tag */}
        <div className="absolute top-3 left-3 font-mono text-[10px] px-3 py-1.5 rounded-md bg-[#070B14]/90 border border-blue-500/25 text-sky-300 backdrop-blur-md flex items-center gap-1.5 shadow-sm">
          <Terminal size={11} className="text-blue-400" />
          <span>INTENT: {activeCommand}</span>
        </div>

        <div className="absolute bottom-3 right-3 font-mono text-[9px] text-slate-500 tracking-wider">
          PYTTSX3 // CONTINUOUS ACOUSTIC THREAD
        </div>
      </div>

      {/* Interactive Command Triggers */}
      <div className="space-y-2 pt-1 font-mono text-xs">
        <div className="text-slate-400 text-[11px] uppercase tracking-wider flex items-center justify-between">
          <span>Test Voice Intent Pipeline:</span>
          {isDispatched && (
            <span className="text-blue-400 font-semibold animate-pulse">Dispatching...</span>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {[
            { label: "Knowledge Lookup", cmd: "search Wikipedia for AI Architectures" },
            { label: "Desktop Terminal", cmd: "launch VS Code & workspace runtime" },
            { label: "System Diagnostics", cmd: "report CPU & memory utilization" },
          ].map((item, idx) => (
            <button
              key={idx}
              type="button"
              disabled={isDispatched}
              onClick={() => dispatchVoiceCommand(item.cmd)}
              aria-label={`Trigger voice intent: ${item.label}`}
              className="min-h-[44px] px-3.5 py-2.5 rounded-xl border border-blue-500/15 bg-blue-500/[0.03] hover:bg-blue-500/15 hover:border-blue-400/50 text-slate-300 hover:text-white active:bg-blue-500/25 active:scale-[0.98] transition-all duration-200 text-left text-xs cursor-pointer disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none flex flex-col justify-center"
            >
              <div className="text-[10px] text-blue-400 uppercase font-bold">0{idx + 1}</div>
              <div className="truncate font-medium text-white/95">{item.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * ============================================================================
 * TECHNICAL ART VISUALIZATION 02: ONLINESTREAM EDGE LATENCY MATRIX
 * ============================================================================
 */
function OnlineStreamTechnicalArt() {
  const [streamingRate, setStreamingRate] = useState(24.8);
  const [activeNode, setActiveNode] = useState("DEL");

  const nodes = [
    { city: "DEL", region: "Delhi NCR", lat: "14ms", status: "Primary POP" },
    { city: "BOM", region: "Mumbai", lat: "22ms", status: "Active Edge" },
    { city: "SIN", region: "Singapore", lat: "45ms", status: "Transit Hub" },
    { city: "FRA", region: "Frankfurt", lat: "110ms", status: "Global Relay" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStreamingRate((prev) => {
        const delta = (Math.random() - 0.5) * 1.8;
        return Number(Math.max(21.4, Math.min(29.6, prev + delta)).toFixed(1));
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const selected = nodes.find((n) => n.city === activeNode) || nodes[0];

  return (
    <div
      role="region"
      aria-label="Edge Latency Matrix & Stream Architecture Simulation"
      className="relative rounded-2xl border border-blue-500/15 bg-[#070B14] p-6 sm:p-7 overflow-hidden space-y-5 shadow-xl"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[10px] text-slate-400 border-b border-blue-500/10 pb-3.5">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs tracking-wider">
            <Radio size={13} className="animate-pulse text-blue-400" />
            <span>EDGE LATENCY MATRIX // STREAM ARCHITECTURE</span>
          </div>
          <p className="font-sans text-[11px] text-slate-400">
            Real-time CDN edge distribution, packet velocity &amp; zero-layout-shift playback
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-sky-300 font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span>STATUS: 200 OK · {selected.lat}</span>
        </div>
      </div>

      <div className="relative min-h-[220px] sm:min-h-[240px] w-full rounded-xl bg-[#050811] border border-blue-500/15 p-5 flex flex-col justify-between overflow-hidden">
        {/* Subtle Background Node Arcs */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full border border-sky-400/40 animate-ping" />
          <div className="absolute bottom-1/4 right-1/4 h-24 w-24 rounded-full border border-blue-500/40" />
        </div>

        {/* Global Node Points */}
        <div className="relative z-10 space-y-1.5">
          <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider flex justify-between">
            <span>Select Edge Point to Ping:</span>
            <span className="text-blue-400 font-medium">{selected.status}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono text-[10px]">
            {nodes.map((node) => {
              const isCurrent = activeNode === node.city;
              return (
                <button
                  key={node.city}
                  type="button"
                  onClick={() => setActiveNode(node.city)}
                  aria-pressed={isCurrent}
                  aria-label={`Select ${node.region} edge node, current latency ${node.lat}`}
                  className={`min-h-[44px] p-2.5 rounded-xl border transition-all duration-200 cursor-pointer text-left flex flex-col justify-center focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none ${
                    isCurrent
                      ? "bg-blue-600/20 border-blue-400/60 shadow-[0_0_16px_rgba(37,99,235,0.3)] text-white"
                      : "bg-blue-500/[0.03] border-blue-500/10 text-slate-400 hover:text-white hover:border-blue-400/35"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-[9px] font-bold">{node.city}</span>
                    <span
                      className={`text-xs font-bold ${isCurrent ? "text-sky-300" : "text-white"}`}
                    >
                      {node.lat}
                    </span>
                  </div>
                  <div className="text-[10px] truncate text-slate-300 mt-0.5">{node.region}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Velocity Tube */}
        <div className="relative z-10 space-y-1.5 font-mono pt-3">
          <div className="flex justify-between text-[11px] text-slate-300">
            <span>EDGE BUFFER THROUGHPUT</span>
            <span className="text-sky-400 font-bold">{streamingRate} MB/s</span>
          </div>
          <div className="h-2 w-full rounded-full bg-blue-950/60 overflow-hidden p-0.5">
            <div className="h-full w-4/5 bg-gradient-to-r from-blue-600 via-blue-400 to-sky-300 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Architecture Spec Footer */}
        <div className="relative z-10 font-mono text-[10px] text-slate-400 flex items-center justify-between border-t border-blue-500/10 pt-2 mt-3">
          <span>CONTAINER: 16:9 FIXED RATIO</span>
          <span className="text-sky-400 font-semibold">CLS SCORE: 0.00 (ZERO)</span>
        </div>
      </div>

      <div className="font-mono text-xs text-slate-300 leading-relaxed">
        <span className="text-sky-400 font-semibold text-[11px] uppercase">
          Zero-Shift Assurance:{" "}
        </span>
        Rigid aspect-ratio containment preventing reflow during video packet buffering across
        distributed edge CDN nodes.
      </div>
    </div>
  );
}

/**
 * ============================================================================
 * TECHNICAL ART VISUALIZATION 03: DECODELABS ALGORITHMIC LATTICE
 * ============================================================================
 */
function DecodeLabsTechnicalArt() {
  const [selectedComplexity, setSelectedComplexity] = useState<string>("O(log n)");

  const complexities = [
    { name: "O(1)", label: "Constant", desc: "Hash lookups & direct memory index access" },
    { name: "O(log n)", label: "Logarithmic", desc: "Binary search & balanced BST traversals" },
    { name: "O(n)", label: "Linear", desc: "Sequential scans & functional array transformations" },
    { name: "O(n log n)", label: "Linearithmic", desc: "MergeSort & optimal comparison sorting" },
  ];

  return (
    <div
      role="region"
      aria-label="Computation Lattice & Algorithmic Runtime Bounds"
      className="relative rounded-2xl border border-blue-500/15 bg-[#070B14] p-6 sm:p-7 overflow-hidden space-y-5 shadow-xl"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[10px] text-slate-400 border-b border-blue-500/10 pb-3.5">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs tracking-wider">
            <GitBranch size={13} className="text-sky-400" />
            <span>COMPUTATION LATTICE // DECODELABS INTERNSHIP</span>
          </div>
          <p className="font-sans text-[11px] text-slate-400">
            Runtime bounds, data structure operations &amp; asymptotic time complexity
          </p>
        </div>
        <div className="text-slate-500 font-mono text-[10px]">PYTHON MODULES</div>
      </div>

      <div className="relative min-h-[220px] sm:min-h-[240px] w-full rounded-xl bg-[#050811] border border-blue-500/15 p-5 flex flex-col justify-between">
        <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
          Select Asymptotic Runtime Bound:
        </div>

        {/* Visual Graph Nodes with 44px touch targets */}
        <div className="relative my-auto grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
          {complexities.map((comp, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedComplexity(comp.name)}
              aria-pressed={selectedComplexity === comp.name}
              aria-label={`Select asymptotic complexity ${comp.name} - ${comp.label}`}
              className={`min-h-[48px] p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none ${
                selectedComplexity === comp.name
                  ? "border-blue-400 bg-blue-600/20 text-white shadow-[0_0_18px_rgba(37,99,235,0.32)]"
                  : "border-blue-500/15 bg-blue-500/[0.03] text-slate-400 hover:text-white hover:border-blue-400/35"
              }`}
            >
              <span className="font-mono text-xs font-bold">{comp.name}</span>
              <span className="font-sans text-[10px] text-slate-400">{comp.label}</span>
            </button>
          ))}
        </div>

        <div className="font-mono text-[10px] text-slate-400 flex items-center justify-between border-t border-blue-500/10 pt-2">
          <span>BOUND: {selectedComplexity}</span>
          <span className="text-blue-400 font-semibold">
            {complexities.find((c) => c.name === selectedComplexity)?.label} Class
          </span>
        </div>
      </div>

      <div className="font-mono text-xs text-slate-300 leading-relaxed">
        <span className="text-blue-400 font-semibold text-[11px] uppercase">
          Algorithmic Spec:{" "}
        </span>
        {complexities.find((c) => c.name === selectedComplexity)?.desc}. Engineered as clean Python
        modules during the DecodeLabs technical internship.
      </div>
    </div>
  );
}

/**
 * ============================================================================
 * MAIN PROJECTS COMPONENT: STITCH BLUE BENTO CASE STUDIES
 * ============================================================================
 */
export function Projects() {
  const [data, setData] = useState<GithubEcosystemData>({
    user: null,
    projects: FALLBACK_PROJECTS,
    allLanguages: ["Python", "TypeScript"],
    allCategories: ["AI/ML", "Web", "Engineering"],
    totalStars: 0,
    totalForks: 0,
    syncState: "idle",
    lastSyncedAt: null,
  });

  const [activeDossier, setActiveDossier] = useState<EngineeringProject | null>(null);
  const [projectViewMode, setProjectViewMode] = useState<Record<string | number, "image" | "sim">>(
    {},
  );

  useEffect(() => {
    fetchGithubEcosystem().then(setData);
  }, []);

  // Canonical deduplication ensuring strictly 4 authentic systems
  const canonicalProjects = useMemo(() => {
    const seen = new Set<string>();
    const deduplicated: EngineeringProject[] = [];
    const sourceList = data.projects.length > 0 ? data.projects : FALLBACK_PROJECTS;

    for (const project of sourceList) {
      const lower = project.name.toLowerCase().replace(/[^a-z0-9]/g, "");
      const key = lower.includes("jarvis")
        ? "jarvis"
        : lower.includes("stream")
          ? "onlinestream"
          : lower.includes("decode")
            ? "decodelabs"
            : lower.includes("resume") || lower.includes("portfolio")
              ? "portfolio"
              : lower;

      if (!seen.has(key)) {
        seen.add(key);
        deduplicated.push(project);
      }
    }

    return deduplicated;
  }, [data.projects]);

  return (
    <section
      id="projects"
      aria-label="Engineered Systems and Editorial Case Studies"
      className="relative w-full overflow-hidden bg-background text-foreground py-20 sm:py-28 lg:py-36 border-t border-border"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* =====================================================================
            EDITORIAL SECTION HEADER
            ===================================================================== */}
        <ScrollReveal
          direction="up"
          distance={26}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8"
        >
          <div className="space-y-3 max-w-3xl">
            <div className="space-y-1">
              <div className="font-mono text-xs text-primary tracking-widest uppercase">
                SELECTED SYSTEMS &amp; EDITORIAL CASE STUDIES
              </div>
              <p className="font-sans text-xs text-muted-foreground">
                Core Engineering Projects, Technical Proofs &amp; Architectural Case Studies
              </p>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-[-0.035em] text-foreground">
              Living Codebases. <br />
              <span className="text-gradient-chrome">Architectural Intent.</span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
              A curated catalog of software systems, designed as rigorous engineering case studies
              with interactive technical art stages and open GitHub repositories.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-primary bg-card border border-border px-4 py-2 rounded-full shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_currentColor]" />
            <span>AUTHENTIC GITHUB EVIDENCE</span>
          </div>
        </ScrollReveal>

        {/* =====================================================================
            CASE STUDY CHAPTERS (STITCH BLUE BENTO ELEVATION)
            ===================================================================== */}
        <div className="space-y-20 sm:space-y-28">
          {canonicalProjects.map((project, idx) => {
            const isJarvis = project.name.toLowerCase().includes("jarvis");
            const isStream = project.name.toLowerCase().includes("stream");
            const isDecode = project.name.toLowerCase().includes("decode");
            const chapterNum = String(idx + 1).padStart(2, "0");

            const thesisStatement = isJarvis
              ? "Engineering deterministic offline acoustic dispatch and zero-cloud desktop agency."
              : isStream
                ? "Architecting zero-layout-shift video delivery over global edge distributions."
                : isDecode
                  ? "Designing optimal algorithmic abstractions and asymptotic runtime safety in Python."
                  : "Synthesizing spatial aesthetics, high-performance WebGL, and verified technical provenance.";

            return (
              <ScrollReveal
                key={project.id}
                direction="up"
                distance={32}
                delay={0.05}
                duration={0.7}
              >
                <article className="group relative rounded-3xl border border-border bg-card/95 dark:bg-[#1E293B]/80 dark:backdrop-blur-xl p-6 sm:p-10 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 shadow-md hover:shadow-xl">
                  {/* Subtle top edge luminous streak on hover */}
                  <div className="absolute top-0 inset-x-12 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Chapter Meta Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-6 font-mono text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-primary">
                        CHAPTER {chapterNum}
                      </span>
                      <span className="text-border">/</span>
                      <span className="text-muted-foreground uppercase tracking-widest text-[11px]">
                        {project.category}
                      </span>
                      <span className="text-border">/</span>
                      <span className="text-accent text-[11px] font-medium">
                        {project.primaryLanguage || "Python / TypeScript"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>CANONICAL REPOSITORY</span>
                    </div>
                  </div>

                  {/* 2-Column Editorial Case Study Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pt-8 items-start">
                    {/* Left Column: Narrative Thesis & Decisions */}
                    <div className="lg:col-span-6 space-y-6">
                      <div className="space-y-3">
                        <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight text-foreground group-hover:text-primary transition-colors">
                          {project.displayName || project.name}
                        </h3>

                        {/* Editorial Serif Thesis Quote */}
                        <blockquote className="font-serif italic text-base sm:text-lg text-foreground/90 border-l-2 border-primary pl-4 py-0.5">
                          &ldquo;{thesisStatement}&rdquo;
                        </blockquote>
                      </div>

                      <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed font-light">
                        {project.positioning || project.overview}
                      </p>

                      {/* Architectural Specifications */}
                      {project.features && project.features.length > 0 && (
                        <div className="space-y-2 pt-2 border-t border-border">
                          <div className="font-mono text-[11px] text-accent font-semibold uppercase tracking-wider">
                            CORE TECHNICAL SPECIFICATIONS
                          </div>
                          <div className="space-y-1.5">
                            {project.features.slice(0, 3).map((feat, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-2.5 font-sans text-xs sm:text-sm text-foreground/85"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Technology Stack Badges */}
                      <div className="space-y-2 pt-1">
                        <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                          STACK DEPLOYMENT
                        </div>
                        <div className="flex flex-wrap gap-2 font-mono text-xs">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-full border border-border bg-secondary/50 text-foreground/80 text-[11px]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Row */}
                      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
                        {project.githubUrl && (
                          <MagneticButton
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Inspect Source Code on GitHub"
                            className="min-h-[44px] inline-flex items-center gap-2 font-mono text-xs font-semibold px-4 py-2.5 rounded-full border border-border bg-surface text-foreground hover:border-primary hover:text-primary transition-all shadow-sm cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                          >
                            <Github size={14} />
                            <span>View Code ↗</span>
                          </MagneticButton>
                        )}

                        {project.demoUrl && (
                          <MagneticButton
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Launch Live Deployed Interface"
                            className="min-h-[44px] inline-flex items-center gap-2 font-mono text-xs font-bold px-4 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all shadow-md cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                          >
                            <ExternalLink size={14} />
                            <span>Live Demo ↗</span>
                          </MagneticButton>
                        )}

                        <MagneticButton
                          onClick={() => setActiveDossier(project)}
                          className="min-h-[44px] inline-flex items-center gap-1.5 font-mono text-xs font-semibold px-4 py-2.5 rounded-full border border-accent/40 bg-accent/10 hover:bg-accent/20 text-accent transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                        >
                          <span>Case Study</span>
                          <ArrowUpRight size={14} />
                        </MagneticButton>
                      </div>
                    </div>

                    {/* Right Column: Visual Preview with Lazy Loading OR Interactive Simulation Stage */}
                    <ScrollReveal
                      direction="left"
                      distance={24}
                      delay={0.14}
                      className="lg:col-span-6 space-y-3"
                    >
                      {/* View Mode Switcher */}
                      <div className="flex items-center justify-between pb-1 border-b border-border/60">
                        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                          {projectViewMode[project.id] === "sim"
                            ? "Interactive Simulation"
                            : "Lazy Image Preview"}
                        </span>
                        <div className="flex items-center gap-1 font-mono text-xs">
                          <button
                            type="button"
                            onClick={() =>
                              setProjectViewMode((prev) => ({
                                ...prev,
                                [project.id]: "image" as const,
                              }))
                            }
                            className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-all ${
                              projectViewMode[project.id] !== "sim"
                                ? "border-primary bg-primary text-primary-foreground shadow-xs"
                                : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            Visual Preview
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setProjectViewMode((prev) => ({
                                ...prev,
                                [project.id]: "sim" as const,
                              }))
                            }
                            className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-all ${
                              projectViewMode[project.id] === "sim"
                                ? "border-primary bg-primary text-primary-foreground shadow-xs"
                                : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            Live Simulation
                          </button>
                        </div>
                      </div>

                      {projectViewMode[project.id] === "sim" ? (
                        isJarvis ? (
                          <JarvisTechnicalArt />
                        ) : isStream ? (
                          <OnlineStreamTechnicalArt />
                        ) : isDecode ? (
                          <DecodeLabsTechnicalArt />
                        ) : (
                          <div className="rounded-2xl border border-border bg-surface p-8 space-y-4 font-mono text-xs text-foreground">
                            <div className="text-primary font-semibold uppercase">
                              TECHNICAL SPECIFICATION
                            </div>
                            <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                              {project.positioning || project.overview}
                            </p>
                          </div>
                        )
                      ) : (
                        <div className="group/preview rounded-2xl border border-border overflow-hidden bg-surface shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/40">
                          <LazyProjectImage
                            src={getProjectImageUrl(project.name)}
                            alt={`${project.displayName || project.name} system architecture`}
                            containerClassName="aspect-[16/10] w-full"
                            className="group-hover/preview:scale-[1.02]"
                          />
                        </div>
                      )}
                    </ScrollReveal>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          DETAILED ARCHITECTURAL CASE STUDY MODAL (DOSSIER)
          ===================================================================== */}
      <AnimatePresence>
        {activeDossier && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDossier(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="relative w-full max-w-3xl rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-2xl overflow-hidden z-10 space-y-6 max-h-[90vh] overflow-y-auto text-foreground"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                <div>
                  <div className="font-mono text-xs text-primary font-semibold uppercase tracking-wider">
                    ARCHITECTURAL CASE STUDY // {activeDossier.category}
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-foreground mt-1">
                    {activeDossier.displayName || activeDossier.name}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveDossier(null)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border bg-secondary/60 text-foreground hover:bg-secondary transition-all cursor-pointer"
                  aria-label="Close Case Study"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Dossier Image Banner with Lazy Loading & Blur-Up */}
              <div className="rounded-2xl border border-border overflow-hidden bg-surface shadow-sm">
                <LazyProjectImage
                  src={getProjectImageUrl(activeDossier.name)}
                  alt={`${activeDossier.displayName || activeDossier.name} Architecture Preview`}
                  containerClassName="aspect-[16/8] w-full"
                />
              </div>

              {/* Dossier Content */}
              <div className="space-y-6 font-sans text-sm text-foreground/90">
                <div className="space-y-2">
                  <div className="font-mono text-xs text-accent font-semibold uppercase">
                    System Overview
                  </div>
                  <p className="leading-relaxed font-light text-base text-muted-foreground">
                    {activeDossier.enhancedOverview || activeDossier.overview}
                  </p>
                </div>

                {activeDossier.engineering && (
                  <div className="space-y-2 rounded-2xl border border-primary/25 bg-primary/5 p-5">
                    <div className="font-mono text-xs text-primary font-semibold uppercase">
                      Engineering Highlight
                    </div>
                    <p className="text-foreground/90 leading-relaxed">
                      {activeDossier.engineering}
                    </p>
                  </div>
                )}

                {activeDossier.architecture && (
                  <div className="space-y-2">
                    <div className="font-mono text-xs text-accent font-semibold uppercase">
                      Software Architecture
                    </div>
                    <p className="leading-relaxed text-muted-foreground">
                      {activeDossier.architecture}
                    </p>
                  </div>
                )}

                {activeDossier.challenges && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 rounded-xl border border-border bg-surface p-4">
                      <div className="font-mono text-xs text-primary uppercase">
                        Technical Challenge
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {activeDossier.challenges}
                      </p>
                    </div>

                    <div className="space-y-1.5 rounded-xl border border-border bg-surface p-4">
                      <div className="font-mono text-xs text-accent uppercase">
                        Applied Solution
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {activeDossier.solutions || "Implemented defensive architecture."}
                      </p>
                    </div>
                  </div>
                )}

                {/* External Links */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                  {activeDossier.githubUrl && (
                    <a
                      href={activeDossier.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface hover:border-primary px-4 py-2 font-mono text-xs text-foreground transition-colors"
                    >
                      <Github size={14} />
                      <span>View GitHub Repository</span>
                    </a>
                  )}
                  {activeDossier.demoUrl && (
                    <a
                      href={activeDossier.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary/90 px-4 py-2 font-mono text-xs font-bold text-primary-foreground shadow-md transition-colors"
                    >
                      <ExternalLink size={14} />
                      <span>Launch Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
