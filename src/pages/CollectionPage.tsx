import React, { useState, useEffect, useRef } from 'react';
import { useBoutique } from '../context/BoutiqueContext';
import { DressCard } from '../components/DressCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { Dress, DressCategory } from '../types';
import { ArrowRight } from 'lucide-react';

const CATEGORIES: { label: string; value: string }[] = [
  { label: 'All Dresses', value: 'all' },
  { label: 'Evening', value: 'Evening Dresses' },
  { label: 'Wedding Guest', value: 'Wedding Guest Dresses' },
  { label: 'Engagement', value: 'Engagement Dresses' },
  { label: 'Party', value: 'Party Dresses' },
  { label: 'Formal', value: 'Formal Dresses' },
  { label: 'Black Dresses', value: 'Black Dresses' },
  { label: 'New Arrivals', value: 'New Arrivals' },
];

const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Top Rated', value: 'rating' },
  { label: 'New Arrivals', value: 'new' },
];

function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)', transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
};

export const CollectionPage: React.FC = () => {
  const { dresses, navigateTo } = useBoutique();
  const [quickViewDress, setQuickViewDress] = useState<Dress | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => { const t = setTimeout(() => setPageLoaded(true), 80); return () => clearTimeout(t); }, []);

  const filtered = dresses
    .filter(d => {
      if (activeCategory === 'all') return true;
      if (activeCategory === 'New Arrivals') return d.isNewArrival;
      return d.category === activeCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'new') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      // featured first
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  return (
    <div className="bg-[#F4E8D2] text-[#57412C] min-h-screen overflow-x-hidden">

      {/* ── HERO BANNER ─────────────────────────────────── */}
      <div className="relative bg-[#261811] pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden">
        {/* Bg image */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="/assets/dresses/WhatsApp%20Image%202026-10-05%20at%202.40.52%20PM%20(2).jpeg"
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#261811] via-[#261811]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F4E8D2] to-transparent" />

        {/* Decorative line */}
        <div className="absolute top-1/2 right-1/4 w-px h-24 bg-[#C3A684]/20" />

        <div
          className="relative z-10 max-w-7xl mx-auto px-6 md:px-16"
          style={{ opacity: pageLoaded ? 1 : 0, transform: pageLoaded ? 'none' : 'translateY(20px)', transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s' }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#C3A684]" />
            <span className="text-[10px] tracking-[0.4em] text-[#C3A684] uppercase font-bold">GLAM Boutique · New Damietta</span>
          </div>
          <h1 className="font-serif text-5xl sm:text-7xl font-light text-[#E3C7A5] mb-4 leading-tight">
            The <span className="italic text-[#C3A684]">Collection</span>
          </h1>
          <p className="text-[#D3B791] text-base max-w-md leading-relaxed">
            A curated edit of luxury gowns for your most unforgettable moments.
          </p>
          <div className="mt-6 text-[#D3B791]/60 text-xs tracking-wider">
            {filtered.length} {filtered.length === 1 ? 'dress' : 'dresses'} available
          </div>
        </div>
      </div>

      {/* ── FILTERS ─────────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-[#F4E8D2]/95 backdrop-blur-sm border-b border-[#C3A684]/15 shadow-[0_2px_20px_rgba(195,166,132,0.08)]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-4">
          <div className="flex items-center justify-between gap-6 flex-wrap">
            {/* Category tabs */}
            <div className="flex gap-1 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`whitespace-nowrap px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-200 ${
                    activeCategory === cat.value
                      ? 'bg-[#C3A684] text-[#261811]'
                      : 'text-[#7A6248] hover:text-[#57412C] hover:bg-[#C3A684]/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7A6248] bg-transparent border border-[#C3A684]/30 px-3 py-2 focus:outline-none focus:border-[#C3A684] cursor-pointer"
            >
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* ── DRESS GRID ───────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-32">
            <p className="font-serif text-2xl text-[#A48F70] italic mb-4">No dresses found</p>
            <p className="text-sm text-[#A48F70] mb-8">Try a different category.</p>
            <button onClick={() => setActiveCategory('all')} className="text-xs tracking-[0.3em] uppercase text-[#C3A684] border-b border-[#C3A684]/40 pb-1 hover:border-[#C3A684] transition-colors">View All</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((dress, i) => (
              <Reveal key={dress.id} delay={Math.min(i * 0.05, 0.4)}>
                <DressCard dress={dress} onQuickView={(d) => setQuickViewDress(d)} />
              </Reveal>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {filtered.length > 0 && (
          <Reveal delay={0.2}>
            <div className="mt-20 pt-12 border-t border-[#C3A684]/15 text-center">
              <p className="font-serif text-2xl text-[#57412C] italic mb-6">
                Can't find the perfect dress?
              </p>
              <p className="text-[#7A6248] text-sm mb-8">
                Visit our atelier for a private fitting and personalised styling session.
              </p>
              <a
                href="https://wa.me/201042096306?text=Hello%20GLAM%20Boutique%2C%20I%20would%20like%20to%20book%20a%20personal%20fitting%20session."
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 bg-[#C3A684] text-[#261811] px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] hover:bg-[#302016] hover:text-[#E3C7A5] transition-all duration-300 hover:-translate-y-0.5"
              >
                Book a Private Fitting
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </Reveal>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal dress={quickViewDress} onClose={() => setQuickViewDress(null)} />
    </div>
  );
};
