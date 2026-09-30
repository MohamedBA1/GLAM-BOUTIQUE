import React from 'react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-[#F4E8D2] text-[#A48F70] min-h-screen pt-28 sm:pt-36 pb-24 font-sans selection:bg-[#C3A684] selection:text-[#F4E8D2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C3A684] font-bold">
            Confidentiality & Care
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#A48F70] mt-2">
            Privacy Policy
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#A6927B] font-serif italic">
            GLAM Boutique • New Damietta, Egypt
          </p>
        </div>

        <div className="bg-[#302016] border border-[#C3A684]/20 p-8 sm:p-12 shadow-xs space-y-8 text-sm text-[#A6927B] leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-light text-[#A48F70]">
              1. Information We Collect
            </h2>
            <p>
              When reaching out to GLAM Boutique, we may collect your full name, phone number (used for WhatsApp coordination), email address, and event details. This information is gathered solely to facilitate your inquiries and provide personalized service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-light text-[#A48F70]">
              2. Private Fitting Room Confidentiality
            </h2>
            <p>
              We respect your personal privacy. Fitting sessions in our New Damietta atelier are strictly private. Photos taken in-store are never posted to our Instagram (@glam__2026) or website without explicit verbal and written client permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-light text-[#A48F70]">
              3. Data Security & Storage
            </h2>
            <p>
              Your contact details are stored securely and never sold, shared, or distributed to third-party marketing brokers. Contact our boutique team directly on WhatsApp if you wish to update or delete your customer history.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
