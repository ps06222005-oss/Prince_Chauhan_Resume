import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  X,
  Send,
  Trash2,
  Sparkles,
  ExternalLink,
  FileText,
  Mail,
  Info,
  Layers,
} from "lucide-react";
import { PROFILE } from "@/lib/portfolio-data";
import { openOrDownloadResume } from "@/lib/resume";
import { generateAssistantResponse, type AssistantMessage } from "@/services/ai-assistant";

const STORAGE_KEY = "pc-assistant-history-v2";

const SUGGESTIONS = [
  "How does JARVIS work?",
  "What is his AI/ML background?",
  "Is Prince open to internships?",
  "Technical Skills",
  "Download Resume",
  "How to contact Prince?",
];

const WELCOME: AssistantMessage = {
  role: "bot",
  text: `Hi! I'm Prince's Portfolio AI Ambassador, powered by an in-browser Semantic RAG Engine. Ask me about his voice assistant JARVIS, AI/ML skills, university education, or internship availability!`,
  sources: ["Portfolio Overview"],
  actions: [
    { label: "View Projects", actionType: "link", url: "#projects" },
    { label: "Download Resume", actionType: "resume", url: PROFILE.resume },
  ],
  engine: "rag-local",
};

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<AssistantMessage[]>([WELCOME]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [showEngineInfo, setShowEngineInfo] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Hydrate history from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AssistantMessage[];
        if (Array.isArray(parsed) && parsed.length > 0) setMsgs(parsed);
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Persist
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
    } catch {
      /* ignore */
    }
  }, [msgs]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 99999, behavior: "smooth" });
  }, [msgs, open, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const handleActionClick = (action: {
    label: string;
    url?: string;
    actionType?: "resume" | "link" | "mail";
  }) => {
    if (action.actionType === "resume") {
      openOrDownloadResume();
    } else if (action.actionType === "mail") {
      window.location.href = action.url || `mailto:${PROFILE.email}`;
    } else if (action.url) {
      if (action.url.startsWith("#")) {
        const el = document.querySelector(action.url);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          setOpen(false);
        }
      } else {
        window.open(action.url, "_blank", "noopener,noreferrer");
      }
    }
  };

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || typing) return;

    // Check for direct resume command
    if (/^(download\s+)?(resume|cv)$/i.test(q)) {
      openOrDownloadResume();
    }

    const userMsg: AssistantMessage = { role: "user", text: q };
    setMsgs((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    try {
      // Async RAG / LLM response generation
      const reply = await generateAssistantResponse(q);
      setMsgs((prev) => [...prev, reply]);
    } catch {
      setMsgs((prev) => [
        ...prev,
        {
          role: "bot",
          text: "I encountered a brief connection error, but you can find all Prince's verified details directly in the navigation menu and resume.",
          engine: "rag-local",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const clear = () => setMsgs([WELCOME]);

  // Escape closes the assistant panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 left-6 z-40 group grid h-14 w-14 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 border border-amber-400/30"
        aria-label={open ? "Close assistant" : "Open assistant"}
        aria-expanded={open}
      >
        {open ? (
          <X size={20} />
        ) : (
          <Bot size={22} className="group-hover:rotate-6 transition-transform" />
        )}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-background"></span>
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="glass fixed bottom-24 left-6 z-40 flex h-[520px] w-[min(420px,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl border border-white/[0.12] shadow-2xl backdrop-blur-xl bg-background/95"
            role="dialog"
            aria-label="Portfolio AI assistant"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/[0.08] bg-white/[0.04] px-4 py-3.5">
              <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-inner">
                <Bot size={18} />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-emerald-400" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-semibold tracking-tight">Portfolio AI</p>
                  <button
                    onClick={() => setShowEngineInfo((v) => !v)}
                    className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.2 text-[10px] font-medium text-amber-400 hover:bg-amber-500/20 transition-colors"
                    title="Click to view RAG Architecture"
                  >
                    <Sparkles size={10} />
                    <span>RAG Engine</span>
                  </button>
                </div>
                <p className="text-[11px] text-muted-foreground truncate">
                  Trained on Prince's projects & verified resume
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={clear}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-white/[0.08] hover:text-foreground transition-colors"
                  aria-label="Clear conversation"
                  title="Clear conversation"
                >
                  <Trash2 size={15} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-white/[0.08] hover:text-foreground transition-colors"
                  aria-label="Close"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Architecture Explainer Callout (Expandable) */}
            <AnimatePresence>
              {showEngineInfo && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-b border-amber-500/20 bg-amber-500/5 px-4 py-2.5 text-xs text-amber-200/90"
                >
                  <div className="flex items-start gap-2">
                    <Info size={14} className="mt-0.5 text-amber-400 shrink-0" />
                    <p className="leading-relaxed">
                      <strong>AI/ML Architecture:</strong> Uses vector BM25/Cosine similarity
                      retrieval across a structured knowledge corpus with zero-hallucination source
                      grounding.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-3.5 space-y-3 text-sm scroll-smooth"
            >
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 leading-relaxed text-[13px] ${
                      m.role === "user"
                        ? "bg-gradient-primary text-primary-foreground shadow-md font-medium"
                        : "bg-white/[0.05] border border-white/[0.1] text-foreground shadow-sm"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{m.text}</div>

                    {/* Sources Badge */}
                    {m.sources && m.sources.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-white/[0.08] flex flex-wrap items-center gap-1.5 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1 text-accent-cyan/90 font-medium">
                          <Layers size={10} /> Sources:
                        </span>
                        {m.sources.map((src, sIdx) => (
                          <span
                            key={sIdx}
                            className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-foreground/80 border border-white/[0.05]"
                          >
                            {src}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    {m.actions && m.actions.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {m.actions.map((act, aIdx) => (
                          <button
                            key={aIdx}
                            onClick={() => handleActionClick(act)}
                            className="inline-flex items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-[11px] font-medium text-amber-300 hover:bg-amber-500/25 active:scale-95 transition-all"
                          >
                            {act.actionType === "resume" && <FileText size={11} />}
                            {act.actionType === "mail" && <Mail size={11} />}
                            {act.actionType === "link" && <ExternalLink size={11} />}
                            <span>{act.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="inline-flex items-center gap-1.5 rounded-2xl border border-white/[0.1] bg-white/[0.05] px-3.5 py-2.5 text-xs text-muted-foreground">
                    <Sparkles size={12} className="text-amber-400 animate-spin" />
                    <span>Searching knowledge corpus…</span>
                    <Dot delay={0} />
                    <Dot delay={0.2} />
                    <Dot delay={0.4} />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Suggestions & Input Area */}
            <div className="border-t border-white/[0.08] bg-white/[0.02] p-3">
              <div className="mb-2 flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    disabled={typing}
                    className="shrink-0 rounded-full border border-white/[0.1] bg-white/[0.04] px-2.5 py-1 text-[11px] text-muted-foreground hover:text-foreground hover:bg-white/[0.08] hover:border-amber-400/40 transition-colors disabled:opacity-50"
                  >
                    {s}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about JARVIS, AI/ML skills, resume…"
                  aria-label="Ask the AI assistant"
                  className="flex-1 rounded-xl border border-white/[0.1] bg-white/[0.04] px-3.5 py-2 text-xs outline-none transition-all focus:border-amber-400/60 focus:bg-white/[0.07] placeholder:text-muted-foreground/60"
                />
                <button
                  type="submit"
                  disabled={typing || !input.trim()}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
                  aria-label="Send query"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <motion.span
      className="h-1.5 w-1.5 rounded-full bg-amber-400/80"
      animate={{ y: [0, -3, 0], opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 0.8, repeat: Infinity, delay }}
    />
  );
}
