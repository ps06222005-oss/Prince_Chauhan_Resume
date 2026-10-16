import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  X,
  Sparkles,
  Layers,
  Code2,
  Cpu,
  BookOpen,
  Heart,
  TrendingUp,
  Activity,
} from "lucide-react";
import { fetchGithubEcosystem, type GithubEcosystemData } from "@/services/github";
import type { EngineeringProject } from "@/types/portfolio";
import { FALLBACK_PROJECTS } from "@/data/projects";

/**
 * Projects — Featured Projects Bento Grid matching the reference design:
 * - Transition to Soft White surface (#f8fafc)
 * - Header with "◆ REAL PROJECTS, REAL IMPACT"
 * - High-contrast sleek dark project cards with real project data (JARVIS, OnlineStream, DecodeLabs, Portfolio)
 * - Quick Facts 4-card bento strip on the clean light surface
 * - Working Live Demo and GitHub buttons
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

  const [activeCategory, setActiveCategory] = useState<string>("All");
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

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return canonicalProjects;
    return canonicalProjects.filter((p) => p.category === activeCategory);
  }, [canonicalProjects, activeCategory]);

  return (
    <section
      id="projects"
      aria-label="Featured Projects and Engineering Artifacts"
      className="relative w-full overflow-hidden bg-[#f8fafc] text-slate-900 py-20 sm:py-28 border-t border-slate-200"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* =====================================================================
            SECTION HEADER (Soft White Surface)
            ===================================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-blue-600 tracking-wider uppercase">
              <span className="text-blue-500">◆</span>
              <span>REAL PROJECTS, REAL IMPACT</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-slate-950">
              Featured Projects
            </h2>

            <p className="font-sans text-sm sm:text-base text-slate-600 max-w-2xl font-normal">
              A collection of my best work, showcasing real-world applications, modern technologies,
              and problem-solving skills.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-200/60 p-1 rounded-full border border-slate-300/60 self-start md:self-end">
            {["All", "AI/ML", "Web", "Engineering"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1 rounded-full text-xs font-sans font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-slate-900 text-white shadow-sm font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* =====================================================================
            BENTO GRID OF HIGH-CONTRAST PROJECT CARDS
            ===================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => {
            const isFeatured = idx === 0;
            return (
              <div
                key={project.id}
                className={`group flex flex-col justify-between rounded-2xl border border-slate-800 bg-[#0c101c] text-white p-5 sm:p-6 shadow-xl hover:shadow-2xl hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden ${
                  isFeatured ? "md:col-span-2 lg:col-span-2" : "col-span-1"
                }`}
              >
                {/* Subtle Card Ambient Glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-24 -right-24 w-48 h-48 rounded-full bg-blue-600/10 blur-3xl group-hover:bg-blue-600/20 transition-all"
                />

                <div className="space-y-4">
                  {/* Top Screen / Header Simulation */}
                  <div className="rounded-xl border border-white/[0.08] bg-[#07090e] p-3 flex items-center justify-between font-mono text-[11px] text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="flex gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-rose-500/70" />
                        <span className="h-2 w-2 rounded-full bg-amber-500/70" />
                        <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
                      </span>
                      <span className="text-slate-500 pl-1 text-[10px]">
                        {project.name.toLowerCase()}
                      </span>
                    </div>

                    <span className="px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[10px] text-sky-300 font-medium">
                      {project.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight group-hover:text-sky-300 transition-colors">
                      {project.displayName}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                      {project.overview}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-white/[0.06] border border-white/[0.08] px-2 py-0.5 text-[10px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="rounded-md bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-mono text-slate-500">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions (Bottom) */}
                <div className="flex items-center gap-3 pt-6 mt-4 border-t border-white/[0.08]">
                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-3.5 py-2 font-sans text-xs font-semibold text-white shadow-md active:scale-95 transition-all"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveDossier(project)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] px-3.5 py-2 font-sans text-xs font-semibold text-white transition-all cursor-pointer"
                    >
                      <Sparkles size={12} className="text-sky-400" />
                      <span>Case Study</span>
                    </button>
                  )}

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.12] bg-white/[0.03] hover:bg-white/[0.08] px-3.5 py-2 font-sans text-xs font-medium text-slate-200 hover:text-white transition-all"
                  >
                    <Github size={13} />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* =====================================================================
            QUICK FACTS BENTO STRIP (On Soft White Surface)
            ===================================================================== */}
        <div className="pt-4">
          <div className="flex items-center gap-2 mb-4 font-mono text-xs font-bold text-slate-800 uppercase tracking-wider">
            <Activity size={14} className="text-blue-600" />
            <span>Quick Facts &amp; Foundations</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {/* Fact 1 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
                <Code2 size={18} />
              </div>
              <div>
                <div className="font-display font-black text-2xl text-slate-900">5+</div>
                <div className="font-sans text-xs text-slate-500 font-medium">Public Repos</div>
              </div>
            </div>

            {/* Fact 2 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-violet-600 border border-violet-100">
                <Cpu size={18} />
              </div>
              <div>
                <div className="font-display font-black text-2xl text-slate-900">12+</div>
                <div className="font-sans text-xs text-slate-500 font-medium">Technologies</div>
              </div>
            </div>

            {/* Fact 3 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
                <BookOpen size={18} />
              </div>
              <div>
                <div className="font-display font-black text-2xl text-slate-900">2024–28</div>
                <div className="font-sans text-xs text-slate-500 font-medium">
                  B.Tech AI &amp; ML
                </div>
              </div>
            </div>

            {/* Fact 4 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
                <Heart size={18} />
              </div>
              <div>
                <div className="font-display font-black text-2xl text-slate-900">100%</div>
                <div className="font-sans text-xs text-slate-500 font-medium">Commitment</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          PROJECT CASE STUDY MODAL DOSSIER
          ===================================================================== */}
      <AnimatePresence>
        {activeDossier && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-700 bg-[#0d111d] text-white p-6 sm:p-8 space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div>
                  <span className="font-mono text-[10px] text-sky-400 uppercase tracking-widest">
                    {activeDossier.category}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-white">
                    {activeDossier.displayName}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveDossier(null)}
                  className="rounded-lg p-2 text-slate-400 hover:text-white hover:bg-white/[0.06]"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <div>
                  <strong className="text-white block font-mono text-[11px] uppercase tracking-wider mb-1">
                    System Architecture &amp; Implementation
                  </strong>
                  <p>{activeDossier.what || activeDossier.overview}</p>
                </div>

                {activeDossier.engineering && (
                  <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 space-y-1">
                    <strong className="text-sky-300 font-mono text-[11px] uppercase block">
                      Engineering Highlight
                    </strong>
                    <p className="text-slate-200">{activeDossier.engineering}</p>
                  </div>
                )}

                {activeDossier.features && activeDossier.features.length > 0 && (
                  <div>
                    <strong className="text-white block font-mono text-[11px] uppercase tracking-wider mb-2">
                      Verified Capabilities
                    </strong>
                    <ul className="list-disc pl-5 space-y-1 text-slate-300">
                      {activeDossier.features.map((feat, i) => (
                        <li key={i}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.08]">
                {activeDossier.demoUrl && (
                  <a
                    href={activeDossier.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 font-sans text-xs font-semibold text-white"
                  >
                    <span>Open Live Demo</span>
                    <ExternalLink size={13} />
                  </a>
                )}
                <a
                  href={activeDossier.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.15] bg-white/[0.04] hover:bg-white/[0.08] px-4 py-2 font-sans text-xs font-medium text-white"
                >
                  <Github size={13} />
                  <span>View on GitHub</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
