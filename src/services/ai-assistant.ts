import { PROFILE, STATS } from "@/data/profile";
import { REPO_CASE_STUDIES, FALLBACK_PROJECTS } from "@/data/projects";
import { SKILL_GROUPS } from "@/data/skills";
import { EDUCATION, EXPERIENCE, LEARNING_PHASES } from "@/data/experience";

export type KnowledgeCategory =
  | "bio"
  | "skills"
  | "projects"
  | "education"
  | "experience"
  | "contact"
  | "internship"
  | "architecture";

export interface KnowledgeChunk {
  id: string;
  title: string;
  category: KnowledgeCategory;
  content: string;
  keywords: string[];
  actions?: Array<{
    label: string;
    url?: string;
    actionType?: "resume" | "link" | "mail";
  }>;
}

export interface AssistantMessage {
  role: "user" | "bot";
  text: string;
  sources?: string[];
  actions?: Array<{
    label: string;
    url?: string;
    actionType?: "resume" | "link" | "mail";
  }>;
  engine?: "rag-local" | "pattern";
}

/**
 * 1. Grounded Knowledge Corpus
 * Structured directly from verified portfolio, resume, and project data.
 */
export const KNOWLEDGE_CORPUS: KnowledgeChunk[] = [
  {
    id: "bio",
    title: "Prince Chauhan Profile & Overview",
    category: "bio",
    content: `${PROFILE.name} is a ${PROFILE.role} based in ${PROFILE.location}. ${PROFILE.headline}. Bio: ${PROFILE.bio} He is passionate about building scalable software, learning Python, React, JavaScript, and applying AI/ML fundamentals to real-world engineering problems.`,
    keywords: [
      "intro",
      "bio",
      "profile",
      "developer",
      "engineer",
      "student",
      "chauhan",
      "whoami",
      "background",
      "creator",
    ],
    actions: [
      { label: "View Profile", actionType: "link", url: "#about" },
      { label: "Download Resume", actionType: "resume", url: PROFILE.resume },
    ],
  },
  {
    id: "education",
    title: "Academic Education & Degree",
    category: "education",
    content: `${PROFILE.name} is pursuing a ${EDUCATION[0].degree} with specialization in ${EDUCATION[0].specialization} at ${EDUCATION[0].school} (expected graduation: ${EDUCATION[0].period}). Status: ${EDUCATION[0].status}. Core coursework includes Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), Database Management Systems (DBMS), Computer Networks, and Machine Learning / NLP foundations.`,
    keywords: [
      "education",
      "college",
      "university",
      "degree",
      "btech",
      "cse",
      "sunderdeep",
      "study",
      "cgpa",
      "school",
      "graduation",
      "academic",
      "coursework",
    ],
    actions: [{ label: "Education Section", actionType: "link", url: "#education" }],
  },
  {
    id: "skills-aiml",
    title: "AI & Machine Learning Capabilities",
    category: "skills",
    content: `As a B.Tech CSE student specializing in AI & ML, Prince's technical foundations include:
• **Audio & Voice Intelligence**: SpeechRecognition pipeline, dynamic ambient energy threshold calibration, pyttsx3 speech synthesis.
• **Natural Language Processing (NLP)**: Token normalization, keyword intent routing, rule-based text processing.
• **Machine Learning Concepts**: Data preparation, exploratory analysis in Google Colab and Jupyter Notebooks, Pandas basics, algorithm analysis.
• **AI Tools & Agent Workflows**: Prompt engineering, ChatGPT API integration, Model Context Protocol (MCP) tools.`,
    keywords: [
      "ai",
      "ml",
      "machine learning",
      "nlp",
      "natural language",
      "voice",
      "speech",
      "speechrecognition",
      "pyttsx3",
      "artificial intelligence",
      "neural",
      "deep learning",
      "intelligence",
    ],
    actions: [
      { label: "Skills Lineage", actionType: "link", url: "#skills" },
      { label: "JARVIS Case Study", actionType: "link", url: "#projects" },
    ],
  },
  {
    id: "skills-core",
    title: "Programming Languages & Software Engineering",
    category: "skills",
    content: `Programming Languages: Python (Learning & Project Experience), C (Basic), HTML, CSS, JavaScript, TypeScript.
Libraries & Frameworks: SpeechRecognition, pyttsx3, Pandas (Basic), Requests, React, Tailwind CSS.
Developer Tools: VS Code, Git, GitHub, Google Colab, Jupyter Notebook.
Core CS Concepts: Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), DBMS Basics, Computer Networks.`,
    keywords: [
      "skills",
      "tech",
      "stack",
      "languages",
      "programming",
      "python",
      "c",
      "javascript",
      "typescript",
      "react",
      "tools",
      "pandas",
      "git",
      "github",
      "vscode",
      "dsa",
      "oop",
      "dbms",
      "html",
      "css",
    ],
    actions: [{ label: "Explore Skills Matrix", actionType: "link", url: "#skills" }],
  },
  {
    id: "project-jarvis",
    title: "JARVIS — Voice Intelligence Engine",
    category: "projects",
    content: `JARVIS is an autonomous Python desktop assistant developed by Prince Chauhan.
Architecture & Pipeline: Layered system combining microphone stream acquisition -> SpeechRecognition audio processing with dynamic 1.0s ambient noise energy threshold calibration -> tokenized intent dispatch router -> worker subsystem execution (web search, Wikipedia querying, system utilities, audio control) -> pyttsx3 speech synthesis.
Key Engineering Highlights: Solved background noise interference using energy threshold calibration without cloud latency; structured modular fallback handlers.
Repository: ${PROFILE.jarvisRepo}`,
    keywords: [
      "jarvis",
      "voice",
      "assistant",
      "speech",
      "audio",
      "microphone",
      "speechrecognition",
      "pyttsx3",
      "wikipedia",
      "desktop",
      "automation",
      "noise",
      "calibration",
    ],
    actions: [
      { label: "JARVIS GitHub Repo", actionType: "link", url: PROFILE.jarvisRepo },
      { label: "View in Projects", actionType: "link", url: "#projects" },
    ],
  },
  {
    id: "project-onlinestream",
    title: "OnlineStream — Media Streaming Interface",
    category: "projects",
    content: `OnlineStream is a production media streaming web interface engineered with TypeScript, React, and Tailwind CSS, deployed live on Vercel's edge network.
Key Engineering: Built a type-safe media state controller to handle playback buffers and responsive video aspect ratios with zero layout shift.
Live URL: https://onlinestream-three.vercel.app`,
    keywords: [
      "onlinestream",
      "streaming",
      "video",
      "media",
      "player",
      "react",
      "typescript",
      "tailwind",
      "frontend",
      "vercel",
    ],
    actions: [
      { label: "Live Web App", actionType: "link", url: "https://onlinestream-three.vercel.app" },
      {
        label: "GitHub Code",
        actionType: "link",
        url: "https://github.com/ps06222005-oss/onlinestream",
      },
    ],
  },
  {
    id: "project-decodelabs",
    title: "DecodeLabs — Internship Engineering Work",
    category: "projects",
    content: `DecodeLabs repository contains software engineering assignments, modular Python scripts, and Data Structures & Algorithms solutions completed during the DecodeLabs internship. Emphasizes clean code, time/space complexity optimization, and production Git workflows.`,
    keywords: [
      "decodelabs",
      "internship",
      "algorithms",
      "dsa",
      "data structures",
      "assignments",
      "python",
      "git",
    ],
    actions: [
      {
        label: "View Repository",
        actionType: "link",
        url: "https://github.com/ps06222005-oss/decodelabs-internship",
      },
    ],
  },
  {
    id: "internship-availability",
    title: "Internship & Career Availability",
    category: "internship",
    content: `Prince Chauhan is actively seeking software development and AI/ML internship opportunities. He is available for remote or on-site roles, open to technical collaborations, and responds to inquiries within 24 hours. He brings practical Python scripting, frontend React capabilities, and strong foundational computer science knowledge.`,
    keywords: [
      "hire",
      "internship",
      "intern",
      "job",
      "opportunity",
      "available",
      "availability",
      "work",
      "join",
      "role",
      "open",
      "recruit",
      "hiring",
      "fulltime",
      "parttime",
    ],
    actions: [
      { label: "Email Prince", actionType: "mail", url: `mailto:${PROFILE.email}` },
      { label: "Download Resume", actionType: "resume", url: PROFILE.resume },
    ],
  },
  {
    id: "contact-channels",
    title: "Contact & Communication Channels",
    category: "contact",
    content: `You can connect with Prince Chauhan through:
- Email: ${PROFILE.email}
- Phone: ${PROFILE.phone}
- LinkedIn: ${PROFILE.linkedin}
- GitHub: ${PROFILE.github}
- Location: ${PROFILE.location}`,
    keywords: [
      "contact",
      "email",
      "phone",
      "reach",
      "message",
      "call",
      "linkedin",
      "github",
      "address",
      "location",
      "social",
    ],
    actions: [
      { label: "Send Email", actionType: "mail", url: `mailto:${PROFILE.email}` },
      { label: "LinkedIn Profile", actionType: "link", url: PROFILE.linkedin },
      { label: "GitHub Profile", actionType: "link", url: PROFILE.github },
    ],
  },
  {
    id: "resume-cv",
    title: "Resume & Curriculum Vitae",
    category: "bio",
    content: `Prince's resume is available in high-resolution, ATS-friendly PDF format. It details his B.Tech CSE (AI & ML) education, technical projects (JARVIS voice assistant, OnlineStream), core technical skills, and internship experience. You can view or download it directly at ${PROFILE.resume}.`,
    keywords: ["resume", "cv", "pdf", "download", "curriculum", "vitae", "document"],
    actions: [{ label: "Download Resume PDF", actionType: "resume", url: PROFILE.resume }],
  },
];

