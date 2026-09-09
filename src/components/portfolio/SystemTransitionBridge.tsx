import { motion } from "framer-motion";
import { Cpu, Terminal, Sparkles, Workflow, ArrowDown } from "lucide-react";

export function SystemTransitionBridge() {
  return (
    <div
      aria-label="Continuum: Person to Intelligence to Systems"
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12"
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.02] via-black/40 to-white/[0.01] p-6 sm:p-10 backdrop-blur-md">
        {/* Top Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] pb-4 font-mono text-[11px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse" />
            <span className="text-foreground/90 font-semibold">SPATIAL CONTINUUM // 01 → 03</span>
          </div>

          <div className="flex items-center gap-3">
            <span>TRANSITION: IDENTITY → INTELLIGENCE → SYSTEMS</span>
          </div>
        </div>

        {/* 3-Step Continuum Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3 relative">
          {/* Connecting Conduit Line behind the nodes on desktop */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-px -translate-y-1/2 bg-gradient-to-r from-amber-500/40 via-accent-cyan/40 to-purple-500/40"
          />

          {/* Step 1: PERSON */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl border border-amber-500/30 bg-black/60 p-6 backdrop-blur-md shadow-[0_0_24px_-12px_oklch(0.72_0.16_55/0.25)]"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-400">[01 // PERSON]</span>
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-amber-500/10 text-amber-300">
                <Terminal size={15} />
              </div>
            </div>
            <h3 className="mt-3 font-display text-lg font-bold text-foreground">Prince Chauhan</h3>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              B.Tech in Computer Science &amp; Engineering (AI &amp; ML). Grounded in algorithmic
              rigor, mathematical principles, and open experimentation.
            </p>
            <div className="mt-4 flex items-center gap-2 font-mono text-[10px] text-amber-300/80">
              <span>PRIMITIVES: DSA · C · PYTHON</span>
            </div>
          </motion.div>

          {/* Step 2: INTELLIGENCE */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-2xl border border-accent-cyan/30 bg-black/60 p-6 backdrop-blur-md shadow-[0_0_24px_-12px_oklch(0.78_0.11_215/0.25)]"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent-cyan">
                [02 // INTELLIGENCE]
              </span>
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-accent-cyan/10 text-accent-cyan">
                <Cpu size={15} />
              </div>
            </div>
            <h3 className="mt-3 font-display text-lg font-bold text-foreground">
              Machine Learning &amp; Models
            </h3>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Synthesizing acoustic models, text tokenizers, and NLP pipelines to transform raw data
              into real-time contextual intelligence.
            </p>
            <div className="mt-4 flex items-center gap-2 font-mono text-[10px] text-accent-cyan/80">
              <span>MODELS: SPEECH · NLP · TENSORS</span>
            </div>
          </motion.div>

          {/* Step 3: SYSTEMS */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative rounded-2xl border border-purple-500/30 bg-black/60 p-6 backdrop-blur-md shadow-[0_0_24px_-12px_oklch(0.74_0.09_300/0.25)]"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-purple-300">[03 // SYSTEMS]</span>
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-purple-500/10 text-purple-300">
                <Workflow size={15} />
              </div>
            </div>
            <h3 className="mt-3 font-display text-lg font-bold text-foreground">
              Autonomous Software
            </h3>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Shipping reliable end-to-end applications: event-driven OS automation (JARVIS), media
              streaming engines, and reactive web interfaces.
            </p>
            <div className="mt-4 flex items-center gap-2 font-mono text-[10px] text-purple-300/80">
              <span>DELIVERY: DESKTOP · WEB · REST APIS</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Directional Cue */}
        <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-center gap-2 font-mono text-xs text-muted-foreground">
          <span>Entering System Architecture &amp; Engineering Case Studies</span>
          <ArrowDown size={13} className="text-amber-400 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
