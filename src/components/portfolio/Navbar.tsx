import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Github, Linkedin, Menu, ArrowUpRight, FileText } from "lucide-react";
import { PROFILE } from "@/lib/portfolio-data";
import { RESUME_PATH, RESUME_FILENAME } from "@/lib/resume";
import { NAV_LINKS } from "@/data/navigation";
import { PCLogo } from "./PCLogo";
import { MagneticButton } from "./MagneticButton";

/**
 * Navbar — Floating Glassmorphism Navigation Bar
 *
 * Visual Hierarchy:
 * - Left: PC Logo monogram + Prince Chauhan title
 * - Center: Floating section links with sliding active spring indicator
 * - Right: Magnetic 'Resume' CTA button with direct PDF download
 * - Mobile: Seamlessly transitions to a compact glass bar with hamburger toggle
 * - Entrance: Smooth spring entrance transition from top
 */
export function Navbar() {
  const [activeId, setActiveId] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
  }, [mobileMenuOpen]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        role="banner"
        className="fixed inset-x-0 top-3 sm:top-5 z-50 flex justify-center px-3 sm:px-6 pointer-events-none"
      >
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto w-full max-w-5xl rounded-full border transition-all duration-300 px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between ${
            scrolled
              ? "bg-[#090b10]/90 backdrop-blur-2xl border-white/[0.12] shadow-[0_16px_40px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.1)]"
              : "bg-[#0c0e16]/80 backdrop-blur-xl border-white/[0.08] shadow-[0_12px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.06)]"
          }`}
        >
          {/* =================================================================
              LEFT: PC LOGO MONOGRAM & TITLE
              ================================================================= */}
          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="group flex items-center gap-2.5 rounded-full py-1 pr-2 text-left focus-visible:outline-none cursor-pointer select-none"
            aria-label="Prince Chauhan Home"
          >
            <PCLogo className="h-6 sm:h-7 w-auto transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="font-display text-xs sm:text-sm font-bold tracking-tight text-white group-hover:text-violet-200 transition-colors">
                PRINCE CHAUHAN
              </span>
              <span className="hidden sm:inline font-mono text-[9px] tracking-widest text-white/40 uppercase">
                AI / ML SCHOLAR
              </span>
            </div>
          </button>

          {/* =================================================================
              CENTER: FLOATING SECTION LINKS (DESKTOP)
              ================================================================= */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 rounded-full bg-white/[0.03] p-1 border border-white/[0.05]"
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
                      ? "text-white font-semibold"
                      : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavFloatingPill"
                      className="absolute inset-0 rounded-full bg-white/[0.1] border border-white/[0.12] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* =================================================================
              RIGHT: RESUME CTA BUTTON (MAGNETIC HOVER EFFECT)
              ================================================================= */}
          <div className="hidden md:flex items-center gap-2.5">
            <MagneticButton
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              target="_blank"
              rel="noopener noreferrer"
              title="Download Prince Chauhan Resume (PDF)"
              className="group inline-flex items-center gap-2 rounded-full border border-violet-500/35 bg-gradient-to-r from-violet-600/20 via-violet-500/15 to-indigo-600/20 hover:from-violet-600/30 hover:to-indigo-600/30 hover:border-violet-400 px-4 py-1.5 font-mono text-xs font-semibold text-white transition-all duration-200 shadow-[0_0_20px_rgba(139,92,246,0.2)]"
            >
              <Download
                size={13}
                className="text-violet-300 group-hover:-translate-y-0.5 transition-transform"
              />
              <span>Resume</span>
            </MagneticButton>
          </div>

          {/* =================================================================
              MOBILE ACTIONS: COMPACT RESUME CTA + HAMBURGER BUTTON
              ================================================================= */}
          <div className="flex md:hidden items-center gap-2">
            <MagneticButton
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              target="_blank"
              rel="noopener noreferrer"
              title="Download Resume"
              className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/35 bg-violet-500/15 px-3 py-1 font-mono text-[11px] font-semibold text-white"
            >
              <Download size={11} className="text-violet-300" />
              <span>Resume</span>
            </MagneticButton>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="grid h-8 w-8 place-items-center rounded-full border border-white/[0.12] bg-[#12141e] text-white hover:text-violet-300 shadow-md cursor-pointer transition-colors"
            >
              <Menu size={16} />
            </button>
          </div>
        </motion.div>
      </header>

      {/* =====================================================================
          MOBILE FULL-SCREEN EDITORIAL GLASS OVERLAY
          ===================================================================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#08090c]/96 backdrop-blur-2xl p-6 sm:p-8"
          >
            {/* Top Bar inside Mobile Drawer */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-2.5">
                <PCLogo className="h-7 w-auto" />
                <span className="font-display font-bold text-sm tracking-tight text-white">
                  PRINCE CHAUHAN
                </span>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Menu"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/[0.1] bg-white/[0.04] text-white hover:text-violet-400 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Nav Links */}
            <nav aria-label="Mobile Navigation" className="my-auto flex flex-col space-y-4 py-8">
              {NAV_LINKS.map((link, idx) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1, duration: 0.3 }}
                  type="button"
                  onClick={() => scrollTo(link.id)}
                  className="group flex items-center justify-between py-2 text-left cursor-pointer"
                >
                  <span className="font-display font-bold text-2xl text-white group-hover:text-violet-300 transition-colors">
                    {link.label}
                  </span>
                  <span className="font-mono text-xs text-white/30 group-hover:text-violet-400 transition-colors">
                    0{idx + 1}
                  </span>
                </motion.button>
              ))}
            </nav>

            {/* Mobile Footer & Quick Actions */}
            <div className="space-y-4 border-t border-white/[0.08] pt-6 font-mono text-xs">
              <a
                href={RESUME_PATH}
                download={RESUME_FILENAME}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold text-white flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.35)]"
              >
                <FileText size={15} />
                <span>DOWNLOAD VERIFIED RESUME (PDF)</span>
              </a>

              <div className="flex items-center justify-between text-[11px] text-white/50 pt-2">
                <span>GHAZIABAD · DELHI NCR</span>
                <div className="flex items-center gap-4">
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    GitHub
                  </a>
                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
