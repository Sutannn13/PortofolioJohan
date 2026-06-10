import { Link } from 'react-router-dom';
import { ArrowLeft, Github, Zap } from 'lucide-react';
import { GITHUB_USERNAME } from '@/lib/githubService';
import SplitText from '@/components/reactbits/SplitText';

const ActivityHero: React.FC = () => {
  return (
    <section className="relative z-10 pt-28 pb-12 sm:pt-36 sm:pb-16 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl text-center">
        {/* Status Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-sm px-4 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-xs font-mono tracking-wider text-accent">
            CURRENTLY BUILDING
          </span>
        </div>

        {/* Title */}
        <SplitText
          text="Live Developer Activity"
          className="font-display text-3xl font-bold text-text-primary sm:text-4xl md:text-5xl lg:text-6xl"
          tag="h1"
          delay={30}
          duration={0.8}
          splitType="words"
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
        />

        {/* Subtitle */}
        <p className="mt-4 sm:mt-6 text-text-secondary text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          A semi-realtime view of what I'm currently building, committing,
          and exploring on GitHub.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-accent/20 border border-accent/30 backdrop-blur-sm px-6 py-3 text-sm font-medium text-accent transition-all duration-300 hover:bg-accent/30 hover:scale-[1.02]"
          >
            <Github size={16} />
            View GitHub Profile
          </a>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-6 py-3 text-sm font-medium text-text-secondary transition-all duration-300 hover:bg-white/10 hover:text-text-primary hover:scale-[1.02]"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
        </div>

        {/* Pulse Line */}
        <div className="mt-12 flex items-center justify-center gap-2 text-text-muted text-xs">
          <Zap size={12} className="text-accent" />
          <span>Data updates every ~5 minutes from GitHub Public API</span>
        </div>
      </div>
    </section>
  );
};

export default ActivityHero;
