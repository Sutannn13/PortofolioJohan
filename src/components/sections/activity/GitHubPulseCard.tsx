import { BookOpen, Users, Star, GitFork, Clock, ExternalLink } from 'lucide-react';
import type { GitHubUserProfile, GitHubRepoDetail } from '@/lib/githubService';
import { timeAgo, GITHUB_USERNAME } from '@/lib/githubService';

interface GitHubPulseCardProps {
  user: GitHubUserProfile | null;
  repos: GitHubRepoDetail[];
  totalStars: number;
  loading: boolean;
}

const SkeletonCard: React.FC = () => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 sm:p-8 animate-pulse">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-16 h-16 rounded-full bg-white/10" />
      <div className="space-y-2 flex-1">
        <div className="h-5 w-32 rounded bg-white/10" />
        <div className="h-3 w-24 rounded bg-white/5" />
      </div>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-16 rounded-xl bg-white/5" />
      ))}
    </div>
  </div>
);

const GitHubPulseCard: React.FC<GitHubPulseCardProps> = ({ user, repos, totalStars, loading }) => {
  if (loading) return <SkeletonCard />;
  if (!user) return null;

  const latestRepo = repos[0];
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);

  const stats = [
    { icon: <BookOpen size={16} />, label: 'Repositories', value: user.public_repos },
    { icon: <Star size={16} />, label: 'Total Stars', value: totalStars },
    { icon: <GitFork size={16} />, label: 'Total Forks', value: totalForks },
    { icon: <Users size={16} />, label: 'Followers', value: user.followers },
  ];

  return (
    <section className="relative z-10 px-4 sm:px-6 mb-12 sm:mb-16">
      <div className="mx-auto max-w-4xl">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <h2 className="font-display text-lg font-semibold text-text-primary">
            GitHub Pulse
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 sm:p-8">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full border-2 border-accent/30 ring-4 ring-accent/10"
            />
            <div className="flex-1">
              <h3 className="text-xl font-display font-bold text-text-primary">
                {user.name || user.login}
              </h3>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-muted hover:text-accent transition-colors inline-flex items-center gap-1"
              >
                @{user.login}
                <ExternalLink size={12} />
              </a>
              {user.bio && (
                <p className="mt-1 text-sm text-text-secondary max-w-md">{user.bio}</p>
              )}
            </div>

            {/* Last Activity */}
            {latestRepo && (
              <div className="sm:text-right">
                <span className="text-xs text-text-muted flex items-center gap-1 sm:justify-end">
                  <Clock size={11} />
                  Last active
                </span>
                <span className="text-sm text-text-secondary font-medium">
                  {timeAgo(latestRepo.pushed_at)}
                </span>
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/5 bg-white/[0.03] p-4 transition-all duration-300 hover:border-accent/20 hover:bg-accent/5"
              >
                <div className="flex items-center gap-1.5 text-text-muted mb-1">
                  <span className="text-accent/70">{stat.icon}</span>
                  <span className="text-[11px]">{stat.label}</span>
                </div>
                <span className="text-2xl font-display font-bold text-text-primary">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* Latest Active Repo */}
          {latestRepo && (
            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-text-muted block mb-1">Latest Active Repository</span>
                  <a
                    href={latestRepo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent font-medium hover:text-accent-light transition-colors inline-flex items-center gap-1.5"
                  >
                    {latestRepo.name}
                    <ExternalLink size={13} />
                  </a>
                </div>
                {latestRepo.language && (
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-text-secondary">
                    {latestRepo.language}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GitHubPulseCard;
