import React from 'react';
import { useBoutique } from '../context/BoutiqueContext';
import { ShieldCheck, Clock, RotateCcw, AlertTriangle } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const { navigateTo } = useBoutique();

  return (
    <div className="bg-[#F4E8D2] text-[#A48F70] min-h-screen pt-28 sm:pt-36 pb-24 font-sans selection:bg-[#C3A684] selection:text-[#F4E8D2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C3A684] font-bold">
            Boutique Policies
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#A48F70] mt-2">
            Terms & Conditions of Rental
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#A6927B] font-serif italic">
            Last updated: 2026 Season • GLAM Boutique, New Damietta, Egypt
          </p>
        </div>

        <div className="bg-[#302016] border border-[#C3A684]/20 p-8 sm:p-12 shadow-xs space-y-8 text-sm text-[#A6927B] leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-light text-[#A48F70]">
              1. Rental Period & Pickup
            </h2>
            <p>
              The standard rental duration at GLAM Boutique is three (3) consecutive calendar days. Pickup is scheduled the day prior to the recorded event date at our atelier (Lebanon Street, Al-Helou Building, New Damietta). The dress must be returned by 9:00 PM on the designated return date.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-light text-[#A48F70]">
              2. Security Deposit & Refund Process
            </h2>
            <p>
              A mandatory security deposit (between 1,000 EGP and 2,000 EGP depending on gown tier) is placed upon dress collection. The deposit is held as a guarantee against loss, non-return, or severe structural damage. Upon timely return and standard inspection by our salon team, the security deposit is refunded in full immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-light text-[#A48F70]">
              3. Garment Care & Cleaning Policy
            </h2>
            <p>
              Clients are strictly prohibited from washing, spot-cleaning, bleaching, or ironing rented dresses. High-temperature irons or consumer detergent can permanently damage delicate tulle, silk organza, and hand-strung crystal beading. Standard eco-friendly couture dry cleaning and garment steaming are included in the rental price and managed exclusively by GLAM Boutique.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-light text-[#A48F70]">
              4. Alterations & Fit Adjustments
            </h2>
            <p>
              No permanent tailoring, cutting, or mechanical modifications may be made to any dress. Our boutique atelier provides safe temporary fitting clips, silicone breast padding, and hem stabilizers during your private fitting session.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-light text-[#A48F70]">
              5. Cancellations & Rescheduling
            </h2>
            <p>
              Reservations can be rescheduled to an alternate available date or transferred to another available dress with at least 5 business days' advance notice prior to the original event date.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
