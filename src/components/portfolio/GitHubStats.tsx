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
import { Section } from "./Section";
import { fetchGithubEcosystem, type GithubEcosystemData } from "@/services/github";
import { FALLBACK_PROJECTS } from "@/data/projects";
import { formatUtcDate } from "@/lib/utils";

const LANGUAGE_COLORS: Record<string, string> = {
  Python: "#eab308",
  TypeScript: "#38bdf8",
  JavaScript: "#facc15",
  C: "#94a3b8",
  HTML: "#fb923c",
  CSS: "#c084fc",
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
    try {
      const res = await fetchGithubEcosystem(undefined, force);
      setData(res);
    } catch {
      // Graceful fallback
    } finally {
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
          (repo.primaryLanguage || "")
        )
          .toLowerCase()
          .includes(q);
      const matchLang = activeLang === "All" || repo.primaryLanguage === activeLang;
      return matchQ && matchLang;
    });
  }, [projects, searchQuery, activeLang]);

  const visibleRepos = expanded || searchQuery ? filteredRepos : filteredRepos.slice(0, 6);

  return (
    <Section
      id="github"
      index="04"
      eyebrow="Supporting Evidence"
      title="Open-source commit rhythm & repository ledger."
      subtitle="Understated telemetry verifying continuous development, programming language balance, and public repositories."
      accent="amber"
    >
      {/* Quiet Telemetry Bar */}
      <div className="border-b border-white/[0.08] pb-8 mb-10">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 font-mono">
          <div>
            <div className="text-[11px] text-muted-foreground/70 uppercase">
              PUBLIC REPOSITORIES
            </div>
            <div className="mt-1 font-display text-2xl sm:text-3xl font-bold text-foreground">
              {user?.public_repos || projects.length}
            </div>
            <div className="text-[10px] text-muted-foreground/60 mt-0.5">Active Codebases</div>
          </div>

          <div>
            <div className="text-[11px] text-muted-foreground/70 uppercase">CORE STACK</div>
            <div className="mt-1 font-display text-2xl sm:text-3xl font-bold text-amber-400">
              Python · TS
            </div>
            <div className="text-[10px] text-muted-foreground/60 mt-0.5">Primary Languages</div>
          </div>

          <div>
            <div className="text-[11px] text-muted-foreground/70 uppercase">
              DEVELOPMENT CADENCE
            </div>
            <div className="mt-1 font-display text-2xl sm:text-3xl font-bold text-foreground">
              Continuous
            </div>
            <div className="text-[10px] text-muted-foreground/60 mt-0.5">Active Since 2024</div>
          </div>

          <div>
            <div className="text-[11px] text-muted-foreground/70 uppercase">LIVE SYNC</div>
            <button
              type="button"
              onClick={() => syncTelemetry(true)}
              className="mt-1 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <RefreshCw size={13} className={loading ? "animate-spin text-amber-400" : ""} />
              <span>{loading ? "Syncing..." : "Sync GitHub"}</span>
            </button>
            <div className="text-[10px] text-emerald-400 mt-0.5">Verified API Telemetry</div>
          </div>
        </div>

        {/* Minimal Language Spectrum Line */}
        <div className="mt-8 space-y-2">
          <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            {Object.entries(languageFrequency).map(([lang, count]) => {
              const pct = ((count / totalLangCount) * 100).toFixed(1);
              return (
                <div
                  key={lang}
                  style={{
                    width: `${pct}%`,
                    backgroundColor: LANGUAGE_COLORS[lang] || "#888b94",
                  }}
                  title={`${lang}: ${pct}%`}
                />
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] text-muted-foreground">
            {Object.entries(languageFrequency).map(([lang, count]) => {
              const pct = Math.round((count / totalLangCount) * 100);
              return (
                <span key={lang} className="flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: LANGUAGE_COLORS[lang] || "#888b94" }}
                  />
                  <span>
                    {lang} <strong className="text-foreground/80">{pct}%</strong>
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filter and Ledger Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          {["All", ...allLanguages].map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setActiveLang(lang)}
              className={`rounded-full px-3 py-1 font-mono text-xs transition-all ${
                activeLang === lang
                  ? "bg-foreground text-background font-bold"
                  : "border border-white/[0.08] text-muted-foreground hover:text-foreground"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter repository ledger..."
            className="w-full rounded-full border border-white/[0.1] bg-white/[0.02] pl-8 pr-4 py-1.5 font-mono text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Understated Minimalist Repository Ledger (No Bulky Cards) */}
      <div className="divide-y divide-white/[0.06] border-t border-white/[0.08]">
        {visibleRepos.map((repo) => (
          <div
            key={repo.id}
            className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 py-4 transition-colors hover:bg-white/[0.015]"
          >
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-3">
                <a
                  href={repo.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-display text-base sm:text-lg font-bold text-foreground hover:text-amber-300 transition-colors flex items-center gap-1.5 truncate"
                >
                  <span>{repo.name}</span>
                  <ExternalLink
                    size={12}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </a>

                {repo.primaryLanguage && (
                  <span className="font-mono text-[11px] text-muted-foreground/80">
                    {repo.primaryLanguage}
                  </span>
                )}
              </div>

              <p className="font-sans text-xs sm:text-sm text-muted-foreground truncate max-w-2xl">
                {repo.overview || repo.what || "Public open-source repository."}
              </p>
            </div>

            <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground shrink-0">
              {repo.stars > 0 && (
                <span className="flex items-center gap-1 text-amber-300/80">
                  <Star size={12} /> {repo.stars}
                </span>
              )}
              {repo.forks > 0 && (
                <span className="flex items-center gap-1 text-muted-foreground">
                  <GitFork size={12} /> {repo.forks}
                </span>
              )}
              {repo.updatedAt && (
                <span className="text-[11px] text-muted-foreground/60 hidden md:inline">
                  {formatUtcDate(repo.updatedAt)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Expand Ledger Button if > 6 repos */}
      {!searchQuery && filteredRepos.length > 6 && (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.02] px-4 py-1.5 font-mono text-xs text-muted-foreground hover:text-foreground hover:border-white/[0.2] transition-colors"
          >
            <span>
              {expanded ? "Collapse Ledger" : `Show All ${filteredRepos.length} Repositories`}
            </span>
            {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
        </div>
      )}

      {/* Bottom Link to GitHub Profile */}
      <div className="mt-8 flex items-center justify-between border-t border-white/[0.06] pt-4 font-mono text-xs text-muted-foreground">
        <span>Verified Profile: ps06222005-oss</span>
        <a
          href="https://github.com/ps06222005-oss"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-foreground hover:text-amber-300 transition-colors"
        >
          <Github size={13} />
          <span>View complete GitHub ecosystem</span>
        </a>
      </div>
    </Section>
  );
}
