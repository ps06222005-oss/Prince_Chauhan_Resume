import { GraduationCap, MapPin, Compass, ArrowDownRight, Sparkles } from "lucide-react";

/**
 * About — Luxury Editorial Profile & Engineering Manifesto
 *
 * Visual System: BLACK + CHROME + IVORY + ULTRAVIOLET
 * Editorial layout inspired by architectural monographs and design studios:
 * - High-contrast editorial typography with generous negative space
 * - Grounded strictly in real academic and technical facts
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
      className="relative w-full overflow-hidden bg-[#08090c] text-white border-t border-white/[0.08]"
    >
      {/* =========================================================================
          QUIET EDITORIAL PAUSE: PHILOSOPHICAL TENET
          Spacious, contemplative typographic statement in deep carbon space.
          ========================================================================= */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 border-b border-white/[0.06]">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] text-violet-400 tracking-widest uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
            <span>CORE PHILOSOPHY</span>
          </div>

          <blockquote className="font-display font-light text-2xl sm:text-4xl md:text-5xl text-white/95 leading-[1.2] tracking-tight">
            “Software is the rigorous translation of{" "}
            <span className="font-serif italic font-normal text-gradient-chrome">
              human curiosity
            </span>{" "}
            into autonomous digital capability.”
          </blockquote>

          <div className="pt-2 font-mono text-[11px] text-white/40 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="text-white/70">PRINCE CHAUHAN</span>
            <span className="text-white/20">/</span>
            <span>SUNDERDEEP GLOBAL UNIVERSITY</span>
            <span className="text-white/20">/</span>
            <span>B.TECH CSE (AI &amp; ML) · 2024–2028</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          EDITORIAL BIOGRAPHY & CHRONOLOGICAL PROGRESSION
          Asymmetric spread with refined typography, academic credentials, and milestones.
          ========================================================================= */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32 space-y-20">
        {/* Section Title */}
        <div className="space-y-3">
          <div className="font-mono text-xs text-violet-400 tracking-widest uppercase">
            PROFILE &amp; BACKGROUND
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] text-white">
            Driven by curiosity. <br />
            <span className="text-gradient-chrome">Grounded in code.</span>
          </h2>
        </div>

        {/* Asymmetric Publication Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Core Narrative */}
          <div className="lg:col-span-6 space-y-6 text-white/80 font-sans text-base sm:text-lg leading-relaxed font-light">
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

            <p className="text-white/70 text-base">
              This approach guided the development of{" "}
              <strong className="text-white font-medium">JARVIS</strong>, an autonomous desktop
              assistant engineered in Python with dynamic ambient energy threshold calibration, and{" "}
              <strong className="text-white font-medium">OnlineStream</strong>, a responsive media
              streaming web application deployed on high-performance edge infrastructure.
            </p>

            {/* Architectural Discipline Note */}
            <div className="border-l-2 border-violet-500/50 pl-5 py-2 font-mono text-xs text-white/60 space-y-1 bg-white/[0.01]">
              <div className="text-violet-300 font-semibold uppercase tracking-wider">
                ENGINEERING MINDSET
              </div>
              <p className="font-sans text-xs text-white/70">
                Understand the audio buffer, the token stream, memory lifecycles, and network
                packets before orchestrating higher-level frameworks.
              </p>
            </div>
          </div>

          {/* Right Column: Academic Credentials & Chronology */}
          <div className="lg:col-span-6 space-y-10">
            {/* Academic Credential Card */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0e1017] p-6 sm:p-8 space-y-4">
              <div className="font-mono text-xs text-violet-400 font-medium tracking-wider flex items-center gap-2">
                <GraduationCap size={16} />
                <span>ACADEMIC FOUNDATION</span>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                  Bachelor of Technology (B.Tech)
                </h3>
                <div className="font-mono text-xs sm:text-sm text-violet-300">
                  Computer Science &amp; Engineering (Artificial Intelligence &amp; Machine
                  Learning)
                </div>
                <div className="font-sans text-xs text-white/50 pt-1">
                  Sunderdeep Global University · Ghaziabad, Uttar Pradesh, India
                </div>
                <div className="font-mono text-xs text-white/40">
                  Expected Graduation: 2028 · Currently Enrolled (2024–2028)
                </div>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 font-mono text-xs text-white/60 border-t border-white/[0.06]">
                <div className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-violet-400" />
                  <span>Delhi NCR Region</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Compass size={13} className="text-violet-400" />
                  <span>Open to Relocation &amp; Remote</span>
                </div>
              </div>
            </div>

            {/* Chronological Milestones */}
            <div className="space-y-6">
              <div className="font-mono text-xs uppercase tracking-widest text-violet-400 font-medium flex items-center gap-2">
                <Sparkles size={14} />
                <span>CHRONOLOGICAL PROGRESSION</span>
              </div>

              <div className="space-y-6 border-l border-white/[0.1] pl-5 ml-1">
                {/* 2024 */}
                <div className="relative space-y-1">
                  <span className="absolute -left-[25px] top-1.5 h-2 w-2 rounded-full bg-violet-400 ring-4 ring-[#08090c]" />
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-violet-400 text-xs">2024</span>
                    <span className="text-white/30">—</span>
                    <span className="text-white font-medium text-sm">
                      Foundational Computation &amp; DecodeLabs
                    </span>
                  </div>
                  <p className="font-sans text-xs text-white/65 leading-relaxed">
                    Commenced B.Tech in CSE (AI &amp; ML). Deepened knowledge in Python, data
                    structures, algorithms, and completed core software tasks in DecodeLabs
                    technical internship.
                  </p>
                </div>

                {/* 2025 */}
                <div className="relative space-y-1">
                  <span className="absolute -left-[25px] top-1.5 h-2 w-2 rounded-full bg-violet-400 ring-4 ring-[#08090c]" />
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-violet-400 text-xs">2025</span>
                    <span className="text-white/30">—</span>
                    <span className="text-white font-medium text-sm">
                      JARVIS Voice Assistant &amp; OnlineStream
                    </span>
                  </div>
                  <p className="font-sans text-xs text-white/65 leading-relaxed">
                    Engineered JARVIS voice assistant with dynamic ambient energy calibration in
                    Python, and deployed OnlineStream media streaming interface on edge
                    infrastructure.
                  </p>
                </div>

                {/* 2026 */}
                <div className="relative space-y-1">
                  <span className="absolute -left-[25px] top-1.5 h-2 w-2 rounded-full bg-sky-400 ring-4 ring-[#08090c]" />
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-sky-400 text-xs">2026</span>
                    <span className="text-white/30">—</span>
                    <span className="text-white font-medium text-sm">
                      Autonomous Agents &amp; Spatial Software
                    </span>
                  </div>
                  <p className="font-sans text-xs text-white/65 leading-relaxed">
                    Exploring local Small Language Model (SLM) orchestration, real-time voice
                    pipelines, and high-craft creative technology web applications. Actively seeking
                    software engineering &amp; AI internship opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Transition */}
        <div className="pt-8 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs text-white/40">
          <button
            type="button"
            onClick={() => scrollTo("projects")}
            className="group flex items-center gap-2 text-white/70 hover:text-violet-300 transition-colors cursor-pointer"
          >
            <span>VIEW FEATURED PROJECTS</span>
            <ArrowDownRight
              size={14}
              className="text-violet-400 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
            />
          </button>
          <span className="hidden sm:inline text-white/30">CANONICAL SYSTEMS</span>
        </div>
      </div>
    </section>
  );
}