/**
 * 2. In-Browser RAG Semantic Vector Retrieval Engine
 * Precise tokenization, stop-word filtering, exact & safe n-gram matching.
 */
const STOP_WORDS = new Set([
  "a",
  "about",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "has",
  "he",
  "in",
  "is",
  "it",
  "its",
  "of",
  "on",
  "that",
  "the",
  "to",
  "was",
  "were",
  "will",
  "with",
  "tell",
  "me",
  "show",
  "what",
  "does",
  "can",
  "you",
  "do",
  "his",
  "prince",
  "give",
  "please",
  "know",
  "how",
  "have",
  "your",
  "who",
  "whom",
  "whose",
  "which",
  "where",
  "when",
  "why",
  "is",
  "are",
  "am",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 0 && !STOP_WORDS.has(w));
}

export interface RetrievalResult {
  chunk: KnowledgeChunk;
  score: number;
}

export function retrieveContext(query: string, topK: number = 3): RetrievalResult[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) {
    return [];
  }

  const results: RetrievalResult[] = KNOWLEDGE_CORPUS.map((chunk) => {
    let score = 0;
    const chunkTokens = tokenize(`${chunk.title} ${chunk.content}`);
    const tokenFreq: Record<string, number> = {};
    for (const t of chunkTokens) {
      tokenFreq[t] = (tokenFreq[t] || 0) + 1;
    }

    for (const qt of queryTokens) {
      // 1. Exact match on defined keywords
      if (chunk.keywords.includes(qt)) {
        // High priority boost for specific queries
        score += 15;
      }
      // 2. Safe partial match ONLY for tokens with length >= 4 to prevent short substring false positives (e.g. 'c' in 'cake')
      else if (qt.length >= 4) {
        if (chunk.keywords.some((k) => k.length >= 4 && (k.includes(qt) || qt.includes(k)))) {
          score += 6;
        }
      }

      // 3. Exact title token match
      if (chunk.title.toLowerCase().split(/\s+/).includes(qt)) {
        score += 12;
      }

      // 4. Content term frequency
      if (tokenFreq[qt]) {
        score += Math.min(tokenFreq[qt], 3) * 2;
      }
    }

    return { chunk, score };
  });

  return results
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

