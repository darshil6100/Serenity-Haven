import Logo from './logo';
type HeaderProps = {
  currentPage: 'home' | 'packages' | 'contact' | 'brochure';
  onNavigate: (page: 'home' | 'packages' | 'contact' | 'brochure') => void;
};

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#c9a96e]/15 bg-[#0f1b12]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-[#f5ecdc] transition-opacity hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full text-[#e8d5a8] sha">
            <span className="text-sm font-medium tracking-[0.22em]"><Logo /></span>
          </div>
          <div>
            <div className="text-[0.56rem] font-medium tracking-[0.28em] text-[#c9a96e] uppercase">The</div>
            <div className="text-[0.56rem] font-medium tracking-[0.28em] text-[#c9a96e] uppercase">Serenity</div>
            <div className="text-[0.65rem] italic text-[#faf7f0] font-medium tracking-[0.28em] text-[#c9a96e] uppercase" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Haven</div>
            {/* <div className="text-lg italic text-[#faf7f0]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              Haven
            </div> */}
          </div>
        </button>

        <nav className="flex items-center gap-2 rounded-full border border-[#c9a96e]/20 bg-[#1a2419]/60 p-1.5 shadow-[0_10px_30px_rgba(10,18,9,0.2)]">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className={`rounded-full px-4 py-2 text-[0.68rem] font-medium tracking-[0.14em] uppercase transition-all ${
              currentPage === 'home'
                ? 'bg-[#c9a96e]/15 text-[#f5ecdc]'
                : 'text-[#f5ecdc] hover:bg-[#c9a96e]/10'
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => onNavigate('packages')}
            className={`rounded-full px-4 py-2 text-[0.68rem] font-medium tracking-[0.14em] uppercase transition-all ${
              currentPage === 'packages'
                ? 'bg-gradient-to-r from-[#c9a96e] to-[#b8924e] text-[#1a2419] shadow-lg shadow-[#c9a96e]/25'
                : 'text-[#f5ecdc] hover:bg-[#c9a96e]/10'
            }`}
          >
            Package
          </button>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className={`rounded-full px-4 py-2 text-[0.68rem] font-medium tracking-[0.14em] uppercase transition-all ${
              currentPage === 'contact'
                ? 'bg-gradient-to-r from-[#c9a96e] to-[#b8924e] text-[#1a2419] shadow-lg shadow-[#c9a96e]/25'
                : 'text-[#f5ecdc] hover:bg-[#c9a96e]/10'
            }`}
          >
            Contact Us
          </button>
        </nav>
      </div>
    </header>
  );
}
