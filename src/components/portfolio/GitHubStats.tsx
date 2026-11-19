import { useEffect, useState, useMemo, useCallback } from "react";
import {
  Github,
  Star,
  GitFork,
  ExternalLink,
  Search,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { fetchGithubEcosystem, type GithubEcosystemData } from "@/services/github";
import { FALLBACK_PROJECTS } from "@/data/projects";
import { formatUtcDate } from "@/lib/utils";
import { ScrollReveal, StaggerRevealGroup, StaggerRevealItem } from "./ScrollReveal";

/**
 * GitHubStats — Arctic Minimal Open Source Archive & Repository Ledger
 *
 * Supports Light and Dark Liquid Glass design systems.
 * - Live synchronization with GitHub API
 * - Clean language spectrum
 * - Searchable and filterable ledger
 */

const LANGUAGE_COLORS: Record<string, string> = {
  Python: "#2563EB",
  TypeScript: "#0EA5E9",
  JavaScript: "#60A5FA",
  C: "#818CF8",
  HTML: "#38BDF8",
  CSS: "#06B6D4",
};

export function GitHubStats() {
  const [data, setData] = useState<GithubEcosystemData>({
    user: null,
    projects: FALLBACK_PROJECTS,
    allLanguages: ["Python", "TypeScript", "C", "HTML", "CSS"],
    allCategories: ["AI/ML", "Web", "Systems"],
    totalStars: 0,
    totalForks: 0,
    syncState: "idle",
    lastSyncedAt: null,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLang, setActiveLang] = useState<string>("All");
  const [expanded, setExpanded] = useState(false);

  const syncTelemetry = useCallback(async (force = false) => {
    setLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    try {
      const res = await fetchGithubEcosystem(controller.signal, force);
      setData(res);
    } catch {
      setData((prev) => ({
        ...prev,
        syncState: "cached",
        errorMessage: "Live GitHub synchronization timed out. Showing verified local snapshot.",
      }));
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    syncTelemetry(false);
  }, [syncTelemetry]);

  const { projects, allLanguages, user } = data;

  const languageFrequency = useMemo(() => {
    return projects.reduce<Record<string, number>>((acc, p) => {
      if (p.primaryLanguage) {
        acc[p.primaryLanguage] = (acc[p.primaryLanguage] || 0) + 1;
      }
      return acc;
    }, {});
  }, [projects]);

  const totalLangCount = useMemo(() => {
    return Object.values(languageFrequency).reduce((a, b) => a + b, 0) || 1;
  }, [languageFrequency]);

  const filteredRepos = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return projects.filter((repo) => {
      const matchQ =
        !q ||
        (
          repo.displayName +
          " " +
          repo.name +
          " " +
          (repo.overview || "") +
          " " +
          repo.technologies.join(" ")
        )
          .toLowerCase()
          .includes(q);

      const matchLang = activeLang === "All" || repo.primaryLanguage === activeLang;

      return matchQ && matchLang;
    });
  }, [projects, searchQuery, activeLang]);

  const visibleRepos = expanded ? filteredRepos : filteredRepos.slice(0, 6);

  return (
    <section
      id="github"
      aria-label="Open Source Archive and GitHub Ledger"
      className="relative w-full overflow-hidden bg-background text-foreground py-20 sm:py-28 lg:py-36 border-t border-border"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <ScrollReveal
          direction="up"
          distance={24}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8"
        >
          <div className="space-y-3 max-w-3xl">
            <div className="space-y-1">
              <div className="font-mono text-xs text-primary tracking-widest uppercase">
                OPEN SOURCE CODEBASES &amp; REPOSITORY ARCHIVE
              </div>
              <p className="font-sans text-xs text-muted-foreground">
                Public Repositories, Version Control Provenance &amp; GitHub Synchronization
              </p>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-[-0.035em] text-foreground">
              Public Repositories. <br />
              <span className="text-gradient-chrome">Verified Provenance.</span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
              Every commit and release represents genuine learning and software craft. Filter by
              primary language or inspect live commit history directly on GitHub.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              type="button"
              onClick={() => syncTelemetry(true)}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-full border border-border bg-card text-foreground hover:border-primary transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none shadow-sm"
            >
              <RefreshCw size={13} className={loading ? "animate-spin text-accent" : ""} />
              <span>{loading ? "Syncing..." : "Sync GitHub Ledger"}</span>
            </button>

            <span className="text-[11px] text-accent flex items-center gap-1.5 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              {data.syncState === "cached" || data.syncState === "error"
                ? "Verified Snapshot"
                : "Verified Authenticity"}
            </span>
          </div>
        </ScrollReveal>

        {/* Metric Cards */}
        <StaggerRevealGroup
          staggerChildren={0.09}
          delayChildren={0.05}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-xs border-b border-border pb-8"
        >
          <StaggerRevealItem>
            <div className="text-muted-foreground uppercase text-[10px] tracking-wider">
              Public Repositories
            </div>
            <div className="mt-1 font-display text-2xl sm:text-3xl font-bold text-foreground tabular-nums">
              {user?.public_repos || projects.length}
            </div>
            <div className="text-muted-foreground/80 text-[11px] mt-0.5">Active Archives</div>
          </StaggerRevealItem>

          <StaggerRevealItem>
            <div className="text-muted-foreground uppercase text-[10px] tracking-wider">
              Primary Stack
            </div>
            <div className="mt-1 font-display text-2xl sm:text-3xl font-bold text-primary">
              Python · TS
            </div>
            <div className="text-muted-foreground/80 text-[11px] mt-0.5">Core Languages</div>
          </StaggerRevealItem>

          <StaggerRevealItem>
            <div className="text-muted-foreground uppercase text-[10px] tracking-wider">
              Public Handle
            </div>
            <div className="mt-1 font-display text-2xl sm:text-3xl font-bold text-foreground truncate">
              ps06222005-oss
            </div>
            <div className="text-muted-foreground/80 text-[11px] mt-0.5">GitHub Account</div>
          </StaggerRevealItem>

          <StaggerRevealItem>
            <div className="text-muted-foreground uppercase text-[10px] tracking-wider">
              Archive Status
            </div>
            <div className="mt-1 font-display text-2xl sm:text-3xl font-bold text-accent">
              Active
            </div>
            <div className="text-muted-foreground/80 text-[11px] mt-0.5">2024 — Present</div>
          </StaggerRevealItem>
        </StaggerRevealGroup>

        {/* Language Spectrum Line */}
        <ScrollReveal direction="up" distance={20} delay={0.08} className="space-y-3">
          <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            {Object.entries(languageFrequency).map(([lang, count]) => {
              const pct = ((count / totalLangCount) * 100).toFixed(1);
              return (
                <div
                  key={lang}
                  style={{
                    width: `${pct}%`,
                    backgroundColor: LANGUAGE_COLORS[lang] || "#2563EB",
                  }}
                  title={`${lang}: ${pct}%`}
                />
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-muted-foreground">
            {Object.entries(languageFrequency).map(([lang, count]) => {
              const pct = Math.round((count / totalLangCount) * 100);
              return (
                <span key={lang} className="flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: LANGUAGE_COLORS[lang] || "#2563EB" }}
                  />
                  <span>
                    {lang} <strong className="text-foreground tabular-nums">{pct}%</strong>
                  </span>
                </span>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Filters and Search Bar */}
        <ScrollReveal
          direction="up"
          distance={18}
          delay={0.12}
          className="flex flex-wrap items-center justify-between gap-4 pt-2"
        >
          <div className="flex flex-wrap items-center gap-1.5">
            {["All", ...allLanguages].map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setActiveLang(lang)}
                className={`rounded-full px-3.5 py-1 font-mono text-xs transition-all cursor-pointer ${
                  activeLang === lang
                    ? "bg-primary text-primary-foreground font-bold shadow-sm"
                    : "border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 bg-card"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search repositories..."
              className="w-full rounded-full border border-border bg-card pl-9 pr-4 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary shadow-xs"
            />
          </div>
        </ScrollReveal>

        {/* Repository Ledger Rows */}
        <StaggerRevealGroup
          staggerChildren={0.07}
          delayChildren={0.06}
          className="divide-y divide-border border-t border-border"
        >
          {visibleRepos.map((repo, idx) => (
            <StaggerRevealItem
              key={repo.id}
              className="group flex flex-col md:flex-row md:items-baseline justify-between gap-4 py-5 transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
            >
              <div className="space-y-1 min-w-0 max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-muted-foreground">0{idx + 1}</span>
                  <a
                    href={repo.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-display text-base sm:text-lg font-semibold text-foreground hover:text-primary transition-colors flex items-center gap-2 truncate"
                  >
                    <span>{repo.displayName || repo.name}</span>
                    <ExternalLink
                      size={13}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-primary"
                    />
                  </a>

                  {repo.primaryLanguage && (
                    <span className="font-mono text-[11px] text-accent px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/30">
                      {repo.primaryLanguage}
                    </span>
                  )}
                </div>

                <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
                  {repo.overview || repo.what || "Public open-source repository codebase."}
                </p>
              </div>

              <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground shrink-0">
                {repo.stars > 0 && (
                  <span className="flex items-center gap-1.5 text-primary">
                    <Star size={13} /> {repo.stars}
                  </span>
                )}
                {repo.forks > 0 && (
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <GitFork size={13} /> {repo.forks}
                  </span>
                )}
                {repo.pushedAt && (
                  <span className="text-[11px] text-muted-foreground/80 hidden sm:inline">
                    Updated {formatUtcDate(repo.pushedAt)}
                  </span>
                )}
              </div>
            </StaggerRevealItem>
          ))}
        </StaggerRevealGroup>

        {/* Expand Ledger Button if > 6 repos */}
        {!searchQuery && filteredRepos.length > 6 && (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-2.5 font-mono text-xs text-foreground hover:border-primary transition-colors cursor-pointer shadow-sm"
            >
              <span>
                {expanded
                  ? "Collapse Archive Ledger"
                  : `View Full Archive (${filteredRepos.length} Repositories)`}
              </span>
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
        )}

        {/* Bottom Link */}
        <ScrollReveal
          direction="up"
          distance={16}
          delay={0.1}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-6 font-mono text-xs text-muted-foreground"
        >
          <span>Verified GitHub: @ps06222005-oss</span>
          <a
            href="https://github.com/ps06222005-oss"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
          >
            <Github size={14} />
            <span>Open GitHub Profile ↗</span>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
