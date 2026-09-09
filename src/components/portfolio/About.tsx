import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function About() {
  const containerRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Choreographed typography tracking transition (Section 9)
  const letterSpacing = useTransform(
    scrollYProgress,
    [0.1, 0.45, 0.8],
    ["0.15em", "0.45em", "0.2em"],
  );
  const textScale = useTransform(scrollYProgress, [0.15, 0.5], [0.96, 1]);
  const statementY = useTransform(scrollYProgress, [0.15, 0.55], [40, 0]);

  return (
    <section
      ref={containerRef}
      id="about"
      aria-label="Identity Manifesto"
      className="relative min-h-[90vh] w-full overflow-hidden bg-[#060709] py-28 sm:py-40 border-t border-white/[0.05]"
    >
      {/* Visual Silence Atmosphere — background slows down, deep obsidian void */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,158,11,0.03)_0%,_transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6">
        {/* Kinetic Chapter Transition — Letters separate then settle */}
        <div className="border-b border-white/[0.06] pb-6 flex items-center justify-between">
          <motion.div
            style={{ letterSpacing: shouldReduceMotion ? "0.2em" : letterSpacing }}
            className="font-mono text-xs uppercase text-amber-400 font-semibold select-none"
          >
            01 // A · B · O · U · T
          </motion.div>
          <span className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-widest hidden sm:inline">
            IDENTITY MANIFESTO
          </span>
        </div>

        {/* Section 10: One Strong Editorial Human Statement */}
        <div className="py-20 sm:py-32 max-w-5xl">
          <motion.h2
            style={{
              scale: shouldReduceMotion ? 1 : textScale,
              y: shouldReduceMotion ? 0 : statementY,
            }}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-[-0.04em] text-[#f4f4f2] leading-[1.04]"
          >
            I build intelligent systems that turn{" "}
            <span className="font-bold text-white underline decoration-amber-400/40 underline-offset-8">
              complex acoustic &amp; mathematical models
            </span>{" "}
            into deterministic software.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 sm:mt-16 grid grid-cols-1 gap-10 md:grid-cols-12"
          >
            <div className="md:col-span-4 font-mono text-xs text-amber-400/90 uppercase tracking-wider space-y-2">
              <div>SUNDERDEEP GLOBAL UNIVERSITY</div>
              <div className="text-muted-foreground/60">B.TECH CSE (AI &amp; ML) · 2024–2028</div>
              <div className="text-muted-foreground/60">GHAZIABAD, DELHI NCR</div>
            </div>

            <div className="md:col-span-8 space-y-6 font-sans text-lg sm:text-xl text-muted-foreground/90 leading-relaxed font-light">
              <p>
                Software should not merely react; it should anticipate, interpret noisy acoustic
                inputs, and execute with precision. Rather than treating artificial intelligence as
                an opaque black box, I approach it as an engineering discipline grounded in memory
                safety, asymptotic bounds, and high-craft reactive interfaces.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground/70">
                From offline voice-driven operating system control in Python to GPU-accelerated
                spatial shaders in TypeScript, my work balances foundational computational rigor
                with refined sensory craft.
              </p>
            </div>
          </motion.div>
        </div>

        {/* 3 Core Grounded Realities — Pure Typographic Layout without AI Card Boxes */}
        <div className="grid grid-cols-1 gap-12 sm:gap-16 lg:grid-cols-3 border-t border-white/[0.06] pt-14 sm:pt-18 font-mono">
          <div className="space-y-3">
            <div className="text-xs text-amber-400 font-semibold tracking-wider">
              01 // ALGORITHMIC FOUNDATIONS
            </div>
            <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
              Formally grounded in discrete mathematics, C memory primitives, relational schemas,
              and asymptotic computational bounds at Sunderdeep Global University.
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-xs text-accent-cyan font-semibold tracking-wider">
              02 // AUTONOMOUS VOICE ENGINES
            </div>
            <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
              Pioneering acoustic signal processing, dynamic microphone ambient noise calibration,
              lexical intent dispatchers, and offline voice synthesis in Python.
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-xs text-[#f4f4f2] font-semibold tracking-wider">
              03 // LIVING INTERFACES
            </div>
            <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
              Refusing to separate engineering truth from visual sophistication. Creating type-safe
              reactive architectures with procedural WebGL shaders that feel alive.
            </p>
          </div>
        </div>

        {/* Bottom Coordinates & Direct Artifact Conduit */}
        <div className="mt-20 sm:mt-28 flex flex-wrap items-center justify-between gap-6 border-t border-white/[0.06] pt-6 font-mono text-xs text-muted-foreground/70">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>OPEN TO 2025/2026 AI/ML &amp; SYSTEMS INTERNSHIPS</span>
          </div>

          <a
            href="https://github.com/ps06222005-oss"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-foreground hover:text-amber-300 transition-colors group"
          >
            <span>VIEW VERIFIED REPOSITORIES</span>
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
