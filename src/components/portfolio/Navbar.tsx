import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Github, Linkedin, Mail, Terminal, ArrowUpRight } from "lucide-react";
import { PROFILE } from "@/lib/portfolio-data";
import logo from "@/assets/logo-pc.png";

const CHAPTERS = [
  {
    id: "home",
    index: "00",
    title: "OPENING SCENE",
    subtitle: "Kinetic Identity & Multi-Mode World",
  },
  {
    id: "about",
    index: "01",
    title: "IDENTITY MANIFESTO",
    subtitle: "Acoustic Models, Autonomy & University Foundations",
  },
  {
    id: "projects",
    index: "02",
    title: "ENGINEERED ARTIFACTS",
    subtitle: "Autonomous Architectures, Waveforms & Code",
  },
  {
    id: "skills",
    index: "03",
    title: "ARCHITECTURAL LINEAGES",
    subtitle: "Visual Relationship Map & Capability Graphs",
  },
  {
    id: "github",
    index: "04",
    title: "ENGINEERING EVIDENCE",
    subtitle: "Language Balance & Public Repository Ledger",
  },
  {
    id: "certifications",
    index: "05",
    title: "ARCHIVAL EXHIBITION",
    subtitle: "Verified Accreditations & Institutional Audits",
  },
  {
    id: "contact",
    index: "06",
    title: "CONTINUUM & DIRECT CONTACT",
    subtitle: "Direct Inquiries & Transmission Channels",
  },
];

