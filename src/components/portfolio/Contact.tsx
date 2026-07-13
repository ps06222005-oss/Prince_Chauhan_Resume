import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Send, Loader2, CheckCircle2 } from "lucide-react";
import { Section } from "./Section";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(5, "Please write a short message").max(1000),
});

const infos = [
  { icon: Mail, label: "Email", value: "prince.chauhan@example.com", href: "mailto:prince.chauhan@example.com" },
  { icon: Phone, label: "Phone", value: "+91 00000 00000", href: "tel:+910000000000" },
  { icon: MapPin, label: "Location", value: "India", href: null },
  { icon: Github, label: "GitHub", value: "github.com/princechauhan", href: "https://github.com/princechauhan" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/princechauhan", href: "https://linkedin.com/in/princechauhan" },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

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
    // EmailJS placeholder — opens mail client as safe fallback
    await new Promise((r) => setTimeout(r, 800));
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:prince.chauhan@example.com?subject=${subject}&body=${body}`;
    setStatus("sent");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something together"
      subtitle="Open to internships, collaborations and a good conversation."
    >
      <div className="grid gap-8 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 space-y-3"
        >
          {infos.map((i) => {
            const Inner = (
              <>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-primary/20 text-accent-cyan">
                  <i.icon size={16} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{i.label}</p>
                  <p className="truncate text-sm font-medium">{i.value}</p>
                </div>
              </>
            );
            return i.href ? (
              <a
                key={i.label}
                href={i.href}
                target={i.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="glass flex items-center gap-4 rounded-xl p-4 hover:border-accent-blue/40 hover:-translate-y-0.5 transition-all"
              >
                {Inner}
              </a>
            ) : (
              <div key={i.label} className="glass flex items-center gap-4 rounded-xl p-4">
                {Inner}
              </div>
            );
          })}
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass lg:col-span-3 rounded-2xl p-6 sm:p-8 space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm outline-none focus:border-accent-blue/60"
                placeholder="Your full name"
                maxLength={100}
              />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm outline-none focus:border-accent-blue/60"
                placeholder="you@company.com"
                maxLength={255}
              />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              maxLength={1000}
              className="mt-1.5 w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm outline-none focus:border-accent-blue/60"
              placeholder="Tell me about the role or project..."
            />
            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-ring hover:scale-[1.02] transition-transform disabled:opacity-70"
          >
            {status === "sending" ? (
              <><Loader2 size={16} className="animate-spin" /> Sending...</>
            ) : status === "sent" ? (
              <><CheckCircle2 size={16} /> Sent</>
            ) : (
              <><Send size={16} /> Send Message</>
            )}
          </button>
        </motion.form>
      </div>
    </Section>
  );
}
