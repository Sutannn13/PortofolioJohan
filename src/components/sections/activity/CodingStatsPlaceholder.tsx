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
          <div className="w-2 h-2 bg-white" />
          <h2 className="font-display text-lg font-semibold text-white">
            Coding Stats
          </h2>
          <span className="rounded-sm border border-[#333333] bg-[#0a0a0a] px-2.5 py-0.5 text-[10px] font-mono tracking-wider text-[#888888]">
            COMING SOON
          </span>
        </div>

        <div className="rounded-md border border-[#333333] border-dashed bg-[#000000] p-6 sm:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 opacity-40">
            {placeholderItems.map((item) => (
              <div key={item.label} className="text-center p-4">
                <div className="flex justify-center mb-2 text-[#888888]">
                  {item.icon}
                </div>
                <p className="text-lg font-display font-bold text-white mb-0.5">
                  {item.value}
                </p>
                <p className="text-[10px] text-[#888888] uppercase tracking-wider font-mono">
                  {item.label}
                </p>
                <p className="text-[10px] text-[#555555] mt-0.5 font-mono">{item.sub}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 pt-4 border-t border-[#333333]">
            <p className="text-sm text-[#888888]">
              WakaTime integration will be available soon.
            </p>
            <p className="text-xs text-[#555555] mt-1 font-mono">
              Track coding time, languages, editors, and more.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodingStatsPlaceholder;
