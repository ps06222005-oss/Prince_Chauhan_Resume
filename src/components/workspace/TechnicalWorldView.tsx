import { useState, useCallback, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Terminal,
  Cpu,
  ExternalLink,
  Palette,
  Compass,
  RotateCcw,
  Activity,
  Mic,
  Monitor,
} from "lucide-react";
import { useWorkspace } from "@/context/WorkspaceContext";
import { Navbar } from "@/components/portfolio/Navbar";
import { Footer } from "@/components/portfolio/Footer";
import { ScrollReveal } from "@/components/portfolio/ScrollReveal";
import { FALLBACK_PROJECTS } from "@/data/projects";

const TECH_MODULES = {
  jarvis: {
    label: "Voice Engine",
    file: "jarvis_engine.py",
    lines: [
      "recognizer.adjust_for_ambient_noise(src, 1.0)",
      "intent = normalize_tokens(decode_speech(buf))",
      "dispatch_worker(intent, mode='deterministic')",
    ],
    metric: "Python · SpeechRecognition · pyttsx3",
  },
  stream: {
    label: "Media Core",
    file: "stream_controller.ts",
    lines: [
      "const player = useAdaptivePlayback(streamId);",
      "syncBufferWindow({ lowLatency: true });",
      "renderZeroShiftViewport(player.metrics);",
    ],
    metric: "React 19 · TypeScript · Vercel Edge",
  },
  grid: {
    label: "GridShield",
    file: "habit_verifier.tsx",
    lines: [
      "const score = verifyEcoTask(submission);",
      "updateLeaderboardDelta(user.id, score);",
      "emitBadgeUnlock(user.streakTier);",
    ],
    metric: "Hackathon · Gamification · Real-Time UI",
  },
} as const;

type TechModuleKey = keyof typeof TECH_MODULES;

