import { Star, GitFork, ExternalLink } from 'lucide-react';
import type { GitHubRepoDetail } from '@/lib/githubService';
import { timeAgo, LANG_COLORS } from '@/lib/githubService';

interface ActiveReposProps {
  repos: GitHubRepoDetail[];
  loading: boolean;
}

const SkeletonGrid: React.FC = () => (
  <div className="grid gap-4 sm:grid-cols-2">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 animate-pulse">
        <div className="h-5 w-2/3 rounded bg-white/10 mb-3" />
        <div className="h-3 w-full rounded bg-white/5 mb-2" />
        <div className="h-3 w-1/2 rounded bg-white/5 mb-4" />
        <div className="flex gap-4">
          <div className="h-4 w-16 rounded bg-white/5" />
          <div className="h-4 w-12 rounded bg-white/5" />
        </div>
      </div>
    ))}
  </div>
);

const ActiveRepos: React.FC<ActiveReposProps> = ({ repos, loading }) => {
  // Skip the top 3 (shown in Currently Building), show next 6
  const displayRepos = repos.slice(3, 9);

  return (
    <section className="relative z-10 px-4 sm:px-6 mb-12 sm:mb-16">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <h2 className="font-display text-lg font-semibold text-text-primary">
            Active Repositories
          </h2>
        </div>

        {loading ? (
          <SkeletonGrid />
        ) : displayRepos.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 text-center">
            <p className="text-text-muted">No additional repositories to display</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {displayRepos.map((repo) => {
              const langColor = repo.language ? LANG_COLORS[repo.language] ?? '#8b5cf6' : undefined;

              return (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 transition-all duration-300 hover:border-accent/20 hover:bg-accent/5 hover:scale-[1.01] block"
                >
                  {/* Repo Name */}
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-display font-semibold text-sm text-text-primary group-hover:text-accent transition-colors truncate">
                      {repo.name}
                    </h3>
                    <ExternalLink
                      size={12}
                      className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                    />
                  </div>

                  {/* Description */}
                  {repo.description && (
                    <p className="text-xs text-text-secondary line-clamp-2 mb-4">
                      {repo.description}
                    </p>
                  )}

                  {/* Footer */}
                  <div className="flex items-center gap-4 flex-wrap">
                    {repo.language && (
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: langColor }}
                        />
                        <span className="text-xs text-text-muted">{repo.language}</span>
                      </div>
                    )}
                    {repo.stargazers_count > 0 && (
                      <div className="flex items-center gap-1 text-text-muted">
                        <Star size={12} />
                        <span className="text-xs">{repo.stargazers_count}</span>
                      </div>
                    )}
                    {repo.forks_count > 0 && (
                      <div className="flex items-center gap-1 text-text-muted">
                        <GitFork size={12} />
                        <span className="text-xs">{repo.forks_count}</span>
                      </div>
                    )}
                    <span className="text-[11px] text-text-muted ml-auto">
                      {timeAgo(repo.pushed_at)}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ActiveRepos;
