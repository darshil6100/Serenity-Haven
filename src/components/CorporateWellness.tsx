import { Stethoscope, MonitorPlay, SlidersHorizontal, ArrowRight, Check } from 'lucide-react';

interface OfferingCard {
  icon: typeof Stethoscope;
  title: string;
  description: string;
  points: string[];
}

const offerings: OfferingCard[] = [
  {
    icon: Stethoscope,
    title: 'On-Site Doctor-Led Sessions',
    description: 'Our wellness doctor visits your office in person to deliver interactive talks your team will actually remember.',
    points: ['Live lectures on stress, nutrition & preventive health', 'Q&A tailored to your team\u2019s questions', 'Optional on-site screenings & consultations'],
  },
  {
    icon: MonitorPlay,
    title: 'Online Wellness Programs',
    description: 'A live, guided program delivered over video for distributed, hybrid, or remote teams no travel required.',
    points: ['Guided yoga, breathwork & meditation sessions', 'Recurring series or single-session formats', 'Works across time zones and office locations'],
  },
  {
    icon: SlidersHorizontal,
    title: 'Custom Corporate Packages',
    description: 'Every organization is different, so we build the program around your headcount, budget, and goals.',
    points: ['Scales from a single team to the full company', 'Combine on-site, online & retreat formats', 'Flexible scheduling around your calendar'],
  },
];

export default function CorporateWellness() {
  return (
    <section id="corporate" className="relative py-28 bg-[#faf7f0] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-10 bg-[#7a9b74]" />
            <span className="text-[0.65rem] font-medium tracking-[0.3em] text-[#7a9b74] uppercase">
              For Organizations
            </span>
            <div className="h-px w-10 bg-[#7a9b74]" />
          </div>
          <h2
            className="font-light text-[#2d3e26] text-[clamp(2.6rem,5.5vw,4.5rem)] leading-[1.1] mb-5"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Wellness, Delivered to <em className="not-italic italic text-[#4a5e42]">Your Workplace</em>
          </h2>
          <p className="text-[1rem] text-[#4a5e42] font-light max-w-2xl mx-auto leading-relaxed">
            HR teams and people leaders partner with us to bring meaningful wellness support to their employees on-site, online, or as a fully custom program.
          </p>
        </div>

        {/* Offering Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {offerings.map((o, i) => {
            const Icon = o.icon;
            return (
              <div
                key={i}
                className="group relative bg-[#fffdf8] rounded-2xl p-8 border border-[#c9a96e]/15 shadow-[0_4px_30px_rgba(45,62,38,0.06)] hover:shadow-[0_20px_60px_rgba(45,62,38,0.14)] hover:border-[#c9a96e]/35 hover:-translate-y-1.5 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2d3e26] to-[#3a4d30] flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-400">
                  <Icon className="w-6 h-6 text-[#e8d5a8]" strokeWidth={1.6} />
                </div>
                <h3
                  className="text-[#2d3e26] text-[1.5rem] font-light leading-tight mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {o.title}
                </h3>
                <p className="text-[#4a5e42] text-[0.87rem] font-light leading-relaxed mb-5">
                  {o.description}
                </p>
                <ul className="space-y-2.5">
                  {o.points.map((p, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-[0.8rem] text-[#4a5e42] font-light leading-snug">
                      <Check className="w-3.5 h-3.5 text-[#7a9b74] mt-[3px] flex-shrink-0" strokeWidth={2} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(10,18,9,0.15)] border border-[#c9a96e]/15 bg-[#1a2419] px-8 py-12 md:px-14 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="h-px w-6 bg-[#a8c4a0]" />
              <span className="text-[0.62rem] font-medium tracking-[0.3em] text-[#a8c4a0] uppercase">Partner With Us</span>
            </div>
            <h3
              className="font-light text-[#faf7f0] text-[1.9rem] md:text-[2.2rem] leading-[1.15] mb-2"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Let's design a wellness program for your team
            </h3>
            <p className="text-[#c9a96e]/70 text-[0.88rem] font-light max-w-md">
              Tell us your team size and goals we'll put together a proposal within one business day.
            </p>
          </div>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#c9a96e] to-[#b8924e] text-[#1a2419] text-[0.73rem] font-semibold tracking-[0.18em] uppercase shadow-lg shadow-[#c9a96e]/30 hover:shadow-[#c9a96e]/50 hover:-translate-y-1 transition-all duration-300 whitespace-nowrap flex-shrink-0"
          >
            Request a Proposal
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
          
        </div>
      </div>
    </section>
  );
}