import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Copy, Check, Download } from "lucide-react";
import { PROFILE } from "@/lib/portfolio-data";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(PROFILE.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    });
  };

  return (
    <section
      id="contact"
      aria-label="Cinematic Closing Scene"
      className="relative min-h-[92vh] w-full overflow-hidden bg-[#060709] pt-28 pb-16 sm:pt-40 sm:pb-24 border-t border-white/[0.06] flex flex-col justify-between select-none"
    >
      {/* Visual Silence Atmosphere — deep obsidian void */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(245,158,11,0.03)_0%,_transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 flex flex-col justify-between min-h-[70vh]">
        {/* Top Sequence Marker */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 font-mono text-xs text-muted-foreground/60">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span>05 // OUTRO &amp; PROTOCOL DISPATCH</span>
          </div>
          <span className="hidden sm:inline">END OF EXPERIENCE</span>
        </div>

        {/* Cinematic Finale Typography (Section 14) */}
        <div className="my-auto py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-black tracking-[-0.05em] text-[#f4f4f2] leading-[0.85]">
              <span className="block">BUILD</span>
              <span className="block text-gradient-titanium">THE NEXT</span>
              <span className="block">SYSTEM.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 sm:mt-12 max-w-xl font-sans text-lg sm:text-xl text-muted-foreground/90 font-light leading-relaxed"
          >
            Currently open for AI/ML engineering, autonomous systems, and creative technology
            opportunities in 2025/2026.
          </motion.p>
        </div>

        {/* Minimal Typographic Reveal Channels (Section 14) */}
        <div className="border-t border-white/[0.08] pt-10 font-mono">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* EMAIL */}
            <div className="space-y-2 border-b sm:border-b-0 border-white/[0.06] pb-4 sm:pb-0">
              <div className="text-[11px] text-amber-400 uppercase tracking-widest font-semibold">
                01 // EMAIL
              </div>
              <div>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="font-display text-lg sm:text-xl font-bold text-[#f4f4f2] hover:text-amber-300 transition-colors block truncate"
                >
                  {PROFILE.email}
                </a>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors pt-1"
              >
                {copied ? (
                  <>
                    <Check size={12} className="text-emerald-400" />
                    <span className="text-emerald-400">Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>

            {/* LINKEDIN */}
            <div className="space-y-2 border-b sm:border-b-0 border-white/[0.06] pb-4 sm:pb-0">
              <div className="text-[11px] text-accent-cyan uppercase tracking-widest font-semibold">
                02 // LINKEDIN
              </div>
              <div>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-lg sm:text-xl font-bold text-[#f4f4f2] hover:text-amber-300 transition-colors inline-flex items-center gap-1 group"
                >
                  <span>prince-chauhan-3418a3288</span>
                  <ArrowUpRight
                    size={14}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </a>
              </div>
              <div className="text-xs text-muted-foreground/60">Professional Network</div>
            </div>

            {/* GITHUB */}
            <div className="space-y-2 border-b sm:border-b-0 border-white/[0.06] pb-4 sm:pb-0">
              <div className="text-[11px] text-[#f4f4f2] uppercase tracking-widest font-semibold">
                03 // GITHUB
              </div>
              <div>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-lg sm:text-xl font-bold text-[#f4f4f2] hover:text-amber-300 transition-colors inline-flex items-center gap-1 group"
                >
                  <span>ps06222005-oss</span>
                  <ArrowUpRight
                    size={14}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </a>
              </div>
              <div className="text-xs text-muted-foreground/60">Open Source Telemetry</div>
            </div>

            {/* RESUME */}
            <div className="space-y-2">
              <div className="text-[11px] text-amber-300 uppercase tracking-widest font-semibold">
                04 // RESUME
              </div>
              <div>
                <a
                  href={PROFILE.resume}
                  download
                  className="font-display text-lg sm:text-xl font-bold text-[#f4f4f2] hover:text-amber-300 transition-colors inline-flex items-center gap-1 group"
                >
                  <span>Curriculum Vitae</span>
                  <Download
                    size={14}
                    className="group-hover:translate-y-0.5 transition-transform text-amber-400"
                  />
                </a>
              </div>
              <div className="text-xs text-muted-foreground/60">Direct PDF Document</div>
            </div>
          </div>

          {/* Architectural Colophon Coordinates */}
          <div className="mt-14 sm:mt-20 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-[11px] text-muted-foreground/50">
            <div>PRINCE CHAUHAN · B.TECH CSE (AI &amp; ML) · SUNDERDEEP GLOBAL UNIVERSITY</div>
            <div>28.6692° N, 77.4538° E · GHAZIABAD, DELHI NCR</div>
          </div>
        </div>
      </div>
    </section>
  );
}
