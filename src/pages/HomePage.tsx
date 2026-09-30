import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useBoutique } from '../context/BoutiqueContext';
import { Dress } from '../types';
import { getFittingWhatsAppUrl } from '../utils/whatsapp';
import {
  ArrowRight, Star, ChevronLeft, ChevronRight,
  Instagram, MessageCircle, CheckCircle, Quote
} from 'lucide-react';

// ─── Local image paths ─────────────────────────────────────────────────────
const D = (n: string) => `/assets/dresses/${encodeURIComponent(n)}`;
const IMG = [
  D('WhatsApp Image 2026-10-05 at 2.40.51 PM (1).jpeg'),
  D('WhatsApp Image 2026-10-05 at 2.40.51 PM (2).jpeg'),
  D('WhatsApp Image 2026-10-05 at 2.40.51 PM (3).jpeg'),
  D('WhatsApp Image 2026-10-05 at 2.40.51 PM.jpeg'),
  D('WhatsApp Image 2026-10-05 at 2.40.52 PM (1).jpeg'),
  D('WhatsApp Image 2026-10-05 at 2.40.52 PM (2).jpeg'),
  D('WhatsApp Image 2026-10-05 at 2.40.52 PM (3).jpeg'),
  D('WhatsApp Image 2026-10-05 at 2.40.52 PM (4).jpeg'),
  D('WhatsApp Image 2026-10-05 at 2.40.52 PM.jpeg'),
  D('WhatsApp Image 2026-10-05 at 2.40.53 PM (1).jpeg'),
  D('WhatsApp Image 2026-10-05 at 2.40.53 PM (2).jpeg'),
  D('WhatsApp Image 2026-10-05 at 2.40.53 PM (3).jpeg'),
  D('WhatsApp Image 2026-10-05 at 2.40.53 PM (4).jpeg'),
  D('WhatsApp Image 2026-10-05 at 2.40.53 PM (5).jpeg'),
  D('WhatsApp Image 2026-10-05 at 2.40.53 PM.jpeg'),
];

