import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Users, GitFork, Star, ExternalLink } from "lucide-react";
import { Section } from "./Section";
import { PROFILE } from "@/lib/portfolio-data";

type User = { avatar_url: string; followers: number; following: number; public_repos: number; bio?: string; name?: string; html_url: string };
type Repo = { id: number; name: string; description: string | null; html_url: string; stargazers_count: number; forks_count: number; language: string | null; updated_at: string };

export function GitHubStats() {
  const [user, setUser] = useState<User | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [u, r] = await Promise.all([
          fetch(`https://api.github.com/users/${PROFILE.githubUser}`),
          fetch(`https://api.github.com/users/${PROFILE.githubUser}/repos?sort=updated&per_page=6`),
        ]);
        if (!u.ok || !r.ok) throw new Error("gh");
        const uj = (await u.json()) as User;
        const rj = (await r.json()) as Repo[];
        if (!cancelled) { setUser(uj); setRepos(rj); }
      } catch { if (!cancelled) setError(true); }
    })();
    return () => { cancelled = true; };
  }, []);

  const langs = Array.from(new Set(repos.map((r) => r.language).filter(Boolean))) as string[];

  return (
    <Section id="github" eyebrow="GitHub" title="Live from my GitHub" subtitle="Real-time snapshot of my public work.">
      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-6 lg:col-span-1"
        >
          {user ? (
            <>
              <div className="flex items-center gap-4">
                <img src={user.avatar_url} alt={user.name || PROFILE.githubUser} loading="lazy" width={64} height={64}
                  className="h-16 w-16 rounded-full ring-2 ring-accent-blue/40" />
                <div className="min-w-0">
                  <p className="font-semibold truncate">{user.name || PROFILE.githubUser}</p>
                  <p className="text-xs text-muted-foreground">@{PROFILE.githubUser}</p>
                </div>
              </div>
              {user.bio && <p className="mt-4 text-sm text-muted-foreground">{user.bio}</p>}
              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                <Stat icon={Users} label="Followers" value={user.followers} />
                <Stat icon={Github} label="Repos" value={user.public_repos} />
                <Stat icon={GitFork} label="Following" value={user.following} />
              </div>
            </>
          ) : (
            <FallbackProfile error={error} />
          )}
          <a href={PROFILE.github} target="_blank" rel="noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            <Github size={14} /> View Profile
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="glass rounded-2xl p-6 lg:col-span-2"
        >
          <h3 className="font-display text-lg font-semibold">Recent Repositories</h3>
          {repos.length === 0 && !error && <p className="mt-4 text-sm text-muted-foreground">Loading…</p>}
          {error && repos.length === 0 && (
            <p className="mt-4 text-sm text-muted-foreground">
              Couldn't reach GitHub right now — visit my profile directly.
            </p>
          )}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {repos.slice(0, 6).map((r) => (
              <a key={r.id} href={r.html_url} target="_blank" rel="noreferrer"
                className="group rounded-xl border border-black/[0.06] bg-black/[0.02] p-4 hover:border-accent-blue/40 hover:bg-black/[0.04] transition-colors">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold">{r.name}</p>
                  <ExternalLink size={12} className="opacity-40 group-hover:opacity-100" />
                </div>
                {r.description && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{r.description}</p>}
                <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                  {r.language && <span className="text-accent-cyan">{r.language}</span>}
                  <span className="inline-flex items-center gap-1"><Star size={11} />{r.stargazers_count}</span>
                  <span className="inline-flex items-center gap-1"><GitFork size={11} />{r.forks_count}</span>
                </div>
              </a>
            ))}
          </div>
          {langs.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Top Languages:</span>
              {langs.map((l) => <span key={l} className="rounded-full border border-black/[0.08] bg-black/[0.03] px-2.5 py-0.5 text-xs">{l}</span>)}
            </div>
          )}
        </motion.div>
      </div>
    </Section>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ComponentType<{ size?: number }>; label: string; value: number }) {
  return (
    <div className="rounded-lg border border-black/[0.06] bg-black/[0.02] p-2.5">
      <Icon size={12} />
      <p className="mt-1 text-lg font-bold text-gradient">{value}</p>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}

function FallbackProfile({ error }: { error: boolean }) {
  return (
    <div className="text-sm text-muted-foreground">
      <p className="font-semibold text-foreground">{PROFILE.name}</p>
      <p className="text-xs">@{PROFILE.githubUser}</p>
      <p className="mt-3">{error ? "Live GitHub stats unavailable." : "Loading…"}</p>
    </div>
  );
}
