import { motion } from "framer-motion";
import { Trophy, Github, Users, Presentation } from "lucide-react";
import { Section } from "./Section";

const items = [
  {
    icon: Trophy,
    title: "Guinness World Record Participant",
    text: "Took part in the 'AI For All' Guinness World Record initiative.",
  },
  {
    icon: Github,
    title: "Published JARVIS on GitHub",
    text: "Open-sourced my Python voice assistant for others to explore and learn from.",
  },
  {
    icon: Users,
    title: "Computer Club Member",
    text: "Active member of the university's Computer Club community.",
  },
  {
    icon: Presentation,
    title: "AI/ML Workshops",
    text: "Participated in workshops focused on Machine Learning fundamentals.",
  },
];

export function Achievements() {
  return (
    <Section
      id="achievements"
      eyebrow="Achievements"
      title="Highlights & involvement"
      subtitle="Moments I'm proud of on the way up."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {items.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass rounded-2xl p-6 hover:border-accent-blue/30 transition-colors"
          >
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-primary/20 text-accent-cyan">
                <a.icon size={18} />
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold">{a.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{a.text}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
