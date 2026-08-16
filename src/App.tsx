import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Header from './components/Header';
import Packages from './components/Packages';
import Activities from './components/Activities';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import CorporateWellness from './components/CorporateWellness';
import WellnessRetreatBrochure from './components/WellnessRetreatBrochure';

type Page = 'home' | 'packages' | 'contact' | 'brochure';

function HomePage() {
  return (
    <>
      <Hero />
      <CorporateWellness />
      <Activities />
      <Footer />
    </>
  );
}

function PackagesPage({ onViewDetails }: { onViewDetails: () => void }) {
  return (
    <>
      <Packages onViewDetails={onViewDetails} />
      <Footer />
    </>
  );
}

function ContactPage() {
  return (
    <>
      <ContactForm />
      <Footer />
    </>
  );
}

function PackageViewPage({ onBack }: { onBack: () => void }) {
  return (
    <>
      <WellnessRetreatBrochure onBack={onBack} />
      <Footer />
    </>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [currentPage]);

  return (
    <div className="min-h-screen">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'packages' && <PackagesPage onViewDetails={() => setCurrentPage('brochure')} />}
      {currentPage === 'contact' && <ContactPage />}
      {currentPage === 'brochure' && <PackageViewPage onBack={() => setCurrentPage('packages')} />}
    </div>
  );
}

export default App;