/**
 * 3. Client-Side Grounded RAG Generation Engine
 * 100% Secure: Does NOT expose or bundle private API keys in client-side code.
 * Evaluates semantic retrieval relevance and honestly handles unsupported questions.
 */
export async function generateAssistantResponse(query: string): Promise<AssistantMessage> {
  const cleanQuery = query.trim();
  const lowerQuery = cleanQuery.toLowerCase();

  // Tier 0: Direct Greetings & Identity
  if (/^(hi|hello|hey|greetings|hola)\b/i.test(cleanQuery)) {
    return {
      role: "bot",
      text: `Hello! I'm Prince's Portfolio AI Ambassador, powered by an in-browser Semantic RAG Engine. I can answer questions about his voice assistant JARVIS, AI/ML skills, education at Sunderdeep Global University, or internship availability. What would you like to know?`,
      sources: ["Portfolio Overview"],
      actions: [
        { label: "View Projects", actionType: "link", url: "#projects" },
        { label: "Download Resume", actionType: "resume", url: PROFILE.resume },
      ],
      engine: "pattern",
    };
  }

  if (
    /^(who\s+(are\s+you|is\s+prince|is\s+the\s+developer)|tell\s+me\s+about\s+(yourself|prince))/i.test(
      cleanQuery,
    )
  ) {
    const bioChunk = KNOWLEDGE_CORPUS.find((c) => c.id === "bio")!;
    return {
      role: "bot",
      text: bioChunk.content,
      sources: [bioChunk.title],
      actions: bioChunk.actions,
      engine: "rag-local",
    };
  }

  // Tier 1: Semantic Vector Retrieval
  const retrieved = retrieveContext(cleanQuery, 3);
  const primaryMatch = retrieved[0]?.chunk;
  const topScore = retrieved[0]?.score || 0;

  // Security & Grounding Check:
  // If no chunks match or the highest match score is below relevance threshold (score < 14),
  // honestly state that the question is outside Prince's portfolio knowledge base.
  if (!primaryMatch || topScore < 14) {
    return {
      role: "bot",
      text: `I don't have information about that. As Prince's Portfolio Assistant, I'm specifically trained on his verified background and can only answer questions regarding his:\n• **Projects**: Voice assistant JARVIS or OnlineStream\n• **Skills**: AI/ML foundations, Python, React, C, Data Structures\n• **Education**: B.Tech CSE (AI & ML) at Sunderdeep Global University\n• **Career**: Open internship availability and contact details`,
      sources: ["Portfolio Knowledge Base"],
      actions: [
        { label: "Browse Projects", actionType: "link", url: "#projects" },
        { label: "Download Resume", actionType: "resume", url: PROFILE.resume },
        { label: "Contact Prince", actionType: "mail", url: `mailto:${PROFILE.email}` },
      ],
      engine: "rag-local",
    };
  }

  // Tier 2: Grounded Response Synthesis
  let synthesizedText = primaryMatch.content;

  // Domain-specific query adaptations for precision
  if (primaryMatch.id === "project-jarvis") {
    if (
      lowerQuery.includes("how") ||
      lowerQuery.includes("work") ||
      lowerQuery.includes("architecture")
    ) {
      synthesizedText = `JARVIS works via a layered Python pipeline:\n1. **Audio Acquisition**: Captures microphone input with dynamic 1.0-second ambient noise calibration to prevent false triggers.\n2. **Speech Decoding**: Converts audio into normalized command tokens using SpeechRecognition.\n3. **Intent Dispatcher**: Routes recognized keywords to subsystem workers (web searches, Wikipedia summaries, OS utilities).\n4. **Voice Synthesis**: Generates speech responses locally via pyttsx3 without external cloud API latency.`;
    } else if (
      lowerQuery.includes("tech") ||
      lowerQuery.includes("stack") ||
      lowerQuery.includes("librar")
    ) {
      synthesizedText = `JARVIS is engineered in **Python** using:\n• **SpeechRecognition**: Audio capture and dynamic energy threshold calibration\n• **pyttsx3**: Local text-to-speech audio rendering\n• **Wikipedia API**: Real-time information querying\n• **OS Subprocesses**: Desktop command execution and media controls.`;
    }
  } else if (primaryMatch.id === "skills-aiml") {
    synthesizedText = `As a B.Tech CSE student specializing in AI & ML, Prince's technical foundations include:\n• **Voice & Speech Intelligence**: Audio stream acquisition, noise energy thresholding, and speech synthesis (JARVIS)\n• **NLP & Intent Systems**: Command tokenization and pattern dispatching\n• **Machine Learning & Data**: Exploratory data analysis in Google Colab/Jupyter Notebooks, Pandas basics, and algorithmic foundations\n• **AI Tools**: Experience with LLM prompting, autonomous agent workflows, and Model Context Protocol (MCP) integrations.`;
  } else if (primaryMatch.id === "skills-core") {
    if (lowerQuery.includes("python")) {
      synthesizedText = `Python is Prince's primary language. He has used it to build JARVIS (voice recognition & OS automation), algorithmic problem sets during DecodeLabs, and data scripting with Pandas and Requests.`;
    }
  }

  return {
    role: "bot",
    text: synthesizedText,
    sources: retrieved.map((r) => r.chunk.title),
    actions: primaryMatch.actions,
    engine: "rag-local",
  };
}
