import { Phone, Mail, Heart } from 'lucide-react';
import Logo from './logo';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#1a1f16] to-[#0f120d] text-[#d4c5a0] overflow-hidden">
      {/* Organic Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
      </div>

      {/* Decorative Top Border */}
      <div className="relative h-1 bg-gradient-to-r from-transparent via-[#b8a67d] to-transparent"></div>

      {/* Floating Logos */}
      <div className="absolute top-20 right-10 opacity-5 pointer-events-none">
        <Logo className="w-40 h-40 animate-float-slow" />
      </div>
      <div className="absolute bottom-20 left-10 opacity-5 pointer-events-none">
        <Logo className="w-32 h-32 animate-float-medium" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div>
                <Logo className="w-10 h-10 brightness-0 invert" />
                <h3 className="text-2xl font-serif text-[#f5f1e8] mb-1">The Serenity Haven</h3>
                <div className="flex items-center gap-2">
                </div>
              </div>
            </div>
            <p className="text-sm text-[#b8a67d]/80 italic leading-relaxed font-light">
              Where wellness transforms into a way of life, and nature restores the soul.
            </p>
            <div className="flex items-center gap-2 text-[#8b9d7c]">
              <Heart className="w-5 h-5" />
              <span className="text-xs tracking-wider">Crafted with care for your wellbeing</span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-[#f5f1e8] flex items-center gap-2">
              <div className="h-px w-8 bg-gradient-to-r from-[#b8a67d] to-transparent"></div>
              Contact Information
            </h4>
            <div className="space-y-4">
              <div className="group flex items-start gap-4 p-4 bg-[#2d3e26]/20 rounded-xl border border-[#8b9d7c]/10 hover:border-[#8b9d7c]/30 transition-all duration-300">
                <div className="p-2 bg-[#8b9d7c]/10 rounded-lg group-hover:bg-[#8b9d7c]/20 transition-colors">
                  <Phone className="w-5 h-5 text-[#b8a67d]" />
                </div>
                <div>
                  <p className="text-xs text-[#8b9d7c] font-semibold mb-1 tracking-wider">PHONE</p>
                  <a 
                    href="tel:9974542678" 
                    className="text-[#d4c5a0] hover:text-[#f5f1e8] transition-colors font-medium"
                  >
                    9974542678
                  </a>
                </div>
              </div>

              <div className="group flex items-start gap-4 p-4 bg-[#2d3e26]/20 rounded-xl border border-[#8b9d7c]/10 hover:border-[#8b9d7c]/30 transition-all duration-300">
                <div className="p-2 bg-[#b8a67d]/10 rounded-lg group-hover:bg-[#b8a67d]/20 transition-colors">
                  <Mail className="w-5 h-5 text-[#b8a67d]" />
                </div>
                <div>
                  <p className="text-xs text-[#8b9d7c] font-semibold mb-1 tracking-wider">EMAIL</p>
                  <a 
                    href="mailto:support@serenityhaven.in" 
                    className="text-[#d4c5a0] hover:text-[#f5f1e8] transition-colors font-medium break-all"
                  >
                    support@serenityhaven.in
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Our Promise */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-[#f5f1e8] flex items-center gap-2">
              <div className="h-px w-8 bg-gradient-to-r from-[#b8a67d] to-transparent"></div>
              Our Promise
            </h4>
            <div className="p-6 bg-gradient-to-br from-[#2d3e26]/30 to-[#3a4935]/20 rounded-xl border border-[#8b9d7c]/10">
              <p className="text-sm text-[#d4c5a0]/90 leading-relaxed font-light">
                At Serenity Haven, we're committed to providing transformative wellness experiences that nurture your mind, body, and soul in a sanctuary of natural beauty.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-[#8b9d7c] animate-pulse-slow"></div>
              <div className="w-2 h-2 rounded-full bg-[#8b9d7c] animate-pulse-slow" style={{ animationDelay: '0.3s' }}></div>
              <div className="w-2 h-2 rounded-full bg-[#8b9d7c] animate-pulse-slow" style={{ animationDelay: '0.6s' }}></div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#8b9d7c]/30 to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <p className="text-sm text-[#b8a67d]/70 font-light">
              &copy; {new Date().getFullYear()} The Serenity Haven. All rights reserved.
            </p>
          </div>
          <p className="text-sm text-[#b8a67d]/70 italic font-light text-center md:text-right">
            Luxury Wellness Experiences Curated for the Mind, Body & Soul
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(5deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 8s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
      `}</style>
    </footer>
  );
}