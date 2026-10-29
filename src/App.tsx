import { useEffect } from 'react';
import Hero from './components/Hero';
import Header from './components/Header';
import Packages from './components/Packages';
import Activities from './components/Activities';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import CorporateWellness from './components/CorporateWellness';
import WellnessRetreatBrochure from './components/WellnessRetreatBrochure';
import { useHashRoute, type Page } from './lib/router';

const PAGE_TITLES: Record<Page, string> = {
  home: 'The Serenity Haven — Luxury Wellness Experiences',
  packages: 'Wellness Packages — The Serenity Haven',
  contact: 'Contact Us — The Serenity Haven',
  retreat: '2-Day Wellness Retreat — The Serenity Haven',
};

function HomePage() {
  return (
    <>
      <Hero />
      <CorporateWellness />
      <Activities />
    </>
  );
}

// Fades `[data-reveal]` elements in as they scroll into view.
function useScrollReveal(key: string) {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)');
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);
}

function App() {
  const route = useHashRoute();

  useEffect(() => {
    document.title = PAGE_TITLES[route.page];
  }, [route.page]);

  // New page → start at the top; section link → scroll to that section.
  useEffect(() => {
    if (route.section) {
      const target = document.getElementById(route.section);
      if (target) {
        requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }));
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [route.page, route.section]);

  useScrollReveal(route.page);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f0]">
      <a
        href="#main"
        className="skip-link"
        onClick={e => { e.preventDefault(); document.getElementById('main')?.focus(); }}
      >
        Skip to content
      </a>
      <Header currentPage={route.page} />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {route.page === 'home' && <HomePage />}
        {route.page === 'packages' && <Packages />}
        {route.page === 'contact' && <ContactForm initialPackage={route.params.get('package') ?? ''} />}
        {route.page === 'retreat' && <WellnessRetreatBrochure onBack={() => { window.location.hash = 'packages'; }} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
