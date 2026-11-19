import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WorkspaceScene, MonitorId, MONITORS_META } from "./WorkspaceScene";
import { WorkspaceFallback } from "./WorkspaceFallback";
import { useWorkspace } from "@/context/WorkspaceContext";
import { ThemeToggle } from "@/components/portfolio/ThemeToggle";
import { workspaceSound } from "@/lib/workspace-audio";
import {
  Compass,
  Sparkles,
  Cpu,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  X,
  ArrowRight,
  Maximize2,
  RefreshCw,
  Terminal,
} from "lucide-react";

interface HolographicWorkspaceProps {
  className?: string;
}

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")),
    );
  } catch {
    return false;
  }
}

export function HolographicWorkspace({ className = "" }: HolographicWorkspaceProps) {
  const {
    previousMode,
    audioEnabled,
    toggleAudio,
    enterCreative,
    enterTechnical,
    exploreFull,
    resetToPortal,
  } = useWorkspace();
  const entryFrom =
    previousMode === "creative" || previousMode === "technical" ? previousMode : null;

  const [activeMonitor, setActiveMonitor] = useState<MonitorId | null>(null);
  const [cameraPreset, setCameraPreset] = useState<"overview" | MonitorId>("overview");
  const [controlsCollapsed, setControlsCollapsed] = useState(false);
  const [isMobileOrLowSpec, setIsMobileOrLowSpec] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleSelectMonitor = useCallback((id: MonitorId) => {
    setActiveMonitor(id);
    setCameraPreset(id);
  }, []);

  const handleResetCamera = useCallback(() => {
    workspaceSound.click(audioEnabled);
    setActiveMonitor(null);
    setCameraPreset("overview");
  }, [audioEnabled]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const webglSupported = checkWebGLSupport();

    if (prefersReducedMotion || !webglSupported) {
      setIsMobileOrLowSpec(true);
    }

    const checkTheme = () => {
      setIsDarkTheme(document.documentElement.classList.contains("dark"));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Keyboard shortcuts in 3D Workspace:
    // ESC: close monitor inspector / reset overview
    // H / Z: toggle Zen mode (hide bottom dock)
    // 1-5: quick focus to monitors
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "Escape") {
        setActiveMonitor(null);
        setCameraPreset("overview");
      } else if (e.key === "h" || e.key === "H" || e.key === "z" || e.key === "Z") {
        setControlsCollapsed((prev) => !prev);
      } else if (e.key === "1") {
        handleSelectMonitor("projects");
      } else if (e.key === "2") {
        handleSelectMonitor("creative");
      } else if (e.key === "3") {
        handleSelectMonitor("technical");
      } else if (e.key === "4") {
        handleSelectMonitor("profile");
      } else if (e.key === "5") {
        handleSelectMonitor("connect");
      } else if (e.key === "0") {
        handleResetCamera();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleResetCamera, handleSelectMonitor]);

  const handleOpenSection = (id: MonitorId) => {
    workspaceSound.click(audioEnabled);
    if (id === "creative") {
      enterCreative();
    } else if (id === "technical") {
      enterTechnical();
    } else if (id === "projects") {
      exploreFull();
      setTimeout(() => {
        const el = document.getElementById("projects");
        el?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else if (id === "profile") {
      exploreFull();
      setTimeout(() => {
        const el = document.getElementById("about");
        el?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else if (id === "connect") {
      exploreFull();
      setTimeout(() => {
        const el = document.getElementById("contact");
        el?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  };

  return (
    <div
      className={`relative w-full min-h-dvh bg-background text-foreground overflow-hidden flex flex-col justify-between ${className}`}
    >
      {/* 1. TOP MINIMAL TELEMETRY BAR (Palette 5 Compliant) */}
      <header className="relative z-20 w-full px-4 sm:px-8 py-3 flex items-center justify-between border-b border-border bg-card/95 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={resetToPortal}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-secondary/60 hover:bg-secondary text-foreground text-xs font-mono font-medium transition-colors cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-primary" />
            <span>[BIOS PORTAL]</span>
          </button>
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span className="text-primary font-semibold">INSIDE MY WORKSPACE // V3.8</span>
            <span className="text-border">/</span>
            <span className="text-foreground font-medium">PRINCE CHAUHAN</span>
          </div>
        </div>

        {/* World Quick Switchers & Controls */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => {
              workspaceSound.click(audioEnabled);
              enterCreative();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-foreground hover:text-accent hover:bg-secondary/60 border border-border transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>CREATIVE</span>
          </button>

          <button
            onClick={() => {
              workspaceSound.click(audioEnabled);
              enterTechnical();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-foreground hover:text-primary hover:bg-secondary/60 border border-border transition-all cursor-pointer"
          >
            <Cpu className="w-3.5 h-3.5 text-primary" />
            <span>TECHNICAL</span>
          </button>

          <button
            onClick={() => {
              workspaceSound.click(audioEnabled);
              exploreFull();
            }}
            aria-label="Full Journey"
            title="Explore Full Portfolio Journey"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">FULL JOURNEY</span>
          </button>

          <button
            onClick={toggleAudio}
            title={audioEnabled ? "Mute Cybernetic Audio" : "Enable Cybernetic Audio"}
            className={`p-2 rounded-lg border text-xs transition-colors cursor-pointer ${
              audioEnabled
                ? "border-primary/50 bg-primary/10 text-primary"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {audioEnabled ? (
              <Volume2 className="w-3.5 h-3.5" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </button>

          <ThemeToggle />
        </div>
      </header>

      {/* 2. CENTRAL 3D VIEWPORT / 2D FALLBACK */}
      <div className="relative flex-1 w-full h-full min-h-[360px] overflow-hidden">
        {isMobileOrLowSpec ? (
          <WorkspaceFallback
            activeMonitor={activeMonitor}
            onSelectMonitor={handleSelectMonitor}
            audioEnabled={audioEnabled}
          />
        ) : (
          <WorkspaceScene
            activeMonitor={activeMonitor}
            onSelectMonitor={handleSelectMonitor}
            audioEnabled={audioEnabled}
            cameraPreset={cameraPreset}
            isDarkTheme={isDarkTheme}
            entryFrom={entryFrom}
          />
        )}
      </div>

      {/* 3. ACTIVE MONITOR INSPECTION DRAWER (Palette 5 Compliant) */}
      <AnimatePresence>
        {activeMonitor && (
          <motion.aside
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 right-4 sm:right-8 z-30 max-w-md w-[calc(100vw-2rem)] rounded-2xl border border-border bg-card/95 shadow-2xl p-5 sm:p-6 text-foreground"
          >
            {(() => {
              const meta = MONITORS_META[activeMonitor];
              return (
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="inline-block text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-primary/30 bg-primary/10 text-primary mb-1.5">
                        {meta.badge}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-foreground">
                        {meta.title}
                      </h3>
                      <p className="text-xs font-mono text-muted-foreground">{meta.category}</p>
                    </div>
                    <button
                      onClick={() => setActiveMonitor(null)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {meta.tagline}
                  </p>

                  <div className="space-y-2 border-t border-border pt-3">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                      Station Payload
                    </span>
                    <ul className="space-y-2 text-xs font-mono text-foreground">
                      {meta.previewItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-primary font-bold mt-0.5">›</span>
                          <span className="leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => handleOpenSection(meta.id)}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs font-bold shadow-md transition-colors cursor-pointer"
                    >
                      <span>ENTER {meta.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handleResetCamera}
                      title="Reset Camera to Overview"
                      className="p-2.5 rounded-xl border border-border hover:bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* 4. UNIFIED COLLAPSIBLE BOTTOM CONTROL DOCK (Three.js Skill Compliant) */}
      <footer className="relative z-20 w-full flex flex-col items-center justify-center pb-4 pointer-events-none">
        {/* Toggle Collapse Pill */}
        <button
          onClick={() => {
            workspaceSound.click(audioEnabled);
            setControlsCollapsed((prev) => !prev);
          }}
          className="pointer-events-auto inline-flex items-center gap-1.5 px-3.5 py-1 rounded-t-xl border-t border-x border-border bg-card/90 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-all shadow-sm cursor-pointer"
        >
          {controlsCollapsed ? (
            <>
              <ChevronUp className="w-3 h-3 text-primary" />
              <span>SHOW CONTROLS</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3 text-primary" />
              <span>HIDE CONTROLS [ZEN MODE]</span>
            </>
          )}
        </button>

        {/* Collapsible Dock */}
        <AnimatePresence>
          {!controlsCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.15 }}
              className="pointer-events-auto max-w-4xl w-[94vw] rounded-2xl border border-border bg-card/95 px-4 py-2.5 shadow-2xl flex flex-wrap items-center justify-between gap-3 text-foreground"
            >
              {/* Camera Stations Pills */}
              <div className="flex items-center flex-wrap gap-1.5 text-xs font-mono">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider mr-1">
                  Station:
                </span>
                <button
                  onClick={handleResetCamera}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    cameraPreset === "overview" && !activeMonitor
                      ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60 border border-transparent"
                  }`}
                >
                  Overview
                </button>

                <button
                  onClick={() => handleSelectMonitor("projects")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeMonitor === "projects"
                      ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60 border border-transparent"
                  }`}
                >
                  Projects
                </button>

                <button
                  onClick={() => handleSelectMonitor("creative")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeMonitor === "creative"
                      ? "bg-accent text-white font-semibold shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60 border border-transparent"
                  }`}
                >
                  Creative
                </button>

                <button
                  onClick={() => handleSelectMonitor("technical")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeMonitor === "technical"
                      ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60 border border-transparent"
                  }`}
                >
                  Technical
                </button>

                <button
                  onClick={() => handleSelectMonitor("profile")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeMonitor === "profile"
                      ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60 border border-transparent"
                  }`}
                >
                  Profile
                </button>

                <button
                  onClick={() => handleSelectMonitor("connect")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeMonitor === "connect"
                      ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60 border border-transparent"
                  }`}
                >
                  Connect
                </button>
              </div>

              {/* Status Indicator & Reset */}
              <div className="flex items-center gap-3 text-[11px] font-mono text-muted-foreground">
                <span className="hidden sm:inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>3D STATIONS READY</span>
                </span>
                <span className="text-border">|</span>
                <button
                  onClick={handleResetCamera}
                  className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>RESET [0]</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </footer>
    </div>
  );
}
