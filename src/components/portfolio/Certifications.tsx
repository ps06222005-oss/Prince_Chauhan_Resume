import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Award, BadgeCheck, Search, X, ExternalLink, Download,
  ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Maximize2,
} from "lucide-react";
import { Section } from "./Section";
import certPaper from "@/assets/cert-paper.jpg";

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

/** Certificate artwork: paper texture + real certificate data, no invented content. */
function CertificateArtwork({ cert, size = "card" }: { cert: Cert; size?: "card" | "full" }) {
  const full = size === "full";
  return (
    <div className="relative h-full w-full overflow-hidden bg-secondary">
      <img
        src={certPaper}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        width={1280}
        height={960}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className={`relative flex h-full w-full flex-col items-center justify-center text-center ${full ? "p-10 sm:p-16" : "p-6"}`}
      >
        <span
          className={`grid place-items-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20 ${full ? "h-16 w-16" : "h-10 w-10"}`}
        >
          <Award size={full ? 28 : 18} />
        </span>
        <p
          className={`mt-4 uppercase text-muted-foreground ${full ? "text-xs tracking-[0.4em]" : "text-[9px] tracking-[0.28em]"}`}
        >
          Certificate
        </p>
        <p
          className={`mt-2 font-display font-semibold leading-tight text-foreground ${full ? "text-3xl sm:text-4xl" : "text-base"}`}
        >
          {cert.title}
        </p>
        <span className={`mt-4 block bg-primary/40 ${full ? "h-px w-24" : "h-px w-12"}`} />
        <p className={`mt-4 text-muted-foreground ${full ? "text-base" : "text-[11px]"}`}>
          {cert.issuer}
        </p>
        <p
          className={`mt-1 uppercase text-muted-foreground/80 ${full ? "text-xs tracking-[0.3em]" : "text-[9px] tracking-[0.22em]"}`}
        >
          {cert.year}
        </p>
      </div>
    </div>
  );
}

