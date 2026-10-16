import { ArrowUp, Github, Linkedin, Mail, Download } from "lucide-react";
import { PROFILE } from "@/lib/portfolio-data";
import { RESUME_PATH, RESUME_FILENAME } from "@/lib/resume";
import { PCLogo } from "./PCLogo";

export function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#07090e] py-12 text-slate-400 font-mono text-xs select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Mark */}
          <div className="flex items-center gap-3">
            <PCLogo className="h-7 w-auto" />
            <div className="flex flex-col text-left">
              <span className="font-semibold text-white tracking-wider text-xs">
                PRINCE CHAUHAN
              </span>
              <span className="text-[10px] text-slate-400">
                AI / ML DEVELOPER · CREATIVE TECHNOLOGIST
              </span>
            </div>
          </div>

          {/* Quick Page Jump Links */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-slate-400">
            <button
              type="button"
              onClick={() => scrollTo("home")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => scrollTo("projects")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Work
            </button>
            <button
              type="button"
              onClick={() => scrollTo("about")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => scrollTo("skills")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Skills
            </button>
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Return to Top */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 text-slate-300 hover:text-sky-300 transition-colors uppercase tracking-wider cursor-pointer font-mono text-[11px]"
          >
            <span>Top</span>
            <ArrowUp size={13} />
          </button>
        </div>

        {/* Links & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.06] pt-6 text-[11px] text-slate-400">
          <p>© {year} Prince Chauhan. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors font-medium"
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
