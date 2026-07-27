import { Github, Linkedin, Mail } from "lucide-react";
import { PROFILE } from "@/lib/portfolio-data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border bg-background/60 backdrop-blur">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-3">
        <div>
          <p className="font-display text-xl font-semibold tracking-tight">
            <span className="text-gradient">Prince</span>
            <span className="text-foreground/80">.dev</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Designed &amp; developed with care by{" "}
            <span className="text-foreground font-medium">{PROFILE.name}</span>.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/70 mb-3">Built With</p>
          <p className="leading-relaxed">React · Vite · Tailwind CSS · Framer Motion</p>
        </div>
        <div className="sm:text-right">
          <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/70 mb-3">Connect</p>
          <div className="flex items-center gap-2 sm:justify-end">
            {[
              { href: PROFILE.github, icon: Github, label: "GitHub" },
              { href: PROFILE.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: `mailto:${PROFILE.email}`, icon: Mail, label: "Email" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full glass hover:text-primary hover:-translate-y-0.5 transition-all">
                <s.icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-6 py-5 text-center text-xs text-muted-foreground">© {year} {PROFILE.name} — All rights reserved.</p>
      </div>
    </footer>
  );
}
