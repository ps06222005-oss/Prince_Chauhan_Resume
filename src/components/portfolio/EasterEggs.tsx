import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PartyPopper, X } from "lucide-react";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

/** Tasteful hidden interactions: a console note and a Konami-code surprise. */
export function EasterEggs() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    // Secret developer message for anyone who opens DevTools.
    console.log(
      "%c👋 Hey, fellow developer!",
      "font-size:14px;font-weight:700;color:#3B82F6",
    );
    console.log(
      "%cBuilt by Prince Chauhan with React, Tailwind & Framer Motion.\nPress Ctrl/⌘ + K for the command palette — or try the Konami code. 🎮",
      "color:#64748b",
    );

    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      const want = KONAMI[idx];
      if (e.key.toLowerCase() === want.toLowerCase()) {
        idx += 1;
        if (idx === KONAMI.length) {
          idx = 0;
          setUnlocked(true);
        }
      } else {
        idx = e.key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!unlocked) return;
    const t = setTimeout(() => setUnlocked(false), 9000);
    return () => clearTimeout(t);
  }, [unlocked]);

  const confetti = Array.from({ length: 28 }, (_, i) => i);

  return (
    <AnimatePresence>
      {unlocked && (
        <>
          <div aria-hidden className="pointer-events-none fixed inset-0 z-[95] overflow-hidden">
            {confetti.map((i) => (
              <motion.span
                key={i}
                className="absolute h-2 w-2 rounded-sm bg-gradient-primary"
                style={{ left: `${(i * 37) % 100}%`, top: "-5%" }}
                initial={{ y: 0, opacity: 1, rotate: 0 }}
                animate={{ y: "110vh", opacity: [1, 1, 0], rotate: 540 }}
                transition={{ duration: 2.6 + (i % 5) * 0.35, delay: (i % 7) * 0.12, ease: "easeIn" }}
              />
            ))}
          </div>
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong fixed bottom-6 left-1/2 z-[96] w-[min(92vw,26rem)] -translate-x-1/2 rounded-2xl p-5"
          >
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <PartyPopper size={18} />
              </span>
              <div className="flex-1">
                <p className="font-display text-sm font-semibold">Konami code unlocked 🎮</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  You found the easter egg. Curiosity like this is exactly how I learn to
                  build things — thanks for poking around!
                </p>
              </div>
              <button
                onClick={() => setUnlocked(false)}
                aria-label="Dismiss easter egg"
                className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
