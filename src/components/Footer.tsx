import Logo from './logo';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#1a2419] to-[#0f1a0e] text-[#d4c5a0] overflow-hidden">
      {/* Ghost watermark text */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="block font-light text-[#c9a96e]/[0.03] leading-none"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(6rem, 18vw, 14rem)', letterSpacing: '-0.05em' }}
        >
          SERENITY
        </span>
      </div>

      {/* Top gold border */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#c9a96e]/40 to-transparent" />

      {/* Floating logo decorations */}
      <div className="absolute top-16 right-10 opacity-[0.04] pointer-events-none animate-float-slow">
        <Logo className="w-36 h-36" />
      </div>
      <div className="absolute bottom-16 left-8 opacity-[0.03] pointer-events-none animate-float-medium">
        <Logo className="w-24 h-24" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-14 pb-14 border-b border-[#c9a96e]/10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Logo className="w-9 h-9 brightness-0 invert opacity-80" />
            </div>
            <h2 className="font-light text-[#faf7f0] text-[1.7rem] mb-1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              The Serenity Haven
            </h2>
            <p className="italic text-[#c9a96e]/50 text-[0.88rem] mb-5" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              Where wellness transforms into a way of life.
            </p>
            <p className="text-[0.83rem] text-[#a8c4a0]/55 leading-relaxed font-light max-w-[280px]">
              A sanctuary where healing meets stillness, and nature restores the soul. Luxury wellness experiences curated for the mind, body, and soul.
            </p>
            <div className="flex items-center gap-2 mt-5 text-[#7a9b74]/70">
              <span className="text-sm">♥</span>
              <span className="text-[0.72rem] tracking-wider font-light">Crafted with care for your wellbeing</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[0.62rem] font-semibold tracking-[0.25em] text-[#a8c4a0]/80 uppercase mb-6 flex items-center gap-3">
              Navigate
              <span className="flex-1 h-px bg-[#7a9b74]/20" />
            </h4>
            <ul className="space-y-3.5">
              {[
                { label: 'Home', href: '#hero' },
                { label: 'Our Packages', href: '#packages' },
                { label: 'Activities', href: '#activities' },
                { label: 'Contact Us', href: '#contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[0.85rem] text-[#c9a96e]/50 hover:text-[#e8d5a8] font-light transition-colors duration-300 flex items-center gap-2 group no-underline"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[0.7rem]">→</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[0.62rem] font-semibold tracking-[0.25em] text-[#a8c4a0]/80 uppercase mb-6 flex items-center gap-3">
              Get In Touch
              <span className="flex-1 h-px bg-[#7a9b74]/20" />
            </h4>

            <a
              href="tel:9974542678"
              className="flex items-center gap-3.5 mb-4 group no-underline"
            >
              <div className="w-9 h-9 rounded-xl bg-[#7a9b74]/10 flex items-center justify-center text-[0.9rem] flex-shrink-0 group-hover:bg-[#7a9b74]/20 transition-colors">
                📞
              </div>
              <div>
                <div className="text-[0.58rem] tracking-[0.2em] text-[#7a9b74]/80 uppercase font-medium mb-0.5">Phone</div>
                <div className="text-[0.86rem] text-[#c9a96e]/60 group-hover:text-[#e8d5a8] transition-colors font-light">9974542678</div>
              </div>
            </a>

            <a
              href="mailto:support@serenityhaven.in"
              className="flex items-center gap-3.5 mb-6 group no-underline"
            >
              <div className="w-9 h-9 rounded-xl bg-[#c9a96e]/10 flex items-center justify-center text-[0.9rem] flex-shrink-0 group-hover:bg-[#c9a96e]/20 transition-colors">
                ✉️
              </div>
              <div>
                <div className="text-[0.58rem] tracking-[0.2em] text-[#7a9b74]/80 uppercase font-medium mb-0.5">Email</div>
                <div className="text-[0.86rem] text-[#c9a96e]/60 group-hover:text-[#e8d5a8] transition-colors font-light break-all">support@serenityhaven.in</div>
              </div>
            </a>

            <div className="p-4 bg-[#7a9b74]/08 border border-[#7a9b74]/12 rounded-xl">
              <p className="text-[0.78rem] text-[#c9a96e]/45 leading-relaxed font-light italic" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                Luxury Wellness Experiences Curated for the Mind, Body & Soul ✦
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[0.75rem] text-[#c9a96e]/30 font-light">
            © {new Date().getFullYear()} The Serenity Haven. All rights reserved.
          </p>
          <div className="flex gap-3">
            {[0, 0.3, 0.6].map((d, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#7a9b74]/40 animate-pulse-slow" style={{ animationDelay: `${d}s` }} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-22px) rotate(5deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(-5deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 8s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
      `}</style>
    </footer>
  );
}