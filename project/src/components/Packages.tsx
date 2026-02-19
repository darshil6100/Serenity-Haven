import { Clock, Users, Target, Heart, Sparkles, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { useState, useRef } from 'react';
import Logo from './logo';

interface Package {
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
    title: "One Day Serenity Experience",
    subtitle: "A day to pause. A lifetime to breathe.",
    duration: "Full Day (Dawn to Dusk)",
    focus: "Stress Decompression & Mental Clarity",
    inclusions: [
      "Personalized Doctor consultation",
      "Morning Yoga and Breathwork",
      "Satvik & Balanced Meals",
      "Guided Meditation Sessions"
    ],
    complementary: [
      "Personalized Diet Plans from doctor",
      "Herbal welcome drink & detox tea"
    ],
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80",
    badge: "POPULAR"
  },
  {
    title: "Nourish And Revive Vitality Retreat",
    subtitle: "Reconnect with your inner rhythm.",
    duration: "2 Days, 1 Night",
    focus: "Lifestyle Reset with Relaxation & Recreation",
    inclusions: [
      "Resort-ambience living in our premium wellness suites",
      "Personalized Doctor consultation",
      "Satvik & Balanced Meals",
      "Morning Yoga and Breathwork",
      "Guided Meditation Sessions",
      "Fun Group Activities"
    ],
    complementary: [
      "Personalized Diet Plans from Doctor",
      "Acupuncture/Sujok therapy",
      "Health talks & wellness guidance",
      "Evening herbal detox drinks"
    ],
    addOns: ["Spa Therapies"],
    image: "https://images.unsplash.com/photo-1540206395-68808572332f?w=1200&q=80",
    badge: "BEST VALUE"
  },
  {
    title: "Detox & Rejuvenation Retreat",
    subtitle: "A profound transformation from the inside out.",
    duration: "3 Days, 2 Nights",
    focus: "Detoxification & Spiritual Alignment",
    inclusions: [
      "3 days of luxury living in a nature-centric environment",
      "Personalized Doctor consultation",
      "Satvik & Balanced Meals",
      "Morning Yoga and Breathwork",
      "Guided meditation sessions",
      "Fun Group Activities"
    ],
    complementary: [
      "Personalized Diet Plans from Doctor",
      "Acupuncture/Sujok therapy",
      "Health talks",
      "Detox welcome drink"
    ],
    addOns: ["Spa Therapies"],
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80"
  },
  {
    title: "Golden Years Grace - Retreat for Seniors",
    subtitle: "Longevity, dignity, and the art of aging well.",
    duration: "3 Days, 2 Nights",
    focus: "Mobility, Cognitive Health & Rejuvenation",
    inclusions: [
      "Luxury stay in a serene nature-centric environment",
      "Geriatric-focused health screening",
      "Satvik & Balanced Meals",
      "Morning Yoga and Breathwork",
      "Guided Meditation Sessions",
      "Fun Group Activities"
    ],
    complementary: [
      "Health talk on 'Graceful Aging and Preventive Care'",
      "Personalized Diet Plans from Doctor",
      "Detox welcome drink"
    ],
    image: "https://media.istockphoto.com/id/1445434749/photo/retirement-couple-and-running-fitness-health-for-body-and-heart-wellness-with-natural-ageing.webp?a=1&b=1&s=612x612&w=0&k=20&c=otDiC0z8MKD4DTFxPUOTRH_YWRRwVw7wCMyLjIlFiek="
  },
  {
    title: "Pain to Peace Trek",
    subtitle: "Conquer the trail, calm the mind.",
    duration: "2 Days, 1 Night",
    focus: "Team Synergy & Physical Endurance",
    inclusions: [
      "Guided moderate trek with mindful walking",
      "Premium wellness suite accommodation",
      "Personalized Doctor Consultation",
      "Morning Yoga & Breathwork",
      "Guided Meditation Sessions",
      "Satvik & Balanced Meals",
      "Fun Group Activities"
    ],
    complementary: [
      "Health talk & wellness guidance",
      "Personalized Diet Plans from Doctor",
      "Acupuncture/Sujok therapy"
    ],
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80"
  },
  {
    title: "Roots & Wings Retreat",
    subtitle: "Growing healthy, growing together.",
    duration: "3 Days, 2 Nights",
    focus: "Intergenerational Connection & Family Vitality",
    inclusions: [
      "Premium wellness suite stay",
      "Personalized Doctor Consultation",
      "Morning Yoga and Breathwork",
      "Satvik & Balanced Meals",
      "Guided Meditation Sessions",
      "Fun Group Activities"
    ],
    complementary: [
      "Health talk & wellness guidance",
      "Personalized Diet Plans from Doctor"
    ],
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=80",
    badge: "FAMILY"
  }
];

interface PackageCardProps {
  pkg: Package;
  index: number;
  onViewDetails: (pkg: Package) => void;
}

