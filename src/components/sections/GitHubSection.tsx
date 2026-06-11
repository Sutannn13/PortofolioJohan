import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GitHubCalendar } from 'react-github-calendar';
import { Star, GitFork, Users, BookOpen } from 'lucide-react';
import SplitText from '@/components/reactbits/SplitText';
import CardSwap, { Card } from '@/components/reactbits/CardSwap';
import GitHubSnakeGame from './activity/GitHubSnakeGame';

gsap.registerPlugin(ScrollTrigger);

const GITHUB_USERNAME = 'Sutannn13';

// ── GitHub API types ──────────────────────────────────────────────────────────
type GitHubUser = {
  public_repos: number;
  followers: number;
  following: number;
  name: string;
};

type GitHubRepo = {
  name: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
};

// ── Language color map ────────────────────────────────────────────────────────
const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  PHP: '#777bb4',
  HTML: '#e34f26',
  CSS: '#264de4',
  Python: '#3776ab',
  Java: '#b07219',
  'C#': '#178600',
  Go: '#00add8',
  Rust: '#dea584',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Kotlin: '#7f52ff',
  Swift: '#fa7343',
  Dart: '#00b4ab',
  Shell: '#89e051',
};

// ── Custom hook: fetch GitHub data ────────────────────────────────────────────
function useGitHubData(username: string) {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch(`https://api.github.com/users/${username}`).then((r) => r.json()),
      fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&type=owner`
      ).then((r) => r.json()),
    ])
      .then(([userData, reposData]: [GitHubUser, GitHubRepo[]]) => {
        if (cancelled) return;
        setUser(userData);
        setRepos(Array.isArray(reposData) ? reposData : []);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [username]);

  return { user, repos, loading };
}

// ── Theme for GitHub Calendar ─────────────────────────────────────────────────
const calendarTheme = {
  dark: ['#0d0d1a', '#2d1b69', '#5b21b6', '#7c3aed', '#a78bfa'],
  light: ['#0d0d1a', '#2d1b69', '#5b21b6', '#7c3aed', '#a78bfa'],
};

// ── Stats Card Content ────────────────────────────────────────────────────────
const StatsCardContent: React.FC<{ user: GitHubUser | null; repos: GitHubRepo[]; loading: boolean }> = ({
  user,
  repos,
  loading,
}) => {
  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);

  const items = [
    { icon: <BookOpen size={16} />, label: 'Repositories', value: user?.public_repos ?? 0 },
    { icon: <Star size={16} />, label: 'Total Stars', value: totalStars },
    { icon: <GitFork size={16} />, label: 'Total Forks', value: totalForks },
    { icon: <Users size={16} />, label: 'Followers', value: user?.followers ?? 0 },
  ];

  return (
    <>
      <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-4 text-left w-full block">GitHub Stats</p>
      {loading ? (
        <div className="space-y-3 w-full">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-8 rounded-lg bg-white/5 animate-pulse w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 w-full">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col gap-1 items-start">
              <div className="flex items-center gap-1.5 text-text-muted">
                <span className="text-accent/70">{item.icon}</span>
                <span className="text-[11px]">{item.label}</span>
              </div>
              <span className="text-text-primary font-display font-bold text-2xl">{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

// ── Top Languages Card Content ────────────────────────────────────────────────
const TopLangsCardContent: React.FC<{ repos: GitHubRepo[]; loading: boolean }> = ({ repos, loading }) => {
  const ownRepos = repos.filter((r) => !r.fork && r.language);
  const langCount: Record<string, number> = {};
  for (const repo of ownRepos) {
    if (repo.language) langCount[repo.language] = (langCount[repo.language] || 0) + 1;
  }

  const total = Object.values(langCount).reduce((s, n) => s + n, 0) || 1;
  const sorted = Object.entries(langCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  return (
    <>
      <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-4 text-left w-full block">Top Languages</p>
      {loading ? (
        <div className="space-y-3 w-full">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-6 rounded-lg bg-white/5 animate-pulse w-full" />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <p className="text-text-muted text-sm w-full block text-left">No public repos found</p>
      ) : (
        <div className="space-y-4 w-full block text-left mt-2">
          {/* Color bar */}
          <div className="flex rounded-full overflow-hidden h-2.5 gap-0.5 w-full">
            {sorted.map(([lang, count]) => (
              <div
                key={lang}
                style={{
                  width: `${(count / total) * 100}%`,
                  backgroundColor: LANG_COLORS[lang] ?? '#8b5cf6',
                }}
                className="h-full rounded-full"
              />
            ))}
          </div>
          {/* Language list */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-2 w-full text-left">
            {sorted.map(([lang, count]) => (
              <div key={lang} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: LANG_COLORS[lang] ?? '#8b5cf6' }}
                />
                <span className="text-text-secondary text-sm truncate">{lang}</span>
                <span className="text-text-muted text-sm ml-auto">
                  {Math.round((count / total) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

// ── Main Section ──────────────────────────────────────────────────────────────
const GitHubSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const snakeRef = useRef<HTMLDivElement>(null);
  const { user, repos, loading } = useGitHubData(GITHUB_USERNAME);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        calendarRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: calendarRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        snakeRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: snakeRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="github"
      ref={sectionRef}
      className="relative z-10 py-12 sm:py-section px-4 sm:px-6"
    >
      <div className="mx-auto max-w-6xl">

        {/* ── Section Header ── */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-14">
          <span className="section-label mb-3 sm:mb-4 block">Open Source</span>
          <SplitText
            text="GitHub Contributions"
            className="font-display text-3xl font-bold text-text-primary sm:text-4xl md:text-5xl"
            tag="h2"
            delay={30}
            duration={0.8}
            splitType="words"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
          />
          <p className="mt-4 text-text-secondary text-sm sm:text-base max-w-lg mx-auto">
            Activity from{' '}
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-light transition-colors underline underline-offset-2"
            >
              @{GITHUB_USERNAME}
            </a>{' '}
            over the past year
          </p>
        </div>

        {/* ── Stats Cards (CardSwap) ── */}
        <div
          ref={statsRef}
          className="opacity-0 mb-10 xl:mb-14 flex justify-center w-full px-2 sm:px-0"
        >
          <div className="w-full max-w-[280px] sm:max-w-sm md:max-w-md" style={{ height: '320px', position: 'relative' }}>
            <CardSwap
              cardDistance={40}
              verticalDistance={30}
              delay={5000}
              pauseOnHover={false}
              width="100%"
              height={260}
              containerClassName="absolute inset-0 perspective-[900px] origin-center scale-[0.9] sm:scale-100"
            >
              {/* Card 1: GitHub Stats (real API) */}
              <Card customClass="p-6 sm:p-8 flex flex-col justify-center bg-[#0d0d1a] border-white/10 shadow-[0_0_30px_rgba(139,92,246,0.15)]">
                <StatsCardContent user={user} repos={repos} loading={loading} />
              </Card>

              {/* Card 2: Streak (image) */}
              <Card customClass="p-4 sm:p-6 overflow-hidden flex items-center justify-center bg-[#0d0d1a] border-white/10 shadow-[0_0_30px_rgba(139,92,246,0.15)]">
                <img
                  src={`https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&theme=tokyonight&background=0d0d1a&border=8b5cf6&stroke=8b5cf6&ring=a78bfa&fire=a78bfa&currStreakNum=f0f0f5&sideNums=f0f0f5&currStreakLabel=8b5cf6&sideLabels=8b5cf6&dates=9898a6`}
                  alt="GitHub Streak"
                  loading="lazy"
                  className="w-full h-auto object-contain rounded-lg"
                  style={{ minHeight: '120px' }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.parentElement) {
                      const p = document.createElement('p');
                      p.className = 'text-text-muted text-sm';
                      p.textContent = 'Streak stats unavailable';
                      e.currentTarget.parentElement.appendChild(p);
                    }
                  }}
                />
              </Card>

              {/* Card 3: Top Languages (real API) */}
              <Card customClass="p-6 sm:p-8 flex flex-col justify-center bg-[#0d0d1a] border-white/10 shadow-[0_0_30px_rgba(139,92,246,0.15)]">
                <TopLangsCardContent repos={repos} loading={loading} />
              </Card>
            </CardSwap>
          </div>
        </div>

        {/* ── Contribution Calendar ── */}
        <div
          ref={calendarRef}
          className="opacity-0 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 sm:p-8 mb-10 sm:mb-14"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <h3 className="font-display text-lg font-semibold text-text-primary">
              Contribution Activity
            </h3>
          </div>
          <div className="overflow-x-auto pb-2 -mx-1 px-1">
            <div className="min-w-[680px] sm:min-w-0">
              <GitHubCalendar
                username={GITHUB_USERNAME}
                colorScheme="dark"
                theme={calendarTheme}
                blockSize={14}
                blockMargin={4}
                fontSize={12}
                showTotalCount
                showColorLegend
                style={{
                  width: '100%',
                  color: '#9898a6',
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              />
            </div>
          </div>
        </div>

        {/* ── Snake Animation ── */}
        <div
          ref={snakeRef}
          className="opacity-0 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 sm:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xl" role="img" aria-label="snake">🐍</span>
            <h3 className="font-display text-lg font-semibold text-text-primary">
              My Contribution Graph
            </h3>
          </div>
          <div className="overflow-hidden rounded-xl bg-[#0d0d1a] border border-white/5 p-4 sm:p-6">
             <GitHubSnakeGame />
          </div>
        </div>

      </div>
    </section>
  );
};

export default GitHubSection;
