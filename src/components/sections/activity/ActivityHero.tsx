import { Link } from 'react-router-dom';
import { ArrowLeft, Github, Zap } from 'lucide-react';
import { GITHUB_USERNAME } from '@/lib/githubService';
import SplitText from '@/components/reactbits/SplitText';

const ActivityHero: React.FC = () => {
  return (
    <section className="relative z-10 pt-28 pb-12 sm:pt-36 sm:pb-16 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl text-center">
        {/* Status Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-[#333333] bg-[#0a0a0a] px-3 py-1">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-mono text-[#888888]">
            CURRENTLY BUILDING
          </span>
        </div>

        {/* Title */}
        <SplitText
          text="Live Developer Activity"
          className="font-display text-4xl font-bold text-white tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          tag="h1"
          delay={30}
          duration={0.8}
          splitType="words"
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
        />

        {/* Subtitle */}
        <p className="mt-6 text-[#888888] text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          A semi-realtime view of what I'm currently building, committing,
          and exploring on GitHub.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-medium transition-colors hover:bg-[#e0e0e0]"
          >
            <Github size={16} />
            View GitHub Profile
          </a>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#333333] bg-[#0a0a0a] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1a1a1a]"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
        </div>

        {/* Pulse Line */}
        <div className="mt-16 flex items-center justify-center gap-2 text-[#888888] text-xs font-mono">
          <Zap size={14} className="text-[#888888]" />
          <span>Data updates every ~5 minutes from GitHub Public API</span>
        </div>
      </div>
    </section>
  );
};

export default ActivityHero;
