import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, X, Cpu, Bot, ExternalLink, Search } from "lucide-react";
import { Section } from "./Section";
import { PROFILE } from "@/lib/portfolio-data";

type Project = {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  overview: string;
  features: string[];
  architecture?: string;
  tech: string[];
  challenges?: string;
  solutions?: string;
  learned?: string;
  future?: string[];
  github: string;
};

const projects: Project[] = [
  {
    icon: Bot,
    title: "JARVIS — Python Voice Assistant",
    overview:
      "A voice-controlled desktop assistant built in Python. Listens to spoken commands, converts speech to text, and responds with speech while performing simple tasks.",
    features: [
      "Open applications by voice",
      "Web searches and Wikipedia lookups",
      "Speak current time and date",
      "Play music from local folders",
      "Simple automation commands",
    ],
    architecture:
      "A modular Python app: a mic-input layer (SpeechRecognition) feeds a command router that maps intents to small handler modules (web, apps, media, time). Responses are spoken back through pyttsx3.",
    tech: ["Python", "SpeechRecognition", "pyttsx3", "Requests", "Wikipedia API"],
    challenges:
      "Handling noisy microphone input and mapping natural phrases to reliable actions without external LLMs.",
    solutions:
      "Added an ambient-noise calibration step, normalized transcripts to lowercase keywords, and used simple keyword matching with fallbacks so unknown commands fail gracefully.",
    learned:
      "Structuring a Python project into modules, working with system APIs, and shipping an end-to-end tool on GitHub.",
    future: [
      "Wake-word detection",
      "LLM-powered intent parsing",
      "Cross-platform packaging (Windows / Linux)",
    ],
    github: PROFILE.jarvisRepo,
  },
  {
    icon: Cpu,
    title: "AI Automation Scripts",
    overview:
      "A collection of small Python scripts I built while learning — focused on saving time on repetitive tasks with a little help from AI.",
    features: [
      "CSV analysis with Pandas",
      "Presentation generation from prompts",
      "Small automation utilities",
      "ChatGPT-assisted productivity workflows",
    ],
    architecture:
      "Each script is standalone and CLI-driven, sharing a small utils layer for file I/O and prompt templating so experiments stay isolated and easy to iterate on.",
    tech: ["Python", "Pandas", "Requests", "ChatGPT"],
    challenges:
      "Turning ad-hoc scripts into reusable, readable code and handling messy real-world data.",
    solutions:
      "Split scripts into small pure functions, added defensive parsing for CSV edge cases, and documented usage so I can re-run each script months later.",
    learned:
      "The value of clean data pipelines and how to prompt AI tools to accelerate development.",
    future: [
      "Unified CLI entry point",
      "Config files instead of hardcoded paths",
      "Basic test coverage",
    ],
    github: PROFILE.github,
  },
];

