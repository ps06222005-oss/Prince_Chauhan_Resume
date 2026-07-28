import { defineTool } from "@lovable.dev/mcp-js";
import { PROFILE, STATS } from "@/lib/portfolio-data";

export default defineTool({
  name: "get_profile",
  title: "Get profile",
  description:
    "Get Prince Chauhan's public portfolio profile: name, role, headline, location, contact links, and stats.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify({ profile: PROFILE, stats: STATS }, null, 2) }],
    structuredContent: { profile: PROFILE, stats: STATS },
  }),
});