export function TechnicalWorldView() {
  const { enterCreative, enterWorkspace, exploreFull, resetToPortal } = useWorkspace();
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [activeModule, setActiveModule] = useState<TechModuleKey>("jarvis");

  const handleStageMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: Number((-ny * 10).toFixed(2)),
      ry: Number((nx * 12).toFixed(2)),
    });
  }, []);

  const handleStageLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0 });
  }, []);

  const currentMod = TECH_MODULES[activeModule];

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground select-none">
      <Navbar />

      {/* Hero Header for Technical World */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden border-b border-border">
        {/* Ambient Technical Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 h-96 w-full max-w-4xl rounded-full bg-accent/10 blur-[140px]"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left: Technical Identity & Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <ScrollReveal direction="up" distance={20} className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 font-mono text-xs text-accent font-semibold">
                  <Code2 size={13} />
                  <span>TECHNICAL WORLD DEDICATED MODE</span>
                  <span className="text-border">•</span>
                  <span className="text-foreground">DIMENSION 02</span>
                </div>

                <h1 className="font-display font-bold text-4xl sm:text-6xl tracking-[-0.04em] text-foreground text-balance">
                  Programming, Systems &amp; <br />
                  <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-500 bg-clip-text text-transparent">
                    Application Engineering.
                  </span>
                </h1>

                <p className="font-sans text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                  Programming, engineering, Python, AI/ML and application development. Exploring
                  autonomous voice assistant engines, noise-calibrated speech recognition, and
                  low-latency system automation.
                </p>
              </ScrollReveal>

              {/* Quick World Switcher Bar */}
              <ScrollReveal direction="up" distance={15} delay={0.1}>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1 font-mono text-xs">
                  <button
                    type="button"
                    onClick={enterWorkspace}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-cyan-600/40 dark:border-cyan-500/40 bg-cyan-50/90 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-950/70 text-cyan-800 dark:text-cyan-300 font-semibold transition-all cursor-pointer shadow-sm"
                  >
                    <Monitor size={13} />
                    <span>3D Workspace</span>
                  </button>

                  <button
                    type="button"
                    onClick={enterCreative}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-card hover:border-primary hover:text-primary text-foreground transition-all cursor-pointer shadow-sm"
                  >
                    <Palette size={13} className="text-primary" />
                    <span>Switch to Creative →</span>
                  </button>

                  <button
                    type="button"
                    onClick={exploreFull}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary font-semibold transition-all cursor-pointer shadow-sm"
                  >
                    <Compass size={13} />
                    <span>Full Journey</span>
                  </button>

                  <button
                    type="button"
                    onClick={resetToPortal}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full border border-border bg-secondary/50 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                  >
                    <RotateCcw size={12} />
                    <span>Portal</span>
                  </button>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Lightweight Interactive 3D Technical Architecture Stage */}
            <div className="lg:col-span-5">
              <div
                onMouseMove={handleStageMove}
                onMouseLeave={handleStageLeave}
                style={{ perspective: "1100px" }}
                className="relative mx-auto w-full max-w-md rounded-2xl border border-border bg-card/85 dark:bg-card/50 p-5 sm:p-6 shadow-xl overflow-hidden"
              >
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-border/70 font-mono text-[11px]">
                  <span className="text-accent font-semibold uppercase tracking-wider">
                    3D Runtime Matrix
                  </span>
                  <div className="flex items-center gap-1">
                    {(Object.keys(TECH_MODULES) as TechModuleKey[]).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setActiveModule(key)}
                        className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                          activeModule === key
                            ? "bg-primary text-primary-foreground font-semibold"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                        }`}
                      >
                        {TECH_MODULES[key].label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Floating 3D Technical Structure & Programming Interface Panel */}
                <div
                  style={{
                    transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                    transition: "transform 180ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  className="preserve-3d relative h-64 sm:h-72 w-full flex items-center justify-center my-2"
                >
                  {/* Dual Rotating Technical Orbital Rings */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute h-52 w-52 rounded-full border border-primary/35 shadow-[0_0_28px_rgba(37,99,235,0.2)] animate-orbit-slow"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute h-36 w-36 rounded-full border border-dashed border-accent/55 animate-orbit-slow"
                    style={{ animationDirection: "reverse", animationDuration: "18s" }}
                  />

                  {/* Floating Holographic Code Terminal Panel */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeModule}
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.22 }}
                      style={{ transform: "translateZ(46px)" }}
                      className="relative z-10 w-[92%] rounded-xl border border-primary/35 bg-slate-900/95 text-slate-100 p-4 shadow-2xl font-mono text-[11px] space-y-2.5"
                    >
                      <div className="flex items-center justify-between border-b border-slate-700/80 pb-2 text-[10px] text-sky-400">
                        <span className="flex items-center gap-1.5">
                          <Terminal size={12} />
                          <span>{currentMod.file}</span>
                        </span>
                        <span className="text-slate-400">ACTIVE</span>
                      </div>

                      <div className="space-y-1.5 text-left">
                        {currentMod.lines.map((line, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 text-[10.5px] leading-snug"
                          >
                            <span className="text-slate-500 tabular-nums select-none">
                              0{i + 1}
                            </span>
                            <code className="text-sky-100 break-words">{line}</code>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-slate-800 text-[10px] text-cyan-300 flex items-center justify-between">
                        <span>{currentMod.metric}</span>
                        <Cpu size={12} className="text-blue-400" />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="pt-2 border-t border-border/60 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                  <span>Select subsystem · Hover for parallax</span>
                  <span className="text-accent font-semibold">GPU-FRIENDLY 3D</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Deep Dive on JARVIS (Voice Intelligence Engine) */}
      <section className="py-20 sm:py-28 border-b border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <ScrollReveal direction="up" distance={20} className="space-y-2 max-w-2xl">
            <div className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              FLAGSHIP AI/ML ARTIFACT
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
              JARVIS — Voice Intelligence Engine
            </h2>
            <p className="font-sans text-sm sm:text-base text-muted-foreground font-light">
              Autonomous Python desktop assistant with dynamic noise-calibrated speech recognition
              &amp; multi-step OS automation.
            </p>
          </ScrollReveal>

          {/* Architecture Pipeline Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-5 rounded-xl border border-border bg-card space-y-2 shadow-sm">
              <div className="flex items-center justify-between text-primary">
                <span className="text-[10px] text-muted-foreground uppercase">Pipeline Step 1</span>
                <Mic size={15} />
              </div>
              <div className="font-bold text-sm text-foreground">Audio Capture</div>
              <p className="font-sans text-xs text-muted-foreground font-light">
                Microphone audio stream buffer with 1.0s dynamic noise-floor energy threshold
                calibration.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-border bg-card space-y-2 shadow-sm">
              <div className="flex items-center justify-between text-accent">
                <span className="text-[10px] text-muted-foreground uppercase">Pipeline Step 2</span>
                <Activity size={15} />
              </div>
              <div className="font-bold text-sm text-foreground">Speech Decoding</div>
              <p className="font-sans text-xs text-muted-foreground font-light">
                SpeechRecognition decoding with token normalization to lowercase streams and
                defensive fallbacks.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-border bg-card space-y-2 shadow-sm">
              <div className="flex items-center justify-between text-primary">
                <span className="text-[10px] text-muted-foreground uppercase">Pipeline Step 3</span>
                <Cpu size={15} />
              </div>
              <div className="font-bold text-sm text-foreground">Intent Dispatcher</div>
              <p className="font-sans text-xs text-muted-foreground font-light">
                Pattern-matched intent routing across worker modules: browser automation, Wikipedia
                knowledge, and audio.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-border bg-card space-y-2 shadow-sm">
              <div className="flex items-center justify-between text-emerald-500">
                <span className="text-[10px] text-muted-foreground uppercase">Pipeline Step 4</span>
                <Terminal size={15} />
              </div>
              <div className="font-bold text-sm text-foreground">OS Execution</div>
              <p className="font-sans text-xs text-muted-foreground font-light">
                Subprocess invocations, local audio playback controls, and pyttsx3 synthesized
                speech output.
              </p>
            </div>
          </div>

          {/* Code Specimen Callout */}
          <div className="p-6 sm:p-8 rounded-2xl border border-border bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto shadow-lg space-y-3">
            <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-3">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span>jarvis_engine.py — Core Execution Subsystem</span>
              </span>
              <a
                href="https://github.com/ps06222005-oss/JARVIS"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:underline flex items-center gap-1"
              >
                <span>View on GitHub</span>
                <ExternalLink size={12} />
              </a>
            </div>

            <pre className="text-slate-300 leading-relaxed">
              {`# Dynamic Energy Threshold Calibration to prevent false mic triggers
