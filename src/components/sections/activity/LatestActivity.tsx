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
        <div className="w-8 h-8 rounded-full bg-[#1a1a1a] shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 rounded bg-[#1a1a1a]" />
          <div className="h-3 w-1/2 rounded bg-[#1a1a1a]" />
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
          <div className="w-2 h-2 bg-white" />
          <h2 className="font-display text-lg font-semibold text-white">
            Latest Activity
          </h2>
        </div>

        <div className="rounded-md border border-[#333333] bg-[#0a0a0a] p-6 sm:p-8">
          {loading ? (
            <SkeletonTimeline />
          ) : displayEvents.length === 0 ? (
            <p className="text-[#888888] text-center py-8">
              No recent activity found
            </p>
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[15px] top-4 bottom-4 w-px bg-[#333333]" />

              <div className="space-y-1">
                {displayEvents.map((event, index) => {
                  const repoName = event.repo.name.split('/')[1] || event.repo.name;
                  const repoUrl = `https://github.com/${event.repo.name}`;
                  const description = getEventDescription(event);
                  const icon = getEventIcon(event.type);

                  return (
                    <div
                      key={event.id}
                      className="group relative flex gap-4 py-3 pl-1 rounded-md transition-colors hover:bg-[#1a1a1a]"
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      {/* Timeline Node */}
                      <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#333333] bg-[#000000] text-sm transition-colors group-hover:border-[#666666] group-hover:bg-[#1a1a1a]">
                        <span role="img" aria-label={event.type} className="grayscale">{icon}</span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 pt-0.5">
                        <p className="text-sm text-white leading-snug">
                          <span className="line-clamp-1">{description}</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <a
                            href={repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[#888888] hover:text-white transition-colors inline-flex items-center gap-1 font-mono"
                          >
                            {repoName}
                            <ExternalLink size={10} />
                          </a>
                          <span className="text-[11px] text-[#888888] font-mono">
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
