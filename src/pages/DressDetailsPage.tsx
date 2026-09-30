import React, { useState, useMemo } from 'react';
import { useBoutique } from '../context/BoutiqueContext';
import { DressCard } from '../components/DressCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { OptimizedImage } from '../components/OptimizedImage';
import { DressReviewsSection } from '../components/DressReviewsSection';
import { Dress } from '../types';
import { getDressInquiryWhatsAppUrl, getFittingWhatsAppUrl } from '../utils/whatsapp';
import {
  Sparkles,
  Maximize2,
  X,
  ShieldCheck,
  Clock,
  ArrowRight,
  Phone,
  MessageCircle,
  Star,
  MapPin,
  Ruler,
  Check,
  Sparkle,
} from 'lucide-react';

export const DressDetailsPage: React.FC = () => {
  const {
    dresses,
    currentRoute,
    navigateTo,
    settings,
    addToast,
    getDressRatingSummary,
  } = useBoutique();

  const dressId = currentRoute.params.id || 'dress-1';
  const dress = dresses.find((d) => d.id === dressId) || dresses[0];
  const ratingSummary = getDressRatingSummary(dress.id);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(dress.sizes[0] || 'M');
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [quickViewDress, setQuickViewDress] = useState<Dress | null>(null);

  // WhatsApp link preparation
  const handleWhatsAppInquiry = () => {
    const url = getDressInquiryWhatsAppUrl({
      name: dress.name,
      category: dress.category,
      rentalPrice: dress.rentalPrice,
      selectedSize,
    });
    window.open(url, '_blank');
  };

  // Fitting appointment WhatsApp link
  const handleFittingAppointment = () => {
    const url = getFittingWhatsAppUrl({
      dressName: dress.name,
    });
    window.open(url, '_blank');
  };

  // Dynamic 'You May Also Like' multi-criteria recommendation algorithm
  const relatedDresses = useMemo(() => {
    return dresses
      .filter((d) => d.id !== dress.id)
      .map((candidate) => {
        let score = 0;
        if (candidate.category === dress.category) score += 5;
        const commonOccasions = candidate.occasions.filter((o) =>
          dress.occasions.includes(o)
        );
        score += commonOccasions.length * 2.5;
        const commonColors = candidate.colors.filter((c) =>
          dress.colors.includes(c)
        );
        score += commonColors.length * 3;
        if (candidate.featured) score += 1;
        if (candidate.isNewArrival) score += 0.5;

        return { dress: candidate, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((item) => item.dress);
  }, [dresses, dress]);

  return (
    <div className="bg-[#F4E8D2] text-[#A48F70] min-h-screen pt-28 sm:pt-36 pb-32 font-sans selection:bg-[#C3A684] selection:text-[#F4E8D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#A6927B] mb-8">
          <button onClick={() => navigateTo('home')} className="hover:text-[#C3A684]">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigateTo('collection')} className="hover:text-[#C3A684]">
            Collection
          </button>
          <span>/</span>
          <span className="text-[#A48F70] font-semibold">{dress.name}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: Large Image Gallery with Fullscreen Viewer */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#302016] shadow-xl border border-[#C3A684]/25 group">
              <OptimizedImage
                src={dress.images[activeImageIdx] || dress.images[0]}
                alt={dress.name}
                sizesPreset="detailHero"
                priority={true}
                quality={88}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Fullscreen Trigger */}
              <button
                onClick={() => setIsFullscreenOpen(true)}
                className="absolute top-4 right-4 z-10 w-9 h-9 bg-[#F4E8D2]/85 hover:bg-[#C3A684] text-[#A48F70] hover:text-[#F4E8D2] border border-[#C3A684]/30 flex items-center justify-center transition-all shadow-sm"
                aria-label="View Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {dress.isNewArrival && (
                  <span className="px-3 py-1 bg-[#C3A684] text-[#F4E8D2] text-[9px] font-bold uppercase tracking-[0.2em] shadow-sm">
                    NEW ARRIVAL
                  </span>
                )}
                {dress.featured && !dress.isNewArrival && (
                  <span className="px-3 py-1 bg-[#302016] text-[#C3A684] border border-[#C3A684]/40 text-[9px] font-bold uppercase tracking-[0.2em] shadow-sm">
                    SIGNATURE
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {dress.images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {dress.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative aspect-[3/4] overflow-hidden border transition-all ${
                      activeImageIdx === idx
                        ? 'border-[#C3A684] ring-2 ring-[#C3A684]/50 opacity-100'
                        : 'border-[#C3A684]/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <OptimizedImage
                      src={img}
                      alt={`${dress.name} view ${idx + 1}`}
                      sizesPreset="thumbnail"
                      quality={75}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Boutique Location Notice Box */}
            <div className="p-6 bg-[#302016] border border-[#C3A684]/20 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C3A684] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A48F70]">
                    Available for Private Fitting in New Damietta
                  </h4>
                  <p className="text-xs text-[#A6927B] mt-0.5">
                    Lebanon Street, Al-Helou Building • Open Daily 1:00 PM – 9:00 PM
                  </p>
                </div>
              </div>

              <a
                href={getFittingWhatsAppUrl({ dressName: dress.name })}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 btn-glam-secondary px-4 py-2"
              >
                Schedule Fitting
              </a>
            </div>
          </div>

          {/* RIGHT: Dress Details & Concierge Actions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header / Category */}
            <div>
              <div className="mb-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C3A684] font-bold">
                  {dress.category}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#A48F70] leading-tight">
                {dress.name}
              </h1>

              <p className="font-serif italic text-base text-[#A6927B] mt-1">
                {dress.subtitle}
              </p>

              {/* Rating Snippet */}
              <div className="flex items-center gap-2 mt-3 text-xs">
                <div className="flex items-center text-[#C3A684]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        s <= Math.round(ratingSummary.average)
                          ? 'fill-[#C3A684] text-[#C3A684]'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-[#A48F70]">
                  {ratingSummary.average.toFixed(1)}
                </span>
                <span className="text-[#A6927B]">
                  ({ratingSummary.count} client reviews)
                </span>
              </div>
            </div>


            {/* Rental Duration Banner */}
            <div className="p-5 bg-[#302016] border border-[#C3A684]/20 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#A6927B] block">
                    Rental Period
                  </span>
                  <span className="font-serif text-2xl font-normal text-[#E3C7A5]">
                    {dress.rentalDuration}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-widest text-[#A6927B] block">
                    Deposit
                  </span>
                  <span className="text-sm font-semibold text-[#D3B791]">
                    Refundable
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-[#A6927B]/70 italic mt-3">
                Deposit is refunded upon return of the gown in original condition.
              </p>
            </div>

            {/* Size Selector & Size Guide */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#A48F70]">
                  Select Size:
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs text-[#C3A684] hover:underline flex items-center gap-1 font-medium"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size & Measurement Guide</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {dress.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`min-w-12 py-2 px-3 text-xs font-semibold uppercase tracking-wider border transition-all ${
                      selectedSize === s
                        ? 'bg-[#C3A684] text-[#F4E8D2] border-[#C3A684] shadow-xs'
                        : 'bg-[#302016] text-[#A48F70] border-[#C3A684]/30 hover:border-[#C3A684]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Available Colors */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A48F70]">
                Palette:
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {dress.colors.map((c) => (
                  <span
                    key={c}
                    className="px-3 py-1 bg-[#302016] border border-[#C3A684]/20 text-[#A48F70] font-medium"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Availability & Concierge Notice Box */}
            <div className="p-5 bg-[#302016] border border-[#C3A684]/30 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-[#C3A684] font-semibold text-xs uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Availability & Reservations</span>
              </div>
              <p className="text-xs text-[#A6927B] leading-relaxed">
                Availability is confirmed directly by our boutique team based on your exact event date. Reach out on WhatsApp with your date and preferred size to verify availability and schedule your private fitting session in New Damietta.
              </p>
            </div>

            {/* Primary Conversion CTAs */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleWhatsAppInquiry}
                className="w-full btn-glam-primary"
              >
                <MessageCircle className="w-4 h-4" />
                <span>INQUIRE ABOUT THIS DRESS ON WHATSAPP</span>
              </button>

              <button
                onClick={handleFittingAppointment}
                className="w-full btn-glam-secondary"
              >
                <Sparkles className="w-4 h-4" />
                <span>BOOK A PRIVATE FITTING IN NEW DAMIETTA</span>
              </button>
            </div>

            {/* Dress Specifications Accordion / Lists */}
            <div className="border-t border-[#C3A684]/15 pt-6 space-y-4 text-xs">
              <div className="space-y-2">
                <h4 className="font-semibold uppercase tracking-wider text-[#A48F70]">
                  Description & Cut
                </h4>
                <p className="text-[#A6927B] leading-relaxed font-light">
                  {dress.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#C3A684]/10">
                <div>
                  <span className="text-[#A6927B] block">Fabric:</span>
                  <span className="font-medium text-[#A48F70]">{dress.fabric}</span>
                </div>
                <div>
                  <span className="text-[#A6927B] block">Silhouette:</span>
                  <span className="font-medium text-[#A48F70]">{dress.silhouette}</span>
                </div>
                <div>
                  <span className="text-[#A6927B] block">Neckline:</span>
                  <span className="font-medium text-[#A48F70]">{dress.neckline}</span>
                </div>
                <div>
                  <span className="text-[#A6927B] block">Length:</span>
                  <span className="font-medium text-[#A48F70]">{dress.length}</span>
                </div>
              </div>

              {dress.embellishments && dress.embellishments.length > 0 && (
                <div className="pt-2 border-t border-[#C3A684]/10">
                  <span className="text-[#A6927B] block mb-1">Embellishments:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {dress.embellishments.map((emb, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-[#F4E8D2] border border-[#C3A684]/20 text-[#A48F70] text-[11px]"
                      >
                        {emb}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {dress.careInstructions && (
                <div className="pt-2 border-t border-[#C3A684]/10">
                  <span className="text-[#A6927B] block mb-1">Hygiene & Care:</span>
                  <p className="text-[#A6927B] text-[11px]">
                    {dress.careInstructions}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Informational Reviews & Fitting Feedback */}
        <DressReviewsSection dress={dress} />

        {/* "You May Also Like" Recommendation Section */}
        <section className="mt-24 pt-16 border-t border-[#C3A684]/15">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C3A684]">
                Curated Recommendations
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#A48F70] mt-1">
                You May Also Like
              </h2>
              <p className="text-xs sm:text-sm text-[#A6927B] mt-1">
                Complementary silhouettes and colors for your upcoming celebration.
              </p>
            </div>

            <button
              onClick={() => navigateTo('collection')}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#A48F70] hover:text-[#C3A684] transition-colors"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedDresses.map((item) => (
              <DressCard
                key={item.id}
                dress={item}
                onQuickView={(d) => setQuickViewDress(d)}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Sticky Mobile Conversion Bar (Ensures seamless inquiry on phones) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-[#F4E8D2]/95 backdrop-blur-md border-t border-[#C3A684]/20 px-4 py-3 z-40 flex items-center justify-between gap-3 shadow-2xl">
        <div className="min-w-0">
          <span className="text-[9px] uppercase tracking-wider text-[#A6927B] block">Rental Period</span>
          <span className="font-serif text-base font-medium text-[#57412C] leading-tight block truncate">
            {dress.rentalDuration}
          </span>
        </div>

        <button
          onClick={handleWhatsAppInquiry}
          className="flex-1 btn-glam-primary py-3 px-4"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Inquire on WhatsApp</span>
        </button>
      </div>

      {/* Fullscreen Gallery Lightbox */}
      {isFullscreenOpen && (
        <div className="fixed inset-0 z-50 bg-[#261811]/95 flex flex-col justify-between p-4 sm:p-8">
          <div className="flex items-center justify-between text-white pb-4 border-b border-[#C3A684]/20">
            <div>
              <span className="font-serif text-lg text-[#A48F70]">{dress.name}</span>
              <span className="text-xs text-[#A6927B] ml-3">
                {activeImageIdx + 1} of {dress.images.length}
              </span>
            </div>
            <button
              onClick={() => setIsFullscreenOpen(false)}
              className="p-2 hover:text-[#C3A684] text-[#A48F70]"
              aria-label="Close fullscreen"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-4">
            <OptimizedImage
              src={dress.images[activeImageIdx]}
              alt={dress.name}
              sizesPreset="detailHero"
              quality={95}
              containerClassName="max-w-4xl max-h-[75vh]"
              className="max-w-full max-h-[75vh] object-contain"
            />
          </div>

          <div className="flex justify-center gap-2 overflow-x-auto pt-4">
            {dress.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`w-14 h-18 overflow-hidden border transition-all ${
                  activeImageIdx === idx ? 'border-[#C3A684] ring-1 ring-[#C3A684]' : 'border-[#C3A684]/20 opacity-50'
                }`}
              >
                <OptimizedImage
                  src={img}
                  alt=""
                  sizesPreset="thumbnail"
                  quality={60}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size & Measurement Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="relative bg-[#302016] text-[#A48F70] max-w-lg w-full p-6 sm:p-8 border border-[#C3A684]/30 shadow-2xl">
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#A6927B] hover:text-[#C3A684]"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C3A684]">
              GLAM Atelier Standard
            </span>
            <h3 className="font-serif text-2xl font-light text-[#A48F70] mt-1 mb-4">
              Size & Fit Guide
            </h3>

            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#C3A684]/20 font-semibold uppercase text-[10px] tracking-wider text-[#A6927B]">
                    <th className="py-2">Size</th>
                    <th className="py-2">Bust (cm)</th>
                    <th className="py-2">Waist (cm)</th>
                    <th className="py-2">Hips (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C3A684]/10 text-[#A48F70]/85">
                  <tr>
                    <td className="py-2.5 font-bold text-[#C3A684]">XS</td>
                    <td>82 – 85</td>
                    <td>62 – 65</td>
                    <td>88 – 91</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-[#C3A684]">S</td>
                    <td>86 – 89</td>
                    <td>66 – 69</td>
                    <td>92 – 95</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-[#C3A684]">M</td>
                    <td>90 – 94</td>
                    <td>70 – 74</td>
                    <td>96 – 100</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-[#C3A684]">L</td>
                    <td>95 – 99</td>
                    <td>75 – 79</td>
                    <td>101 – 105</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-[#C3A684]">XL</td>
                    <td>100 – 105</td>
                    <td>80 – 85</td>
                    <td>106 – 111</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-[#C3A684]">XXL</td>
                    <td>106 – 112</td>
                    <td>86 – 92</td>
                    <td>112 – 118</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-[#F4E8D2] border border-[#C3A684]/20 text-xs text-[#A6927B] space-y-1">
              <p className="font-semibold text-[#A48F70]">Complimentary In-Boutique Pinning</p>
              <p>
                Every dress can be delicately pinned and temporarily micro-adjusted by our styling team in New Damietta to ensure a tailored fit.
              </p>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="btn-glam-primary"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal for Recommendations */}
      <QuickViewModal
        dress={quickViewDress}
        onClose={() => setQuickViewDress(null)}
      />
    </div>
  );
};
