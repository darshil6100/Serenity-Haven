import { useState } from 'react';
import { X, Clock, Target, ChevronRight } from 'lucide-react';

interface Package {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  focus: string;
  inclusions: string[];
  complementary: string[];
  addOns?: string[];
  image: string;
  badge?: string;
}

const packages: Package[] = [
  {
    id: 'pkg1',
    title: 'One Day Serenity Experience',
    subtitle: 'A day to pause. A lifetime to breathe.',
    duration: 'Full Day (Dawn to Dusk)',
    focus: 'Stress Decompression & Mental Clarity',
    inclusions: ['Personalized Doctor consultation', 'Morning Yoga and Breathwork', 'Satvik & Balanced Meals', 'Guided Meditation Sessions'],
    complementary: ['Personalized Diet Plans from doctor', 'Herbal welcome drink & detox tea'],
    addOns: [],
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80',
    badge: 'POPULAR',
  },
  {
    id: 'pkg2',
    title: 'Nourish & Revive Vitality Retreat',
    subtitle: 'Reconnect with your inner rhythm.',
    duration: '2 Days, 1 Night',
    focus: 'Lifestyle Reset with Relaxation & Recreation',
    inclusions: ['Resort-ambience premium wellness suites', 'Personalized Doctor consultation', 'Satvik & Balanced Meals', 'Morning Yoga and Breathwork', 'Guided Meditation Sessions', 'Fun Group Activities'],
    complementary: ['Personalized Diet Plans from Doctor', 'Acupuncture/Sujok therapy', 'Health talks & wellness guidance', 'Evening herbal detox drinks'],
    addOns: ['Spa Therapies'],
    image: 'https://images.unsplash.com/photo-1540206395-68808572332f?w=900&q=80',
    badge: 'BEST VALUE',
  },
  {
    id: 'pkg3',
    title: 'Detox & Rejuvenation Retreat',
    subtitle: 'A profound transformation from the inside out.',
    duration: '3 Days, 2 Nights',
    focus: 'Detoxification & Spiritual Alignment',
    inclusions: ['3 days luxury nature-centric living', 'Personalized Doctor consultation', 'Satvik & Balanced Meals', 'Morning Yoga and Breathwork', 'Guided meditation sessions', 'Fun Group Activities'],
    complementary: ['Personalized Diet Plans from Doctor', 'Acupuncture/Sujok therapy', 'Health talks', 'Detox welcome drink'],
    addOns: ['Spa Therapies'],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=900&q=80',
  },
  {
    id: 'pkg4',
    title: 'Golden Years Grace',
    subtitle: 'Longevity, dignity, and the art of aging well.',
    duration: '3 Days, 2 Nights',
    focus: 'Mobility, Cognitive Health & Rejuvenation',
    inclusions: ['Luxury serene nature-centric stay', 'Geriatric-focused health screening', 'Satvik & Balanced Meals', 'Morning Yoga and Breathwork', 'Guided Meditation Sessions', 'Fun Group Activities'],
    complementary: ['Health talk on Graceful Aging & Preventive Care', 'Personalized Diet Plans from Doctor', 'Detox welcome drink'],
    addOns: [],
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=900&q=80',
  },
  {
    id: 'pkg5',
    title: 'Pain to Peace Trek',
    subtitle: 'Conquer the trail, calm the mind.',
    duration: '2 Days, 1 Night',
    focus: 'Team Synergy & Physical Endurance',
    inclusions: ['Guided mindful moderate trek', 'Premium wellness suite accommodation', 'Personalized Doctor Consultation', 'Morning Yoga & Breathwork', 'Guided Meditation Sessions', 'Satvik & Balanced Meals', 'Fun Group Activities'],
    complementary: ['Health talk & wellness guidance', 'Personalized Diet Plans from Doctor', 'Acupuncture/Sujok therapy'],
    addOns: [],
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=900&q=80',
  },
  {
    id: 'pkg6',
    title: 'Roots & Wings Retreat',
    subtitle: 'Growing healthy, growing together.',
    duration: '3 Days, 2 Nights',
    focus: 'Intergenerational Connection & Family Vitality',
    inclusions: ['Premium wellness suite stay', 'Personalized Doctor Consultation', 'Morning Yoga and Breathwork', 'Satvik & Balanced Meals', 'Guided Meditation Sessions', 'Fun Group Activities'],
    complementary: ['Health talk & wellness guidance', 'Personalized Diet Plans from Doctor'],
    addOns: [],
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=900&q=80',
    badge: 'FAMILY',
  },
];

