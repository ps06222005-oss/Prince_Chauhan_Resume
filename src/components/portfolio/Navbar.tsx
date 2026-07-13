import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, Github } from "lucide-react";
import { PROFILE } from "@/lib/portfolio-data";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "why", label: "Why Me" },
  { id: "journey", label: "Journey" },
  { id: "github", label: "GitHub" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = links.map((l) => document.getElementById(l.id));
      const y = window.scrollY + 120;
      for (const s of sections) {
        if (!s) continue;
        if (s.offsetTop <= y && s.offsetTop + s.offsetHeight > y) { setActive(s.id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-xl bg-[#050816]/70 border-b border-white/5" : ""}`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <button onClick={() => go("home")} className="font-display text-lg font-bold tracking-tight shrink-0">
          <span className="text-gradient">Prince</span><span className="text-foreground/80">.dev</span>
        </button>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.id}>
              <button onClick={() => go(l.id)}
                className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${active === l.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {active === l.id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/5 ring-1 ring-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                )}
                <span className="relative">{l.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-2">
          <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub"
            className="grid h-9 w-9 place-items-center rounded-full glass hover:text-accent-cyan transition-colors">
            <Github size={15} />
          </a>
          <a href={PROFILE.resume} download
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:scale-[1.03] transition-transform">
            <Download size={13} /> Resume
          </a>
        </div>

        <button onClick={() => setOpen((v) => !v)} className="lg:hidden rounded-lg p-2 hover:bg-white/5" aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden backdrop-blur-xl bg-[#050816]/95 border-b border-white/5"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <li key={l.id}>
                  <button onClick={() => go(l.id)}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm ${active === l.id ? "bg-white/5 text-foreground" : "text-muted-foreground"}`}>
                    {l.label}
                  </button>
                </li>
              ))}
              <li className="mt-2 flex gap-2">
                <a href={PROFILE.github} target="_blank" rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full glass px-4 py-2 text-sm">
                  <Github size={14} /> GitHub
                </a>
                <a href={PROFILE.resume} download
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                  <Download size={14} /> Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
