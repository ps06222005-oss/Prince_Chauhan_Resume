import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative mx-auto max-w-7xl px-6 py-28 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14 max-w-2xl"
      >
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-[11px] font-medium tracking-[0.18em] uppercase text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {eyebrow}
          </span>
        )}
        <h2 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
          {title.split(" ").map((w, i, arr) =>
            i === arr.length - 1 ? (
              <span key={i} className="text-gradient">
                {" "}
                {w}
              </span>
            ) : (
              <span key={i}>{i === 0 ? "" : " "}{w}</span>
            ),
          )}
        </h2>
        {subtitle && <p className="mt-5 text-muted-foreground text-lg leading-relaxed">{subtitle}</p>}
      </motion.div>
      {children}
    </section>
  );
}
