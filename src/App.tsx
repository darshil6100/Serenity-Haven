import Hero from './components/Hero';
import Packages from './components/Packages';
import Activities from './components/Activities';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import CorporateWellness from './components/CorporateWellness';

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <CorporateWellness />
      <Packages />
      <Activities />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;
