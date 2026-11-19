import { motion } from "framer-motion";
import { MONITORS_META, MonitorId } from "./WorkspaceScene";
import { workspaceSound } from "@/lib/workspace-audio";
import { Monitor, ArrowRight, Eye, Sparkles, Cpu, Layers, GraduationCap, Send } from "lucide-react";

interface WorkspaceFallbackProps {
  activeMonitor: MonitorId | null;
  onSelectMonitor: (id: MonitorId) => void;
  audioEnabled: boolean;
}

const ICON_MAP: Record<MonitorId, React.ComponentType<{ className?: string }>> = {
  creative: Sparkles,
  technical: Cpu,
  projects: Layers,
  profile: GraduationCap,
  connect: Send,
};

export function WorkspaceFallback({
  activeMonitor,
  onSelectMonitor,
  audioEnabled,
}: WorkspaceFallbackProps) {
  const monitorList = Object.values(MONITORS_META);

  return (
    <div className="relative min-h-[80vh] w-full px-4 py-8 flex flex-col items-center justify-center">
      {/* Background Architectural Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Header Telemetry */}
      <div className="relative z-10 max-w-4xl w-full text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-mono mb-3">
          <Monitor className="w-3.5 h-3.5" />
          <span>HOLOGRAPHIC DESK INTERFACE // 2D COMPACT MODE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-foreground">
          WORKSPACE STATIONS
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl mx-auto">
          Select any interactive station below to inspect its live systems, verified GitHub ledger,
          or creative and engineering pipelines.
        </p>
      </div>

      {/* 5-Monitor Station Grid */}
      <div className="relative z-10 max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {monitorList.map((m) => {
          const isSelected = activeMonitor === m.id;
          const Icon = ICON_MAP[m.id];

          return (
            <motion.div
              key={m.id}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                workspaceSound.click(audioEnabled);
                onSelectMonitor(m.id);
              }}
              className={`group cursor-pointer relative p-5 rounded-xl border transition-all text-left flex flex-col justify-between ${
                isSelected
                  ? "bg-card/90 border-primary ring-2 ring-primary/30 shadow-lg shadow-primary/10"
                  : "bg-card/40 border-border/80 hover:border-primary/50 hover:bg-card/70"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center border"
                    style={{
                      borderColor: m.accentColor,
                      backgroundColor: `${m.accentColor}15`,
                      color: m.accentColor,
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-border text-muted-foreground">
                    {m.badge}
                  </span>
                </div>

                <div className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground mb-1">
                  {m.category}
                </div>
                <h3 className="text-lg font-bold font-mono text-foreground mb-1 group-hover:text-primary transition-colors">
                  {m.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">{m.tagline}</p>

                {/* Sub-items */}
                <ul className="space-y-1.5 text-[11px] font-mono text-muted-foreground/90 border-t border-border/40 pt-3">
                  {m.previewItems.slice(0, 3).map((item, i) => (
                    <li key={i} className="flex items-center gap-1.5 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                      <span className="truncate">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-mono text-primary">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {isSelected ? "ACTIVE STATION" : "INSPECT DETAILS"}
                </span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
