import { defineTool } from "@lovable.dev/mcp-js";
import { PROFILE } from "@/lib/portfolio-data";

const PROJECTS = [
  {
    name: "JARVIS",
    description: "Python voice assistant with speech recognition and text-to-speech.",
    tech: ["Python", "SpeechRecognition", "pyttsx3"],
    repo: PROFILE.jarvisRepo,
  },
  {
    name: "AI Automation Scripts",
    description: "Small Python utilities exploring automation and AI/ML basics.",
    tech: ["Python", "Pandas", "Requests"],
    repo: PROFILE.github,
  },
];

export default defineTool({
  name: "get_projects",
  title: "Get projects",
  description: "List Prince's public portfolio projects with descriptions, tech stack, and repo links.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify({ projects: PROJECTS }, null, 2) }],
    structuredContent: { projects: PROJECTS },
  }),
});
