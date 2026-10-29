import { useEffect, useRef } from 'react';
import serenityIcon from '../assets/serenity-haven-icon.png';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&q=80&auto=format&fit=crop';

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  // Parallax via direct style writes so scrolling never re-renders React.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (bgRef.current && y < window.innerHeight * 1.2) {
          bgRef.current.style.transform = `translate3d(0, ${y * 0.35}px, 0)`;
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen bg-[#1a2419] text-white overflow-hidden flex flex-col items-center justify-center"
      >
        {/* Parallax Background */}
        <div ref={bgRef} className="absolute inset-x-0 top-0 -bottom-[20%] will-change-transform">
          <div
            className="absolute inset-0 bg-cover bg-center animate-ken-burns"
            style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
          />
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1209]/70 via-[#1a2419]/35 to-[#0a1209]/90" />

        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`
        }} />

        {/* Floating Logo Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block" aria-hidden="true">
          <img src={serenityIcon} alt="" className="absolute top-32 left-[8%] w-12 h-auto opacity-[0.18] animate-float-slow" />
          <img src={serenityIcon} alt="" className="absolute top-48 right-[10%] w-8 h-auto opacity-20 animate-float-medium" style={{ animationDelay: '2s' }} />
          <img src={serenityIcon} alt="" className="absolute bottom-40 left-1/4 w-10 h-auto opacity-[0.12] animate-float-slow" style={{ animationDelay: '4s' }} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 pt-28 pb-24 max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-5 mb-8">
            <div className="h-px w-12 bg-[#c9a96e] opacity-60" />
            <span className="text-[0.68rem] font-medium tracking-[0.35em] text-[#c9a96e] uppercase">
              Luxury Wellness Experiences
            </span>
            <div className="h-px w-12 bg-[#c9a96e] opacity-60" />
          </div>

          {/* Main Title */}
          <h1 className="font-serif font-light leading-[0.9] mb-6" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            <span className="block text-[clamp(4rem,12vw,9rem)] text-[#faf7f0] tracking-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              The Serenity
            </span>
            <span className="block text-[clamp(4rem,12vw,9rem)] italic text-[#e8d5a8] tracking-tight animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Haven
            </span>
          </h1>

          {/* Sub */}
          <p className="text-[0.8rem] font-normal tracking-[0.4em] text-[#d9bc85] uppercase mt-6 mb-5 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            Curated for the Mind, Body & Soul
          </p>

          {/* Decorative dots */}
          <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#c9a96e]/50 to-[#c9a96e]/50" />
            <div className="flex gap-2">
              {[0, 0.3, 0.6].map((d, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#c9a96e]/60 animate-pulse-slow" style={{ animationDelay: `${d}s` }} />
              ))}
            </div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-[#c9a96e]/50 to-[#c9a96e]/50" />
          </div>

          {/* Tagline */}
          <p
            className="text-lg md:text-xl italic font-light text-[#f0e8d4]/85 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", animationDelay: '1s' }}
          >
            A sanctuary where healing meets stillness,{' '}
            <br className="hidden md:block" />
            and nature restores the soul.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
            <a
              href="#packages"
              className="group inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-[#c9a96e] to-[#b8924e] text-[#1a2419] text-[0.75rem] font-semibold tracking-[0.2em] uppercase shadow-lg shadow-[#c9a96e]/30 hover:shadow-[#c9a96e]/50 hover:-translate-y-1 transition-all duration-300"
            >
              Explore Packages
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#corporate"
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full border border-[#c9a96e]/40 text-[#e8d5a8] text-[0.75rem] font-light tracking-[0.2em] uppercase backdrop-blur-sm hover:bg-[#c9a96e]/10 hover:border-[#c9a96e] hover:-translate-y-1 transition-all duration-300"
            >
              For Organizations
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#corporate"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#c9a96e]/50 no-underline animate-scroll-bounce"
        >
          <div className="w-px h-12 bg-gradient-to-b from-[#c9a96e]/60 to-transparent" />
          <span className="text-[0.6rem] tracking-[0.25em] uppercase">Scroll</span>
        </a>
      </section>

      {/* Stats Bar */}
      <div className="bg-[#1a2419] border-t border-b border-[#c9a96e]/10 py-10 px-4">
        <div data-reveal className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { num: '6+', label: 'Curated Packages' },
            { num: '20+', label: 'Activities' },
            { num: '5+', label: 'Spa Therapies' },
            { num: '100%', label: 'Nature-Immersed' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-light text-[#e8d5a8] text-[2.5rem] leading-none mb-1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                {s.num}
              </div>
              <div className="text-[0.62rem] font-medium tracking-[0.2em] text-[#a8c4a0]/85 uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  );
}