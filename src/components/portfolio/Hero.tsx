import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Download, FolderGit2, Github, Linkedin, Mail, ArrowDown, Terminal } from "lucide-react";
import { PROFILE } from "@/lib/portfolio-data";
import profileImg from "@/assets/profile.jpg";

const PILLARS = [
  { index: "01", label: "AI / ML" },
  { index: "02", label: "CREATIVE TECHNOLOGY" },
  { index: "03", label: "SYSTEMS" },
  { index: "04", label: "AUTONOMOUS AGENTS" },
];

export function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Kinetic typography transformations on scroll (Item 2 & 4)
  const textY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const textXPrince = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const textXChauhan = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const letterSpacing = useTransform(scrollYProgress, [0, 1], ["-0.055em", "-0.08em"]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Subtle interactive parallax
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

    heroEl.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      heroEl.removeEventListener("mousemove", onMouseMove);
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
      aria-label="Prince Chauhan Creative Technology Opening Scene"
      className="relative min-h-[100svh] w-full overflow-hidden flex flex-col justify-between pt-20 sm:pt-24 pb-10 select-none"
    >
      {/* 4 Foundational Pillars — First 1.5 seconds cognitive hook (Item 1) */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-3.5 font-mono text-[11px] text-muted-foreground/80 tracking-wider"
        >
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.index}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                className="flex items-center gap-1.5"
              >
                <span className="text-amber-400 font-bold">{p.index}</span>
                <span className="text-foreground/90 font-semibold">{p.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3 text-[10px] text-muted-foreground/60">
            <span>SUNDERDEEP GLOBAL UNIV</span>
            <span className="text-white/20">·</span>
            <span>B.TECH CSE (AI &amp; ML)</span>
          </div>
        </motion.div>
      </div>

      {/* Spatial Composition Viewport: Monumental Kinetic Poster Installation */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto my-auto w-full max-w-[94rem] px-4 sm:px-8 py-4 sm:py-8"
      >
        <div className="relative min-h-[58vh] sm:min-h-[66vh] flex flex-col justify-center">
          {/* Layer 0: Spatial Portrait Specimen — Cinematic Editorial Specimen embedded into the environment */}
          <motion.div
            style={{
              y: imageY,
              scale: imageScale,
              transform: shouldReduceMotion
                ? "none"
                : `perspective(1200px) rotateY(${mousePos.x * 6}deg) rotateX(${-mousePos.y * 5}deg) translate3d(${mousePos.x * 8}px, ${mousePos.y * 6}px, 0)`,
            }}
            className="pointer-events-none absolute right-1 sm:right-6 md:right-16 lg:right-24 xl:right-36 top-1/2 -translate-y-1/2 z-10 w-44 sm:w-64 md:w-80 lg:w-[26rem] xl:w-[29rem] 2xl:w-[32rem] aspect-[3.4/4.6] select-none opacity-50 sm:opacity-80 lg:opacity-95 transition-opacity duration-500"
          >
            {/* Directional Environmental Glow Auras (Subtle Solar Amber rim + restrained Quantum Cyan depth) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-8 sm:-inset-14 rounded-full opacity-35 blur-[72px] bg-[radial-gradient(ellipse_at_68%_28%,rgba(245,158,11,0.22),rgba(217,119,6,0.06),transparent_72%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-10 sm:-inset-16 opacity-15 blur-[90px] bg-[radial-gradient(ellipse_at_26%_82%,rgba(6,182,212,0.16),transparent_65%)]"
            />

            {/* Specimen Frame with Organic Feathered Falloff (Dissolves seamlessly into WebGL background) */}
            <div
              className="relative h-full w-full overflow-hidden"
              style={{
                maskImage:
                  "radial-gradient(ellipse 82% 80% at 56% 38%, black 46%, rgba(0,0,0,0.85) 68%, rgba(0,0,0,0.25) 86%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 82% 80% at 56% 38%, black 46%, rgba(0,0,0,0.85) 68%, rgba(0,0,0,0.25) 86%, transparent 100%)",
              }}
            >
              {/* Authentic Specimen with Editorial Tonal Grading (Desaturated metallic neutrals, deep obsidian shadows) */}
              <img
                src={profileImg}
                alt="Prince Chauhan — AI/ML Developer & Creative Technologist"
                width={640}
                height={800}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover object-[52%_18%] contrast-[1.08] saturate-[0.82] brightness-[0.92] transition-all duration-700"
              />

              {/* Atmospheric Color Harmony Overlays (Binds specimen to the obsidian-amber palette) */}
              {/* 1. Solar Amber warm environmental rim light from top-right */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-bl from-amber-400/[0.14] via-amber-500/[0.04] to-transparent mix-blend-screen"
              />
              {/* 2. Quantum Cyan cold technical shadow accent in lower-left */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-cyan-950/[0.22] via-transparent to-transparent mix-blend-soft-light"
              />
              {/* 3. Deep Obsidian base shadow compression */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-[#07080a]/20 mix-blend-multiply"
              />
              {/* 4. Fine photographic sheen texture */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-100/[0.04] via-transparent to-black/35 mix-blend-overlay"
              />

              {/* Seamless Vignette Fades (Torso and edges melt organically into canvas) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07080a] via-[#07080a]/50 via-55% to-transparent opacity-95"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#07080a]/85 via-[#07080a]/30 to-transparent opacity-90"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#07080a]/35 via-transparent to-transparent opacity-80"
              />
            </div>
          </motion.div>

          {/* Layer 1: Monumental Display Typography (Breaks out of standard containers, overlapping specimen) */}
          <motion.div
            style={{
              y: textY,
              transform: shouldReduceMotion
                ? "none"
                : `translate3d(${mousePos.x * -24}px, ${mousePos.y * -18}px, 0)`,
            }}
            className="relative z-20 w-full"
          >
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-muted-foreground/80 mb-2 sm:mb-4 flex items-center gap-3"
            >
              <span className="h-px w-8 bg-amber-400" />
              <span>CREATIVE TECHNOLOGY &amp; SYSTEMS // PORTFOLIO 2025</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{ letterSpacing }}
              className="font-display text-[15.5vw] sm:text-[14vw] md:text-[13vw] lg:text-[11.8vw] xl:text-[13.5vw] font-black text-[#f4f4f2] leading-[0.82] tracking-[-0.065em] mix-blend-difference"
            >
              <motion.span style={{ x: textXPrince }} className="block select-none">
                PRINCE
              </motion.span>
              <motion.span
                style={{ x: textXChauhan }}
                className="block text-gradient-titanium select-none hover:text-amber-200/90 transition-colors duration-500"
              >
                CHAUHAN
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 sm:mt-10 max-w-2xl"
            >
              <p className="font-sans text-lg sm:text-xl md:text-2xl text-muted-foreground/90 leading-relaxed font-light">
                Architecting autonomous voice pipelines, low-latency neural software, and
                high-precision spatial interfaces.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Layer 3: Minimalist Action Dock */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-white/[0.08] pt-6"
        >
          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => scrollTo("projects")}
              className="group relative inline-flex items-center gap-2.5 rounded-full bg-foreground px-6 py-3 font-sans text-xs font-semibold text-background hover:bg-amber-300 active:scale-[0.98] transition-all duration-200"
            >
              <FolderGit2 size={15} />
              <span>EXPLORE ARCHITECTURES</span>
            </button>

            <a
              href={PROFILE.resume}
              download
              className="group inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.02] px-5 py-3 font-mono text-xs text-foreground hover:bg-white/[0.08] hover:border-white/[0.24] active:scale-[0.98] transition-all duration-200"
            >
              <Download
                size={14}
                className="text-amber-400 group-hover:-translate-y-0.5 transition-transform"
              />
              <span>CURRICULUM VITAE</span>
            </a>

            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))
              }
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-3 font-mono text-xs text-muted-foreground hover:text-foreground hover:border-white/[0.18] transition-colors"
              title="Open Command Index (⌘K)"
            >
              <Terminal size={13} className="text-amber-400/80" />
              <span>INDEX</span>
              <kbd className="rounded bg-white/[0.08] px-1.5 py-0.5 text-[9px] text-white/70">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Social Channels */}
          <div className="flex items-center gap-3">
            {[
              { href: PROFILE.github, icon: Github, label: "GitHub" },
              { href: PROFILE.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: `mailto:${PROFILE.email}`, icon: Mail, label: "Email" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={s.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/[0.08] bg-white/[0.02] text-muted-foreground hover:border-white/[0.22] hover:text-foreground hover:bg-white/[0.06] transition-all"
              >
                <s.icon size={15} />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Directional Conduit to Identity Manifesto */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 flex items-center justify-between font-mono text-[10px] text-muted-foreground/60 border-t border-white/[0.04] pt-4">
        <span>SCROLL TO ENTER EXPERIENCE</span>
        <button
          type="button"
          onClick={() => scrollTo("about")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <span>CONTINUUM</span>
          <ArrowDown size={11} className="transition-transform group-hover:translate-y-0.5" />
        </button>
      </div>
    </section>
  );
}