const ALL_TECH = Array.from(new Set(projects.flatMap((p) => p.tech)));

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  const [query, setQuery] = useState("");
  const [tech, setTech] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesQ = !q || (p.title + " " + p.overview + " " + p.tech.join(" ")).toLowerCase().includes(q);
      const matchesT = !tech || p.tech.includes(tech);
      return matchesQ && matchesT;
    });
  }, [query, tech]);

  return (
    <Section id="projects" eyebrow="Projects" title="Things I've built" subtitle="Small, honest projects that helped me learn.">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="glass flex items-center gap-2 rounded-full px-4 py-2 sm:max-w-sm">
          <Search size={14} className="text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setTech(null)}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
              tech === null ? "border-accent-blue/60 bg-accent-blue/20 text-foreground" : "border-black/[0.08] bg-black/[0.03] text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {ALL_TECH.map((t) => (
            <button
              key={t}
              onClick={() => setTech(t === tech ? null : t)}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                tech === t ? "border-accent-blue/60 bg-accent-blue/20 text-foreground" : "border-black/[0.08] bg-black/[0.03] text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <p className="glass rounded-2xl p-10 text-center text-sm text-muted-foreground">
          No projects match your filters.
        </p>
      )}
      <div className="grid gap-8 lg:grid-cols-2">
        {filtered.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
          <TiltCard className="h-full rounded-3xl">
          <article
            className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background/70 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] hover:border-primary/30 transition-all"
          >
            {/* Browser-chrome mockup preview */}
            <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5">
              <div className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 25% 30%, rgba(59,130,246,0.25), transparent 55%), radial-gradient(circle at 80% 70%, rgba(96,165,250,0.22), transparent 55%)",
                }} />
              <div className="absolute inset-x-4 top-4 flex items-center gap-1.5 rounded-t-xl border border-border bg-background/70 px-3 py-2 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-destructive/50" />
                <span className="h-2 w-2 rounded-full bg-primary/40" />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                <span className="ml-2 truncate text-[10px] text-muted-foreground">{p.title}</span>
              </div>
              <div className="absolute inset-0 grid place-items-center pt-8">
                <div className="grid h-20 w-20 place-items-center rounded-2xl bg-white/70 backdrop-blur-md text-primary ring-1 ring-primary/20 shadow-[var(--shadow-card)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                  <p.icon size={36} />
                </div>
              </div>
              {i === 0 && (
                <span className="absolute left-4 bottom-4 inline-flex items-center gap-1 rounded-full bg-gradient-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground shadow-[0_8px_24px_-8px_rgba(59,130,246,0.7)]">
                  <Star size={10} /> Featured
                </span>
              )}
              <span className="absolute right-4 bottom-4 rounded-full bg-background/80 backdrop-blur px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] uppercase text-muted-foreground ring-1 ring-border">
                0{i + 1} / 0{projects.length}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-8">
              <h3 className="text-2xl font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{p.overview}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span key={t} className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-foreground/75">{t}</span>
                ))}
              </div>
              <div className="mt-auto pt-6 flex items-center gap-3">
                <a href={p.github} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
                  <Github size={14} /> GitHub
                </a>
                <button onClick={() => setOpen(p)}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_10px_30px_-10px_rgba(59,130,246,0.6)] hover:scale-[1.03] transition-transform">
                  <ExternalLink size={14} /> Details
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] grid place-items-center bg-foreground/40 backdrop-blur-md p-4"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass max-h-[85vh] w-full max-w-2xl overflow-auto rounded-2xl p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary/20 text-accent-cyan">
                    <open.icon size={20} />
                  </span>
                  <h3 className="text-2xl font-bold">{open.title}</h3>
                </div>
                <button onClick={() => setOpen(null)} className="rounded-full p-1.5 hover:bg-black/[0.06]" aria-label="Close">
                  <X size={18} />
                </button>
              </div>
              <p className="mt-5 text-muted-foreground leading-relaxed">{open.overview}</p>
              <h4 className="mt-6 text-sm font-semibold text-accent-cyan uppercase tracking-wider">Features</h4>
              <ul className="mt-2 space-y-1.5 text-sm">
                {open.features.map((f) => <li key={f} className="flex gap-2"><span className="text-accent-cyan">▹</span>{f}</li>)}
              </ul>
              {open.architecture && (
                <>
                  <h4 className="mt-6 text-sm font-semibold text-accent-cyan uppercase tracking-wider">Architecture</h4>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{open.architecture}</p>
                </>
              )}
              {open.challenges && (
                <>
                  <h4 className="mt-6 text-sm font-semibold text-accent-cyan uppercase tracking-wider">Challenges</h4>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{open.challenges}</p>
                </>
              )}
              {open.solutions && (
                <>
                  <h4 className="mt-6 text-sm font-semibold text-accent-cyan uppercase tracking-wider">Solutions</h4>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{open.solutions}</p>
                </>
              )}
              {open.learned && (
                <>
                  <h4 className="mt-6 text-sm font-semibold text-accent-cyan uppercase tracking-wider">What I Learned</h4>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{open.learned}</p>
                </>
              )}
              {open.future && open.future.length > 0 && (
                <>
                  <h4 className="mt-6 text-sm font-semibold text-accent-cyan uppercase tracking-wider">Future Improvements</h4>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {open.future.map((f) => <li key={f} className="flex gap-2 text-muted-foreground"><span className="text-accent-cyan">→</span>{f}</li>)}
                  </ul>
                </>
              )}
              <h4 className="mt-6 text-sm font-semibold text-accent-cyan uppercase tracking-wider">Tech Stack</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {open.tech.map((t) => (
                  <span key={t} className="rounded-full border border-black/[0.08] bg-black/[0.03] px-2.5 py-1 text-xs">{t}</span>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <a href={open.github} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
                  <Github size={14} /> View on GitHub
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
