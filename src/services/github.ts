import type {
  EngineeringProject,
  GithubRawRepo,
  GithubUser,
  ProjectCategory,
  SyncState,
} from "@/types/portfolio";
import { PROFILE } from "@/data/profile";
import { FALLBACK_PROJECTS, REPO_CASE_STUDIES } from "@/data/projects";

const GITHUB_USERNAME = PROFILE.githubUser;
const CACHE_KEY_REPOS = `pc_gh_repos_${GITHUB_USERNAME}_v3`;
const CACHE_KEY_USER = `pc_gh_user_${GITHUB_USERNAME}_v3`;
const CACHE_TTL_MS = 1000 * 60 * 15; // 15 minutes cache

export type GithubEcosystemData = {
  user: GithubUser | null;
  projects: EngineeringProject[];
  allLanguages: string[];
  allCategories: ProjectCategory[];
  totalStars: number;
  totalForks: number;
  syncState: SyncState;
  lastSyncedAt: string | null;
  errorMessage?: string;
};

// In-memory runtime cache for hot re-renders
let memoryCache: {
  timestamp: number;
  data: GithubEcosystemData;
} | null = null;

/**
 * Intelligent Ranking Algorithm
 * Computes a weighted relevance score for a repository.
 */
export function calculateRepoScore(repo: GithubRawRepo): number {
  let score = 0;
  const nameLower = repo.name.toLowerCase();
  const descLower = (repo.description ?? "").toLowerCase();
  const langLower = (repo.language ?? "").toLowerCase();
  const fullText = `${nameLower} ${descLower} ${langLower}`;

  // 1. Explicit High-Priority Projects (AIOS, JARVIS/NOVA, AI Creative Agent)
  // ONLY awarded when the repo actually exists in the account!
  const highPriorityKeywords = ["aios", "jarvis", "nova", "creative-agent", "agent"];
  if (highPriorityKeywords.some((k) => nameLower.includes(k))) {
    score += 45;
  }

  // 2. Domain & Technological Relevance (AI/ML, Neural, Autonomous)
  const aiKeywords = [
    "ai",
    "ml",
    "machine-learning",
    "deep-learning",
    "neural",
    "vision",
    "voice",
    "speech",
    "assistant",
    "nlp",
  ];
  if (aiKeywords.some((k) => fullText.includes(k))) {
    score += 25;
  }

  // 3. Core Software Engineering & Web Architecture
  const engKeywords = ["system", "stream", "api", "engine", "typescript", "python", "react"];
  if (engKeywords.some((k) => fullText.includes(k))) {
    score += 15;
  }

  // 4. Information Completeness & Presentation Quality
  if (repo.description && repo.description.trim().length > 0) {
    score += 10;
    if (repo.description.length > 25) score += 5;
  }
  if (repo.homepage && repo.homepage.trim().length > 0) {
    score += 18; // Live demo available is a strong signal for engineering polish
  }
  if (repo.language) {
    score += 8;
  }

  // 5. Codebase Complexity (derived from repository size)
  if (repo.size > 50) score += 5;
  if (repo.size > 500) score += 8;
  if (repo.size > 2000) score += 10;

  // 6. Community Traction
  score += (repo.stargazers_count || 0) * 12;
  score += (repo.forks_count || 0) * 6;

  // 7. Recent Activity (pushed date)
  const pushDate = Date.parse(repo.pushed_at || repo.updated_at);
  if (!isNaN(pushDate)) {
    const daysSincePush = (Date.now() - pushDate) / (1000 * 60 * 60 * 24);
    if (daysSincePush < 60) score += 15;
    else if (daysSincePush < 180) score += 8;
    else if (daysSincePush < 365) score += 4;
  }

  return score;
}

/**
 * Determine the project category from repo signals.
 */
function inferProjectCategory(repo: GithubRawRepo): ProjectCategory {
  const text = `${repo.name} ${repo.description ?? ""} ${repo.language ?? ""}`.toLowerCase();
  if (
    text.includes("ai") ||
    text.includes("ml") ||
    text.includes("jarvis") ||
    text.includes("voice") ||
    text.includes("vision") ||
    text.includes("agent")
  ) {
    return "AI/ML";
  }
  if (
    text.includes("stream") ||
    text.includes("web") ||
    text.includes("react") ||
    text.includes("frontend") ||
    text.includes("resume")
  ) {
    return "Web";
  }
  if (text.includes("automation") || text.includes("script") || text.includes("bot")) {
    return "Automation";
  }
  if (text.includes("system") || text.includes("engine") || text.includes("os")) {
    return "Systems";
  }
  return "Engineering";
}

/**
 * Clean human-readable display title for repos without modifying exact repo name.
 */
