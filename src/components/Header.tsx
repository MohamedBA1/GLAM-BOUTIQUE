import React, { useState, useEffect } from 'react';
import { useBoutique } from '../context/BoutiqueContext';
import { GlamLogo } from './GlamLogo';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';
import {
  Search,
  Menu,
  X,
  MessageCircle,
  Phone,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { currentRoute, navigateTo, settings } = useBoutique();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isHome = currentRoute.page === 'home' || currentRoute.page === '';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('search', { q: searchQuery.trim() });
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Home', page: 'home' },
    { label: 'Collection', page: 'collection' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  // Header background style
  const headerBgClass = 'bg-[#261811] text-[#E3C7A5] shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-[#C3A684]/20';
  const linkColorClass = 'text-[#E3C7A5] hover:text-[#C3A684]';

  return (
    <>
      <header
        className={`fixed top-4 md:top-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[95%] max-w-7xl z-50 transition-all duration-300 rounded-full overflow-hidden ${headerBgClass}`}
      >
        {/* Main Navigation Bar */}
        <div className="px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">


          {/* Brand Logo */}
          <div
            onClick={() => navigateTo('home')}
            className="cursor-pointer flex items-center gap-3.5 sm:gap-5 group"
          >
            <GlamLogo size="nav" />
            <div className="flex flex-col">
              <span className="font-serif tracking-[0.25em] text-xl sm:text-2xl font-light uppercase leading-none text-[#E3C7A5]">
                GLAM
              </span>
              <span className="text-[8px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.4em] uppercase font-sans font-bold mt-1 text-[#C3A684]">
                BOUTIQUE
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => {
              const isActive = currentRoute.page === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => navigateTo(link.page)}
              className={`text-sm uppercase tracking-[0.2em] font-sans transition-all duration-200 relative py-2 font-semibold ${linkColorClass} ${
                    isActive ? 'font-bold' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C3A684] animate-fade-in" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Primary WhatsApp CTA */}
          <div className="flex items-center gap-3.5 sm:gap-5">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/20 hover:border-[#C3A684] text-[#E3C7A5] hover:text-[#C3A684] flex items-center justify-center transition-colors relative"
              aria-label="Search collection"
            >
              <Search className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Primary WhatsApp / Fitting CTA */}
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex btn-glam-primary rounded-full hover:!bg-[#8A6B4E] hover:!border-[#8A6B4E]"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WHATSAPP GLAM</span>
            </a>

            {/* Mobile: Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -mr-2 lg:hidden rounded-lg hover:bg-white/10 text-[#E3C7A5] transition-colors focus:outline-none"
              aria-label="Open menu"
            >
              <Menu className="w-7 h-7 sm:w-8 sm:h-8" />
            </button>
          </div>
        </div>

        {/* Expandable Search Overlay */}
        {isSearchOpen && (
          <div className="border-t border-[#C3A684]/20 bg-[#261811] text-[#E3C7A5] p-4 animate-fade-in shadow-xl">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-3">
              <Search className="w-5 h-5 text-[#C3A684] shrink-0" />
              <input
                type="text"
                placeholder="Search gowns by silhouette, color, fabric, occasion..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="flex-grow bg-transparent border-b border-[#C3A684]/30 py-2 text-sm text-[#E3C7A5] focus:outline-none focus:border-[#C3A684] placeholder:text-[#D3B791]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#C3A684] text-[#F4E8D2] text-xs font-bold uppercase tracking-wider hover:bg-[#B99263] hover:text-white transition-colors"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-2 text-[#D3B791] hover:text-[#E3C7A5]"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="relative w-4/5 max-w-sm bg-[#261811] text-[#E3C7A5] h-full shadow-2xl flex flex-col justify-between p-6 z-10 overflow-y-auto font-sans border-r border-[#C3A684]/20">
            <div>
              {/* Top Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#C3A684]/20">
                <div
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('home');
                  }}
                  className="cursor-pointer flex items-center gap-2.5"
                >
                  <GlamLogo size="sm" />
                  <div>
                    <span className="font-serif tracking-[0.25em] text-lg font-light uppercase text-[#E3C7A5] block">
                      GLAM
                    </span>
                    <span className="text-[7px] tracking-[0.3em] uppercase text-[#C3A684] font-bold block">
                      BOUTIQUE
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-[#D3B791] hover:text-[#E3C7A5]"
                  aria-label="Close navigation"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="py-6 space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.page}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigateTo(link.page);
                    }}
                    className={`block w-full text-left text-sm uppercase tracking-[0.2em] font-semibold py-1.5 transition-colors ${
                      currentRoute.page === link.page
                        ? 'text-[#C3A684] font-bold'
                        : 'text-[#E3C7A5]/80 hover:text-[#C3A684]'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}



                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('faq');
                  }}
                  className="block w-full text-left text-sm uppercase tracking-[0.2em] font-semibold py-1.5 text-[#E3C7A5]/80 hover:text-[#C3A684]"
                >
                  FAQ & Policies
                </button>
              </div>
            </div>

            {/* Bottom Drawer Actions */}
            <div className="pt-6 border-t border-[#C3A684]/20 space-y-3">
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="w-full btn-glam-primary py-3 rounded-full hover:!bg-[#8A6B4E] hover:!border-[#8A6B4E]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>CHAT ON WHATSAPP</span>
              </a>

              <a
                href={`tel:${settings.phone}`}
                className="w-full btn-glam-secondary py-2.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {settings.phone}</span>
              </a>

              <div className="text-[11px] text-[#D3B791] text-center pt-2">
                <p>Lebanon Street, Al-Helou Building</p>
                <p>New Damietta • Open Daily 1 PM – 9 PM</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

