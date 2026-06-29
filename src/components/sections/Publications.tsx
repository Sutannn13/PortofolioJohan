import { FileText, ExternalLink, BadgeCheck } from 'lucide-react';
import SplitText from '@/components/reactbits/SplitText';
import type { Publication } from '@/types';

interface PublicationsProps {
    publications: Publication[];
}

const Publications: React.FC<PublicationsProps> = ({ publications }) => {
    if (!publications || publications.length === 0) return null;

    return (
        <section
            id="publications"
            className="relative z-10 py-12 sm:py-section px-4 sm:px-6"
        >
            <div className="mx-auto max-w-3xl">
                {/* Section Header */}
                <div className="mb-10 sm:mb-16 text-center">
                    <span className="section-label mb-3 sm:mb-4 block">Research</span>
                    <SplitText
                        text="Publications"
                        className="font-display text-3xl font-bold text-text-primary sm:text-4xl md:text-5xl"
                        tag="h2"
                        delay={30}
                        duration={0.8}
                        splitType="words"
                        from={{ opacity: 0, y: 30 }}
                        to={{ opacity: 1, y: 0 }}
                    />
                    <p className="mt-4 text-text-secondary text-sm sm:text-base max-w-md mx-auto">
                        Peer-reviewed academic research I have contributed to
                    </p>
                </div>

                {/* Publication Cards */}
                <div className="space-y-6">
                    {publications.map((pub) => (
                        <article
                            key={pub.id}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-6 md:p-8 backdrop-blur-xl transition-all duration-500 hover:border-white/30 hover:bg-white/[0.06] hover:shadow-[0_8px_30px_rgba(255,255,255,0.08)]"
                        >
                            {/* Venue + indexing + year */}
                            <div className="mb-4 flex flex-col items-start sm:flex-row sm:items-center gap-1.5 sm:gap-2">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[11px] text-text-secondary">
                                    <FileText size={12} className="text-white/60" />
                                    {pub.venue}
                                </span>
                                {pub.indexing && (
                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-subtle px-3 py-1 font-mono text-[11px] font-semibold text-accent-light">
                                        <BadgeCheck size={12} />
                                        {pub.indexing}
                                    </span>
                                )}
                                <span className="ml-auto font-mono text-xs text-text-muted">
                                    {pub.year}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="font-display text-base sm:text-lg md:text-xl font-bold text-text-primary leading-snug">
                                {pub.title}
                            </h3>

                            {/* Authors + details */}
                            <p className="mt-3 text-sm text-text-secondary">{pub.authors}</p>
                            {pub.details && (
                                <p className="mt-1 text-xs text-text-muted">{pub.details}</p>
                            )}

                            {/* DOI link */}
                            {pub.doi && (
                                <a
                                    href={pub.doi}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-bg-card px-5 py-2 text-sm font-semibold text-text-secondary transition-all duration-300 hover:border-accent/40 hover:text-text-primary"
                                >
                                    Read Paper
                                    <ExternalLink size={14} />
                                </a>
                            )}
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Publications;
