import { Github, Linkedin, Mail } from "lucide-react";
import { PROFILE } from "@/lib/portfolio-data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 bg-[#050816]">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold">
            <span className="text-gradient">Prince</span>
            <span className="text-foreground/80">.dev</span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Designed &amp; developed by{" "}
            <span className="text-foreground font-medium">{PROFILE.name}</span>.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="text-xs uppercase tracking-wider text-foreground/70 mb-2">Built With</p>
          <p>React · Vite · Tailwind CSS · Framer Motion</p>
        </div>
        <div className="sm:text-right">
          <div className="flex items-center gap-2 sm:justify-end">
            {[
              { href: PROFILE.github, icon: Github, label: "GitHub" },
              { href: PROFILE.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: `mailto:${PROFILE.email}`, icon: Mail, label: "Email" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-full glass hover:text-accent-cyan transition-colors">
                <s.icon size={15} />
              </a>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">© {year} — All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
