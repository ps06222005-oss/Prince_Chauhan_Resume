import { motion } from "framer-motion";
import { Award, BadgeCheck } from "lucide-react";
import { Section } from "./Section";

const certs = [
  { title: "AI For All", issuer: "Intel & CBSE Initiative", year: "2024" },
  { title: "Introduction to Python", issuer: "Online Coursework", year: "2024" },
  { title: "AI/ML Workshop Participation", issuer: "University Program", year: "2024" },
];

export function Certifications() {
  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      title="Credentials & coursework"
      subtitle="Learning tracks I've completed or participated in."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certs.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="glass relative overflow-hidden rounded-2xl p-6"
          >
            <div className="absolute right-4 top-4 text-accent-cyan/70">
              <BadgeCheck size={18} />
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary/20 text-accent-cyan">
              <Award size={20} />
            </div>
            <h3 className="mt-4 font-semibold leading-snug">{c.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.issuer}</p>
            <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">
              {c.year}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