with sr.Microphone() as source:
    recognizer.adjust_for_ambient_noise(source, duration=1.0)
    audio = recognizer.listen(source)

# Intent Routing & Multi-Step System Automation Dispatch
intent = normalize_tokens(recognizer.recognize_google(audio))
if "wikipedia" in intent:
    results = wikipedia.summary(query, sentences=2)
    pyttsx3_engine.say(results)
    pyttsx3_engine.runAndWait()`}
            </pre>
          </div>
        </div>
      </section>

      {/* Section 2: Verified GitHub Repositories Archive */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <ScrollReveal direction="up" distance={20} className="space-y-2 max-w-2xl">
            <div className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              VERIFIED CODEBASES
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
              Public Repository Ledger
            </h2>
            <p className="font-sans text-sm sm:text-base text-muted-foreground font-light">
              All 6 repositories verified directly from GitHub API (`ps06222005-oss`). Real source
              code with transparent version control.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
            {FALLBACK_PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="p-6 rounded-2xl border border-border bg-card flex flex-col justify-between space-y-4 shadow-sm hover:border-primary/50 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">
                      {proj.category}
                    </span>
                    <span className="text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                      {proj.primaryLanguage}
                    </span>
                  </div>

                  <h3 className="font-display font-semibold text-lg text-foreground">
                    {proj.displayName || proj.name}
                  </h3>

                  <p className="font-sans text-xs text-muted-foreground leading-relaxed line-clamp-3 font-light">
                    {proj.overview}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-border">
                  <div className="flex flex-wrap gap-1 text-[10px] text-muted-foreground">
                    {proj.technologies.slice(0, 3).map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-secondary/60">
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline"
                  >
                    <span>View GitHub Repository</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-16 border-t border-border bg-secondary/30 text-center">
        <div className="mx-auto max-w-4xl px-4 space-y-6">
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
            Explore the Creative Dimension
          </h3>
          <p className="font-sans text-sm text-muted-foreground max-w-xl mx-auto font-light">
            Switch worlds to inspect design tokens, UI/UX thinking, and responsive interface craft.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={enterWorkspace}
              className="px-6 py-3 rounded-full bg-cyan-600 text-white font-mono text-xs font-bold hover:bg-cyan-500 transition-all shadow-md shadow-cyan-600/20 cursor-pointer"
            >
              Enter 3D Holographic Workspace →
            </button>
            <button
              type="button"
              onClick={enterCreative}
              className="px-6 py-3 rounded-full bg-primary text-white font-mono text-xs font-bold hover:bg-primary/90 transition-all shadow-md cursor-pointer"
            >
              Enter Creative World →
            </button>
            <button
              type="button"
              onClick={exploreFull}
              className="px-6 py-3 rounded-full border border-border bg-card text-foreground font-mono text-xs font-semibold hover:border-primary transition-all cursor-pointer"
            >
              Explore Full Experience
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
