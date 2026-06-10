import { ExternalLink, GitCommit } from 'lucide-react';
import type { GitHubRepoDetail, GitHubEvent } from '@/lib/githubService';
import { timeAgo, LANG_COLORS } from '@/lib/githubService';

interface CurrentlyBuildingProps {
  repos: GitHubRepoDetail[];
  events: GitHubEvent[];
  loading: boolean;
}

function getLastCommitForRepo(repoFullName: string, events: GitHubEvent[]): string | null {
  const pushEvent = events.find(
    (e) => e.type === 'PushEvent' && e.repo.name === repoFullName
  );
  if (pushEvent?.payload.commits && pushEvent.payload.commits.length > 0) {
    return pushEvent.payload.commits[0].message.split('\n')[0];
  }
  return null;
}

function getRepoStatus(pushedAt: string): { label: string; color: string } {
  const hours = (Date.now() - new Date(pushedAt).getTime()) / (1000 * 60 * 60);
  if (hours < 24) return { label: 'Active', color: 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30' };
  if (hours < 72) return { label: 'Recently Updated', color: 'bg-amber-400/20 text-amber-300 border-amber-400/30' };
  return { label: 'In Progress', color: 'bg-sky-400/20 text-sky-300 border-sky-400/30' };
}

const SkeletonCards: React.FC = () => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 animate-pulse">
        <div className="h-5 w-3/4 rounded bg-white/10 mb-3" />
        <div className="h-3 w-full rounded bg-white/5 mb-2" />
        <div className="h-3 w-2/3 rounded bg-white/5 mb-6" />
        <div className="h-8 w-24 rounded-full bg-white/5" />
      </div>
    ))}
  </div>
);

const CurrentlyBuilding: React.FC<CurrentlyBuildingProps> = ({ repos, events, loading }) => {
  if (loading) {
    return (
      <section className="relative z-10 px-4 sm:px-6 mb-12 sm:mb-16">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <h2 className="font-display text-lg font-semibold text-text-primary">Currently Building</h2>
          </div>
          <SkeletonCards />
        </div>
      </section>
    );
  }

  const topRepos = repos.slice(0, 3);

  if (topRepos.length === 0) {
    return (
      <section className="relative z-10 px-4 sm:px-6 mb-12 sm:mb-16">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <h2 className="font-display text-lg font-semibold text-text-primary">Currently Building</h2>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 text-center">
            <p className="text-text-muted">No active repositories found</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative z-10 px-4 sm:px-6 mb-12 sm:mb-16">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <h2 className="font-display text-lg font-semibold text-text-primary">
            Currently Building
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topRepos.map((repo) => {
            const fullName = `${repo.full_name}`;
            const lastCommit = getLastCommitForRepo(fullName, events);
            const status = getRepoStatus(repo.pushed_at);
            const langColor = repo.language ? LANG_COLORS[repo.language] ?? '#8b5cf6' : undefined;

            return (
              <div
                key={repo.id}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 transition-all duration-300 hover:border-accent/20 hover:bg-accent/5 hover:scale-[1.01]"
              >
                {/* Top: Name + Status */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display font-semibold text-text-primary hover:text-accent transition-colors inline-flex items-center gap-1.5 text-sm"
                  >
                    {repo.name}
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-mono tracking-wider ${status.color}`}>
                    {status.label.toUpperCase()}
                  </span>
                </div>

                {/* Description */}
                {repo.description && (
                  <p className="text-xs text-text-secondary line-clamp-2 mb-4">
                    {repo.description}
                  </p>
                )}

                {/* Last Commit */}
                {lastCommit && (
                  <div className="flex items-start gap-2 mb-4 rounded-lg bg-white/[0.03] border border-white/5 p-3">
                    <GitCommit size={13} className="text-accent/60 mt-0.5 shrink-0" />
                    <span className="text-xs text-text-muted line-clamp-2 italic">
                      "{lastCommit}"
                    </span>
                  </div>
                )}

                {/* Footer: Language + Time */}
                <div className="flex items-center justify-between mt-auto pt-2">
                  {repo.language && (
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: langColor }}
                      />
                      <span className="text-xs text-text-muted">{repo.language}</span>
                    </div>
                  )}
                  <span className="text-[11px] text-text-muted">
                    {timeAgo(repo.pushed_at)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CurrentlyBuilding;
