import React from 'react';
import { useBoutique } from '../context/BoutiqueContext';
import { GlamLogo } from './GlamLogo';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';
import {
  MapPin,
  Clock,
  Phone,
  Instagram,
  ArrowUpRight,
  MessageCircle,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, settings } = useBoutique();

  return (
    <footer className="bg-[#261811] text-[#E3C7A5] pt-16 pb-12 border-t border-[#C3A684]/20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#C3A684]/15">
          {/* Brand & Logo Column */}
          <div className="lg:col-span-2 space-y-5">
            <div
              onClick={() => navigateTo('home')}
              className="cursor-pointer inline-flex items-center gap-3"
            >
              <GlamLogo size="lg" />
              <div>
                <span className="font-serif tracking-[0.3em] text-2xl font-light uppercase text-[#E3C7A5] block">
                  GLAM
                </span>
                <span className="text-[9px] tracking-[0.4em] uppercase text-[#C3A684] font-sans font-bold">
                  BOUTIQUE
                </span>
              </div>
            </div>

            <p className="text-sm text-[#D3B791] leading-relaxed max-w-sm">
              New Damietta’s premier luxury dress rental destination. Curating haute couture evening gowns, romantic engagement dresses, and bespoke celebration looks tailored to your most unforgettable moments.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://instagram.com/glam__2026"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-[#C3A684]/30 flex items-center justify-center text-[#C3A684] hover:border-[#C3A684] hover:bg-[#C3A684] hover:text-[#F4E8D2] transition-all duration-300"
                aria-label="Instagram @glam__2026"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="btn-glam-secondary px-5 py-2.5 text-[11px]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp @glam__2026</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C3A684]">
              Explore GLAM
            </h4>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider">
              {[
                { label: 'The Collection', page: 'collection' },
                { label: 'About Atelier', page: 'about' },
                { label: 'Contact Us', page: 'contact' },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => navigateTo(item.page)}
                    className="text-[#D3B791] hover:text-[#C3A684] transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Boutique Service & Experience */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C3A684]">
              Experience
            </h4>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider">
              {[
                { label: 'About GLAM', page: 'about' },
                { label: 'FAQ & Policies', page: 'faq' },
                { label: 'Contact & Atelier', page: 'contact' },
                { label: 'Rental Terms', page: 'terms-and-conditions' },
                { label: 'Privacy Policy', page: 'privacy-policy' },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => navigateTo(item.page)}
                    className="text-[#D3B791] hover:text-[#C3A684] transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit & Hours */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C3A684]">
              New Damietta Boutique
            </h4>
            <div className="space-y-3 text-xs text-[#D3B791]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C3A684] shrink-0 mt-0.5" />
                <span className="text-[#E3C7A5]">
                  Lebanon Street, Al-Helou Building, New Damietta, Egypt
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#C3A684] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#E3C7A5]">Open Every Day</p>
                  <p className="text-xs text-[#D3B791]">1:00 PM – 9:00 PM</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C3A684] shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-[#C3A684] text-[#E3C7A5] transition-colors">
                  {settings.phone}
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#C3A684] hover:underline font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Direct WhatsApp Inquiries</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D3B791]">
          <p>© 2026 GLAM Boutique. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest">
            <button onClick={() => navigateTo('privacy-policy')} className="hover:text-[#C3A684] transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => navigateTo('terms-and-conditions')} className="hover:text-[#C3A684] transition-colors">
              Rental Terms
            </button>
            <button onClick={() => navigateTo('faq')} className="hover:text-[#C3A684] transition-colors">
              FAQ
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

