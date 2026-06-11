import { useEffect, useState } from 'react';

import Footer from '@/components/layout/Footer';
import ActivityHero from '@/components/sections/activity/ActivityHero';
import GitHubPulseCard from '@/components/sections/activity/GitHubPulseCard';
import CurrentlyBuilding from '@/components/sections/activity/CurrentlyBuilding';
import LatestActivity from '@/components/sections/activity/LatestActivity';
import ActiveRepos from '@/components/sections/activity/ActiveRepos';
import CodingStatsPlaceholder from '@/components/sections/activity/CodingStatsPlaceholder';
import {
  fetchAllGitHubData,
  type GitHubActivityData,
} from '@/lib/githubService';

const ActivityPage: React.FC = () => {
  const [data, setData] = useState<GitHubActivityData>({
    user: null,
    repos: [],
    events: [],
    totalStars: 0,
    error: null,
    loading: true,
  });

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    let cancelled = false;

    fetchAllGitHubData().then((result) => {
      if (!cancelled) {
        setData({ ...result, loading: false });
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>


      {/* ── Main Content ── */}
      <div className="relative z-10 min-h-screen bg-[#000]">
        <ActivityHero />
        <GitHubPulseCard
          user={data.user}
          repos={data.repos}
          totalStars={data.totalStars}
          loading={data.loading}
        />
        <CurrentlyBuilding
          repos={data.repos}
          events={data.events}
          loading={data.loading}
        />
        <LatestActivity
          events={data.events}
          loading={data.loading}
        />
        <ActiveRepos
          repos={data.repos}
          loading={data.loading}
        />
        <CodingStatsPlaceholder />

        {/* ── Error Banner ── */}
        {data.error && (
          <div className="relative z-10 px-4 sm:px-6 mb-12">
            <div className="mx-auto max-w-4xl rounded-md border border-[#ee0000] bg-[#000000] p-4 text-center">
              <p className="text-sm text-[#ee0000]">{data.error}</p>
            </div>
          </div>
        )}

        <Footer name="Sutan Arlie Johan" />
      </div>
    </>
  );
};

export default ActivityPage;
