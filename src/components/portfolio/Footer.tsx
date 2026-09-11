import { ArrowUp, Github, Linkedin, Mail, Download } from "lucide-react";
import { PROFILE } from "@/lib/portfolio-data";
import { RESUME_PATH, RESUME_FILENAME } from "@/lib/resume";
import { PCLogo } from "./PCLogo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.08] bg-[#050608] py-12 text-white/50 font-mono text-xs select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Mark */}
          <div className="flex items-center gap-3">
            <PCLogo className="h-7 w-auto" />
            <div className="flex flex-col text-left">
              <span className="font-semibold text-white tracking-wider text-xs">
                PRINCE CHAUHAN
              </span>
              <span className="text-[10px] text-white/40">
                AI / ML DEVELOPER · CREATIVE TECHNOLOGIST
              </span>
            </div>
          </div>

          {/* Mottos */}
          <div className="text-center font-mono text-xs text-violet-400 tracking-widest uppercase">
            BUILDING AUTONOMOUS INTELLIGENCE &amp; SPATIAL SYSTEMS
          </div>

          {/* Return to Top */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 text-white/70 hover:text-violet-300 transition-colors uppercase tracking-wider cursor-pointer"
          >
            <span>Top</span>
            <ArrowUp size={13} />
          </button>
        </div>

        {/* Links & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.06] pt-6 text-[11px] text-white/40">
          <p>© {year} Prince Chauhan. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-violet-400 hover:text-violet-300 transition-colors font-medium"
            >
              <Download size={12} />
              <span>Resume (PDF)</span>
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Github size={12} />
              <span>GitHub</span>
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Linkedin size={12} />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail size={12} />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
