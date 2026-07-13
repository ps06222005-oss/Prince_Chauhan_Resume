import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 bg-[#050816]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {year} — Designed &amp; Developed by{" "}
          <span className="text-gradient font-semibold">Prince Chauhan</span>
        </p>
        <div className="flex items-center gap-2">
          {[
            { href: "https://github.com/princechauhan", icon: Github, label: "GitHub" },
            { href: "https://linkedin.com/in/princechauhan", icon: Linkedin, label: "LinkedIn" },
            { href: "mailto:prince.chauhan@example.com", icon: Mail, label: "Email" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="grid h-9 w-9 place-items-center rounded-full glass hover:text-accent-cyan transition-colors"
            >
              <s.icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
