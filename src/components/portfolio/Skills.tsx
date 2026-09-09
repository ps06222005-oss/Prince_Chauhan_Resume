import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, GitBranch } from "lucide-react";
import { Section } from "./Section";

interface LineageNode {
  id: string;
  name: string;
  category: string;
  shippedIn: string;
  connectionToNext: string;
  narrative: string;
}

interface EcosystemTrack {
  id: string;
  number: string;
  headline: string;
  chainTitle: string;
  nodes: LineageNode[];
}

const ECOSYSTEM_CHAINS: EcosystemTrack[] = [
  {
    id: "ai-audio",
    number: "01",
    headline: "AUTONOMOUS VOICE & ML ECOSYSTEM",
    chainTitle: "PYTHON → ML & ACOUSTICS → INTENT ROUTER → AGENT SYSTEMS",
    nodes: [
      {
        id: "py",
        name: "Python 3.11",
        category: "Host Language",
        shippedIn: "JARVIS & ML Pipelines",
        connectionToNext: "Drives native hardware audio sampling interfaces via C-bindings",
        narrative:
          "The core computational runtime orchestrating acoustic buffer ingestion, numerical vector processing, and OS execution.",
      },
      {
        id: "acoustic",
        name: "PyAudio & Signal Stream",
        category: "Acoustic Subsystem",
        shippedIn: "JARVIS Real-Time Core",
        connectionToNext: "Streams raw PCM audio frames into dynamic noise calibration",
        narrative:
          "Captures raw microphone audio buffers with dynamic sampling intervals and hardware latency compensation.",
      },
      {
        id: "calibration",
        name: "Noise Floor Calibration",
        category: "Signal Processing",
        shippedIn: "adjust_for_ambient_noise",
        connectionToNext: "Feeds thresholded spectral frames into lexical tokenization",
        narrative:
          "Dynamically measures ambient acoustic decibels to isolate human vocal frequencies before speech-to-text conversion.",
      },
      {
        id: "intent",
        name: "Lexical Intent Router",
        category: "Rules Engine",
        shippedIn: "JARVIS Intent Parser",
        connectionToNext: "Dispatches parsed arguments to OS subprocesses and external tools",
        narrative:
          "Deterministically parses natural verbal requests into typed system actions, API calls, and OS process invocations.",
      },
      {
        id: "agents",
        name: "Autonomous Voice Agent",
        category: "Shipped System",
        shippedIn: "JARVIS Assistant",
        connectionToNext: "Hands-free deterministic operating system execution",
        narrative:
          "The final synthesized software outcome: hands-free control, information retrieval, and offline pyttsx3 voice feedback.",
      },
    ],
  },
  {
    id: "creative-interfaces",
    number: "02",
    headline: "SPATIAL INTERFACES & GRAPHICS ECOSYSTEM",
    chainTitle: "REACT → TYPESCRIPT → WEBGL SHADERS → LIVING INTERFACES",
    nodes: [
      {
        id: "react",
        name: "React 18 Concurrent State",
        category: "Declarative Tree",
        shippedIn: "Creative Interfaces",
        connectionToNext: "Injects strict typed state contracts into reactive component lifecycles",
        narrative:
          "Concurrent reconciliation, deterministic effect cleanups, and responsive layout primitives.",
      },
      {
        id: "typescript",
        name: "TypeScript Strict Mode",
        category: "Type Safety Contract",
        shippedIn: "All Production Codebases",
        connectionToNext: "Guarantees runtime memory and parameter contracts across GPU canvases",
        narrative:
          "Enforces compile-time mathematical coordinate invariants and interface modeling to eliminate runtime regressions.",
      },
      {
        id: "webgl",
        name: "Three.js & WebGL Shaders",
        category: "Hardware Acceleration",
        shippedIn: "WorldCanvas & Procedural Shaders",
        connectionToNext: "Binds GPU vertex transformations to user scroll and pointer coordinates",
        narrative:
          "Calculates procedural geometry buffers, raycasted pointer interactions, and additive blending particle matrices.",
      },
      {
        id: "spatial",
        name: "Living Digital Architecture",
        category: "Shipped System",
        shippedIn: "Prince Chauhan Portfolio",
        connectionToNext: "Engages recruiters and engineers with unforgettable spatial craft",
        narrative:
          "Elevates static developer dashboards into cinematic, responsive digital installations with mathematical purpose.",
      },
    ],
  },
  {
    id: "systems-foundations",
    number: "03",
    headline: "COMPUTATIONAL RIGOR & MEMORY PRIMITIVES",
    chainTitle: "C SYSTEMS → MEMORY HEAPS → ASYMPTOTIC PROOFS → RELIABLE ENGINES",
    nodes: [
      {
        id: "c-lang",
        name: "C Systems Programming",
        category: "Low-Level Foundation",
        shippedIn: "B.Tech CSE Core Foundations",
        connectionToNext: "Allocates memory heaps and calculates pointer byte arithmetic",
        narrative:
          "Pointer manipulation, cache-line locality, dynamic malloc/free memory control, and standard POSIX primitives.",
      },
      {
        id: "memory",
        name: "Heap & Memory Management",
        category: "Resource Control",
        shippedIn: "DecodeLabs & Algorithmic Modules",
        connectionToNext: "Constructs balanced traversal matrices and graph nodes",
        narrative:
          "Prevents memory leaks and invalid pointer references through explicit lifecycle management.",
      },
      {
        id: "asymptotic",
        name: "Asymptotic Proofs (Big-O)",
        category: "Formal Analysis",
        shippedIn: "Algorithmic Verification",
        connectionToNext: "Guarantees mathematically bounded latency under arbitrary input scales",
        narrative:
          "Mathematically proves worst-case O(N log N) runtime bounds, ensuring software will never stall or experience complexity attacks.",
      },
      {
        id: "reliable",
        name: "Deterministic High-Load Engines",
        category: "Shipped System",
        shippedIn: "DecodeLabs Suite",
        connectionToNext: "Unwavering software reliability under production pressure",
        narrative:
          "Constructs fault-tolerant, deterministic algorithms designed for maximum computational throughput and zero regressions.",
      },
    ],
  },
];

