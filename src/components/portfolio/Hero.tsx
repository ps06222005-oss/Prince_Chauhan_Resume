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
            {/* Eyebrow */}
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="font-mono text-[11px] font-semibold text-sky-400 tracking-wider uppercase">
                FULL STACK DEVELOPER · AI/ML STUDENT
              </span>
            </div>

            {/* Monumental Name Header */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-7xl xl:text-8xl tracking-[-0.035em] leading-[0.9] text-white">
                  PRINCE
                </h1>
                <span className="text-slate-500 text-xl sm:text-2xl font-light -mt-4 select-none opacity-80">
                  ✦
                </span>
              </div>
              <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-7xl xl:text-8xl tracking-[-0.035em] leading-[0.9] text-gradient-chauhan">
                CHAUHAN
              </h1>
            </div>

            {/* Headline with Editorial Serif Accent */}
            <div className="space-y-3 max-w-lg pt-1">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-white/95 leading-snug">
                Building AI-Powered Applications <br />
                For A{" "}
                <span className="font-serif italic font-normal text-gradient-chauhan text-2xl sm:text-3xl">
                  Smarter Tomorrow.
                </span>
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                I'm a B.Tech CSE (AI &amp; ML) student who loves turning ideas into real-world
                products. I build modern web applications, AI tools, and automation systems that
                solve real problems.
              </p>
            </div>

            {/* Actions: View My Work + Download Resume */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => scrollTo("projects")}
                className="group inline-flex items-center gap-2 rounded-full px-6 py-3 font-sans text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 hover:from-sky-300 hover:to-indigo-500 transition-all duration-200 shadow-[0_0_24px_rgba(56,189,248,0.45)] hover:shadow-[0_0_36px_rgba(56,189,248,0.7)] active:scale-95 cursor-pointer"
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
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/[0.25] px-5 py-3 font-sans text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <Download size={14} className="text-sky-400" />
                <span>Download Resume</span>
              </MagneticButton>
            </div>

            {/* Social Links Strip */}
            <div className="flex items-center gap-5 pt-2 font-mono text-xs text-slate-300">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Github size={14} />
                <span>GitHub</span>
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Linkedin size={14} />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail size={14} />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* -----------------------------------------------------------------
              CENTER COLUMN: CINEMATIC PORTRAIT & SCRIPT MANTRA
              ----------------------------------------------------------------- */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-88 md:h-88 flex items-center justify-center">
              {/* Outer Neon Rim Glow */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-transparent bg-gradient-to-tr from-sky-400 via-blue-500/30 to-violet-600 opacity-70 blur-lg animate-pulse"
              />

              {/* Glowing Rim Border Frame */}
              <div className="absolute inset-1.5 rounded-full p-[2px] bg-gradient-to-tr from-sky-400 via-blue-500 to-violet-500 shadow-[0_0_35px_rgba(56,189,248,0.35)]">
                <div className="w-full h-full rounded-full bg-[#080b12] overflow-hidden relative">
                  <img
                    src={profileImg}
                    alt="Prince Chauhan"
                    className="w-full h-full object-cover object-top scale-105 filter brightness-95 contrast-105"
                  />
                  {/* Subtle dark vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090e]/75 via-transparent to-transparent" />
                </div>
              </div>

              {/* Authentic Handwritten Script Accent matching reference */}
              <div className="absolute top-4 -right-4 sm:-right-8 z-20 pointer-events-none select-none text-right">
                <div className="font-script text-2xl sm:text-3xl leading-[1.05] text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] rotate-[-6deg] tracking-wide">
                  Ideas <br />
                  Code <br />
                  Automate <br />
                  Repeat.
                </div>
              </div>
            </div>

            {/* Floating Code Status Widget Below Avatar */}
            <div className="mt-4 w-full max-w-sm rounded-xl border border-white/[0.1] bg-[#0c0f1a]/85 backdrop-blur-md p-3.5 shadow-xl font-mono text-[11px] flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-slate-500 text-[10px]">// Currently working on</div>
                <div className="text-slate-200 text-[11px] leading-snug">
                  Building AI tools and full stack products that make a difference.
                </div>
              </div>
              <span className="relative flex h-2.5 w-2.5 shrink-0 ml-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500" />
              </span>
            </div>
          </div>

          {/* -----------------------------------------------------------------
              RIGHT COLUMN (3 COLS): BENTO FEATURE PANELS (DESKTOP)
              ----------------------------------------------------------------- */}
          <div className="lg:col-span-3 hidden lg:flex flex-col gap-3">
            {/* Panel 1: Open to Internships Card */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0c101c]/85 backdrop-blur-md p-4 flex items-center justify-between shadow-lg hover:border-emerald-500/30 transition-colors">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="text-white">Open to Internships</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Let's build something amazing together.
                </p>
              </div>

              <button
                type="button"
                onClick={() => scrollTo("contact")}
                aria-label="Contact for Internship"
                className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Send size={12} className="rotate-45 -translate-y-0.5" />
              </button>
            </div>

            {/* Panel 2: Tech Stack Bento Card (4x3 Grid matching reference) */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0c101c]/85 backdrop-blur-md p-4 space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-sans text-xs font-bold text-white">
                  <Code2 size={13} className="text-sky-400" />
                  <span>Tech Stack</span>
                </div>
                <button
                  type="button"
                  onClick={() => scrollTo("skills")}
                  className="font-mono text-[10px] text-slate-400 hover:text-sky-300 transition-colors cursor-pointer"
                >
                  View All →
                </button>
              </div>

              {/* 4x3 Squircle Badge Grid (12 technologies) */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  {
                    name: "Python",
                    tag: "Py",
                    color: "from-sky-500/20 to-blue-500/20 text-sky-300 border-sky-500/30",
                  },
                  {
                    name: "JavaScript",
                    tag: "JS",
                    color: "from-amber-500/20 to-yellow-500/20 text-amber-300 border-amber-500/30",
                  },
                  {
                    name: "React",
                    tag: "Re",
                    color: "from-cyan-500/20 to-sky-500/20 text-cyan-300 border-cyan-500/30",
                  },
                  {
                    name: "Next.js",
                    tag: "N",
                    color: "from-slate-400/20 to-white/10 text-white border-white/20",
                  },
                  {
                    name: "Node.js",
                    tag: "Node",
                    color:
                      "from-emerald-500/20 to-green-500/20 text-emerald-300 border-emerald-500/30",
                  },
                  {
                    name: "MongoDB",
                    tag: "M",
                    color: "from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30",
                  },
                  {
                    name: "Tailwind",
                    tag: "TW",
                    color: "from-teal-500/20 to-sky-500/20 text-teal-300 border-teal-500/30",
                  },
                  {
                    name: "Docker",
                    tag: "Doc",
                    color: "from-blue-500/20 to-indigo-500/20 text-blue-300 border-blue-500/30",
                  },
                  {
                    name: "Git",
                    tag: "Git",
                    color: "from-orange-500/20 to-rose-500/20 text-orange-300 border-orange-500/30",
                  },
                  {
                    name: "TensorFlow",
                    tag: "TF",
                    color: "from-amber-600/20 to-orange-500/20 text-amber-400 border-amber-600/30",
                  },
                  {
                    name: "OpenAI",
                    tag: "AI",
                    color: "from-teal-400/20 to-emerald-500/20 text-teal-300 border-teal-400/30",
                  },
                  {
                    name: "Postman",
                    tag: "API",
                    color:
                      "from-orange-500/20 to-amber-600/20 text-orange-300 border-orange-500/30",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    title={item.name}
                    className={`h-12 rounded-xl bg-gradient-to-br ${item.color} border flex flex-col items-center justify-center text-[10px] font-mono font-bold hover:scale-105 transition-transform cursor-default select-none shadow-sm`}
                  >
                    <span>{item.tag}</span>
                    <span className="text-[7.5px] font-sans font-normal opacity-75 truncate px-0.5 max-w-full text-center">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Panel 3: Stats Row matching reference (10+ Projects | 5+ Tech | 2+ Years) */}
            <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/[0.08] bg-[#0c101c]/85 backdrop-blur-md p-3 text-center shadow-lg font-mono">
              <div className="border-r border-white/[0.08] pr-1">
                <div className="font-display font-black text-lg text-white">10+</div>
                <div className="text-[10px] text-slate-400 font-sans">Projects</div>
              </div>
              <div className="border-r border-white/[0.08] px-1">
                <div className="font-display font-black text-lg text-sky-400">5+</div>
                <div className="text-[10px] text-slate-400 font-sans">Technologies</div>
              </div>
              <div className="pl-1">
                <div className="font-display font-black text-lg text-violet-400">2+</div>
                <div className="text-[10px] text-slate-400 font-sans">Years Learning</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll To Explore Indicator matching reference */}
        <div className="flex flex-col items-center justify-center pt-6 sm:pt-8 select-none">
          <button
            type="button"
            onClick={() => scrollTo("projects")}
            className="group flex flex-col items-center gap-1 text-slate-400 hover:text-sky-300 transition-colors cursor-pointer"
          >
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase">
              SCROLL TO EXPLORE
            </span>
            <div className="w-5 h-8 rounded-full border border-white/[0.2] flex items-start justify-center p-1 group-hover:border-sky-400/50 transition-colors">
              <span className="h-1.5 w-1 rounded-full bg-sky-400 animate-bounce" />
            </div>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
