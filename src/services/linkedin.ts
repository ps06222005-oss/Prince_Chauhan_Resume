import type { LinkedInProfile } from "@/types/portfolio";
import { PROFILE } from "@/data/profile";

/**
 * LinkedIn Professional Identity Service
 *
 * Provides typed, verified professional identity data sourced strictly from
 * Prince Chauhan's public professional credentials and profile.
 */
export const VERIFIED_LINKEDIN_PROFILE: LinkedInProfile = {
  url: PROFILE.linkedin,
  name: PROFILE.name,
  headline: "Aspiring Software Developer & AI Enthusiast | B.Tech CSE (AI & ML)",
  about:
    "Undergraduate engineer in Computer Science (Artificial Intelligence & Machine Learning) focused on autonomous voice systems, Python development, and modern reactive web architectures. Open to software engineering and AI/ML internships.",
  location: PROFILE.location,
  education:
    "Bachelor of Technology — Computer Science & Engineering (Artificial Intelligence & Machine Learning)",
  experience:
    "Technical project development, Python automation engineering, and open-source contributions across AI and Web systems.",
  certificationsSummary: "Foundational AI/ML & Python coursework, technical workshops",
  skills: [
    "Python",
    "Machine Learning",
    "Speech Processing",
    "React",
    "TypeScript",
    "Automation",
    "Git & GitHub",
    "Data Structures",
  ],
  achievements: [
    "Engineered JARVIS voice intelligence engine in Python",
    "Developed live deployed TypeScript streaming interface (OnlineStream)",
    "Technical internship completion at DecodeLabs",
  ],
  verified: true,
};

export function getLinkedInProfile(): LinkedInProfile {
  return VERIFIED_LINKEDIN_PROFILE;
}
