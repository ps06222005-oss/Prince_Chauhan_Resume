import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { PROFILE } from "@/lib/portfolio-data";
import logo from "@/assets/logo-pc.png";

const quickLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="relative border-t border-border bg-background/60 backdrop-blur">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="" width={36} height={36} loading="lazy" className="h-9 w-9" />
            <p className="font-display text-lg font-bold tracking-tight">
              <span className="text-foreground">Prince</span>
              <span className="text-primary"> Chauhan</span>
            </p>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            B.Tech CSE (AI &amp; ML) student and aspiring software developer, building modern
            web experiences and learning in public. Open to internship opportunities.
          </p>
          <p className="mt-6 text-xs text-muted-foreground">
            Built with React, Vite, Tailwind CSS &amp; Framer Motion.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/70">
            Quick links
          </p>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/70">
            Connect
          </p>
          <div className="flex items-center gap-2">
            {[
              { href: PROFILE.github, icon: Github, label: "GitHub" },
              { href: PROFILE.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: `mailto:${PROFILE.email}`, icon: Mail, label: "Email" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-11 w-11 place-items-center rounded-full glass transition-all hover:-translate-y-0.5 hover:text-primary"
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>
          <a
            href={PROFILE.resume}
            download
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            Download Resume
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} {PROFILE.name} — All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            Back to top <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
