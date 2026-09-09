import { useState } from "react";
import {
  Mic,
  Radio,
  Cpu,
  Terminal,
  Volume2,
  Film,
  Search,
  Shield,
  Activity,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface PipelineStep {
  id: string;
  number: string;
  label: string;
  technology: string;
  detail: string;
  codeSnippet?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const ARCHITECTURES: Record<
  string,
  {
    title: string;
    subtitle: string;
    steps: PipelineStep[];
  }
> = {
  jarvis: {
    title: "Autonomous Acoustic Voice Pipeline (JARVIS)",
    subtitle:
      "Real-time acoustic sampling, dynamic ambient noise floor calibration, and offline speech synthesis",
    steps: [
      {
        id: "input",
        number: "01",
        label: "VOICE INPUT",
        technology: "Microphone / PyAudio",
        detail: "Continuous acoustic stream ingestion from hardware microphone input buffer.",
        codeSnippet: "with sr.Microphone() as source:\n    audio = recognizer.listen(source)",
        icon: Mic,
      },
      {
        id: "calibration",
        number: "02",
        label: "AMBIENT CALIBRATION",
        technology: "adjust_for_ambient_noise",
        detail:
          "Samples ambient room noise for 1s to compute a dynamic acoustic energy threshold, preventing false speech triggers.",
        codeSnippet:
          "recognizer.adjust_for_ambient_noise(source, duration=1)\nrecognizer.energy_threshold *= 1.15",
        icon: Radio,
      },
      {
        id: "stt",
        number: "03",
        label: "SPEECH RECOGNITION",
        technology: "Google Speech API",
        detail:
          "Transfers digitized raw PCM audio frames to speech recognition model for phoneme extraction and lexical tokenization.",
        codeSnippet: "command = recognizer.recognize_google(audio, language='en-in')",
        icon: Cpu,
      },
      {
        id: "router",
        number: "04",
        label: "COMMAND ROUTER",
        technology: "Python Subsystem",
        detail:
          "Lexical pattern matching and intent classification to dispatch user queries to automated OS actions.",
        codeSnippet:
          "if 'wikipedia' in command:\n    summary = wikipedia.summary(query, sentences=2)",
        icon: Terminal,
      },
      {
        id: "action",
        number: "05",
        label: "SYSTEM ACTION",
        technology: "Subprocess & Web APIs",
        detail:
          "Direct OS system automation, application launches via subprocess, and external web telemetry queries.",
        codeSnippet: "subprocess.Popen(['open', app_path])\nwebbrowser.open(target_url)",
        icon: Zap,
      },
      {
        id: "synthesis",
        number: "06",
        label: "VOICE RESPONSE",
        technology: "pyttsx3 Speech Engine",
        detail:
          "Offline multi-platform text-to-speech synthesis with customized speech rate (175 wpm) and voice pitch selection.",
        codeSnippet:
          "engine.setProperty('rate', 175)\nengine.say(response_text)\nengine.runAndWait()",
        icon: Volume2,
      },
    ],
  },
  onlinestream: {
    title: "Media Discovery & Stream Integration Pipeline",
    subtitle:
      "High-performance reactive frontend with debounced API queries, CORS-validated stream resolution, and sandboxed playback",
    steps: [
      {
        id: "query",
        number: "01",
        label: "QUERY & DEBOUNCE",
        technology: "Next.js / React 18",
        detail:
          "Client-side search input with custom 300ms debounce hook preventing unnecessary network load and throttling.",
        codeSnippet: "const debouncedQuery = useDebounce(query, 300);",
        icon: Search,
      },
      {
        id: "metadata",
        number: "02",
        label: "CATALOG INGESTION",
        technology: "TMDB REST API",
        detail:
          "Fetches normalized media catalogs, high-resolution poster backdrops, release dates, and cast metadata.",
        codeSnippet: "const res = await fetch(`/api/tmdb/search?q=${encodeURIComponent(query)}`);",
        icon: Film,
      },
      {
        id: "resolver",
        number: "03",
        label: "STREAM RESOLVER",
        technology: "Embed Provider Protocol",
        detail:
          "Resolves media identifiers to stream endpoint with CORS, referrer validation, and secure origin checks.",
        codeSnippet: "const streamUrl = resolveEmbedStream(mediaId, { season, episode });",
        icon: Zap,
      },
      {
        id: "player",
        number: "04",
        label: "SANDBOXED PLAYER",
        technology: "HTML5 / Iframe Sandbox",
        detail:
          "Isolated HTML5 iframe player container with strict CSP and sandbox flags to eliminate intrusive trackers.",
        codeSnippet:
          '<iframe src={streamUrl} sandbox="allow-scripts allow-same-origin" allowFullScreen />',
        icon: Shield,
      },
    ],
  },
  decodelabs: {
    title: "Algorithmic Complexity & Systems Benchmark",
    subtitle:
      "Formal data structures and algorithmic complexity proofs verifying O(N log N) / O(1) runtime guarantees",
    steps: [
      {
        id: "input",
        number: "01",
        label: "INPUT MATRIX",
        technology: "Data Structures (DSA)",
        detail:
          "Validation across complex tree structures, adjacency matrices, graphs, and dynamic arrays.",
        codeSnippet: "struct Graph { int V; vector<vector<int>> adj; };",
        icon: Terminal,
      },
      {
        id: "solver",
        number: "02",
        label: "ALGORITHMIC SOLVER",
        technology: "C++ / Python",
        detail:
          "Heuristic optimizations, recursive tree pruning, and memoized dynamic programming states.",
        codeSnippet: "int dp[MAX_N]; memset(dp, -1, sizeof(dp));",
        icon: Cpu,
      },
      {
        id: "bound",
        number: "03",
        label: "COMPLEXITY BOUND",
        technology: "Big-O Verification",
        detail:
          "Formal boundary proofs verifying worst-case asymptotic bounds O(N log N) with minimal heap consumption.",
        codeSnippet: "// Proved Upper Bound: T(n) = 2T(n/2) + O(n) => O(n log n)",
        icon: Activity,
      },
    ],
  },
};

export function ProjectArchitectureDiagram({
  projectName,
  interactive = true,
}: {
  projectName: string;
  interactive?: boolean;
}) {
  const norm = projectName.toLowerCase();
  let archKey = "jarvis";
  if (norm.includes("stream")) archKey = "onlinestream";
  else if (norm.includes("decode")) archKey = "decodelabs";

  const arch = ARCHITECTURES[archKey] || ARCHITECTURES.jarvis;
  const [activeStep, setActiveStep] = useState<number | null>(0);

  const currentStep = activeStep !== null ? arch.steps[activeStep] : null;

  return (
    <div
      data-cursor="inspect"
      className="relative rounded-2xl border border-white/[0.08] bg-[#0c0e14]/90 p-5 sm:p-7 backdrop-blur-xl transition-all"
    >
      {/* Visual Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2 font-mono text-xs text-foreground font-semibold">
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
          <span>{arch.title}</span>
        </div>
        <div className="font-mono text-[11px] text-muted-foreground/60">
          <span>{arch.steps.length} VERIFIED STAGES</span>
        </div>
      </div>

      {/* Architectural Node Flow (Horizontal on desktop, stacked on mobile) */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:flex lg:items-stretch lg:gap-2">
        {arch.steps.map((step, idx) => {
          const isSelected = activeStep === idx;
          const StepIcon = step.icon;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => interactive && setActiveStep(idx)}
              className={`group relative flex-1 text-left rounded-xl border p-3.5 sm:p-4 transition-all duration-300 ${
                isSelected
                  ? "border-amber-400/80 bg-amber-500/[0.08] shadow-[0_0_24px_-8px_rgba(245,158,11,0.3)] text-foreground"
                  : "border-white/[0.08] bg-white/[0.02] text-muted-foreground hover:border-white/[0.2] hover:bg-white/[0.04]"
              }`}
            >
              {/* Step Index & Icon */}
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className={isSelected ? "text-amber-300 font-bold" : "text-white/40"}>
                  {step.number}
                </span>
                <StepIcon
                  size={14}
                  className={`transition-colors ${isSelected ? "text-amber-300" : "text-white/40 group-hover:text-foreground"}`}
                />
              </div>

              {/* Title & Tech */}
              <div className="mt-3 font-display text-xs sm:text-sm font-bold tracking-tight text-foreground">
                {step.label}
              </div>
              <div className="mt-1 font-mono text-[10px] text-amber-300/80 truncate">
                {step.technology}
              </div>

              {/* Connecting indicator */}
              {idx < arch.steps.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-white/20">
                  <ArrowRight size={12} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Stage Technical Dossier Callout */}
      {currentStep && (
        <div className="mt-5 rounded-xl border border-white/[0.08] bg-black/40 p-4 sm:p-5 font-mono text-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-3 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold">{currentStep.number} //</span>
              <span className="text-foreground font-semibold uppercase">{currentStep.label}</span>
              <span className="text-white/30 hidden sm:inline">|</span>
              <span className="text-muted-foreground hidden sm:inline">
                {currentStep.technology}
              </span>
            </div>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 size={11} />
              VERIFIED IMPLEMENTATION
            </span>
          </div>

          <p className="mt-3 font-sans text-sm text-muted-foreground leading-relaxed">
            {currentStep.detail}
          </p>

          {currentStep.codeSnippet && (
            <div className="mt-3 rounded-lg border border-white/[0.06] bg-black/60 p-3 overflow-x-auto text-[11px] text-amber-200/90">
              <pre className="font-mono">{currentStep.codeSnippet}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
