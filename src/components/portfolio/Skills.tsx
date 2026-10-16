import { useState } from "react";
import { Cpu, Code2, Wrench, BookOpen, Layers, CheckCircle2 } from "lucide-react";

/**
 * Skills — Verified Technology Ecosystem
 * Styled on the clean soft-white surface (#f8fafc):
 * - Grouped by domain (Programming, Libraries & AI, Developer Tools, Computer Science Concepts)
 * - Grounded in real codebase evidence (No fake percentage meters)
 * - High contrast, accessible WCAG AA badges
 */

interface SkillCategory {
  title: string;
  discipline: string;
  icon: typeof Code2;
  items: Array<{
    name: string;
    level?: string;
    evidence: string;
    scope: string;
  }>;
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    discipline: "Core Runtimes & Syntax",
    icon: Code2,
    items: [
      {
        name: "Python 3.x",
        level: "Primary Core",
        evidence: "JARVIS & DecodeLabs",
        scope: "Subprocesses, real-time voice pipeline, algorithmic logic, and automation scripts.",
      },
      {
        name: "JavaScript & TypeScript",
        level: "Web Development",
        evidence: "OnlineStream & Portfolio",
        scope: "Modern ES6+ syntax, React component state, asynchronous event loops.",
      },
      {
        name: "C Language",
        level: "Foundations",
        evidence: "University Lab Coursework",
        scope:
          "Memory addressing, pointers, procedural programming, and low-level data structures.",
      },
      {
        name: "HTML5 & Modern CSS",
        level: "Frontend UI",
        evidence: "Multiple Web Projects",
        scope: "Semantic document tree, responsive CSS Grid / Flexbox, accessible layouts.",
      },
    ],
  },
  {
    title: "Libraries & AI Tooling",
    discipline: "Audio & Machine Intelligence",
    icon: Cpu,
    items: [
      {
        name: "SpeechRecognition",
        level: "Acoustic Audio",
        evidence: "JARVIS Voice Engine",
        scope: "Microphone stream capture, dynamic 1.0s noise floor energy threshold calibration.",
      },
      {
        name: "pyttsx3",
        level: "Voice Synthesis",
        evidence: "JARVIS Voice Engine",
        scope: "Offline text-to-speech audio rendering with zero external cloud latency.",
      },
      {
        name: "Pandas",
        level: "Data Handling",
        evidence: "AI Automation Scripts",
        scope: "Tabular data ingestion, filtering, series manipulation, and CSV automation.",
      },
      {
        name: "React & Tailwind CSS",
        level: "Frontend Architecture",
        evidence: "OnlineStream & Portfolio",
        scope: "Component-driven design systems, custom utility tokens, zero-layout-shift UI.",
      },
    ],
  },
  {
    title: "Developer Tools",
    discipline: "Workflow & Version Control",
    icon: Wrench,
    items: [
      {
        name: "Git & GitHub",
        level: "Version Control",
        evidence: "Public ps06222005-oss repos",
        scope: "Branching strategies, conventional commits, remote repositories, pull requests.",
      },
      {
        name: "VS Code",
        level: "Primary IDE",
        evidence: "Daily Development",
        scope: "Extension ecosystem, debugger configurations, linting, terminal integrations.",
      },
      {
        name: "Google Colab & Jupyter",
        level: "Interactive Notebooks",
        evidence: "AI/ML Explorations",
        scope: "Rapid prototyping, data visualization, exploratory Python analysis.",
      },
    ],
  },
  {
    title: "Computer Science Concepts",
    discipline: "Academic Rigor & Algorithms",
    icon: BookOpen,
    items: [
      {
        name: "Data Structures & Algorithms",
        level: "University Core",
        evidence: "DecodeLabs Internship",
        scope: "Time and space complexity (Big-O), arrays, linked lists, stacks, queues, trees.",
      },
      {
        name: "Object-Oriented Programming (OOP)",
        level: "Architecture",
        evidence: "Python Systems",
        scope: "Encapsulation, inheritance, polymorphism, modular system design.",
      },
      {
        name: "DBMS & Computer Networks",
        level: "Systems Foundations",
        evidence: "B.Tech Coursework",
        scope: "Relational database concepts, SQL queries, OSI model, TCP/IP fundamentals.",
      },
    ],
  },
];

export function Skills() {
  const [selectedItem, setSelectedItem] = useState<{
    name: string;
    evidence: string;
    scope: string;
  } | null>(null);

  return (
    <section
      id="skills"
      aria-label="Technical Capabilities and Skills"
      className="relative w-full overflow-hidden bg-[#f8fafc] text-slate-900 py-20 sm:py-28 border-t border-slate-200"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-blue-600 tracking-wider uppercase">
            <span className="text-blue-500">◆</span>
            <span>CAPABILITIES &amp; EVIDENCE</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-slate-950">
            Skills Grounded in Code.
          </h2>

          <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            No arbitrary percentage bars or vanity meters. Every skill is directly backed by
            functioning codebase implementations.
          </p>
        </div>

        {/* 4-Column Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-sm text-slate-900 leading-tight">
                        {cat.title}
                      </h3>
                      <div className="font-mono text-[10px] text-slate-400">{cat.discipline}</div>
                    </div>
                  </div>

                  {/* Skills List with Evidence */}
                  <div className="space-y-3">
                    {cat.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        onClick={() => setSelectedItem(item)}
                        className="group/item p-2.5 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-900 group-hover/item:text-blue-600 transition-colors">
                          <span>{item.name}</span>
                          {item.level && (
                            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-normal">
                              {item.level}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 font-mono text-[10px] text-slate-500 mt-1">
                          <CheckCircle2 size={10} className="text-emerald-500" />
                          <span className="truncate">{item.evidence}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-100">
                  Click any item to inspect scope
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Skill Detail Modal */}
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="font-display font-bold text-lg text-slate-900">
                  {selectedItem.name}
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="rounded-lg p-1 text-slate-400 hover:text-slate-800"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                <div className="font-mono text-[11px] text-blue-600 font-semibold">
                  Verified Evidence: {selectedItem.evidence}
                </div>
                <p className="leading-relaxed">{selectedItem.scope}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
