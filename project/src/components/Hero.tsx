import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import Logo from './logo';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#1a1f16] text-white overflow-hidden">
      {/* Parallax Background Layers */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=2000')] bg-cover bg-center"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1f16]/70 via-[#2d3e26]/50 to-[#1a1f16]"></div>
      </div>

      {/* Organic Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="leaf-float absolute top-20 left-10 w-9 h-9 opacity-20">
          <Logo className="w-full h-full animate-float-slow" />
        </div>
        <div className="leaf-float absolute top-40 right-20 w-6 h-6 opacity-30" style={{ animationDelay: '2s' }}>
          <Logo className="w-full h-full animate-float-medium" />
        </div>
        <div className="leaf-float absolute bottom-40 left-1/4 w-10 h-10 opacity-15" style={{ animationDelay: '4s' }}>
          <Logo className="w-full h-full animate-float-slow" />
        </div>
      </div>

      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="text-center">
          {/* Animated Top Ornament */}
          {/* Main Heading with Staggered Animation */}
          <h1 className="relative">
            <span className="block text-6xl md:text-8xl font-serif font-light mb-2 tracking-wide text-[#f5f1e8] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              THE SERENITY
            </span>
            <span className="block text-6xl md:text-8xl font-serif font-light tracking-wide text-[#f5f1e8] animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              HAVEN
            </span>
            {/* Glow Effect */}
            <div className="absolute inset-0 blur-3xl opacity-20 bg-gradient-to-b from-[#b8a67d] to-transparent pointer-events-none"></div>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl font-light tracking-[0.3em] text-[#d4c5a0] mt-8 mb-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            LUXURY WELLNESS EXPERIENCES
          </p>

          <p className="text-base md:text-lg text-[#b8a67d]/80 tracking-wider mb-10 animate-fade-in-up font-light" style={{ animationDelay: '0.8s' }}>
            CURATED FOR THE MIND, BODY & SOUL
          </p>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center mb-10 animate-fade-in" style={{ animationDelay: '1s' }}>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#b8a67d]/60 to-[#b8a67d]/60"></div>
            <div className="mx-4 flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#b8a67d]/60 animate-pulse-slow"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#b8a67d]/60 animate-pulse-slow" style={{ animationDelay: '0.3s' }}></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#b8a67d]/60 animate-pulse-slow" style={{ animationDelay: '0.6s' }}></div>
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent via-[#b8a67d]/60 to-[#b8a67d]/60"></div>
          </div>

          {/* Tagline */}
          <p className="text-xl md:text-2xl italic font-light text-[#e8dcc4] max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
            A sanctuary where healing meets stillness, <br className="hidden md:block" />
            and nature restores the soul.
          </p>

          {/* CTA Button */}
          <div className="animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
            <a
              href="#packages"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#b8a67d] to-[#a89668] hover:from-[#c9b888] hover:to-[#b8a67d] text-[#1a1f16] font-medium tracking-wider transition-all duration-500 border border-[#d4c5a0] shadow-lg hover:shadow-2xl hover:shadow-[#b8a67d]/20 relative overflow-hidden"
            >
              <span className="relative z-10">EXPLORE OUR PACKAGES</span>
              <ChevronDown className="w-5 h-5 relative z-10 group-hover:translate-y-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#d4c5a0] to-[#c9b888] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <div className="flex flex-col items-center gap-2 text-[#b8a67d]/60">
          <span className="text-xs tracking-widest font-light">SCROLL</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 5s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out forwards; opacity: 0; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}