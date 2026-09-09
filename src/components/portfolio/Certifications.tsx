import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Award,
  Search,
  X,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Section } from "./Section";
import { CERTIFICATES, type Certificate } from "@/data/certificates";

function CertificateCardVisual({
  cert,
  size = "card",
}: {
  cert: Certificate;
  size?: "card" | "full";
}) {
  const full = size === "full";

  if (cert.image) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-black/60">
        <img
          src={cert.image}
          alt={`${cert.title} certificate`}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0e14] p-8 font-mono">
      <div className="flex items-center justify-between text-[11px] text-muted-foreground/80 border-b border-white/[0.06] pb-3">
        <span className="flex items-center gap-1.5 text-amber-400">
          <ShieldCheck size={13} />
          ACCESSIONED RECORD
        </span>
        <span>{cert.issueDate}</span>
      </div>

      <div className="my-auto py-6 text-center">
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full border border-white/[0.12] bg-white/[0.02] text-amber-400">
          <Award size={22} />
        </div>
        <h4
          className={`font-display font-bold tracking-tight text-foreground ${
            full ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
          }`}
        >
          {cert.title}
        </h4>
        <p className="mt-1.5 font-sans text-xs sm:text-sm text-muted-foreground">{cert.issuer}</p>
        {cert.credentialId && (
          <p className="mt-3 font-mono text-[10px] text-muted-foreground/70">
            RECORD ID: <span className="text-foreground">{cert.credentialId}</span>
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-3 text-[10px] text-muted-foreground">
        <span>{cert.category || "ACCREDITATION"}</span>
        {cert.verificationUrl && (
          <span className="text-amber-400 font-semibold flex items-center gap-1">
            CRYPTOGRAPHIC PROOF
          </span>
        )}
      </div>
    </div>
  );
}

export function Certifications() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [index, setIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    CERTIFICATES.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CERTIFICATES.filter((c) => {
      const matchQ =
        !q ||
        (c.title + " " + c.issuer + " " + (c.technologies?.join(" ") || ""))
          .toLowerCase()
          .includes(q);
      const matchC = selectedCategory === "All" || c.category === selectedCategory;
      return matchQ && matchC;
    });
  }, [query, selectedCategory]);

  const open = index === null ? null : (filtered[index] ?? null);

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

  const hasVerifiedData = CERTIFICATES.length > 0;

  return (
    <Section
      id="certifications"
      index="05"
      eyebrow="Archival Exhibition"
      title="Verified credentials & institutional accreditations."
      subtitle="Exhibition gallery of official coursework, machine learning accreditations, and cryptographically verified certifications."
      accent="amber"
    >
      {!hasVerifiedData ? (
        /* Archival Registry Exhibition State */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative border-y border-white/[0.08] py-14 sm:py-20"
        >
          <div className="max-w-3xl space-y-6">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-amber-400 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>REGISTRY PROTOCOL // STANDBY</span>
            </div>

            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f4f4f2]">
              Academic accreditations &amp; machine learning credentials in verification audit.
            </h3>

            <p className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed">
              In accordance with high-trust engineering ethics, only verified certificates
              accompanied by cryptographic validation hashes and direct institutional registrar
              links are accessioned into this archive. Academic accreditations from Sunderdeep
              Global University and specialized AI coursework are undergoing registration.
            </p>

            {/* Museum Exhibition Guidelines */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/[0.06] font-mono text-xs">
              <div className="space-y-1.5">
                <span className="text-amber-400 font-semibold">[01] CRYPTOGRAPHIC AUDIT</span>
                <p className="text-muted-foreground/80 font-sans text-xs leading-normal">
                  Direct hashes linking back to official issuer databases.
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-foreground font-semibold">[02] VECTOR INSPECTION</span>
                <p className="text-muted-foreground/80 font-sans text-xs leading-normal">
                  Inline full-resolution document lightboxes with zoom capabilities.
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-accent-cyan font-semibold">[03] COMPETENCY MAPPING</span>
                <p className="text-muted-foreground/80 font-sans text-xs leading-normal">
                  Explicit association to shipped production software artifacts.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Populated Archival Gallery */
        <>
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-1 font-mono text-xs transition-all ${
                    selectedCategory === cat
                      ? "bg-foreground text-background font-bold"
                      : "border border-white/[0.08] text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search archive..."
                className="w-full rounded-full border border-white/[0.1] bg-white/[0.02] pl-8 pr-4 py-1.5 font-mono text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((cert, i) => (
              <div
                key={cert.id}
                data-cursor="inspect"
                onClick={(e) => openAt(i, e.currentTarget)}
                className="cursor-pointer transition-transform duration-300 hover:-translate-y-1"
              >
                <CertificateCardVisual cert={cert} size="card" />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Archival Inspection Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] grid place-items-center bg-black/90 backdrop-blur-xl p-4 sm:p-8"
            onClick={close}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[90vh] w-full max-w-4xl flex-col rounded-3xl border border-white/[0.16] bg-[#0c0e14] p-6 sm:p-10 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 font-mono text-xs">
                <span className="text-amber-400">ARCHIVAL INSPECTION // {open.title}</span>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  className="rounded-full p-2 text-muted-foreground hover:text-foreground"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="my-6 max-h-[60vh] overflow-hidden flex items-center justify-center">
                <CertificateCardVisual cert={open} size="full" />
              </div>

              <div className="flex items-center justify-between border-t border-white/[0.08] pt-4 font-mono text-xs">
                {open.verificationUrl && (
                  <a
                    href={open.verificationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-amber-400 hover:underline"
                  >
                    <span>Official Institutional Verification</span>
                    <ExternalLink size={12} />
                  </a>
                )}
                <span className="text-muted-foreground/60">
                  {open.issuer} · {open.issueDate}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
