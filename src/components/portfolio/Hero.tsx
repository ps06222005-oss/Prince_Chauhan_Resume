import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Send,
  Sparkles,
  Code2,
  Cpu,
  Layers,
  Terminal,
} from "lucide-react";
import profileImg from "@/assets/profile.jpg";
import { PROFILE } from "@/lib/portfolio-data";
import { RESUME_PATH, RESUME_FILENAME } from "@/lib/resume";
import { MagneticButton } from "./MagneticButton";

/**
 * Hero — Cinematic Midnight Experience matching reference direction:
 * - Left: Eyebrow + Open to Internships pill, Monumental Title with electric gradient,
 *         compelling positioning bio, primary "View My Work →", "Download Resume", verified socials.
 * - Center: Celestial neon portal with Prince's real profile photo, floating mantra badge,
 *           and code snippet widget.
 * - Right (Desktop): Restrained bento cards for Tech Stack squircle icons, Internship availability,
 *                    and quick Featured Project preview.
 */
export function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // Pointer tracking for subtle ambient reactive parallax
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
      aria-label="Prince Chauhan Introduction"
      className="relative min-h-[92dvh] w-full overflow-hidden bg-[#07090e] text-white pt-24 sm:pt-28 pb-16 sm:pb-24 flex flex-col justify-center border-b border-white/[0.08]"
    >
      {/* =========================================================================
          BACKGROUND: COSMIC VOLUMETRIC GLOW (Midnight, Electric Blue, Violet)
          ========================================================================= */}
      <motion.div
        style={{ y: backgroundY }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Soft Electric Blue Aura */}
        <div className="absolute top-[8%] left-[10%] w-[24rem] sm:w-[38rem] lg:w-[46rem] h-[24rem] sm:h-[38rem] rounded-full opacity-25 blur-[120px] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.4),rgba(37,99,235,0.2),transparent_70%)]" />

        {/* Ultraviolet Violet Volumetric Glow */}
        <div className="absolute top-[18%] right-[12%] w-[22rem] sm:w-[36rem] lg:w-[44rem] h-[22rem] sm:h-[36rem] rounded-full opacity-20 blur-[130px] bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.35),rgba(124,58,237,0.15),transparent_70%)]" />

        {/* Subtle Warm Orange Glow Dot Accent */}
        <div className="absolute top-[35%] left-[45%] w-32 h-32 rounded-full opacity-15 blur-[70px] bg-amber-500" />

        {/* Fine Architectural Grid */}
        <div className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] sm:bg-[size:5rem_5rem]" />
      </motion.div>

      {/* =========================================================================
          MAIN HERO CONTENT STAGE
          ========================================================================= */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* -----------------------------------------------------------------
              LEFT COLUMN (5 COLS): EDITORIAL IDENTITY & POSITIONING
              ----------------------------------------------------------------- */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            {/* Eyebrow & Status Pill */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-[11px] font-semibold text-sky-400 tracking-wider uppercase">
                FULL STACK DEVELOPER · AI/ML STUDENT
              </span>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 font-mono text-[10px] text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>OPEN TO INTERNSHIPS</span>
              </div>
            </div>

            {/* Monumental Name Header */}
            <div className="space-y-1">
              <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-6xl xl:text-7xl tracking-[-0.035em] leading-[0.95] text-white">
                PRINCE <br />
                <span className="text-gradient-electric">CHAUHAN</span>
              </h1>
            </div>

            {/* Bold Headline & Authentic Positioning */}
            <div className="space-y-3 max-w-lg">
              <h2 className="font-display font-bold text-lg sm:text-xl text-white/95 leading-snug">
                Building Modern Web Experiences with AI-Powered Solutions.
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                I'm a B.Tech CSE (AI &amp; ML) student at Sunderdeep Global University who loves
                turning ideas into real-world products. I build full stack web applications, AI
                tools, and automation systems that solve real problems.
              </p>
            </div>

            {/* Actions: View My Work + Download Resume */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => scrollTo("projects")}
                className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-xs font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 transition-all duration-200 shadow-[0_0_24px_rgba(59,130,246,0.35)] hover:shadow-[0_0_32px_rgba(59,130,246,0.5)] active:scale-95 cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </button>

              <MagneticButton
                href={RESUME_PATH}
                download={RESUME_FILENAME}
                target="_blank"
                rel="noopener noreferrer"
                title="Download Prince Chauhan Resume"
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/[0.25] px-4 py-2.5 font-sans text-xs font-semibold text-slate-200 hover:text-white transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <Download size={14} className="text-sky-400" />
                <span>Download Resume</span>
              </MagneticButton>
            </div>

            {/* Social Icons Strip */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="grid h-8 w-8 place-items-center rounded-full border border-white/[0.1] bg-white/[0.03] text-slate-300 hover:text-white hover:border-sky-400/50 hover:bg-sky-500/10 transition-colors"
              >
                <Github size={14} />
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="grid h-8 w-8 place-items-center rounded-full border border-white/[0.1] bg-white/[0.03] text-slate-300 hover:text-white hover:border-sky-400/50 hover:bg-sky-500/10 transition-colors"
              >
                <Linkedin size={14} />
              </a>
              <a
                href={`mailto:${PROFILE.email}`}
                aria-label="Send Email to Prince"
                className="grid h-8 w-8 place-items-center rounded-full border border-white/[0.1] bg-white/[0.03] text-slate-300 hover:text-white hover:border-sky-400/50 hover:bg-sky-500/10 transition-colors"
              >
                <Mail size={14} />
              </a>
            </div>
          </div>

          {/* -----------------------------------------------------------------
              CENTER COLUMN (4 COLS): CELESTIAL PORTAL & MANTRA
              ----------------------------------------------------------------- */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative">
            {/* Glowing Celestial Neon Rim Portal */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-88 md:h-88 flex items-center justify-center">
              {/* Outer Neon Glow Ring */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-tr from-sky-500 via-amber-500/40 to-violet-600 opacity-60 blur-md animate-pulse"
              />

              {/* Crisp Electric Gradient Portal Border */}
              <div className="absolute inset-1.5 rounded-full p-[2px] bg-gradient-to-tr from-sky-400 via-amber-400/60 to-violet-500 shadow-[0_0_35px_rgba(56,189,248,0.3)]">
                <div className="w-full h-full rounded-full bg-[#090c14] overflow-hidden relative">
                  <img
                    src={profileImg}
                    alt="Prince Chauhan"
                    className="w-full h-full object-cover object-top scale-105 filter brightness-95 contrast-105"
                  />
                  {/* Subtle Cinematic Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090e]/80 via-transparent to-transparent" />
                </div>
              </div>

              {/* Mantra Chip Pill at Top-Right */}
              <div className="absolute top-2 -right-4 sm:-right-6 z-20 hidden sm:flex flex-col items-end">
                <span className="font-mono text-[9px] font-bold tracking-widest text-slate-400 uppercase bg-[#0d101a]/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/[0.08] shadow-lg">
                  IDEAS · CODE · AI · BUILD · REPEAT
                </span>
              </div>
            </div>

            {/* Floating Code Snippet Card Widget Below Avatar */}
            <div className="mt-4 w-full max-w-sm rounded-xl border border-white/[0.1] bg-[#0c0f1a]/85 backdrop-blur-md p-3 shadow-xl font-mono text-[11px] space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500 text-[10px]">
                <span>// Currently working on</span>
              </div>
              <div className="flex items-start gap-2 text-slate-200">
                <span className="text-amber-400 text-xs">◆</span>
                <span className="text-[11px] leading-snug">
                  AI tools, voice intelligence, and full-stack products that make a difference.
                </span>
              </div>
            </div>
          </div>

          {/* -----------------------------------------------------------------
              RIGHT COLUMN (3 COLS): BENTO FEATURE PANELS (DESKTOP)
              ----------------------------------------------------------------- */}
          <div className="lg:col-span-3 hidden lg:flex flex-col gap-3">
            {/* Panel 1: Tech Stack Bento Card */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0c101c]/80 backdrop-blur-md p-4 space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-sans text-xs font-bold text-white">
                  <Code2 size={13} className="text-sky-400" />
                  <span>Tech Stack</span>
                </div>
                <button
                  type="button"
                  onClick={() => scrollTo("skills")}
                  className="font-mono text-[10px] text-slate-400 hover:text-sky-300 transition-colors"
                >
                  View All →
                </button>
              </div>

              {/* 4x2 Squircle Badge Grid */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  {
                    name: "Python",
                    tag: "Py",
                    color: "from-sky-500/20 to-blue-500/20 text-sky-300",
                  },
                  {
                    name: "React",
                    tag: "Re",
                    color: "from-cyan-500/20 to-sky-500/20 text-cyan-300",
                  },
                  {
                    name: "TypeScript",
                    tag: "TS",
                    color: "from-blue-500/20 to-indigo-500/20 text-blue-300",
                  },
                  {
                    name: "C Lang",
                    tag: "C",
                    color: "from-slate-500/20 to-zinc-500/20 text-slate-300",
                  },
                  {
                    name: "Tailwind",
                    tag: "TW",
                    color: "from-teal-500/20 to-sky-500/20 text-teal-300",
                  },
                  {
                    name: "Pandas",
                    tag: "Pd",
                    color: "from-violet-500/20 to-purple-500/20 text-violet-300",
                  },
                  {
                    name: "Git",
                    tag: "Git",
                    color: "from-orange-500/20 to-amber-500/20 text-orange-300",
                  },
                  {
                    name: "AI/NLP",
                    tag: "AI",
                    color: "from-emerald-500/20 to-teal-500/20 text-emerald-300",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    title={item.name}
                    className={`h-11 rounded-xl bg-gradient-to-br ${item.color} border border-white/[0.06] flex flex-col items-center justify-center text-[10px] font-mono font-bold hover:scale-105 transition-transform cursor-default select-none shadow-sm`}
                  >
                    <span>{item.tag}</span>
                    <span className="text-[8px] font-sans font-normal opacity-70 truncate px-0.5 max-w-full">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Panel 2: Available for Internships Status Card */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0c101c]/80 backdrop-blur-md p-4 flex items-center justify-between shadow-lg">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-emerald-400">Available for Internships</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Open to exciting software &amp; AI opportunities.
                </p>
              </div>

              <button
                type="button"
                onClick={() => scrollTo("contact")}
                aria-label="Contact for Internship"
                className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Send size={13} />
              </button>
            </div>

            {/* Panel 3: Featured Project Spotlight Card (JARVIS) */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0c101c]/80 backdrop-blur-md p-4 space-y-2 shadow-lg">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Featured Project</span>
                <span className="text-amber-400 font-bold">01 / 04</span>
              </div>
              <div className="font-display font-bold text-sm text-white">
                JARVIS — Voice Intelligence
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                Autonomous Python assistant with noise-calibrated speech recognition &amp; OS
                automation.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <a
                  href={PROFILE.jarvisRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] font-sans text-[11px] font-medium text-white transition-colors"
                >
                  View Repo ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
