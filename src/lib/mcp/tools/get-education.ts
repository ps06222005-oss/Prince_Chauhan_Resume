import { defineTool } from "@lovable.dev/mcp-js";

const EDUCATION = [
  {
    degree: "B.Tech in Computer Science Engineering (AI & ML)",
    institution: "Sunderdeep Global University",
    expectedGraduation: "2028",
  },
];

export default defineTool({
  name: "get_education",
  title: "Get education",
  description: "Return Prince's education background.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify({ education: EDUCATION }, null, 2) }],
    structuredContent: { education: EDUCATION },
  }),
});
