import { Clock, Code, Monitor, Folder } from 'lucide-react';

const CodingStatsPlaceholder: React.FC = () => {
  const placeholderItems = [
    { icon: <Clock size={16} />, label: 'Coding Time', value: '—', sub: 'This week' },
    { icon: <Code size={16} />, label: 'Top Language', value: '—', sub: 'Most used' },
    { icon: <Monitor size={16} />, label: 'Editor', value: '—', sub: 'Primary IDE' },
    { icon: <Folder size={16} />, label: 'Active Project', value: '—', sub: 'Most worked' },
  ];

  return (
    <section className="relative z-10 px-4 sm:px-6 mb-12 sm:mb-16">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-text-muted" />
          <h2 className="font-display text-lg font-semibold text-text-primary">
            Coding Stats
          </h2>
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-mono tracking-wider text-text-muted">
            COMING SOON
          </span>
        </div>

        <div className="rounded-2xl border border-white/10 border-dashed bg-white/[0.02] backdrop-blur-xl p-6 sm:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 opacity-40">
            {placeholderItems.map((item) => (
              <div key={item.label} className="text-center p-4">
                <div className="flex justify-center mb-2 text-text-muted">
                  {item.icon}
                </div>
                <p className="text-lg font-display font-bold text-text-primary mb-0.5">
                  {item.value}
                </p>
                <p className="text-[10px] text-text-muted uppercase tracking-wider">
                  {item.label}
                </p>
                <p className="text-[10px] text-text-muted mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 pt-4 border-t border-white/5">
            <p className="text-sm text-text-muted">
              WakaTime integration will be available soon.
            </p>
            <p className="text-xs text-text-muted mt-1">
              Track coding time, languages, editors, and more.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodingStatsPlaceholder;
