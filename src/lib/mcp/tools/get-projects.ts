import { defineTool } from "@lovable.dev/mcp-js";
import { FALLBACK_PROJECTS } from "@/data/projects";

const PROJECTS = FALLBACK_PROJECTS.map((p) => ({
  name: p.displayName,
  repoName: p.name,
  description: p.overview,
  tech: p.technologies,
  repo: p.githubUrl,
  demo: p.demoUrl,
  category: p.category,
}));

export default defineTool({
  name: "get_projects",
  title: "Get projects",
  description:
    "List Prince's public portfolio projects with descriptions, tech stack, and repo links.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify({ projects: PROJECTS }, null, 2) }],
    structuredContent: { projects: PROJECTS },
  }),
});
