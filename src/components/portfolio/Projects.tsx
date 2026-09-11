import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  ArrowUpRight,
  X,
  Radio,
  GitBranch,
  Volume2,
  Sparkles,
  Terminal,
  Activity,
  Cpu,
} from "lucide-react";
import { fetchGithubEcosystem, type GithubEcosystemData } from "@/services/github";
import type { EngineeringProject } from "@/types/portfolio";
import { FALLBACK_PROJECTS } from "@/data/projects";
import { MagneticButton } from "./MagneticButton";

/**
 * ============================================================================
 * TECHNICAL ART VISUALIZATION 01: JARVIS NEURAL ACOUSTIC INTENT LATTICE
 * ============================================================================
 * An artistic generative canvas combining multi-harmonic acoustic waves,
 * orbiting particle vortices, and ambient noise calibration thresholds.
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
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
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
      ctx.strokeStyle = "rgba(139, 92, 246, 0.22)";
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
            ? "rgba(167, 139, 250, 0.5)"
            : r === 1
              ? "rgba(139, 92, 246, 0.3)"
              : "rgba(56, 189, 248, 0.2)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // 4. Orbiting Particle Vortex
      particles.forEach((p) => {
        p.angle += p.speed * pulseIntensity.current;
        const px = cx + Math.cos(p.angle) * p.radius * pulseIntensity.current;
        const py = cy + Math.sin(p.angle) * p.radius * 0.65 * pulseIntensity.current;

        ctx.fillStyle = `rgba(167, 139, 250, ${p.alpha * (isDispatched ? 1.5 : 0.8)})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 5. Multi-harmonic Voice Waveforms
      const ampMultiplier = isDispatched ? 2.2 : 1;
      const waves = [
        { color: "rgba(167, 139, 250, 0.85)", freq: 0.014, amp: 28 * ampMultiplier, speed: 1.3 },
        { color: "rgba(139, 92, 246, 0.55)", freq: 0.022, amp: 18 * ampMultiplier, speed: 0.9 },
        { color: "rgba(56, 189, 248, 0.4)", freq: 0.009, amp: 14 * ampMultiplier, speed: 1.6 },
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
    <div className="relative rounded-2xl border border-white/[0.08] bg-[#090b12] p-5 sm:p-6 overflow-hidden space-y-4 shadow-xl">
      {/* Visual Header */}
      <div className="flex items-center justify-between font-mono text-[10px] text-white/50 border-b border-white/[0.06] pb-3">
        <div className="flex items-center gap-2 text-violet-400 font-semibold">
          <Activity size={13} className="animate-pulse" />
          <span>ACOUSTIC INTENT LATTICE // TECHNICAL ART</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>OFFLINE DISPATCH READY</span>
        </div>
      </div>

      {/* Main Generative Canvas */}
      <div className="relative h-56 sm:h-64 w-full rounded-xl bg-[#06070a] border border-white/[0.05] overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

        {/* Live Intent Overlay Tag */}
        <div className="absolute top-3 left-3 font-mono text-[10px] px-2.5 py-1 rounded-md bg-[#090b12]/90 border border-white/[0.1] text-violet-300 backdrop-blur-md flex items-center gap-1.5">
          <Terminal size={11} className="text-violet-400" />
          <span>INTENT: {activeCommand}</span>
        </div>

        <div className="absolute bottom-3 right-3 font-mono text-[9px] text-white/40 tracking-wider">
          PYTTSX3 // CONTINUOUS ACOUSTIC THREAD
        </div>
      </div>

      {/* Interactive Command Triggers */}
      <div className="space-y-2 pt-1 font-mono text-xs">
        <div className="text-white/40 text-[10px] uppercase tracking-wider flex items-center justify-between">
          <span>Trigger Voice Intent Pipeline:</span>
          {isDispatched && <span className="text-violet-400 animate-pulse">Dispatching...</span>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
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
              className="px-3 py-2 rounded-lg border border-white/[0.08] bg-white/[0.02] hover:bg-violet-500/10 hover:border-violet-500/30 text-white/70 hover:text-white transition-all text-left text-[11px] truncate cursor-pointer disabled:opacity-50"
            >
              <div className="text-[9px] text-violet-400 uppercase font-bold">0{idx + 1}</div>
              <div className="truncate">{item.label}</div>
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
 * Generative representation of globally distributed edge streaming nodes,
 * packet flow velocity tubes, and zero-layout-shift aspect ratio containment.
 */
function OnlineStreamTechnicalArt() {
  const [streamingRate, setStreamingRate] = useState(24.8);

  useEffect(() => {
    const timer = setInterval(() => {
      setStreamingRate((prev) => {
        const delta = (Math.random() - 0.5) * 1.8;
        return Number(Math.max(21.4, Math.min(29.6, prev + delta)).toFixed(1));
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative rounded-2xl border border-white/[0.08] bg-[#090b12] p-5 sm:p-6 overflow-hidden space-y-4 shadow-xl">
      <div className="flex items-center justify-between font-mono text-[10px] text-white/50 border-b border-white/[0.06] pb-3">
        <div className="flex items-center gap-2 text-sky-400 font-semibold">
          <Radio size={13} className="animate-pulse" />
          <span>EDGE LATENCY MATRIX // STREAM ARCHITECTURE</span>
        </div>
        <div className="text-emerald-400 font-medium">STATUS: 200 OK · 16ms</div>
      </div>

      <div className="relative h-56 sm:h-64 w-full rounded-xl bg-[#06070a] border border-white/[0.05] p-5 flex flex-col justify-between overflow-hidden">
        {/* Subtle Background Node Arcs */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full border border-sky-400/40 animate-ping" />
          <div className="absolute bottom-1/4 right-1/4 h-24 w-24 rounded-full border border-violet-400/40" />
        </div>

        {/* Global Node Points */}
        <div className="relative z-10 grid grid-cols-4 gap-2 text-center font-mono text-[10px]">
          {[
            { city: "DEL", region: "Delhi NCR", lat: "14ms" },
            { city: "BOM", region: "Mumbai", lat: "22ms" },
            { city: "SIN", region: "Singapore", lat: "45ms" },
            { city: "FRA", region: "Frankfurt", lat: "110ms" },
          ].map((node) => (
            <div
              key={node.city}
              className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.06]"
            >
              <div className="text-white/40 text-[9px]">{node.city}</div>
              <div className="font-bold text-white text-xs">{node.lat}</div>
              <div className="text-[8px] text-sky-300 truncate">{node.region}</div>
            </div>
          ))}
        </div>

        {/* Dynamic Velocity Tube */}
        <div className="relative z-10 space-y-1.5 font-mono">
          <div className="flex justify-between text-[11px] text-white/80">
            <span>EDGE BUFFER THROUGHPUT</span>
            <span className="text-violet-300 font-bold">{streamingRate} MB/s</span>
          </div>
          <div className="h-2 w-full rounded-full bg-white/[0.08] overflow-hidden p-0.5">
            <motion.div
              animate={{ width: ["68%", "86%", "75%", "92%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-violet-500 via-sky-400 to-emerald-400 rounded-full"
            />
          </div>
        </div>

        {/* Architecture Spec Footer */}
        <div className="relative z-10 font-mono text-[10px] text-white/50 flex items-center justify-between border-t border-white/[0.06] pt-2">
          <span>CONTAINER: 16:9 FIXED RATIO</span>
          <span className="text-emerald-400 font-semibold">CLS SCORE: 0.00 (ZERO)</span>
        </div>
      </div>

      <div className="font-mono text-xs text-white/70 leading-relaxed">
        <span className="text-violet-400 font-semibold text-[11px] uppercase">
          Zero-Shift Assurance:{" "}
        </span>
        Rigid aspect-ratio enforcement preventing browser reflow during high-definition video packet
        buffering.
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
    <div className="relative rounded-2xl border border-white/[0.08] bg-[#090b12] p-5 sm:p-6 overflow-hidden space-y-4 shadow-xl">
      <div className="flex items-center justify-between font-mono text-[10px] text-white/50 border-b border-white/[0.06] pb-3">
        <div className="flex items-center gap-2 text-violet-400 font-semibold">
          <GitBranch size={13} />
          <span>COMPUTATION LATTICE // DECODELABS INTERNSHIP</span>
        </div>
        <div className="text-white/40">PYTHON MODULES</div>
      </div>

      <div className="relative h-56 sm:h-64 w-full rounded-xl bg-[#06070a] border border-white/[0.05] p-5 flex flex-col justify-between">
        <div className="font-mono text-[10px] text-white/50">
          SELECT ASYMPTOTIC COMPLEXITY BOUND:
        </div>

        {/* Visual Graph Nodes */}
        <div className="relative my-auto flex items-center justify-around py-2">
          {complexities.map((comp, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedComplexity(comp.name)}
              className={`flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                selectedComplexity === comp.name
                  ? "scale-105 text-violet-200 font-bold"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              <div
                className={`h-10 w-10 rounded-full border flex items-center justify-center font-mono text-xs transition-colors ${
                  selectedComplexity === comp.name
                    ? "border-violet-400 bg-violet-500/25 text-violet-100 shadow-[0_0_18px_rgba(139,92,246,0.45)]"
                    : "border-white/10 bg-white/[0.02] text-white/60"
                }`}
              >
                {idx + 1}
              </div>
              <span className="font-mono text-[11px]">{comp.name}</span>
            </button>
          ))}
        </div>

        <div className="font-mono text-[10px] text-white/60 flex items-center justify-between border-t border-white/[0.06] pt-2">
          <span>BOUND: {selectedComplexity}</span>
          <span className="text-violet-300 font-semibold">
            {complexities.find((c) => c.name === selectedComplexity)?.label} Class
          </span>
        </div>
      </div>

      <div className="font-mono text-xs text-white/70 leading-relaxed">
        <span className="text-violet-400 font-semibold text-[11px] uppercase">
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
 * MAIN PROJECTS COMPONENT: EDITORIAL CASE STUDIES
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
    totalRepos: 18,
    activeSince: "2024",
    lastPushed: null,
  });

  const [activeDossier, setActiveDossier] = useState<EngineeringProject | null>(null);

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
      className="relative w-full overflow-hidden bg-[#08090c] py-24 sm:py-36 border-t border-white/[0.08]"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
        {/* =====================================================================
            EDITORIAL SECTION HEADER
            ===================================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="font-mono text-xs text-violet-400 tracking-widest uppercase">
              SELECTED SYSTEMS &amp; EDITORIAL CASE STUDIES
            </div>

            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-[-0.035em] text-white">
              Living Codebases. <br />
              <span className="text-gradient-chrome font-black">Architectural Intent.</span>
            </h2>

            <p className="font-serif italic text-lg sm:text-xl text-white/70 leading-relaxed font-normal">
              A curated catalog of software systems, designed as rigorous engineering case studies
              with interactive technical art stages and open GitHub repositories.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-white/50 bg-white/[0.02] border border-white/[0.06] px-4 py-2 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span>AUTHENTIC GITHUB EVIDENCE</span>
          </div>
        </div>

        {/* =====================================================================
            CASE STUDY CHAPTERS (ELEGANTLY ELEVATING HOVER INTERACTION)
            ===================================================================== */}
        <div className="space-y-20 sm:space-y-28">
          {canonicalProjects.map((project, idx) => {
            const isJarvis = project.name.toLowerCase().includes("jarvis");
            const isStream = project.name.toLowerCase().includes("stream");
            const isDecode = project.name.toLowerCase().includes("decode");
            const chapterNum = String(idx + 1).padStart(2, "0");

            // Curated editorial thesis statements for each canonical project
            const thesisStatement = isJarvis
              ? "Engineering deterministic offline acoustic dispatch and zero-cloud desktop agency."
              : isStream
                ? "Architecting zero-layout-shift video delivery over global edge distributions."
                : isDecode
                  ? "Designing optimal algorithmic abstractions and asymptotic runtime safety in Python."
                  : "Synthesizing spatial aesthetics, high-performance WebGL, and verified technical provenance.";

            return (
              <motion.article
                key={project.id}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="group relative rounded-3xl border border-white/[0.08] bg-[#0c0e15]/70 p-6 sm:p-10 transition-all duration-500 hover:border-violet-500/40 hover:bg-[#0e1019]/90 hover:shadow-[0_24px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(139,92,246,0.14)]"
              >
                {/* Subtle top edge luminous streak on hover */}
                <div className="absolute top-0 inset-x-12 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Chapter Meta Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-6 font-mono text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-violet-400">
                      CHAPTER {chapterNum}
                    </span>
                    <span className="text-white/20">/</span>
                    <span className="text-white/60 uppercase tracking-widest text-[11px]">
                      {project.category}
                    </span>
                    <span className="text-white/20">/</span>
                    <span className="text-violet-300 text-[11px]">
                      {project.primaryLanguage || "Python / TypeScript"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-white/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                    <span>CANONICAL REPOSITORY</span>
                  </div>
                </div>

                {/* 2-Column Editorial Case Study Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pt-8 items-start">
                  {/* Left Column: Narrative Thesis & Decisions */}
                  <div className="lg:col-span-6 space-y-6">
                    <div className="space-y-3">
                      <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight text-white group-hover:text-violet-100 transition-colors">
                        {project.displayName || project.name}
                      </h3>

                      {/* Editorial Serif Thesis Quote */}
                      <blockquote className="font-serif italic text-base sm:text-lg text-violet-200/90 border-l-2 border-violet-500/40 pl-4 py-0.5">
                        &ldquo;{thesisStatement}&rdquo;
                      </blockquote>
                    </div>

                    <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed font-light">
                      {project.positioning || project.overview}
                    </p>

                    {/* Architectural Specifications */}
                    {project.features && project.features.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                        <div className="font-mono text-[11px] text-violet-400 font-semibold uppercase tracking-wider">
                          CORE TECHNICAL SPECIFICATIONS
                        </div>
                        <div className="space-y-1.5">
                          {project.features.slice(0, 3).map((feat, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2.5 font-sans text-xs sm:text-sm text-white/70"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 mt-2 shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technology Stack Badges */}
                    <div className="space-y-2 pt-1">
                      <div className="font-mono text-[10px] text-white/40 uppercase tracking-wider">
                        STACK DEPLOYMENT
                      </div>
                      <div className="flex flex-wrap gap-2 font-mono text-xs">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-white/80 text-[11px]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Row with Tactile Magnetic Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.06]">
                      {project.githubUrl && (
                        <MagneticButton
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Inspect Source Code on GitHub"
                          className="inline-flex items-center gap-2 font-mono text-xs font-semibold px-4 py-2.5 rounded-full border border-white/[0.15] bg-[#11131c] text-white hover:border-violet-400 hover:text-white transition-all shadow-sm cursor-pointer"
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
                          className="inline-flex items-center gap-2 font-mono text-xs font-bold px-4 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] cursor-pointer"
                        >
                          <ExternalLink size={14} />
                          <span>Live Demo ↗</span>
                        </MagneticButton>
                      )}

                      <MagneticButton
                        onClick={() => setActiveDossier(project)}
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold px-4 py-2.5 rounded-full border border-violet-500/35 bg-violet-500/[0.08] hover:bg-violet-500/18 text-violet-300 transition-all cursor-pointer"
                      >
                        <span>Case Study</span>
                        <ArrowUpRight size={14} />
                      </MagneticButton>
                    </div>
                  </div>

                  {/* Right Column: Technical Art Visualization Stage */}
                  <div className="lg:col-span-6">
                    {isJarvis ? (
                      <JarvisTechnicalArt />
                    ) : isStream ? (
                      <OnlineStreamTechnicalArt />
                    ) : isDecode ? (
                      <DecodeLabsTechnicalArt />
                    ) : (
                      <div className="rounded-2xl border border-white/[0.08] bg-[#090b12] p-8 space-y-4 font-mono text-xs">
                        <div className="text-violet-400 font-semibold uppercase">
                          TECHNICAL SPECIFICATION
                        </div>
                        <p className="text-white/70 font-sans text-sm leading-relaxed">
                          {project.positioning || project.overview}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
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
              className="relative w-full max-w-3xl rounded-3xl border border-white/[0.12] bg-[#0e1017] p-6 sm:p-10 shadow-2xl overflow-hidden z-10 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
                <div>
                  <div className="font-mono text-xs text-violet-400 font-semibold uppercase tracking-wider">
                    ARCHITECTURAL CASE STUDY // {activeDossier.category}
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mt-1">
                    {activeDossier.displayName || activeDossier.name}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveDossier(null)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/[0.1] bg-white/[0.05] text-white/70 hover:text-white hover:bg-white/[0.1] transition-all cursor-pointer"
                  aria-label="Close Case Study"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Dossier Content */}
              <div className="space-y-6 font-sans text-sm text-white/80">
                <div className="space-y-2">
                  <div className="font-mono text-xs text-violet-400 font-semibold uppercase">
                    System Overview
                  </div>
                  <p className="leading-relaxed font-light text-base">
                    {activeDossier.enhancedOverview || activeDossier.overview}
                  </p>
                </div>

                {activeDossier.engineering && (
                  <div className="space-y-2 rounded-2xl border border-violet-500/20 bg-violet-500/[0.04] p-5">
                    <div className="font-mono text-xs text-violet-300 font-semibold uppercase">
                      Engineering Highlight
                    </div>
                    <p className="text-white/85 leading-relaxed">{activeDossier.engineering}</p>
                  </div>
                )}

                {activeDossier.architecture && (
                  <div className="space-y-2">
                    <div className="font-mono text-xs text-violet-400 font-semibold uppercase">
                      Software Architecture
                    </div>
                    <p className="leading-relaxed text-white/70">{activeDossier.architecture}</p>
                  </div>
                )}

                {activeDossier.challenges && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 rounded-xl border border-white/[0.06] bg-white/[0.01] p-4">
                      <div className="font-mono text-xs text-white/50 uppercase">
                        Technical Challenge
                      </div>
                      <p className="text-xs text-white/70 leading-relaxed">
                        {activeDossier.challenges}
                      </p>
                    </div>

                    <div className="space-y-1.5 rounded-xl border border-white/[0.06] bg-white/[0.01] p-4">
                      <div className="font-mono text-xs text-white/50 uppercase">
                        Applied Solution
                      </div>
                      <p className="text-xs text-white/70 leading-relaxed">
                        {activeDossier.solutions || "Implemented defensive architecture."}
                      </p>
                    </div>
                  </div>
                )}

                {/* External Links */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-white/[0.08]">
                  {activeDossier.githubUrl && (
                    <a
                      href={activeDossier.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/[0.15] bg-[#141722] hover:bg-[#1b1e2c] px-4 py-2 font-mono text-xs text-white"
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
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 font-mono text-xs font-bold text-white"
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
