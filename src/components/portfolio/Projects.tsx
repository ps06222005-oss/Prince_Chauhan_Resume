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
  ArrowRight,
} from "lucide-react";
import { fetchGithubEcosystem, type GithubEcosystemData } from "@/services/github";
import type { EngineeringProject } from "@/types/portfolio";
import { FALLBACK_PROJECTS } from "@/data/projects";

export interface FlagshipProject {
  id: string;
  name: string;
  category: string;
  categoryBadge: string;
  headline: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl: string;
  type: "aios" | "bugreporter" | "careercopilot" | "jarvis" | "onlinestream";
  verifiedRepo?: boolean;
}

const FLAGSHIP_SHOWCASE: FlagshipProject[] = [
  {
    id: "aios",
    name: "AIOS — Personal AI Agent",
    category: "AI / Automation",
    categoryBadge: "AI / Automation",
    headline: "Multi-agent autonomous system for desktop workflows and local execution.",
    description:
      "A multi-agent AI system to automate tasks, manage files, edit media, and more — running locally with Ollama and ComfyUI.",
    technologies: ["Python", "Ollama", "ComfyUI", "+1"],
    githubUrl: "https://github.com/ps06222005-oss",
    type: "aios",
  },
  {
    id: "ai-bug-reporter",
    name: "AI Bug Reporter",
    category: "Full Stack",
    categoryBadge: "Full Stack",
    headline: "Automated bug tracking dashboard with intelligent root-cause diagnosis.",
    description:
      "A full stack bug tracking platform with AI-powered issue analysis, automated stack trace parsing, and smart fix suggestions.",
    technologies: ["React", "Node.js", "MongoDB", "+1"],
    githubUrl: "https://github.com/ps06222005-oss",
    type: "bugreporter",
  },
  {
    id: "ai-career-copilot",
    name: "AI Career Copilot",
    category: "AI / Productivity",
    categoryBadge: "AI / Productivity",
    headline: "AI career strategist with skills gap analysis and personalized roadmap guidance.",
    description:
      "An AI-powered career assistant for personalized guidance, roadmaps, resume feedback, and automated skill recommendations.",
    technologies: ["React", "FastAPI", "Gemini API", "+1"],
    githubUrl: "https://github.com/ps06222005-oss",
    type: "careercopilot",
  },
];

/**
 * Projects — Featured Projects Bento Grid matching the reference design:
 * - Transition to Soft White surface (#f8fafc)
 * - Header with "◆ FEATURED WORK" & "Projects That Create Real Impact."
 * - Bento-style project cards (AIOS, Bug Reporter, Career Copilot)
 * - "My Journey" 4-step timeline card
 * - Quick Facts strip & verified repositories access
 */
