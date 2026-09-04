import { Bot, Cpu } from "lucide-react";
import { PROFILE } from "./profile";

export type Project = {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  overview: string;
  features: string[];
  architecture?: string;
  tech: string[];
  category: "AI/ML" | "Automation" | "Web" | "Other";
  challenges?: string;
  solutions?: string;
  learned?: string;
  future?: string[];
  github: string;
  demo?: string;
  status: "Built" | "Learning in public";
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    icon: Bot,
    title: "JARVIS — Python Voice Assistant",
    overview: "A voice-controlled desktop assistant built in Python. Listens to spoken commands, converts speech to text, and responds with speech while performing simple tasks.",
    features: ["Open applications by voice", "Web searches and Wikipedia lookups", "Speak current time and date", "Play music from local folders", "Simple automation commands"],
    architecture: "A modular Python app: a mic-input layer (SpeechRecognition) feeds a command router that maps intents to small handler modules (web, apps, media, time). Responses are spoken back through pyttsx3.",
    tech: ["Python", "SpeechRecognition", "pyttsx3", "Requests", "Wikipedia API"],
    category: "AI/ML",
    challenges: "Handling noisy microphone input and mapping natural phrases to reliable actions without external LLMs.",
    solutions: "Added an ambient-noise calibration step, normalized transcripts to lowercase keywords, and used simple keyword matching with fallbacks so unknown commands fail gracefully.",
    learned: "Structuring a Python project into modules, working with system APIs, and shipping an end-to-end tool on GitHub.",
    future: ["Wake-word detection", "LLM-powered intent parsing", "Cross-platform packaging (Windows / Linux)"],
    github: PROFILE.jarvisRepo,
    status: "Built",
    featured: true,
  },
  {
    icon: Cpu,
    title: "AI Automation Scripts",
    overview: "A collection of small Python scripts I built while learning — focused on saving time on repetitive tasks with a little help from AI.",
    features: ["CSV analysis with Pandas", "Presentation generation from prompts", "Small automation utilities", "ChatGPT-assisted productivity workflows"],
    architecture: "Each script is standalone and CLI-driven, sharing a small utils layer for file I/O and prompt templating so experiments stay isolated and easy to iterate on.",
    tech: ["Python", "Pandas", "Requests", "ChatGPT"],
    category: "Automation",
    challenges: "Turning ad-hoc scripts into reusable, readable code and handling messy real-world data.",
    solutions: "Split scripts into small pure functions, added defensive parsing for CSV edge cases, and documented usage so I can re-run each script months later.",
    learned: "The value of clean data pipelines and how to prompt AI tools to accelerate development.",
    future: ["Unified CLI entry point", "Config files instead of hardcoded paths", "Basic test coverage"],
    github: PROFILE.github,
    status: "Learning in public",
  },
];

export const PROJECT_TECHNOLOGIES = Array.from(new Set(PROJECTS.flatMap((project) => project.tech)));