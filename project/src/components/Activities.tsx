import { Music, Trees, Users as UsersIcon, Sparkles, Heart, Wind, Leaf } from 'lucide-react';

interface ActivityCategory {
  title: string;
  icon: React.ReactNode;
  description: string;
  activities: string[];
  gradient: string;
  iconBg: string;
}

const activityCategories: ActivityCategory[] = [
  {
    title: "Meditation",
    icon: <Wind className="w-8 h-8" />,
    description: "Transform your mind and spirit",
    activities: [
      "Omkara Meditation",
      "Soham Meditation",
      "Chakra Activations",
      "Guided Meditations"
    ],
    gradient: "from-[#7a9b76] to-[#5a7d56]",
    iconBg: "bg-[#7a9b76]/10"
  },
  {
    title: "Yoga",
    icon: <Heart className="w-8 h-8" />,
    description: "Balance body and soul",
    activities: [
      "Hatha Yoga",
      "Gentle Stretch & Mobility Yoga",
      "Pranayama & Breathwork",
      "Guided Yoga Sessions"
    ],
    gradient: "from-[#8b9d7c] to-[#6d8060]",
    iconBg: "bg-[#8b9d7c]/10"
  },
  {
    title: "Adventures",
    icon: <Trees className="w-8 h-8" />,
    description: "Reconnect with nature",
    activities: [
      "Group Hiking",
      "Forest Bathing Experiences",
      "Mindful Walking Trails"
    ],
    gradient: "from-[#5a7d56] to-[#3f5c3c]",
    iconBg: "bg-[#5a7d56]/10"
  },
  {
    title: "Spa Therapies",
    icon: <Sparkles className="w-8 h-8" />,
    description: "Rejuvenate and restore",
    activities: [
      "Abhyagam Therapy",
      "Swedish Massage",
      "Belinish Treatment",
      "Aromatherapy",
      "Deep Tissue Massage"
    ],
    gradient: "from-[#b8a67d] to-[#a89668]",
    iconBg: "bg-[#b8a67d]/10"
  },
  {
    title: "Play Full Activities",
    icon: <UsersIcon className="w-8 h-8" />,
    description: "Celebrate life together",
    activities: [
      "Bonfire Under the Stars",
      "Moon Gazing",
      "Musical Nights",
      "Garden Walks",
      "Memory & Cognitive Wellness Games",
      "Indoor & Outdoor Recreational Activities"
    ],
    gradient: "from-[#c9b888] to-[#b8a67d]",
    iconBg: "bg-[#c9b888]/10"
  }
];

interface ActivityCardProps {
  category: ActivityCategory;
  index: number;
}

