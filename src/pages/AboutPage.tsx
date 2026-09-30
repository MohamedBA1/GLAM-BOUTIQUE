import React from 'react';
import { useBoutique } from '../context/BoutiqueContext';
import { GlamLogo } from '../components/GlamLogo';
import {
  Crown,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  Heart,
  ArrowRight,
  Instagram,
  CheckCircle,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useBoutique();

  return (
    <div className="bg-[#F4E8D2] text-[#A48F70] min-h-screen pt-28 sm:pt-36 pb-24 font-sans selection:bg-[#C3A684] selection:text-[#F4E8D2]">
      {/* Editorial Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <GlamLogo size="xl" className="drop-shadow-sm" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C3A684] font-bold">
            Our Story &amp; Heritage
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#A48F70] mt-2 leading-tight">
            The World of GLAM Boutique
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#A6927B] font-light leading-relaxed italic font-serif">
            "Redefining luxury dress rentals in New Damietta through curated couture, immaculate care, and personal styling."
          </p>
        </div>

        {/* Hero Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="aspect-[3/4] overflow-hidden shadow-xl border border-[#C3A684]/25">
            <img
              src="/assets/dresses/WhatsApp%20Image%202026-10-05%20at%202.40.51%20PM%20(1).jpeg"
              alt="GLAM Boutique Atelier"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[3/4] overflow-hidden shadow-xl border border-[#C3A684]/25 md:translate-y-6">
            <img
              src="/assets/dresses/WhatsApp%20Image%202026-10-05%20at%202.40.51%20PM%20(2).jpeg"
              alt="Haute Couture Silhouette"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[3/4] overflow-hidden shadow-xl border border-[#C3A684]/25">
            <img
              src="/assets/dresses/WhatsApp%20Image%202026-10-05%20at%202.40.51%20PM%20(3).jpeg"
              alt="Celebration Fitting"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Boutique Story Section */}
      <section className="py-16 bg-[#261811] border-y border-[#C3A684]/15">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-[#C3A684] font-bold">
                Our Vision
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#A48F70]">
                Every Woman Deserves Haute Couture
              </h2>
              <p className="text-sm text-[#A6927B] leading-relaxed">
                Founded with a passionate vision in New Damietta, GLAM Boutique was born from a simple belief: high-end luxury fashion should be experienced joyfully and sustainably, without the enormous expense and closet burden of single-wear purchases.
              </p>
              <p className="text-sm text-[#A6927B] leading-relaxed">
                Located on prestigious Lebanon Street in the Al-Helou Building, our boutique welcomes brides-to-be, sisters of the bride, gala guests, and modern women who want to make a distinctive fashion statement.
              </p>
            </div>

            <div className="bg-[#302016] p-8 border border-[#C3A684]/20 shadow-xs space-y-6">
              <h3 className="font-serif text-xl font-light text-[#A48F70]">
                The GLAM Standards
              </h3>
              <ul className="space-y-4 text-xs sm:text-sm text-[#A6927B]">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#C3A684] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#A48F70]">Masterpiece Curation:</strong> Hand-picked evening and engagement gowns crafted with French lace, Italian satins, and hand-embroidered crystals.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#C3A684] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#A48F70]">Immaculate Hygiene:</strong> Every gown undergoes dual-phase eco-sensitive dry cleaning and steam sanitation before leaving our salon.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#C3A684] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#A48F70]">Private Fitting Salon:</strong> Warm, welcoming atmosphere with private fitting suites open daily 1 PM to 9 PM.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Atelier Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#302016] p-8 sm:p-14 text-[#A48F70] relative overflow-hidden shadow-2xl border border-[#C3A684]/30">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C3A684] font-bold">
                Visit New Damietta
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#A48F70]">
                Our Fitting Atelier
              </h2>
              <p className="text-sm text-[#A6927B] leading-relaxed max-w-xl font-light">
                We invite you to step into our boutique on Lebanon Street. Try on dresses in private, relaxed fitting rooms, receive complimentary styling advice, and secure your event dates with complete peace of mind.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                <div className="p-4 bg-[#F4E8D2] border border-[#C3A684]/25">
                  <div className="flex items-center gap-2 text-[#C3A684] font-bold mb-1">
                    <MapPin className="w-4 h-4" />
                    <span>Location</span>
                  </div>
                  <p className="text-[#A48F70] font-medium">Lebanon Street, Al-Helou Building</p>
                  <p className="text-[#A6927B]/70">New Damietta, Egypt</p>
                </div>

                <div className="p-4 bg-[#F4E8D2] border border-[#C3A684]/25">
                  <div className="flex items-center gap-2 text-[#C3A684] font-bold mb-1">
                    <Clock className="w-4 h-4" />
                    <span>Opening Hours</span>
                  </div>
                  <p className="text-[#A48F70] font-medium">Every Day</p>
                  <p className="text-[#A6927B]/70">1:00 PM – 9:00 PM</p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => navigateTo('collection')}
                  className="btn-glam-primary"
                >
                  Browse Dresses
                </button>
                <button
                  onClick={() => navigateTo('contact')}
                  className="btn-glam-secondary"
                >
                  Get Directions & Contact
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 aspect-[4/5] overflow-hidden border border-[#C3A684]/25 shadow-xl">
              <img
                src="/assets/dresses/WhatsApp%20Image%202026-10-05%20at%202.40.51%20PM.jpeg"
                alt="GLAM Atelier"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

