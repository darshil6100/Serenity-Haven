import { Phone, Mail, Heart } from 'lucide-react';
import serenityLogo from '../assets/Logo.png';

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#0f1a0e] text-[#d4c5a0] overflow-hidden border-0 outline-none">

      {/* Top gold border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c9a96e]/40 to-transparent" />

      {/* Ghost watermark */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="block font-light text-[#c9a96e]/[0.03] leading-none"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(6rem, 18vw, 14rem)',
            letterSpacing: '-0.05em',
          }}
        >
          SERENITY
        </span>
      </div>

      {/* Decorative Logo - Top Right */}
      <div className="absolute top-12 right-8 opacity-[0.04] pointer-events-none animate-float-slow">
        <img
          src={serenityLogo}
          alt=""
          className="w-40 h-auto object-contain"
        />
      </div>

      {/* Decorative Logo - Bottom Left */}
      <div className="absolute bottom-12 left-8 opacity-[0.03] pointer-events-none animate-float-medium">
        <img
          src={serenityLogo}
          alt=""
          className="w-28 h-auto object-contain"
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-10 pb-10 border-b border-[#c9a96e]/10">

          {/* Brand */}
          <div>

            {/* FULL LOGO */}
            <div className="mb-4">
              <img
                src={serenityLogo}
                alt="The Serenity Haven"
                className="w-52 sm:w-60 h-auto object-contain object-left"
              />
            </div>

            <p className="text-[0.83rem] text-[#a8c4a0]/55 leading-relaxed font-light max-w-[280px]">
              A sanctuary where healing meets stillness, and nature restores
              the soul. Luxury wellness experiences curated for the mind,
              body, and soul.
            </p>

            <div className="flex items-center gap-2 mt-5 text-[#7a9b74]/70">
              <Heart
                className="w-3.5 h-3.5"
                strokeWidth={1.8}
                fill="currentColor"
              />
              <span className="text-[0.72rem] tracking-wider font-light">
                Crafted with care for your wellbeing
              </span>
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
                { label: 'For Organizations', href: '#corporate' },
                { label: 'Activities', href: '#activities' },
                { label: 'Contact Us', href: '#contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[0.85rem] text-[#c9a96e]/50 hover:text-[#e8d5a8] font-light transition-colors duration-300 flex items-center gap-2 group no-underline"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[0.7rem]">
                      →
                    </span>
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
              <div className="w-9 h-9 rounded-xl bg-[#7a9b74]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#7a9b74]/20 transition-colors">
                <Phone
                  className="w-4 h-4 text-[#a8c4a0]"
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <div className="text-[0.58rem] tracking-[0.2em] text-[#7a9b74]/80 uppercase font-medium mb-0.5">
                  Phone
                </div>

                <div className="text-[0.86rem] text-[#c9a96e]/60 group-hover:text-[#e8d5a8] transition-colors font-light">
                  9974542678
                </div>
              </div>
            </a>

            <a
              href="mailto:serenityhavensupport@gmail.com"
              className="flex items-center gap-3.5 mb-6 group no-underline"
            >
              <div className="w-9 h-9 rounded-xl bg-[#c9a96e]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#c9a96e]/20 transition-colors">
                <Mail
                  className="w-4 h-4 text-[#c9a96e]"
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <div className="text-[0.58rem] tracking-[0.2em] text-[#7a9b74]/80 uppercase font-medium mb-0.5">
                  Email
                </div>

                <div className="text-[0.86rem] text-[#c9a96e]/60 group-hover:text-[#e8d5a8] transition-colors font-light break-all">
                  serenityhavensupport@gmail.com
                </div>
              </div>
            </a>

            <div className="p-4 bg-[#7a9b74]/[0.08] border border-[#7a9b74]/[0.12] rounded-xl">
              <p
                className="text-[0.78rem] text-[#c9a96e]/45 leading-relaxed font-light italic"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                }}
              >
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
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#7a9b74]/40 animate-pulse-slow"
                style={{ animationDelay: `${d}s` }}
              />
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-22px) rotate(5deg);
          }
        }

        @keyframes float-medium {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-14px) rotate(-5deg);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 8s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
}