import { defineTool } from "@lovable.dev/mcp-js";

const SKILLS = {
  languages: ["Python (Learning & Project Experience)", "C (Basic)", "HTML", "CSS"],
  libraries: ["SpeechRecognition", "pyttsx3", "Pandas", "Requests"],
  tools: ["VS Code", "Git", "GitHub", "Google Colab", "Jupyter", "ChatGPT"],
  concepts: ["ML/NLP basics", "OOP", "DBMS", "Networks", "DSA"],
};

export default defineTool({
  name: "get_skills",
  title: "Get skills",
  description: "Return Prince's technical skills grouped by category (languages, libraries, tools, concepts).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(SKILLS, null, 2) }],
    structuredContent: SKILLS,
  }),
});
