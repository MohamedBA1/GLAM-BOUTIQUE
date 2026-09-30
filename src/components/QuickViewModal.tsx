import React, { useState } from 'react';
import { Dress } from '../types';
import { useBoutique } from '../context/BoutiqueContext';
import { OptimizedImage } from './OptimizedImage';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';
import { X, MessageCircle, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

interface QuickViewModalProps {
  dress: Dress | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ dress, onClose }) => {
  const { navigateTo } = useBoutique();
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!dress) return null;

  const handleWhatsAppInquiry = () => {
    const message = `Hello GLAM Boutique,\nI would like to arrange a fitting.\nThank you.`;
    const url = getGeneralWhatsAppUrl(message);
    window.open(url, '_blank');
  };

  const handleFullDetails = () => {
    onClose();
    navigateTo('dress-details', { id: dress.id });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-[#302016] text-[#A48F70] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#C3A684]/30 z-10 my-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 bg-[#F4E8D2]/90 hover:bg-[#C3A684] text-[#A48F70] hover:text-[#F4E8D2] border border-[#C3A684]/30 flex items-center justify-center transition-colors shadow-xs"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Gallery */}
          <div className="bg-[#302016] p-4 flex flex-col justify-between">
            <div className="relative aspect-[3/4] max-h-[50vh] md:max-h-none overflow-hidden border border-[#C3A684]/20">
              <OptimizedImage
                src={dress.images[activeImageIdx] || dress.images[0]}
                alt={dress.name}
                sizesPreset="cardGrid"
                quality={85}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
            </div>

            {dress.images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
                {dress.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-14 h-16 overflow-hidden shrink-0 border transition-all ${
                      activeImageIdx === idx
                        ? 'border-[#C3A684] ring-1 ring-[#C3A684]'
                        : 'border-[#C3A684]/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <OptimizedImage
                      src={img}
                      alt=""
                      sizesPreset="thumbnail"
                      quality={70}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details & Concierge CTA */}
          <div className="p-6 md:p-8 flex flex-col justify-between font-sans">
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-light text-[#A48F70]">
                {dress.name}
              </h2>
              
              <p className="font-serif italic text-lg md:text-xl text-[#C3A684] leading-relaxed max-w-md">
                {dress.description || dress.subtitle}
              </p>

              <div className="pt-8 w-full max-w-xs mx-auto">
                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full btn-glam-primary"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>INQUIRE ON WHATSAPP</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
