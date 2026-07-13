import { motion } from "framer-motion";
import { Github, ExternalLink, Cpu, Bot } from "lucide-react";
import { Section } from "./Section";

const projects = [
  {
    icon: Bot,
    title: "JARVIS – Python Voice Assistant",
    description:
      "A voice-controlled assistant built in Python that can open applications, perform web searches, tell time and date, play music, search Wikipedia, and execute simple automation tasks.",
    tech: ["Python", "SpeechRecognition", "pyttsx3", "Requests", "Wikipedia API"],
    github: "https://github.com/princechauhan",
    demo: null,
  },
  {
    icon: Cpu,
    title: "AI Automation Scripts",
    description:
      "A collection of Python scripts to automate repetitive tasks — from CSV processing and presentation generation to AI-assisted productivity workflows.",
    tech: ["Python", "Pandas", "ChatGPT", "Automation"],
    github: "https://github.com/princechauhan",
    demo: null,
  },
];

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Things I've built"
      subtitle="Small, honest projects that helped me learn."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="group relative glass overflow-hidden rounded-2xl p-8 hover:border-accent-blue/40 transition-colors"
          >
            <div
              className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-30 blur-3xl transition-opacity group-hover:opacity-50"
              style={{ background: "var(--gradient-primary)" }}
            />

            <div className="relative flex items-start justify-between gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-primary/20 text-accent-cyan ring-1 ring-white/10">
                <p.icon size={26} />
              </div>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                0{i + 1} / 0{projects.length}
              </span>
            </div>

            <h3 className="relative mt-6 text-2xl font-bold">{p.title}</h3>
            <p className="relative mt-3 text-muted-foreground leading-relaxed">{p.description}</p>

            <div className="relative mt-5 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-foreground/80"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="relative mt-6 flex items-center gap-3">
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition-colors"
              >
                <Github size={14} /> GitHub
              </a>
              {p.demo && (
                <a
                  href={p.demo}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm text-primary-foreground"
                >
                  <ExternalLink size={14} /> Details
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
