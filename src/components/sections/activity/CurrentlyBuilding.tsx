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
  if (hours < 24) return { label: 'Active', color: 'bg-white text-black border-transparent' };
  if (hours < 72) return { label: 'Recently Updated', color: 'bg-[#1a1a1a] text-[#888888] border-[#333333]' };
  return { label: 'In Progress', color: 'bg-[#1a1a1a] text-[#888888] border-[#333333]' };
}

const SkeletonCards: React.FC = () => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="rounded-md border border-[#333333] bg-[#0a0a0a] p-6 animate-pulse">
        <div className="h-5 w-3/4 rounded bg-[#1a1a1a] mb-3" />
        <div className="h-3 w-full rounded bg-[#1a1a1a] mb-2" />
        <div className="h-3 w-2/3 rounded bg-[#1a1a1a] mb-6" />
        <div className="h-8 w-24 rounded-full bg-[#1a1a1a]" />
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
            <div className="w-2 h-2 bg-white" />
            <h2 className="font-display text-lg font-semibold text-white">Currently Building</h2>
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
            <div className="w-2 h-2 bg-white" />
            <h2 className="font-display text-lg font-semibold text-white">Currently Building</h2>
          </div>
          <div className="rounded-md border border-[#333333] bg-[#0a0a0a] p-8 text-center">
            <p className="text-[#888888]">No active repositories found</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative z-10 px-4 sm:px-6 mb-12 sm:mb-16">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 bg-white" />
          <h2 className="font-display text-lg font-semibold text-white">
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
                className="group rounded-md border border-[#333333] bg-[#0a0a0a] p-6 transition-colors hover:border-[#666666]"
              >
                {/* Top: Name + Status */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display font-semibold text-white hover:text-[#0070f3] transition-colors inline-flex items-center gap-1.5 text-sm"
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
                  <p className="text-xs text-[#a1a1a1] line-clamp-2 mb-4">
                    {repo.description}
                  </p>
                )}

                {/* Last Commit */}
                {lastCommit && (
                  <div className="flex items-start gap-2 mb-4 rounded-md bg-[#000000] border border-[#333333] p-3">
                    <GitCommit size={13} className="text-[#888888] mt-0.5 shrink-0" />
                    <span className="text-xs text-[#888888] line-clamp-2 font-mono">
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
                      <span className="text-xs text-[#888888] font-mono">{repo.language}</span>
                    </div>
                  )}
                  <span className="text-[11px] text-[#888888] font-mono">
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
