import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, X, Cpu, Bot, ExternalLink } from "lucide-react";
import { Section } from "./Section";
import { PROFILE } from "@/lib/portfolio-data";

type Project = {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  overview: string;
  features: string[];
  tech: string[];
  challenges?: string;
  learned?: string;
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
    tech: ["Python", "SpeechRecognition", "pyttsx3", "Requests", "Wikipedia API"],
    challenges:
      "Handling noisy microphone input and mapping natural phrases to reliable actions without external LLMs.",
    learned:
      "Structuring a Python project into modules, working with system APIs, and shipping an end-to-end tool on GitHub.",
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
    tech: ["Python", "Pandas", "Requests", "ChatGPT"],
    challenges:
      "Turning ad-hoc scripts into reusable, readable code and handling messy real-world data.",
    learned:
      "The value of clean data pipelines and how to prompt AI tools to accelerate development.",
    github: PROFILE.github,
  },
];

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <Section id="projects" eyebrow="Projects" title="Things I've built" subtitle="Small, honest projects that helped me learn.">
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="group relative glass overflow-hidden rounded-2xl p-8 hover:border-accent-blue/40 transition-colors"
          >
            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-30 blur-3xl transition-opacity group-hover:opacity-60"
              style={{ background: "var(--gradient-primary)" }} />
            <div className="relative flex items-start justify-between gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-primary/20 text-accent-cyan ring-1 ring-white/10">
                <p.icon size={26} />
              </div>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">0{i + 1} / 0{projects.length}</span>
            </div>
            <h3 className="relative mt-6 text-2xl font-bold">{p.title}</h3>
            <p className="relative mt-3 text-muted-foreground leading-relaxed">{p.overview}</p>
            <div className="relative mt-5 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-foreground/80">{t}</span>
              ))}
            </div>
            <div className="relative mt-6 flex items-center gap-3">
              <a href={p.github} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition-colors">
                <Github size={14} /> GitHub
              </a>
              <button onClick={() => setOpen(p)}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm text-primary-foreground hover:scale-[1.03] transition-transform">
                <ExternalLink size={14} /> Details
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] grid place-items-center bg-black/70 backdrop-blur-sm p-4"
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
                <button onClick={() => setOpen(null)} className="rounded-full p-1.5 hover:bg-white/10" aria-label="Close">
                  <X size={18} />
                </button>
              </div>
              <p className="mt-5 text-muted-foreground leading-relaxed">{open.overview}</p>
              <h4 className="mt-6 text-sm font-semibold text-accent-cyan uppercase tracking-wider">Features</h4>
              <ul className="mt-2 space-y-1.5 text-sm">
                {open.features.map((f) => <li key={f} className="flex gap-2"><span className="text-accent-cyan">▹</span>{f}</li>)}
              </ul>
              {open.challenges && (
                <>
                  <h4 className="mt-6 text-sm font-semibold text-accent-cyan uppercase tracking-wider">Challenges</h4>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{open.challenges}</p>
                </>
              )}
              {open.learned && (
                <>
                  <h4 className="mt-6 text-sm font-semibold text-accent-cyan uppercase tracking-wider">What I Learned</h4>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{open.learned}</p>
                </>
              )}
              <div className="mt-6 flex flex-wrap gap-2">
                {open.tech.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs">{t}</span>
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
