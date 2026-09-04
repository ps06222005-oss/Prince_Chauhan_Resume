import { PROJECTS, type Project } from "@/data/projects";
import { PROFILE } from "@/data/profile";

export type GithubUser = {
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  bio?: string;
  name?: string;
  html_url: string;
};

export type GithubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage?: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  fork?: boolean;
  archived?: boolean;
};

export type GithubSnapshot = { user: GithubUser; repos: GithubRepo[] };

const CACHE_KEY = `github-snapshot:${PROFILE.githubUser}:v2`;
const CACHE_TTL = 1000 * 60 * 15;

function rankRepo(repo: GithubRepo) {
  const text = `${repo.name} ${repo.description ?? ""} ${repo.language ?? ""}`.toLowerCase();
  const relevant = ["ai", "ml", "genai", "agent", "python", "react", "javascript", "automation", "web"]
    .reduce((score, keyword) => score + (text.includes(keyword) ? 3 : 0), 0);
  const completeness = (repo.description ? 2 : 0) + (repo.language ? 1 : 0) + (repo.homepage ? 1 : 0);
  const recency = Math.max(0, 2 - (Date.now() - Date.parse(repo.updated_at)) / (1000 * 60 * 60 * 24 * 365));
  return repo.stargazers_count * 8 + repo.forks_count * 3 + relevant + completeness + recency;
}

export function rankGithubRepos(repos: GithubRepo[]) {
  return [...repos]
    .filter((repo) => !repo.fork && !repo.archived)
    .sort((a, b) => rankRepo(b) - rankRepo(a));
}

export function toProjectFallbacks() {
  return PROJECTS;
}

export async function fetchGithubSnapshot(signal?: AbortSignal): Promise<GithubSnapshot> {
  if (typeof window !== "undefined") {
    try {
      const cached = window.sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as { timestamp: number; value: GithubSnapshot };
        if (Date.now() - parsed.timestamp < CACHE_TTL) return parsed.value;
      }
    } catch {
      // Storage is optional; continue with the network request.
    }
  }

  const [userResponse, reposResponse] = await Promise.all([
    fetch(`https://api.github.com/users/${PROFILE.githubUser}`, { signal, headers: { Accept: "application/vnd.github+json" } }),
    fetch(`https://api.github.com/users/${PROFILE.githubUser}/repos?sort=updated&per_page=100`, { signal, headers: { Accept: "application/vnd.github+json" } }),
  ]);
  if (!userResponse.ok || !reposResponse.ok) throw new Error("GitHub is temporarily unavailable");
  const value = {
    user: (await userResponse.json()) as GithubUser,
    repos: rankGithubRepos((await reposResponse.json()) as GithubRepo[]),
  };
  if (typeof window !== "undefined") {
    try { window.sessionStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), value })); } catch { /* optional */ }
  }
  return value;
}