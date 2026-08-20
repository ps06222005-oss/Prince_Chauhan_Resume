import { motion } from "framer-motion";
import { Zap, Puzzle, Hammer, Briefcase } from "lucide-react";
import { Section } from "./Section";

const cards = [
  { icon: Zap, title: "Quick Learner", text: "I pick up new tools and concepts fast by breaking them into small experiments." },
  { icon: Puzzle, title: "Problem Solver", text: "I enjoy debugging and turning fuzzy requirements into working solutions." },
  { icon: Hammer, title: "Project-Based Learning", text: "I learn by shipping — every skill on this page came from building something with it." },
  { icon: Briefcase, title: "Open to Internships", text: "Actively looking for SDE and AI/ML internships to contribute and grow." },
];

export function WhyHireMe() {
  return (
    <Section id="why" eyebrow="Why Hire Me" title="What I bring to a team" subtitle="Honest strengths I've built while learning.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="glass group relative overflow-hidden rounded-2xl p-6 hover:border-accent-blue/40 transition-colors"
          >
            <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-40" style={{ background: "var(--gradient-primary)" }} />
            <span className="relative grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary/20 text-accent-cyan ring-1 ring-white/[0.08]">
              <c.icon size={20} />
            </span>
            <h3 className="relative mt-4 font-semibold">{c.title}</h3>
            <p className="relative mt-2 text-sm text-muted-foreground leading-relaxed">{c.text}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
