import { motion } from "framer-motion";
import { GraduationCap, MapPin, CalendarDays } from "lucide-react";
import { Section } from "./Section";

const items = [
  {
    degree: "B.Tech, Computer Science Engineering",
    specialization: "Artificial Intelligence & Machine Learning",
    school: "Sunderdeep Global University",
    period: "Expected 2028",
    status: "In progress",
  },
];

export function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title="Academic journey"
      subtitle="Foundational learning across CS and AI/ML."
    >
      <div className="relative">
        <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue/50 via-accent-blue/20 to-transparent" />
        {items.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            className="relative pl-14 sm:pl-20"
          >
            <span className="absolute left-0 top-2 grid h-9 w-9 sm:h-12 sm:w-12 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-lg">
              <GraduationCap size={16} />
            </span>
            <div className="glass rounded-2xl p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-accent-blue/15 px-2.5 py-0.5 text-xs text-accent-cyan">
                  {e.status}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <CalendarDays size={12} /> {e.period}
                </span>
              </div>
              <h3 className="mt-3 text-xl font-bold">{e.degree}</h3>
              <p className="mt-1 text-accent-cyan">{e.specialization}</p>
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin size={13} /> {e.school}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
