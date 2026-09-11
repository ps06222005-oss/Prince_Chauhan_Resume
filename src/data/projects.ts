import type { EngineeringProject, ProjectCategory } from "@/types/portfolio";
import { PROFILE } from "./profile";

export type { EngineeringProject };
export type Project = EngineeringProject;

/**
 * Optional architectural case studies to enrich live GitHub repositories.
 * Keyed by repository name (case-insensitive).
 */
export type ProjectCaseStudy = {
  category?: ProjectCategory;
  displayName?: string;
  enhancedOverview?: string;
  positioning?: string;
  what?: string;
  why?: string;
  how?: string;
  engineering?: string;
  technologies?: string[];
  features?: string[];
  architecture?: string;
  challenges?: string;
  solutions?: string;
  learned?: string;
  future?: string[];
};

export const REPO_CASE_STUDIES: Record<string, ProjectCaseStudy> = {
  jarvis: {
    category: "AI/ML",
    displayName: "JARVIS — Voice Intelligence Engine",
    positioning:
      "Autonomous Python desktop assistant with noise-calibrated speech recognition & multi-step OS automation.",
    what: "A voice-activated autonomous desktop assistant built in Python that captures microphone input, executes system utilities, and delivers synthesized voice responses.",
    why: "To eliminate repetitive desktop context-switching and automate operating system workflows, browser queries, and information retrieval through hands-free interaction.",
    how: "Built with a layered Python architecture: audio capture -> SpeechRecognition speech-to-text -> intent router matching -> subsystem workers (web, OS, media, time) -> pyttsx3 speech synthesis pipeline.",
    engineering:
      "Engineered dynamic 1-second energy threshold ambient calibration to avoid false microphone triggers in noisy environments, paired with normalized keyword tokenization and defensive fallback routines.",
    enhancedOverview:
      "A voice-activated autonomous desktop assistant built in Python. Features ambient noise calibration, speech-to-text decoding, natural keyword command routing, and voice synthesis.",
    technologies: ["Python", "SpeechRecognition", "pyttsx3", "Wikipedia API", "System Automation"],
    features: [
      "Real-time voice capture with dynamic ambient noise calibration",
      "Modular command dispatcher with keyword intent mapping",
      "Automated application launching & system diagnostics",
      "Wikipedia knowledge querying & real-time speech responses",
      "Local audio media playback & playback controls",
    ],
    architecture:
      "Layered Python system architecture: microphone stream acquisition -> SpeechRecognition audio processing -> token intent dispatcher -> worker subsystems (web, OS, media, time) -> pyttsx3 text-to-speech audio rendering.",
    challenges:
      "Mitigating microphone background noise and handling conversational speech commands reliably without external cloud API latency.",
    solutions:
      "Implemented a 1-second energy threshold calibration loop, standardized command tokens into lower-case normalized streams, and implemented defensive fallback handlers.",
    learned:
      "Practical OS-level automation in Python, modular event-driven architecture, and packaging robust CLI-based voice applications.",
    future: [
      "Neural wake-word detection model (Snowboy / Porcupine)",
      "Local Small Language Model (SLM) integration for offline intent understanding",
      "Cross-platform system tray utility",
    ],
  },
  onlinestream: {
    category: "Web",
    displayName: "OnlineStream — Media Interface",
    positioning:
      "Production media streaming web interface with responsive audio/video playback and live Vercel cloud deployment.",
    what: "A full-stack media streaming web application built with TypeScript, React, and Tailwind CSS, deployed live on Vercel's edge network.",
    why: "To engineer a fluid, zero-layout-shift web media interface for continuous media streaming across mobile and desktop devices.",
    how: "Component-driven frontend architecture with unified media state controllers, responsive presentation layers, and edge CDN deployment.",
    engineering:
      "Engineered a type-safe media controller managing playback states, buffering transitions, and responsive video aspect ratios with zero layout shifts.",
    enhancedOverview:
      "A modern TypeScript web application for media streaming, featuring responsive playback controls, dynamic content categorization, and cloud deployment.",
    technologies: ["TypeScript", "React", "Tailwind CSS", "Vercel"],
    features: [
      "Fluid responsive media playback UI",
      "Dynamic stream and category exploration",
      "Real-time state management and audio/video controls",
      "Continuous deployment via Vercel edge network",
    ],
    architecture:
      "Component-driven frontend architecture with unified media state controllers and responsive presentation layers.",
    learned: "TypeScript type safety in media player interfaces and edge CDN deployment workflows.",
  },
  "decodelabs-internship": {
    category: "Engineering",
    displayName: "DecodeLabs — Internship Engineering",
    positioning:
      "Software engineering deliverables, algorithmic problem sets, and practical assignments from DecodeLabs technical internship.",
    what: "A repository of software engineering solutions, data structures implementations, and algorithmic scripts developed during the DecodeLabs internship.",
    why: "To solve algorithmic challenges, practice production code quality, and follow rigorous version-controlled milestone delivery standards.",
    how: "Python software architecture following object-oriented principles, modular problem-solving scripts, and Git milestone branches.",
    engineering:
      "Optimized time/space algorithmic complexity across core data structures and implemented automated validation scripts for milestone deliverables.",
    enhancedOverview:
      "Software engineering deliverables, algorithmic problem sets, and practical assignments developed during the DecodeLabs technical internship.",
    technologies: ["Python", "Algorithms", "Data Structures", "Engineering Workflows"],
    features: [
      "Algorithmic problem solutions with time/space complexity analysis",
      "Practical software engineering tasks and data handling scripts",
      "Version-controlled milestone submissions",
    ],
    learned:
      "Adhering to professional software engineering standards, peer review processes, and production Git workflows.",
  },
  prince_chauhan_resume: {
    category: "Web",
    displayName: "Interactive Portfolio & Resume Hub",
    positioning:
      "High-performance developer ecosystem & interactive portfolio with Three.js shaders and live GitHub API synchronization.",
    what: "The personal developer ecosystem and interactive portfolio featuring GPU-accelerated 3D shaders, live GitHub API caching, and keyboard-driven command palette.",
    why: "To present an authentic, live-synced engineering portfolio that serves as a transparent recruiter platform and showcase of creative-tech craftsmanship.",
    how: "Built with React, TypeScript, Three.js custom shaders, Tailwind CSS, TanStack Router, and client-side session caching with zero hydration mismatch.",
    engineering:
      "Engineered rAF-throttled scroll listeners, UTC-deterministic date formatters to eliminate SSR hydration drift, and an intelligent multi-signal repository ranking heuristic.",
    enhancedOverview:
      "Source code for the personal developer ecosystem, featuring high-performance Three.js shaders, live GitHub API synchronization, and responsive design systems.",
    technologies: ["TypeScript", "React", "Three.js", "Tailwind CSS", "Framer Motion"],
    features: [
      "Interactive 3D Three.js neural tensor background",
      "Dynamic GitHub repository ranking and caching pipeline",
      "Command palette (⌘K) quick navigation",
      "Strict type safety and zero-layout-shift UI",
    ],
    learned:
      "Architecting scalable frontend portfolio systems with graceful offline degradation and mathematical layout grids.",
  },
};

