import React, { useState } from 'react';
import { useBoutique } from '../context/BoutiqueContext';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';
import {
  MapPin,
  Clock,
  Phone,
  Instagram,
  Mail,
  MessageCircle,
  ArrowUpRight,
  Sparkles,
  Navigation,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, addToast } = useBoutique();

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [subject, setSubject] = useState('Fitting Appointment Inquiry');
  const [message, setMessage] = useState('');

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedMessage = `Hello GLAM Boutique,\n\nI have an inquiry from your website:\n• Name: ${fullName || 'Guest'}\n• Phone: ${phoneNumber || 'Not specified'}\n• Topic: ${subject}\n• Message: ${message || 'I would like to inquire about visiting your boutique on Lebanon Street.'}\n\nThank you!`;
    const encoded = encodeURIComponent(formattedMessage);
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encoded}`, '_blank');
  };

  const handleEmailSend = () => {
    const emailSubject = encodeURIComponent(`GLAM Inquiry: ${subject}`);
    const emailBody = encodeURIComponent(`Name: ${fullName}\nPhone: ${phoneNumber}\n\n${message}`);
    window.location.href = `mailto:contact@glamboutique-eg.com?subject=${emailSubject}&body=${emailBody}`;
  };

  return (
    <div className="bg-[#F4E8D2] text-[#A48F70] min-h-screen pt-28 sm:pt-36 pb-24 font-sans selection:bg-[#C3A684] selection:text-[#F4E8D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C3A684] font-bold">
            Atelier & Concierge
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#A48F70] mt-2">
            Contact GLAM Boutique
          </h1>
          <p className="mt-4 text-base text-[#A6927B] font-light max-w-xl mx-auto">
            Located in the heart of New Damietta on Lebanon Street, Al-Helou Building. Visit us daily or connect with our concierge team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Boutique Information & Map */}
          <div className="lg:col-span-5 space-y-8">
            {/* Info Card */}
            <div className="bg-[#302016] p-8 border border-[#C3A684]/20 shadow-xs space-y-6">
              <h2 className="font-serif text-2xl font-light text-[#A48F70]">
                New Damietta Atelier
              </h2>

              <div className="space-y-4 text-sm text-[#A6927B]">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 bg-[#F4E8D2] border border-[#C3A684]/40 flex items-center justify-center text-[#C3A684] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#A48F70] block">Boutique Address:</strong>
                    <span>Lebanon Street, Al-Helou Building</span>
                    <p className="text-xs text-[#A6927B]/70">New Damietta, Egypt</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 bg-[#F4E8D2] border border-[#C3A684]/40 flex items-center justify-center text-[#C3A684] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#A48F70] block">Atelier Opening Hours:</strong>
                    <span>Open Every Day</span>
                    <p className="text-xs text-[#A6927B]/70">1:00 PM – 9:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 bg-[#F4E8D2] border border-[#C3A684]/40 flex items-center justify-center text-[#C3A684] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#A48F70] block">Phone & WhatsApp:</strong>
                    <a href={`tel:${settings.phone}`} className="hover:text-[#C3A684] text-[#A48F70] block">
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 bg-[#F4E8D2] border border-[#C3A684]/40 flex items-center justify-center text-[#C3A684] shrink-0 mt-0.5">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#A48F70] block">Official Instagram:</strong>
                    <a
                      href="https://instagram.com/glam__2026"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline text-[#C3A684]"
                    >
                      @glam__2026
                    </a>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Action */}
              <div className="pt-4 border-t border-[#C3A684]/15">
                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 bg-[#C3A684] hover:bg-[#B99263] text-[#F4E8D2] hover:text-white border border-[#B99263]/40 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>START WHATSAPP CONVERSATION</span>
                </a>
              </div>
            </div>

            {/* Fitting Appointment Instructions */}
            <div className="bg-[#261811] border border-[#C3A684]/30 text-[#A48F70] p-8 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C3A684]">
                Fitting Instructions
              </span>
              <h3 className="font-serif text-xl font-light">
                Planning Your Visit
              </h3>
              <ul className="space-y-2.5 text-xs text-[#A6927B]">
                <li>• Walk-ins are always welcomed during opening hours (1:00 PM – 9:00 PM).</li>
                <li>• For weekend appointments (Thursdays & Fridays), we recommend reaching out on WhatsApp in advance to ensure fitting room availability.</li>
                <li>• Feel free to bring your celebration shoes to evaluate hem drape accurately.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Inquiry Message Form */}
          <div className="lg:col-span-7 bg-[#302016] p-8 sm:p-10 border border-[#C3A684]/20 shadow-xs space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C3A684]">
                Concierge Message
              </span>
              <h2 className="font-serif text-2xl font-light text-[#A48F70] mt-1">
                Send An Inquiry
              </h2>
              <p className="text-xs text-[#A6927B] mt-1">
                Compose your message below. You can send it directly to our team via WhatsApp or Email.
              </p>
            </div>

            <form onSubmit={handleWhatsAppSend} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#A48F70] mb-1">
                    Your Full Name:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mariam Hany"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#F4E8D2] border border-[#C3A684]/30 p-3 text-xs text-[#A48F70] placeholder-[#A6927B]/50 focus:outline-none focus:border-[#C3A684]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#A48F70] mb-1">
                    Phone / WhatsApp Number:
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="01042096306"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-[#F4E8D2] border border-[#C3A684]/30 p-3 text-xs text-[#A48F70] placeholder-[#A6927B]/50 focus:outline-none focus:border-[#C3A684]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#A48F70] mb-1">
                  Inquiry Subject:
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#F4E8D2] border border-[#C3A684]/30 p-3 text-xs text-[#A48F70] focus:outline-none focus:border-[#C3A684]"
                >
                  <option value="Private Fitting Appointment" className="bg-[#302016] text-[#A48F70]">Private Fitting Appointment</option>
                  <option value="Check Dress Availability" className="bg-[#302016] text-[#A48F70]">Check Dress Availability for Date</option>
                  <option value="Boutique Location & Directions" className="bg-[#302016] text-[#A48F70]">Boutique Location & Directions</option>
                  <option value="Rental Period & Policies" className="bg-[#302016] text-[#A48F70]">Rental Period & Policies</option>
                  <option value="General Question" className="bg-[#302016] text-[#A48F70]">General Styling Question</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#A48F70] mb-1">
                  Your Message or Question:
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share your event date, the gown style you are interested in, or any questions about our atelier..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#F4E8D2] border border-[#C3A684]/30 p-3 text-xs text-[#A48F70] placeholder-[#A6927B]/50 focus:outline-none focus:border-[#C3A684]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 btn-glam-primary"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleEmailSend}
                  className="btn-glam-secondary"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send via Email</span>
                </button>
              </div>
            </form>

            {/* Directions & Landmark Details */}
            <div className="pt-6 border-t border-[#C3A684]/15 text-xs text-[#A6927B] space-y-2">
              <div className="flex items-center gap-2 font-semibold text-[#A48F70]">
                <Navigation className="w-4 h-4 text-[#C3A684]" />
                <span>Finding GLAM Boutique in New Damietta</span>
              </div>
              <p>
                We are located on <strong className="text-[#A48F70]">Lebanon Street</strong>, in the prominent <strong className="text-[#A48F70]">Al-Helou Building</strong>. Easily accessible with curbside parking available. If you have trouble finding us, simply ring our telephone or WhatsApp and our team will guide you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
