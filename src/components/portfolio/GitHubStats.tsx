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

/**
 * GitHubStats — Luxury Open Source Archive & Repository Ledger
 *
 * Visual System: BLACK + CHROME + IVORY + ULTRAVIOLET
 * Presents GitHub as an architectural ledger of authentic public codebases:
 * - Live synchronization with GitHub API
 * - Clean language spectrum
 * - Searchable and filterable ledger
 * - Zero amber/orange artifacts; refined monochrome with ultraviolet precision
 */

const LANGUAGE_COLORS: Record<string, string> = {
  Python: "#8b5cf6", // Ultraviolet
  TypeScript: "#38bdf8", // Sky
  JavaScript: "#facc15",
  C: "#94a3b8",
  HTML: "#f97316",
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
    <section
      id="github"
      aria-label="Open Source Archive and Repository Ledger"
      className="relative w-full overflow-hidden bg-[#08090c] py-20 sm:py-32 border-t border-white/[0.08]"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/[0.06] pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="font-mono text-xs text-violet-400 tracking-widest uppercase">
              OPEN SOURCE ARCHIVE
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] text-white">
              Public Repository <br />
              <span className="text-gradient-chrome">Ledger.</span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-white/70 leading-relaxed font-light">
              Direct verification of public source code, algorithmic repositories, and real
              programming balance. Synchronized live with GitHub.
            </p>
          </div>

          {/* Sync status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 font-mono text-xs">
            <button
              type="button"
              onClick={() => syncTelemetry(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.1] bg-[#0e1017] text-white/80 hover:text-white hover:border-violet-400/40 transition-colors cursor-pointer"
            >
              <RefreshCw size={13} className={loading ? "animate-spin text-violet-400" : ""} />
              <span>{loading ? "Syncing..." : "Sync GitHub Ledger"}</span>
            </button>

            <span className="text-[11px] text-violet-300 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
              Verified Authenticity
            </span>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-xs border-b border-white/[0.06] pb-8">
          <div>
            <div className="text-white/40 uppercase text-[10px] tracking-wider">
              Public Repositories
            </div>
            <div className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white">
              {user?.public_repos || projects.length}
            </div>
            <div className="text-white/50 text-[11px] mt-0.5">Active Archives</div>
          </div>

          <div>
            <div className="text-white/40 uppercase text-[10px] tracking-wider">Primary Stack</div>
            <div className="mt-1 font-display text-2xl sm:text-3xl font-bold text-violet-300">
              Python · TS
            </div>
            <div className="text-white/50 text-[11px] mt-0.5">Core Languages</div>
          </div>

          <div>
            <div className="text-white/40 uppercase text-[10px] tracking-wider">Public Handle</div>
            <div className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white truncate">
              ps06222005
            </div>
            <div className="text-white/50 text-[11px] mt-0.5">GitHub Account</div>
          </div>

          <div>
            <div className="text-white/40 uppercase text-[10px] tracking-wider">Archive Status</div>
            <div className="mt-1 font-display text-2xl sm:text-3xl font-bold text-emerald-400">
              Active
            </div>
            <div className="text-white/50 text-[11px] mt-0.5">2024 — Present</div>
          </div>
        </div>

        {/* Language Spectrum Line */}
        <div className="space-y-3">
          <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            {Object.entries(languageFrequency).map(([lang, count]) => {
              const pct = ((count / totalLangCount) * 100).toFixed(1);
              return (
                <div
                  key={lang}
                  style={{
                    width: `${pct}%`,
                    backgroundColor: LANGUAGE_COLORS[lang] || "#71717a",
                  }}
                  title={`${lang}: ${pct}%`}
                />
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-white/60">
            {Object.entries(languageFrequency).map(([lang, count]) => {
              const pct = Math.round((count / totalLangCount) * 100);
              return (
                <span key={lang} className="flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: LANGUAGE_COLORS[lang] || "#71717a" }}
                  />
                  <span>
                    {lang} <strong className="text-white">{pct}%</strong>
                  </span>
                </span>
              );
            })}
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {["All", ...allLanguages].map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setActiveLang(lang)}
                className={`rounded-full px-3.5 py-1 font-mono text-xs transition-all cursor-pointer ${
                  activeLang === lang
                    ? "bg-violet-600 text-white font-medium shadow-[0_0_12px_rgba(139,92,246,0.35)]"
                    : "border border-white/[0.08] text-white/60 hover:text-white hover:border-white/[0.2]"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search repositories..."
              className="w-full rounded-full border border-white/[0.1] bg-[#0e1017] pl-9 pr-4 py-2 font-mono text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-violet-400"
            />
          </div>
        </div>

        {/* Repository Ledger Rows */}
        <div className="divide-y divide-white/[0.06] border-t border-white/[0.06]">
          {visibleRepos.map((repo, idx) => (
            <div
              key={repo.id}
              className="group flex flex-col md:flex-row md:items-baseline justify-between gap-4 py-5 transition-colors hover:bg-white/[0.015]"
            >
              <div className="space-y-1 min-w-0 max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-white/30">0{idx + 1}</span>
                  <a
                    href={repo.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-display text-base sm:text-lg font-semibold text-white hover:text-violet-300 transition-colors flex items-center gap-2 truncate"
                  >
                    <span>{repo.displayName || repo.name}</span>
                    <ExternalLink
                      size={13}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-violet-400"
                    />
                  </a>

                  {repo.primaryLanguage && (
                    <span className="font-mono text-[11px] text-violet-300 px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20">
                      {repo.primaryLanguage}
                    </span>
                  )}
                </div>

                <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                  {repo.overview || repo.what || "Public open-source repository codebase."}
                </p>
              </div>

              <div className="flex items-center gap-4 font-mono text-xs text-white/50 shrink-0">
                {repo.stars > 0 && (
                  <span className="flex items-center gap-1.5 text-violet-300">
                    <Star size={13} /> {repo.stars}
                  </span>
                )}
                {repo.forks > 0 && (
                  <span className="flex items-center gap-1.5 text-white/70">
                    <GitFork size={13} /> {repo.forks}
                  </span>
                )}
                {repo.updatedAt && (
                  <span className="text-[11px] text-white/40 hidden sm:inline">
                    Updated {formatUtcDate(repo.updatedAt)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Expand Ledger Button if > 6 repos */}
        {!searchQuery && filteredRepos.length > 6 && (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-[#0e1017] px-6 py-2.5 font-mono text-xs text-white/80 hover:text-white hover:border-violet-400/40 transition-colors cursor-pointer"
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.06] pt-6 font-mono text-xs text-white/40">
          <span>Verified GitHub: @ps06222005-oss</span>
          <a
            href="https://github.com/ps06222005-oss"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-white hover:text-violet-300 transition-colors font-medium"
          >
            <Github size={14} />
            <span>Open GitHub Profile ↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
