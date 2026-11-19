import { useState, useCallback, type MouseEvent } from "react";
import { motion } from "framer-motion";
import {
  Palette,
  ExternalLink,
  Code2,
  Compass,
  RotateCcw,
  Layout,
  Eye,
  Type,
  Monitor,
} from "lucide-react";
import { useWorkspace } from "@/context/WorkspaceContext";
import { Navbar } from "@/components/portfolio/Navbar";
import { Footer } from "@/components/portfolio/Footer";
import {
  ScrollReveal,
  StaggerRevealGroup,
  StaggerRevealItem,
} from "@/components/portfolio/ScrollReveal";

export function CreativeWorldView() {
  const { enterTechnical, enterWorkspace, exploreFull, resetToPortal } = useWorkspace();
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [activeLayer, setActiveLayer] = useState<"tokens" | "typography" | "layout">("tokens");

  const handleStageMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: Number((-ny * 12).toFixed(2)),
      ry: Number((nx * 14).toFixed(2)),
    });
  }, []);

  const handleStageLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0 });
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground select-none">
      <Navbar />

      {/* Hero Header for Creative World */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden border-b border-border">
        {/* Ambient Creative Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 h-96 w-full max-w-4xl rounded-full bg-primary/10 blur-[140px]"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left: Creative Narrative & Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <ScrollReveal direction="up" distance={20} className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 font-mono text-xs text-primary font-semibold">
                  <Palette size={13} />
                  <span>CREATIVE WORLD DEDICATED MODE</span>
                  <span className="text-border">•</span>
                  <span className="text-foreground">DIMENSION 01</span>
                </div>

                <h1 className="font-display font-bold text-4xl sm:text-6xl tracking-[-0.04em] text-foreground text-balance">
                  Ideas, Imagination &amp; <br />
                  <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 bg-clip-text text-transparent">
                    Visual Systems.
                  </span>
                </h1>

                <p className="font-sans text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                  Exploring the union of aesthetic sensibility, UI/UX architecture, and product
                  thinking. Every interface is designed for clarity, typography hierarchy, and
                  effortless responsive motion.
                </p>
              </ScrollReveal>

              {/* Quick World Switcher Bar */}
              <ScrollReveal direction="up" distance={15} delay={0.1}>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1 font-mono text-xs">
                  <button
                    type="button"
                    onClick={enterWorkspace}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-cyan-600/40 dark:border-cyan-500/40 bg-cyan-50/90 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-950/70 text-cyan-800 dark:text-cyan-300 font-semibold transition-all cursor-pointer shadow-sm"
                  >
                    <Monitor size={13} />
                    <span>3D Workspace</span>
                  </button>

                  <button
                    type="button"
                    onClick={enterTechnical}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-card hover:border-accent hover:text-accent text-foreground transition-all cursor-pointer shadow-sm"
                  >
                    <Code2 size={13} className="text-accent" />
                    <span>Switch to Technical →</span>
                  </button>

                  <button
                    type="button"
                    onClick={exploreFull}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary font-semibold transition-all cursor-pointer shadow-sm"
                  >
                    <Compass size={13} />
                    <span>Full Journey</span>
                  </button>

                  <button
                    type="button"
                    onClick={resetToPortal}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full border border-border bg-secondary/50 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                  >
                    <RotateCcw size={12} />
                    <span>Portal</span>
                  </button>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Lightweight Interactive 3D Creative Spatial Stage */}
            <div className="lg:col-span-5">
              <div
                onMouseMove={handleStageMove}
                onMouseLeave={handleStageLeave}
                style={{ perspective: "1100px" }}
                className="relative mx-auto w-full max-w-md rounded-2xl border border-border bg-card/80 dark:bg-card/50 p-5 sm:p-6 shadow-xl overflow-hidden"
              >
                {/* Layer selector tabs */}
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-border/70 font-mono text-[11px]">
                  <span className="text-primary font-semibold uppercase tracking-wider">
                    Spatial Design Stage
                  </span>
                  <div className="flex items-center gap-1">
                    {(["tokens", "typography", "layout"] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveLayer(tab)}
                        className={`px-2 py-1 rounded-md capitalize transition-colors cursor-pointer ${
                          activeLayer === tab
                            ? "bg-primary text-primary-foreground font-semibold"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interactive 3D Floating Cube + Orbital Rings + Animated Design Panels */}
                <div
                  style={{
                    transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                    transition: "transform 180ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  className="preserve-3d relative h-64 sm:h-72 w-full flex items-center justify-center my-2"
                >
                  {/* Orbital Holographic Ring */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute h-48 w-48 rounded-full border border-accent/40 shadow-[0_0_24px_rgba(14,165,233,0.2)] animate-orbit-slow"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute h-36 w-36 rounded-full border border-primary/35 animate-orbit-slow"
                    style={{ animationDirection: "reverse", animationDuration: "22s" }}
                  />

                  {/* Slowly Rotating 3D Glass Wireframe Cube */}
                  <div
                    aria-hidden="true"
                    className="preserve-3d relative h-24 w-24 animate-cube-spin"
                  >
                    {[
                      "translateZ(48px)",
                      "rotateY(180deg) translateZ(48px)",
                      "rotateY(90deg) translateZ(48px)",
                      "rotateY(-90deg) translateZ(48px)",
                      "rotateX(90deg) translateZ(48px)",
                      "rotateX(-90deg) translateZ(48px)",
                    ].map((faceTransform, idx) => (
                      <div
                        key={idx}
                        style={{ transform: faceTransform }}
                        className="absolute inset-0 rounded-xl border border-accent/55 bg-gradient-to-br from-primary/15 via-accent/10 to-transparent shadow-[inset_0_0_16px_rgba(14,165,233,0.22)]"
                      />
                    ))}
                  </div>

                  {/* Floating Holographic Design Panel (Top-Left) */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transform: "translateZ(42px)" }}
                    className="absolute top-3 left-2 rounded-xl border border-primary/30 bg-card/95 px-3 py-2 shadow-md font-mono text-[10px]"
                  >
                    <div className="text-primary font-semibold">PALETTE 5</div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#2563EB]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#0EA5E9]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#F8FAFC] border border-border" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#0F172A]" />
                    </div>
                  </motion.div>

                  {/* Floating Dynamic Spec Panel (Bottom-Right) */}
                  <motion.div
                    key={activeLayer}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ transform: "translateZ(52px)" }}
                    className="absolute bottom-2 right-2 rounded-xl border border-accent/35 bg-card/95 px-3.5 py-2.5 shadow-lg font-mono text-[10px] max-w-[195px]"
                  >
                    {activeLayer === "tokens" && (
                      <>
                        <div className="text-accent font-semibold">ARCTIC TOKENS</div>
                        <div className="text-foreground mt-0.5 font-sans text-[11px]">
                          Light #F8FAFC · Primary #2563EB
                        </div>
                      </>
                    )}
                    {activeLayer === "typography" && (
                      <>
                        <div className="text-accent font-semibold">TYPE HIERARCHY</div>
                        <div className="text-foreground mt-0.5 font-sans text-[11px]">
                          Space Grotesk + Inter
                        </div>
                      </>
                    )}
                    {activeLayer === "layout" && (
                      <>
                        <div className="text-accent font-semibold">SPATIAL RHYTHM</div>
                        <div className="text-foreground mt-0.5 font-sans text-[11px]">
                          Bento Grid · 60-30-10 Balance
                        </div>
                      </>
                    )}
                  </motion.div>
                </div>

                <div className="pt-2 border-t border-border/60 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                  <span>Move cursor to tilt 3D plane</span>
                  <span className="text-primary font-semibold">CSS 3D ACCELERATED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Design System Foundations (Arctic Minimal & Google Stitch) */}
      <section className="py-20 sm:py-28 border-b border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <ScrollReveal direction="up" distance={20} className="space-y-2 max-w-2xl">
            <div className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              FOUNDATION SPECIFICATION
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
              Arctic Minimal Design Language
            </h2>
            <p className="font-sans text-sm sm:text-base text-muted-foreground font-light">
              Built on strict mathematical tokens, zero visual slop, and Google Stitch design
              principles.
            </p>
          </ScrollReveal>

          {/* Design Token Swatches */}
          <StaggerRevealGroup
            staggerChildren={0.08}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs"
          >
            <StaggerRevealItem className="p-4 rounded-xl border border-border bg-card space-y-3 shadow-sm">
              <div className="h-10 w-full rounded-lg bg-[#F8FAFC] border border-slate-200" />
              <div>
                <div className="text-[10px] text-muted-foreground uppercase">Background</div>
                <div className="font-bold text-foreground">#F8FAFC</div>
                <div className="text-[10px] text-muted-foreground/80 mt-0.5">Arctic Canvas</div>
              </div>
            </StaggerRevealItem>

            <StaggerRevealItem className="p-4 rounded-xl border border-border bg-card space-y-3 shadow-sm">
              <div className="h-10 w-full rounded-lg bg-[#2563EB]" />
              <div>
                <div className="text-[10px] text-muted-foreground uppercase">Primary Blue</div>
                <div className="font-bold text-foreground">#2563EB</div>
                <div className="text-[10px] text-muted-foreground/80 mt-0.5">Interactive Key</div>
              </div>
            </StaggerRevealItem>

            <StaggerRevealItem className="p-4 rounded-xl border border-border bg-card space-y-3 shadow-sm">
              <div className="h-10 w-full rounded-lg bg-[#0EA5E9]" />
              <div>
                <div className="text-[10px] text-muted-foreground uppercase">Sky Cyan</div>
                <div className="font-bold text-foreground">#0EA5E9</div>
                <div className="text-[10px] text-muted-foreground/80 mt-0.5">Telemetry Accent</div>
              </div>
            </StaggerRevealItem>

            <StaggerRevealItem className="p-4 rounded-xl border border-border bg-card space-y-3 shadow-sm">
              <div className="h-10 w-full rounded-lg bg-[#0F172A]" />
              <div>
                <div className="text-[10px] text-muted-foreground uppercase">
                  Main Text / Dark Base
                </div>
                <div className="font-bold text-foreground">#0F172A</div>
                <div className="text-[10px] text-muted-foreground/80 mt-0.5">High Contrast</div>
              </div>
            </StaggerRevealItem>
          </StaggerRevealGroup>

          {/* Typography & Layout Rules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-border bg-card space-y-3 shadow-sm">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Type size={18} />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground">
                Space Grotesk + Inter
              </h3>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                Space Grotesk provides monumental, condensed structure for headings, while Inter
                delivers optical legibility for paragraphs, data ledgers, and body text.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-card space-y-3 shadow-sm">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
                <Layout size={18} />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground">
                Spatial Rhythm &amp; Bento
              </h3>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                Clean asymmetric bento dock geometry, crisp dividers (`#CBD5E1`), and soft 16px
                boundary shadows avoid clutter and maintain clear scanning corridors.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-card space-y-3 shadow-sm">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Eye size={18} />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground">
                Liquid Glass Dark Mode
              </h3>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                Translucent slate cards (`rgba(30, 41, 59, 0.75)`) with backdrop blur, inner
                specular highlights, and cyan edge illumination for a futuristic night state.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Creative UI/UX Artifacts */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <ScrollReveal direction="up" distance={20} className="space-y-2 max-w-2xl">
            <div className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              INTERFACE CRAFT
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
              User Experience &amp; Creative Artifacts
            </h2>
            <p className="font-sans text-sm sm:text-base text-muted-foreground font-light">
              Real projects embodying user-centered interface design, fluid media controls, and
              engaging gamification loops.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Artifact 1: OnlineStream */}
            <div className="group rounded-2xl border border-border bg-card overflow-hidden shadow-md hover:border-primary/50 transition-all flex flex-col justify-between">
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-primary font-semibold uppercase tracking-wider">
                    STREAMING INTERFACE
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground border border-border px-2 py-0.5 rounded-full">
                    LIVE ON VERCEL
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl text-foreground">
                  OnlineStream — Media Experience
                </h3>
                <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Engineered with TypeScript, React, and Tailwind CSS. Focuses on zero-layout-shift
                  responsive video playback, custom player controls, and dynamic catalog browsing
                  across mobile and desktop.
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-[11px]">
                  <span className="px-2.5 py-1 rounded-md bg-secondary text-foreground">
                    TypeScript
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-secondary text-foreground">React</span>
                  <span className="px-2.5 py-1 rounded-md bg-secondary text-foreground">
                    Tailwind CSS
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-secondary text-foreground">
                    Vercel Edge
                  </span>
                </div>
              </div>

              <div className="border-t border-border p-4 sm:px-8 bg-secondary/20 flex items-center justify-between">
                <a
                  href="https://onlinestream-three.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-primary font-semibold hover:underline"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink size={12} />
                </a>
                <a
                  href="https://github.com/ps06222005-oss/onlinestream"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Inspect Source ↗
                </a>
              </div>
            </div>

            {/* Artifact 2: GRIDSHIELD AI */}
            <div className="group rounded-2xl border border-border bg-card overflow-hidden shadow-md hover:border-accent/50 transition-all flex flex-col justify-between">
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-accent font-semibold uppercase tracking-wider">
                    HACKATHON GAMIFICATION
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground border border-border px-2 py-0.5 rounded-full">
                    SUSTAINABILITY
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl text-foreground">
                  GRIDSHIELD AI — Habit Platform
                </h3>
                <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Eco-friendly habit-tracking platform designed for a hackathon. Makes environmental
                  action actionable through interactive task verification, points, reward badges,
                  quizzes, and live leaderboards.
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-[11px]">
                  <span className="px-2.5 py-1 rounded-md bg-secondary text-foreground">
                    Mobile-First UX
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-secondary text-foreground">
                    Gamification
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-secondary text-foreground">React</span>
                  <span className="px-2.5 py-1 rounded-md bg-secondary text-foreground">
                    Tailwind
                  </span>
                </div>
              </div>

              <div className="border-t border-border p-4 sm:px-8 bg-secondary/20 flex items-center justify-between">
                <a
                  href="https://github.com/ps06222005-oss/Project---Gridshield-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-accent font-semibold hover:underline"
                >
                  <span>View Repository &amp; Architecture</span>
                  <ExternalLink size={12} />
                </a>
                <span className="font-mono text-xs text-muted-foreground">Hackathon Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-16 border-t border-border bg-secondary/30 text-center">
        <div className="mx-auto max-w-4xl px-4 space-y-6">
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
            Explore the Technical Dimension
          </h3>
          <p className="font-sans text-sm text-muted-foreground max-w-xl mx-auto font-light">
            Switch worlds to inspect Python speech pipelines, JARVIS desktop automation, and
            low-latency algorithmic architecture.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={enterWorkspace}
              className="px-6 py-3 rounded-full bg-cyan-600 text-white font-mono text-xs font-bold hover:bg-cyan-500 transition-all shadow-md shadow-cyan-600/20 cursor-pointer"
            >
              Enter 3D Holographic Workspace →
            </button>
            <button
              type="button"
              onClick={enterTechnical}
              className="px-6 py-3 rounded-full bg-primary text-white font-mono text-xs font-bold hover:bg-primary/90 transition-all shadow-md cursor-pointer"
            >
              Enter Technical World →
            </button>
            <button
              type="button"
              onClick={exploreFull}
              className="px-6 py-3 rounded-full border border-border bg-card text-foreground font-mono text-xs font-semibold hover:border-primary transition-all cursor-pointer"
            >
              Explore Full Experience
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
