// Compatibility entry point for existing imports. New profile data lives in src/data.
export { PROFILE, STATS, LINKEDIN_PROFILE } from "@/data/profile";
export { SITE_CONFIG, getCanonicalUrl, getOgImageUrl } from "@/data/site";
export { PROJECTS, type Project } from "@/data/projects";
export { SKILL_GROUPS, ALL_SKILLS, type Skill } from "@/data/skills";
export { EDUCATION, EXPERIENCE, LEARNING_PHASES } from "@/data/experience";
export { CERTIFICATES, type Certificate } from "@/data/certificates";
export { VERIFIED_LINKEDIN_PROFILE, getLinkedInProfile } from "@/services/linkedin";
