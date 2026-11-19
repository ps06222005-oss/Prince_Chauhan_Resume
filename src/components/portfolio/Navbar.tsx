import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Download, Menu, FileText, ArrowUpRight, RotateCcw, Monitor } from "lucide-react";
import { PROFILE } from "@/lib/portfolio-data";
import { RESUME_PATH, RESUME_FILENAME } from "@/lib/resume";
import { NAV_LINKS } from "@/data/navigation";
import { PCLogo } from "./PCLogo";
import { MagneticButton } from "./MagneticButton";
import { ThemeToggle } from "./ThemeToggle";
import { useWorkspace } from "@/context/WorkspaceContext";

const MOBILE_DRAWER_LINKS = NAV_LINKS;

/**
 * Navbar — Stitch Blue Floating Glass Navigation Bar
 *
 * Visual Hierarchy:
 * - Left: Blue PC Logo monogram + Prince Chauhan title
 * - Center: Floating section links with sliding active Electric Blue/Sky spring indicator
 * - Right: Magnetic 'Resume' CTA button with Stitch Electric Blue styling
 * - Mobile: Seamlessly transitions to a compact glass bar with a slide-out glass-morphism drawer
 */
export function Navbar() {
  const { resetToPortal, enterWorkspace, mode, exploreFull } = useWorkspace();
  const [activeId, setActiveId] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Scroll detection for slight glass tint adjustment
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection observer to track active section
  useEffect(() => {
    const sections = ["home", ...NAV_LINKS.map((l) => l.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (!sections.length) return;

    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        }
        let best = "";
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        if (best) setActiveId(best);
      },
      { rootMargin: "-80px 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Keyboard accessibility
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (mode !== "full") {
      exploreFull();
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        role="banner"
        className="fixed inset-x-0 top-3 sm:top-4 z-50 flex justify-center px-3 sm:px-6 pointer-events-none"
      >
        <div
          className={`pointer-events-auto w-full max-w-5xl rounded-full border transition-all duration-300 px-3.5 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between ${
            scrolled
              ? "bg-white/85 dark:bg-[#0F172A]/90 backdrop-blur-2xl border-border shadow-[0_16px_40px_rgba(15,23,42,0.06)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.75),0_0_24px_rgba(56,189,248,0.12),inset_0_1px_1px_rgba(255,255,255,0.08)]"
              : "bg-white/75 dark:bg-[#0F172A]/80 backdrop-blur-xl border-border shadow-[0_8px_30px_rgba(15,23,42,0.04)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.05)]"
          }`}
        >
          {/* =================================================================
              LEFT: PC LOGO MONOGRAM & TITLE
              ================================================================= */}
          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="group flex items-center gap-2.5 rounded-full py-0.5 pr-2 text-left focus-visible:outline-none cursor-pointer select-none"
            aria-label="Prince Chauhan Home"
          >
            <PCLogo className="h-6 sm:h-7 w-auto transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="font-display text-xs sm:text-sm font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                PRINCE CHAUHAN
              </span>
              <span className="hidden sm:inline font-mono text-[8.5px] tracking-widest text-primary/80 uppercase">
                APPLICATION DEVELOPMENT • AI/ML
              </span>
            </div>
          </button>

          {/* =================================================================
              CENTER: FLOATING SECTION LINKS (DESKTOP)
              ================================================================= */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 rounded-full bg-slate-100/80 dark:bg-slate-800/50 p-1 border border-border"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollTo(link.id)}
                  className={`relative rounded-full px-3.5 py-1.5 font-mono text-xs font-medium transition-all duration-200 cursor-pointer select-none ${
                    isActive
                      ? "text-primary dark:text-sky-300 font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavFloatingPill"
                      className="absolute inset-0 rounded-full bg-primary/10 dark:bg-sky-500/20 border border-primary/30 dark:border-sky-400/40 shadow-[0_0_12px_rgba(37,99,235,0.15)] dark:shadow-[0_0_16px_rgba(56,189,248,0.25)]"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* =================================================================
              RIGHT: THEME TOGGLE + RESUME CTA BUTTON
              ================================================================= */}
          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={enterWorkspace}
              className="inline-flex items-center gap-1.5 rounded-full border border-cyan-600/40 dark:border-cyan-500/30 bg-cyan-50/90 dark:bg-cyan-950/30 hover:bg-cyan-100 dark:hover:bg-cyan-950/50 px-3 py-1.5 font-mono text-xs font-medium text-cyan-800 dark:text-cyan-300 hover:border-cyan-500 transition-colors cursor-pointer select-none"
              title="Launch 3D Holographic Workspace"
            >
              <Monitor size={12} />
              <span>3D WORKSPACE</span>
            </button>
            <button
              type="button"
              onClick={resetToPortal}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-slate-100/80 dark:bg-slate-800/60 px-3 py-1.5 font-mono text-xs text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors cursor-pointer select-none"
              title="Return to BIOS Entry Gateways"
            >
              <RotateCcw size={12} />
              <span>BIOS PORTAL</span>
            </button>
            <ThemeToggle />
            <MagneticButton
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              title="View Prince Chauhan Resume (PDF)"
              className="group inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary hover:bg-primary/90 px-4 py-1.5 font-mono text-xs font-semibold text-primary-foreground transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <FileText size={13} className="group-hover:-translate-y-0.5 transition-transform" />
              <span>Resume</span>
            </MagneticButton>
          </div>

          {/* =================================================================
              MOBILE ACTIONS: THEME TOGGLE + RESUME + HAMBURGER BUTTON
              ================================================================= */}
          <div className="flex md:hidden items-center gap-1.5">
            <ThemeToggle />
            <MagneticButton
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              title="View Resume (PDF)"
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary px-3 py-1 font-mono text-[11px] font-semibold text-primary-foreground shadow-sm"
            >
              <FileText size={11} />
              <span>Resume</span>
            </MagneticButton>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-glass-drawer"
              className="relative grid h-8 w-8 place-items-center rounded-full border border-border bg-slate-100 dark:bg-slate-800/80 backdrop-blur-md text-foreground hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer transition-all"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    transition={{ duration: 0.16 }}
                    className="grid place-items-center"
                  >
                    <X size={16} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    transition={{ duration: 0.16 }}
                    className="grid place-items-center"
                  >
                    <Menu size={16} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          MOBILE SLIDE-OUT STITCH GLASS-MORPHISM DRAWER + BACKDROP SCRIM
          ===================================================================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Glassmorphic Backdrop Scrim */}
            <motion.div
              key="mobile-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.1 : 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
              className="fixed inset-0 z-[95] bg-slate-900/40 dark:bg-[#050811]/70 backdrop-blur-md md:hidden"
            />

            {/* Slide-Out Glass-Morphism Drawer Panel */}
            <motion.aside
              key="mobile-drawer-panel"
              id="mobile-glass-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Drawer"
              initial={prefersReducedMotion ? { opacity: 0 } : { x: "100%", opacity: 0.85 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { x: 0, opacity: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { x: "100%", opacity: 0.85 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.15 }
                  : { type: "spring", stiffness: 360, damping: 34, mass: 0.9 }
              }
              className="fixed top-0 right-0 bottom-0 z-[100] w-[86vw] max-w-sm md:hidden flex flex-col justify-between overflow-y-auto bg-white/95 dark:bg-[#0F172A]/92 backdrop-blur-2xl border-l border-border shadow-2xl p-5 sm:p-6"
            >
              {/* Ambient Stitch Blue Radial Glow & Specular Highlight (Dark Mode only) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-blue-600/15 dark:bg-blue-600/20 blur-3xl opacity-0 dark:opacity-100 transition-opacity"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-10 -left-16 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl opacity-0 dark:opacity-100 transition-opacity"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
              />

              {/* Top Bar inside Slide-Out Drawer */}
              <div className="relative z-10 flex items-center justify-between border-b border-border pb-4">
                <button
                  type="button"
                  onClick={() => scrollTo("home")}
                  className="flex items-center gap-2.5 text-left cursor-pointer"
                >
                  <PCLogo className="h-7 w-auto" />
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-sm tracking-tight text-foreground">
                      PRINCE CHAUHAN
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.2em] text-primary/80 uppercase">
                      NAVIGATION
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close Menu"
                  className="grid h-9 w-9 place-items-center rounded-full border border-border bg-slate-100 dark:bg-slate-800/60 backdrop-blur-md text-foreground hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
                >
                  <X size={17} />
                </button>
              </div>

              {/* Theme Switcher Quick-Control */}
              <div className="relative z-10 my-3 flex items-center justify-between rounded-xl border border-border bg-slate-100/70 dark:bg-slate-800/40 px-3.5 py-2">
                <span className="text-xs font-semibold text-foreground">Appearance</span>
                <ThemeToggle showLabel />
              </div>

              {/* Drawer Navigation Links */}
              <nav
                aria-label="Mobile Navigation"
                className="relative z-10 my-auto flex flex-col gap-1.5 py-2"
              >
                {MOBILE_DRAWER_LINKS.map((link, idx) => {
                  const isActive = activeId === link.id;
                  return (
                    <motion.button
                      key={link.id}
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: prefersReducedMotion ? 0 : idx * 0.045 + 0.06,
                        duration: 0.28,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      type="button"
                      onClick={() => scrollTo(link.id)}
                      className={`group relative flex items-center justify-between rounded-2xl px-4 py-3 text-left cursor-pointer transition-all duration-200 border ${
                        isActive
                          ? "bg-primary/10 border-primary/30 text-primary dark:text-sky-300 dark:bg-sky-500/10 shadow-sm"
                          : "bg-transparent border-transparent text-foreground/80 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-2 w-2 rounded-full transition-all duration-300 ${
                            isActive
                              ? "bg-primary dark:bg-sky-400 shadow-[0_0_8px_currentColor] scale-110"
                              : "bg-muted-foreground/40 group-hover:bg-primary"
                          }`}
                        />
                        <span className="font-display font-bold text-base sm:text-lg tracking-tight">
                          {link.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono text-[11px] tracking-widest ${
                            isActive
                              ? "text-primary dark:text-sky-300 font-semibold"
                              : "text-muted-foreground group-hover:text-foreground"
                          }`}
                        >
                          0{idx}
                        </span>
                        <ArrowUpRight
                          size={14}
                          className={`transition-transform duration-200 ${
                            isActive
                              ? "text-primary dark:text-sky-300 translate-x-0.5 -translate-y-0.5"
                              : "text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          }`}
                        />
                      </div>
                    </motion.button>
                  );
                })}
              </nav>

              {/* Drawer Footer: Status Pill, Resume CTA & Social Links */}
              <div className="relative z-10 space-y-3 border-t border-border pt-4 font-mono text-xs">
                {/* 3D Workspace & BIOS Portal Quick Switchers */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    enterWorkspace();
                  }}
                  className="w-full py-2.5 rounded-xl border border-cyan-600/40 dark:border-cyan-500/40 bg-cyan-50/90 dark:bg-cyan-950/30 hover:bg-cyan-100 dark:hover:bg-cyan-950/50 text-cyan-800 dark:text-cyan-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Monitor size={13} className="text-cyan-700 dark:text-cyan-400" />
                  <span className="font-semibold text-xs tracking-wider">ENTER 3D WORKSPACE</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    resetToPortal();
                  }}
                  className="w-full py-2.5 rounded-xl border border-border bg-slate-100/70 dark:bg-slate-800/50 hover:bg-slate-200 text-foreground flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <RotateCcw size={13} className="text-primary" />
                  <span className="font-semibold text-xs tracking-wider">
                    RETURN TO BIOS PORTAL
                  </span>
                </button>

                {/* Availability Badge */}
                <div className="flex items-center gap-2.5 rounded-xl border border-border bg-slate-100/70 dark:bg-slate-800/50 px-3.5 py-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] tracking-widest text-foreground uppercase font-semibold">
                    OPEN TO INTERNSHIPS
                  </span>
                </div>

                {/* Primary Resume Action */}
                <a
                  href={RESUME_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl border border-primary/30 bg-primary hover:bg-primary/90 font-bold text-primary-foreground flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <FileText size={15} />
                  <span>VIEW RESUME (PDF)</span>
                </a>

                {/* Location & Socials */}
                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
                  <span className="truncate">{PROFILE.location}</span>
                  <div className="flex items-center gap-3.5">
                    <a
                      href={PROFILE.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      GitHub
                    </a>
                    <a
                      href={PROFILE.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      LinkedIn
                    </a>
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="hover:text-primary transition-colors"
                    >
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
