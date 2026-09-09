import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Sparkles,
  Layers,
  Compass,
  Calendar,
  CheckCircle2,
  Terminal,
  Cpu,
  Workflow,
  ArrowRight,
} from "lucide-react";
import { Section } from "./Section";

type Stage = {
  id: string;
  phaseNumber: string;
  stageName: string;
  epoch: string;
  category:
    | "Academic Foundation"
    | "Experimentation"
    | "Engineering Artifact"
    | "Applied Systems"
    | "Future Research";
  accent: "amber" | "cyan" | "violet" | "emerald";
  icon: React.ComponentType<{ size?: number; className?: string }>;
  headline: string;
  subheadline: string;
  narrative: string;
  competencies: string[];
  synthesis: string;
  metrics: { label: string; val: string }[];
};

const STAGES: Stage[] = [
  {
    id: "foundation",
    phaseNumber: "01",
    stageName: "FOUNDATION",
    epoch: "2023 — Present",
    category: "Academic Foundation",
    accent: "violet",
    icon: GraduationCap,
    headline: "B.Tech in Computer Science & Engineering",
    subheadline: "Core Computing Primitives & Mathematical Rigor",
    narrative:
      "Enrolled at Sunderdeep Global University, building disciplined foundational depth across low-level computing (C), relational databases (DBMS), Discrete Mathematics, Computer Networks, and Object-Oriented Software Design.",
    competencies: [
      "Data Structures & Algorithms",
      "C Systems",
      "Discrete Mathematics",
      "DBMS",
      "Computer Networks",
    ],
    synthesis:
      "Established foundational mathematical grounding in computational complexity and system memory architectures.",
    metrics: [
      { label: "DEGREE", val: "B.Tech CSE (AI & ML)" },
      { label: "PRIMITIVES", val: "C / C++ / DSA" },
    ],
  },
  {
    id: "experimentation",
    phaseNumber: "02",
    stageName: "EXPERIMENTATION",
    epoch: "2023 — 2024",
    category: "Experimentation",
    accent: "amber",
    icon: Terminal,
    headline: "Scripting, Automation & Applied Heuristics",
    subheadline: "Algorithmic Exploration & Terminal Environments",
    narrative:
      "Transitioned from theoretical academic exercises to exploratory script writing. Built custom bash utilities, data manipulation workflows with Python/Pandas, and algorithmic problem-solving routines across graph and tree traversals.",
    competencies: [
      "Python",
      "Pandas DataFrames",
      "Bash Shell Automation",
      "Git Version Control",
      "Algorithmic Heuristics",
    ],
    synthesis:
      "Discovered the speed of algorithmic automation for solving repetitive digital tasks.",
    metrics: [
      { label: "SCRIPTS", val: "Python / CLI" },
      { label: "DATA", val: "Pandas Analysis" },
    ],
  },
  {
    id: "engineering",
    phaseNumber: "03",
    stageName: "ENGINEERING",
    epoch: "2024",
    category: "Engineering Artifact",
    accent: "amber",
    icon: Sparkles,
    headline: "Autonomous Voice Agent Architecture (JARVIS)",
    subheadline: "Acoustic Ingestion & Multi-Stage System Pipelines",
    narrative:
      "Engineered an end-to-end Python desktop voice assistant using SpeechRecognition and pyttsx3. Orchestrated dynamic microphone threshold calibration, Google Speech API tokenization, intent routing, Wikipedia querying, and offline text-to-speech synthesis.",
    competencies: [
      "SpeechRecognition",
      "pyttsx3",
      "Audio Threshold Calibration",
      "Subprocess Automation",
      "Modular Architecture",
    ],
    synthesis:
      "Bridged abstract scripting into a reliable, event-driven voice intelligence desktop system.",
    metrics: [
      { label: "ARTIFACT", val: "JARVIS Assistant" },
      { label: "PIPELINE", val: "5-Stage Speech Engine" },
    ],
  },
  {
    id: "systems",
    phaseNumber: "04",
    stageName: "SYSTEMS",
    epoch: "2024 — Present",
    category: "Applied Systems",
    accent: "cyan",
    icon: Layers,
    headline: "Full-Stack Creative Tech & Open-Source Rhythm",
    subheadline: "Type-Safe Reactive Frontends & Continuous Delivery",
    narrative:
      "Accelerating open-source contributions across modern web applications. Building high-precision reactive interfaces with React, TypeScript, Next.js, and Three.js WebGL graphics while practicing disciplined Git commit hygiene and atomic releases.",
    competencies: [
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "Three.js (WebGL)",
      "TanStack Router",
      "REST Integrations",
    ],
    synthesis:
      "Synthesizing deep backend algorithmic logic with Apple-grade aesthetic precision and responsive UX.",
    metrics: [
      { label: "TECH STACK", val: "TS / React / Next" },
      { label: "GRAPHICS", val: "Three.js Shaders" },
    ],
  },
  {
    id: "future",
    phaseNumber: "05",
    stageName: "FUTURE",
    epoch: "Forward Frontier",
    category: "Future Research",
    accent: "emerald",
    icon: Compass,
    headline: "Agentic Systems & Machine Intelligence",
    subheadline: "Cognitive Pipelines, Vector Spaces & Scalable AI",
    narrative:
      "Actively exploring model fine-tuning, retrieval-augmented generation (RAG), high-dimensional vector embeddings, and cloud-native scalable backends to build intelligent software agents that transition from passive tools to proactive cognitive partners.",
    competencies: [
      "Generative AI",
      "Vector Embeddings",
      "RAG Architectures",
      "System Design",
      "Distributed Cloud",
    ],
    synthesis:
      "Dedicated to designing resilient autonomous software that elevates human potential through intelligent automation.",
    metrics: [
      { label: "FOCUS", val: "Agentic LLMs & RAG" },
      { label: "GOAL", val: "Autonomous Systems" },
    ],
  },
];