function PackageCard({ pkg, onOpen }: { pkg: Package; onOpen: (p: Package) => void }) {
  return (
    <div
      className="pkg-card group relative bg-[#fffdf8] rounded-2xl overflow-hidden border border-[#c9a96e]/15 shadow-[0_4px_30px_rgba(45,62,38,0.06)] hover:shadow-[0_20px_60px_rgba(45,62,38,0.14)] hover:border-[#c9a96e]/35 hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col"
      onClick={() => onOpen(pkg)}
    >
      {/* Image */}
      <div className="relative h-60 overflow-hidden flex-shrink-0">
        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-700" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2419]/88 via-[#1a2419]/30 to-transparent" />
        {pkg.badge && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-[#c9a96e] to-[#b8924e] text-[#1a2419] text-[0.6rem] font-bold tracking-[0.2em] px-3 py-1.5 rounded-full uppercase">
            {pkg.badge}
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="font-light text-[#faf7f0] text-[1.5rem] leading-tight mb-1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            {pkg.title}
          </h3>
          <p className="text-[#e8d5a8]/75 text-[0.82rem] italic" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            {pkg.subtitle}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-wrap gap-3 mb-5 pb-5 border-b border-[#c9a96e]/15">
          <div className="flex items-center gap-2 text-[0.73rem] text-[#4a5e42]">
            <div className="w-7 h-7 rounded-lg bg-[#7a9b74]/10 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5 text-[#7a9b74]" />
            </div>
            {pkg.duration}
          </div>
          <div className="flex items-center gap-2 text-[0.73rem] text-[#4a5e42]">
            <div className="w-7 h-7 rounded-lg bg-[#c9a96e]/10 flex items-center justify-center">
              <Target className="w-3.5 h-3.5 text-[#c9a96e]" />
            </div>
            <span className="truncate max-w-[150px]">{pkg.focus.split('&')[0].trim()}</span>
          </div>
        </div>

        <div className="flex-1 mb-5">
          <p className="text-[0.62rem] font-semibold tracking-[0.2em] text-[#7a9b74] uppercase mb-3">What's Included</p>
          <ul className="space-y-2">
            {pkg.inclusions.slice(0, 4).map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[0.82rem] text-[#4a5e42] font-light leading-snug">
                <span className="text-[#c9a96e] text-[0.55rem] mt-[5px] flex-shrink-0">✦</span>
                {item}
              </li>
            ))}
            {pkg.inclusions.length > 4 && (
              <li className="text-[0.73rem] text-[#c9a96e] italic pl-4">+{pkg.inclusions.length - 4} more included...</li>
            )}
          </ul>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#c9a96e]/12">
          <button
            onClick={e => { e.stopPropagation(); onOpen(pkg); }}
            className="text-[0.7rem] text-[#c9a96e] underline underline-offset-2 decoration-transparent hover:decoration-[#c9a96e] transition-all font-light"
          >
            View All Details
          </button>
          <a
            href="#contact"
            onClick={e => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#2d3e26] to-[#3a4d30] text-[#e8d5a8] text-[0.68rem] font-medium tracking-[0.12em] uppercase hover:from-[#3a4d30] hover:to-[#7a9b74] transition-all duration-300"
          >
            Inquire <ChevronRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

function PackageModal({ pkg, onClose }: { pkg: Package | null; onClose: () => void }) {
  if (!pkg) return null;
  return (
    <div
      className="fixed inset-0 bg-[#0a1209]/85 backdrop-blur-xl z-[2000] flex items-center justify-center p-4 md:p-8"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-[#fffdf8] rounded-3xl w-full max-w-2xl max-h-[88vh] overflow-y-auto shadow-[0_40px_120px_rgba(0,0,0,0.4)] border border-[#c9a96e]/20 animate-modal-in">
        <div className="relative h-64 overflow-hidden rounded-t-3xl">
          <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a2419]/88 via-[#1a2419]/30 to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0a1209]/60 backdrop-blur-sm border border-[#c9a96e]/30 flex items-center justify-center text-[#e8d5a8] hover:rotate-90 transition-all duration-300">
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-5 left-6 right-6">
            <h2 className="font-light text-[#faf7f0] text-2xl leading-tight mb-1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{pkg.title}</h2>
            <p className="italic text-[#e8d5a8] text-sm" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{pkg.subtitle}</p>
          </div>
        </div>
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#7a9b74]/08 border border-[#7a9b74]/15 text-[#4a5e42] text-[0.78rem]">🕐 {pkg.duration}</span>
            <span className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#c9a96e]/08 border border-[#c9a96e]/15 text-[#4a5e42] text-[0.78rem]">🎯 {pkg.focus}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-[0.62rem] font-semibold tracking-[0.25em] text-[#7a9b74] uppercase mb-3">What's Included</h4>
              <ul className="space-y-2.5">
                {pkg.inclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[0.84rem] text-[#4a5e42] leading-snug font-light">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[0.62rem] font-semibold tracking-[0.25em] text-[#7a9b74] uppercase mb-3">Complimentary</h4>
              <ul className="space-y-2.5">
                {pkg.complementary.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[0.84rem] text-[#4a5e42] leading-snug font-light">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7a9b74] mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {pkg.addOns && pkg.addOns.length > 0 && (
            <div className="p-4 rounded-xl bg-[#c9a96e]/06 border border-[#c9a96e]/15 mb-6">
              <p className="text-[0.6rem] tracking-[0.2em] text-[#c9a96e] uppercase font-semibold mb-1">Add-Ons Available</p>
              <p className="text-[0.88rem] text-[#4a5e42] font-light">{pkg.addOns.join(', ')}</p>
            </div>
          )}
          <div className="flex items-center justify-end gap-3 pt-5 border-t border-[#c9a96e]/15">
            <button onClick={onClose} className="px-6 py-2.5 border border-[#c9a96e]/25 rounded-xl text-[#4a5e42] text-[0.75rem] hover:border-[#c9a96e] transition-all duration-300">
              Go Back
            </button>
            <a href="#contact" onClick={onClose} className="inline-flex items-center gap-2 px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#c9a96e] to-[#b8924e] text-[#1a2419] text-[0.75rem] font-semibold tracking-[0.12em] uppercase shadow-lg shadow-[#c9a96e]/25 hover:-translate-y-0.5 transition-all duration-300">
              Inquire Now <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes modal-in { from { opacity:0; transform:translateY(24px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
        .animate-modal-in { animation: modal-in 0.4s cubic-bezier(0.16,1,0.3,1) both; }
      `}</style>
    </div>
  );
}

export default function Packages() {
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);

  return (
    <section id="packages" className="relative py-28 bg-gradient-to-b from-[#f0e8d4] via-[#faf7f0] to-[#f0e8d4] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-10 bg-[#7a9b74]" />
            <span className="text-[0.65rem] font-medium tracking-[0.3em] text-[#7a9b74] uppercase">Wellness Journeys</span>
            <div className="h-px w-10 bg-[#7a9b74]" />
          </div>
          <h2 className="font-light text-[#2d3e26] text-[clamp(2.8rem,6vw,5rem)] leading-[1.1] mb-5" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Our Wellness <em className="not-italic italic text-[#4a5e42]">Packages</em>
          </h2>
          <p className="text-[1rem] text-[#4a5e42] font-light max-w-2xl mx-auto leading-relaxed">
            Transformative experiences designed to restore balance, vitality, and inner peace — each one a journey to a better you.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {packages.map(pkg => <PackageCard key={pkg.id} pkg={pkg} onOpen={setSelectedPkg} />)}
        </div>

        {/* Custom Package Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(10,18,9,0.15)] border border-[#c9a96e]/15">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative bg-[#1a2419] p-12 md:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-6 bg-[#a8c4a0]" />
                <span className="text-[0.62rem] font-medium tracking-[0.3em] text-[#a8c4a0] uppercase">Bespoke Experience</span>
              </div>
              <h3 className="font-light text-[#faf7f0] text-[2.4rem] leading-[1.15] mb-5" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                Custom Package Available
              </h3>
              <p className="text-[#c9a96e]/70 text-[0.9rem] leading-[1.9] font-light mb-8">
                Don't see exactly what you're looking for? Our wellness experts craft personalized retreats tailored to your unique needs and health goals.
              </p>
              <a href="#contact" className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#c9a96e] to-[#b8924e] text-[#1a2419] text-[0.73rem] font-semibold tracking-[0.18em] uppercase shadow-lg shadow-[#c9a96e]/30 hover:shadow-[#c9a96e]/50 hover:-translate-y-1 transition-all duration-300 w-fit">
                Request Custom Package
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <div className="relative min-h-[320px]">
              <img src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1000&q=80" alt="Custom Wellness" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a2419]/60 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {selectedPkg && <PackageModal pkg={selectedPkg} onClose={() => setSelectedPkg(null)} />}
    </section>
  );
}