export function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeDossier, setActiveDossier] = useState<EngineeringProject | null>(null);

  const filteredList = useMemo(() => {
    if (activeCategory === "All") {
      return FLAGSHIP_SHOWCASE;
    }
    return FLAGSHIP_SHOWCASE.filter(
      (p) => p.category === activeCategory || p.categoryBadge.includes(activeCategory),
    );
  }, [activeCategory]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="projects"
      aria-label="Featured Projects and Engineering Artifacts"
      className="relative w-full overflow-hidden bg-[#f8fafc] text-slate-900 py-20 sm:py-28 border-t border-slate-200"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* =====================================================================
            SECTION HEADER (Soft White Surface) Matching Reference
            ===================================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-blue-600 tracking-wider uppercase">
              <span className="text-blue-500">◆</span>
              <span>FEATURED WORK</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-slate-950">
              Projects <br />
              <span className="text-gradient-impact">That Create Real Impact.</span>
            </h2>
          </div>

          <div className="space-y-3 md:text-right max-w-md">
            <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              A collection of my best work, showcasing real-world applications, modern technologies,
              and problem-solving skills.
            </p>

            <div className="flex items-center gap-2 justify-start md:justify-end">
              <button
                type="button"
                onClick={() => scrollTo("github")}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 hover:border-blue-600 bg-white hover:bg-slate-50 px-4 py-1.5 font-sans text-xs font-semibold text-slate-800 hover:text-blue-600 shadow-sm transition-all cursor-pointer"
              >
                <span>View All Projects</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* =====================================================================
            MAIN BENTO GRID: 3 FLAGSHIP CARDS (8 COLS) + "MY JOURNEY" (4 COLS)
            ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 8 COLS: 3 Project Cards in a Responsive Bento Grid */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredList.map((project) => (
                <div
                  key={project.id}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-[#0c101c] text-white p-4 sm:p-5 shadow-xl hover:shadow-2xl hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="space-y-3.5">
                    {/* Realistic Product UI Preview Mockup */}
                    {project.type === "aios" && (
                      <div className="h-44 w-full rounded-xl bg-[#07090e] border border-white/[0.08] p-3 flex flex-col justify-between overflow-hidden relative group-hover:border-sky-500/30 transition-colors">
                        <div className="absolute top-0 right-0 w-28 h-28 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
                        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-[10px] font-mono">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 font-bold">
                              AIOS
                            </span>
                            <span className="text-slate-400">Agent Swarm</span>
                          </div>
                          <span className="flex items-center gap-1 text-emerald-400 text-[9px]">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Active
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5 my-1 text-[8.5px] font-mono">
                          <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-1.5">
                            <div className="text-slate-500 text-[7.5px]">TASKS</div>
                            <div className="text-white font-bold">8 Local</div>
                          </div>
                          <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-1.5">
                            <div className="text-slate-500 text-[7.5px]">ENGINE</div>
                            <div className="text-sky-300 font-bold">Ollama 8B</div>
                          </div>
                          <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-1.5">
                            <div className="text-slate-500 text-[7.5px]">LATENCY</div>
                            <div className="text-emerald-400 font-bold">14ms</div>
                          </div>
                        </div>
                        <div className="rounded-lg bg-[#04060a] border border-white/[0.04] p-2 font-mono text-[8.5px] text-slate-400 truncate">
                          &gt; [Agent:Files] Multi-agent task pipeline executing...
                        </div>
                      </div>
                    )}

                    {project.type === "bugreporter" && (
                      <div className="h-44 w-full rounded-xl bg-[#07090e] border border-white/[0.08] p-3 flex flex-col justify-between overflow-hidden relative group-hover:border-blue-500/30 transition-colors">
                        <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-[10px] font-mono">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 font-bold">
                              BUG #104
                            </span>
                            <span className="text-slate-400">Analysis</span>
                          </div>
                          <span className="text-amber-400 text-[9px] font-medium">
                            AI In Progress
                          </span>
                        </div>
                        <div className="rounded-lg bg-[#04060a] border border-white/[0.04] p-2 my-1 font-mono text-[8.5px] text-slate-400 space-y-0.5">
                          <div className="text-rose-400 font-medium">
                            TypeError: undefined property 'token'
                          </div>
                          <div className="text-slate-500 text-[7.5px]">
                            at auth-pipeline.ts:34:12
                          </div>
                        </div>
                        <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-2 text-[8.5px] font-mono text-emerald-300 flex items-center justify-between">
                          <span>AI Fix: Add fallback check</span>
                          <span className="text-[7.5px] bg-emerald-500/20 px-1 py-0.5 rounded">
                            99% Conf.
                          </span>
                        </div>
                      </div>
                    )}

                    {project.type === "careercopilot" && (
                      <div className="h-44 w-full rounded-xl bg-[#07090e] border border-white/[0.08] p-3 flex flex-col justify-between overflow-hidden relative group-hover:border-violet-500/30 transition-colors">
                        <div className="absolute top-0 right-0 w-28 h-28 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />
                        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-[10px] font-mono">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 font-bold">
                              CAREER RADAR
                            </span>
                            <span className="text-slate-400">Targeting</span>
                          </div>
                          <span className="text-sky-400 text-[9px] font-medium">96% Fit</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5 my-1 text-[8.5px] font-mono">
                          <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-1.5">
                            <div className="text-slate-500 text-[7.5px]">PYTHON</div>
                            <div className="text-emerald-400 font-bold">Strong</div>
                          </div>
                          <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-1.5">
                            <div className="text-slate-500 text-[7.5px]">REACT</div>
                            <div className="text-sky-300 font-bold">Fluent</div>
                          </div>
                          <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-1.5">
                            <div className="text-slate-500 text-[7.5px]">AI/ML</div>
                            <div className="text-violet-300 font-bold">Advanced</div>
                          </div>
                        </div>
                        <div className="rounded-lg bg-[#04060a] border border-white/[0.04] p-2 font-mono text-[8.5px] text-slate-300 truncate">
                          &gt; Roadmap: B.Tech CSE &rarr; AI Systems Intern
                        </div>
                      </div>
                    )}

                    {project.type === "jarvis" && (
                      <div className="h-44 w-full rounded-xl bg-[#07090e] border border-white/[0.08] p-3 flex flex-col justify-between overflow-hidden relative group-hover:border-sky-500/30 transition-colors">
                        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-[10px] font-mono">
                          <span className="px-2 py-0.5 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 font-bold">
                            JARVIS VOICE
                          </span>
                          <span className="text-emerald-400 text-[9px]">Acoustic Stream</span>
                        </div>
                        <div className="flex items-center justify-center gap-1 my-2 h-12">
                          {[30, 70, 45, 90, 60, 100, 75, 40, 85, 55, 95, 65, 35, 80].map((h, i) => (
                            <span
                              key={i}
                              style={{ height: `${h}%` }}
                              className="w-1 rounded-full bg-gradient-to-t from-sky-500 to-violet-500 animate-pulse"
                            />
                          ))}
                        </div>
                        <div className="rounded-lg bg-[#04060a] border border-white/[0.04] p-2 font-mono text-[8.5px] text-slate-400 truncate">
                          &gt; 1.0s Ambient energy noise calibration calibrated.
                        </div>
                      </div>
                    )}

                    {project.type === "onlinestream" && (
                      <div className="h-44 w-full rounded-xl bg-[#07090e] border border-white/[0.08] p-3 flex flex-col justify-between overflow-hidden relative group-hover:border-cyan-500/30 transition-colors">
                        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-[10px] font-mono">
                          <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-bold">
                            ONLINESTREAM
                          </span>
                          <span className="text-cyan-400 text-[9px]">Vercel Edge</span>
                        </div>
                        <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-2 space-y-1">
                          <div className="text-[8.5px] text-slate-400 font-mono">
                            Adaptive Stream Controller
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                            <div className="h-full w-3/4 bg-cyan-400 rounded-full" />
                          </div>
                        </div>
                        <div className="rounded-lg bg-[#04060a] border border-white/[0.04] p-2 font-mono text-[8.5px] text-slate-400 truncate">
                          &gt; Zero layout shift media controller mounted.
                        </div>
                      </div>
                    )}

                    {/* Category Pill & Title */}
                    <div className="space-y-1.5 pt-1">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-[9.5px] font-mono text-sky-300">
                        {project.categoryBadge}
                      </span>
                      <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-sky-300 transition-colors tracking-tight">
                        {project.name}
                      </h3>
                      <p className="font-sans text-xs text-slate-400 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.technologies.map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-white/[0.06] border border-white/[0.08] px-2 py-0.5 text-[9.5px] font-mono text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions (Live Demo + GitHub) */}
                  <div className="flex items-center gap-2.5 pt-4 mt-4 border-t border-white/[0.08]">
                    <a
                      href={project.demoUrl || project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 px-3.5 py-1.5 font-sans text-xs font-semibold text-white shadow-md active:scale-95 transition-all"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={11} />
                    </a>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.03] hover:bg-white/[0.08] px-3.5 py-1.5 font-sans text-xs font-medium text-slate-300 hover:text-white transition-all"
                    >
                      <Github size={12} />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT 4 COLS: "My Journey" Timeline Card matching reference */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="font-display font-bold text-lg text-slate-950">My Journey</h3>
                <span className="font-mono text-[10px] text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 font-semibold">
                  Timeline
                </span>
              </div>

              {/* Timeline Items connected by vertical line */}
              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {/* Step 1 */}
                <div className="relative space-y-1">
                  <span className="absolute -left-6 top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-blue-600 shadow-sm" />
                  <div className="font-display font-bold text-xs text-slate-900">
                    B.Tech CSE (AI &amp; ML)
                  </div>
                  <div className="font-sans text-[11px] text-slate-500">
                    Sunderdeep Global University
                  </div>
                  <div className="font-mono text-[10px] text-blue-600 font-medium">
                    2024 – 2028 | Pursuing
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative space-y-1">
                  <span className="absolute -left-6 top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-blue-500 shadow-sm" />
                  <div className="font-display font-bold text-xs text-slate-900">
                    Full Stack Development
                  </div>
                  <div className="font-sans text-[11px] text-slate-500">
                    Building real-world applications
                  </div>
                  <div className="font-mono text-[10px] text-slate-400">2023 – Present</div>
                </div>

                {/* Step 3 */}
                <div className="relative space-y-1">
                  <span className="absolute -left-6 top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-violet-500 shadow-sm" />
                  <div className="font-display font-bold text-xs text-slate-900">
                    AI / Machine Learning
                  </div>
                  <div className="font-sans text-[11px] text-slate-500">
                    Exploring AI tools and automation
                  </div>
                  <div className="font-mono text-[10px] text-slate-400">2023 – Present</div>
                </div>

                {/* Step 4 */}
                <div className="relative space-y-1">
                  <span className="absolute -left-6 top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500 shadow-sm animate-pulse" />
                  <div className="font-display font-bold text-xs text-emerald-700">
                    Open to internships
                  </div>
                  <div className="font-sans text-[11px] text-slate-500">
                    Looking for opportunities to learn and contribute
                  </div>
                </div>
              </div>
            </div>
          </div>
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
