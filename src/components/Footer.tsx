import { Phone, Mail, Heart, ArrowUp } from 'lucide-react';
import BrandLogo from './BrandLogo';
import serenityIcon from '../assets/serenity-haven-icon.png';

const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'Our Packages', href: '#packages' },
  { label: 'For Organizations', href: '#corporate' },
  { label: 'Activities', href: '#activities' },
  { label: 'Contact Us', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#0f1a0e] text-[#d4c5a0] overflow-hidden">

      {/* Top gold border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c9a96e]/50 to-transparent" />

      {/* Ghost watermark */}
      <div className="absolute -bottom-6 right-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span
          className="block font-light text-[#c9a96e]/[0.04] leading-none"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(6rem, 18vw, 14rem)', letterSpacing: '-0.05em' }}
        >
          SERENITY
        </span>
      </div>

      {/* Decorative emblem */}
      <img
        src={serenityIcon}
        alt=""
        aria-hidden="true"
        className="absolute top-14 right-10 w-36 h-auto opacity-[0.05] pointer-events-none animate-float-slow hidden md:block"
      />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-10 pb-12 border-b border-[#c9a96e]/15">

          {/* Brand */}
          <div>
            <a href="#" aria-label="The Serenity Haven — Home" className="inline-block mb-6">
              <BrandLogo size="lg" showTagline />
            </a>

            <p className="text-[0.86rem] text-[#d4c5a0]/75 leading-relaxed font-light max-w-[300px]">
              A sanctuary where healing meets stillness, and nature restores the soul. Luxury wellness experiences curated for the mind, body, and soul.
            </p>

            <div className="flex items-center gap-2 mt-5 text-[#a8c4a0]/85">
              <Heart className="w-3.5 h-3.5" strokeWidth={1.8} fill="currentColor" />
              <span className="text-[0.74rem] tracking-wider font-light">Crafted with care for your wellbeing</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[0.62rem] font-semibold tracking-[0.25em] text-[#a8c4a0] uppercase mb-6 flex items-center gap-3">
              Navigate
              <span className="flex-1 h-px bg-[#7a9b74]/25" />
            </h4>

            <ul className="space-y-3.5">
              {NAV_LINKS.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[0.88rem] text-[#e8d5a8]/75 hover:text-[#faf3e3] font-light transition-all duration-300 inline-flex items-center gap-2 group hover:translate-x-1"
                  >
                    <span className="text-[#c9a96e] opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[0.7rem]">→</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[0.62rem] font-semibold tracking-[0.25em] text-[#a8c4a0] uppercase mb-6 flex items-center gap-3">
              Get In Touch
              <span className="flex-1 h-px bg-[#7a9b74]/25" />
            </h4>

            <a href="tel:+919974542678" className="flex items-center gap-3.5 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-[#7a9b74]/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#7a9b74]/25 transition-colors">
                <Phone className="w-4 h-4 text-[#a8c4a0]" strokeWidth={1.8} />
              </div>
              <div>
                <div className="text-[0.58rem] tracking-[0.2em] text-[#a8c4a0]/80 uppercase font-medium mb-0.5">Phone</div>
                <div className="text-[0.9rem] text-[#e8d5a8]/85 group-hover:text-[#faf3e3] transition-colors">+91 99745 42678</div>
              </div>
            </a>

            <a href="mailto:serenityhavensupport@gmail.com" className="flex items-center gap-3.5 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-[#c9a96e]/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#c9a96e]/25 transition-colors">
                <Mail className="w-4 h-4 text-[#d9bc85]" strokeWidth={1.8} />
              </div>
              <div className="min-w-0">
                <div className="text-[0.58rem] tracking-[0.2em] text-[#a8c4a0]/80 uppercase font-medium mb-0.5">Email</div>
                <div className="text-[0.9rem] text-[#e8d5a8]/85 group-hover:text-[#faf3e3] transition-colors break-all">serenityhavensupport@gmail.com</div>
              </div>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#c9a96e] to-[#b8924e] text-[#1a2419] text-[0.7rem] font-semibold tracking-[0.18em] uppercase shadow-lg shadow-[#c9a96e]/20 hover:-translate-y-0.5 hover:shadow-[#c9a96e]/40 transition-all duration-300"
            >
              Plan Your Retreat
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[0.76rem] text-[#d4c5a0]/60 font-light">
            © {new Date().getFullYear()} The Serenity Haven. All rights reserved.
          </p>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.18em] uppercase text-[#d4c5a0]/70 hover:text-[#faf3e3] transition-colors"
          >
            Back to top
            <span className="w-8 h-8 rounded-full border border-[#c9a96e]/30 flex items-center justify-center">
              <ArrowUp className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
