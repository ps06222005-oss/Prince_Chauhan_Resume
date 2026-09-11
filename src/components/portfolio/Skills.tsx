import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, Layers, Cpu, Code2, Network } from "lucide-react";

/**
 * Skills — Interactive Technology Ecosystem
 *
 * Visual System: BLACK + CHROME + IVORY + ULTRAVIOLET
 * Replaces fake percentage meters with an authentic, interactive technological lineage:
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
          "Fluid viewport typography, carbon dark palettes, mathematical padding ratios, and tactile micro-interactions.",
      },
      {
        id: "edge-media",
        name: "Edge Delivery & Media Caching",
        role: "Edge Deployment",
        evidence: "OnlineStream on Vercel Edge",
        details:
          "Zero-layout-shift aspect ratio containment, responsive video streaming, and global edge network caching.",
      },
    ],
  },
  {
    id: "algorithmic-foundations",
    title: "Algorithmic Foundations & Systems",
    discipline: "Computer Science Core",
    icon: Network,
    nodes: [
      {
        id: "dsa",
        name: "Data Structures & Algorithms",
        role: "Computational Foundation",
        evidence: "DecodeLabs Internship Codebase",
        details:
          "Array manipulation algorithms, binary search trees, hash lookups, and graph traversals written from first principles.",
      },
      {
        id: "complexity",
        name: "Complexity Analysis (Big-O)",
        role: "Efficiency Engineering",
        evidence: "Algorithmic Problem Sets",
        details:
          "Time and space upper-bound evaluation ensuring low latency and memory efficiency across iterative workloads.",
      },
      {
        id: "git-versioning",
        name: "Git & GitHub Versioning",
        role: "Engineering Hygiene",
        evidence: "ps06222005-oss Public Repositories",
        details:
          "Atomic commits, semantic branching, milestone delivery, and open-source codebase stewardship.",
      },
      {
        id: "academic-degree",
        name: "B.Tech in CSE (AI & ML)",
        role: "Institutional Rigor",
        evidence: "Sunderdeep Global Univ (2024–2028)",
        details:
          "Rigorous formal computer science curriculum: operating systems, discrete mathematics, and neural architectures.",
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
      className="relative w-full overflow-hidden bg-[#08090c] py-20 sm:py-32 border-t border-white/[0.08]"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="font-mono text-xs text-violet-400 tracking-widest uppercase">
            CAPABILITIES &amp; ECOSYSTEM
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] text-white">
            Technology Lineage. <br />
            <span className="text-gradient-chrome">Grounded in Practice.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-white/70 leading-relaxed font-light">
            Skills are not arbitrary percentage meters. They represent living software capabilities
            where foundational languages flow directly into deployed systems and autonomous tools.
          </p>
        </div>

        {/* 3 Flowing Streams + Deep Specimen Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (8 cols): 3 Lineage Streams */}
          <div className="lg:col-span-8 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {LINEAGE_STREAMS.map((stream) => {
                const Icon = stream.icon;
                return (
                  <div key={stream.id} className="space-y-5">
                    {/* Stream Title */}
                    <div className="space-y-1 border-b border-white/[0.08] pb-3">
                      <div className="flex items-center gap-1.5 font-mono text-[10px] text-violet-400 uppercase tracking-wider">
                        <Icon size={12} />
                        <span>{stream.discipline}</span>
                      </div>
                      <h3 className="font-display font-semibold text-sm sm:text-base text-white">
                        {stream.title}
                      </h3>
                    </div>

                    {/* Nodes */}
                    <div className="space-y-3 relative">
                      {stream.nodes.map((node, nIdx) => {
                        const isSelected = activeNode.id === node.id;
                        const isLast = nIdx === stream.nodes.length - 1;

                        return (
                          <div key={node.id} className="relative">
                            <button
                              type="button"
                              onClick={() => setActiveNode(node)}
                              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? "bg-violet-500/[0.12] border-violet-400 text-white shadow-[0_0_20px_rgba(139,92,246,0.25)]"
                                  : "bg-[#0e1017] border-white/[0.06] text-white/80 hover:border-violet-400/40 hover:text-white"
                              }`}
                            >
                              <div className="flex items-center justify-between font-mono text-[10px] text-white/40 mb-1">
                                <span>0{nIdx + 1}</span>
                                {isSelected ? (
                                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-ping" />
                                ) : (
                                  <span className="text-white/30">VERIFIED</span>
                                )}
                              </div>

                              <div className="font-mono text-xs sm:text-sm font-semibold text-white">
                                {node.name}
                              </div>

                              <div className="font-sans text-xs text-white/50 mt-0.5">
                                {node.role}
                              </div>
                            </button>

                            {/* Conduit connector */}
                            {!isLast && (
                              <div className="h-3 w-full flex items-center justify-center my-0.5">
                                <div className="h-full w-px bg-gradient-to-b from-violet-500/40 to-white/10" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="font-mono text-xs text-white/40 flex items-center gap-2 pt-2">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              <span>Select any capability above to inspect its real-world implementation</span>
            </div>
          </div>

          {/* Right Column (4 cols): Active Specimen Inspector */}
          <div className="lg:col-span-4 rounded-2xl border border-white/[0.08] bg-[#0e1017] p-6 sm:p-8 space-y-6 sticky top-28">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 font-mono text-xs">
              <span className="text-violet-400 font-semibold uppercase tracking-wider">
                CAPABILITY DETAILS
              </span>
              <span className="px-2 py-0.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-[10px]">
                AUTHENTIC
              </span>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-display font-bold text-2xl text-white">{activeNode.name}</h4>
              <div className="font-mono text-xs text-violet-300">{activeNode.role}</div>
            </div>

            <div className="space-y-2">
              <div className="font-mono text-[11px] text-white/40 uppercase">Technical Scope</div>
              <p className="font-sans text-sm text-white/80 leading-relaxed font-light">
                {activeNode.details}
              </p>
            </div>

            <div className="space-y-2 border-t border-white/[0.06] pt-4">
              <div className="font-mono text-[11px] text-white/40 uppercase">
                Verified Codebase Citation
              </div>
              <div className="flex items-start gap-2 text-xs font-mono text-violet-300">
                <CheckCircle2 size={15} className="text-violet-400 mt-0.5 shrink-0" />
                <span>{activeNode.evidence}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.06] font-mono text-[10px] text-white/30">
              PRINCE CHAUHAN // TECHNICAL REPERTOIRE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
