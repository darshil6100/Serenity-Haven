import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import Logo from './logo';

interface FormData {
  name: string;
  email: string;
  phone: string;
  package_interest: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    package_interest: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const packages = [
    'One Day Serenity Experience',
    'Nourish And Revive Vitality Retreat',
    'Detox & Rejuvenation Retreat',
    'Golden Years Grace - Retreat for Seniors',
    'Pain to Peace Trek',
    'Roots & wings retreat'
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      // Send to MongoDB via API endpoint
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/api/submit-query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit query');
      }

      const result = await response.json();
      console.log('Query submitted successfully:', result);

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        package_interest: '',
        message: ''
      });

      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      console.error('Error submitting query:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit query. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-b from-[#e8dcc4] to-[#f5f1e8] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
      </div>

      {/* Floating Leaves */}
      <div className="absolute top-20 left-10 text-[#8b9d7c]/10 pointer-events-none">
        <Logo className="w-32 h-32 animate-float" />
      </div>
      <div className="absolute bottom-20 right-20 text-[#b8a67d]/10 pointer-events-none">
        <Logo className="w-24 h-24 animate-float-delayed" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#8b9d7c] to-[#8b9d7c]"></div>
            <Sparkles className="w-8 h-8 text-[#8b9d7c] mx-4" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-[#8b9d7c] to-[#8b9d7c]"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-light text-[#2d3e26] mb-6">
            Get Personalized Information
          </h2>
          <p className="text-lg md:text-xl text-[#5a6d52] font-light">
            Have questions or need a customized wellness package? We're here to help.
          </p>
        </div>

        {/* Form Container */}
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-[#8b9d7c]/10 to-[#b8a67d]/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-gradient-to-br from-[#f5f1e8] to-[#ede8dc] shadow-2xl border border-[#d4c5a0]/30 p-8 md:p-12 rounded-2xl">
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] rounded-2xl"></div>
            
            <div className="relative">
              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="mb-8 p-6 bg-gradient-to-br from-[#7a9b76]/10 to-[#5a7d56]/10 border-2 border-[#7a9b76]/30 rounded-xl flex items-start gap-4 animate-slide-in">
                  <div className="p-2 bg-[#7a9b76] rounded-full">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-[#2d3e26] font-semibold text-lg">Query submitted successfully!</p>
                    <p className="text-[#5a6d52] text-sm mt-1">
                      We'll get back to you shortly at the email address you provided.
                    </p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="mb-8 p-6 bg-gradient-to-br from-red-50 to-red-100/50 border-2 border-red-200 rounded-xl flex items-start gap-4 animate-slide-in">
                  <div className="p-2 bg-red-500 rounded-full">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-red-900 font-semibold text-lg">Failed to submit query</p>
                    <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="name" className="block text-sm font-semibold text-[#2d3e26] mb-3">
                      Full Name <span className="text-[#c9704d]">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-white/50 border-2 border-[#d4c5a0]/30 focus:border-[#8b9d7c] focus:bg-white rounded-xl outline-none transition-all duration-300 text-[#2d3e26] placeholder:text-[#b8a67d]/50"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-semibold text-[#2d3e26] mb-3">
                      Email Address <span className="text-[#c9704d]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-white/50 border-2 border-[#d4c5a0]/30 focus:border-[#8b9d7c] focus:bg-white rounded-xl outline-none transition-all duration-300 text-[#2d3e26] placeholder:text-[#b8a67d]/50"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Phone and Package Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="phone" className="block text-sm font-semibold text-[#2d3e26] mb-3">
                      Phone Number <span className="text-[#c9704d]">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-white/50 border-2 border-[#d4c5a0]/30 focus:border-[#8b9d7c] focus:bg-white rounded-xl outline-none transition-all duration-300 text-[#2d3e26] placeholder:text-[#b8a67d]/50"
                      placeholder="+91 9974542678"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="package_interest" className="block text-sm font-semibold text-[#2d3e26] mb-3">
                      Package Interest
                    </label>
                    <select
                      id="package_interest"
                      name="package_interest"
                      value={formData.package_interest}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/50 border-2 border-[#d4c5a0]/30 focus:border-[#8b9d7c] focus:bg-white rounded-xl outline-none transition-all duration-300 text-[#2d3e26] cursor-pointer"
                    >
                      <option value="">Select a package (optional)</option>
                      {packages.map((pkg, index) => (
                        <option key={index} value={pkg}>
                          {pkg}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="group">
                  <label htmlFor="message" className="block text-sm font-semibold text-[#2d3e26] mb-3">
                    Your Message <span className="text-[#c9704d]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-5 py-4 bg-white/50 border-2 border-[#d4c5a0]/30 focus:border-[#8b9d7c] focus:bg-white rounded-xl outline-none transition-all duration-300 resize-none text-[#2d3e26] placeholder:text-[#b8a67d]/50"
                    placeholder="Tell us about your wellness goals, any specific requirements, or questions you may have..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full md:w-auto px-10 py-5 bg-gradient-to-r from-[#8b9d7c] to-[#5a7d56] hover:from-[#a0b18d] hover:to-[#6d8060] disabled:from-[#d4c5a0] disabled:to-[#b8a67d] text-white font-bold tracking-wide transition-all duration-500 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-[#8b9d7c]/30 disabled:shadow-none flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        <span>Submit Query</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float 8s ease-in-out infinite 2s; }
        .animate-slide-in { animation: slide-in 0.4s ease-out; }
      `}</style>
    </section>
  );
}