import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo-pc.png";

export function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = isReduced ? 100 : 650;
    const t = setTimeout(() => setDone(true), duration);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          aria-hidden
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[90] grid place-items-center bg-[#090a0d]"
        >
          <div className="flex flex-col items-center gap-5">
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div
                className="absolute -inset-6 rounded-full blur-2xl opacity-40"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.72 0.16 55 / 0.5) 0%, transparent 70%)",
                }}
              />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.03] backdrop-blur-md">
                <img
                  src={logo}
                  alt="Prince Chauhan monogram logo"
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
              </div>
            </motion.div>

            <div className="flex flex-col items-center gap-2">
              <div className="h-[2px] w-48 overflow-hidden rounded-full bg-white/[0.08]">
                <motion.div
                  className="h-full w-2/5 rounded-full bg-gradient-primary"
                  animate={{ x: ["-100%", "280%"] }}
                  transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                SYSTEM RUNTIME // INITIALIZING
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