/**
 * Curated Fallback Projects Snapshot
 *
 * Sourced strictly from real verified public repositories of ps06222005-oss.
 * Used when GitHub API is rate-limited (HTTP 403), network is offline,
 * or during SSR initial renders.
 */
export const FALLBACK_PROJECTS: EngineeringProject[] = [
  {
    id: 1250929494,
    name: "JARVIS",
    displayName: "JARVIS — Voice Intelligence Engine",
    overview:
      "A voice-activated autonomous desktop assistant built in Python. Listens to spoken commands, executes system actions, and delivers speech-synthesized responses.",
    category: "AI/ML",
    primaryLanguage: "Python",
    technologies: ["Python", "SpeechRecognition", "pyttsx3", "Wikipedia API"],
    stars: 0,
    forks: 0,
    sizeKb: 60,
    pushedAt: "2026-05-27T05:09:07Z",
    createdAt: "2026-05-27T05:03:22Z",
    githubUrl: "https://github.com/ps06222005-oss/JARVIS",
    demoUrl: null,
    status: "Engineered",
    isPriority: true,
    isFeatured: true,
    score: 85,
    positioning:
      "Autonomous Python desktop assistant with noise-calibrated speech recognition & multi-step OS automation.",
    what: "A voice-activated autonomous desktop assistant built in Python that captures microphone input, executes system utilities, and delivers synthesized voice responses.",
    why: "To eliminate repetitive desktop context-switching and automate operating system workflows, browser queries, and information retrieval through hands-free interaction.",
    how: "Built with a layered Python architecture: audio capture -> SpeechRecognition speech-to-text -> intent router matching -> subsystem workers (web, OS, media, time) -> pyttsx3 speech synthesis pipeline.",
    engineering:
      "Engineered dynamic 1-second energy threshold ambient calibration to avoid false microphone triggers in noisy environments, paired with normalized keyword tokenization and defensive fallback routines.",
    features: [
      "Ambient noise calibration for noisy environments",
      "Speech-to-text command decoding",
      "Automated browser querying & Wikipedia summaries",
      "System audio & application control",
    ],
    architecture:
      "Layered Python architecture: mic-in -> SpeechRecognition -> intent router -> worker modules -> pyttsx3 synthesis.",
    challenges: "Handling background microphone noise without external cloud LLMs.",
    solutions: "Ambient noise calibration + token normalization with graceful keyword matching.",
    learned: "System automation and voice pipeline design in Python.",
    future: ["Wake-word detection", "Offline SLM intent classification"],
    source: "curated-fallback",
  },
  {
    id: 1290022201,
    name: "onlinestream",
    displayName: "OnlineStream — Media Interface",
    overview:
      "Full-stack media streaming web application built with TypeScript, featuring responsive controls and deployed live on Vercel.",
    category: "Web",
    primaryLanguage: "TypeScript",
    technologies: ["TypeScript", "React", "Tailwind CSS", "Vercel"],
    stars: 0,
    forks: 0,
    sizeKb: 207,
    pushedAt: "2026-07-31T19:01:41Z",
    createdAt: "2026-07-31T17:42:27Z",
    githubUrl: "https://github.com/ps06222005-oss/onlinestream",
    demoUrl: "https://onlinestream-three.vercel.app",
    status: "Active",
    isPriority: false,
    isFeatured: true,
    score: 72,
    positioning:
      "Production media streaming web interface with responsive audio/video playback and live Vercel cloud deployment.",
    what: "A full-stack media streaming web application built with TypeScript, React, and Tailwind CSS, deployed live on Vercel's edge network.",
    why: "To engineer a fluid, zero-layout-shift web media interface for continuous media streaming across mobile and desktop devices.",
    how: "Component-driven frontend architecture with unified media state controllers, responsive presentation layers, and edge CDN deployment.",
    engineering:
      "Engineered a type-safe media controller managing playback states, buffering transitions, and responsive video aspect ratios with zero layout shifts.",
    features: [
      "Responsive video streaming interface",
      "Live production deployment on Vercel edge",
      "Dynamic catalog browsing",
    ],
    source: "curated-fallback",
  },
  {
    id: 1250900111,
    name: "Decodelabs-internship",
    displayName: "DecodeLabs — Internship Engineering",
    overview:
      "Internship projects, assignments, and learning tasks completed during the DecodeLabs Internship.",
    category: "Engineering",
    primaryLanguage: "Python",
    technologies: ["Python", "Algorithms", "Git"],
    stars: 0,
    forks: 0,
    sizeKb: 340,
    pushedAt: "2026-06-15T10:00:00Z",
    createdAt: "2026-05-20T08:00:00Z",
    githubUrl: "https://github.com/ps06222005-oss/Decodelabs-internship",
    demoUrl: null,
    status: "Engineered",
    isPriority: false,
    isFeatured: false,
    score: 55,
    positioning:
      "Software engineering deliverables, algorithmic problem sets, and practical assignments from DecodeLabs technical internship.",
    what: "A repository of software engineering solutions, data structures implementations, and algorithmic scripts developed during the DecodeLabs internship.",
    why: "To solve algorithmic challenges, practice production code quality, and follow rigorous version-controlled milestone delivery standards.",
    how: "Python software architecture following object-oriented principles, modular problem-solving scripts, and Git milestone branches.",
    engineering:
      "Optimized time/space algorithmic complexity across core data structures and implemented automated validation scripts for milestone deliverables.",
    features: [
      "Algorithmic problem solutions",
      "Data handling scripts",
      "Internship milestone deliveries",
    ],
    source: "curated-fallback",
  },
  {
    id: 1300160576,
    name: "Prince_Chauhan_Resume",
    displayName: "Prince Chauhan — Portfolio & Resume",
    overview:
      "Personal engineering portfolio and resume repository built with TypeScript, React, and modern UI engineering standards.",
    category: "Web",
    primaryLanguage: "TypeScript",
    technologies: ["TypeScript", "React", "Tailwind CSS", "Three.js"],
    stars: 0,
    forks: 0,
    sizeKb: 1845,
    pushedAt: "2026-09-04T06:32:18Z",
    createdAt: "2026-07-14T07:32:04Z",
    githubUrl: "https://github.com/ps06222005-oss/Prince_Chauhan_Resume",
    demoUrl: null,
    status: "Active",
    isPriority: false,
    isFeatured: false,
    score: 50,
    positioning:
      "High-performance developer ecosystem & interactive portfolio with Three.js shaders and live GitHub API synchronization.",
    what: "The personal developer ecosystem and interactive portfolio featuring GPU-accelerated 3D shaders, live GitHub API caching, and keyboard-driven command palette.",
    why: "To present an authentic, live-synced engineering portfolio that serves as a transparent recruiter platform and showcase of creative-tech craftsmanship.",
    how: "Built with React, TypeScript, Three.js custom shaders, Tailwind CSS, TanStack Router, and client-side session caching with zero hydration mismatch.",
    engineering:
      "Engineered rAF-throttled scroll listeners, UTC-deterministic date formatters to eliminate SSR hydration drift, and an intelligent multi-signal repository ranking heuristic.",
    features: [
      "Interactive 3D Three.js background",
      "Live GitHub ecosystem sync",
      "Apple + Linear dark aesthetics",
    ],
    source: "curated-fallback",
  },
];

// Backwards compatibility for legacy imports
export const PROJECTS = FALLBACK_PROJECTS;
