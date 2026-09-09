import { motion } from "framer-motion";
import { GraduationCap, MapPin, CalendarDays, BookOpen, CheckCircle2 } from "lucide-react";
import { Section } from "./Section";

const items = [
  {
    degree: "Bachelor of Technology in Computer Science & Engineering",
    specialization: "Specialization in Artificial Intelligence & Machine Learning",
    school: "Sunderdeep Global University",
    location: "Ghaziabad, Uttar Pradesh, India",
    period: "2024 — Expected 2028",
    status: "Undergraduate Candidate",
    highlights: [
      "Core Curriculum: Data Structures & Algorithms, Discrete Mathematics, DBMS, Computer Architecture",
      "Applied Disciplines: Object-Oriented Programming (C/Python), Operating Systems, Software Engineering",
      "Hands-on Lab Work: Systems programming, algorithmic optimization, and collaborative git projects",
    ],
  },
];

export function Education() {
  return (
    <Section
      id="education"
      eyebrow="Institutional Rigor"
      title="Academic education & engineering curriculum."
      subtitle="Formal university engineering foundation grounding theory in systems software and computation."
      accent="violet"
    >
      <div className="relative max-w-4xl mx-auto">
        {items.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            className="group rounded-3xl border border-purple-500/20 bg-gradient-to-b from-purple-500/[0.03] via-white/[0.015] to-black/40 p-6 sm:p-10 shadow-[0_20px_40px_-20px_oklch(0.74_0.09_300/0.1)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-5">
              <div className="flex items-center gap-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300">
                  <GraduationCap size={20} />
                </span>
                <div>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-purple-300">
                    {e.status}
                  </span>
                  <p className="font-mono text-xs text-muted-foreground">{e.period}</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground/80">
                <MapPin size={12} className="text-purple-400" />
                {e.location}
              </span>
            </div>

            <div className="mt-6 space-y-2">
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                {e.degree}
              </h3>
              <p className="font-mono text-sm text-purple-300">{e.specialization}</p>
              <p className="text-sm text-muted-foreground pt-1">{e.school}</p>
            </div>

            <div className="mt-6 pt-5 border-t border-white/[0.06]">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <BookOpen size={13} className="text-purple-400" />
                <span>Curricular Focus &amp; Competencies</span>
              </p>
              <ul className="space-y-2 font-mono text-xs">
                {e.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-muted-foreground/90">
                    <CheckCircle2 size={13} className="mt-0.5 text-purple-400 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
