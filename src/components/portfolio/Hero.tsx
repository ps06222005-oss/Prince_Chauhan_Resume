import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, FolderGit2, Github, Linkedin, Mail, ArrowRight, Code, Cpu, Terminal as TermIcon, Braces, Database, Bot } from "lucide-react";
import { Particles } from "./Particles";
import { PROFILE, STATS } from "@/lib/portfolio-data";
import profileImg from "@/assets/profile.jpg";

const roles = [
  "Aspiring Software Developer",
  "AI Enthusiast",
  "Python Learner",
  "Problem Solver",
];

function useTyping() {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const current = roles[i % roles.length];
    const speed = del ? 40 : 90;
    const t = setTimeout(() => {
      if (!del) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setDel(true), 1400);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDel(false); setI((v) => v + 1); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i]);
  return text;
}

const floatIcons = [
  { Icon: Code, x: "8%", y: "20%", d: 0 },
  { Icon: Cpu, x: "88%", y: "18%", d: 0.4 },
  { Icon: TermIcon, x: "5%", y: "72%", d: 0.8 },
  { Icon: Braces, x: "92%", y: "68%", d: 1.2 },
  { Icon: Database, x: "78%", y: "88%", d: 1.6 },
  { Icon: Bot, x: "15%", y: "88%", d: 2.0 },
];

export function Hero() {
  const typed = useTyping();
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 30 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section ref={ref} id="home" className="relative min-h-screen overflow-hidden">
      {/* Soft premium background */}
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <motion.div
        aria-hidden
        className="absolute -z-10 inset-0 opacity-70"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 15% 25%, oklch(0.55 0.19 258 / 0.10), transparent 60%), radial-gradient(ellipse 50% 40% at 85% 75%, oklch(0.62 0.17 250 / 0.08), transparent 60%)",
          backgroundSize: "200% 200%",
        }}
      />
      <div
        className="absolute inset-0 -z-10 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.18 0.02 265 / 0.06) 1px, transparent 1px), linear-gradient(90deg, oklch(0.18 0.02 265 / 0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      {/* Mouse spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity"
        style={{
          background: `radial-gradient(500px circle at ${pos.x}% ${pos.y}%, oklch(0.55 0.19 258 / 0.08), transparent 70%)`,
        }}
      />
      <Particles count={40} />

      {/* Floating tech icons */}
      {floatIcons.map(({ Icon, x, y, d }, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute hidden md:block text-accent-cyan/40"
          style={{ left: x, top: y }}
          animate={{ y: [0, -20, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 6, delay: d, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="glass grid h-12 w-12 place-items-center rounded-xl">
            <Icon size={20} />
          </div>
        </motion.div>
      ))}

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-32 pb-20 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex w-fit items-center gap-2 rounded-full glass px-3 py-1 text-xs text-accent-cyan"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-cyan" />
            </span>
            Open to internship opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]"
          >
            Hi, I'm <span className="text-gradient">{PROFILE.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 max-w-2xl text-lg sm:text-xl text-muted-foreground"
          >
            {PROFILE.role}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 flex items-center gap-2 text-xl sm:text-2xl font-display font-medium min-h-[2.5rem]"
          >
            <span className="text-accent-cyan">{"//"}</span>
            <span className="text-foreground">{typed}</span>
            <span className="inline-block h-6 w-[3px] bg-accent-blue animate-pulse" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 max-w-xl text-base text-muted-foreground leading-relaxed"
          >
            I focus on learning by building real-world projects and continuously improving my software development and AI skills.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href={PROFILE.resume}
              download
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-ring transition-transform hover:scale-[1.03]"
            >
              <Download size={16} /> Download Resume
            </a>
            <button
              onClick={() => scrollTo("projects")}
              className="group inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold hover:bg-black/[0.06] transition-colors"
            >
              <FolderGit2 size={16} /> View Projects
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-6 flex items-center gap-3"
          >
            {[
              { href: PROFILE.github, icon: Github, label: "GitHub" },
              { href: PROFILE.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: `mailto:${PROFILE.email}`, icon: Mail, label: "Email" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                className="grid h-11 w-11 place-items-center rounded-full glass hover:text-accent-cyan hover:-translate-y-0.5 transition-all">
                <s.icon size={18} />
              </a>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-2xl"
          >
            {STATS.map((s) => (
              <div key={s.label} className="glass rounded-xl p-4">
                <div className="text-2xl font-bold text-gradient">
                  {s.value}{s.suffix}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto"
        >
          <div className="relative h-72 w-72 sm:h-96 sm:w-96">
            {/* Soft blue glow */}
            <div
              aria-hidden
              className="absolute -inset-8 rounded-full opacity-70 blur-3xl"
              style={{ background: "radial-gradient(circle, #60a5fa 0%, transparent 65%)" }}
            />
            <motion.div
              className="absolute -inset-2 rounded-full opacity-60 blur-xl"
              style={{ background: "conic-gradient(from 0deg, #3b82f6, #60a5fa, #93c5fd, #3b82f6)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -inset-1 rounded-full"
              style={{ background: "conic-gradient(from 0deg, #3b82f6, #93c5fd, #3b82f6)" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative h-full w-full overflow-hidden rounded-full ring-[6px] ring-background shadow-[0_30px_80px_-20px_rgba(59,130,246,0.35)]">
              <img src={profileImg} alt={PROFILE.name} width={768} height={768} className="h-full w-full object-cover" />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="flex flex-col items-center gap-2">
          <span>Scroll</span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-accent-blue to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
