import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo-pc.png";

export function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          aria-hidden
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[90] grid place-items-center bg-background"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div
                className="absolute -inset-8 rounded-full blur-2xl opacity-70"
                style={{ background: "radial-gradient(circle, #93c5fd 0%, transparent 65%)" }}
              />
              <img src={logo} alt="" width={56} height={56} className="relative h-14 w-14" />
            </motion.div>
            <div className="h-[2px] w-40 overflow-hidden rounded-full bg-black/[0.06]">
              <motion.div
                className="h-full w-1/3 rounded-full bg-gradient-primary"
                animate={{ x: ["-120%", "320%"] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
