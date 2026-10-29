import { useEffect, useState } from 'react';
import { Send, CheckCircle, AlertCircle, Phone, Mail, Clock } from 'lucide-react';

const packageOptions = [
  'One Day Serenity Experience',
  'Nourish And Revive Vitality Retreat',
  'Detox & Rejuvenation Retreat',
  'Golden Years Grace - Retreat for Seniors',
  'Pain to Peace Trek',
  'Roots & Wings Retreat',
  '2-Day Wellness Retreat',
  'On-Site Corporate Wellness Session',
  'Online Corporate Wellness Program',
  'Custom Corporate Package',
];

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  package_interest: string;
  message: string;
}

type FieldErrors = Partial<Record<keyof ContactFormData, string>>;

const EMPTY_FORM: ContactFormData = {
  name: '', email: '', phone: '', package_interest: '', message: '',
};

const PHONE_DISPLAY = '+91 99745 42678';
const PHONE_HREF = 'tel:+919974542678';
const SUPPORT_EMAIL = 'serenityhavensupport@gmail.com';

const inputClass = (invalid?: boolean) =>
  `w-full px-4 py-3.5 bg-[#f0e8d4]/30 border ${
    invalid ? 'border-[#b4532a]/70' : 'border-[#c9a96e]/25'
  } focus:border-[#7a9b74] focus:bg-white rounded-xl outline-none transition-all duration-300 text-[#2d3e26] text-[0.9rem] placeholder:text-[#8a7a5e]/55 focus:shadow-[0_0_0_3px_rgba(122,155,116,0.15)]`;

function validate(data: ContactFormData): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.name.trim()) errors.name = 'Please enter your name';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())) errors.email = 'Please enter a valid email address';
  if (!/^[+()\-.\s\d]{7,20}$/.test(data.phone.trim())) errors.phone = 'Please enter a valid phone number';
  if (data.message.trim().length < 5) errors.message = 'Please tell us a little more';
  return errors;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return <p id={id} className="mt-1.5 text-[0.75rem] text-[#b4532a]">{message}</p>;
}

