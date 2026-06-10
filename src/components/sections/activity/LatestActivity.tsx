import { ExternalLink } from 'lucide-react';
import type { GitHubEvent } from '@/lib/githubService';
import { timeAgo, getEventDescription, getEventIcon } from '@/lib/githubService';

interface LatestActivityProps {
  events: GitHubEvent[];
  loading: boolean;
}

const SkeletonTimeline: React.FC = () => (
  <div className="space-y-4">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="flex gap-4 animate-pulse">
        <div className="w-8 h-8 rounded-full bg-white/10 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 rounded bg-white/10" />
          <div className="h-3 w-1/2 rounded bg-white/5" />
        </div>
      </div>
    ))}
  </div>
);

const LatestActivity: React.FC<LatestActivityProps> = ({ events, loading }) => {
  // Deduplicate and limit events
  const displayEvents = events.slice(0, 15);

  return (
    <section className="relative z-10 px-4 sm:px-6 mb-12 sm:mb-16">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <h2 className="font-display text-lg font-semibold text-text-primary">
            Latest Activity
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 sm:p-8">
          {loading ? (
            <SkeletonTimeline />
          ) : displayEvents.length === 0 ? (
            <p className="text-text-muted text-center py-8">
              No recent activity found
            </p>
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[15px] top-4 bottom-4 w-px bg-gradient-to-b from-accent/30 via-white/10 to-transparent" />

              <div className="space-y-1">
                {displayEvents.map((event, index) => {
                  const repoName = event.repo.name.split('/')[1] || event.repo.name;
                  const repoUrl = `https://github.com/${event.repo.name}`;
                  const description = getEventDescription(event);
                  const icon = getEventIcon(event.type);

                  return (
                    <div
                      key={event.id}
                      className="group relative flex gap-4 py-3 pl-1 rounded-lg transition-colors hover:bg-white/[0.02]"
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      {/* Timeline Node */}
                      <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#0d0d1a] text-sm transition-colors group-hover:border-accent/30 group-hover:bg-accent/10">
                        <span role="img" aria-label={event.type}>{icon}</span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 pt-0.5">
                        <p className="text-sm text-text-primary leading-snug">
                          <span className="line-clamp-1">{description}</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <a
                            href={repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-accent/80 hover:text-accent transition-colors inline-flex items-center gap-1"
                          >
                            {repoName}
                            <ExternalLink size={10} />
                          </a>
                          <span className="text-[11px] text-text-muted">
                            {timeAgo(event.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestActivity;
