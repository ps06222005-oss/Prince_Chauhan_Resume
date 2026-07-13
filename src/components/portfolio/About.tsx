import { motion } from "framer-motion";
import { GraduationCap, Code2, Sparkles, Target } from "lucide-react";
import { Section } from "./Section";

const highlights = [
  { icon: GraduationCap, title: "B.Tech CSE", text: "Specializing in AI & Machine Learning" },
  { icon: Code2, title: "Software Development", text: "Passionate about building real-world tools" },
  { icon: Sparkles, title: "Learning AI/ML", text: "Exploring Python, NLP and automation" },
  { icon: Target, title: "Internship Ready", text: "Looking for SDE & AI internship roles" },
];

export function About() {
  return (
    <Section id="about" eyebrow="About" title="A student building in public" subtitle="Curious, motivated, and always learning.">
      <div className="grid gap-8 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3 glass rounded-2xl p-8"
        >
          <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
            I'm <span className="text-gradient font-semibold">Prince Chauhan</span>, a
            B.Tech Computer Science Engineering student specializing in{" "}
            <span className="text-foreground font-medium">Artificial Intelligence & Machine Learning</span>.
            My interests lie in software development and the practical side of AI —
            especially building small Python projects that solve real problems.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            I'm still early in my journey. I spend most of my time learning the fundamentals of
            programming, exploring machine learning concepts, and shipping simple automation
            scripts and voice-based tools. I'm actively looking for{" "}
            <span className="text-foreground">internship opportunities</span> where I can
            contribute, learn from experienced engineers, and grow into a well-rounded
            developer.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Outside of academics, I enjoy tinkering with new tools, reading about AI, and
            experimenting with ideas on GitHub.
          </p>
        </motion.div>

        <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-5 hover:border-accent-blue/30 hover:-translate-y-0.5 transition-all"
            >
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-primary/20 text-accent-cyan">
                <h.icon size={18} />
              </div>
              <h3 className="mt-3 font-semibold">{h.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{h.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