export default function ContactForm({ initialPackage = '' }: { initialPackage?: string }) {
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_FORM);
  const [honeypot, setHoneypot] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Pre-select the package when arriving from an "Inquire" button.
  useEffect(() => {
    if (packageOptions.includes(initialPackage)) {
      setFormData(prev => ({ ...prev, package_interest: initialPackage }));
    }
  }, [initialPackage]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const name = e.target.name as keyof ContactFormData;
    setFormData(prev => ({ ...prev, [name]: e.target.value }));
    if (fieldErrors[name]) setFieldErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);
    setErrorMessage('');

    const errors = validate(formData);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      document.getElementsByName(Object.keys(errors)[0])[0]?.focus();
      return;
    }

    setIsSubmitting(true);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, company: honeypot }),
        signal: controller.signal,
      });
      const result = await res.json().catch(() => ({})) as { success?: boolean; error?: string; fields?: FieldErrors };

      if (res.ok && result.success) {
        setSubmitStatus('success');
        setFormData(EMPTY_FORM);
        setFieldErrors({});
      } else {
        if (result.fields) setFieldErrors(result.fields);
        setSubmitStatus('error');
        setErrorMessage(result.error ?? 'Something went wrong while sending your message.');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('We could not reach our server. Please check your connection and try again.');
    } finally {
      window.clearTimeout(timeout);
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
        <div data-reveal className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-10 bg-[#7a9b74]" />
            <span className="text-[0.65rem] font-medium tracking-[0.3em] text-[#5f7d59] uppercase">Contact Us</span>
            <div className="h-px w-10 bg-[#7a9b74]" />
          </div>
          <h1
            className="font-light text-[#2d3e26] text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] mb-5"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Get Personalized <em className="italic text-[#5f7d59]">Information</em>
          </h1>
          <p className="text-[1rem] text-[#4a5e42] font-light max-w-xl mx-auto leading-relaxed">
            Have questions or need a customized wellness package — for yourself or your organization? We're here to help you begin your journey.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

          {/* Left Info Column */}
          <div data-reveal className="lg:col-span-2 space-y-5">
            <div className="mb-2">
              <h2
                className="text-[#2d3e26] text-[1.6rem] font-light leading-snug mb-3"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Begin Your Wellness Journey with Us
              </h2>
              <p className="text-[#4a5e42] text-[0.9rem] font-light leading-relaxed">
                Our wellness experts are ready to guide you toward the perfect retreat, or design a program for your team. Reach out and let us craft an experience that truly nurtures your mind, body, and soul.
              </p>
            </div>

            <a href={PHONE_HREF} className="flex items-center gap-3.5 p-4 bg-[#fffdf8] border border-[#c9a96e]/20 rounded-2xl hover:border-[#c9a96e]/50 hover:shadow-[0_10px_30px_rgba(45,62,38,0.08)] hover:translate-x-1 transition-all duration-300 no-underline group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2d3e26] to-[#3a4d30] flex items-center justify-center flex-shrink-0">
                <Phone className="w-4.5 h-4.5 text-[#e8d5a8]" strokeWidth={1.8} />
              </div>
              <div>
                <div className="text-[0.6rem] font-semibold tracking-[0.2em] text-[#5f7d59] uppercase mb-0.5">Phone</div>
                <div className="text-[0.95rem] text-[#2d3e26] font-medium">{PHONE_DISPLAY}</div>
              </div>
            </a>

            <a href={`mailto:${SUPPORT_EMAIL}`} className="flex items-center gap-3.5 p-4 bg-[#fffdf8] border border-[#c9a96e]/20 rounded-2xl hover:border-[#c9a96e]/50 hover:shadow-[0_10px_30px_rgba(45,62,38,0.08)] hover:translate-x-1 transition-all duration-300 no-underline group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2d3e26] to-[#3a4d30] flex items-center justify-center flex-shrink-0">
                <Mail className="w-4.5 h-4.5 text-[#e8d5a8]" strokeWidth={1.8} />
              </div>
              <div className="min-w-0">
                <div className="text-[0.6rem] font-semibold tracking-[0.2em] text-[#5f7d59] uppercase mb-0.5">Email</div>
                <div className="text-[0.9rem] text-[#2d3e26] font-medium break-all">{SUPPORT_EMAIL}</div>
              </div>
            </a>

            <div className="flex items-center gap-3.5 p-4 rounded-2xl border border-dashed border-[#7a9b74]/30">
              <div className="w-11 h-11 rounded-xl bg-[#7a9b74]/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4.5 h-4.5 text-[#5f7d59]" strokeWidth={1.8} />
              </div>
              <p className="text-[0.84rem] text-[#4a5e42] leading-relaxed">
                We reply to every enquiry within <strong className="font-medium text-[#2d3e26]">one business day</strong>.
              </p>
            </div>

            <div className="p-5 bg-[#1a2419] rounded-2xl">
              <p className="text-[0.62rem] tracking-[0.2em] text-[#a8c4a0] uppercase font-semibold mb-2">Our Promise</p>
              <p className="text-[0.86rem] text-[#e8d5a8]/85 leading-relaxed font-light">
                At Serenity Haven, we're committed to transformative wellness experiences that nurture your mind, body, and soul in a sanctuary of natural beauty.
              </p>
            </div>
          </div>

          {/* Right Form Column */}
          <div data-reveal className="lg:col-span-3" style={{ '--reveal-delay': '0.1s' } as React.CSSProperties}>
            <div className="bg-[#fffdf8] rounded-3xl p-7 md:p-10 border border-[#c9a96e]/20 shadow-[0_20px_60px_rgba(45,62,38,0.08)]">

              {submitStatus === 'success' ? (
                <div className="py-10 text-center animate-slide-in" role="status">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#7a9b74]/20 to-[#c9a96e]/20 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-[#5f7d59]" strokeWidth={1.6} />
                  </div>
                  <h3
                    className="text-[#2d3e26] text-[2rem] font-light mb-3"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Thank you — your message is on its way
                  </h3>
                  <p className="text-[#4a5e42] text-[0.92rem] font-light max-w-md mx-auto leading-relaxed mb-8">
                    We've sent a confirmation to your inbox. One of our wellness experts will be in touch within one business day.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <a href="#packages" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#2d3e26] to-[#3a4d30] text-[#e8d5a8] text-[0.72rem] font-medium tracking-[0.16em] uppercase hover:-translate-y-0.5 transition-all duration-300">
                      Explore Packages
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitStatus(null)}
                      className="px-6 py-3 rounded-full border border-[#c9a96e]/40 text-[#4a5e42] text-[0.72rem] font-medium tracking-[0.16em] uppercase hover:border-[#c9a96e] transition-all duration-300"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {submitStatus === 'error' && (
                    <div className="mb-6 p-5 bg-[#b4532a]/[0.06] border border-[#b4532a]/25 rounded-2xl flex items-start gap-3 animate-slide-in" role="alert">
                      <AlertCircle className="w-5 h-5 text-[#b4532a] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[#7c3418] font-semibold text-[0.92rem]">We couldn't send your message</p>
                        <p className="text-[#7c3418]/85 text-[0.82rem] mt-0.5">
                          {errorMessage} You can also reach us at{' '}
                          <a href={PHONE_HREF} className="underline">{PHONE_DISPLAY}</a> or{' '}
                          <a href={`mailto:${SUPPORT_EMAIL}`} className="underline">{SUPPORT_EMAIL}</a>.
                        </p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Honeypot — hidden from people, tempting to bots */}
                    <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                      <label>
                        Company
                        <input type="text" name="company" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} />
                      </label>
                    </div>

                    {/* Row 1 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="cf-name" className="block text-[0.66rem] font-semibold tracking-[0.15em] text-[#2d3e26] uppercase mb-2">
                          Full Name <span className="text-[#b4532a]">*</span>
                        </label>
                        <input
                          id="cf-name" type="text" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required
                          aria-invalid={!!fieldErrors.name} aria-describedby={fieldErrors.name ? 'cf-name-err' : undefined}
                          placeholder="Your full name"
                          className={inputClass(!!fieldErrors.name)}
                        />
                        <FieldError id="cf-name-err" message={fieldErrors.name} />
                      </div>
                      <div>
                        <label htmlFor="cf-email" className="block text-[0.66rem] font-semibold tracking-[0.15em] text-[#2d3e26] uppercase mb-2">
                          Email Address <span className="text-[#b4532a]">*</span>
                        </label>
                        <input
                          id="cf-email" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} required
                          aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? 'cf-email-err' : undefined}
                          placeholder="your@email.com"
                          className={inputClass(!!fieldErrors.email)}
                        />
                        <FieldError id="cf-email-err" message={fieldErrors.email} />
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="cf-phone" className="block text-[0.66rem] font-semibold tracking-[0.15em] text-[#2d3e26] uppercase mb-2">
                          Phone Number <span className="text-[#b4532a]">*</span>
                        </label>
                        <input
                          id="cf-phone" type="tel" name="phone" autoComplete="tel" inputMode="tel" value={formData.phone} onChange={handleChange} required
                          aria-invalid={!!fieldErrors.phone} aria-describedby={fieldErrors.phone ? 'cf-phone-err' : undefined}
                          placeholder="+91 98765 43210"
                          className={inputClass(!!fieldErrors.phone)}
                        />
                        <FieldError id="cf-phone-err" message={fieldErrors.phone} />
                      </div>
                      <div>
                        <label htmlFor="cf-package" className="block text-[0.66rem] font-semibold tracking-[0.15em] text-[#2d3e26] uppercase mb-2">
                          Package Interest
                        </label>
                        <select
                          id="cf-package" name="package_interest" value={formData.package_interest} onChange={handleChange}
                          className={`${inputClass()} cursor-pointer appearance-none pr-10`}
                          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237a9b74' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
                        >
                          <option value="">Select a package (optional)</option>
                          {packageOptions.map(pkg => (
                            <option key={pkg} value={pkg}>{pkg}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="cf-message" className="block text-[0.66rem] font-semibold tracking-[0.15em] text-[#2d3e26] uppercase mb-2">
                        Your Message <span className="text-[#b4532a]">*</span>
                      </label>
                      <textarea
                        id="cf-message" name="message" value={formData.message} onChange={handleChange} required rows={5} maxLength={5000}
                        aria-invalid={!!fieldErrors.message} aria-describedby={fieldErrors.message ? 'cf-message-err' : undefined}
                        placeholder="Tell us about your wellness goals, preferred dates, team size, or any specific requirements..."
                        className={`${inputClass(!!fieldErrors.message)} resize-none`}
                      />
                      <FieldError id="cf-message-err" message={fieldErrors.message} />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2.5 py-4 px-8 bg-gradient-to-r from-[#2d3e26] to-[#3a4d30] hover:from-[#3a4d30] hover:to-[#5f7d59] disabled:opacity-70 text-[#e8d5a8] text-[0.75rem] font-medium tracking-[0.2em] uppercase rounded-xl shadow-md hover:shadow-[0_8px_30px_rgba(45,62,38,0.25)] hover:-translate-y-0.5 disabled:translate-y-0 disabled:shadow-none disabled:cursor-wait transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                            <path d="M12 2a10 10 0 0 1 10 10" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                    <p className="text-center text-[0.72rem] text-[#8a7a5e]">
                      Your details are only used to respond to your enquiry.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
