import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight, Terminal, X, CheckCircle2 } from "lucide-react";
import { Section } from "./Section";
import { ProjectArchitectureDiagram } from "./ProjectArchitectureDiagram";
import { ProjectWaveformCanvas } from "./ProjectWaveformCanvas";
import { ProjectConduitTransition } from "./ProjectConduitTransition";
import { fetchGithubEcosystem, type GithubEcosystemData } from "@/services/github";
import type { EngineeringProject } from "@/types/portfolio";
import { FALLBACK_PROJECTS } from "@/data/projects";
import { useEffect } from "react";

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
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  useEffect(() => {
    fetchGithubEcosystem().then(setData);
  }, []);

  const curatedProjects = useMemo(() => {
    const candidates = data.projects.filter(
      (p) => p.isPriority || p.isFeatured || p.score >= 50 || p.architecture || p.what,
    );
    return candidates.sort((a, b) => b.score - a.score);
  }, [data.projects]);

  return (
    <Section
      id="projects"
      index="02"
      eyebrow="Engineered Artifacts"
      title="Autonomous systems & verified software architectures."
      subtitle="Large-stage visual case studies examining real-world computational problem formulation, pipeline topologies, and verified repository source."
      accent="amber"
    >
      {/* Editorial Stages */}
      <div className="space-y-32 sm:space-y-48">
        {curatedProjects.map((project, idx) => {
          const indexNum = String(idx + 1).padStart(2, "0");
          const hasDemo = Boolean(project.demoUrl);
          const isJarvis = project.name.toLowerCase().includes("jarvis");
          const isStream = project.name.toLowerCase().includes("stream");
          const isDecode = project.name.toLowerCase().includes("decode");

          const canvasMode = isJarvis ? "waveform" : isStream ? "streaming" : "lattice";

          // Distinctive Project Sub-heading (Item 6)
          const subHeading = isJarvis
            ? "AUTONOMOUS VOICE SYSTEM"
            : isStream
              ? "HIGH-THROUGHPUT MEDIA NETWORK"
              : isDecode
                ? "ALGORITHMIC MATRIX PLATFORM"
                : "DISTRIBUTED SOFTWARE ARCHITECTURE";

          const whatText =
            project.what || project.overview || "Autonomous software system built on GitHub.";
          const whyText =
            project.why ||
            "Built to solve latency bottlenecks, hands-free OS accessibility, and high-performance workflows.";
          const howText =
            project.how ||
            project.architecture ||
            `Built with ${project.technologies.join(", ")} utilizing modular software principles.`;
          const engineeringText =
            project.engineering ||
            project.challenges ||
            "Optimized for minimal execution latency, robust error boundaries, and defensive API handling.";

          return (
            <div key={project.id}>
              <article
                data-cursor="view"
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                className="project-artifact group relative border-b border-white/[0.08] pb-24 sm:pb-36 transition-colors"
              >
                {/* Visual Stage Environment: Canvas Surrounding the Massive Typography (Section 5 & 6) */}
                <div className="relative mb-12 sm:mb-16 min-h-[44vh] sm:min-h-[52vh] w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-[#08090d] flex flex-col justify-between p-6 sm:p-12">
                  {/* Procedural Visualizer Canvas Spanning the Stage */}
                  <div className="absolute inset-0 pointer-events-none opacity-85">
                    <ProjectWaveformCanvas
                      mode={canvasMode}
                      isHovered={hoveredProjectId === project.id}
                    />
                  </div>

                  {/* Atmospheric Environmental Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-transparent to-[#08090d]/60 pointer-events-none" />

                  {/* Stage Top Header Metadata */}
                  <div className="relative z-10 flex items-center justify-between font-mono text-xs text-muted-foreground/80">
                    <div className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                      <span className="uppercase tracking-widest text-foreground/90 font-semibold">
                        {isJarvis
                          ? "ACOUSTIC SIGNAL HARVESTING & SPEECH SYNTHESIS"
                          : isStream
                            ? "LOW-LATENCY STREAM BUFFERING & DEMUX"
                            : "ALGORITHMIC COMPLEXITY & MEMORY SAFETY"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      {hasDemo && (
                        <span className="inline-flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          LIVE ACTIVE
                        </span>
                      )}
                      <span className="text-white/40 hidden sm:inline">VERIFIED ARTIFACT</span>
                    </div>
                  </div>

                  {/* Massive Title Artwork (Section 6) */}
                  <div className="relative z-10 my-auto py-8">
                    <div className="font-mono text-sm sm:text-base font-bold text-amber-400 tracking-wider mb-2">
                      {indexNum}
                    </div>

                    <h3 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10.5rem] font-black tracking-[-0.05em] text-[#f4f4f2] leading-[0.82] select-none group-hover:text-amber-200 transition-colors duration-500">
                      {project.name.toUpperCase()}
                    </h3>

                    <div className="mt-3 font-mono text-xs sm:text-sm tracking-[0.25em] text-muted-foreground/80 uppercase font-semibold">
                      {subHeading}
                    </div>
                  </div>

                  {/* Bottom Stage Anchor Coordinates */}
                  <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-muted-foreground/60 border-t border-white/[0.06] pt-4">
                    <span>SOURCE: GITHUB // {project.name}</span>
                    <span className="hidden sm:inline">
                      STACK: {project.technologies.slice(0, 3).join(" · ")}
                    </span>
                  </div>
                </div>

                {/* Progressive Technical Reveal (Section 6) */}
                <div className="space-y-12 max-w-5xl">
                  {/* High-Contrast Positioning Statement */}
                  <p className="font-display text-2xl sm:text-3xl md:text-4xl text-[#f4f4f2] font-normal leading-[1.18] tracking-[-0.03em]">
                    {project.positioning || project.overview}
                  </p>

                  {/* Embedded Verified System Architecture Pipeline */}
                  <div className="mt-8">
                    <ProjectArchitectureDiagram projectName={project.name} interactive={true} />
                  </div>

                  {/* Rhythmic Architectural Breakdown (No Generic 4-Card Grid) */}
                  <div className="grid grid-cols-1 gap-10 md:grid-cols-12 border-t border-white/[0.08] pt-10 font-sans">
                    <div className="md:col-span-4 font-mono text-xs text-amber-400 uppercase tracking-wider space-y-1">
                      <div>01 // FORMULATION &amp; MOTIVATION</div>
                      <div className="text-muted-foreground/60 font-mono text-[11px]">
                        PROBLEM SOLVED
                      </div>
                    </div>
                    <div className="md:col-span-8 text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
                      {whyText}
                    </div>

                    <div className="md:col-span-4 font-mono text-xs text-accent-cyan uppercase tracking-wider space-y-1 border-t border-white/[0.06] pt-8 md:border-t-0 md:pt-0">
                      <div>02 // PIPELINE &amp; TOPOLOGY</div>
                      <div className="text-muted-foreground/60 font-mono text-[11px]">
                        IMPLEMENTATION
                      </div>
                    </div>
                    <div className="md:col-span-8 text-base sm:text-lg text-muted-foreground leading-relaxed font-light border-t border-white/[0.06] pt-8 md:border-t-0 md:pt-0">
                      {howText}
                    </div>

                    <div className="md:col-span-4 font-mono text-xs text-[#f4f4f2] uppercase tracking-wider space-y-1 border-t border-white/[0.06] pt-8 md:border-t-0 md:pt-0">
                      <div>03 // VERIFIED ENGINEERING RESULT</div>
                      <div className="text-muted-foreground/60 font-mono text-[11px]">
                        PERFORMANCE &amp; RELIABILITY
                      </div>
                    </div>
                    <div className="md:col-span-8 text-base sm:text-lg text-muted-foreground leading-relaxed font-light border-t border-white/[0.06] pt-8 md:border-t-0 md:pt-0">
                      {engineeringText}
                    </div>
                  </div>

                  {/* Technologies & Direct Action Links */}
                  <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/[0.06] pt-8">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                      <span className="text-muted-foreground/60 mr-2 uppercase">
                        VERIFIED STACK:
                      </span>
                      {project.technologies.map((t) => (
                        <span
                          key={t}
                          className="rounded border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 text-foreground/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveDossier(project)}
                        className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-5 py-2.5 font-mono text-xs font-semibold text-amber-300 hover:bg-amber-400/20 active:scale-[0.98] transition-all"
                      >
                        <span>INSPECT FULL DOSSIER</span>
                        <ArrowUpRight size={13} />
                      </button>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.02] px-5 py-2.5 font-mono text-xs text-foreground hover:bg-white/[0.08] active:scale-[0.98] transition-colors"
                      >
                        <Github size={13} />
                        <span>GITHUB SOURCE</span>
                      </a>

                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 font-mono text-xs font-bold text-black hover:brightness-110 active:scale-[0.98] transition-all"
                        >
                          <ExternalLink size={13} />
                          <span>LIVE SYSTEM</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>

              {/* Visual Transformation Continuum Between Projects (Item 7) */}
              {idx === 0 && (
                <ProjectConduitTransition
                  type="jarvis-to-stream"
                  fromLabel="01 // JARVIS ACOUSTIC CORE"
                  toLabel="02 // ONLINESTREAM MEDIA PIPELINE"
                />
              )}
              {idx === 1 && (
                <ProjectConduitTransition
                  type="stream-to-decode"
                  fromLabel="02 // ONLINESTREAM NETWORK"
                  toLabel="03 // DECODELABS ALGORITHMIC LATTICE"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Technical Dossier Modal */}
      <AnimatePresence>
        {activeDossier && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] grid place-items-center bg-black/90 backdrop-blur-xl p-4 sm:p-6"
            onClick={() => setActiveDossier(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/[0.16] bg-[#0c0e14] p-6 sm:p-10 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setActiveDossier(null)}
                className="absolute right-6 top-6 grid h-9 w-9 place-items-center rounded-full border border-white/[0.12] bg-white/[0.04] text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={16} />
              </button>

              <div className="font-mono text-xs uppercase tracking-widest text-amber-400">
                TECHNICAL DOSSIER // {activeDossier.name}
              </div>

              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-foreground">
                {activeDossier.displayName}
              </h2>

              <p className="mt-2 font-sans text-base text-muted-foreground">
                {activeDossier.positioning || activeDossier.overview}
              </p>

              <div className="mt-6">
                <ProjectArchitectureDiagram projectName={activeDossier.name} interactive={true} />
              </div>

              <div className="mt-8 space-y-6 font-sans text-sm text-muted-foreground leading-relaxed">
                <div>
                  <h4 className="font-mono text-xs font-semibold text-amber-400 uppercase">
                    Architectural Problem Formulation
                  </h4>
                  <p className="mt-1">{activeDossier.why}</p>
                </div>

                <div>
                  <h4 className="font-mono text-xs font-semibold text-accent-cyan uppercase">
                    System Architecture & Data Flow
                  </h4>
                  <p className="mt-1">{activeDossier.how}</p>
                </div>

                <div>
                  <h4 className="font-mono text-xs font-semibold text-foreground uppercase">
                    Implementation Decisions & Tradeoffs
                  </h4>
                  <p className="mt-1">{activeDossier.what}</p>
                </div>

                <div>
                  <h4 className="font-mono text-xs font-semibold text-amber-300 uppercase">
                    Observed Performance & Verification
                  </h4>
                  <p className="mt-1">{activeDossier.engineering}</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-white/[0.08] pt-6 font-mono text-xs">
                <a
                  href={activeDossier.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-background font-bold hover:bg-amber-300 transition-colors"
                >
                  <Github size={14} />
                  <span>VIEW SOURCE REPOSITORY</span>
                </a>
                {activeDossier.demoUrl && (
                  <a
                    href={activeDossier.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-5 py-2.5 text-emerald-300 font-bold hover:bg-emerald-400/20 transition-colors"
                  >
                    <ExternalLink size={14} />
                    <span>LAUNCH LIVE SYSTEM</span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
