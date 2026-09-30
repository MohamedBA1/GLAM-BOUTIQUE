import React from 'react';
import { Dress } from '../types';
import { useBoutique } from '../context/BoutiqueContext';

interface DressCardProps {
  dress: Dress;
  onQuickView?: (dress: Dress) => void;
}

export const DressCard: React.FC<DressCardProps> = ({ dress, onQuickView }) => {
  const { navigateTo } = useBoutique();

  const handleCardClick = () => {
    if (onQuickView) {
      onQuickView(dress);
    } else {
      navigateTo('dress-details', { id: dress.id });
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative cursor-pointer flex flex-col overflow-hidden border border-[#C3A684]/15 hover:border-[#C3A684]/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(195,166,132,0.2)]"
    >
      {/* Image */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#302016]">
        <img
          src={dress.images[0]}
          alt={dress.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#261811]/0 group-hover:bg-[#261811]/50 transition-all duration-500 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-center px-4">
            <div className="border border-[#E3C7A5] px-5 py-2.5 text-[#E3C7A5] text-[10px] tracking-[0.35em] uppercase mb-3">
              VIEW LOOK
            </div>
            <div className="flex gap-1.5 justify-center">
              {dress.sizes.slice(0, 4).map(s => (
                <span key={s} className="text-[9px] text-[#D3B791] border border-[#C3A684]/40 px-1.5 py-0.5">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* New arrival badge */}
        {dress.isNewArrival && (
          <div className="absolute top-3 left-3 bg-[#C3A684] text-[#261811] text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 py-1">
            New
          </div>
        )}

        {/* Available badge */}
        {dress.availabilityStatus === 'available' && (
          <div className="absolute top-3 right-3 w-2 h-2 bg-[#C3A684]" title="Available" />
        )}
      </div>

      {/* Info */}
      <div className="bg-[#F4E8D2] p-4 border-t border-[#C3A684]/10">
        <p className="text-[9px] tracking-[0.3em] text-[#C3A684] uppercase mb-1.5">{dress.category}</p>
        <h3 className="font-serif text-sm text-[#57412C] font-light leading-tight mb-2">{dress.name}</h3>
        </div>
    </div>
  );
};
