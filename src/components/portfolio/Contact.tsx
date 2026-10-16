import { useState } from "react";
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Send,
  CheckCircle2,
  Download,
  Copy,
  Check,
  FileText,
  ExternalLink,
} from "lucide-react";
import { PROFILE } from "@/lib/portfolio-data";
import { RESUME_PATH, RESUME_FILENAME } from "@/lib/resume";
import { MagneticButton } from "./MagneticButton";

/**
 * Contact — Direct Communication & Verified Curriculum Vitae
 *
 * Visual System: BLACK + CHROME + IVORY + ULTRAVIOLET
 * Immersive closing section:
 * - Direct verified channels (Email, LinkedIn, GitHub, Delhi NCR base)
 * - Verified resume asset direct download (Prince_Chauhan_Resume.pdf)
 * - Transmission form with real-time responsive states
 */

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(PROFILE.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    const subject = encodeURIComponent(
      formData.subject.trim() || `Portfolio Inquiry from ${formData.name.trim()}`,
    );
    const body = encodeURIComponent(
      `Hello Prince,\n\nName: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}\n\n(Sent via portfolio website)`,
    );
    const mailtoUrl = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;

    // Safeguard: Copy to clipboard so message is never lost even if mailto fails or user uses webmail
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(
          `To: ${PROFILE.email}\nSubject: ${formData.subject}\nFrom: ${formData.name} <${formData.email}>\n\n${formData.message}`,
        )
        .catch(() => {});
    }

    try {
      window.location.href = mailtoUrl;
    } catch {
      // Graceful fallback
    }

    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 10000);
    }, 600);
  };

  return (
    <section
      id="contact"
      aria-label="Direct Transmission and Contact"
      className="relative w-full overflow-hidden bg-[#07090e] text-white py-20 sm:py-28 border-t border-white/[0.08]"
    >
      {/* Background Volumetric Glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute bottom-[10%] left-[15%] w-96 h-96 rounded-full opacity-15 blur-[120px] bg-sky-500" />
        <div className="absolute top-[15%] right-[10%] w-96 h-96 rounded-full opacity-15 blur-[130px] bg-violet-600" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-sky-400 tracking-wider uppercase">
            <span className="text-amber-400">◆</span>
            <span>COMMUNICATION &amp; NETWORK</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] text-white">
            Initiate Contact. <br />
            <span className="text-gradient-electric">Build Together.</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Open to software engineering internships, research in autonomous intelligence systems,
            and creative technology collaborations.
          </p>
        </div>

        {/* 2-Column Transmission Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Channels & Resume Asset */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-1">
              <h3 className="font-display font-semibold text-xl text-white">
                Direct Channels &amp; Dossier
              </h3>
              <p className="font-sans text-xs text-white/50 leading-relaxed">
                Reach out directly via email, professional network, or download the full curriculum
                vitae.
              </p>
            </div>

            {/* Direct Channel Cards */}
            <div className="space-y-3 font-mono text-xs">
              {/* Email Card with 1-click copy */}
              <div className="p-4 sm:p-5 rounded-2xl border border-white/[0.08] bg-[#0c101c] flex items-center justify-between group hover:border-sky-500/30 transition-all">
                <div className="flex items-center gap-3.5">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    <Mail size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">Primary Email</div>
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="font-sans font-medium text-white group-hover:text-sky-300 transition-colors text-sm"
                    >
                      {PROFILE.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg border border-white/[0.08] hover:border-sky-400/40 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check size={13} className="text-emerald-400" />
                      <span className="text-emerald-400 text-[11px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span className="text-[11px]">Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* LinkedIn */}
              <div className="p-4 sm:p-5 rounded-2xl border border-white/[0.08] bg-[#0c101c] flex items-center justify-between group hover:border-sky-500/30 transition-all">
                <div className="flex items-center gap-3.5">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Linkedin size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">LinkedIn Profile</div>
                    <a
                      href={PROFILE.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans font-medium text-white group-hover:text-sky-300 transition-colors text-sm truncate max-w-[200px] sm:max-w-none block"
                    >
                      prince-chauhan-3418a3288
                    </a>
                  </div>
                </div>

                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg border border-white/[0.08] hover:border-sky-400/40 text-slate-300 hover:text-sky-300 transition-colors flex items-center gap-1 text-[11px]"
                >
                  <span>Connect</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* GitHub */}
              <div className="p-4 sm:p-5 rounded-2xl border border-white/[0.08] bg-[#0c101c] flex items-center justify-between group hover:border-sky-500/30 transition-all">
                <div className="flex items-center gap-3.5">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
                    <Github size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">GitHub Profile</div>
                    <a
                      href={PROFILE.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans font-medium text-white group-hover:text-sky-300 transition-colors text-sm"
                    >
                      github.com/ps06222005-oss
                    </a>
                  </div>
                </div>

                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg border border-white/[0.08] hover:border-sky-400/40 text-slate-300 hover:text-sky-300 transition-colors flex items-center gap-1 text-[11px]"
                >
                  <span>Follow</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* Location */}
              <div className="p-4 sm:p-5 rounded-2xl border border-white/[0.08] bg-[#0c101c] flex items-center gap-3.5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <MapPin size={16} />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Base Station</div>
                  <div className="font-sans font-medium text-white text-sm">
                    Ghaziabad, Uttar Pradesh, India (Delhi NCR)
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-0.5">
                    Open to Remote &amp; On-Site Relocation
                  </div>
                </div>
              </div>
            </div>

            {/* Official Resume Capsule */}
            <div className="p-6 sm:p-8 rounded-2xl border border-blue-500/25 bg-[#0c101c] space-y-4 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-sky-400 font-semibold uppercase tracking-wider">
                  <FileText size={15} />
                  <span>CURRICULUM VITAE</span>
                </div>
                <span className="font-mono text-[10px] text-sky-300 bg-sky-500/20 px-2 py-0.5 rounded-full border border-sky-500/30">
                  PDF 2026
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="font-display font-bold text-xl text-white">
                  Prince Chauhan — Resume
                </h4>
                <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  Verified B.Tech coursework, JARVIS and OnlineStream project specifications, and
                  technical competencies.
                </p>
              </div>

              <div className="pt-2">
                <MagneticButton
                  href={RESUME_PATH}
                  download={RESUME_FILENAME}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 font-mono text-xs font-semibold text-white shadow-[0_0_24px_rgba(59,130,246,0.35)] transition-all active:scale-95 cursor-pointer text-center"
                  title="Direct Download Prince_Chauhan_Resume.pdf"
                >
                  <Download size={15} />
                  <span>DOWNLOAD VERIFIED RESUME (PDF)</span>
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Right Column: Transmission Form */}
          <div className="lg:col-span-6 rounded-2xl border border-white/[0.08] bg-[#0c101c] p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="space-y-1">
              <div className="font-mono text-xs text-sky-400 font-semibold uppercase tracking-wider">
                TRANSMISSION TERMINAL
              </div>
              <h3 className="font-display font-bold text-2xl text-white">Send A Message</h3>
              <p className="font-sans text-xs text-slate-400">
                Direct inbox dispatch. Every message receives attention.
              </p>
            </div>

            {status === "success" ? (
              <div className="p-8 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-center space-y-3">
                <CheckCircle2 size={36} className="text-emerald-400 mx-auto" />
                <h4 className="font-display font-bold text-white text-lg">
                  Transmission Dispatched
                </h4>
                <p className="font-sans text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Your email client has been launched with your message. A formatted copy has also
                  been saved to your clipboard.
                </p>
                <div className="pt-2">
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                    Prince responds within 24 hours
                  </span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div className="space-y-1.5">
                  <label className="text-slate-300 uppercase text-[10px] tracking-wider block font-semibold">
                    Your Name / Organization
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Engineering Lead / Recruiter"
                    className="w-full px-4 py-2.5 rounded-xl border border-white/[0.1] bg-[#07090e] text-white font-sans text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/30 transition-colors placeholder:text-slate-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 uppercase text-[10px] tracking-wider block font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. contact@domain.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-white/[0.1] bg-[#07090e] text-white font-sans text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/30 transition-colors placeholder:text-slate-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 uppercase text-[10px] tracking-wider block font-semibold">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Software Engineering Opportunity"
                    className="w-full px-4 py-2.5 rounded-xl border border-white/[0.1] bg-[#07090e] text-white font-sans text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/30 transition-colors placeholder:text-slate-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 uppercase text-[10px] tracking-wider block font-semibold">
                    Message Body
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, team, or opportunity..."
                    className="w-full px-4 py-2.5 rounded-xl border border-white/[0.1] bg-[#07090e] text-white font-sans text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/30 transition-colors placeholder:text-slate-500 resize-none"
                  />
                </div>

                <MagneticButton
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 font-mono text-xs font-semibold text-white shadow-[0_0_24px_rgba(59,130,246,0.35)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer active:scale-98"
                >
                  {status === "submitting" ? (
                    <span>Dispatching...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send size={14} />
                    </>
                  )}
                </MagneticButton>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
