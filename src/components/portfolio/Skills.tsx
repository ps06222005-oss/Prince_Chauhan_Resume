import { useState } from "react";
import { CheckCircle2, Cpu, Code2, Network } from "lucide-react";
import { ScrollReveal, StaggerRevealGroup, StaggerRevealItem } from "./ScrollReveal";

/**
 * Skills — Interactive Technology Ecosystem (Arctic Minimal Design System)
 *
 * Supports Light and Dark Liquid Glass design systems.
 * - 3 interconnected streams of real engineering capability
 * - Clicking or inspecting a node reveals exact codebase evidence and implementation scope
 * - Strict factual accuracy with zero fake meters or arbitrary ratings
 */

type LineageNode = {
  id: string;
  name: string;
  role: string;
  evidence: string;
  details: string;
};

type LineageStream = {
  id: string;
  title: string;
  discipline: string;
  icon: typeof Cpu;
  nodes: LineageNode[];
};

const LINEAGE_STREAMS: LineageStream[] = [
  {
    id: "autonomous-ai",
    title: "Machine Intelligence & Voice",
    discipline: "Core Architecture & Python",
    icon: Cpu,
    nodes: [
      {
        id: "python",
        name: "Python 3.x",
        role: "Primary Core Runtime",
        evidence: "JARVIS & DecodeLabs Codebases",
        details:
          "System automation scripts, algorithmic logic, subprocess invocations, and real-time audio pipeline orchestration.",
      },
      {
        id: "speech",
        name: "SpeechRecognition",
        role: "Audio Buffer & Energy Normalization",
        evidence: "JARVIS Ambient Calibration",
        details:
          "Microphone audio acquisition with 1.0s dynamic noise-floor energy threshold calibration and speech decoding.",
      },
      {
        id: "automation",
        name: "Intent Routing & OS Automation",
        role: "Desktop Dispatch Engine",
        evidence: "JARVIS Command Subsystems",
        details:
          "Pattern-matched intent tokenization directing system actions: process spawning, browser automation, audio muting.",
      },
      {
        id: "agents",
        name: "Autonomous Agent Architectures",
        role: "Emerging Systems",
        evidence: "Active 2026 Exploration",
        details:
          "Investigating local Small Language Model (SLM) tool-use, multi-agent orchestration, and reactive feedback loops.",
      },
    ],
  },
  {
    id: "creative-interfaces",
    title: "Modern Interfaces & Creative Tech",
    discipline: "Frontend & Spatial Systems",
    icon: Code2,
    nodes: [
      {
        id: "typescript",
        name: "TypeScript",
        role: "Strict Typing Foundation",
        evidence: "OnlineStream & Web Systems",
        details:
          "Static contracts, strict structural types, custom hooks, and safe data flow across production web applications.",
      },
      {
        id: "react",
        name: "React & Modern Web Architecture",
        role: "Reactive UI Runtime",
        evidence: "OnlineStream & Portfolio Ecosystem",
        details:
          "Component lifecycle design, responsive UI state management, and optimized render cycles.",
      },
      {
        id: "tailwind-spatial",
        name: "Tailwind CSS & Spatial Design",
        role: "Design System & Typography",
        evidence: "Mathematical Spacing Scales",
        details:
          "Fluid viewport typography, arctic minimal palettes, mathematical padding ratios, and tactile micro-interactions.",
      },
      {
        id: "webgl",
        name: "Three.js & WebGL Real-time Graphics",
        role: "Generative Backgrounds",
        evidence: "Portfolio 3D Stage",
        details:
          "Particle lattice deformation, camera deflection, responsive GPU canvas buffers, and reduced-motion fallback.",
      },
    ],
  },
  {
    id: "systems-foundations",
    title: "Systems, Tools & Infrastructure",
    discipline: "Engineering Foundation",
    icon: Network,
    nodes: [
      {
        id: "c-lang",
        name: "C Programming & Memory Basics",
        role: "Systems Computing",
        evidence: "University CS Core",
        details:
          "Pointer arithmetic, manual memory paradigms, stack/heap lifecycles, and low-level algorithmic problem sets.",
      },
      {
        id: "git",
        name: "Git & Version Provenance",
        role: "Source History & Review",
        evidence: "Daily GitHub Commits",
        details:
          "Deterministic git hygiene, branching workflows, clean commit lineages, and open-source documentation.",
      },
      {
        id: "pandas",
        name: "Data Analysis & Pandas",
        role: "Data Engineering Basics",
        evidence: "Python Data Scripting",
        details:
          "Tabular dataset ingestion, CSV transformation pipelines, and analytical data aggregation scripts.",
      },
      {
        id: "edge",
        name: "Edge CDN & Vercel Infrastructure",
        role: "Global Distribution",
        evidence: "OnlineStream Deployment",
        details:
          "Zero-config continuous integration, edge caching headers, and global low-latency content delivery.",
      },
    ],
  },
];

