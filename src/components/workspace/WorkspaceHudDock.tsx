import { motion } from "framer-motion";
import { Palette, Code2, Compass, RotateCcw, Volume2, VolumeX, Monitor } from "lucide-react";
import { useWorkspace } from "@/context/WorkspaceContext";
import { ThemeToggle } from "@/components/portfolio/ThemeToggle";

export function WorkspaceHudDock() {
  const {
    mode,
    enterCreative,
    enterTechnical,
    enterWorkspace,
    exploreFull,
    resetToPortal,
    audioEnabled,
    toggleAudio,
  } = useWorkspace();

  if (mode === "portal") {
    // Portal has its own integrated header
    return null;
  }

  return (
    <motion.aside
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ duration: 0.25 }}
      aria-label="Workspace Mode Switcher"
      className="fixed bottom-3.5 sm:bottom-4 left-1/2 -translate-x-1/2 z-40 w-[min(94vw,44rem)] select-none pointer-events-none"
    >
      <div className="pointer-events-auto rounded-xl border border-border bg-card/95 dark:bg-[#0F172A]/90 backdrop-blur-xl p-1.5 sm:p-2 shadow-2xl flex flex-wrap items-center justify-between gap-1.5 font-mono text-xs text-foreground dark:liquid-glass-glow">
        {/* Left: Active Mode Chip */}
        <div className="flex items-center gap-2 pl-1.5">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10 text-primary border border-primary/20">
            {mode === "creative" && <Palette size={13} />}
            {mode === "technical" && <Code2 size={13} />}
            {mode === "workspace" && <Monitor size={13} />}
            {mode === "full" && <Compass size={13} />}
          </div>
          <div>
            <div className="text-[8.5px] uppercase tracking-wider text-muted-foreground">
              ACTIVE WORLD
            </div>
            <div className="font-bold text-[11px] capitalize text-foreground flex items-center gap-1.5">
              <span>
                {mode === "full"
                  ? "Full Continuum"
                  : mode === "workspace"
                    ? "3D Workspace"
                    : `${mode} World`}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
          </div>
        </div>

        {/* Center: Mode Switching Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {mode !== "creative" && (
            <button
              type="button"
              onClick={enterCreative}
              className="min-h-[32px] sm:min-h-[34px] px-2.5 sm:px-3 rounded-lg border border-border bg-secondary/40 hover:bg-secondary text-foreground text-[11px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              title="Switch to Creative World"
            >
              <Palette size={12} className="text-primary" />
              <span className="hidden sm:inline">Creative</span>
            </button>
          )}

          {mode !== "technical" && (
            <button
              type="button"
              onClick={enterTechnical}
              className="min-h-[32px] sm:min-h-[34px] px-2.5 sm:px-3 rounded-lg border border-border bg-secondary/40 hover:bg-secondary text-foreground text-[11px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              title="Switch to Technical World"
            >
              <Code2 size={12} className="text-accent" />
              <span className="hidden sm:inline">Technical</span>
            </button>
          )}

          {mode !== "workspace" && (
            <button
              type="button"
              onClick={enterWorkspace}
              className="min-h-[32px] sm:min-h-[34px] px-2.5 sm:px-3 rounded-lg border border-cyan-600/40 dark:border-cyan-500/30 bg-cyan-50/90 dark:bg-cyan-950/30 hover:bg-cyan-100 dark:hover:bg-cyan-950/50 text-cyan-800 dark:text-cyan-300 text-[11px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none"
              title="Launch 3D Holographic Workspace"
            >
              <Monitor size={12} className="text-cyan-700 dark:text-cyan-400" />
              <span>3D Workspace</span>
            </button>
          )}

          {mode !== "full" && (
            <button
              type="button"
              onClick={exploreFull}
              className="min-h-[32px] sm:min-h-[34px] px-2.5 sm:px-3 rounded-lg border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary text-[11px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              title="View Unified Full Experience"
            >
              <Compass size={12} />
              <span>Full View</span>
            </button>
          )}

          {/* Reset to BIOS Portal */}
          <button
            type="button"
            onClick={resetToPortal}
            className="min-h-[32px] sm:min-h-[34px] px-2 rounded-lg border border-border bg-secondary/30 hover:bg-secondary text-muted-foreground hover:text-foreground text-[11px] flex items-center gap-1 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            title="Return to BIOS Gateway Portal"
          >
            <RotateCcw size={11} />
            <span className="hidden md:inline">Portal</span>
          </button>
        </div>

        {/* Right: Audio & Theme controls */}
        <div className="flex items-center gap-1 pr-0.5">
          <button
            type="button"
            onClick={toggleAudio}
            className={`min-h-[32px] sm:min-h-[34px] px-2 rounded-lg border text-xs flex items-center gap-1 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
              audioEnabled
                ? "border-primary/50 bg-primary/10 text-primary"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
            title={audioEnabled ? "Audio Click Effects Enabled" : "Audio Muted"}
            aria-label="Toggle cybernetic audio clicks"
          >
            {audioEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
          </button>

          <ThemeToggle />
        </div>
      </div>
    </motion.aside>
  );
}