export function Navbar() {
  const [activeChapter, setActiveChapter] = useState("home");
  const [indexOpen, setIndexOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [time, setTime] = useState("");

  // Live IST time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll tracking to minimize navbar
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection observer for chapters
  useEffect(() => {
    const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => !!el,
    );
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
        if (best) setActiveChapter(best);
      },
      { rootMargin: "-80px 0px -55% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Keyboard shortcut Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && indexOpen) setIndexOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [indexOpen]);

  const scrollTo = (id: string) => {
    setIndexOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const currentChapterObj = CHAPTERS.find((c) => c.id === activeChapter) || CHAPTERS[0];

  return (
    <>
      {/* Minimal Floating Navigation Capsule (Item 10) */}
      <header
        role="banner"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out pointer-events-none ${
          scrolled ? "py-2.5 sm:py-3" : "py-4 sm:py-5"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 ${
            scrolled && !isHovered ? "opacity-90" : "opacity-100"
          }`}
        >
          {/* Brand & Monogram */}
          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="pointer-events-auto flex items-center gap-2.5 font-mono text-xs text-foreground group"
          >
            <div className="relative flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.12] bg-[#0c0e14] transition-colors group-hover:border-amber-400">
              <img
                src={logo}
                alt="Prince Chauhan monogram logo"
                width={16}
                height={16}
                className="h-4 w-4 object-contain"
              />
            </div>
            <div
              className={`transition-all duration-300 hidden sm:flex flex-col text-left font-mono ${
                scrolled && !isHovered
                  ? "opacity-0 -translate-x-2 pointer-events-none w-0 overflow-hidden"
                  : "opacity-100 translate-x-0"
              }`}
            >
              <span className="font-bold tracking-tight text-foreground text-xs leading-none">
                PRINCE CHAUHAN
              </span>
              <span className="text-[10px] text-muted-foreground/70 mt-0.5">
                AI &amp; ML // SYSTEMS
              </span>
            </div>
          </button>

          {/* Minimal Floating Capsule (Reduces prominence on scroll) */}
          <div
            onClick={() => setIndexOpen(true)}
            className={`pointer-events-auto cursor-pointer flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-[#0c0e14]/85 px-3.5 py-1.5 backdrop-blur-xl font-mono text-xs shadow-lg transition-all duration-300 hover:border-amber-400/60 ${
              scrolled ? "scale-95 hover:scale-100" : ""
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-400 font-bold">[{currentChapterObj.index}]</span>
            <span className="text-foreground/90 font-medium tracking-wider uppercase text-[11px]">
              {currentChapterObj.title}
            </span>
          </div>

          {/* Quick Triggers & Direct Recruiter Paths */}
          <div className="pointer-events-auto flex items-center gap-2.5 font-mono text-xs">
            <nav className="hidden lg:flex items-center gap-4 text-[11px] text-muted-foreground mr-1">
              <button
                type="button"
                onClick={() => scrollTo("projects")}
                className="hover:text-amber-300 transition-colors"
              >
                PROJECTS
              </button>
              <a
                href={PROFILE.resume}
                download
                className="hover:text-amber-300 transition-colors flex items-center gap-1"
              >
                <span>CV</span>
                <Download size={11} className="text-amber-400" />
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-300 transition-colors flex items-center gap-1"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={11} className="text-amber-400" />
                <span>LINKEDIN</span>
              </a>
              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="hover:text-amber-300 transition-colors"
              >
                CONTACT
              </button>
            </nav>

            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))
              }
              className={`hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-[#0c0e14]/80 px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-white/[0.2] transition-all backdrop-blur-md ${
                scrolled && !isHovered
                  ? "opacity-0 scale-90 pointer-events-none"
                  : "opacity-100 scale-100"
              }`}
              title="Command Palette (⌘K)"
            >
              <Terminal size={12} className="text-amber-400" />
              <span>CMD</span>
            </button>

            <button
              type="button"
              onClick={() => setIndexOpen(!indexOpen)}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-[#0c0e14]/90 px-3.5 py-1.5 font-semibold text-foreground hover:border-amber-400 hover:text-amber-300 transition-colors backdrop-blur-xl shadow-lg"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
              <span>{indexOpen ? "CLOSE" : "INDEX"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Right Edge Ambient Chapter Spatial Markers (Desktop Only) */}
      <aside
        aria-label="Chapter progress"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3 font-mono text-[10px]"
      >
        {CHAPTERS.map((c) => {
          const isActive = activeChapter === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => scrollTo(c.id)}
              className="group flex items-center justify-end gap-2 text-right transition-all"
            >
              <span
                className={`transition-opacity duration-200 ${
                  isActive
                    ? "opacity-100 text-amber-300 font-bold"
                    : "opacity-0 group-hover:opacity-100 text-muted-foreground"
                }`}
              >
                {c.index} {c.title}
              </span>
              <span
                className={`block transition-all duration-300 ${
                  isActive
                    ? "h-5 w-1 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                    : "h-2 w-1 bg-white/20 rounded-full group-hover:bg-white/50"
                }`}
              />
            </button>
          );
        })}
      </aside>

      {/* Fullscreen Spatial Index Overlay */}
      <AnimatePresence>
        {indexOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[80] flex flex-col justify-between bg-[#07080a]/98 backdrop-blur-2xl p-6 sm:p-12 md:p-16 overflow-y-auto"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 font-mono text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-foreground font-bold">SPATIAL INDEX // 2025</span>
              </div>

              <div className="flex items-center gap-6">
                <span className="hidden sm:inline">GHAZIABAD {time} [UTC+5:30]</span>
                <button
                  type="button"
                  onClick={() => setIndexOpen(false)}
                  className="flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-foreground hover:bg-white/[0.08] transition-colors"
                >
                  <X size={14} />
                  <span>CLOSE [ESC]</span>
                </button>
              </div>
            </div>

            {/* Huge Spatial Chapter Navigation List */}
            <div className="my-auto py-10">
              <nav className="space-y-3 sm:space-y-4">
                {CHAPTERS.map((c) => {
                  const isActive = activeChapter === c.id;

                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => scrollTo(c.id)}
                      className="group flex w-full items-baseline justify-between border-b border-white/[0.04] pb-4 text-left transition-colors duration-200 hover:border-white/[0.2]"
                    >
                      <div className="flex items-baseline gap-4 sm:gap-8">
                        <span className="font-mono text-sm sm:text-base text-amber-400/80 font-semibold">
                          [{c.index}]
                        </span>
                        <div>
                          <span
                            className={`font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight transition-colors duration-200 ${
                              isActive ? "text-amber-300" : "text-[#d1d5db] group-hover:text-white"
                            }`}
                          >
                            {c.title}
                          </span>
                          <p className="mt-1 font-mono text-xs sm:text-sm text-muted-foreground/70 hidden sm:block">
                            {c.subtitle}
                          </p>
                        </div>
                      </div>

                      <span className="hidden font-mono text-xs text-muted-foreground group-hover:text-foreground sm:inline-flex items-center gap-1">
                        <span>GO TO SCENE</span>
                        <ArrowUpRight
                          size={14}
                          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        />
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Quick Links in Overlay */}
            <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/[0.08] pt-6 font-mono text-xs text-muted-foreground">
              <div className="flex items-center gap-6">
                <a
                  href={PROFILE.resume}
                  download
                  className="flex items-center gap-1.5 text-foreground hover:text-amber-300 transition-colors"
                >
                  <Download size={13} className="text-amber-400" />
                  <span>CURRICULUM VITAE</span>
                </a>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-foreground hover:text-amber-300 transition-colors"
                >
                  <Github size={13} />
                  <span>GITHUB</span>
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-foreground hover:text-amber-300 transition-colors"
                >
                  <Linkedin size={13} />
                  <span>LINKEDIN</span>
                </a>
              </div>

              <div className="text-muted-foreground/60 text-[11px]">
                PRINCE CHAUHAN · B.TECH CSE (AI &amp; ML) · SVERIFIED ARTIFACTS
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
