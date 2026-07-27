import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Send, Loader2, CheckCircle2, AlertCircle, Clock, Handshake, Briefcase, Copy, Check } from "lucide-react";
import { Section } from "./Section";
import { z } from "zod";
import { PROFILE } from "@/lib/portfolio-data";

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      aria-label={`Copy ${label}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard?.writeText(value).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
      className="ml-auto grid h-8 w-8 shrink-0 place-items-center rounded-md text-muted-foreground hover:text-accent-cyan hover:bg-black/[0.04] transition-colors"
    >
      {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
    </button>
  );
}

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(5, "Please write a short message").max(1000),
});

const infos = [
  { icon: Mail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { icon: Phone, label: "Phone", value: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/\s/g, "")}` },
  { icon: MapPin, label: "Location", value: PROFILE.location, href: null },
  { icon: Github, label: "GitHub", value: "github.com/ps06222005-oss", href: PROFILE.github },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/prince-chauhan-3418a3288", href: PROFILE.linkedin },
];

const availability = [
  { icon: Briefcase, label: "Open to Internships", tone: "text-green-400" },
  { icon: Handshake, label: "Open to Collaboration", tone: "text-accent-cyan" },
  { icon: Clock, label: "Responds within 24h", tone: "text-purple-400" },
];

// EmailJS env — populate later; falls back to mailto until then
const EMAILJS_SERVICE = (import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined) ?? "";
const EMAILJS_TEMPLATE = (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined) ?? "";
const EMAILJS_PUBLIC = (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined) ?? "";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");

    // Try EmailJS if configured
    if (EMAILJS_SERVICE && EMAILJS_TEMPLATE && EMAILJS_PUBLIC) {
      try {
        const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: EMAILJS_SERVICE,
            template_id: EMAILJS_TEMPLATE,
            user_id: EMAILJS_PUBLIC,
            template_params: {
              from_name: form.name,
              from_email: form.email,
              message: form.message,
              to_email: PROFILE.email,
            },
          }),
        });
        if (!res.ok) throw new Error(await res.text());
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 3500);
        return;
      } catch (err) {
        setStatus("error");
        setErrMsg("Couldn't send via EmailJS — opening your mail app as a fallback.");
      }
    }

    // Fallback mailto
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
    setTimeout(() => setStatus("idle"), 3500);
  };

  return (
    <Section id="contact" eyebrow="Contact" title="Let's build something together" subtitle="Open to internships, collaborations and a good conversation.">
      <div className="grid gap-8 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="lg:col-span-2 space-y-3"
        >
          <div className="glass rounded-2xl p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Availability</p>
            <div className="space-y-2.5">
              {availability.map((a) => (
                <div key={a.label} className="flex items-center gap-3">
                  <span className={`grid h-8 w-8 place-items-center rounded-lg bg-black/[0.04] ring-1 ring-black/[0.08] ${a.tone}`}>
                    <a.icon size={14} />
                  </span>
                  <span className="text-sm">{a.label}</span>
                </div>
              ))}
            </div>
          </div>

          {infos.map((i) => {
            const copyable = i.label === "Email" || i.label === "Phone";
            const Inner = (
              <>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-primary/20 text-accent-cyan">
                  <i.icon size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{i.label}</p>
                  <p className="truncate text-sm font-medium">{i.value}</p>
                </div>
                {copyable && <CopyButton value={i.value} label={i.label} />}
              </>
            );
            return i.href ? (
              <a key={i.label} href={i.href} target={i.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                className="glass flex items-center gap-4 rounded-xl p-4 hover:border-accent-blue/40 hover:-translate-y-0.5 transition-all">
                {Inner}
              </a>
            ) : (
              <div key={i.label} className="glass flex items-center gap-4 rounded-xl p-4">{Inner}</div>
            );
          })}
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="glass lg:col-span-3 rounded-2xl p-6 sm:p-8 space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1.5 w-full rounded-lg border border-black/[0.08] bg-black/[0.03] px-3.5 py-2.5 text-sm outline-none focus:border-accent-blue/60"
                placeholder="Your full name" maxLength={100} />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1.5 w-full rounded-lg border border-black/[0.08] bg-black/[0.03] px-3.5 py-2.5 text-sm outline-none focus:border-accent-blue/60"
                placeholder="you@company.com" maxLength={255} />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Message</label>
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5} maxLength={1000}
              className="mt-1.5 w-full resize-none rounded-lg border border-black/[0.08] bg-black/[0.03] px-3.5 py-2.5 text-sm outline-none focus:border-accent-blue/60"
              placeholder="Tell me about the role or project..." />
            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
          </div>

          {status === "sent" && (
            <div className="flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-300">
              <CheckCircle2 size={16} /> Message sent — I'll reply within 24 hours.
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-2 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-3 py-2 text-sm text-yellow-200">
              <AlertCircle size={16} /> {errMsg}
            </div>
          )}

          <button type="submit" disabled={status === "sending"}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-ring hover:scale-[1.02] transition-transform disabled:opacity-70">
            {status === "sending" ? (<><Loader2 size={16} className="animate-spin" /> Sending...</>) :
             status === "sent" ? (<><CheckCircle2 size={16} /> Sent</>) :
             (<><Send size={16} /> Send Message</>)}
          </button>
        </motion.form>
      </div>
    </Section>
  );
}
