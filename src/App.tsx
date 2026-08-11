import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Header from './components/Header';
import Packages from './components/Packages';
import Activities from './components/Activities';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import CorporateWellness from './components/CorporateWellness';

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

function PackagesPage() {
  return (
    <>
      <Packages />
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

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'packages' | 'contact'>('home');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [currentPage]);

  return (
    <div className="min-h-screen">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'packages' && <PackagesPage />}
      {currentPage === 'contact' && <ContactPage />}
    </div>
  );
}

export default App;
