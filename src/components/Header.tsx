import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import BrandLogo from './BrandLogo';
import type { Page } from '../lib/router';

type HeaderProps = {
  currentPage: Page;
};

const NAV_ITEMS: { label: string; href: string; page: Page }[] = [
  { label: 'Home', href: '#', page: 'home' },
  { label: 'Packages', href: '#packages', page: 'packages' },
  { label: 'Contact Us', href: '#contact', page: 'contact' },
];

export default function Header({ currentPage }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [currentPage]);

  // Over the home hero the header floats transparently; everywhere else it is solid.
  const overlay = currentPage === 'home';
  const solid = !overlay || scrolled || menuOpen;
  const activePage = currentPage === 'retreat' ? 'packages' : currentPage;

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    // Clicking the link for the page you're already on scrolls back to the top.
    if ((window.location.hash || '#') === href) window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`${overlay ? 'fixed' : 'sticky'} inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? 'bg-[#122016]/92 backdrop-blur-xl border-b border-[#c9a96e]/15 shadow-[0_10px_40px_rgba(6,12,7,0.35)]'
          : 'bg-gradient-to-b from-[#0a1209]/60 to-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#" onClick={() => handleNavClick('#')} className="transition-opacity hover:opacity-90" aria-label="The Serenity Haven — Home">
          <BrandLogo />
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden md:flex items-center gap-1 rounded-full border border-[#c9a96e]/25 bg-[#0d170f]/50 p-1.5 backdrop-blur-md">
          {NAV_ITEMS.map(item => {
            const active = activePage === item.page;
            return (
              <a
                key={item.page}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                aria-current={active ? 'page' : undefined}
                className={`rounded-full px-5 py-2 text-[0.7rem] font-medium tracking-[0.16em] uppercase transition-all duration-300 ${
                  active
                    ? 'bg-gradient-to-r from-[#d4b57a] to-[#b8924e] text-[#16200f] shadow-lg shadow-[#c9a96e]/25'
                    : 'text-[#f5ecdc]/90 hover:text-white hover:bg-[#c9a96e]/15'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen(o => !o)}
          className="md:hidden w-11 h-11 rounded-full border border-[#c9a96e]/30 bg-[#0d170f]/50 flex items-center justify-center text-[#f5ecdc]"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile navigation */}
      <nav
        id="mobile-nav"
        aria-label="Main"
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-4 pb-5 pt-1 flex flex-col gap-1.5">
          {NAV_ITEMS.map(item => {
            const active = activePage === item.page;
            return (
              <a
                key={item.page}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                aria-current={active ? 'page' : undefined}
                className={`rounded-xl px-5 py-3.5 text-[0.78rem] font-medium tracking-[0.18em] uppercase transition-colors ${
                  active
                    ? 'bg-gradient-to-r from-[#d4b57a] to-[#b8924e] text-[#16200f]'
                    : 'text-[#f5ecdc] bg-[#c9a96e]/[0.06] hover:bg-[#c9a96e]/15'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
