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

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c, i) => (
          <motion.button
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            onClick={() => setOpen(c)}
            className="glass group relative overflow-hidden rounded-2xl p-6 text-left hover:border-accent-blue/40 transition-colors"
          >
            <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-50"
              style={{ background: "var(--gradient-primary)" }} />
            <div className="absolute right-4 top-4 text-accent-cyan/70">
              <BadgeCheck size={18} />
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary/20 text-accent-cyan">
              <Award size={20} />
            </div>
            <h3 className="mt-4 font-semibold leading-snug">{c.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.issuer}</p>
            <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-wider text-muted-foreground">
              <span>{c.year}</span>
              <span className="rounded-full border border-black/[0.08] bg-black/[0.03] px-2 py-0.5 text-[10px] normal-case tracking-normal">
                {c.category}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] grid place-items-center bg-black/70 backdrop-blur-sm p-4"
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
