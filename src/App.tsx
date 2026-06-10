import { useEffect, useState } from 'react';
import type { ContactMessage } from '@/types';
import { supabase } from '@/lib/supabase';
import Aurora from '@/components/reactbits/Aurora';
import PillNav from '@/components/reactbits/PillNav';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import ProfileCardSection from '@/components/sections/ProfileCardSection';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Certificates from '@/components/sections/Certificates';
import Contact from '@/components/sections/Contact';
import Experience from '@/components/sections/Experience';
import GitHubSection from '@/components/sections/GitHubSection';
import BlurText from '@/components/reactbits/BlurText';
import CountUp from '@/components/reactbits/CountUp';
// ─────────────────────────────────────────────
// Data import from the isolated `sosial` folder
// ─────────────────────────────────────────────
import portfolioData from '../sosial/data';

const initialContactMessages: ContactMessage[] = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

function App() {
  const { personal, projects, certificates, experiences, navigation } = portfolioData;
  const [showIntro, setShowIntro] = useState(true);
  const [introFading, setIntroFading] = useState(false);

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    // Fetch initial messages from Supabase
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setContactMessages(data);
      }
    };

    fetchMessages();

    // Subscribe to realtime inserts
    const channel = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'contact_messages' },
        (payload) => {
          const newMessage = payload.new as ContactMessage;
          setContactMessages((prev) => [newMessage, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (!showIntro) {
      return;
    }

    const fadeTimer = window.setTimeout(() => setIntroFading(true), 10500);
    const hideTimer = window.setTimeout(() => setShowIntro(false), 11500);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, [showIntro]);

  // Convert NavItem[] to PillNav format
  const pillNavItems = navigation.map((item) => ({
    label: item.label,
    href: item.href,
  }));

  // Gabungkan pesan asli dengan pesan dummy jika pesan aslinya kurang dari 6
  // Sehingga Marquee akan selalu terlihat ramai.
  const displayMessages = contactMessages.length >= 6 
    ? contactMessages 
    : [...contactMessages, ...initialContactMessages].slice(0, Math.max(6, contactMessages.length));

  return (
    <>
      {/* ── Intro Loading Screen ── */}
      {showIntro && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#060010] transition-all duration-1000 ease-in-out ${introFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
        >
          {/* Aurora background — same as landing page */}
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <Aurora
              colorStops={["#7cff67", "#B19EEF", "#5227FF"]}
              blend={0.5}
              amplitude={1.0}
              speed={1}
            />
          </div>

          {/* Soft glow accents */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden z-[1]">
            <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[120px]" />
            <div className="absolute right-[10%] bottom-1/4 h-64 w-64 rounded-full bg-blue-500/15 blur-[120px]" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center px-6">
            {/* Counter 0–100% */}
            <div className="flex items-baseline justify-center">
              <CountUp
                from={0}
                to={100}
                separator=","
                direction="up"
                duration={10}
                delay={0}
                className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-tight elegant-shimmer-text"
              />
              <span className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-tight elegant-shimmer-text ml-2">%</span>
            </div>

            {/* GitHub logo bouncing over username */}
            <div className="mt-10 loading-username-text">
              <div className="flex items-center justify-center font-mono text-lg sm:text-xl md:text-2xl font-bold tracking-wider select-none">
                
                {/* Bouncing GitHub logo Wrapper (Takes up physical space to center properly) */}
                <div className="relative w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 mr-3 flex items-center justify-center elegant-shimmer-svg">
                  {/* Animating Element */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="loading-github-slide">
                      <div className="loading-github-bounce">
                        <div className="loading-github-roll">
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Username text */}
                <span className="relative z-0 elegant-shimmer-text">Sutannn13</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ── Aurora Background (fixed, full-screen, behind everything) ── */}
      <div className="aurora-bg" aria-hidden="true">
        <Aurora
          colorStops={["#7cff67", "#B19EEF", "#5227FF"]}
          blend={0.5}
          amplitude={1.0}
          speed={1}
        />
      </div>

      {/* ── Navigation (PillNav) ── */}
      <PillNav
        items={pillNavItems}
        baseColor="transparent"
        pillColor="rgba(6, 0, 16, 0.6)"
        hoveredPillTextColor="#060010"
        pillTextColor="#f0f0f5"
      />

      {/* ── Main Content ── */}
      <main className="relative z-10">
        <Hero personal={personal} />
        <ProfileCardSection personal={personal} />
        <About personal={personal} />
        <Experience experiences={experiences} messages={displayMessages} />
        <Projects projects={projects} />
        <Skills />
        <Certificates certificates={certificates} />
        <GitHubSection />
        <Contact personal={personal} />
      </main>

      {/* ── Footer ── */}
      <Footer name={personal.name} />
    </>
  );
}

export default App;
