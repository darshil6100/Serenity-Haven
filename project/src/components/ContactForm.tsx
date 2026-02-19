import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  package_interest: string;
  message: string;
}

const packageOptions = [
  'One Day Serenity Experience',
  'Nourish And Revive Vitality Retreat',
  'Detox & Rejuvenation Retreat',
  'Golden Years Grace - Retreat for Seniors',
  'Pain to Peace Trek',
  'Roots & Wings Retreat',
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', package_interest: '', message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/api/submit-query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit query');
      }
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', package_interest: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 6000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 bg-gradient-to-b from-[#f0e8d4] to-[#faf7f0] overflow-hidden">
      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-10 bg-[#7a9b74]" />
            <span className="text-[0.65rem] font-medium tracking-[0.3em] text-[#7a9b74] uppercase">Get In Touch</span>
            <div className="h-px w-10 bg-[#7a9b74]" />
          </div>
          <h2
            className="font-light text-[#2d3e26] text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] mb-5"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Get Personalized <em className="not-italic italic text-[#4a5e42]">Information</em>
          </h2>
          <p className="text-[1rem] text-[#4a5e42] font-light max-w-xl mx-auto leading-relaxed">
            Have questions or need a customized wellness package? We're here to help you begin your journey.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3
                className="text-[#2d3e26] text-[1.4rem] font-light leading-snug mb-3"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Begin Your Wellness Journey with Us
              </h3>
              <p className="text-[#4a5e42] text-[0.88rem] font-light leading-relaxed">
                Our wellness experts are ready to guide you toward the perfect retreat. Reach out and let us craft an experience that truly nurtures your mind, body, and soul.
              </p>
            </div>

            <a href="tel:9974542678" className="flex items-center gap-3.5 p-4 bg-[#fffdf8] border border-[#c9a96e]/15 rounded-2xl hover:border-[#c9a96e]/40 hover:translate-x-1 transition-all duration-300 no-underline group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#7a9b74]/15 to-[#c9a96e]/10 flex items-center justify-center text-[1.1rem] flex-shrink-0">📞</div>
              <div>
                <div className="text-[0.6rem] font-semibold tracking-[0.2em] text-[#7a9b74] uppercase mb-0.5">Phone</div>
                <div className="text-[0.9rem] text-[#2d3e26] font-medium">9974542678</div>
              </div>
            </a>

            <a href="mailto:support@serenityhaven.in" className="flex items-center gap-3.5 p-4 bg-[#fffdf8] border border-[#c9a96e]/15 rounded-2xl hover:border-[#c9a96e]/40 hover:translate-x-1 transition-all duration-300 no-underline group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#7a9b74]/15 to-[#c9a96e]/10 flex items-center justify-center text-[1.1rem] flex-shrink-0">✉️</div>
              <div>
                <div className="text-[0.6rem] font-semibold tracking-[0.2em] text-[#7a9b74] uppercase mb-0.5">Email</div>
                <div className="text-[0.88rem] text-[#2d3e26] font-medium break-all">support@serenityhaven.in</div>
              </div>
            </a>

            <div className="p-5 bg-gradient-to-br from-[#2d3e26]/05 to-[#7a9b74]/05 border border-[#7a9b74]/15 rounded-2xl">
              <p className="text-[0.62rem] tracking-[0.2em] text-[#7a9b74] uppercase font-semibold mb-2">Our Promise</p>
              <p className="text-[0.84rem] text-[#4a5e42] leading-relaxed font-light">
                At Serenity Haven, we're committed to transformative wellness experiences that nurture your mind, body, and soul in a sanctuary of natural beauty.
              </p>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-3">
            <div className="bg-[#fffdf8] rounded-3xl p-7 md:p-10 border border-[#c9a96e]/15 shadow-[0_10px_50px_rgba(45,62,38,0.06)]">
              {/* Success */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-5 bg-[#7a9b74]/10 border border-[#7a9b74]/25 rounded-2xl flex items-start gap-3 animate-slide-in">
                  <CheckCircle className="w-5 h-5 text-[#7a9b74] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#2d3e26] font-semibold text-[0.92rem]">Query submitted successfully!</p>
                    <p className="text-[#4a5e42] text-[0.8rem] mt-0.5 font-light">We'll get back to you shortly at your email address.</p>
                  </div>
                </div>
              )}

              {/* Error */}
              {submitStatus === 'error' && (
                <div className="mb-6 p-5 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 animate-slide-in">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-800 font-semibold text-[0.92rem]">Failed to submit</p>
                    <p className="text-red-600 text-[0.8rem] mt-0.5">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[0.66rem] font-semibold tracking-[0.15em] text-[#2d3e26] uppercase mb-2">
                      Full Name <span className="text-[#c9704d]">*</span>
                    </label>
                    <input
                      type="text" name="name" value={formData.name} onChange={handleChange} required
                      placeholder="Your full name"
                      className="w-full px-4 py-3.5 bg-[#f0e8d4]/30 border border-[#c9a96e]/20 focus:border-[#7a9b74] focus:bg-white rounded-xl outline-none transition-all duration-300 text-[#2d3e26] text-[0.88rem] font-light placeholder:text-[#c9a96e]/40 focus:shadow-[0_0_0_3px_rgba(122,155,116,0.1)]"
                    />
                  </div>
                  <div>
                    <label className="block text-[0.66rem] font-semibold tracking-[0.15em] text-[#2d3e26] uppercase mb-2">
                      Email Address <span className="text-[#c9704d]">*</span>
                    </label>
                    <input
                      type="email" name="email" value={formData.email} onChange={handleChange} required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3.5 bg-[#f0e8d4]/30 border border-[#c9a96e]/20 focus:border-[#7a9b74] focus:bg-white rounded-xl outline-none transition-all duration-300 text-[#2d3e26] text-[0.88rem] font-light placeholder:text-[#c9a96e]/40 focus:shadow-[0_0_0_3px_rgba(122,155,116,0.1)]"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[0.66rem] font-semibold tracking-[0.15em] text-[#2d3e26] uppercase mb-2">
                      Phone Number <span className="text-[#c9704d]">*</span>
                    </label>
                    <input
                      type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                      placeholder="+91 9974542678"
                      className="w-full px-4 py-3.5 bg-[#f0e8d4]/30 border border-[#c9a96e]/20 focus:border-[#7a9b74] focus:bg-white rounded-xl outline-none transition-all duration-300 text-[#2d3e26] text-[0.88rem] font-light placeholder:text-[#c9a96e]/40 focus:shadow-[0_0_0_3px_rgba(122,155,116,0.1)]"
                    />
                  </div>
                  <div>
                    <label className="block text-[0.66rem] font-semibold tracking-[0.15em] text-[#2d3e26] uppercase mb-2">
                      Package Interest
                    </label>
                    <select
                      name="package_interest" value={formData.package_interest} onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-[#f0e8d4]/30 border border-[#c9a96e]/20 focus:border-[#7a9b74] focus:bg-white rounded-xl outline-none transition-all duration-300 text-[#2d3e26] text-[0.88rem] font-light cursor-pointer appearance-none focus:shadow-[0_0_0_3px_rgba(122,155,116,0.1)]"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237a9b74' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
                    >
                      <option value="">Select a package (optional)</option>
                      {packageOptions.map((pkg, i) => (
                        <option key={i} value={pkg}>{pkg}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[0.66rem] font-semibold tracking-[0.15em] text-[#2d3e26] uppercase mb-2">
                    Your Message <span className="text-[#c9704d]">*</span>
                  </label>
                  <textarea
                    name="message" value={formData.message} onChange={handleChange} required rows={5}
                    placeholder="Tell us about your wellness goals, any specific requirements, or questions you may have..."
                    className="w-full px-4 py-3.5 bg-[#f0e8d4]/30 border border-[#c9a96e]/20 focus:border-[#7a9b74] focus:bg-white rounded-xl outline-none transition-all duration-300 resize-none text-[#2d3e26] text-[0.88rem] font-light placeholder:text-[#c9a96e]/40 focus:shadow-[0_0_0_3px_rgba(122,155,116,0.1)]"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-8 bg-gradient-to-r from-[#2d3e26] to-[#3a4d30] hover:from-[#3a4d30] hover:to-[#7a9b74] disabled:from-[#c9a96e]/50 disabled:to-[#b8a67d]/50 text-[#e8d5a8] text-[0.75rem] font-medium tracking-[0.2em] uppercase rounded-xl shadow-md hover:shadow-[0_8px_30px_rgba(45,62,38,0.25)] hover:-translate-y-0.5 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                        <path d="M12 2a10 10 0 0 1 10 10" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in { animation: slide-in 0.35s ease-out both; }
      `}</style>
    </section>
  );
}