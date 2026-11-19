import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { workspaceSound } from "@/lib/workspace-audio";

export type WorkspaceMode = "portal" | "creative" | "technical" | "full" | "workspace";

interface WorkspaceContextType {
  mode: WorkspaceMode;
  previousMode: WorkspaceMode | null;
  audioEnabled: boolean;
  enterCreative: () => void;
  enterTechnical: () => void;
  enterWorkspace: () => void;
  exploreFull: () => void;
  resetToPortal: () => void;
  toggleAudio: () => void;
  setMode: (mode: WorkspaceMode) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

const STORAGE_KEY_MODE = "pc_workspace_mode_v1";
const STORAGE_KEY_AUDIO = "pc_workspace_audio_v1";

function modeFromHash(rawHash: string): WorkspaceMode | null {
  const hash = rawHash.toLowerCase();
  if (hash === "#creative") return "creative";
  if (hash === "#technical") return "technical";
  if (hash === "#workspace") return "workspace";
  if (
    hash === "#full" ||
    hash === "#home" ||
    hash === "#projects" ||
    hash === "#about" ||
    hash === "#skills" ||
    hash === "#github" ||
    hash === "#certifications" ||
    hash === "#contact"
  ) {
    return "full";
  }
  return null;
}

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<WorkspaceMode>("portal");
  const [previousMode, setPreviousMode] = useState<WorkspaceMode | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);

  // Initialize from URL hash or sessionStorage, and stay synced on hashchange (Back/Forward)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check Audio preference (always default to false if unset)
    try {
      const storedAudio = sessionStorage.getItem(STORAGE_KEY_AUDIO);
      if (storedAudio === "true") {
        setAudioEnabled(true);
      }
    } catch {
      /* ignore */
    }

    const fromHash = modeFromHash(window.location.hash);
    if (fromHash) {
      setModeState(fromHash);
    } else {
      try {
        const stored = sessionStorage.getItem(STORAGE_KEY_MODE) as WorkspaceMode | null;
        if (stored && ["portal", "creative", "technical", "full", "workspace"].includes(stored)) {
          setModeState(stored);
        }
      } catch {
        /* ignore */
      }
    }

    const handleHashChange = () => {
      const nextFromHash = modeFromHash(window.location.hash) ?? "portal";
      setModeState((current) => {
        if (current === nextFromHash) return current;
        setPreviousMode(current);
        try {
          sessionStorage.setItem(STORAGE_KEY_MODE, nextFromHash);
        } catch {
          /* ignore */
        }
        return nextFromHash;
      });
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const setMode = useCallback((newMode: WorkspaceMode) => {
    setModeState((current) => {
      if (current !== newMode) {
        setPreviousMode(current);
      }
      return newMode;
    });
    try {
      sessionStorage.setItem(STORAGE_KEY_MODE, newMode);
      if (typeof window !== "undefined") {
        const desiredHash =
          newMode === "creative"
            ? "#creative"
            : newMode === "technical"
              ? "#technical"
              : newMode === "workspace"
                ? "#workspace"
                : newMode === "full"
                  ? "#full"
                  : "";
        if (desiredHash) {
          if (window.location.hash.toLowerCase() !== desiredHash) {
            window.location.hash = desiredHash.slice(1);
          }
        } else if (window.location.hash) {
          history.replaceState(null, "", window.location.pathname);
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  const enterCreative = useCallback(() => {
    workspaceSound.modeEngage(audioEnabled, false);
    setMode("creative");
  }, [audioEnabled, setMode]);

  const enterTechnical = useCallback(() => {
    workspaceSound.modeEngage(audioEnabled, true);
    setMode("technical");
  }, [audioEnabled, setMode]);

  const enterWorkspace = useCallback(() => {
    workspaceSound.modeEngage(audioEnabled, false);
    setMode("workspace");
  }, [audioEnabled, setMode]);

  const exploreFull = useCallback(() => {
    workspaceSound.click(audioEnabled);
    setMode("full");
  }, [audioEnabled, setMode]);

  const resetToPortal = useCallback(() => {
    workspaceSound.click(audioEnabled);
    setMode("portal");
  }, [audioEnabled, setMode]);

  const toggleAudio = useCallback(() => {
    setAudioEnabled((prev) => {
      const next = !prev;
      workspaceSound.click(next);
      try {
        sessionStorage.setItem(STORAGE_KEY_AUDIO, String(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return (
    <WorkspaceContext.Provider
      value={{
        mode,
        previousMode,
        audioEnabled,
        enterCreative,
        enterTechnical,
        enterWorkspace,
        exploreFull,
        resetToPortal,
        toggleAudio,
        setMode,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