export function Certifications() {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [index, setIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return certs.filter((c) => {
      const okQ = !q || (c.title + " " + c.issuer).toLowerCase().includes(q);
      const okC = cat === "All" || c.category === cat;
      return okQ && okC;
    });
  }, [query, cat]);

  const open = index === null ? null : filtered[index] ?? null;

  const openAt = (i: number, el: HTMLElement | null) => {
    lastFocused.current = el;
    setZoom(1);
    setIndex(i);
  };

  const close = useCallback(() => {
    setIndex(null);
    setZoom(1);
    lastFocused.current?.focus();
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      setZoom(1);
      setIndex((i) => (i === null ? i : (i + dir + filtered.length) % filtered.length));
    },
    [filtered.length],
  );

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(3, z + 0.25));
      else if (e.key === "-") setZoom((z) => Math.max(1, z - 0.25));
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [index, close, step]);

  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      title="Credentials & coursework"
      subtitle="Learning tracks I've completed or participated in. Select any certificate to view it full size."
    >
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="glass flex items-center gap-2 rounded-full px-4 py-2 sm:max-w-sm">
          <Search size={14} className="shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setIndex(null); }}
            placeholder="Search certificates…"
            aria-label="Search certificates"
            className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
          />
        </div>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter certificates by category">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => { setCat(c); setIndex(null); }}
              aria-pressed={cat === c}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                cat === c
                  ? "border-primary/40 bg-primary/10 text-foreground"
                  : "border-border bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="glass rounded-2xl p-10 text-center text-sm text-muted-foreground">
          No certificates match your filters.
        </p>
      ) : (
        /* Masonry via CSS columns — responsive, no layout libraries */
        <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>li]:mb-6">
          {filtered.map((c, i) => (
            <li key={c.title} className="break-inside-avoid">
              <motion.button
                type="button"
                initial={reduce ? undefined : { opacity: 0, y: 24 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: Math.min(i * 0.08, 0.3), ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduce ? undefined : { y: -6 }}
                onClick={(e) => openAt(i, e.currentTarget)}
                aria-label={`View ${c.title} certificate from ${c.issuer}, ${c.year}`}
                className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-background text-left shadow-[var(--shadow-card)] transition-all hover:border-primary/30 hover:shadow-[var(--shadow-elevated)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <div
                  className={`relative overflow-hidden ${
                    i % 3 === 1 ? "aspect-[3/4]" : i % 3 === 2 ? "aspect-square" : "aspect-[4/3]"
                  }`}
                >
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06] motion-reduce:transform-none">
                    <CertificateArtwork cert={c} />
                  </div>
                  <span className="pointer-events-none absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/[0.04]" />
                  <span className="pointer-events-none absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-primary opacity-0 shadow-[var(--shadow-card)] backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                    <Maximize2 size={15} aria-hidden="true" />
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold leading-snug">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.issuer}</p>
                  <div className="mt-4 flex items-center justify-between gap-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    <span>{c.year}</span>
                    <span className="shrink-0 rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[10px] font-medium normal-case tracking-normal text-foreground/70">
                      {c.category}
                    </span>
                  </div>
                </div>
              </motion.button>
            </li>
          ))}
        </ul>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex flex-col bg-foreground/50 p-4 backdrop-blur-md sm:p-8"
            onClick={close}
          >
            <motion.div
              initial={reduce ? undefined : { scale: 0.96, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={reduce ? undefined : { scale: 0.96, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="mx-auto flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-[var(--shadow-elevated)]"
              role="dialog"
              aria-modal="true"
              aria-label={`${open.title} certificate`}
            >
              <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border px-5 py-4 sm:px-6">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                    <BadgeCheck size={18} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-base font-semibold sm:text-lg">{open.title}</h3>
                    <p className="truncate text-xs text-muted-foreground sm:text-sm">
                      {open.issuer} · {open.year}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    onClick={() => setZoom((z) => Math.max(1, z - 0.25))}
                    disabled={zoom <= 1}
                    aria-label="Zoom out"
                    className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
                  >
                    <ZoomOut size={16} aria-hidden="true" />
                  </button>
                  <span className="w-12 text-center text-xs tabular-nums text-muted-foreground" aria-live="polite">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
                    disabled={zoom >= 3}
                    aria-label="Zoom in"
                    className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
                  >
                    <ZoomIn size={16} aria-hidden="true" />
                  </button>
                  <button
                    ref={closeRef}
                    onClick={close}
                    aria-label="Close certificate viewer"
                    className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <X size={18} aria-hidden="true" />
                  </button>
                </div>
              </header>

              <div className="relative flex flex-1 items-center justify-center overflow-auto bg-secondary p-4 sm:p-8">
                <div className="mx-auto w-full max-w-3xl">

                  <div
                    className="origin-top overflow-hidden rounded-2xl border border-border bg-background shadow-[var(--shadow-card)] transition-transform duration-300 ease-out"
                    style={{ transform: `scale(${zoom})` }}
                  >
                    <div className="aspect-[4/3]">
                      <CertificateArtwork cert={open} size="full" />
                    </div>
                  </div>
                </div>

                {filtered.length > 1 && (
                  <>
                    <button
                      onClick={() => step(-1)}
                      aria-label="Previous certificate"
                      className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/90 text-foreground shadow-[var(--shadow-card)] backdrop-blur transition-colors hover:bg-background"
                    >
                      <ChevronLeft size={18} aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => step(1)}
                      aria-label="Next certificate"
                      className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/90 text-foreground shadow-[var(--shadow-card)] backdrop-blur transition-colors hover:bg-background"
                    >
                      <ChevronRight size={18} aria-hidden="true" />
                    </button>
                  </>
                )}
              </div>

              <footer className="flex flex-wrap items-center gap-3 border-t border-border px-5 py-4 sm:px-6">
                <span className="mr-auto text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {open.category}
                </span>
                {open.verifyUrl ? (
                  <a
                    href={open.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                  >
                    <ExternalLink size={14} aria-hidden="true" /> Verify
                  </a>
                ) : (
                  <button
                    disabled
                    title="Verification link coming soon"
                    className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm text-muted-foreground"
                  >
                    <ExternalLink size={14} aria-hidden="true" /> Verify
                  </button>
                )}
                {open.fileUrl ? (
                  <a
                    href={open.fileUrl}
                    download
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
                  >
                    <Download size={14} aria-hidden="true" /> Download
                  </a>
                ) : (
                  <button
                    disabled
                    title="Certificate file coming soon"
                    className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm text-muted-foreground"
                  >
                    <Download size={14} aria-hidden="true" /> Download
                  </button>
                )}
              </footer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