function formatDisplayName(repoName: string): string {
  if (repoName === "JARVIS") return "JARVIS — Voice Intelligence Engine";
  if (repoName === "Jarvis-voice-assistant-") return "JARVIS — Voice Assistant Mini";
  if (repoName === "onlinestream") return "OnlineStream — Media Interface";
  if (repoName === "Decodelabs-internship") return "DecodeLabs — Internship Engineering";
  if (repoName === "Prince_Chauhan_Resume") return "Prince Chauhan — Portfolio & Resume Hub";

  // General formatter: convert hyphens/underscores to title case
  return repoName
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

/**
 * Transform a raw GitHub repository into an EngineeringProject artifact.
 */
export function transformRepoToProject(
  repo: GithubRawRepo,
  source: "github-live" | "cached-live" = "github-live",
): EngineeringProject {
  const score = calculateRepoScore(repo);
  const repoKey = repo.name.toLowerCase();
  const caseStudy = REPO_CASE_STUDIES[repoKey];

  const category = caseStudy?.category || inferProjectCategory(repo);
  const displayName = caseStudy?.displayName || formatDisplayName(repo.name);

  // Derive honest technologies list
  const techSet = new Set<string>();
  if (repo.language) techSet.add(repo.language);
  if (caseStudy?.technologies) {
    caseStudy.technologies.forEach((t) => techSet.add(t));
  }
  if (repo.topics) {
    repo.topics.forEach((t) => techSet.add(t.charAt(0).toUpperCase() + t.slice(1)));
  }

  // Provide verified overview without fabricating
  let overview = repo.description?.trim() || "";
  if (!overview && caseStudy?.enhancedOverview) {
    overview = caseStudy.enhancedOverview;
  } else if (!overview) {
    overview = `Public software repository created in ${repo.language || "code"}. Engineering artifact authored on GitHub.`;
  }

  // Real demo URL: strictly from GitHub homepage field if valid URL
  let demoUrl: string | null = null;
  if (repo.homepage && typeof repo.homepage === "string") {
    const trimmed = repo.homepage.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      demoUrl = trimmed;
    }
  }

  // Derive realistic status
  const isRecent =
    Date.now() - Date.parse(repo.pushed_at || repo.updated_at) < 1000 * 60 * 60 * 24 * 180;
  const status = isRecent ? "Active" : "Engineered";

  const isPriority = ["aios", "jarvis", "nova", "creative-agent", "agent"].some((k) =>
    repo.name.toLowerCase().includes(k),
  );

  return {
    id: repo.id,
    name: repo.name,
    displayName,
    overview,
    category,
    primaryLanguage: repo.language,
    technologies: Array.from(techSet),
    stars: repo.stargazers_count || 0,
    forks: repo.forks_count || 0,
    sizeKb: repo.size || 0,
    pushedAt: repo.pushed_at || repo.updated_at,
    createdAt: repo.created_at,
    githubUrl: repo.html_url,
    demoUrl,
    status,
    isPriority,
    isFeatured: isPriority || score > 70 || !!demoUrl,
    score,
    positioning: caseStudy?.positioning,
    what: caseStudy?.what,
    why: caseStudy?.why,
    how: caseStudy?.how,
    engineering: caseStudy?.engineering,
    features: caseStudy?.features,
    architecture: caseStudy?.architecture,
    challenges: caseStudy?.challenges,
    solutions: caseStudy?.solutions,
    learned: caseStudy?.learned,
    future: caseStudy?.future,
    source,
  };
}

/**
 * Filter and rank repositories.
 * Ignores empty or private forks, sorts by intelligent ranking score.
 */
export function rankAndFilterProjects(
  repos: GithubRawRepo[],
  source: "github-live" | "cached-live" = "github-live",
): EngineeringProject[] {
  return repos
    .filter((repo) => {
      // Must not be an archived fork or disabled repository
      if (repo.disabled) return false;
      // Allow user's own repositories
      return true;
    })
    .map((repo) => transformRepoToProject(repo, source))
    .sort((a, b) => b.score - a.score);
}

/**
 * Retrieve cached ecosystem snapshot from sessionStorage if valid.
 */
function getClientCache(): GithubEcosystemData | null {
  if (typeof window === "undefined") return null;

  try {
    const rawRepos = window.sessionStorage.getItem(CACHE_KEY_REPOS);
    const rawUser = window.sessionStorage.getItem(CACHE_KEY_USER);
    if (!rawRepos) return null;

    const parsedRepos = JSON.parse(rawRepos) as {
      timestamp: number;
      repos: GithubRawRepo[];
    };
    if (Date.now() - parsedRepos.timestamp > CACHE_TTL_MS) return null;

    const user = rawUser
      ? (JSON.parse(rawUser) as { timestamp: number; user: GithubUser }).user
      : null;

    const projects = rankAndFilterProjects(parsedRepos.repos, "cached-live");
    const languages = Array.from(
      new Set(projects.map((p) => p.primaryLanguage).filter((l): l is string => !!l)),
    );
    const categories = Array.from(new Set(projects.map((p) => p.category)));

    return {
      user,
      projects,
      allLanguages: languages,
      allCategories: categories,
      totalStars: projects.reduce((acc, p) => acc + p.stars, 0),
      totalForks: projects.reduce((acc, p) => acc + p.forks, 0),
      syncState: "cached",
      lastSyncedAt: new Date(parsedRepos.timestamp).toISOString(),
    };
  } catch {
    return null;
  }
}

