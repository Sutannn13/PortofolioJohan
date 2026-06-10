import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';

const LiveActivityBanner: React.FC = () => {
  return (
    <section className="relative z-10 px-4 sm:px-6 py-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/activity"
          className="group block rounded-2xl border border-accent/20 bg-gradient-to-r from-accent/10 via-accent/5 to-transparent backdrop-blur-xl p-6 sm:p-8 transition-all duration-500 hover:border-accent/40 hover:from-accent/15 hover:via-accent/10 hover:scale-[1.005]"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Left: Icon + Text */}
            <div className="flex items-center gap-3 flex-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 border border-accent/30 shrink-0">
                <Zap size={18} className="text-accent" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-text-primary text-sm sm:text-base">
                  See what I'm currently building
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  Live activity, recent commits, and active repositories from GitHub
                </p>
              </div>
            </div>

            {/* Right: CTA */}
            <div className="flex items-center gap-2 text-accent text-sm font-medium transition-transform duration-300 group-hover:translate-x-1">
              View Live Activity
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default LiveActivityBanner;
