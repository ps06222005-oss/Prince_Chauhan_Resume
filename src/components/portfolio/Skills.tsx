import { motion } from "framer-motion";
import {
  Code, Braces, FileCode2, Palette,
  Database, Globe, Mic, Volume2,
  Terminal, GitBranch, Github as GithubIcon, Cloud, BookOpen, MessageSquare,
  Brain, Languages, Boxes, Server, Network, ListTree,
} from "lucide-react";
import { Section } from "./Section";

type Skill = { name: string; icon: React.ComponentType<{ size?: number }>; level?: string };

const groups: { title: string; items: Skill[] }[] = [
  {
    title: "Programming",
    items: [
      { name: "Python", icon: Code, level: "Learning & Project Experience" },
      { name: "C", icon: Braces, level: "Basic" },
      { name: "HTML", icon: FileCode2 },
      { name: "CSS", icon: Palette },
    ],
  },
  {
    title: "Libraries",
    items: [
      { name: "SpeechRecognition", icon: Mic },
      { name: "pyttsx3", icon: Volume2 },
      { name: "Pandas", icon: Database, level: "Basic" },
      { name: "Requests", icon: Globe },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "VS Code", icon: Terminal },
      { name: "Git", icon: GitBranch },
      { name: "GitHub", icon: GithubIcon },
      { name: "Google Colab", icon: Cloud },
      { name: "Jupyter Notebook", icon: BookOpen },
      { name: "ChatGPT", icon: MessageSquare },
    ],
  },
  {
    title: "Concepts",
    items: [
      { name: "ML Basics", icon: Brain },
      { name: "NLP Basics", icon: Languages },
      { name: "OOP", icon: Boxes },
      { name: "DBMS Basics", icon: Server },
      { name: "Computer Networks", icon: Network },
      { name: "Data Structures", icon: ListTree },
    ],
  },
];

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Tools I use & things I'm learning"
      subtitle="An honest snapshot of my current toolkit."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {groups.map((g, gi) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: gi * 0.08 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold">{g.title}</h3>
              <span className="text-xs text-muted-foreground">{g.items.length} items</span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {g.items.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="group rounded-xl border border-white/5 bg-white/[0.02] p-3 hover:border-accent-blue/40 hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-primary/15 text-accent-cyan">
                      <s.icon size={14} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{s.name}</p>
                      {s.level && <p className="text-[10px] uppercase tracking-wider text-muted-foreground truncate">{s.level}</p>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