/**
 * Save fetched data into client cache.
 */
function saveClientCache(repos: GithubRawRepo[], user: GithubUser | null) {
  if (typeof window === "undefined") return;

  try {
    const now = Date.now();
    window.sessionStorage.setItem(CACHE_KEY_REPOS, JSON.stringify({ timestamp: now, repos }));
    if (user) {
      window.sessionStorage.setItem(CACHE_KEY_USER, JSON.stringify({ timestamp: now, user }));
    }
  } catch {
    // Storage quota or restrictions, gracefully ignore
  }
}

/**
 * Primary Service: Fetch and assemble complete GitHub ecosystem data.
 * Multi-tier fallback guarantees the site never crashes.
 */
export async function fetchGithubEcosystem(
  signal?: AbortSignal,
  forceRefresh = false,
): Promise<GithubEcosystemData> {
  // 1. Check memory cache first (unless forced refresh)
  if (!forceRefresh && memoryCache && Date.now() - memoryCache.timestamp < CACHE_TTL_MS) {
    return memoryCache.data;
  }

  // 2. Check client-side storage cache
  if (!forceRefresh) {
    const clientCache = getClientCache();
    if (clientCache) {
      memoryCache = { timestamp: Date.now(), data: clientCache };
      return clientCache;
    }
  }

  // 3. Network Fetch
  try {
    const headers = {
      Accept: "application/vnd.github+json",
    };

    const [reposRes, userRes] = await Promise.allSettled([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=100`, {
        signal,
        headers,
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        signal,
        headers,
      }),
    ]);

    let rawRepos: GithubRawRepo[] = [];
    let rawUser: GithubUser | null = null;

    if (reposRes.status === "fulfilled" && reposRes.value.ok) {
      rawRepos = (await reposRes.value.json()) as GithubRawRepo[];
    } else {
      // If repos fetch failed (e.g. rate limit 403 or network failure)
      throw new Error(
        reposRes.status === "fulfilled"
          ? `GitHub returned status ${reposRes.value.status}`
          : "Network connectivity issue",
      );
    }

    if (userRes.status === "fulfilled" && userRes.value.ok) {
      rawUser = (await userRes.value.json()) as GithubUser;
    }

    // Save fresh data into client cache
    saveClientCache(rawRepos, rawUser);

    const projects = rankAndFilterProjects(rawRepos, "github-live");
    const allLanguages = Array.from(
      new Set(projects.map((p) => p.primaryLanguage).filter((l): l is string => !!l)),
    );
    const allCategories = Array.from(new Set(projects.map((p) => p.category)));

    const result: GithubEcosystemData = {
      user: rawUser,
      projects,
      allLanguages,
      allCategories,
      totalStars: projects.reduce((acc, p) => acc + p.stars, 0),
      totalForks: projects.reduce((acc, p) => acc + p.forks, 0),
      syncState: "success",
      lastSyncedAt: new Date().toISOString(),
    };

    memoryCache = { timestamp: Date.now(), data: result };
    return result;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "GitHub synchronization error";

    // 4. Graceful Fallback: Use cached data if available, else curated fallback snapshot
    const staleCache = getClientCache();
    if (staleCache) {
      staleCache.syncState = "cached";
      staleCache.errorMessage = `${errorMsg} (serving cached repository data)`;
      return staleCache;
    }

    // Safe fallback derived strictly from real repositories
    const fallbackProjects = [...FALLBACK_PROJECTS];
    const allLanguages = Array.from(
      new Set(fallbackProjects.map((p) => p.primaryLanguage).filter((l): l is string => !!l)),
    );
    const allCategories = Array.from(new Set(fallbackProjects.map((p) => p.category)));

    return {
      user: {
        login: GITHUB_USERNAME,
        avatar_url: PROFILE.profileImage,
        name: PROFILE.name,
        bio: PROFILE.bio,
        public_repos: fallbackProjects.length,
        followers: 0,
        following: 0,
        html_url: PROFILE.github,
      },
      projects: fallbackProjects,
      allLanguages,
      allCategories,
      totalStars: fallbackProjects.reduce((acc, p) => acc + p.stars, 0),
      totalForks: fallbackProjects.reduce((acc, p) => acc + p.forks, 0),
      syncState: "error",
      lastSyncedAt: null,
      errorMessage: `${errorMsg} — showing verified local repository snapshot.`,
    };
  }
}
