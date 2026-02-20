import { useEffect, useState, useRef } from 'react';
import Logo from './logo';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX - 4 + 'px';
        cursorRef.current.style.top = e.clientY - 4 + 'px';
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = ringPos.current.x - 18 + 'px';
        cursorRingRef.current.style.top = ringPos.current.y - 18 + 'px';
      }
      rafRef.current = requestAnimationFrame(animateRing);
    };
    rafRef.current = requestAnimationFrame(animateRing);

    const interactables = document.querySelectorAll('a, button, .pkg-card, .act-card');
    const addHover = () => cursorRingRef.current?.classList.add('cursor-ring-hover');
    const removeHover = () => cursorRingRef.current?.classList.remove('cursor-ring-hover');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Global Cursor */}
      <div ref={cursorRef} className="fixed w-2 h-2 bg-[#c9a96e] rounded-full pointer-events-none z-[99999] mix-blend-multiply transition-transform duration-100" style={{ position: 'fixed' }} />
      <div ref={cursorRingRef} className="cursor-ring fixed w-9 h-9 border border-[#c9a96e] rounded-full pointer-events-none z-[99998] opacity-60 transition-all duration-150" style={{ position: 'fixed' }} />

      <section
        id="hero"
        className="relative min-h-screen bg-[#1a2419] text-white overflow-hidden flex flex-col items-center justify-center"
      >
        {/* Parallax Background */}
        <div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2400&q=90')`,
            transform: `translateY(${scrollY * 0.4}px) scale(${loaded ? 1 : 1.05})`,
            transition: loaded ? 'transform 8s ease-out' : 'none',
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1209]/50 via-[#1a2419]/40 to-[#0a1209]/85" />

        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`
        }} />

        {/* Floating Logo Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-9 h-9 opacity-15 animate-float-slow">
            <Logo className="w-full h-full" />
          </div>
          <div className="absolute top-40 right-20 w-6 h-6 opacity-20 animate-float-medium" style={{ animationDelay: '2s' }}>
            <Logo className="w-full h-full" />
          </div>
          <div className="absolute bottom-40 left-1/4 w-10 h-10 opacity-10 animate-float-slow" style={{ animationDelay: '4s' }}>
            <Logo className="w-full h-full" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto animate-hero-up">
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
          <p className="text-[0.8rem] font-light tracking-[0.4em] text-[#c9a96e]/70 uppercase mt-6 mb-5 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
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
              href="#activities"
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full border border-[#c9a96e]/40 text-[#e8d5a8] text-[0.75rem] font-light tracking-[0.2em] uppercase backdrop-blur-sm hover:bg-[#c9a96e]/10 hover:border-[#c9a96e] hover:-translate-y-1 transition-all duration-300"
            >
              View Activities
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#packages"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#c9a96e]/50 no-underline animate-scroll-bounce"
        >
          <div className="w-px h-12 bg-gradient-to-b from-[#c9a96e]/60 to-transparent" />
          <span className="text-[0.6rem] tracking-[0.25em] uppercase">Scroll</span>
        </a>
      </section>

      {/* Stats Bar */}
      <div className="bg-[#1a2419] border-t border-b border-[#c9a96e]/10 py-8 px-4">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-10 md:gap-20">
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
              <div className="text-[0.62rem] font-medium tracking-[0.2em] text-[#a8c4a0]/70 uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400;500;600&display=swap');

        body { cursor: none; }

        .cursor-ring-hover {
          transform: scale(1.8) !important;
          opacity: 0.3 !important;
          border-color: #7a9b74 !important;
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(-5deg); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-up {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes scroll-bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }

        .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 5s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) both; opacity: 0; }
        .animate-hero-up { animation: hero-up 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-scroll-bounce { animation: scroll-bounce 2.5s ease-in-out infinite; }
      `}</style>
    </>
  );
}