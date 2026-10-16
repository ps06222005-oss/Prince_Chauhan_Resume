import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Menu, ArrowRight } from "lucide-react";
import { RESUME_PATH, RESUME_FILENAME } from "@/lib/resume";
import { NAV_LINKS } from "@/data/navigation";
import { PCLogo } from "./PCLogo";
import { MagneticButton } from "./MagneticButton";

/**
 * Navbar — Floating Glassmorphism Navigation Bar
 *
 * Matching the Neon AI Dashboard direction:
 * - Left: PC Logo monogram + Prince Chauhan title
 * - Center: Floating section links (Home, Work, About, Skills, Contact)
 * - Right: "Get In Touch →" electric gradient action + Resume download
 * - Mobile: Clean hamburger menu with accessible modal drawer
 */
export function Navbar() {
  const [activeId, setActiveId] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection for glass tint adjustment
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
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
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
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto w-full max-w-6xl rounded-full border transition-all duration-300 px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between ${
            scrolled
              ? "bg-[#07090e]/90 backdrop-blur-2xl border-white/[0.12] shadow-[0_16px_40px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.08)]"
              : "bg-[#090c14]/75 backdrop-blur-xl border-white/[0.08] shadow-[0_12px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)]"
          }`}
        >
          {/* =================================================================
              LEFT: PC LOGO MONOGRAM & BRAND
              ================================================================= */}
          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="group flex items-center gap-2.5 rounded-full py-1 pr-2 text-left focus-visible:outline-none cursor-pointer select-none"
            aria-label="Prince Chauhan Home"
          >
            <PCLogo className="h-6 sm:h-7 w-auto transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="font-display text-xs sm:text-sm font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors">
                Prince Chauhan
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
                  className={`relative rounded-full px-3.5 py-1.5 font-sans text-xs font-medium transition-all duration-200 cursor-pointer select-none ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavFloatingPill"
                      className="absolute inset-0 rounded-full bg-white/[0.1] border border-white/[0.15] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* =================================================================
              RIGHT: RESUME + "GET IN TOUCH" ACTIONS (DESKTOP)
              ================================================================= */}
          <div className="hidden md:flex items-center gap-3">
            <MagneticButton
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              target="_blank"
              rel="noopener noreferrer"
              title="Download Resume (PDF)"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/[0.2] px-3.5 py-1.5 font-sans text-xs font-medium text-slate-200 hover:text-white transition-all duration-200"
            >
              <Download size={13} className="text-sky-400" />
              <span>Resume</span>
            </MagneticButton>

            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 px-4 py-1.5 font-sans text-xs font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_28px_rgba(59,130,246,0.5)] active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <span>Get In Touch</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* =================================================================
              MOBILE ACTIONS: COMPACT RESUME + HAMBURGER BUTTON
              ================================================================= */}
          <div className="flex md:hidden items-center gap-2">
            <MagneticButton
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              target="_blank"
              rel="noopener noreferrer"
              title="Download Resume"
              className="inline-flex items-center gap-1 rounded-full border border-sky-500/35 bg-sky-500/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-white"
            >
              <Download size={11} className="text-sky-400" />
              <span>Resume</span>
            </MagneticButton>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              aria-expanded={mobileMenuOpen}
              className="grid h-8 w-8 place-items-center rounded-full border border-white/[0.12] bg-[#121624] text-white hover:text-sky-300 shadow-md cursor-pointer transition-colors"
            >
              <Menu size={15} />
            </button>
          </div>
        </motion.div>
      </header>

      {/* =====================================================================
          MOBILE FULLSCREEN MENU DRAWER
          ===================================================================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            className="fixed inset-0 z-50 flex flex-col justify-between bg-[#07090e]/95 backdrop-blur-2xl px-6 py-8"
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
              <div className="flex items-center gap-2.5">
                <PCLogo className="h-7 w-auto" />
                <span className="font-display text-sm font-bold tracking-tight text-white">
                  Prince Chauhan
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/[0.1] bg-white/[0.04] text-white/70 hover:text-white cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <nav className="flex flex-col gap-3 py-8">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollTo(link.id)}
                  className="flex items-center justify-between rounded-xl p-3 text-left hover:bg-white/[0.04] transition-colors"
                >
                  <span className="font-display text-lg font-bold text-white">{link.label}</span>
                  <span className="font-mono text-xs text-sky-400">{link.num}</span>
                </button>
              ))}
            </nav>

            <div className="space-y-3 pt-6 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white font-sans text-sm font-semibold shadow-lg shadow-blue-500/25 cursor-pointer"
              >
                <span>Get In Touch</span>
                <ArrowRight size={14} />
              </button>
              <a
                href={RESUME_PATH}
                download={RESUME_FILENAME}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/[0.12] bg-white/[0.04] text-white font-sans text-sm font-medium"
              >
                <Download size={14} className="text-sky-400" />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
