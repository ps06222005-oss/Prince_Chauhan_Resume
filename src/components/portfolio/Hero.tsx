import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { PROFILE } from "@/lib/portfolio-data";
import { RESUME_PATH, RESUME_FILENAME } from "@/lib/resume";
import { HeroArtifact } from "./HeroArtifact";
import { MagneticButton } from "./MagneticButton";

/**
 * Hero — Premium Gen-Z Creative Technology & AI Engineering Experience
 *
 * Visual System: BLACK + CHROME + IVORY + ULTRAVIOLET
 * Editorial composition inspired by Active Theory & Lusion:
 * - Controlled editorial typography: "PRINCE" in clean geometric display, "CHAUHAN" in high-contrast chrome
 * - Dedicated right-hand negative space for the physical 3D luxury sculpture (never collides)
 * - Mobile: Graceful vertical hierarchy (Header -> Typography -> 3D Sculpture -> Narrative & Actions)
 * - Luxury CTA buttons with thin borders, subtle ultraviolet luminescence, and tactile hover states
 * - Direct, verified PDF resume download
 */
export function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // Pointer tracking with RAF throttling
  useEffect(() => {
    if (shouldReduceMotion) return;
    const heroEl = heroRef.current;
    if (!heroEl) return;

    let rafId = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          setMousePos({ x, y });
          rafId = 0;
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [shouldReduceMotion]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={heroRef}
      id="home"
      aria-label="Prince Chauhan Hero"
      className="relative min-h-[100svh] w-full overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-12 select-none bg-[#08090c]"
    >
      {/* =========================================================================
          BACKGROUND: CARBON VOID & SUBTLE ULTRAVIOLET SPECULAR ATMOSPHERE
          ========================================================================= */}
      <motion.div
        style={{ y: backgroundY }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Soft Electric Ultraviolet Volumetric Glow */}
        <div className="absolute top-[10%] right-[12%] w-[26rem] sm:w-[42rem] lg:w-[54rem] h-[26rem] sm:h-[42rem] lg:h-[54rem] rounded-full opacity-20 blur-[140px] sm:blur-[180px] bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.35),rgba(109,40,217,0.15),transparent_70%)]" />

        {/* Subtle Slate / Cool Grey Depth Fill */}
        <div className="absolute -bottom-20 -left-20 w-[20rem] sm:w-[34rem] h-[20rem] sm:h-[34rem] rounded-full opacity-10 blur-[120px] bg-[radial-gradient(circle_at_center,rgba(148,163,184,0.25),transparent_70%)]" />

        {/* Delicate Architectural Precision Grid */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] sm:bg-[size:6rem_6rem]" />

        {/* Subtle Horizontal Horizon Divider */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
      </motion.div>

      {/* =========================================================================
          TOP METADATA STRIP: PURPOSEFUL CONTEXT & RECRUITER AVAILABILITY
          ========================================================================= */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-20 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-y-2 border-b border-white/[0.06] pb-3.5 font-mono text-[11px] text-white/50">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
            <span className="text-white/80 font-medium tracking-wider uppercase">
              AI / ML DEVELOPER × CREATIVE TECHNOLOGIST
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-white/60">
            <div className="flex items-center gap-1.5">
              <span className="text-violet-300 font-medium">AVAILABLE FOR INTERNSHIPS</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-white/40">
              <span>·</span>
              <span>GHAZIABAD · DELHI NCR</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* =========================================================================
          MAIN EDITORIAL STAGE: ASYMMETRIC SPATIAL COMPOSITION
          Desktop: Left = Editorial Typography & Actions / Right = 3D Luxury Sculpture
          Mobile: Top = Typography -> 3D Sculpture -> Introduction & Actions
          ========================================================================= */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 mx-auto my-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* -----------------------------------------------------------------
              LEFT COLUMN (7 COLS): EDITORIAL IDENTITY & RECRUITER ACTIONS
              ----------------------------------------------------------------- */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8 order-1">
            {/* Monumental, Controlled Identity Typography */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/[0.06] font-mono text-[10px] sm:text-[11px] text-violet-300 tracking-widest uppercase">
                <span>[ FIRST-PRINCIPLES SYSTEMS ]</span>
              </div>

              {/* Editorial Title: PRINCE CHAUHAN */}
              <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[-0.04em] leading-[0.92] text-white">
                <span className="block tracking-[-0.035em]">PRINCE</span>
                <span className="block text-gradient-chrome font-black italic tracking-[-0.045em] drop-shadow-[0_2px_24px_rgba(255,255,255,0.12)]">
                  CHAUHAN
                </span>
              </h1>
            </div>

            {/* In mobile view, render the 3D sculpture in flow between Title & Bio */}
            <div className="block lg:hidden w-full h-[300px] sm:h-[360px] my-2">
              <HeroArtifact mousePos={mousePos} shouldReduceMotion={shouldReduceMotion} />
            </div>

            {/* Concise, Grounded Engineering Statement */}
            <p className="font-sans text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-xl font-light">
              Undergraduate Computer Science &amp; Engineering scholar (AI &amp; ML) at Sunderdeep
              Global University. Engineering autonomous voice intelligence, low-latency media
              pipelines, and experimental digital interfaces from first principles.
            </p>

            {/* Luxury Action Conduits (Tactile magnetic feel, subtle ultraviolet glow) */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              {/* Primary Action: Explore Systems */}
              <MagneticButton
                onClick={() => scrollTo("projects")}
                className="group relative inline-flex items-center gap-2.5 rounded-full px-6 py-3 font-mono text-xs font-bold text-white bg-gradient-to-r from-violet-600 via-violet-500 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 shadow-[0_0_24px_rgba(139,92,246,0.35)] hover:shadow-[0_0_32px_rgba(139,92,246,0.5)] active:scale-95 cursor-pointer"
              >
                <span>Explore Work</span>
                <ArrowDown
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </MagneticButton>

              {/* Direct Resume Download Button — Real PDF Asset */}
              <MagneticButton
                href={RESUME_PATH}
                download={RESUME_FILENAME}
                target="_blank"
                rel="noopener noreferrer"
                title="Download Prince Chauhan Resume (PDF)"
                className="group relative inline-flex items-center gap-2 rounded-full border border-white/[0.15] bg-[#11131c] hover:border-violet-400/60 hover:bg-[#161824] px-5 py-3 font-mono text-xs font-semibold text-white/90 hover:text-white transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
              >
                <Download
                  size={14}
                  className="text-violet-400 transition-transform duration-300 group-hover:-translate-y-0.5"
                />
                <span>Download Resume</span>
              </MagneticButton>

              {/* Quick Verified Profiles */}
              <div className="flex items-center gap-2 pl-1 sm:pl-2">
                <MagneticButton
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  title="GitHub Repository Archive"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.1] bg-[#11131c] text-white/70 hover:text-white hover:border-violet-400/50 hover:bg-[#161824] transition-all duration-200 cursor-pointer"
                >
                  <Github size={16} />
                </MagneticButton>

                <MagneticButton
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Professional Network"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.1] bg-[#11131c] text-white/70 hover:text-white hover:border-violet-400/50 hover:bg-[#161824] transition-all duration-200 cursor-pointer"
                >
                  <Linkedin size={16} />
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* -----------------------------------------------------------------
              RIGHT COLUMN (5 COLS): ABSTRACT 3D SCULPTURE (DESKTOP)
              Dedicated negative space, zero collision with the typography.
              ----------------------------------------------------------------- */}
          <div className="hidden lg:block lg:col-span-5 relative w-full h-full min-h-[460px] xl:min-h-[540px] order-2">
            <HeroArtifact mousePos={mousePos} shouldReduceMotion={shouldReduceMotion} />
          </div>
        </div>
      </motion.div>

      {/* =========================================================================
          BOTTOM HUD-FREE STATUS STRIP
          Clean, dignified technical indicator without fake telemetry.
          ========================================================================= */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-20 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-4"
      >
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-3 font-mono text-[11px] text-white/40">
          <div className="flex items-center gap-2">
            <span className="text-white/30">DISCIPLINE:</span>
            <span className="text-white/80 font-medium">AUTONOMOUS SYSTEMS &amp; INTERACTION</span>
          </div>

          <button
            type="button"
            onClick={() => scrollTo("about")}
            className="flex items-center gap-2 text-white/50 hover:text-violet-300 transition-colors cursor-pointer uppercase tracking-wider"
          >
            <span>Scroll To Manifest</span>
            <ArrowDown size={12} className="animate-bounce" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
