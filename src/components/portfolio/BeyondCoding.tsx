import { motion } from "framer-motion";
import { Section } from "./Section";
import {
  Music, Gamepad2, BookOpen, Dumbbell, Youtube, Coffee,
  Target, Sparkles, Lightbulb,
} from "lucide-react";

const interests = [
  { icon: Music, label: "Music while coding" },
  { icon: Gamepad2, label: "Casual gaming" },
  { icon: BookOpen, label: "Tech blogs & docs" },
  { icon: Youtube, label: "Dev YouTube deep-dives" },
  { icon: Dumbbell, label: "Evening workouts" },
  { icon: Coffee, label: "Late-night debugging" },
];

const learningNow = [
  "React fundamentals & hooks",
  "JavaScript (ES6+)",
  "Python for automation",
  "Git & GitHub workflows",
];

const goals = [
  "Land a software / AI-ML internship",
  "Ship one polished project every semester",
  "Contribute to an open-source repo",
  "Get comfortable with DSA in Python",
];

const funFacts = [
  "My first real project was a voice assistant — I named it JARVIS.",
  "I learn best by breaking things, then reading the error message twice.",
  "I keep a running notes file of every bug that once confused me.",
  "Try the Konami code on this page. 🎮",
];

export function BeyondCoding() {
  return (
    <Section
      id="beyond"
      eyebrow="Beyond Coding"
      title="The person behind the commits"
      subtitle="A little context on how I spend my time and where I'm heading."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="glass hover-lift rounded-3xl p-7 lg:col-span-2"
        >
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <Sparkles size={18} className="text-primary" /> Interests &amp; hobbies
          </h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {interests.map((it) => (
              <li
                key={it.label}
                className="group flex items-center gap-3 rounded-2xl border border-border bg-background/60 px-4 py-3 transition-all hover:border-primary/30 hover:bg-primary/[0.04]"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <it.icon size={16} />
                </span>
                <span className="text-sm text-foreground/85">{it.label}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Learning now */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="glass hover-lift rounded-3xl p-7"
        >
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <Lightbulb size={18} className="text-primary" /> Learning now
          </h3>
          <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
            {learningNow.map((l) => (
              <li key={l} className="flex gap-2">
                <span className="text-primary" aria-hidden>▹</span>
                {l}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Goals */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="glass hover-lift rounded-3xl p-7"
        >
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <Target size={18} className="text-primary" /> Current goals
          </h3>
          <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
            {goals.map((g) => (
              <li key={g} className="flex gap-2">
                <span className="text-primary" aria-hidden>→</span>
                {g}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Fun facts */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="glass hover-lift rounded-3xl p-7 lg:col-span-2"
        >
          <h3 className="text-lg font-semibold">Fun facts</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {funFacts.map((f, i) => (
              <div
                key={f}
                className="rounded-2xl border border-border bg-background/60 p-4 text-sm leading-relaxed text-muted-foreground transition-colors hover:border-primary/30"
              >
                <span className="mr-2 font-display text-xs font-semibold text-primary">0{i + 1}</span>
                {f}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
