import { defineTool } from "@lovable.dev/mcp-js";
import { PROFILE } from "@/lib/portfolio-data";

export default defineTool({
  name: "get_contact",
  title: "Get contact info",
  description: "Return Prince's public contact channels (email, phone, GitHub, LinkedIn, resume).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const contact = {
      email: PROFILE.email,
      phone: PROFILE.phone,
      github: PROFILE.github,
      linkedin: PROFILE.linkedin,
      resume: PROFILE.resume,
      openToInternship: true,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(contact, null, 2) }],
      structuredContent: contact,
    };
  },
});
