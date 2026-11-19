import { ArrowUp, Github, Linkedin, Mail, FileText } from "lucide-react";
import { PROFILE } from "@/lib/portfolio-data";
import { RESUME_PATH, RESUME_FILENAME } from "@/lib/resume";
import { PCLogo } from "./PCLogo";
import { ScrollReveal } from "./ScrollReveal";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12 text-muted-foreground font-mono text-xs select-none transition-colors duration-300">
      <ScrollReveal
        direction="up"
        distance={18}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Mark */}
          <div className="flex items-center gap-3">
            <PCLogo className="h-7 w-auto" />
            <div className="flex flex-col text-left">
              <span className="font-semibold text-foreground tracking-wider text-xs">
                PRINCE CHAUHAN
              </span>
              <span className="text-[10px] text-muted-foreground">
                ASPIRING APPLICATION DEVELOPER • CSE (AI &amp; ML)
              </span>
            </div>
          </div>

          {/* Positioning Motto */}
          <div className="text-center font-mono text-[11px] text-primary/90 tracking-widest uppercase font-semibold">
            BUILDING AI-POWERED APPLICATIONS &amp; MODERN DIGITAL EXPERIENCES
          </div>

          {/* Return to Top */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top of page"
            className="min-h-[44px] inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors uppercase tracking-wider cursor-pointer px-3 rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            <span>Top</span>
            <ArrowUp size={13} />
          </button>
        </div>

        {/* Links & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-6 text-[11px] text-muted-foreground">
          <p>© 2026 Prince Chauhan. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-3 inline-flex items-center gap-1.5 text-primary hover:text-accent transition-colors font-semibold rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <FileText size={12} />
              <span>Resume (PDF)</span>
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Prince Chauhan's GitHub profile"
              className="min-h-[44px] px-3 inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <Github size={12} />
              <span>GitHub</span>
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Prince Chauhan's LinkedIn profile"
              className="min-h-[44px] px-3 inline-flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <Linkedin size={12} />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              aria-label="Email Prince Chauhan"
              className="min-h-[44px] px-3 inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <Mail size={12} />
              <span>Email</span>
            </a>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}
