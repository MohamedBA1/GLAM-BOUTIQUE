import React, { useState } from 'react';
import { Dress } from '../types';
import { useBoutique } from '../context/BoutiqueContext';
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';

interface DressReviewsSectionProps {
  dress: Dress;
}

export const DressReviewsSection: React.FC<DressReviewsSectionProps> = ({ dress }) => {
  const { getDressReviews, getDressRatingSummary } = useBoutique();

  const reviews = getDressReviews(dress.id);
  const ratingSummary = getDressRatingSummary(dress.id);
  const [filterRating, setFilterRating] = useState<'all' | '5' | '4'>('all');

  const filteredReviews = reviews.filter((r) => {
    if (filterRating === '5') return r.rating === 5;
    if (filterRating === '4') return r.rating === 4;
    return true;
  });

  return (
    <section className="border-t border-[#C3A684]/15 pt-16 mt-16 font-sans">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C3A684]">
            Client Experiences & Fitting Feedback
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#A48F70] mt-1">
            Reviews & Fitting Notes
          </h2>
          <p className="text-xs sm:text-sm text-[#A6927B] mt-1">
            Real feedback from clients who wore this gown for celebrations in New Damietta.
          </p>
        </div>

        <a
          href={getGeneralWhatsAppUrl()}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#302016] border border-[#C3A684]/30 hover:border-[#C3A684] text-xs font-semibold uppercase tracking-wider text-[#A48F70] transition-colors shadow-xs"
        >
          <MessageCircle className="w-4 h-4 text-[#C3A684]" />
          <span>Ask Stylist About Fit</span>
        </a>
      </div>

      {/* Rating Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 sm:p-8 bg-[#302016] border border-[#C3A684]/20 shadow-xs mb-10">
        {/* Overall Score */}
        <div className="flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#C3A684]/15 pb-6 md:pb-0 md:pr-6">
          <div className="font-serif text-5xl font-light text-[#A48F70]">
            {ratingSummary.average.toFixed(1)}
          </div>
          <div className="flex items-center gap-1 text-[#C3A684] my-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-4 h-4 ${
                  s <= Math.round(ratingSummary.average)
                    ? 'fill-[#C3A684] text-[#C3A684]'
                    : 'text-[#A48F70]/20'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-[#A6927B]">
            Based on {ratingSummary.count} boutique client fitting reviews
          </p>
        </div>

        {/* Breakdown bars */}
        <div className="space-y-2 border-b md:border-b-0 md:border-r border-[#C3A684]/15 pb-6 md:pb-0 md:px-6 flex flex-col justify-center">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = ratingSummary.breakdown[stars] || 0;
            const pct = ratingSummary.count > 0 ? (count / ratingSummary.count) * 100 : 0;
            return (
              <div key={stars} className="flex items-center gap-3 text-xs">
                <span className="w-12 text-[#A48F70]/80 flex items-center gap-1 font-medium">
                  {stars} <Star className="w-3 h-3 fill-[#C3A684] text-[#C3A684]" />
                </span>
                <div className="flex-1 h-1.5 bg-[#F4E8D2] overflow-hidden border border-[#C3A684]/20">
                  <div
                    className="h-full bg-[#C3A684] transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-8 text-right text-[11px] text-[#A6927B]">
                  {count}
                </span>
              </div>
            );
          })}
        </div>

        {/* Sizing & Fit Distribution */}
        <div className="flex flex-col justify-center md:pl-6 space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A48F70]">
            Fit Assessment
          </h4>
          <div className="space-y-1.5 text-xs text-[#A6927B]">
            <div className="flex justify-between items-center py-1 border-b border-[#C3A684]/10">
              <span>True to Size:</span>
              <span className="font-semibold text-[#C3A684]">
                {ratingSummary.fitBreakdown?.trueToSize || 0} clients
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-[#C3A684]/10">
              <span>Runs Small:</span>
              <span className="font-medium text-[#A48F70]">
                {ratingSummary.fitBreakdown?.runsSmall || 0} clients
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span>Runs Generous / Stretchy:</span>
              <span className="font-medium text-[#A48F70]">
                {ratingSummary.fitBreakdown?.runsLarge || 0} clients
              </span>
            </div>
          </div>
          <p className="text-[11px] text-[#A6927B]/70 italic pt-1">
            Complimentary fit pinning during your New Damietta fitting appointment.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xs font-semibold text-[#A6927B] mr-2 uppercase tracking-wider">
          Filter:
        </span>
        <button
          onClick={() => setFilterRating('all')}
          className={`px-3 py-1 text-xs uppercase tracking-wider font-semibold transition-colors ${
            filterRating === 'all'
              ? 'bg-[#C3A684] text-[#F4E8D2]'
              : 'bg-[#302016] border border-[#C3A684]/20 text-[#A6927B] hover:text-[#A48F70]'
          }`}
        >
          All ({reviews.length})
        </button>
        <button
          onClick={() => setFilterRating('5')}
          className={`px-3 py-1 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1 ${
            filterRating === '5'
              ? 'bg-[#C3A684] text-[#F4E8D2]'
              : 'bg-[#302016] border border-[#C3A684]/20 text-[#A6927B] hover:text-[#A48F70]'
          }`}
        >
          5 Stars Only
        </button>
        <button
          onClick={() => setFilterRating('4')}
          className={`px-3 py-1 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1 ${
            filterRating === '4'
              ? 'bg-[#C3A684] text-[#F4E8D2]'
              : 'bg-[#302016] border border-[#C3A684]/20 text-[#A6927B] hover:text-[#A48F70]'
          }`}
        >
          4 Stars Only
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="p-8 text-center bg-[#302016] border border-[#C3A684]/20 text-xs text-[#A6927B]">
            No reviews matching this rating filter.
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 bg-[#302016] border border-[#C3A684]/20 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-serif font-medium text-base text-[#A48F70]">
                      {rev.customerName}
                    </span>
                    {rev.verifiedRental && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#C3A684]/15 text-[#C3A684] text-[10px] font-bold tracking-wider uppercase border border-[#C3A684]/20">
                        <ShieldCheck className="w-3 h-3" />
                        Verified Boutique Fitting
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] text-[#A6927B]">
                    {new Date(rev.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center text-[#C3A684]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= rev.rating ? 'fill-[#C3A684] text-[#C3A684]' : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  {rev.fitRating && (
                    <span className="text-[11px] px-2 py-0.5 bg-[#F4E8D2] border border-[#C3A684]/20 text-[#A6927B] font-medium">
                      Fit: {rev.fitRating}
                    </span>
                  )}
                  {rev.occasion && (
                    <span className="text-[11px] px-2 py-0.5 bg-[#F4E8D2] border border-[#C3A684]/20 text-[#A6927B] font-medium">
                      {rev.occasion}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#A48F70]/85 leading-relaxed font-light">
                  "{rev.comment}"
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
