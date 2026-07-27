import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, BadgeCheck, Search, X, ExternalLink, Download } from "lucide-react";
import { Section } from "./Section";

type Cert = {
  title: string;
  issuer: string;
  year: string;
  category: "AI/ML" | "Programming" | "Workshop";
  verifyUrl?: string;
  fileUrl?: string;
};

const certs: Cert[] = [
  { title: "AI For All", issuer: "Intel & CBSE Initiative", year: "2024", category: "AI/ML" },
  { title: "Introduction to Python", issuer: "Online Coursework", year: "2024", category: "Programming" },
  { title: "AI/ML Workshop Participation", issuer: "University Program", year: "2024", category: "Workshop" },
];

const CATEGORIES = ["All", "AI/ML", "Programming", "Workshop"] as const;

export function Certifications() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [open, setOpen] = useState<Cert | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return certs.filter((c) => {
      const okQ = !q || (c.title + " " + c.issuer).toLowerCase().includes(q);
      const okC = cat === "All" || c.category === cat;
      return okQ && okC;
    });
  }, [query, cat]);

  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      title="Credentials & coursework"
      subtitle="Learning tracks I've completed or participated in."
    >
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="glass flex items-center gap-2 rounded-full px-4 py-2 sm:max-w-sm">
          <Search size={14} className="text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search certificates…"
            aria-label="Search certificates"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                cat === c
                  ? "border-accent-blue/60 bg-accent-blue/20 text-foreground"
                  : "border-black/[0.08] bg-black/[0.03] text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <p className="glass rounded-2xl p-10 text-center text-sm text-muted-foreground">
          No certificates match your filters.
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c, i) => (
          <motion.button
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            onClick={() => setOpen(c)}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-background/70 text-left shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] hover:border-primary/30 transition-all"
          >
            {/* Thumbnail */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/12 via-background to-primary/5">
              <div className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 25%, rgba(59,130,246,0.22), transparent 55%), radial-gradient(circle at 85% 80%, rgba(96,165,250,0.20), transparent 55%)",
                }} />
              <div className="absolute inset-6 rounded-xl border border-primary/15 bg-white/60 backdrop-blur-sm shadow-[var(--shadow-card)] p-5 flex flex-col justify-between transition-transform duration-500 group-hover:scale-[1.03]">
                <div className="flex items-start justify-between">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary">
                    <Award size={16} />
                  </span>
                  <BadgeCheck size={16} className="text-primary/70" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Certificate</p>
                  <p className="mt-1 text-sm font-semibold leading-snug line-clamp-2">{c.title}</p>
                </div>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-semibold leading-snug">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.issuer}</p>
              <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                <span>{c.year}</span>
                <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] normal-case tracking-normal font-medium text-foreground/70">
                  {c.category}
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] grid place-items-center bg-foreground/40 backdrop-blur-md p-4"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass w-full max-w-lg overflow-hidden rounded-2xl p-8"
              role="dialog"
              aria-modal="true"
              aria-label={`${open.title} certificate details`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary/20 text-accent-cyan">
                    <Award size={20} />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold leading-tight">{open.title}</h3>
                    <p className="text-sm text-muted-foreground">{open.issuer} · {open.year}</p>
                  </div>
                </div>
                <button onClick={() => setOpen(null)} className="rounded-full p-1.5 hover:bg-black/[0.06]" aria-label="Close">
                  <X size={18} />
                </button>
              </div>

              <div className="mt-6 grid aspect-video place-items-center overflow-hidden rounded-xl border border-black/[0.08] bg-gradient-to-br from-accent-blue/10 to-accent-cyan/5">
                <div className="text-center">
                  <Award className="mx-auto text-accent-cyan" size={48} />
                  <p className="mt-3 text-sm text-muted-foreground">Certificate preview coming soon</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  disabled
                  title="Verification link coming soon"
                  className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-black/[0.04] px-4 py-2 text-sm opacity-60"
                >
                  <ExternalLink size={14} /> Verify
                </button>
                <button
                  disabled
                  title="Certificate file coming soon"
                  className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-black/[0.04] px-4 py-2 text-sm opacity-60"
                >
                  <Download size={14} /> Download
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
