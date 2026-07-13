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
    <section id={id} className="relative mx-auto max-w-7xl px-6 py-24 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-12 max-w-2xl"
      >
        {eyebrow && (
          <span className="inline-flex items-center rounded-full glass px-3 py-1 text-xs font-medium tracking-widest uppercase text-accent-cyan">
            {eyebrow}
          </span>
        )}
        <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
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
        {subtitle && <p className="mt-4 text-muted-foreground text-lg">{subtitle}</p>}
      </motion.div>
      {children}
    </section>
  );
}
