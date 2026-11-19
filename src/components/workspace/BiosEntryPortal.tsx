import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Terminal as TerminalIcon,
  Layers,
  ArrowRight,
  Volume2,
  VolumeX,
  Compass,
  Cpu,
  Palette,
  Code2,
  CheckCircle2,
  Monitor,
} from "lucide-react";
import { useWorkspace } from "@/context/WorkspaceContext";
import { ThemeToggle } from "@/components/portfolio/ThemeToggle";
import { workspaceSound } from "@/lib/workspace-audio";

export function BiosEntryPortal() {
  const { enterCreative, enterTechnical, enterWorkspace, exploreFull, audioEnabled, toggleAudio } =
    useWorkspace();
  const [hoveredPortal, setHoveredPortal] = useState<"creative" | "technical" | null>(null);
  const [uptimeSeconds, setUptimeSeconds] = useState(0);

  // Uptime ticker for BIOS realism
  useEffect(() => {
    const interval = setInterval(() => {
      setUptimeSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut: 1=Creative, 2=Technical, 3=3D Workspace, Space/Enter=Full Experience
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "1") {
        enterCreative();
      } else if (e.key === "2") {
        enterTechnical();
      } else if (e.key === "3") {
        enterWorkspace();
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        exploreFull();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enterCreative, enterTechnical, enterWorkspace, exploreFull]);

  const formatUptime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div
      aria-label="BIOS Workspace Entry Portal"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-background text-foreground flex flex-col justify-between select-none"
    >
      {/* Background Ambient Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Cybernetic Accent Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-[120px] transition-opacity duration-700"
        style={{ opacity: hoveredPortal === "creative" ? 0.35 : 0.15 }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-accent/10 blur-[120px] transition-opacity duration-700"
        style={{ opacity: hoveredPortal === "technical" ? 0.35 : 0.15 }}
      />

      {/* =====================================================================
          1. BIOS TELEMETRY HEADER
          ===================================================================== */}
      <header className="relative z-20 w-full border-b border-border/80 bg-background/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        {/* Left: System Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="font-bold tracking-wider text-foreground">BIOS v2.6.0</span>
          </div>
          <span className="text-muted-foreground/40 hidden sm:inline">|</span>
          <span className="text-muted-foreground text-[11px] hidden sm:inline">
            CORE: <strong className="text-foreground">PRINCE CHAUHAN</strong>
          </span>
          <span className="text-muted-foreground/40 hidden md:inline">|</span>
          <span className="text-primary text-[11px] hidden md:inline">
            STATUS:{" "}
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              OPEN TO INTERNSHIPS
            </span>
          </span>
        </div>

        {/* Center: Live Uptime & Tagline */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="uppercase tracking-widest text-[10px] text-primary font-semibold">
            WORKSPACE PROTOCOL
          </span>
          <span>•</span>
          <span>BUILDING APPS. EXPLORING POSSIBILITIES.</span>
          <span>•</span>
          <span className="tabular-nums">UPTIME: {formatUptime(uptimeSeconds)}</span>
        </div>

        {/* Right: Audio Control & Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleAudio}
            className={`min-h-[38px] px-3 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
              audioEnabled
                ? "border-primary/50 bg-primary/10 text-primary font-medium"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
            title={
              audioEnabled
                ? "Audio Effects Enabled (Click to Mute)"
                : "Audio Muted (Click to Enable Clicks)"
            }
            aria-label={audioEnabled ? "Disable audio clicks" : "Enable cybernetic audio clicks"}
          >
            {audioEnabled ? (
              <Volume2 size={14} className="text-primary animate-pulse" />
            ) : (
              <VolumeX size={14} />
            )}
            <span className="text-[11px] uppercase tracking-wider">
              {audioEnabled ? "AUDIO ON" : "MUTED"}
            </span>
          </button>

          <ThemeToggle />
        </div>
      </header>

      {/* =====================================================================
          2. CORE TITLE STRIP (INSIDE MY WORKSPACE // TWO WORLDS. ONE CREATOR)
          ===================================================================== */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 text-center space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 font-mono text-[11px] text-muted-foreground shadow-xs">
          <Layers size={13} className="text-primary" />
          <span className="uppercase tracking-widest text-[10px] text-foreground font-semibold">
            INSIDE MY WORKSPACE
          </span>
          <span className="text-border">•</span>
          <span className="text-primary font-medium">TWO WORLDS. ONE CREATOR.</span>
        </div>

        <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl tracking-[-0.04em] text-foreground">
          Choose Your Perspective.
        </h1>
        <p className="font-sans text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto font-light">
          Step into either dimension to inspect specialized artifacts, or launch the complete
          unified continuum.
        </p>
      </div>

      {/* =====================================================================
          3. SPLIT-SCREEN DUAL GATEWAY PANELS
          ===================================================================== */}
      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 items-stretch">
          {/* =================================================================
              GATEWAY 1: CREATIVE WORLD
              ================================================================= */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => {
              setHoveredPortal("creative");
              workspaceSound.portalHover(audioEnabled, 520);
            }}
            onMouseLeave={() => setHoveredPortal(null)}
            className={`group relative rounded-2xl border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-md ${
              hoveredPortal === "creative"
                ? "border-primary bg-card/95 shadow-xl shadow-primary/10 dark:liquid-glass-glow"
                : "border-border bg-card/80 dark:bg-card/40 backdrop-blur-md"
            }`}
          >
            {/* Corner Bracket Details */}
            <div className="absolute top-3 left-3 font-mono text-[10px] text-muted-foreground/60 select-none">
              [CR_01]
            </div>
            <div className="absolute top-3 right-3 font-mono text-[10px] text-primary/80 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span>GATEWAY 01</span>
            </div>

            <div className="space-y-4 pt-2">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-105 transition-transform">
                <Palette size={22} />
              </div>

              <div className="space-y-1.5">
                <div className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
                  AESTHETICS • USER EXPERIENCE • INTERFACE CRAFT
                </div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
                  Creative World
                </h2>
                <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Ideas, imagination, visual systems, UI/UX and product thinking.
                </p>
              </div>

              {/* Specimen Highlights */}
              <div className="grid grid-cols-2 gap-2 pt-2 font-mono text-[11px]">
                <div className="p-2.5 rounded-lg border border-border bg-secondary/30">
                  <div className="text-[10px] text-muted-foreground uppercase">Design System</div>
                  <div className="font-semibold text-foreground text-xs mt-0.5">Arctic Minimal</div>
                </div>
                <div className="p-2.5 rounded-lg border border-border bg-secondary/30">
                  <div className="text-[10px] text-muted-foreground uppercase">Philosophy</div>
                  <div className="font-semibold text-foreground text-xs mt-0.5">
                    Clarity &amp; Motion
                  </div>
                </div>
                <div className="p-2.5 rounded-lg border border-border bg-secondary/30">
                  <div className="text-[10px] text-muted-foreground uppercase">Core Focus</div>
                  <div className="font-semibold text-foreground text-xs mt-0.5">
                    Responsive Apps
                  </div>
                </div>
                <div className="p-2.5 rounded-lg border border-border bg-secondary/30">
                  <div className="text-[10px] text-muted-foreground uppercase">Visual Standard</div>
                  <div className="font-semibold text-foreground text-xs mt-0.5">Google Stitch</div>
                </div>
              </div>
            </div>

            {/* Launch Action */}
            <div className="pt-6">
              <button
                type="button"
                onClick={enterCreative}
                className="w-full min-h-[46px] rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white font-mono text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_24px_rgba(37,99,235,0.4)] cursor-pointer active:scale-98 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                <span>ENTER CREATIVE WORLD</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="text-center font-mono text-[10px] text-muted-foreground mt-2 hidden sm:block">
                Press{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-secondary text-foreground border border-border font-bold">
                  1
                </kbd>{" "}
                to launch
              </div>
            </div>
          </motion.div>

          {/* =================================================================
              GATEWAY 2: TECHNICAL WORLD
              ================================================================= */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => {
              setHoveredPortal("technical");
              workspaceSound.portalHover(audioEnabled, 680);
            }}
            onMouseLeave={() => setHoveredPortal(null)}
            className={`group relative rounded-2xl border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-md ${
              hoveredPortal === "technical"
                ? "border-accent bg-card/95 shadow-xl shadow-accent/10 dark:liquid-glass-glow"
                : "border-border bg-card/80 dark:bg-card/40 backdrop-blur-md"
            }`}
          >
            {/* Corner Bracket Details */}
            <div className="absolute top-3 left-3 font-mono text-[10px] text-muted-foreground/60 select-none">
              [TECH_02]
            </div>
            <div className="absolute top-3 right-3 font-mono text-[10px] text-accent/80 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              <span>GATEWAY 02</span>
            </div>

            <div className="space-y-4 pt-2">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent border border-accent/20 group-hover:scale-105 transition-transform">
                <Code2 size={22} />
              </div>

              <div className="space-y-1.5">
                <div className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                  PYTHON • AI / ML • APPLICATION ENGINEERING
                </div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
                  Technical World
                </h2>
                <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Programming, engineering, Python, AI/ML and application development.
                </p>
              </div>

              {/* Specimen Highlights */}
              <div className="grid grid-cols-2 gap-2 pt-2 font-mono text-[11px]">
                <div className="p-2.5 rounded-lg border border-border bg-secondary/30">
                  <div className="text-[10px] text-muted-foreground uppercase">
                    Voice Intelligence
                  </div>
                  <div className="font-semibold text-foreground text-xs mt-0.5">JARVIS Engine</div>
                </div>
                <div className="p-2.5 rounded-lg border border-border bg-secondary/30">
                  <div className="text-[10px] text-muted-foreground uppercase">
                    Hackathon Project
                  </div>
                  <div className="font-semibold text-foreground text-xs mt-0.5">GRIDSHIELD AI</div>
                </div>
                <div className="p-2.5 rounded-lg border border-border bg-secondary/30">
                  <div className="text-[10px] text-muted-foreground uppercase">
                    Full-Stack Media
                  </div>
                  <div className="font-semibold text-foreground text-xs mt-0.5">OnlineStream</div>
                </div>
                <div className="p-2.5 rounded-lg border border-border bg-secondary/30">
                  <div className="text-[10px] text-muted-foreground uppercase">
                    Academic Baseline
                  </div>
                  <div className="font-semibold text-foreground text-xs mt-0.5">
                    B.Tech CSE (AI/ML)
                  </div>
                </div>
              </div>
            </div>

            {/* Launch Action */}
            <div className="pt-6">
              <button
                type="button"
                onClick={enterTechnical}
                className="w-full min-h-[46px] rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-mono text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_24px_rgba(14,165,233,0.4)] cursor-pointer active:scale-98 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              >
                <span>ENTER TECHNICAL WORLD</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="text-center font-mono text-[10px] text-muted-foreground mt-2 hidden sm:block">
                Press{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-secondary text-foreground border border-border font-bold">
                  2
                </kbd>{" "}
                to launch
              </div>
            </div>
          </motion.div>
        </div>

        {/* =====================================================================
            4. CENTER OVERLAP / NEXUS: 3D WORKSPACE & EXPLORE FULL EXPERIENCE
            ===================================================================== */}
        <div className="mt-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 sm:w-24 bg-border" />
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              CONVERGENCE NEXUS // 3D WORKSPACE & CONTINUUM
            </span>
            <div className="h-px w-16 sm:w-24 bg-border" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {/* Direct 3D Holographic Workspace Launch */}
            <button
              type="button"
              onClick={enterWorkspace}
              className="inline-flex items-center gap-2.5 min-h-[48px] px-6 sm:px-8 py-3 rounded-full border-2 border-cyan-600/40 dark:border-cyan-500/50 bg-cyan-50/90 dark:bg-cyan-950/30 hover:bg-cyan-100 dark:hover:bg-cyan-950/60 hover:border-cyan-500 dark:hover:border-cyan-400 text-cyan-800 dark:text-cyan-300 font-mono text-xs font-bold transition-all shadow-lg shadow-cyan-500/10 hover:scale-102 cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none"
            >
              <Monitor size={16} className="text-cyan-700 dark:text-cyan-400" />
              <span>ENTER 3D HOLOGRAPHIC WORKSPACE</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-600/15 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-600/30 dark:border-cyan-400/30 hidden sm:inline">
                PRESS 3
              </span>
            </button>

            {/* Explore Full Experience */}
            <button
              type="button"
              onClick={exploreFull}
              className="inline-flex items-center gap-2.5 min-h-[48px] px-6 sm:px-8 py-3 rounded-full border-2 border-primary/40 bg-card hover:bg-secondary/60 hover:border-primary text-foreground font-mono text-xs font-bold transition-all shadow-md hover:scale-102 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <Compass
                size={16}
                className="text-primary animate-spin"
                style={{ animationDuration: "12s" }}
              />
              <span>EXPLORE FULL EXPERIENCE</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 hidden sm:inline">
                CONTINUOUS SCROLL
              </span>
            </button>
          </div>

          <p className="font-mono text-[11px] text-muted-foreground hidden sm:block">
            Keyboard shortcuts:{" "}
            <kbd className="px-1.5 py-0.5 rounded bg-secondary text-foreground border border-border font-bold">
              1
            </kbd>{" "}
            Creative •{" "}
            <kbd className="px-1.5 py-0.5 rounded bg-secondary text-foreground border border-border font-bold">
              2
            </kbd>{" "}
            Technical •{" "}
            <kbd className="px-1.5 py-0.5 rounded bg-secondary text-foreground border border-border font-bold">
              3
            </kbd>{" "}
            3D Workspace •{" "}
            <kbd className="px-1.5 py-0.5 rounded bg-secondary text-foreground border border-border font-bold">
              SPACE
            </kbd>{" "}
            Full Continuum
          </p>
        </div>
      </main>

      {/* =====================================================================
          5. BIOS FOOTER TELEMETRY STRIP
          ===================================================================== */}
      <footer className="relative z-20 w-full border-t border-border/80 bg-background/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>HOST: ps06222005-oss</span>
          <span>•</span>
          <span>GH REPOS: 6 VERIFIED</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">HW: AMD/8GB COMPLIANT</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-foreground">
            <CheckCircle2 size={12} className="text-emerald-500" />
            <span>ZERO ARBITRARY METRICS</span>
          </span>
          <span>•</span>
          <span>STITCH BLUE SPECIFICATION</span>
        </div>
      </footer>
    </div>
  );
}
