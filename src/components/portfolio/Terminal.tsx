import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Terminal as TermIcon } from "lucide-react";
import { Section } from "./Section";
import { PROFILE } from "@/lib/portfolio-data";

const now = () => new Date().toString();

const COMMANDS: Record<string, string | (() => string)> = {
  help: `Available commands:
  about        — who I am
  skills       — my toolkit
  projects     — what I've built
  education    — academic background
  certificates — certifications overview
  experience   — current experience
  resume       — download my resume
  contact      — how to reach me
  github       — GitHub profile
  whoami       — quick identity
  pwd          — current path
  ls           — list sections
  cat <file>   — read a section (e.g. cat about)
  tree         — site structure
  date         — current date & time
  theme        — active theme
  clear        — clear the terminal`,
  about: `${PROFILE.name} — ${PROFILE.role}
${PROFILE.headline}
Based in ${PROFILE.location}. Currently learning by building projects and open to internships.`,
  skills: `Programming : Python (Learning & Project Experience), C (Basic), HTML, CSS
Libraries   : SpeechRecognition, pyttsx3, Pandas (Basic), Requests
Tools       : VS Code, Git, GitHub, Google Colab, Jupyter, ChatGPT
Concepts    : ML Basics, NLP Basics, OOP, DBMS, Networks, DSA`,
  projects: `1. JARVIS — Python Voice Assistant
   ${PROFILE.jarvisRepo}
2. AI Automation Scripts
   ${PROFILE.github}`,
  education: `B.Tech, Computer Science Engineering (AI & ML)
Sunderdeep Global University — Expected 2028`,
  certificates: `Certifications are listed in the Certifications section — scroll down or use ⌘K → "Certifications".`,
  experience: `Currently focused on project-based learning and building an open-source presence on GitHub.
Actively seeking software development and AI/ML internships.`,
  resume: `Opening resume… → ${PROFILE.resume}`,
  contact: `Email    : ${PROFILE.email}
Phone    : ${PROFILE.phone}
LinkedIn : ${PROFILE.linkedin}
GitHub   : ${PROFILE.github}`,
  github: `→ ${PROFILE.github}`,
  whoami: `${PROFILE.name.toLowerCase().replace(/\s+/g, "-")}`,
  pwd: `/home/prince/portfolio`,
  ls: `about  skills  projects  why  journey  github  education  certifications  achievements  terminal  contact`,
  tree: `portfolio
├── about
├── skills
├── projects
│   ├── jarvis
│   └── ai-automation-scripts
├── why-hire-me
├── learning-journey
├── github-stats
├── education
├── certifications
├── achievements
├── terminal
└── contact`,
  date: now,
  theme: `light · minimal · premium blue accents (#2563eb → #60a5fa)`,
};

type Line = { kind: "in" | "out"; text: string };

export function TerminalMode() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: `Welcome to prince@portfolio — type 'help' to list commands.` },
  ]);
  const [value, setValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { scrollRef.current?.scrollTo({ top: 99999 }); }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === "clear") { setLines([]); return; }
    // simple `cat <file>` support
    let out: string;
    if (cmd.startsWith("cat ")) {
      const key = cmd.slice(4).trim();
      const v = COMMANDS[key];
      out = v == null ? `cat: ${key}: No such file` : typeof v === "function" ? v() : v;
    } else {
      const v = COMMANDS[cmd];
      out = v == null ? `command not found: ${cmd} — try 'help'` : typeof v === "function" ? v() : v;
    }
    setLines((prev) => [...prev, { kind: "in", text: raw }, { kind: "out", text: out }]);
    if (cmd === "resume") window.open(PROFILE.resume, "_blank");
    if (cmd === "github") window.open(PROFILE.github, "_blank");
  };

  return (
    <Section id="terminal" eyebrow="Terminal" title="Explore via terminal" subtitle="For the devs — try 'help' to begin.">
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
        className="glass overflow-hidden rounded-2xl"
      >
        <div className="flex items-center gap-2 border-b border-white/[0.08] bg-white/[0.03] px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-red-500/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <span className="h-3 w-3 rounded-full bg-green-500/70" />
          <span className="ml-3 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <TermIcon size={12} /> prince@portfolio ~ %
          </span>
        </div>
        <div ref={scrollRef} className="max-h-80 overflow-auto p-4 font-mono text-sm">
          {lines.map((l, i) => (
            <div key={i} className={l.kind === "in" ? "text-accent-cyan" : "text-foreground/85 whitespace-pre-wrap"}>
              {l.kind === "in" ? `➜ ${l.text}` : l.text}
            </div>
          ))}
          <form
            onSubmit={(e) => { e.preventDefault(); run(value); setValue(""); }}
            className="mt-2 flex items-center gap-2"
          >
            <span className="text-accent-cyan">➜</span>
            <input
              value={value} onChange={(e) => setValue(e.target.value)}
              autoComplete="off" spellCheck={false}
              className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground/60"
              placeholder="type a command (help, about, projects…)"
            />
          </form>
        </div>
      </motion.div>
    </Section>
  );
}
