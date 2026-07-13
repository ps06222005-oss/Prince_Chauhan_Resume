import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send } from "lucide-react";
import { PROFILE } from "@/lib/portfolio-data";

type Msg = { role: "user" | "bot"; text: string };

const SUGGESTIONS = ["Who are you?", "Skills", "Projects", "Resume", "Education", "Contact"];

function answer(q: string): string {
  const t = q.toLowerCase();
  if (/who|about|you/.test(t))
    return `I'm ${PROFILE.name}, a ${PROFILE.role} based in ${PROFILE.location}. I'm an aspiring software developer and AI enthusiast, actively looking for internships.`;
  if (/skill|tech|stack|know/.test(t))
    return `My toolkit: Python (Learning & Project Experience), C (Basic), HTML, CSS. Libraries: SpeechRecognition, pyttsx3, Pandas, Requests. Tools: VS Code, Git, GitHub, Colab, Jupyter, ChatGPT. Concepts: ML/NLP basics, OOP, DBMS, Networks, DSA.`;
  if (/project|build|work/.test(t))
    return `Two main projects:\n• JARVIS — Python voice assistant (${PROFILE.jarvisRepo})\n• AI Automation Scripts — small Python utilities.`;
  if (/resume|cv/.test(t))
    return `You can download my resume from the top of the page or here: ${PROFILE.resume}`;
  if (/education|study|college|degree/.test(t))
    return `B.Tech in Computer Science Engineering (AI & ML) at Sunderdeep Global University — expected 2028.`;
  if (/contact|email|reach|hire|phone|linkedin/.test(t))
    return `Email: ${PROFILE.email}\nPhone: ${PROFILE.phone}\nLinkedIn: ${PROFILE.linkedin}\nGitHub: ${PROFILE.github}`;
  if (/github/.test(t))
    return `My GitHub: ${PROFILE.github}`;
  if (/internship|job|hire/.test(t))
    return `Yes — I'm actively open to software development and AI/ML internships. Reach out at ${PROFILE.email}.`;
  return `I can only answer questions about this portfolio — try asking about skills, projects, resume, education, or contact.`;
}

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: `Hi! I'm Prince's portfolio assistant. Ask me about skills, projects, resume, education, or contact.` },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { scrollRef.current?.scrollTo({ top: 99999 }); }, [msgs, open]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMsgs((prev) => [...prev, { role: "user", text: q }, { role: "bot", text: answer(q) }]);
    setInput("");
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 left-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform"
        aria-label="Open assistant"
      >
        {open ? <X size={20} /> : <Bot size={22} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass fixed bottom-24 left-6 z-40 flex h-[420px] w-[min(360px,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-primary-foreground">
                <Bot size={16} />
              </span>
              <div>
                <p className="text-sm font-semibold">Portfolio Assistant</p>
                <p className="text-[11px] text-muted-foreground">Answers from Prince's info only</p>
              </div>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-auto p-3 space-y-2 text-sm">
              {msgs.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 ${
                    m.role === "user" ? "bg-gradient-primary text-primary-foreground" : "bg-white/5 border border-white/10"
                  }`}>{m.text}</div>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 p-3">
              <div className="mb-2 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[11px] hover:bg-white/10">
                    {s}
                  </button>
                ))}
              </div>
              <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2">
                <input
                  value={input} onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about skills, projects…"
                  className="flex-1 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-accent-blue/60"
                />
                <button type="submit" className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-primary-foreground" aria-label="Send">
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