export function Skills() {
  const [activeNode, setActiveNode] = useState<LineageNode>(LINEAGE_STREAMS[0].nodes[0]);

  return (
    <section
      id="skills"
      aria-label="Capabilities and Technology Ecosystem"
      className="relative w-full overflow-hidden bg-background text-foreground py-20 sm:py-28 lg:py-36 border-t border-border"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={24} className="space-y-3 max-w-3xl">
          <div className="space-y-1">
            <div className="font-mono text-xs text-primary tracking-widest uppercase">
              CAPABILITIES &amp; ECOSYSTEM
            </div>
            <p className="font-sans text-xs text-muted-foreground">
              Technical Arsenal, Programming Languages, Frameworks &amp; Systems Architecture
            </p>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-[-0.035em] text-foreground">
            Technology Lineage. <br />
            <span className="text-gradient-chrome">Grounded in Practice.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
            Skills are not arbitrary percentage meters. They represent living software capabilities
            where foundational languages flow directly into deployed systems and autonomous tools.
          </p>
        </ScrollReveal>

        {/* 3 Flowing Streams + Deep Specimen Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (8 cols): 3 Lineage Streams */}
          <div className="lg:col-span-8 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {LINEAGE_STREAMS.map((stream, sIdx) => {
                const Icon = stream.icon;
                return (
                  <ScrollReveal
                    key={stream.id}
                    direction="up"
                    distance={28}
                    delay={sIdx * 0.1}
                    className="space-y-5"
                  >
                    {/* Stream Title */}
                    <div className="space-y-1 border-b border-border pb-3">
                      <div className="flex items-center gap-1.5 font-mono text-[10px] text-primary uppercase tracking-wider">
                        <Icon size={12} />
                        <span>{stream.discipline}</span>
                      </div>
                      <h3 className="font-display font-semibold text-sm sm:text-base text-foreground">
                        {stream.title}
                      </h3>
                    </div>

                    {/* Nodes */}
                    <StaggerRevealGroup
                      staggerChildren={0.08}
                      delayChildren={sIdx * 0.08 + 0.05}
                      className="space-y-3 relative"
                    >
                      {stream.nodes.map((node, nIdx) => {
                        const isSelected = activeNode.id === node.id;
                        const isLast = nIdx === stream.nodes.length - 1;

                        return (
                          <StaggerRevealItem key={node.id} className="relative">
                            <button
                              type="button"
                              onClick={() => setActiveNode(node)}
                              aria-pressed={isSelected}
                              aria-label={`Inspect ${node.name} capability, ${node.role}`}
                              className={`min-h-[44px] w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                                isSelected
                                  ? "bg-primary/10 border-primary text-foreground shadow-sm"
                                  : "bg-card border-border text-foreground/80 hover:border-primary/50 hover:text-foreground"
                              }`}
                            >
                              <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground mb-1">
                                <span>0{nIdx + 1}</span>
                                {isSelected ? (
                                  <span className="inline-flex items-center gap-1 text-primary font-medium text-[9px] uppercase tracking-wider">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    <span>Active</span>
                                  </span>
                                ) : (
                                  <span className="text-muted-foreground/60 text-[9px] uppercase tracking-wider">
                                    Capability
                                  </span>
                                )}
                              </div>

                              <div className="font-mono text-xs sm:text-sm font-semibold text-foreground">
                                {node.name}
                              </div>

                              <div className="font-sans text-xs text-muted-foreground mt-0.5">
                                {node.role}
                              </div>
                            </button>

                            {/* Conduit connector */}
                            {!isLast && (
                              <div className="h-3 w-full flex items-center justify-center my-0.5">
                                <div className="h-full w-px bg-gradient-to-b from-primary/30 to-primary/5" />
                              </div>
                            )}
                          </StaggerRevealItem>
                        );
                      })}
                    </StaggerRevealGroup>
                  </ScrollReveal>
                );
              })}
            </div>

            <ScrollReveal
              direction="up"
              distance={16}
              delay={0.2}
              className="font-mono text-xs text-muted-foreground flex items-center gap-2 pt-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>Select any capability above to inspect its real-world implementation</span>
            </ScrollReveal>
          </div>

          {/* Right Column (4 cols): Active Specimen Inspector */}
          <ScrollReveal
            direction="left"
            distance={26}
            delay={0.18}
            className="lg:col-span-4 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 sticky top-28 shadow-md"
          >
            <div className="flex items-center justify-between border-b border-border pb-3 font-mono text-xs">
              <span className="text-accent font-semibold uppercase tracking-wider">
                CAPABILITY DETAILS
              </span>
              <span className="px-2.5 py-0.5 rounded-full border border-primary/35 bg-primary/10 text-primary text-[10px] font-semibold">
                AUTHENTIC
              </span>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-display font-bold text-2xl text-foreground">{activeNode.name}</h4>
              <div className="font-mono text-xs text-primary">{activeNode.role}</div>
            </div>

            <div className="space-y-2">
              <div className="font-mono text-[11px] text-muted-foreground uppercase">
                Technical Scope
              </div>
              <p className="font-sans text-sm text-foreground/80 leading-relaxed font-light">
                {activeNode.details}
              </p>
            </div>

            <div className="space-y-2 border-t border-border pt-4">
              <div className="font-mono text-[11px] text-muted-foreground uppercase">
                Verified Codebase Citation
              </div>
              <div className="flex items-start gap-2 text-xs font-mono text-accent">
                <CheckCircle2 size={15} className="text-primary mt-0.5 shrink-0" />
                <span>{activeNode.evidence}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-border font-mono text-[10px] text-muted-foreground">
              PRINCE CHAUHAN // TECHNICAL REPERTOIRE
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
