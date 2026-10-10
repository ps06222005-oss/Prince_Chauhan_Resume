import {
  KNOWLEDGE_CORPUS,
  retrieveContext,
  generateAssistantResponse,
} from "../src/services/ai-assistant.ts";

const testQueries = [
  "How does JARVIS work?",
  "What libraries did Prince use in JARVIS?",
  "What are your AI/ML skills?",
  "Are you available for an internship?",
  "How can I contact Prince?",
  "Who are you?",
  "Can you bake a chocolate cake?",
  "Who is the president of France?",
];

console.log("=== COMPREHENSIVE RAG ASSISTANT VERIFICATION ===\n");

for (const q of testQueries) {
  console.log(`[QUERY]: "${q}"`);
  const response = await generateAssistantResponse(q);
  console.log(`[ENGINE]: ${response.engine}`);
  console.log(`[SOURCES CITATION]:`, response.sources);
  console.log(`[RESPONSE TEXT]:\n${response.text}`);
  console.log(
    `[ACTIONS]:`,
    response.actions?.map((a) => a.label),
  );
  console.log("-".repeat(60) + "\n");
}
