import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RotatingText from '@/components/reactbits/RotatingText';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Lanyard from '@/components/reactbits/Lanyard';
import type { PersonalInfo } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
    personal: PersonalInfo;
}

const About: React.FC<AboutProps> = ({ personal }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [lanyardDropped, setLanyardDropped] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                imageRef.current,
                { opacity: 0, x: -40, scale: 0.95 },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 50%',
                        once: true,
                        onEnter: () => setLanyardDropped(true),
                    },
                }
            );

            gsap.fromTo(
                contentRef.current,
                { opacity: 0, x: 40 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 50%',
                        once: true,
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative z-10 py-12 sm:py-section px-4 sm:px-6"
        >
            <div className="mx-auto max-w-6xl rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8 backdrop-blur-xl shadow-2xl md:p-12 lg:p-16">
                <div className="grid items-center gap-10 md:gap-16 md:grid-cols-2">
                    {/* Profile Lanyard */}
                    <div ref={imageRef} className="flex items-center justify-center mx-auto opacity-0 h-[380px] sm:h-[450px] md:h-[500px] w-full relative">
                        {lanyardDropped && (
                            <Lanyard position={[-0.5, -1, 15]} gravity={[0, -40, 0]} transparent={true} />
                        )}
                    </div>

                    {/* Content */}
                    <div ref={contentRef} className="opacity-0">
                        <h2 className="font-display mb-6 text-3xl font-bold sm:text-4xl text-text-primary flex items-center flex-wrap gap-2">
                            About
                            <RotatingText
                                texts={['Me', 'Sutan', 'Arlie', 'Johan']}
                                mainClassName="px-2 sm:px-2 md:px-3 bg-transparent text-white border border-white/30 overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                                staggerFrom="last"
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "-120%" }}
                                staggerDuration={0.025}
                                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                rotationInterval={2000}
                            />
                        </h2>

                        <ScrollReveal
                            baseOpacity={0.4}
                            enableBlur={true}
                            baseRotation={3}
                            blurStrength={3}
                            containerClassName="mb-6"
                            textClassName="text-base leading-relaxed text-text-secondary"
                            wordAnimationEnd="bottom 80%"
                        >
                            {personal.bio}
                        </ScrollReveal>

                        <div className="flex flex-wrap gap-3">
                            {['Laravel', 'PHP', 'MySQL', 'REST API', 'Git'].map(
                                (tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full border border-border bg-bg-card px-3 py-1 font-mono text-xs text-text-muted transition-colors duration-300 hover:border-accent/30 hover:text-accent"
                                    >
                                        {tag}
                                    </span>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