export function LearningJourney() {
  const [activeStageId, setActiveStageId] = useState<string>("engineering");
  const activeStage = STAGES.find((s) => s.id === activeStageId) || STAGES[2];

  const getAccentStyle = (accent: Stage["accent"]) => {
    switch (accent) {
      case "amber":
        return {
          pill: "border-amber-500/40 bg-amber-500/10 text-amber-300",
          glow: "shadow-[0_0_24px_-8px_oklch(0.72_0.16_55/0.4)]",
          border: "border-amber-500/40",
          text: "text-amber-400",
        };
      case "cyan":
        return {
          pill: "border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan",
          glow: "shadow-[0_0_24px_-8px_oklch(0.78_0.11_215/0.4)]",
          border: "border-accent-cyan/40",
          text: "text-accent-cyan",
        };
      case "violet":
        return {
          pill: "border-purple-500/40 bg-purple-500/10 text-purple-300",
          glow: "shadow-[0_0_24px_-8px_oklch(0.74_0.09_300/0.4)]",
          border: "border-purple-500/40",
          text: "text-purple-300",
        };
      case "emerald":
        return {
          pill: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
          glow: "shadow-[0_0_24px_-8px_oklch(0.75_0.15_160/0.4)]",
          border: "border-emerald-500/40",
          text: "text-emerald-300",
        };
    }
  };

  const style = getAccentStyle(activeStage.accent);
  const ActiveIcon = activeStage.icon;

  return (
    <Section
      id="journey"
      index="06"
      eyebrow="Spatial Progression"
      title="Foundations, milestones & engineering horizon."
      subtitle="A structured spatial trajectory tracing core computational primitives, deployed autonomous agents, and future intelligence research."
      accent="amber"
    >
      {/* =========================================================================
       * 1. Interactive 5-Stage Spatial Progression Track
       * ========================================================================= */}
      <div className="relative mb-10 overflow-x-auto pb-4">
        {/* Continuous track connecting line behind buttons */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute top-1/2 left-8 right-8 h-px -translate-y-1/2 bg-gradient-to-r from-purple-500/30 via-amber-500/30 to-emerald-500/30 z-0"
        />

        <div className="relative z-10 flex min-w-[620px] items-center justify-between gap-3">
          {STAGES.map((s) => {
            const isSelected = s.id === activeStageId;
            const stageStyle = getAccentStyle(s.accent);
            const Icon = s.icon;

            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveStageId(s.id)}
                className={`group flex flex-1 flex-col items-center gap-2 rounded-2xl border px-3 py-3.5 transition-all duration-300 ${
                  isSelected
                    ? `bg-black/80 ${stageStyle.border} ${stageStyle.glow} scale-[1.02]`
                    : "border-white/[0.08] bg-black/40 hover:border-white/[0.18] hover:bg-white/[0.03]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`grid h-7 w-7 place-items-center rounded-lg border text-xs transition-colors ${
                      isSelected
                        ? `${stageStyle.border} ${stageStyle.pill}`
                        : "border-white/[0.1] bg-white/[0.03] text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    <Icon size={14} />
                  </div>
                  <span className="font-mono text-xs font-bold text-foreground">
                    {s.phaseNumber}
                  </span>
                </div>

                <div className="text-center">
                  <span
                    className={`font-mono text-[11px] font-semibold tracking-wider uppercase ${
                      isSelected
                        ? stageStyle.text
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {s.stageName}
                  </span>
                  <div className="text-[10px] text-muted-foreground/60">{s.epoch}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
       * 2. Active Stage Inspection Stage
       * ========================================================================= */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-br from-white/[0.03] via-black/60 to-black/90 p-7 sm:p-10 shadow-2xl backdrop-blur-xl"
        >
          {/* Stage Header Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 font-mono text-xs font-bold uppercase tracking-wider ${style.pill}`}
              >
                STAGE {activeStage.phaseNumber} // {activeStage.stageName}
              </span>
              <span className="h-3 w-px bg-white/[0.1]" />
              <span className="font-mono text-xs text-muted-foreground">
                {activeStage.category}
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <Calendar size={13} />
              <span>{activeStage.epoch}</span>
            </div>
          </div>

          {/* Core Content Grid */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
            {/* Left 7 Columns: Headline, Subtitle, Narrative & Skills */}
            <div className="lg:col-span-8 space-y-5">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  {activeStage.headline}
                </h3>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {activeStage.subheadline}
                </p>
              </div>

              <p className="font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
                {activeStage.narrative}
              </p>

              {/* Competencies */}
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70 mb-2">
                  Applied Competencies &amp; Toolchains
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeStage.competencies.map((comp) => (
                    <span
                      key={comp}
                      className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-1 font-mono text-xs text-foreground/90"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Synthesis Takeaway */}
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 font-sans text-xs sm:text-sm text-foreground/90 flex items-start gap-3">
                <CheckCircle2 size={16} className="mt-0.5 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-bold text-foreground">Engineering Synthesis: </span>
                  <span className="text-muted-foreground">{activeStage.synthesis}</span>
                </div>
              </div>
            </div>

            {/* Right 4 Columns: Specimen Metrics & Telemetry */}
            <div className="lg:col-span-4 rounded-2xl border border-white/[0.08] bg-black/50 p-6 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-muted-foreground">
                <span className="flex items-center gap-1.5 font-bold uppercase text-foreground">
                  <ActiveIcon size={14} className={style.text} />
                  STAGE SIGNALS
                </span>
                <span>STATUS: VERIFIED</span>
              </div>

              <div className="space-y-3">
                {activeStage.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
                  >
                    <div className="text-[10px] text-muted-foreground uppercase">{m.label}</div>
                    <div className="mt-1 font-display text-base font-bold text-foreground">
                      {m.val}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-[11px] text-muted-foreground/70">
                Data anchored to official university enrollment and verified GitHub commit timeline.
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