function PackagePreviewCard({ pkg, index, onViewDetails }: PackageCardProps) {
  return (
    <div 
      onClick={() => onViewDetails(pkg)}
      className="group relative h-full cursor-pointer"
    >
      {/* Organic Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-br from-[#b8a67d]/20 via-[#8b9d7c]/20 to-[#b8a67d]/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>

      <div className="relative bg-gradient-to-br from-[#f5f1e8] to-[#e8dcc4] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 h-full border border-[#d4c5a0]/30 flex flex-col">
        {/* Image Section */}
        <div className="relative h-72 overflow-hidden flex-shrink-0">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {/* Natural Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f16]/90 via-[#2d3e26]/40 to-transparent"></div>
          
          {pkg.badge && (
            <div className="absolute top-6 right-6 px-4 py-2 bg-gradient-to-r from-[#b8a67d] to-[#a89668] text-[#1a1f16] text-xs font-bold tracking-widest rounded-full shadow-lg backdrop-blur-sm">
              {pkg.badge}
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h3 className="text-3xl md:text-4xl font-serif text-[#f5f1e8] mb-2 leading-tight">
              {pkg.title}
            </h3>
          </div>
        </div>

        {/* Content Section - Preview Only */}
        <div className="p-8 bg-gradient-to-b from-[#f5f1e8] to-[#ede8dc] flex flex-col flex-grow">
          {/* Duration */}
          <div className="flex items-center gap-3 text-sm mb-4 pb-4 border-b border-[#b8a67d]/20">
            <div className="p-2 rounded-full bg-[#8b9d7c]/10">
              <Clock className="w-5 h-5 text-[#5a6d52]" />
            </div>
            <span className="text-[#3a4935] font-medium">{pkg.duration}</span>
          </div>

          {/* Wellness Focus */}
          <div className="flex items-start gap-3 flex-grow">
            <div className="p-2 rounded-full bg-[#b8a67d]/10 flex-shrink-0">
              <Target className="w-5 h-5 text-[#8b7d5e]" />
            </div>
            <div>
              <p className="text-xs text-[#5a6d52] font-semibold tracking-wider mb-2">WELLNESS FOCUS</p>
              <p className="text-[#2d3e26] font-medium leading-relaxed">{pkg.focus}</p>
            </div>
          </div>

          {/* View Details Button */}
          <button className="w-full mt-6 px-5 py-3 bg-gradient-to-r from-[#8b9d7c] to-[#5a6d52] hover:from-[#a0b18d] hover:to-[#6d8060] text-white text-sm font-bold tracking-wide transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

interface PackageDetailModalProps {
  pkg: Package | null;
  onClose: () => void;
}

function PackageDetailModal({ pkg, onClose }: PackageDetailModalProps) {
  if (!pkg) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto" onClick={onClose}>
      <div className="min-h-screen flex items-center justify-center p-4 py-8">
        <div 
          className="bg-gradient-to-br from-[#f5f1e8] to-[#ede8dc] rounded-2xl max-w-3xl w-full border border-[#d4c5a0]/30 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-[#d4c5a0]/20 rounded-full transition-all"
          >
            <X className="w-6 h-6 text-[#2d3e26]" />
          </button>

          {/* Image Section */}
          <div className="relative h-96 overflow-hidden rounded-t-2xl">
            <img
              src={pkg.image}
              alt={pkg.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f16]/80 via-[#2d3e26]/20 to-transparent"></div>
            
            {pkg.badge && (
              <div className="absolute top-6 right-6 px-4 py-2 bg-gradient-to-r from-[#b8a67d] to-[#a89668] text-[#1a1f16] text-xs font-bold tracking-widest rounded-full shadow-lg">
                {pkg.badge}
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h2 className="text-4xl md:text-5xl font-serif text-[#f5f1e8] font-light leading-tight">
                {pkg.title}
              </h2>
              <p className="text-[#d4c5a0] italic text-lg font-light mt-3">{pkg.subtitle}</p>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12">
            {/* Duration and Focus */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 pb-10 border-b border-[#b8a67d]/20">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-[#8b9d7c]/10 flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#5a6d52]" />
                </div>
                <div>
                  <p className="text-xs text-[#5a6d52] font-bold tracking-wider mb-2">DURATION</p>
                  <p className="text-lg text-[#2d3e26] font-medium">{pkg.duration}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-[#b8a67d]/10 flex-shrink-0">
                  <Target className="w-6 h-6 text-[#8b7d5e]" />
                </div>
                <div>
                  <p className="text-xs text-[#5a6d52] font-bold tracking-wider mb-2">WELLNESS FOCUS</p>
                  <p className="text-lg text-[#2d3e26] font-medium">{pkg.focus}</p>
                </div>
              </div>
            </div>

            {/* Inclusions */}
            <div className="mb-10 pb-10 border-b border-[#b8a67d]/20">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-6 h-6 text-[#b8a67d]" />
                <h3 className="text-xl font-bold text-[#2d3e26] tracking-wide">INCLUSIONS</h3>
              </div>
              <ul className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                {pkg.inclusions.map((inclusion, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#3a4935]">
                    <div className="w-2 h-2 rounded-full bg-[#8b9d7c] mt-2 flex-shrink-0"></div>
                    <span className="leading-relaxed">{inclusion}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Complementary */}
            <div className="mb-10 pb-10 border-b border-[#b8a67d]/20">
              <div className="flex items-center gap-2 mb-6">
                <Heart className="w-6 h-6 text-[#8b9d7c]" />
                <h3 className="text-xl font-bold text-[#2d3e26] tracking-wide">COMPLIMENTARY SERVICES</h3>
              </div>
              <ul className="space-y-3">
                {pkg.complementary.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#3a4935]">
                    <span className="text-[#8b9d7c] font-bold text-lg leading-none">✓</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Add-ons */}
            {pkg.addOns && pkg.addOns.length > 0 && (
              <div className="mb-10">
                <p className="text-sm font-bold text-[#8b7d5e] tracking-wider mb-3">ADD-ONS AVAILABLE</p>
                <p className="text-lg text-[#b8a67d] font-medium">{pkg.addOns.join(", ")}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 justify-between">
              <button
                onClick={onClose}
                className="px-8 py-3 text-sm font-medium text-[#5a6d52] border-2 border-[#8b9d7c]/30 hover:border-[#8b9d7c] hover:bg-[#8b9d7c]/5 transition-all duration-300 rounded-lg"
              >
                Go Back
              </button>
              <a
                href="#contact"
                className="group px-8 py-3 bg-gradient-to-r from-[#8b9d7c] to-[#5a6d52] hover:from-[#a0b18d] hover:to-[#6d8060] text-white text-sm font-bold tracking-wide transition-all duration-300 text-center rounded-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span>Inquire Now</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Packages() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemsPerView = 3;
  const totalPages = Math.ceil(packages.length / itemsPerView);

  const handleNext = () => {
    if (currentIndex < packages.length - itemsPerView + 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section id="packages" className="relative py-24 bg-gradient-to-b from-[#e8dcc4] via-[#f5f1e8] to-[#e8dcc4] overflow-hidden">
      {/* Organic Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
      </div>

      {/* Floating Leaves */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#8b9d7c] to-[#8b9d7c]"></div>
            <Logo className="w-8 h-8 text-[#8b9d7c] mx-4" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-[#8b9d7c] to-[#8b9d7c]"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif font-light text-[#2d3e26] mb-6 leading-tight">
            Our Wellness Packages
          </h2>
          <p className="text-lg md:text-xl text-[#5a6d52] max-w-3xl mx-auto leading-relaxed font-light">
            Experience transformative wellness journeys designed to restore balance, vitality, and inner peace
          </p>
        </div>

        {/* Horizontal Scrolling Carousel */}
        <div className="relative mb-20">
          {/* Arrow Buttons */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#8b9d7c] text-white hover:bg-[#a0b18d] disabled:bg-[#d4c5a0]/40 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex >= packages.length - itemsPerView + 1}
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#8b9d7c] text-white hover:bg-[#a0b18d] disabled:bg-[#d4c5a0]/40 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Container */}
          <div ref={scrollContainerRef} className="overflow-hidden">
            <div
              className="flex gap-8 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {packages.map((pkg, index) => (
                <div key={index} className="flex-shrink-0 w-full md:w-1/3">
                  <PackagePreviewCard pkg={pkg} index={index} onViewDetails={setSelectedPackage} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === Math.floor(currentIndex / itemsPerView)
                    ? 'bg-[#8b9d7c] w-8'
                    : 'bg-[#8b9d7c]/30 w-2 hover:bg-[#8b9d7c]/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Custom Package CTA */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#8b9d7c]/20 to-[#b8a67d]/20 rounded-3xl blur-2xl"></div>
          <div className="relative bg-gradient-to-br from-[#2d3e26] to-[#3a4935] rounded-2xl p-12 md:p-16 text-center border border-[#b8a67d]/20 overflow-hidden">
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
            
            
            <h3 className="text-4xl md:text-5xl font-serif text-[#f5f1e8] mb-4 font-light">Custom Package Available</h3>
            <p className="text-lg md:text-xl text-[#d4c5a0] mb-8 max-w-2xl mx-auto leading-relaxed font-light">
              Don't see exactly what you're looking for? Our wellness experts can create a personalized package tailored to your unique needs and preferences.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#b8a67d] to-[#a89668] hover:from-[#c9b888] hover:to-[#b8a67d] text-[#1a1f16] font-bold tracking-wider transition-all duration-500 shadow-2xl hover:shadow-[#b8a67d]/30 rounded-lg group"
            >
              <span>Request Custom Package</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <PackageDetailModal pkg={selectedPackage} onClose={() => setSelectedPackage(null)} />

      <style>{`
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float-gentle { animation: float-gentle 8s ease-in-out infinite; }
        .animate-slide-down { animation: slide-down 0.3s ease-out; }
      `}</style>
    </section>
  );
}