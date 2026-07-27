import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Home, User, Wrench, FolderGit2, Sparkles, Route as RouteIcon,
  Github, GraduationCap, Award, Trophy, Terminal as TermIcon, Mail,
  Download, Linkedin, Copy, Command,
} from "lucide-react";
import { PROFILE } from "@/lib/portfolio-data";

type Action = {
  id: string;
  label: string;
  hint?: string;
  group: "Navigate" | "Actions" | "Links";
  icon: React.ComponentType<{ size?: number }>;
  run: () => void;
};

const sectionActions: { id: string; label: string; icon: Action["icon"] }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "why", label: "Why Hire Me", icon: Sparkles },
  { id: "journey", label: "Learning Journey", icon: RouteIcon },
  { id: "github", label: "GitHub Stats", icon: Github },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "achievements", label: "Achievements", icon: Trophy },
  { id: "terminal", label: "Terminal", icon: TermIcon },
  { id: "contact", label: "Contact", icon: Mail },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => { if (!open) { setQ(""); setCursor(0); } }, [open]);

  const actions: Action[] = useMemo(() => {
    const go = (id: string) => () => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    };
    const nav: Action[] = sectionActions.map((s) => ({
      id: `go-${s.id}`, label: `Go to ${s.label}`, group: "Navigate", icon: s.icon, run: go(s.id),
    }));
    const acts: Action[] = [
      { id: "resume", label: "Download Resume", hint: "PDF", group: "Actions", icon: Download,
        run: () => { window.open(PROFILE.resume, "_blank"); setOpen(false); } },
      { id: "copy-email", label: "Copy Email", hint: PROFILE.email, group: "Actions", icon: Copy,
        run: () => { navigator.clipboard?.writeText(PROFILE.email); setOpen(false); } },
      { id: "copy-phone", label: "Copy Phone", hint: PROFILE.phone, group: "Actions", icon: Copy,
        run: () => { navigator.clipboard?.writeText(PROFILE.phone); setOpen(false); } },
    ];
    const links: Action[] = [
      { id: "gh", label: "Open GitHub", hint: PROFILE.githubUser, group: "Links", icon: Github,
        run: () => { window.open(PROFILE.github, "_blank"); setOpen(false); } },
      { id: "li", label: "Open LinkedIn", hint: "prince-chauhan", group: "Links", icon: Linkedin,
        run: () => { window.open(PROFILE.linkedin, "_blank"); setOpen(false); } },
      { id: "mail", label: "Send Email", hint: PROFILE.email, group: "Links", icon: Mail,
        run: () => { window.location.href = `mailto:${PROFILE.email}`; setOpen(false); } },
    ];
    return [...nav, ...acts, ...links];
  }, []);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return actions;
    return actions.filter((a) => (a.label + " " + (a.hint ?? "")).toLowerCase().includes(t));
  }, [q, actions]);

  const grouped = useMemo(() => {
    const g: Record<string, Action[]> = { Navigate: [], Actions: [], Links: [] };
    filtered.forEach((a) => g[a.group].push(a));
    return g;
  }, [filtered]);

  useEffect(() => { setCursor(0); }, [q]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => Math.min(c + 1, filtered.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); filtered[cursor]?.run(); }
  };

  let idx = -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] grid place-items-start justify-center bg-black/60 backdrop-blur-sm p-4 pt-[10vh]"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-xl overflow-hidden rounded-2xl"
          >
            <div className="flex items-center gap-3 border-b border-black/[0.08] px-4 py-3">
              <Search size={16} className="text-muted-foreground" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search sections, actions, links…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
              />
              <span className="hidden sm:inline-flex items-center gap-1 rounded-md border border-black/[0.08] bg-black/[0.04] px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                <Command size={10} /> K
              </span>
            </div>
            <div className="max-h-[55vh] overflow-auto p-2">
              {filtered.length === 0 && (
                <p className="p-6 text-center text-sm text-muted-foreground">No results for "{q}"</p>
              )}
              {(Object.keys(grouped) as Array<keyof typeof grouped>).map((group) => {
                const items = grouped[group];
                if (!items.length) return null;
                return (
                  <div key={group} className="mb-1">
                    <p className="px-3 py-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">{group}</p>
                    {items.map((a) => {
                      idx += 1;
                      const active = idx === cursor;
                      return (
                        <button
                          key={a.id}
                          onMouseEnter={() => setCursor(filtered.indexOf(a))}
                          onClick={a.run}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                            active ? "bg-black/[0.06] text-foreground" : "text-foreground/90 hover:bg-black/[0.04]"
                          }`}
                        >
                          <span className="grid h-7 w-7 place-items-center rounded-md bg-black/[0.04] text-accent-cyan ring-1 ring-black/[0.08]">
                            <a.icon size={13} />
                          </span>
                          <span className="flex-1 truncate">{a.label}</span>
                          {a.hint && <span className="truncate text-xs text-muted-foreground">{a.hint}</span>}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-black/[0.08] bg-black/[0.02] px-4 py-2 text-[11px] text-muted-foreground">
              <span>↑↓ navigate · ↵ select · esc close</span>
              <span>{filtered.length} results</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
