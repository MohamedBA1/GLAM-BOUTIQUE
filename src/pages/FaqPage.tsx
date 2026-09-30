import React, { useState } from 'react';
import { useBoutique } from '../context/BoutiqueContext';
import { ChevronDown, Sparkles, MessageCircle, HelpCircle } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const { settings, navigateTo } = useBoutique();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does dress rental work at GLAM Boutique?',
      a: 'It is delightfully simple: browse our online catalog or visit our New Damietta boutique on Lebanon Street. Pick your favorite dress and reach out to us via WhatsApp. We will reserve the gown for you, invite you for a fitting, and prepare the garment freshly steamed for your celebration.',
    },
    {
      q: 'How long is the rental period?',
      a: 'Our standard rental duration is 3 full days. Day 1 is collection and final fit check; Day 2 is your special celebration; Day 3 is return to our boutique by 9:00 PM. If your event requires extended travel or destination timing, custom rental extensions can be arranged.',
    },
    {
      q: 'Can I try on dresses before renting?',
      a: 'Absolutely! In fact, we encourage it. Our boutique in New Damietta (Lebanon Street, Al-Helou Building) features comfortable private fitting salons open every day from 1:00 PM to 9:00 PM. You are welcome to try on several silhouettes and receive personalized styling advice.',
    },
    {
      q: 'Do I need to wash or dry clean the dress before returning it?',
      a: 'No, strictly never wash or dry-clean the gown yourself! Professional garment care and eco-sanitization are completely included in your rental price. Simply bring the dress back on its hanger in our protective garment bag.',
    },
    {
      q: 'What is the security deposit and how does it work?',
      a: 'A refundable security deposit (usually 1,000 to 2,000 EGP depending on the gown tier) is held during the rental period. It is refunded to you 100% in cash or instant transfer as soon as the dress is returned in good order.',
    },
    {
      q: 'Can dresses be altered or tailored to my size?',
      a: 'Because our gowns are high-end rentals shared by clients, permanent cutting or tailoring is not permitted. However, our skilled boutique atelier provides safe, temporary fitting adjustments (invisible silicone grips, micro-clips, and hem lifts) that do not compromise the fabric.',
    },
    {
      q: 'How far in advance should I reach out to reserve my dress?',
      a: 'For major wedding seasons (spring, summer, and holiday weekends), we recommend reaching out 3 to 6 weeks in advance to ensure your preferred gown is reserved exclusively for your date.',
    },
    {
      q: 'What happens if accidental minor damage occurs during my event?',
      a: 'We understand that minor wear (such as a loose crystal or minor hem dust) can happen at high-energy parties. Our in-house restoration team handles minor fixes. Significant tears or permanent stains may incur repair deductions from the security deposit as detailed in our rental terms.',
    },
    {
      q: 'Where is GLAM Boutique located and what are your opening hours?',
      a: 'We are located on Lebanon Street, Al-Helou Building, New Damietta, Egypt. We are open every day of the week from 1:00 PM to 9:00 PM.',
    },
  ];

  return (
    <div className="bg-[#F4E8D2] text-[#A48F70] min-h-screen pt-28 sm:pt-36 pb-24 font-sans selection:bg-[#C3A684] selection:text-[#F4E8D2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C3A684] font-bold">
            Common Questions
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#A48F70] mt-2">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-base text-[#A6927B] font-serif italic max-w-lg mx-auto">
            Everything you need to know about our dresses, fitting sessions, deposits, and returns in New Damietta.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 mb-16">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#302016] border border-[#C3A684]/20 overflow-hidden transition-all duration-200 shadow-xs"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-[#F4E8D2]/60 transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg font-normal text-[#A48F70]">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 border border-[#C3A684]/30 flex items-center justify-center shrink-0 text-[#C3A684] transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#C3A684] text-[#F4E8D2]' : 'bg-transparent'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[#A6927B] leading-relaxed border-t border-[#C3A684]/15 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="bg-[#261811] p-8 sm:p-10 text-[#A48F70] text-center space-y-4 border border-[#C3A684]/30 shadow-xl">
          <Sparkles className="w-8 h-8 text-[#C3A684] mx-auto" />
          <h3 className="font-serif text-2xl font-light text-[#A48F70]">
            Have a question not listed here?
          </h3>
          <p className="text-xs sm:text-sm text-[#A6927B] max-w-md mx-auto leading-relaxed font-light">
            Our boutique team is available daily on WhatsApp to assist with measurements, inquiries, and fitting times.
          </p>
          <div className="pt-2">
            <a
              href={`https://wa.me/${settings.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="btn-glam-primary"
            >
              <MessageCircle className="w-4 h-4" />
              <span>CHAT WITH US ON WHATSAPP</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
