import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { PROFILE } from "@/lib/portfolio-data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.04] bg-[#07080a] py-8 text-muted-foreground/60 font-mono text-[11px]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6">
        <p suppressHydrationWarning>
          © {year} {PROFILE.name}. All verified software artifacts open-sourced under MIT/Apache
          2.0.
        </p>

        <div className="flex items-center gap-5">
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={13} />
            <span>LINKEDIN</span>
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
            aria-label="GitHub Profile"
          >
            <Github size={13} />
            <span>GITHUB</span>
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
            aria-label="Email Prince"
          >
            <Mail size={13} />
            <span>EMAIL</span>
          </a>
        </div>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center gap-2 hover:text-amber-300 transition-colors uppercase tracking-wider"
        >
          <span>RETURN TO TOP</span>
          <ArrowUp size={12} />
        </button>
      </div>
    </footer>
  );
}
