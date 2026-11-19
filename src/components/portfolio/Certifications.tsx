import { GraduationCap, ShieldCheck, BookOpen, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { ScrollReveal, StaggerRevealGroup, StaggerRevealItem } from "./ScrollReveal";

/**
 * Certifications & Academic Credentials — Arctic Minimal Design System
 *
 * Supports Light and Dark Liquid Glass design systems.
 * - Bachelor of Technology in Computer Science & Engineering (AI & ML)
 * - Sunderdeep Global University (2024–2028), Ghaziabad / Delhi NCR
 * - Core Academic Competencies
 */

const CORE_MODULES = [
  "Data Structures & Algorithms",
  "Design & Analysis of Algorithms",
  "Operating Systems & Architecture",
  "Object-Oriented Programming (Python/C++)",
  "Discrete Mathematics & Logic",
  "Linear Algebra & Probability",
  "Foundations of Machine Learning",
  "Database Management Systems",
];

export function Certifications() {
  return (
    <section
      id="certifications"
      aria-label="Academic Degree and Credentials"
      className="relative w-full overflow-hidden bg-background text-foreground py-20 sm:py-28 lg:py-36 border-t border-border"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <ScrollReveal
          direction="up"
          distance={24}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border pb-8"
        >
          <div className="space-y-3 max-w-3xl">
            <div className="space-y-1">
              <div className="font-mono text-xs text-primary tracking-widest uppercase">
                ACADEMIC DEGREE &amp; CREDENTIALS
              </div>
              <p className="font-sans text-xs text-muted-foreground">
                Formal Higher Education, Coursework Disciplines &amp; Verifiable Academic Record
              </p>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-[-0.035em] text-foreground">
              Institutional Rigor. <br />
              <span className="text-gradient-chrome">Academic Foundation.</span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
              Transparent, dignified documentation of university education and academic coursework.
              Integrity built strictly through verifiable facts.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-primary bg-card px-4 py-2 rounded-full border border-border shadow-sm">
            <GraduationCap size={14} className="text-primary" />
            <span>ACADEMIC ENROLLMENT (2024–2028)</span>
          </div>
        </ScrollReveal>

        {/* Primary Formal Academic Credential */}
        <ScrollReveal
          direction="up"
          distance={30}
          delay={0.08}
          className="rounded-3xl border border-border bg-card p-8 sm:p-12 relative overflow-hidden shadow-md"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-2 font-mono text-xs text-accent font-semibold uppercase tracking-wider">
                <GraduationCap size={16} />
                <span>FORMAL UNIVERSITY DEGREE</span>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-2xl sm:text-4xl text-foreground">
                  Bachelor of Technology (B.Tech)
                </h3>
                <div className="font-mono text-base text-primary font-medium">
                  Computer Science &amp; Engineering (Artificial Intelligence &amp; Machine
                  Learning)
                </div>
              </div>

              <p className="font-sans text-base text-muted-foreground leading-relaxed font-light max-w-2xl">
                4-year undergraduate curriculum at Sunderdeep Global University. Comprehensive
                computational coursework covering discrete mathematics, algorithmic problem solving,
                software engineering principles, and core artificial intelligence architectures.
              </p>

              {/* Core Coursework Grid */}
              <div className="space-y-3 pt-2">
                <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <BookOpen size={13} className="text-accent" />
                  <span>CORE COURSEWORK &amp; DISCIPLINES</span>
                </div>
                <StaggerRevealGroup
                  staggerChildren={0.06}
                  delayChildren={0.12}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
                >
                  {CORE_MODULES.map((mod) => (
                    <StaggerRevealItem
                      key={mod}
                      distance={14}
                      className="flex items-center gap-2 text-xs font-mono text-foreground/80 bg-secondary/40 border border-border px-3.5 py-2.5 rounded-lg"
                    >
                      <CheckCircle2 size={13} className="text-primary shrink-0" />
                      <span>{mod}</span>
                    </StaggerRevealItem>
                  ))}
                </StaggerRevealGroup>
              </div>
            </div>

            {/* University Metadata Side Panel */}
            <ScrollReveal
              direction="left"
              distance={24}
              delay={0.18}
              className="lg:col-span-4 p-6 sm:p-8 rounded-2xl border border-border bg-surface space-y-5 font-mono text-xs shadow-sm"
            >
              <div className="space-y-1 border-b border-border pb-4">
                <div className="text-muted-foreground uppercase text-[10px]">Institution</div>
                <div className="text-foreground font-bold text-sm">
                  Sunderdeep Global University
                </div>
                <div className="text-muted-foreground text-xs flex items-center gap-1.5 mt-1">
                  <MapPin size={12} className="text-primary" />
                  <span>Ghaziabad, Uttar Pradesh, India</span>
                </div>
              </div>

              <div className="space-y-1 border-b border-border pb-4">
                <div className="text-muted-foreground uppercase text-[10px]">Program Duration</div>
                <div className="text-foreground font-bold text-sm">
                  2024 — 2028 (Currently Enrolled)
                </div>
                <div className="text-muted-foreground text-xs flex items-center gap-1.5 mt-1">
                  <Calendar size={12} className="text-accent" />
                  <span>4-Year Full-Time B.Tech Degree</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-muted-foreground uppercase text-[10px]">
                  Certification Audit Status
                </div>
                <div className="text-accent font-semibold text-xs leading-relaxed">
                  In adherence to engineering authenticity, industry certifications will be added
                  upon official issuance and verification.
                </div>
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
