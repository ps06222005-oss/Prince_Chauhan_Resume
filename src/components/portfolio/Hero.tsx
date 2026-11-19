import { useEffect, useRef, useState, useCallback } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  FileText,
  Github,
  Linkedin,
  Cpu,
  Code2,
  GraduationCap,
} from "lucide-react";
import { PROFILE } from "@/lib/portfolio-data";
import { RESUME_PATH, RESUME_FILENAME } from "@/lib/resume";
import { HeroCinematicCanvas } from "./HeroCinematicCanvas";
import { MagneticButton } from "./MagneticButton";
import { ScrollReveal, StaggerRevealGroup, StaggerRevealItem } from "./ScrollReveal";

/**
 * Hero — Stitch Blue 3D Neural Field & Architectural Stage
 *
 * - Deep Midnight Navy Base (#070B14) with Electric Blue (#3B82F6) & Sky Cyan (#38BDF8) accents
 * - Monumental condensed editorial typography: "PRINCE CHAUHAN" in Syne / Space Grotesk
 * - Interactive generative 3D neural-particle environment with mouse deflection & parallax
 * - Stitch Blue Glassmorphic Quick-Spec Telemetry Dock for instant architecture inspection
 * - 100% SSR Hydration-Safe (deterministic initial server/client render)
 */
