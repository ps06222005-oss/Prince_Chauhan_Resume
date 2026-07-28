import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getProfileTool from "./tools/get-profile";
import getSkillsTool from "./tools/get-skills";
import getProjectsTool from "./tools/get-projects";
import getEducationTool from "./tools/get-education";
import getContactTool from "./tools/get-contact";

// Read the Supabase project ref inlined at build time (survives publish; process.env.SUPABASE_URL
// is rewritten to a .lovable.cloud proxy that mcp-js rejects for issuer verification).
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "prince-portfolio-mcp",
  title: "Prince Chauhan Portfolio",
  version: "0.1.0",
  instructions:
    "Tools for exploring Prince Chauhan's portfolio. Use get_profile, get_skills, get_projects, get_education, and get_contact to answer questions about him.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getProfileTool, getSkillsTool, getProjectsTool, getEducationTool, getContactTool],
});
