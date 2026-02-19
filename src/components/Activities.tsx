import { ChevronRight } from 'lucide-react';

interface ActivityCategory {
  title: string;
  emoji: string;
  subtitle: string;
  activities: string[];
  wide?: boolean;
}

const activityCategories: ActivityCategory[] = [
  {
    title: 'Meditation',
    emoji: '🧘',
    subtitle: 'Transform your mind and spirit',
    activities: ['Omkara Meditation', 'Soham Meditation', 'Chakra Activations', 'Guided Meditations'],
  },
  {
    title: 'Yoga',
    emoji: '🌿',
    subtitle: 'Balance body and soul',
    activities: ['Hatha Yoga', 'Gentle Stretch & Mobility Yoga', 'Pranayama & Breathwork', 'Guided Yoga Sessions'],
  },
  {
    title: 'Adventures',
    emoji: '🌲',
    subtitle: 'Reconnect with nature',
    activities: ['Group Hiking', 'Forest Bathing Experiences', 'Mindful Walking Trails'],
  },
  {
    title: 'Spa Therapies',
    emoji: '✨',
    subtitle: 'Rejuvenate and restore your complete being',
    activities: ['Abhyagam Therapy', 'Swedish Massage', 'Belinish Treatment', 'Aromatherapy', 'Deep Tissue Massage'],
    wide: true,
  },
  {
    title: 'Playful Activities',
    emoji: '🎶',
    subtitle: 'Celebrate life together',
    activities: ['Bonfire Under the Stars', 'Moon Gazing', 'Musical Nights', 'Garden Walks', 'Memory & Cognitive Wellness Games', 'Indoor & Outdoor Recreational Activities'],
  },
];

const highlights = [
  {
    emoji: '🌬️',
    title: 'Mindful Practices',
    description: 'Meditation, yoga, and breathwork sessions designed to center your mind and calm your spirit',
  },
  {
    emoji: '🌳',
    title: 'Nature Immersion',
    description: 'Forest bathing, hiking trails, and garden experiences that reconnect you with the natural world',
  },
  {
    emoji: '💆',
    title: 'Holistic Wellness',
    description: 'Spa therapies, therapeutic treatments, and wellness sessions for complete rejuvenation',
  },
];

export default function Activities() {
  return (
    <section id="activities" className="relative py-28 bg-[#f0e8d4] overflow-hidden">
      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-10 bg-[#7a9b74]" />
            <span className="text-[0.65rem] font-medium tracking-[0.3em] text-[#7a9b74] uppercase">
              Transformative Experiences
            </span>
            <div className="h-px w-10 bg-[#7a9b74]" />
          </div>
          <h2
            className="font-light text-[#2d3e26] text-[clamp(2.8rem,6vw,5rem)] leading-[1.1] mb-5"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Activities at{' '}
            <em className="not-italic italic text-[#4a5e42]">Serenity Haven</em>
          </h2>
          <p className="text-[1rem] text-[#4a5e42] font-light max-w-2xl mx-auto leading-relaxed">
            Immerse yourself in transformative experiences designed to nourish your mind, body, and spirit. Deepen your journey. Connect, create, and rejuvenate.
          </p>
        </div>

        {/* Activities Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {activityCategories.map((cat, i) => (
            <div
              key={i}
              className={`act-card group relative bg-[#fffdf8] rounded-2xl p-7 border border-[#c9a96e]/12 shadow-[0_2px_20px_rgba(45,62,38,0.04)] hover:shadow-[0_16px_50px_rgba(45,62,38,0.10)] hover:-translate-y-1.5 hover:border-[#c9a96e]/25 transition-all duration-400 overflow-hidden${cat.wide ? ' md:col-span-2' : ''}`}
            >
              {/* Accent top bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#7a9b74] to-[#c9a96e] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400 rounded-t-2xl" />

              {/* Icon */}
              <div className="w-13 h-13 w-[52px] h-[52px] rounded-xl bg-gradient-to-br from-[#7a9b74]/12 to-[#7a9b74]/04 border border-[#7a9b74]/15 flex items-center justify-center text-[1.35rem] mb-5 group-hover:bg-gradient-to-br group-hover:from-[#c9a96e]/20 group-hover:to-[#c9a96e]/08 group-hover:border-[#c9a96e]/30 transition-all duration-300">
                {cat.emoji}
              </div>

              <h3
                className="text-[#2d3e26] text-[1.55rem] font-light leading-tight mb-1.5"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {cat.title}
              </h3>
              <p className="italic text-[#c9a96e] text-[0.85rem] mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                {cat.subtitle}
              </p>

              <div className="flex flex-wrap gap-2">
                {cat.activities.map((act, j) => (
                  <span
                    key={j}
                    className="text-[0.72rem] text-[#4a5e42] bg-[#7a9b74]/08 border border-[#7a9b74]/15 px-3 py-1.5 rounded-full font-light"
                  >
                    {act}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Featured Experience Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(10,18,9,0.15)] border border-[#c9a96e]/15 mb-14">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="relative min-h-[350px] order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1545389336-cf090694435e?w=1000&q=80"
                alt="Wellness Experience"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent md:bg-gradient-to-r md:from-[#1a2419]/0 md:to-[#1a2419]/60" />
            </div>

            {/* Text */}
            <div className="relative bg-[#1a2419] p-12 md:p-14 flex flex-col justify-center order-1 md:order-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-6 bg-[#a8c4a0]" />
                <span className="text-[0.62rem] font-medium tracking-[0.3em] text-[#a8c4a0] uppercase">
                  Featured Experience
                </span>
              </div>
              <h3
                className="font-light text-[#faf7f0] text-[2.2rem] md:text-[2.5rem] leading-[1.15] mb-5"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Lifestyle Reset with Luxury & Recreation
              </h3>
              <p className="text-[#c9a96e]/70 text-[0.9rem] leading-[1.9] font-light mb-8">
                Combine rejuvenating wellness practices with recreational activities that bring joy and connection. Whether you seek adventure or tranquility, our curated selection ensures a balanced and fulfilling experience.
              </p>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#c9a96e] to-[#b8924e] text-[#1a2419] text-[0.73rem] font-semibold tracking-[0.18em] uppercase shadow-lg shadow-[#c9a96e]/30 hover:shadow-[#c9a96e]/50 hover:-translate-y-1 transition-all duration-300 w-fit"
              >
                Learn More
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {highlights.map((h, i) => (
            <div
              key={i}
              className="group bg-[#fffdf8] rounded-2xl p-7 border border-[#c9a96e]/12 hover:border-[#c9a96e]/30 hover:shadow-[0_14px_40px_rgba(45,62,38,0.09)] hover:-translate-y-1 transition-all duration-400"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2d3e26] to-[#3a4d30] flex items-center justify-center text-[1.5rem] mb-5 shadow-lg group-hover:scale-110 transition-transform duration-400">
                {h.emoji}
              </div>
              <h4
                className="text-[#2d3e26] text-[1.25rem] font-light mb-2.5"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {h.title}
              </h4>
              <p className="text-[#4a5e42] text-[0.84rem] leading-relaxed font-light">{h.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}