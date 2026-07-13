import { motion } from "framer-motion";
import { CheckCircle2, Loader, Target } from "lucide-react";
import { Section } from "./Section";

const phases = [
  {
    icon: CheckCircle2, title: "Completed", color: "text-green-400",
    items: ["Python Basics", "HTML", "CSS", "Git", "GitHub"],
  },
  {
    icon: Loader, title: "Currently Learning", color: "text-accent-cyan",
    items: ["Machine Learning", "React", "Data Structures", "APIs"],
  },
  {
    icon: Target, title: "Future Goals", color: "text-purple-400",
    items: ["Cloud Computing", "Generative AI", "System Design"],
  },
];

export function LearningJourney() {
  return (
    <Section id="journey" eyebrow="Learning Journey" title="My roadmap" subtitle="Where I've been, where I am, and where I'm heading.">
      <div className="relative grid gap-6 lg:grid-cols-3">
        {phases.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.12 }}
            className="glass relative rounded-2xl p-6"
          >
            <div className="flex items-center gap-3">
              <span className={`grid h-11 w-11 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 ${p.color}`}>
                <p.icon size={20} />
              </span>
              <h3 className="font-display text-lg font-semibold">{p.title}</h3>
            </div>
            <ul className="mt-5 space-y-2">
              {p.items.map((it, k) => (
                <motion.li
                  key={it}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.12 + k * 0.06 }}
                  className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-sm"
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${p.color.replace("text", "bg")}`} />
                  {it}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