function ActivityCard({ category, index }: ActivityCardProps) {
  return (
    <div className="group relative h-full">
      {/* Glow Effect on Hover */}
      <div className={`absolute -inset-1 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 transition-all duration-700 blur-xl rounded-2xl`}></div>

      <div className="relative bg-gradient-to-br from-[#f5f1e8] to-[#ede8dc] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full p-8 border border-[#d4c5a0]/30">
        {/* Icon with Organic Background */}
        <div className={`inline-flex p-4 rounded-2xl ${category.iconBg} backdrop-blur-sm mb-6 group-hover:scale-110 transition-transform duration-500`}>
          <div className={`text-[#2d3e26]`}>
            {category.icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-serif font-light text-[#2d3e26] mb-3 group-hover:text-[#3a4935] transition-colors">
          {category.title}
        </h3>

        {/* Description */}
        <p className={`bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent text-sm font-medium italic mb-6`}>
          {category.description}
        </p>

        {/* Activities List */}
        <ul className="space-y-3">
          {category.activities.map((activity, idx) => (
            <li key={idx} className="flex items-start gap-3 group/item">
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.gradient} mt-2 flex-shrink-0 group-hover/item:scale-125 transition-transform`}></div>
              <span className="text-[#3a4935] text-sm leading-relaxed font-light">
                {activity}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Activities() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#f5f1e8] via-[#e8dcc4] to-[#f5f1e8] overflow-hidden">
      {/* Nature Background with Parallax */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
      </div>

      {/* Floating Leaves */}
      <div className="absolute top-40 right-10 text-[#8b9d7c]/10 pointer-events-none">
        <Leaf className="w-32 h-32 animate-float-slow" />
      </div>
      <div className="absolute bottom-20 left-20 text-[#b8a67d]/10 pointer-events-none">
        <Leaf className="w-24 h-24 animate-float-medium" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#8b9d7c] to-[#8b9d7c]"></div>
            <Sparkles className="w-8 h-8 text-[#8b9d7c] mx-4 animate-pulse-slow" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-[#8b9d7c] to-[#8b9d7c]"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif font-light text-[#2d3e26] mb-6 leading-tight">
            Activities at Serenity Haven
          </h2>
          <p className="text-lg md:text-xl text-[#5a6d52] max-w-3xl mx-auto leading-relaxed font-light">
            Immerse yourself in transformative experiences designed to nourish your mind, body, and spirit. Deepen your journey. Connect, create, and rejuvenate.
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {activityCategories.map((category, index) => (
            <ActivityCard key={index} category={category} index={index} />
          ))}
        </div>

        {/* Featured Experience Section */}
        <div className="relative mb-20">
          <div className="absolute -inset-2 bg-gradient-to-r from-[#8b9d7c]/20 to-[#b8a67d]/20 rounded-3xl blur-2xl"></div>
          <div className="relative bg-gradient-to-br from-[#2d3e26] to-[#3a4935] rounded-2xl overflow-hidden shadow-2xl border border-[#b8a67d]/20">
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative p-10 md:p-14 text-white flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <Music className="w-7 h-7 text-[#d4c5a0]" />
                  <span className="text-[#d4c5a0] font-bold tracking-widest text-sm">FEATURED EXPERIENCE</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-serif font-light mb-6 leading-tight text-[#f5f1e8]">
                  Lifestyle Reset with Luxury & Recreation
                </h3>
                <p className="text-[#d4c5a0] text-lg leading-relaxed mb-8 font-light">
                  Combine rejuvenating wellness practices with recreational activities that bring joy and connection. Whether you seek adventure or tranquility, movement or meditation, our curated selection ensures a balanced and fulfilling experience.
                </p>
                <a
                  href="#contact"
                  className="group w-fit px-10 py-4 bg-gradient-to-r from-[#b8a67d] to-[#a89668] hover:from-[#c9b888] hover:to-[#b8a67d] text-[#1a1f16] font-bold tracking-wide transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-[#b8a67d]/30 rounded-lg flex items-center gap-2"
                >
                  <span>Learn More</span>
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </a>
              </div>

              <div className="relative h-96 md:h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200&q=80" 
                  alt="Wellness Experience"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#2d3e26]/40 to-[#2d3e26]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Wind className="w-8 h-8" />,
              title: "Mindful Practices",
              description: "Meditation, yoga, and breathwork sessions designed to center your mind and calm your spirit",
              gradient: "from-[#7a9b76] to-[#5a7d56]"
            },
            {
              icon: <Trees className="w-8 h-8" />,
              title: "Nature Immersion",
              description: "Forest bathing, hiking trails, and garden experiences that reconnect you with the natural world",
              gradient: "from-[#5a7d56] to-[#3f5c3c]"
            },
            {
              icon: <Heart className="w-8 h-8" />,
              title: "Holistic Wellness",
              description: "Spa therapies, therapeutic treatments, and wellness sessions for complete rejuvenation",
              gradient: "from-[#b8a67d] to-[#a89668]"
            }
          ].map((highlight, idx) => (
            <div
              key={idx}
              className="group relative bg-gradient-to-br from-[#f5f1e8] to-[#ede8dc] border border-[#d4c5a0]/30 rounded-2xl p-8 hover:shadow-xl transition-all duration-500"
            >
              <div className={`absolute -inset-1 bg-gradient-to-br ${highlight.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl blur`}></div>
              <div className="relative">
                <div className={`w-16 h-16 bg-gradient-to-br ${highlight.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  {highlight.icon}
                </div>
                <h4 className="text-xl font-serif text-[#2d3e26] mb-3 font-light">
                  {highlight.title}
                </h4>
                <p className="text-[#5a6d52] text-sm leading-relaxed font-light">
                  {highlight.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
      `}</style>
    </section>
  );
}