// ─── Scroll reveal hook ────────────────────────────────────────────────────
function useScrollReveal(threshold = 0.15) {
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

const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  dir?: 'up' | 'left' | 'right' | 'none';
  className?: string;
}> = ({ children, delay = 0, dir = 'up', className = '' }) => {
  const { ref, visible } = useScrollReveal();
  const transforms: Record<string, string> = {
    up: 'translateY(40px)', left: 'translateX(-40px)', right: 'translateX(40px)', none: 'none',
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : transforms[dir],
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

// ─── Static data ───────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: 'Nouran El-Shamy', event: 'Sister of the Bride · New Damietta', review: 'GLAM Boutique made finding an engagement dress completely stress-free. The fitting atelier on Lebanon Street was calm, private, and the dress looked straight off the Milan runway!', dress: 'Emerald Satin Gala Column', rating: 5 },
  { name: 'Salma Mansour', event: 'Engagement Party · Ras El Bar', review: 'The quality of the beading and crystal embellishment was flawless. They steamed it perfectly in the protective garment bag. Highly recommended for anyone in Damietta!', dress: 'Aura Crystal Embellished Gown', rating: 5 },
  { name: 'Dina Abdel-Rahman', event: 'Black-Tie Wedding Guest', review: 'I messaged them on WhatsApp, they confirmed availability immediately and booked a private fitting room for me the same afternoon. Exceptional hospitality and couture standards.', dress: 'Midnight Velvet Mermaid Gown', rating: 5 },
];

const QUIZ_STEPS = [
  { question: "What's the occasion?", key: 'occasion', options: ['Wedding', 'Engagement', 'Evening', 'Party', 'Graduation', 'Special Event'] },
  { question: "What's your style?", key: 'style', options: ['Elegant', 'Romantic', 'Bold', 'Classic', 'Minimal'] },
  { question: 'Choose your mood', key: 'mood', options: ['Timeless', 'Glamorous', 'Romantic', 'Modern'] },
];

const MIRROR_STYLES = [
  { label: 'ELEGANT', image: IMG[0], desc: 'Refined silhouettes designed for unforgettable evenings.', mood: 'Timeless · Graceful' },
  { label: 'ROMANTIC', image: IMG[10], desc: 'Soft drapes and delicate details that celebrate femininity.', mood: 'Dreamy · Soft' },
  { label: 'BOLD', image: IMG[6], desc: 'Statement gowns that own every room they enter.', mood: 'Fierce · Confident' },
  { label: 'CLASSIC', image: IMG[3], desc: 'Enduring silhouettes inspired by haute couture heritage.', mood: 'Poised · Sophisticated' },
];

const SEEN_ON = [
  { name: 'Mariam', occasion: 'Engagement Night', dressNo: '024', image: IMG[1], tall: true, wide: true },
  { name: 'Nourhan', occasion: 'Sister of Bride', dressNo: '007', image: IMG[8], tall: false, wide: false },
  { name: 'Salma', occasion: 'Evening Gala', dressNo: '012', image: IMG[12], tall: true, wide: false },
  { name: 'Dina', occasion: 'Graduation Ball', dressNo: '031', image: IMG[5], tall: false, wide: false },
  { name: 'Farida', occasion: 'Wedding Guest', dressNo: '019', image: IMG[13], tall: false, wide: false },
  { name: 'Heba', occasion: 'Black-Tie Dinner', dressNo: '003', image: IMG[11], tall: true, wide: false },
];

const EDITORIAL = [
  { no: '01', title: 'THE ELEGANCE EDIT', desc: 'Refined silhouettes for the woman who commands the room with grace.', image: IMG[0], imageAlt: IMG[9] },
  { no: '02', title: 'EVENING GLAM', desc: 'Liquid metallics and dramatic drape for unforgettable nights.', image: IMG[8], imageAlt: IMG[7] },
  { no: '03', title: 'THE ROMANTIC EDIT', desc: 'Soft tulle, blush roses, and whisper-light fabrications.', image: IMG[10], imageAlt: IMG[1] },
  { no: '04', title: 'TIMELESS CLASSICS', desc: 'Heritage-quality construction in enduring silhouettes.', image: IMG[3], imageAlt: IMG[12] },
];

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export const HomePage: React.FC = () => {
  const { dresses, navigateTo } = useBoutique();

  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroLoaded(true), 100); return () => clearTimeout(t); }, []);

  // Runway drag
  const runwayRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);
  const onMouseDown = (e: React.MouseEvent) => { setIsDragging(true); dragStartX.current = e.pageX; scrollStartX.current = runwayRef.current?.scrollLeft || 0; };
  const onMouseMove = useCallback((e: MouseEvent) => { if (!isDragging || !runwayRef.current) return; runwayRef.current.scrollLeft = scrollStartX.current - (e.pageX - dragStartX.current); }, [isDragging]);
  const onMouseUp = () => setIsDragging(false);
  useEffect(() => { window.addEventListener('mousemove', onMouseMove); window.addEventListener('mouseup', onMouseUp); return () => { window.removeEventListener('mousemove', onMouseMove); window.removeEventListener('mouseup', onMouseUp); }; }, [onMouseMove]);

  // Quiz
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizDone, setQuizDone] = useState(false);
  const [quizResults, setQuizResults] = useState<Dress[]>([]);

  const handleQuizAnswer = (key: string, val: string) => {
    const next = { ...quizAnswers, [key]: val };
    setQuizAnswers(next);
    if (quizStep < QUIZ_STEPS.length - 1) { setQuizStep(quizStep + 1); }
    else {
      const occ = next.occasion?.toLowerCase() || '';
      const matched = dresses.filter(d => d.occasions.some(o => o.toLowerCase().includes(occ) || occ.includes(o.toLowerCase()))).slice(0, 4);
      setQuizResults(matched.length >= 2 ? matched : dresses.slice(0, 4));
      setQuizDone(true);
    }
  };
  const resetQuiz = () => { setQuizStep(0); setQuizAnswers({}); setQuizDone(false); setQuizResults([]); };

  // Mirror
  const [mirrorIdx, setMirrorIdx] = useState(0);
  const [mirrorFading, setMirrorFading] = useState(false);
  const switchMirror = (idx: number) => { setMirrorFading(true); setTimeout(() => { setMirrorIdx(idx); setMirrorFading(false); }, 300); };

  // Testimonials
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  useEffect(() => { const t = setInterval(() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length), 5000); return () => clearInterval(t); }, []);

  const runwayDresses = [...dresses, ...dresses].slice(0, 14);

  return (
    <div className="bg-[#F4E8D2] text-[#57412C] font-sans selection:bg-[#C3A684] selection:text-[#F4E8D2] overflow-x-hidden">

      {/* ══ HERO ══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#261811]">
        <div className="absolute inset-0 transition-transform duration-[2s] ease-out" style={{ transform: heroLoaded ? 'scale(1.04)' : 'scale(1.12)' }}>
          <img src="/assets/hero-banner.png" alt="GLAM hero" className="w-full h-full object-cover opacity-50" onLoad={() => setHeroLoaded(true)} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#261811]/90 via-[#261811]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#261811]/70 via-transparent to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 w-full pt-32 pb-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8" style={{ opacity: heroLoaded ? 1 : 0, transition: 'opacity 1s ease 0.2s' }}>
              <div className="w-8 h-px bg-[#C3A684]" />
              <span className="text-[#C3A684] text-[10px] tracking-[0.4em] uppercase font-bold">New Damietta · Egypt</span>
            </div>
            <h1 className="font-serif font-light text-[#F5E2CC] leading-[1.05] mb-8" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'none' : 'translateY(30px)', transition: 'opacity 1s ease 0.4s, transform 1s ease 0.4s' }}>
              Your Moment.<br /><span className="italic text-[#C3A684]">Your Dress.</span>
            </h1>
            <p className="text-[#D3B791] text-lg sm:text-xl font-light leading-relaxed mb-12 max-w-lg" style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'none' : 'translateY(20px)', transition: 'opacity 1s ease 0.6s, transform 1s ease 0.6s' }}>
              Luxury dresses for the moments<br className="hidden sm:block" /> you'll never forget.
            </p>
            <div className="flex flex-wrap gap-4" style={{ opacity: heroLoaded ? 1 : 0, transition: 'opacity 1s ease 0.8s' }}>
              <button onClick={() => navigateTo('collection')} className="group inline-flex items-center gap-3 bg-[#C3A684] text-[#261811] px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] hover:bg-[#E3C7A5] transition-all duration-300 hover:-translate-y-0.5">
                Explore The Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => document.getElementById('moment-finder')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-3 border border-[#C3A684]/50 text-[#E3C7A5] px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] hover:border-[#C3A684] hover:bg-[#C3A684]/10 transition-all duration-300">
                Find Your Perfect Dress
              </button>
            </div>
            <div className="mt-16 pt-8 border-t border-[#C3A684]/20 grid grid-cols-3 gap-8 max-w-sm" style={{ opacity: heroLoaded ? 1 : 0, transition: 'opacity 1s ease 1s' }}>
              {[['14+', 'Curated Dresses'], ['3', 'Day Rental'], ['★ 5.0', 'Client Rating']].map(([n, l]) => (
                <div key={l}><div className="font-serif text-2xl text-[#C3A684] font-light">{n}</div><div className="text-[10px] uppercase tracking-[0.2em] text-[#D3B791]/70 mt-1">{l}</div></div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <div className="w-px h-12 bg-[#C3A684]/40 animate-pulse" />
          <span className="text-[9px] tracking-[0.3em] text-[#C3A684]/60 uppercase">Scroll</span>
        </div>
      </section>

      {/* ══ BOUTIQUE STORY ══ */}
      <section className="bg-[#F4E8D2] py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <Reveal dir="left">
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden"><img src={IMG[0]} alt="GLAM fitting" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" /></div>
                <div className="absolute -bottom-8 -right-6 lg:-right-12 w-48 sm:w-64 aspect-[3/4] border-4 border-[#F4E8D2] overflow-hidden shadow-2xl"><img src={IMG[1]} alt="Boutique detail" className="w-full h-full object-cover" /></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 border-l-2 border-t-2 border-[#C3A684]/50" />
              </div>
            </Reveal>
            <div className="lg:pl-12 pb-16 lg:pb-0">
              <Reveal delay={0.1}><div className="flex items-center gap-3 mb-6"><div className="w-8 h-px bg-[#C3A684]" /><span className="text-[10px] tracking-[0.4em] text-[#C3A684] uppercase font-bold">The Boutique Experience</span></div></Reveal>
              <Reveal delay={0.2}><h2 className="font-serif text-4xl sm:text-5xl font-light text-[#57412C] leading-tight mb-6">Where Couture Dreams Meet Unforgettable Celebrations</h2></Reveal>
              <Reveal delay={0.3}><p className="font-serif font-bold text-lg text-[#60493A] leading-relaxed mb-4">GLAM Boutique is New Damietta's premier destination for luxury occasion dress rentals. We believe high-fashion couture should be accessible, empowering, and effortlessly worn for your most cherished moments.</p></Reveal>
              <Reveal delay={0.35}><p className="font-serif font-bold text-base text-[#60493A]/85 leading-relaxed mb-10">Located conveniently in the Al-Helou Building on Lebanon Street, our atelier offers comfortable private fitting salons where you can try on hand-curated silhouettes, receive bespoke styling advice, and find the look that speaks to your confidence.</p></Reveal>
              <Reveal delay={0.4}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {[['Pristine Ozone Sanitization', 'Every gown professionally cleaned before each fitting.'], ['Effortless 3-Day Rental', 'Pickup, wear, return. Simple as that.'], ['Private Fitting Salons', 'Exclusive suites on Lebanon Street, New Damietta.'], ['Bespoke Styling Advice', 'Personal stylist service with every appointment.']].map(([t, d]) => (
                    <div key={t} className="p-4 bg-[#302016] border border-[#C3A684]/20"><CheckCircle className="w-4 h-4 text-[#C3A684] mb-2" /><p className="text-xs font-bold text-[#E3C7A5] uppercase tracking-wide mb-1">{t}</p><p className="text-[11px] text-[#D3B791]">{d}</p></div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.5}><button onClick={() => navigateTo('about')} className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#57412C] border-b border-[#C3A684] pb-1 hover:text-[#C3A684] transition-colors">Discover Our Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></button></Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══ EDITORIAL COLLECTION ══ */}
      <section className="bg-[#261811] py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <Reveal>
            <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4"><div className="w-8 h-px bg-[#C3A684]" /><span className="text-[10px] tracking-[0.4em] text-[#C3A684] uppercase font-bold">The Glam Collection</span></div>
                <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#E3C7A5]">A curated edit for every<br /><span className="italic text-[#C3A684]">unforgettable moment.</span></h2>
              </div>
              <button onClick={() => navigateTo('collection')} className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D3B791] border-b border-[#C3A684]/40 pb-1 hover:text-[#C3A684] hover:border-[#C3A684] transition-colors whitespace-nowrap">View All Dresses <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></button>
            </div>
          </Reveal>
          <div className="space-y-24">
            {EDITORIAL.map((col, i) => (
              <Reveal key={col.no} dir={i % 2 === 0 ? 'left' : 'right'} delay={0.1}>
                <div className={`grid lg:grid-cols-12 gap-6 items-start`}>
                  <div className={`${i % 2 === 0 ? 'lg:col-span-7' : 'lg:col-span-5 lg:col-start-8'} relative group cursor-pointer`} onClick={() => navigateTo('collection')}>
                    <div className="aspect-[4/5] overflow-hidden"><img src={col.image} alt={col.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /></div>
                    <div className="absolute top-6 left-6 font-serif text-6xl sm:text-8xl font-light text-[#C3A684]/20 leading-none select-none">{col.no}</div>
                    <div className="absolute inset-0 bg-[#261811]/0 group-hover:bg-[#261811]/30 transition-colors duration-500 flex items-center justify-center"><div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-[#C3A684] px-6 py-3 text-[#E3C7A5] text-xs tracking-[0.3em] uppercase">EXPLORE</div></div>
                  </div>
                  <div className={`${i % 2 === 0 ? 'lg:col-span-4 lg:col-start-9' : 'lg:col-span-6 lg:col-start-1 lg:row-start-1'} flex flex-col justify-center ${i % 2 !== 0 ? 'lg:pt-16' : 'lg:pt-24'}`}>
                    <div className="w-6 h-px bg-[#C3A684] mb-6" />
                    <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#E3C7A5] mb-4 tracking-wide">{col.title}</h3>
                    <p className="text-[#D3B791] text-sm leading-relaxed mb-8">{col.desc}</p>
                    <button onClick={() => navigateTo('collection')} className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#C3A684] border-b border-[#C3A684]/40 pb-1 hover:border-[#C3A684] transition-colors w-fit">Explore Edit <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></button>
                    <div className="mt-8 aspect-[4/3] overflow-hidden"><img src={col.imageAlt} alt={col.title + ' detail'} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" /></div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ RUNWAY ══ */}
      <section className="bg-[#F4E8D2] py-20 overflow-hidden">
        <Reveal>
          <div className="text-center mb-12 px-6">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-px bg-[#C3A684]" />
              <span className="font-serif text-sm tracking-[0.5em] text-[#C3A684] uppercase italic">The Glam Runway</span>
              <div className="w-16 h-px bg-[#C3A684]" />
            </div>
            <p className="text-xs tracking-[0.3em] text-[#A48F70] uppercase">Drag to explore · Swipe on mobile</p>
          </div>
        </Reveal>
        <div ref={runwayRef} className="flex gap-4 overflow-x-auto cursor-grab active:cursor-grabbing select-none px-8" style={{ scrollbarWidth: 'none' }} onMouseDown={onMouseDown}>
          {runwayDresses.map((dress, i) => (
            <div key={`${dress.id}-${i}`} className="flex-none group cursor-pointer" style={{ width: i % 3 === 0 ? '260px' : i % 3 === 1 ? '200px' : '230px' }} onClick={() => navigateTo('dress-details', { id: dress.id })}>
              <div className="overflow-hidden" style={{ aspectRatio: i % 3 === 0 ? '2/3' : '3/4' }}>
                <img src={dress.images[0]} alt={dress.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" draggable={false} />
              </div>
              <div className="pt-3 px-1">
                <p className="text-[10px] tracking-[0.3em] text-[#C3A684] uppercase mb-1">DRESS {String(i + 1).padStart(2, '0')}</p>
                <p className="font-serif text-sm text-[#57412C] font-light">{dress.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ GLAM MIRROR ══ */}
      <section className="bg-[#302016] py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <Reveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4"><div className="w-8 h-px bg-[#C3A684]" /><span className="text-[10px] tracking-[0.4em] text-[#C3A684] uppercase font-bold">Interactive Stylist</span><div className="w-8 h-px bg-[#C3A684]" /></div>
              <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#E3C7A5]">The <span className="italic text-[#C3A684]">Glam Mirror</span></h2>
              <p className="text-[#D3B791] text-sm mt-4">Choose your style. Find your look.</p>
            </div>
          </Reveal>
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-3 flex lg:flex-col flex-wrap gap-4 justify-center lg:justify-end">
              {MIRROR_STYLES.slice(0, 2).map((s, i) => (
                <button key={s.label} onClick={() => switchMirror(i)} className={`px-6 py-4 text-[11px] tracking-[0.3em] uppercase font-bold border transition-all duration-300 text-left ${mirrorIdx === i ? 'border-[#C3A684] text-[#C3A684] bg-[#C3A684]/10' : 'border-[#C3A684]/20 text-[#D3B791] hover:border-[#C3A684]/50'}`}>{s.label}</button>
              ))}
            </div>
            <div className="lg:col-span-6 relative">
              <div className="relative border-2 border-[#C3A684]/30 p-2">
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img src={MIRROR_STYLES[mirrorIdx].image} alt={MIRROR_STYLES[mirrorIdx].label} className="w-full h-full object-cover transition-opacity duration-300" style={{ opacity: mirrorFading ? 0 : 1 }} />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#302016]/60" />
                  <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-[#C3A684]/60" />
                  <div className="absolute top-3 right-3 w-6 h-6 border-r border-t border-[#C3A684]/60" />
                  <div className="absolute bottom-3 left-3 w-6 h-6 border-l border-b border-[#C3A684]/60" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-[#C3A684]/60" />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#261811] border border-[#C3A684]/20 p-6 max-w-xs transition-opacity duration-300 hidden lg:block" style={{ opacity: mirrorFading ? 0 : 1 }}>
                <p className="text-[10px] tracking-[0.35em] text-[#C3A684] uppercase mb-2">{MIRROR_STYLES[mirrorIdx].mood}</p>
                <p className="font-serif text-[#E3C7A5] text-sm italic leading-relaxed">"{MIRROR_STYLES[mirrorIdx].desc}"</p>
              </div>
            </div>
            <div className="lg:col-span-3 flex lg:flex-col flex-wrap gap-4 justify-center lg:justify-start lg:mt-16">
              {MIRROR_STYLES.slice(2).map((s, i) => (
                <button key={s.label} onClick={() => switchMirror(i + 2)} className={`px-6 py-4 text-[11px] tracking-[0.3em] uppercase font-bold border transition-all duration-300 text-left ${mirrorIdx === i + 2 ? 'border-[#C3A684] text-[#C3A684] bg-[#C3A684]/10' : 'border-[#C3A684]/20 text-[#D3B791] hover:border-[#C3A684]/50'}`}>{s.label}</button>
              ))}
            </div>
          </div>
          <div className="text-center mt-16">
            <button onClick={() => navigateTo('collection')} className="inline-flex items-center gap-3 bg-[#C3A684] text-[#261811] px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] hover:bg-[#E3C7A5] transition-all duration-300 hover:-translate-y-0.5">
              Explore The Full Collection <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ══ CHOOSE YOUR MOMENT QUIZ ══ */}
      <section id="moment-finder" className="bg-[#F4E8D2] py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C3A684]/5" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#C3A684]/5" />
        <div className="max-w-5xl mx-auto px-6 md:px-16">
          <Reveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4"><div className="w-8 h-px bg-[#C3A684]" /><span className="text-[10px] tracking-[0.4em] text-[#C3A684] uppercase font-bold">Personal Stylist</span><div className="w-8 h-px bg-[#C3A684]" /></div>
              <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#57412C] mb-4">Choose Your <span className="italic text-[#C3A684]">Moment</span></h2>
              <p className="text-[#7A6248] text-base">Let's find the dress that feels like you.</p>
            </div>
          </Reveal>
          {!quizDone ? (
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-2 mb-12 justify-center">
                {QUIZ_STEPS.map((_, i) => (<div key={i} className="flex items-center gap-2"><div className={`w-8 h-px transition-all duration-500 ${i <= quizStep ? 'bg-[#C3A684]' : 'bg-[#C3A684]/25'}`} /><div className={`w-2 h-2 transition-all duration-500 ${i < quizStep ? 'bg-[#C3A684]' : i === quizStep ? 'bg-[#C3A684] ring-2 ring-[#C3A684]/30' : 'bg-[#C3A684]/25'}`} /></div>))}
                <div className="w-8 h-px bg-[#C3A684]/25" />
              </div>
              <div className="text-center" key={quizStep}>
                <p className="text-[10px] tracking-[0.4em] text-[#C3A684] uppercase mb-4">Step {quizStep + 1} of {QUIZ_STEPS.length}</p>
                <h3 className="font-serif text-3xl font-light text-[#57412C] mb-10">{QUIZ_STEPS[quizStep].question}</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {QUIZ_STEPS[quizStep].options.map(opt => (
                    <button key={opt} onClick={() => handleQuizAnswer(QUIZ_STEPS[quizStep].key, opt)} className="px-6 py-3 border border-[#C3A684]/40 text-sm text-[#57412C] hover:border-[#C3A684] hover:bg-[#C3A684] hover:text-[#F4E8D2] transition-all duration-300 tracking-wider font-medium">{opt}</button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Reveal>
                <div className="text-center mb-12">
                  <h3 className="font-serif text-3xl font-light text-[#57412C] mb-3">Your Glam <span className="italic text-[#C3A684]">Selection</span></h3>
                  <p className="text-[#7A6248] text-sm">Curated for {quizAnswers.occasion} · {quizAnswers.style} · {quizAnswers.mood}</p>
                </div>
              </Reveal>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {quizResults.map((dress, i) => (
                  <Reveal key={dress.id} delay={i * 0.1}>
                    <div className="group cursor-pointer" onClick={() => navigateTo('dress-details', { id: dress.id })}>
                      <div className="aspect-[2/3] overflow-hidden relative mb-3">
                        <img src={dress.images[0]} alt={dress.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-[#261811]/0 group-hover:bg-[#261811]/30 transition-all duration-500 flex items-center justify-center"><span className="opacity-0 group-hover:opacity-100 transition-opacity border border-[#E3C7A5] text-[#E3C7A5] text-[10px] tracking-[0.3em] px-4 py-2 uppercase">VIEW LOOK</span></div>
                      </div>
                      <p className="text-[10px] tracking-[0.25em] text-[#C3A684] uppercase mb-1">{dress.category}</p>
                      <p className="font-serif text-sm text-[#57412C]">{dress.name}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <div className="text-center"><button onClick={resetQuiz} className="text-xs tracking-[0.3em] uppercase text-[#A48F70] hover:text-[#C3A684] border-b border-[#C3A684]/30 hover:border-[#C3A684] pb-1 transition-colors">Start Again</button></div>
            </div>
          )}
        </div>
      </section>

      {/* ══ GLAM AFTER DARK ══ */}
      <section className="relative bg-[#1A0F08] py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20"><img src={IMG[6]} alt="" className="w-full h-full object-cover object-center" /></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A0F08] via-[#1A0F08]/80 to-[#1A0F08]/40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#C3A684]/5 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal dir="left">
              <div>
                <div className="flex items-center gap-3 mb-8"><div className="w-8 h-px bg-[#C3A684]" /><span className="text-[10px] tracking-[0.4em] text-[#C3A684] uppercase font-bold">After Dark Collection</span></div>
                <h2 className="font-serif text-5xl sm:text-7xl font-light text-[#E3C7A5] leading-tight mb-8">GLAM<br /><span className="italic text-[#C3A684]">After Dark</span></h2>
                <p className="font-serif text-xl text-[#D3B791] italic leading-relaxed mb-10 max-w-md">"When the lights go down,<br />Glam begins."</p>
                <p className="text-[#D3B791]/70 text-sm leading-relaxed mb-10 max-w-sm">Our black and midnight collection. Noir velvet, obsidian sequins, and sculptural silhouettes for the most dramatic entrances.</p>
                <button onClick={() => navigateTo('collection')} className="group inline-flex items-center gap-3 border border-[#C3A684]/50 text-[#E3C7A5] px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] hover:border-[#C3A684] hover:bg-[#C3A684]/10 transition-all duration-300">Explore Black Dresses <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></button>
              </div>
            </Reveal>
            <Reveal dir="right">
              <div className="grid grid-cols-2 gap-4">
                {[IMG[6], IMG[7], IMG[4], IMG[5]].map((img, i) => (
                  <div key={i} className={`overflow-hidden group cursor-pointer ${i === 0 ? 'row-span-2' : ''}`} onClick={() => navigateTo('collection')}>
                    <div className={`overflow-hidden ${i === 0 ? 'aspect-[2/3]' : 'aspect-square'}`}>
                      <img src={img} alt="After dark" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ SEEN ON YOU ══ */}
      <section className="bg-[#F4E8D2] py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <Reveal>
            <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4"><div className="w-8 h-px bg-[#C3A684]" /><span className="text-[10px] tracking-[0.4em] text-[#C3A684] uppercase font-bold">Client Moments</span></div>
                <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#57412C]">Seen On <span className="italic text-[#C3A684]">You</span></h2>
                <p className="text-[#7A6248] text-sm mt-2">Moments made unforgettable.</p>
              </div>
              <a href="https://instagram.com/glam__2026" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#57412C] border-b border-[#C3A684] pb-1 hover:text-[#C3A684] transition-colors">
                <Instagram className="w-4 h-4" /> Follow @glam__2026
              </a>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3" style={{ gridAutoRows: '200px' }}>
            {SEEN_ON.map((item, i) => (
              <Reveal key={item.name} delay={i * 0.08} className={item.tall ? 'row-span-2' : ''}>
                <div className="group relative h-full overflow-hidden cursor-pointer">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-[#261811]/0 group-hover:bg-[#261811]/70 transition-all duration-500 flex flex-col items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                      <p className="font-serif text-[#E3C7A5] text-lg italic">{item.name}</p>
                      <p className="text-[#C3A684] text-xs tracking-wider mt-1">{item.occasion}</p>
                      <p className="text-[#D3B791] text-[10px] tracking-widest mt-1">Dress #{item.dressNo}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section className="bg-[#261811] py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-16">
          <Reveal>
            <div className="text-center mb-20">
              <div className="flex items-center justify-center gap-3 mb-4"><div className="w-8 h-px bg-[#C3A684]" /><span className="text-[10px] tracking-[0.4em] text-[#C3A684] uppercase font-bold">How It Works</span><div className="w-8 h-px bg-[#C3A684]" /></div>
              <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#E3C7A5]">Your Glam <span className="italic text-[#C3A684]">Journey</span></h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-0 relative">
            <div className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-px bg-[#C3A684]/30" />
            {[
              { step: '01', title: 'Choose Your Dress', desc: 'Browse our curated collection online or visit our atelier on Lebanon Street for a private fitting experience.' },
              { step: '02', title: 'Book Your Fitting', desc: 'Reserve your date and schedule a complimentary fitting with our personal stylist. Adjustments included.' },
              { step: '03', title: 'Own The Moment', desc: 'Pick up your professionally steamed gown and make your entrance. Return within 3 days.' },
            ].map((s, i) => (
              <Reveal key={s.step} delay={i * 0.15} dir="up">
                <div className="text-center px-8 relative">
                  <div className="w-16 h-16 border border-[#C3A684] flex items-center justify-center mx-auto mb-8 relative bg-[#261811]"><span className="font-serif text-[#C3A684] text-xl">{s.step}</span></div>
                  <h3 className="font-serif text-xl text-[#E3C7A5] font-light mb-4">{s.title}</h3>
                  <p className="text-[#D3B791] text-sm leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ══ WHY GLAM ══ */}
      <section className="bg-[#F4E8D2] py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <Reveal><div className="flex items-center gap-4 mb-14"><div className="w-8 h-px bg-[#C3A684]" /><h2 className="font-serif text-3xl sm:text-4xl font-light text-[#57412C]">Why <span className="italic text-[#C3A684]">GLAM</span></h2></div></Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[['14+', 'Curated Collection', 'Hand-selected couture gowns from top designers and ateliers.'], ['★5.0', 'Professional Fitting', 'Private suites with personal stylist service included.'], ['3 Days', 'Flexible Rental', 'Standard 3-day rental with extended options available.'], ['100%', 'Premium Maintenance', 'Ozone-sanitized and professionally steamed before every rental.'], ['1:1', 'Expert Guidance', 'Bespoke styling advice to find the perfect silhouette for you.']].map(([num, title, desc], i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div className="group p-6 border border-[#C3A684]/20 hover:border-[#C3A684] transition-all duration-300 hover:bg-[#C3A684]/5">
                  <div className="font-serif text-3xl text-[#C3A684] font-light mb-4">{num}</div>
                  <h3 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#57412C] mb-3">{title}</h3>
                  <p className="text-xs text-[#7A6248] leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="bg-[#302016] py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-16">
          <Reveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4"><div className="w-8 h-px bg-[#C3A684]" /><span className="text-[10px] tracking-[0.4em] text-[#C3A684] uppercase font-bold">Client Stories</span><div className="w-8 h-px bg-[#C3A684]" /></div>
              <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#E3C7A5]">Words That <span className="italic text-[#C3A684]">Inspire Us</span></h2>
            </div>
          </Reveal>
          <div className="relative max-w-3xl mx-auto">
            <div className="text-center px-8" key={testimonialIdx}>
              <Quote className="w-8 h-8 text-[#C3A684]/40 mx-auto mb-6" />
              <p className="font-serif text-xl sm:text-2xl text-[#E3C7A5] font-light italic leading-relaxed mb-8">"{TESTIMONIALS[testimonialIdx].review}"</p>
              <div className="flex justify-center gap-1 mb-4">{[...Array(TESTIMONIALS[testimonialIdx].rating)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-[#C3A684] text-[#C3A684]" />))}</div>
              <p className="font-serif text-[#C3A684] text-base">{TESTIMONIALS[testimonialIdx].name}</p>
              <p className="text-[#D3B791] text-xs tracking-wider mt-1">{TESTIMONIALS[testimonialIdx].event}</p>
              <p className="text-[#D3B791]/60 text-[11px] mt-1">Dress: {TESTIMONIALS[testimonialIdx].dress}</p>
            </div>
            <div className="flex items-center justify-center gap-4 mt-12">
              <button onClick={() => setTestimonialIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="w-10 h-10 border border-[#C3A684]/30 flex items-center justify-center text-[#C3A684] hover:border-[#C3A684] hover:bg-[#C3A684]/10 transition-all"><ChevronLeft className="w-4 h-4" /></button>
              <div className="flex gap-2">{TESTIMONIALS.map((_, i) => (<button key={i} onClick={() => setTestimonialIdx(i)} className={`transition-all duration-300 ${i === testimonialIdx ? 'w-6 h-1 bg-[#C3A684]' : 'w-2 h-1 bg-[#C3A684]/30'}`} />))}</div>
              <button onClick={() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length)} className="w-10 h-10 border border-[#C3A684]/30 flex items-center justify-center text-[#C3A684] hover:border-[#C3A684] hover:bg-[#C3A684]/10 transition-all"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section className="relative bg-[#261811] overflow-hidden">
        <div className="absolute inset-0"><img src={IMG[2]} alt="GLAM finale" className="w-full h-full object-cover opacity-40" /></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#261811]/95 via-[#261811]/70 to-[#261811]/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 py-32 sm:py-48">
          <Reveal>
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-8"><div className="w-8 h-px bg-[#C3A684]" /><span className="text-[10px] tracking-[0.4em] text-[#C3A684] uppercase font-bold">GLAM Boutique · New Damietta</span></div>
              <h2 className="font-serif font-light text-[#E3C7A5] leading-tight mb-8" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
                Your moment deserves<br /><span className="italic text-[#C3A684]">a Glam dress.</span>
              </h2>
              <p className="text-[#D3B791] text-lg leading-relaxed mb-12 max-w-lg">Find the look that makes your moment unforgettable. Every entrance. Every celebration. Every memory.</p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => navigateTo('collection')} className="group inline-flex items-center gap-3 bg-[#C3A684] text-[#261811] px-10 py-5 text-xs font-bold uppercase tracking-[0.25em] hover:bg-[#E3C7A5] transition-all duration-300 hover:-translate-y-0.5">Explore The Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></button>
                <a href={getFittingWhatsAppUrl()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 border border-[#C3A684]/50 text-[#E3C7A5] px-10 py-5 text-xs font-bold uppercase tracking-[0.25em] hover:border-[#C3A684] hover:bg-[#C3A684]/10 transition-all duration-300"><MessageCircle className="w-4 h-4" /> Book a Fitting</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        @keyframes glamFloat {
          from { transform: translateY(0px); opacity: 0.4; }
          to { transform: translateY(-12px); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};