export function Skills() {
  const [activeChainId, setActiveChainId] = useState<string>(ECOSYSTEM_CHAINS[0].id);
  const [activeNodeId, setActiveNodeId] = useState<string>(ECOSYSTEM_CHAINS[0].nodes[0].id);

  const currentChain = ECOSYSTEM_CHAINS.find((c) => c.id === activeChainId) || ECOSYSTEM_CHAINS[0];
  const currentNode =
    currentChain.nodes.find((n) => n.id === activeNodeId) || currentChain.nodes[0];

  return (
    <Section
      id="skills"
      index="03"
      eyebrow="Ecosystem Lineage"
      title="Technologies as an interconnected ecosystem."
      subtitle="Rather than isolated lists of keywords, explore the causal lineages that transform foundational languages into deterministic autonomous systems."
      accent="amber"
    >
      <div className="space-y-16 sm:space-y-20">
        {ECOSYSTEM_CHAINS.map((chain) => {
          const isSelectedChain = activeChainId === chain.id;

          return (
            <div key={chain.id} className="border-b border-white/[0.08] pb-12 sm:pb-16">
              {/* Chain Headline & Minimalist Relationship Track */}
              <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4">
                <div className="flex items-center gap-3 font-mono text-xs">
                  <span className="font-bold text-amber-400">[{chain.number}]</span>
                  <span className="font-semibold text-[#f4f4f2] tracking-wider uppercase">
                    {chain.headline}
                  </span>
                </div>

                <div className="font-mono text-xs text-amber-300/80 tracking-widest hidden md:inline">
                  {chain.chainTitle}
                </div>
              </div>

              {/* Interconnected Lineage Nodes — Typographic Ecosystem Conduit */}
              <div className="mt-4 flex flex-col md:flex-row items-stretch gap-2 sm:gap-3">
                {chain.nodes.map((node, nIdx) => {
                  const isNodeActive = currentNode.id === node.id && isSelectedChain;
                  const isLast = nIdx === chain.nodes.length - 1;

                  return (
                    <div
                      key={node.id}
                      className="flex-1 flex flex-col md:flex-row items-center gap-2"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setActiveChainId(chain.id);
                          setActiveNodeId(node.id);
                        }}
                        onMouseEnter={() => {
                          setActiveChainId(chain.id);
                          setActiveNodeId(node.id);
                        }}
                        className={`w-full text-left p-4 sm:p-5 transition-all duration-300 border ${
                          isNodeActive
                            ? "border-amber-400/80 bg-amber-500/[0.07] text-[#f4f4f2]"
                            : "border-white/[0.08] bg-transparent hover:border-white/[0.2] text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <div className="flex items-center justify-between font-mono text-[10px] pb-1">
                          <span
                            className={isNodeActive ? "text-amber-400 font-bold" : "text-white/40"}
                          >
                            NODE 0{nIdx + 1}
                          </span>
                          <span className="text-white/30 uppercase">{node.category}</span>
                        </div>

                        <div className="font-display text-sm sm:text-base font-bold tracking-tight text-[#f4f4f2] mt-1">
                          {node.name}
                        </div>

                        <div className="font-mono text-[10px] text-muted-foreground/70 mt-1 truncate">
                          {node.shippedIn}
                        </div>
                      </button>

                      {/* Lineage Directional Conductor */}
                      {!isLast && (
                        <div className="text-white/20 px-1 py-1 md:py-0 font-mono text-xs hidden md:block">
                          →
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

      {/* Progressive Lineage Inspection Callout — Elegant Editorial Breakdown */}
      <AnimatePresence mode="wait">
        {currentNode && (
          <motion.div
            key={currentNode.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-10 sm:mt-14 border border-white/[0.12] bg-[#07080a] p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-3">
                <span className="font-display text-xl sm:text-2xl font-bold text-[#f4f4f2]">
                  {currentNode.name}
                </span>
                <span className="font-mono text-xs text-amber-400 uppercase">
                  // {currentNode.category}
                </span>
              </div>

              <div className="font-mono text-xs text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 size={13} />
                <span>Verified in: {currentNode.shippedIn}</span>
              </div>
            </div>

            <p className="mt-4 font-sans text-base sm:text-lg text-muted-foreground/90 leading-relaxed font-light">
              {currentNode.narrative}
            </p>

            <div className="mt-4 border-t border-white/[0.06] pt-3 font-mono text-xs text-amber-300/90 flex items-center gap-2">
              <GitBranch size={13} className="shrink-0 text-amber-400" />
              <span>
                <strong>Causal Lineage Link:</strong> {currentNode.connectionToNext}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
