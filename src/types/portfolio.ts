/**
 * Centralized Portfolio Type Definitions
 * Strict TypeScript types for live ecosystem integration.
 */

export type CertificateCategory =
  "AI/ML" | "Programming" | "Cloud & DevOps" | "Computer Science" | "Workshop" | "General";

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  issueDate: string; // ISO or YYYY-MM
  credentialId?: string;
  credentialUrl?: string;
  verificationUrl?: string;
  category?: CertificateCategory;
  technologies?: string[];
  image?: string; // Path to certificate image (e.g. /certificates/ai.png)
  pdf?: string; // Path to certificate PDF (e.g. /certificates/ai.pdf)
  skillsLearned?: string[];
  description?: string;
};

export type GithubUser = {
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  location?: string | null;
  blog?: string | null;
  company?: string | null;
  created_at?: string;
};

export type GithubRawRepo = {
  id: number;
  node_id?: string;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  disabled?: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  default_branch?: string;
};

export type ProjectCategory = "AI/ML" | "Systems" | "Automation" | "Web" | "Engineering";

export type EngineeringProject = {
  id: string | number;
  name: string; // Exact repository name
  displayName: string; // Human-friendly display title
  overview: string; // Verified description
  category: ProjectCategory;
  primaryLanguage: string | null;
  technologies: string[];
  stars: number;
  forks: number;
  sizeKb: number;
  pushedAt: string;
  createdAt: string;
  githubUrl: string;
  demoUrl?: string | null; // ONLY present if real demo exists
  status: "Active" | "Engineered" | "In Development" | "Archived";
  isPriority: boolean; // True for AIOS, JARVIS, NOVA, etc.
  isFeatured: boolean;
  score: number; // Computed ranking score
  // Architectural Case Study enrichment (if available)
  positioning?: string;
  what?: string;
  why?: string;
  how?: string;
  engineering?: string;
  features?: string[];
  architecture?: string;
  challenges?: string;
  solutions?: string;
  learned?: string;
  future?: string[];
  source: "github-live" | "cached-live" | "curated-fallback";
};

export type LinkedInProfile = {
  url: string;
  name: string;
  headline: string;
  about: string;
  location: string;
  education: string;
  experience: string;
  certificationsSummary: string;
  skills: string[];
  achievements: string[];
  verified: boolean;
};

export type SyncState = "idle" | "loading" | "success" | "cached" | "error";
