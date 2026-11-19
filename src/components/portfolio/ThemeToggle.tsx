import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        isDark ? "Switch to Arctic Light theme" : "Switch to Arctic Dark Liquid Glass theme"
      }
      title={isDark ? "Switch to Light mode" : "Switch to Dark mode"}
      className={`relative inline-flex items-center gap-2 rounded-xl p-2 text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${className}`}
    >
      <div className="relative flex h-5 w-5 items-center justify-center">
        <motion.div
          key={theme}
          initial={{ scale: 0.5, rotate: isDark ? -90 : 90, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0.5, rotate: isDark ? 90 : -90, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex items-center justify-center text-foreground"
        >
          {isDark ? (
            <Sun className="h-4.5 w-4.5 text-amber-400 hover:text-amber-300 transition-colors" />
          ) : (
            <Moon className="h-4.5 w-4.5 text-sky-600 hover:text-sky-700 transition-colors" />
          )}
        </motion.div>
      </div>

      {showLabel && (
        <span className="text-xs font-medium text-foreground/80">
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </button>
  );
}
