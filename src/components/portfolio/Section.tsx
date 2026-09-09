import { motion } from "framer-motion";
import type { ReactNode } from "react";

export interface SectionProps {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  index?: string;
  accent?: "amber" | "cyan" | "violet" | "neutral";
  highlightWord?: boolean;
  className?: string;
}

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  index,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`relative mx-auto max-w-7xl px-6 py-20 sm:py-28 ${className}`}>
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-14 max-w-4xl border-t border-white/[0.08] pt-8 sm:pt-10"
      >
        <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground/80">
          {index && <span className="font-bold text-amber-400">[{index}]</span>}
          {eyebrow && (
            <span className="uppercase tracking-[0.2em] font-semibold text-foreground/80">
              {eyebrow}
            </span>
          )}
        </div>

        <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.04em] text-[#f4f4f2] leading-[1.05]">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-4 max-w-2xl font-sans text-base sm:text-lg leading-relaxed text-muted-foreground/90 font-normal">
            {subtitle}
          </p>
        )}
      </motion.header>

      {children}
    </section>
  );
}
