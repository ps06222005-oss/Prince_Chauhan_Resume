import { GraduationCap, MapPin, Compass, ArrowDownRight, Sparkles } from "lucide-react";
import { ScrollReveal, StaggerRevealGroup, StaggerRevealItem } from "./ScrollReveal";

/**
 * About — Arctic Minimal Editorial Profile & Engineering Manifesto
 *
 * Supports Arctic Minimal Light and Dark Liquid Glass design systems.
 * - Sunderdeep Global University (B.Tech CSE AI & ML, 2024–2028, Ghaziabad / Delhi NCR)
 * - Chronological development milestones
 */
export function About() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="about"
      aria-label="About Prince Chauhan"
      className="relative w-full overflow-hidden bg-background text-foreground border-t border-border"
    >
      {/* =========================================================================
          QUIET EDITORIAL PAUSE: PHILOSOPHICAL TENET
          ========================================================================= */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-b border-border">
        <ScrollReveal direction="up" distance={28} duration={0.7} className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] text-primary tracking-widest uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />
            <span>CORE PHILOSOPHY</span>
          </div>

          <blockquote className="font-display font-light text-2xl sm:text-4xl md:text-5xl text-foreground leading-[1.2] tracking-tight">
            “Software is the rigorous translation of{" "}
            <span className="font-serif italic font-normal text-gradient-chrome">
              human curiosity
            </span>{" "}
            into autonomous digital capability.”
          </blockquote>

          <div className="pt-2 font-mono text-[11px] text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="text-foreground font-semibold">PRINCE CHAUHAN</span>
            <span className="text-border">/</span>
            <span>SUNDERDEEP GLOBAL UNIVERSITY</span>
            <span className="text-border">/</span>
            <span className="text-accent font-medium">B.Tech CSE (AI &amp; ML) · 2024–2028</span>
          </div>
        </ScrollReveal>
      </div>

      {/* =========================================================================
          EDITORIAL BIOGRAPHY & CHRONOLOGICAL PROGRESSION
          ========================================================================= */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 space-y-16 sm:space-y-20">
        {/* Section Title */}
        <ScrollReveal direction="up" distance={24} className="space-y-3">
          <div className="space-y-1">
            <div className="font-mono text-xs text-primary tracking-widest uppercase">
              PROFILE &amp; BACKGROUND
            </div>
            <p className="font-sans text-xs text-muted-foreground">
              Academic Training, Engineering Manifesto &amp; First-Principles Thinking
            </p>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-[-0.035em] text-foreground">
            Driven by curiosity. <br />
            <span className="text-gradient-chrome">Grounded in code.</span>
          </h2>
        </ScrollReveal>

        {/* Asymmetric Publication Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Core Narrative */}
          <ScrollReveal
            direction="up"
            distance={28}
            delay={0.08}
            className="lg:col-span-6 space-y-6 text-foreground/85 font-sans text-base sm:text-lg leading-relaxed font-light"
          >
            <p>
              I am an undergraduate engineer pursuing a Bachelor of Technology in Computer Science
              &amp; Engineering with specialization in Artificial Intelligence &amp; Machine
              Learning at Sunderdeep Global University in Ghaziabad, India.
            </p>

            <p>
              My work focuses on building software from first principles—demystifying autonomous
              intelligence, low-latency audio pipelines, and modern web architectures rather than
              simply consuming opaque abstractions.
            </p>

            <p className="text-muted-foreground text-base">
              This approach guided the development of{" "}
              <strong className="text-foreground font-medium">JARVIS</strong>, an autonomous desktop
              assistant engineered in Python with dynamic ambient energy threshold calibration, and{" "}
              <strong className="text-foreground font-medium">OnlineStream</strong>, a responsive
              media streaming web application deployed on high-performance edge infrastructure.
            </p>

            {/* Architectural Discipline Note */}
            <div className="border-l-2 border-primary pl-5 py-3.5 font-mono text-xs text-muted-foreground space-y-1.5 bg-card rounded-r-xl border-y border-r border-border shadow-sm">
              <div className="text-primary font-semibold uppercase tracking-wider">
                ENGINEERING MINDSET
              </div>
              <p className="font-sans text-xs text-foreground/80 leading-relaxed">
                Understand the audio buffer, the token stream, memory lifecycles, and network
                packets before orchestrating higher-level frameworks.
              </p>
            </div>
          </ScrollReveal>

          {/* Right Column: Academic Credentials & Chronology */}
          <div className="lg:col-span-6 space-y-10">
            {/* Academic Credential Card */}
            <ScrollReveal
              direction="up"
              distance={28}
              delay={0.16}
              className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4 shadow-md"
            >
              <div className="font-mono text-xs text-accent font-semibold tracking-wider flex items-center gap-2">
                <GraduationCap size={16} />
                <span>ACADEMIC FOUNDATION</span>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground">
                  Bachelor of Technology (B.Tech)
                </h3>
                <div className="font-mono text-xs sm:text-sm text-primary font-medium">
                  Computer Science &amp; Engineering (Artificial Intelligence &amp; Machine
                  Learning)
                </div>
                <div className="font-sans text-xs text-muted-foreground pt-1">
                  Sunderdeep Global University · Ghaziabad, Uttar Pradesh, India
                </div>
                <div className="font-mono text-xs text-muted-foreground/80">
                  Expected Graduation: 2028 · Currently Enrolled (2024–2028)
                </div>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-3 font-mono text-xs text-muted-foreground border-t border-border">
                <div className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-accent" />
                  <span>Delhi NCR Region</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Compass size={13} className="text-primary" />
                  <span>Open to Relocation &amp; Remote</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Chronological Milestones */}
            <div className="space-y-6">
              <ScrollReveal
                direction="up"
                distance={18}
                delay={0.2}
                className="font-mono text-xs uppercase tracking-widest text-primary font-semibold flex items-center gap-2"
              >
                <Sparkles size={14} />
                <span>CHRONOLOGICAL PROGRESSION</span>
              </ScrollReveal>

              <StaggerRevealGroup
                staggerChildren={0.12}
                delayChildren={0.15}
                className="space-y-6 border-l border-border pl-5 ml-1"
              >
                {/* 2024 */}
                <StaggerRevealItem className="relative space-y-1">
                  <span className="absolute -left-[25px] top-1.5 h-2 w-2 rounded-full bg-primary ring-4 ring-background" />
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-primary text-xs">2024</span>
                    <span className="text-border">—</span>
                    <span className="text-foreground font-medium text-sm">
                      Foundational Computation &amp; DecodeLabs
                    </span>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                    Commenced B.Tech in CSE (AI &amp; ML). Deepened knowledge in Python, data
                    structures, algorithms, and completed core software tasks in DecodeLabs
                    technical internship.
                  </p>
                </StaggerRevealItem>

                {/* 2025 */}
                <StaggerRevealItem className="relative space-y-1">
                  <span className="absolute -left-[25px] top-1.5 h-2 w-2 rounded-full bg-accent ring-4 ring-background" />
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-accent text-xs">2025</span>
                    <span className="text-border">—</span>
                    <span className="text-foreground font-medium text-sm">
                      JARVIS Voice Assistant &amp; OnlineStream
                    </span>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                    Engineered JARVIS voice assistant with dynamic ambient energy calibration in
                    Python, and deployed OnlineStream media streaming interface on edge
                    infrastructure.
                  </p>
                </StaggerRevealItem>

                {/* 2026 */}
                <StaggerRevealItem className="relative space-y-1">
                  <span className="absolute -left-[25px] top-1.5 h-2 w-2 rounded-full bg-primary ring-4 ring-background shadow-[0_0_8px_currentColor]" />
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-primary text-xs">2026</span>
                    <span className="text-border">—</span>
                    <span className="text-foreground font-medium text-sm">
                      Autonomous Agents &amp; Spatial Software
                    </span>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                    Exploring local Small Language Model (SLM) orchestration, real-time voice
                    pipelines, and high-craft creative technology web applications. Actively seeking
                    software engineering &amp; AI internship opportunities.
                  </p>
                </StaggerRevealItem>
              </StaggerRevealGroup>
            </div>
          </div>
        </div>

        {/* Section Transition */}
        <ScrollReveal
          direction="up"
          distance={16}
          delay={0.1}
          className="pt-8 border-t border-border flex items-center justify-between font-mono text-xs text-muted-foreground"
        >
          <button
            type="button"
            onClick={() => scrollTo("projects")}
            className="min-h-[44px] group inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors cursor-pointer px-2 rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            <span>VIEW FEATURED PROJECTS</span>
            <ArrowDownRight
              size={14}
              className="text-primary transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
            />
          </button>
          <span className="hidden sm:inline text-muted-foreground/60">CANONICAL SYSTEMS</span>
        </ScrollReveal>
      </div>
    </section>
  );
}
