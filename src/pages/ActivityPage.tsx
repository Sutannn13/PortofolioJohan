import { useEffect, useState } from 'react';
import DotField from '@/components/backgrounds/DotField';
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
      {/* ── DotField Background (fixed, full-screen) ── */}
      <div
        className="fixed inset-0 z-0"
        aria-hidden="true"
        style={{ pointerEvents: 'none' }}
      >
        <DotField
          dotRadius={1.5}
          dotSpacing={14}
          bulgeStrength={67}
          glowRadius={160}
          sparkle={false}
          waveAmplitude={0}
          cursorRadius={500}
          cursorForce={0.1}
          bulgeOnly
          gradientFrom="#380f5f"
          gradientTo="#B497CF"
          glowColor="#251f1f"
          style={{ pointerEvents: 'auto' }}
        />
      </div>

      {/* ── Dark Overlay Gradient ── */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(180deg, rgba(6,0,16,0.85) 0%, rgba(6,0,16,0.7) 30%, rgba(6,0,16,0.75) 70%, rgba(6,0,16,0.9) 100%)',
        }}
      />

      {/* ── Main Content ── */}
      <div className="relative z-10 min-h-screen">
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
            <div className="mx-auto max-w-4xl rounded-2xl border border-amber-500/20 bg-amber-500/10 backdrop-blur-xl p-4 text-center">
              <p className="text-sm text-amber-300">{data.error}</p>
            </div>
          </div>
        )}

        <Footer name="Sutan Arlie Johan" />
      </div>
    </>
  );
};

export default ActivityPage;