export function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollYProgressValue, setScrollYProgressValue] = useState(0);

  // Detect reduced motion and scroll progress safely on client after hydration
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setShouldReduceMotion(e.matches);
    mq.addEventListener("change", onChange);

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const h = heroRef.current?.clientHeight || window.innerHeight || 1;
        const progress = Math.min(1, Math.max(0, window.scrollY / h));
        setScrollYProgressValue(progress);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // High-performance pointer tracking with RAF throttling
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

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollYProgressValue * 1.15);
  const heroTranslateY = scrollYProgressValue * 60;

  return (
    <section
      ref={heroRef}
      id="home"
      aria-label="Prince Chauhan Hero"
      className="relative min-h-[100svh] h-[100svh] w-full overflow-hidden flex flex-col justify-between pt-16 sm:pt-20 pb-5 sm:pb-7 select-none bg-background text-foreground"
    >
      {/* =========================================================================
          1. CINEMATIC GENERATIVE 3D BACKGROUND (STITCH BLUE NEURAL FIELD)
          ========================================================================= */}
      <HeroCinematicCanvas
        mousePos={mousePos}
        scrollYProgress={scrollYProgressValue}
        shouldReduceMotion={shouldReduceMotion}
      />

      {/* =========================================================================
          2. TOP STATUS / NAVIGATION STRIP
          - PRINCE CHAUHAN
          - FULL STACK • AI/ML
          - ● OPEN TO INTERNSHIPS
          ========================================================================= */}
      <div
        style={{ opacity: heroOpacity }}
        className="relative z-20 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 transition-opacity duration-150"
      >
        <ScrollReveal direction="down" distance={16} delay={0.05} duration={0.6}>
          <div className="flex items-center justify-between border-b border-border pb-2.5 text-[11px] sm:text-xs font-mono tracking-wider text-muted-foreground">
            {/* Identity Tag */}
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />
              <span className="font-semibold text-foreground tracking-widest uppercase">
                PRINCE CHAUHAN
              </span>
              <span className="hidden sm:inline text-muted-foreground/50">/</span>
              <span className="hidden sm:inline text-primary/80 uppercase">PORTFOLIO</span>
            </div>

            {/* Discipline Core */}
            <div className="hidden md:flex items-center gap-2 text-muted-foreground">
              <span className="text-primary font-medium">APP DEV</span>
              <span className="text-muted-foreground/50">•</span>
              <span className="text-accent font-medium">AI/ML</span>
            </div>

            {/* Availability Status Badge */}
            <div className="flex items-center gap-2 bg-surface/90 border border-border hover:border-primary/50 px-2.5 sm:px-3 py-1 rounded-full transition-colors backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_currentColor]" />
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-foreground tracking-wider uppercase">
                OPEN TO INTERNSHIPS
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* =========================================================================
          3. CENTER EDITORIAL STAGE: OVERSIZED CONDENSED TYPOGRAPHY & CTAs
          ========================================================================= */}
      <div
        style={{
          opacity: heroOpacity,
          transform:
            heroTranslateY === 0 ? undefined : `translate3d(0, ${heroTranslateY.toFixed(1)}px, 0)`,
        }}
        className="relative z-10 mx-auto my-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-1 sm:py-3 flex flex-col items-center justify-center text-center"
      >
        {/* Subtle Parallax Depth Transform Wrapper for Heading */}
        <div
          style={{
            transform:
              shouldReduceMotion || (mousePos.x === 0 && mousePos.y === 0)
                ? undefined
                : `translate3d(${(mousePos.x * 10).toFixed(2)}px, ${(mousePos.y * 6).toFixed(2)}px, 0)`,
            transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="w-full flex flex-col items-center"
        >
          <StaggerRevealGroup
            staggerChildren={0.11}
            delayChildren={0.12}
            className="w-full flex flex-col items-center"
          >
            {/* Main Monumental Name Heading */}
            <h1 className="font-[family-name:var(--font-syne)] font-extrabold uppercase tracking-[-0.04em] leading-[0.86] text-center w-full max-w-5xl">
              <StaggerRevealItem distance={26}>
                <span className="block text-[16vw] sm:text-7xl md:text-8xl lg:text-[7.2rem] xl:text-[8.75rem] text-foreground drop-shadow-sm">
                  PRINCE
                </span>
              </StaggerRevealItem>

              <StaggerRevealItem distance={26}>
                <span className="block text-[16vw] sm:text-7xl md:text-8xl lg:text-[7.2rem] xl:text-[8.75rem] italic font-black bg-gradient-to-r from-primary via-sky-500 to-accent bg-clip-text text-transparent tracking-[-0.045em]">
                  CHAUHAN
                </span>
              </StaggerRevealItem>
            </h1>

            {/* Role under heading */}
            <StaggerRevealItem distance={18}>
              <div className="mt-3 sm:mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-mono text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase text-muted-foreground">
                <span className="text-primary font-semibold">ASPIRING APPLICATION DEVELOPER</span>
                <span className="text-muted-foreground/40 select-none">•</span>
                <span className="text-accent font-semibold">CSE (AI &amp; ML) STUDENT</span>
              </div>
            </StaggerRevealItem>

            {/* Description */}
            <StaggerRevealItem distance={18}>
              <p className="mt-2.5 sm:mt-3.5 max-w-xl font-sans text-sm sm:text-base md:text-lg text-muted-foreground font-light leading-relaxed px-4">
                Building Apps. Exploring Possibilities.
              </p>
            </StaggerRevealItem>

            {/* CTA buttons */}
            <StaggerRevealItem distance={20}>
              <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                {/* Primary CTA: VIEW PROJECTS */}
                <MagneticButton
                  onClick={() => scrollTo("projects")}
                  className="group relative min-h-[46px] inline-flex items-center gap-2.5 rounded-full px-6 sm:px-7 py-3 font-mono text-xs font-bold text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  <span>VIEW PROJECTS</span>
                  <ArrowDown
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-y-0.5"
                  />
                </MagneticButton>

                {/* Secondary CTA: VIEW RESUME */}
                <MagneticButton
                  href={RESUME_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View Prince Chauhan Resume (PDF)"
                  className="group relative min-h-[46px] inline-flex items-center gap-2 rounded-full border border-border bg-surface/85 backdrop-blur-md hover:border-primary/50 hover:bg-secondary/50 px-5 sm:px-6 py-3 font-mono text-xs font-semibold text-foreground transition-all duration-300 shadow-sm active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  <FileText
                    size={14}
                    className="text-primary transition-transform duration-300 group-hover:-translate-y-0.5"
                  />
                  <span>VIEW RESUME (PDF)</span>
                </MagneticButton>

                {/* Secondary Social Conduits: GitHub & LinkedIn */}
                <div className="flex items-center gap-2 pl-1 sm:pl-2">
                  <MagneticButton
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    title="GitHub Repository Archive"
                    className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface/85 backdrop-blur-md text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-secondary/50 transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none shadow-sm"
                  >
                    <Github size={16} />
                  </MagneticButton>

                  <MagneticButton
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    title="LinkedIn Professional Network"
                    className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface/85 backdrop-blur-md text-muted-foreground hover:text-foreground hover:border-accent/50 hover:bg-secondary/50 transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none shadow-sm"
                  >
                    <Linkedin size={16} />
                  </MagneticButton>
                </div>
              </div>
            </StaggerRevealItem>
          </StaggerRevealGroup>
        </div>
      </div>

      {/* =========================================================================
          4. STITCH BLUE BENTO QUICK-SPEC DOCK & BOTTOM TELEMETRY BAR
          ========================================================================= */}
      <ScrollReveal
        direction="up"
        distance={20}
        delay={0.45}
        duration={0.65}
        className="relative z-20 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div style={{ opacity: heroOpacity }} className="space-y-3 transition-opacity duration-150">
          {/* Interactive Bento Strip (Desktop & Tablet) */}
          <div className="hidden sm:grid sm:grid-cols-3 gap-2.5 lg:gap-3 rounded-2xl border border-border bg-card/85 backdrop-blur-xl p-2.5 shadow-md">
            <button
              type="button"
              onClick={() => scrollTo("projects")}
              className="group flex items-center justify-between rounded-xl border border-border bg-secondary/40 hover:bg-secondary/80 hover:border-primary/40 px-3.5 py-2 text-left transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/15 border border-primary/30 text-primary">
                  <Cpu size={13} />
                </span>
                <div className="truncate">
                  <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">
                    ENGINEERED SYSTEMS
                  </div>
                  <div className="font-sans text-xs font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                    JARVIS · OnlineStream · DecodeLabs
                  </div>
                </div>
              </div>
              <ArrowUpRight
                size={13}
                className="text-muted-foreground group-hover:text-primary transition-colors shrink-0"
              />
            </button>

            <button
              type="button"
              onClick={() => scrollTo("skills")}
              className="group flex items-center justify-between rounded-xl border border-border bg-secondary/40 hover:bg-secondary/80 hover:border-accent/40 px-3.5 py-2 text-left transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-accent/15 border border-accent/30 text-accent">
                  <Code2 size={13} />
                </span>
                <div className="truncate">
                  <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">
                    CORE ARCHITECTURE
                  </div>
                  <div className="font-sans text-xs font-semibold text-foreground truncate group-hover:text-accent transition-colors">
                    Python · TypeScript · React · AI/ML
                  </div>
                </div>
              </div>
              <ArrowUpRight
                size={13}
                className="text-muted-foreground group-hover:text-accent transition-colors shrink-0"
              />
            </button>

            <button
              type="button"
              onClick={() => scrollTo("about")}
              className="group flex items-center justify-between rounded-xl border border-border bg-secondary/40 hover:bg-secondary/80 hover:border-primary/40 px-3.5 py-2 text-left transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/15 border border-primary/30 text-primary">
                  <GraduationCap size={13} />
                </span>
                <div className="truncate">
                  <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">
                    ACADEMIC RECORD
                  </div>
                  <div className="font-sans text-xs font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                    B.Tech CSE (AI &amp; ML) · 2024–2028
                  </div>
                </div>
              </div>
              <ArrowUpRight
                size={13}
                className="text-muted-foreground group-hover:text-primary transition-colors shrink-0"
              />
            </button>
          </div>

          {/* Coordinate & Scroll to Explore Bar */}
          <div className="flex items-center justify-between border-t border-border pt-2.5 text-[10px] sm:text-[11px] font-mono text-muted-foreground">
            {/* Real Campus Coordinates & System Spec */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline text-muted-foreground/60">COORD:</span>
              <span className="text-foreground/80">28.6692° N · 77.4538° E</span>
              <span className="hidden md:inline text-border">|</span>
              <span className="hidden md:inline text-primary/80">GHAZIABAD · DELHI NCR</span>
            </div>

            {/* Scroll to Explore Interactive Indicator */}
            <button
              type="button"
              onClick={() => scrollTo("about")}
              className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer uppercase tracking-widest text-[10px] sm:text-[11px]"
            >
              <span className="tracking-widest">SCROLL TO EXPLORE</span>
              <span className="grid h-5 w-5 place-items-center rounded-full border border-border bg-secondary/60 group-hover:border-primary/60 group-hover:bg-primary/10 transition-colors">
                <ArrowDown size={11} className="text-primary animate-bounce" />
              </span>
            </button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
