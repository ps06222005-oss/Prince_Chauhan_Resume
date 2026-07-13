import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, FolderGit2, Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { Particles } from "./Particles";

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
        if (text.length - 1 === 0) {
          setDel(false);
          setI((v) => v + 1);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i]);

  return text;
}

export function Hero() {
  const typed = useTyping();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div
        className="absolute inset-0 -z-10 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.68 0.19 258 / 0.4) 1px, transparent 1px), linear-gradient(90deg, oklch(0.68 0.19 258 / 0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <Particles count={50} />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-32 pb-20">
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
          className="mt-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]"
        >
          Hi, I'm <span className="text-gradient">Prince Chauhan</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 max-w-2xl text-lg sm:text-xl text-muted-foreground"
        >
          B.Tech CSE (AI & ML) Student
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="/resume.pdf"
            download
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-ring transition-transform hover:scale-[1.03]"
          >
            <Download size={16} /> Download Resume
          </a>
          <button
            onClick={() => scrollTo("projects")}
            className="group inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            <FolderGit2 size={16} /> View Projects
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 flex items-center gap-3"
        >
          {[
            { href: "https://github.com/princechauhan", icon: Github, label: "GitHub" },
            { href: "https://linkedin.com/in/princechauhan", icon: Linkedin, label: "LinkedIn" },
            { href: "mailto:prince@example.com", icon: Mail, label: "Email" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="grid h-11 w-11 place-items-center rounded-full glass hover:text-accent-cyan hover:-translate-y-0.5 transition-all"
            >
              <s.icon size={18} />
            </a>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span>Scroll</span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-accent-blue to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
