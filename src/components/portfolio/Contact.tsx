import { useState } from "react";
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  Check,
  FileText,
  ExternalLink,
} from "lucide-react";
import { PROFILE } from "@/lib/portfolio-data";
import { RESUME_PATH } from "@/lib/resume";
import { MagneticButton } from "./MagneticButton";
import { ScrollReveal, StaggerRevealGroup, StaggerRevealItem } from "./ScrollReveal";

/**
 * Contact — Direct Communication & Verified Curriculum Vitae (Stitch Blue Design System)
 *
 * Visual System: DEEP MIDNIGHT NAVY (#070B14) + ELECTRIC BLUE (#3B82F6) + SKY CYAN (#38BDF8)
 * - Direct verified channels (Email, LinkedIn, GitHub, Delhi NCR base)
 * - Verified resume asset direct download (Prince_Chauhan_Resume.pdf)
 * - Transmission form with real-time responsive states
 */

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(PROFILE.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const endpoint =
        (typeof process !== "undefined" && process.env?.VITE_FORMSPREE_ENDPOINT) ||
        "https://formsubmit.co/ajax/ps06222005@gmail.com";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: `[Portfolio Inquiry] ${formData.subject || "Software Engineering Inquiry"}`,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(`Submission returned status ${res.status}`);
      }
    } catch (err) {
      console.warn("Direct transmission error, offering email client fallback:", err);
      setStatus("error");
      setErrorMessage(
        "Network transmission blocked or interrupted. You can dispatch directly via your email client.",
      );
    }
  };

  const mailtoFallback = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    formData.subject || "Software Engineering Inquiry",
  )}&body=${encodeURIComponent(
    `From: ${formData.name} (${formData.email})\n\n${formData.message}`,
  )}`;

  return (
    <section
      id="contact"
      aria-label="Direct Transmission and Contact"
      className="relative w-full overflow-hidden bg-background py-20 sm:py-28 lg:py-36 border-t border-border transition-colors duration-300"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={24} className="space-y-3 max-w-3xl">
          <div className="space-y-1">
            <div className="font-mono text-xs text-primary font-semibold tracking-widest uppercase">
              COMMUNICATION &amp; NETWORK
            </div>
            <p className="font-sans text-xs text-muted-foreground">
              Direct Inquiries, Professional Collaborations &amp; Verified Curriculum Vitae
            </p>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-[-0.035em] text-foreground">
            Initiate Contact. <br />
            <span className="text-gradient-chrome">Build Together.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
            Open to software engineering internships, research in autonomous intelligence systems,
            and creative technology collaborations.
          </p>
        </ScrollReveal>

        {/* 2-Column Transmission Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Channels & Resume Asset */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="up" distance={18} delay={0.05} className="space-y-1">
              <h3 className="font-display font-semibold text-xl text-foreground">
                Direct Channels &amp; Dossier
              </h3>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                Reach out directly via email, professional network, or view the full curriculum
                vitae in a new tab.
              </p>
            </ScrollReveal>

            {/* Direct Channel Cards */}
            <StaggerRevealGroup
              staggerChildren={0.08}
              delayChildren={0.08}
              className="space-y-3 font-mono text-xs"
            >
              {/* Email Card with 1-click copy */}
              <StaggerRevealItem className="p-4 sm:p-5 rounded-2xl border border-border bg-card/80 dark:bg-card/40 backdrop-blur-md flex items-center justify-between group hover:border-primary/50 transition-all shadow-sm">
                <div className="flex items-center gap-3.5">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <Mail size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase">Primary Email</div>
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="font-sans font-medium text-foreground group-hover:text-primary transition-colors text-sm"
                    >
                      {PROFILE.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg border border-border hover:border-primary text-muted-foreground hover:text-foreground bg-secondary/50 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check size={13} className="text-accent" />
                      <span className="text-accent text-[11px] font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span className="text-[11px]">Copy</span>
                    </>
                  )}
                </button>
              </StaggerRevealItem>

              {/* LinkedIn */}
              <StaggerRevealItem className="p-4 sm:p-5 rounded-2xl border border-border bg-card/80 dark:bg-card/40 backdrop-blur-md flex items-center justify-between group hover:border-primary/50 transition-all shadow-sm">
                <div className="flex items-center gap-3.5">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent border border-accent/20">
                    <Linkedin size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase">
                      LinkedIn Profile
                    </div>
                    <a
                      href={PROFILE.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans font-medium text-foreground group-hover:text-primary transition-colors text-sm"
                    >
                      linkedin.com/in/prince-chauhan-3418a3288
                    </a>
                  </div>
                </div>

                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg border border-border hover:border-accent text-muted-foreground hover:text-accent transition-colors flex items-center gap-1 text-[11px]"
                >
                  <span>Connect</span>
                  <ExternalLink size={12} />
                </a>
              </StaggerRevealItem>

              {/* GitHub */}
              <StaggerRevealItem className="p-4 sm:p-5 rounded-2xl border border-border bg-card/80 dark:bg-card/40 backdrop-blur-md flex items-center justify-between group hover:border-primary/50 transition-all shadow-sm">
                <div className="flex items-center gap-3.5">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <Github size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase">
                      GitHub Profile
                    </div>
                    <a
                      href={PROFILE.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans font-medium text-foreground group-hover:text-primary transition-colors text-sm"
                    >
                      github.com/ps06222005-oss
                    </a>
                  </div>
                </div>

                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg border border-border hover:border-primary text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-[11px]"
                >
                  <span>Follow</span>
                  <ExternalLink size={12} />
                </a>
              </StaggerRevealItem>

              {/* Location */}
              <StaggerRevealItem className="p-4 sm:p-5 rounded-2xl border border-border bg-card/80 dark:bg-card/40 backdrop-blur-md flex items-center gap-3.5 shadow-sm">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent border border-accent/20">
                  <MapPin size={16} />
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase">Base Station</div>
                  <div className="font-sans font-medium text-foreground text-sm">
                    Ghaziabad, Uttar Pradesh, India (Delhi NCR)
                  </div>
                  <div className="text-[11px] text-primary mt-0.5">
                    Open to Remote &amp; On-Site Relocation
                  </div>
                </div>
              </StaggerRevealItem>
            </StaggerRevealGroup>

            {/* Official Resume Capsule */}
            <ScrollReveal
              direction="up"
              distance={22}
              delay={0.18}
              className="p-6 sm:p-8 rounded-2xl border border-primary/25 bg-card/90 dark:bg-card/40 backdrop-blur-md space-y-4 shadow-md relative overflow-hidden dark:liquid-glass-glow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-primary font-semibold uppercase tracking-wider">
                  <FileText size={15} />
                  <span>CURRICULUM VITAE</span>
                </div>
                <span className="font-mono text-[10px] text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                  PDF 2026
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="font-display font-bold text-xl text-foreground">
                  Prince Chauhan — Resume
                </h4>
                <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
                  B.Tech coursework, JARVIS and OnlineStream project specifications, and technical
                  competencies.
                </p>
              </div>

              <div className="pt-2">
                <MagneticButton
                  href={RESUME_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 font-mono text-xs font-bold text-white shadow-[0_0_24px_rgba(37,99,235,0.35)] transition-all active:scale-95 cursor-pointer text-center"
                  title="View Prince Chauhan Resume (PDF)"
                >
                  <FileText size={15} />
                  <span>VIEW RESUME (PDF)</span>
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Transmission Form */}
          <ScrollReveal
            direction="left"
            distance={26}
            delay={0.14}
            className="lg:col-span-6 rounded-2xl border border-border bg-card/80 dark:bg-card/40 backdrop-blur-md p-6 sm:p-8 space-y-6 shadow-md dark:liquid-glass"
          >
            <div className="space-y-1">
              <div className="font-mono text-xs text-primary font-semibold uppercase tracking-wider">
                TRANSMISSION TERMINAL
              </div>
              <h3 className="font-display font-bold text-2xl text-foreground">Send A Message</h3>
              <p className="font-sans text-xs text-muted-foreground">
                Direct inbox dispatch. Every message receives attention.
              </p>
            </div>

            {status === "success" ? (
              <div className="p-8 rounded-xl border border-primary/30 bg-primary/5 text-center space-y-4">
                <CheckCircle2 size={36} className="text-primary mx-auto" />
                <h4 className="font-display font-semibold text-foreground text-lg">
                  Transmission Dispatched
                </h4>
                <p className="font-sans text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
                  Your message has been delivered to Prince Chauhan&apos;s verified inbox. You will
                  receive a direct response promptly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="min-h-[44px] px-5 py-2 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground text-xs font-mono font-medium transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                {status === "error" && (
                  <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 space-y-2.5">
                    <p className="font-sans text-xs text-red-500 dark:text-red-400">
                      {errorMessage}
                    </p>
                    <a
                      href={mailtoFallback}
                      className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-lg bg-primary text-white font-sans font-semibold text-xs hover:bg-primary/90 transition-colors"
                    >
                      <Mail size={14} />
                      <span>Send Directly via Default Email App</span>
                    </a>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-name"
                    className="text-foreground uppercase text-[10px] tracking-wider block font-semibold"
                  >
                    Your Name / Organization
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Engineering Lead / Recruiter"
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-border bg-background/80 text-foreground font-sans text-sm focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 transition-colors placeholder:text-muted-foreground/60"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-email"
                    className="text-foreground uppercase text-[10px] tracking-wider block font-semibold"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. contact@domain.com"
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-border bg-background/80 text-foreground font-sans text-sm focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 transition-colors placeholder:text-muted-foreground/60"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-subject"
                    className="text-foreground uppercase text-[10px] tracking-wider block font-semibold"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Software Engineering Opportunity"
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-border bg-background/80 text-foreground font-sans text-sm focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 transition-colors placeholder:text-muted-foreground/60"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-foreground uppercase text-[10px] tracking-wider block font-semibold"
                  >
                    Message Body
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, team, or opportunity..."
                    className="w-full p-4 rounded-xl border border-border bg-background/80 text-foreground font-sans text-sm focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 transition-colors placeholder:text-muted-foreground/60 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full min-h-[44px] py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 font-mono text-xs font-bold text-white shadow-[0_0_24px_rgba(37,99,235,0.35)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer active:scale-98 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  {status === "submitting" ? (
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                      <span>Dispatching to ps06222005@gmail.com...</span>
                    </span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
