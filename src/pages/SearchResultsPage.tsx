import React, { useState, useMemo } from 'react';
import { useBoutique } from '../context/BoutiqueContext';
import { DressCard } from '../components/DressCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { Dress } from '../types';
import { Search, Sparkles, X, ArrowRight } from 'lucide-react';

export const SearchResultsPage: React.FC = () => {
  const { dresses, currentRoute, navigateTo } = useBoutique();
  const initialQuery = currentRoute.params.q || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quickViewDress, setQuickViewDress] = useState<Dress | null>(null);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return dresses;
    const q = searchQuery.toLowerCase().trim();
    return dresses.filter((dress) => {
      const matchName = dress.name.toLowerCase().includes(q);
      const matchSub = dress.subtitle.toLowerCase().includes(q);
      const matchCat = dress.category.toLowerCase().includes(q);
      const matchFabric = dress.fabric.toLowerCase().includes(q);
      const matchColor = dress.colors.some((c) => c.toLowerCase().includes(q));
      const matchOccasion = dress.occasions.some((o) => o.toLowerCase().includes(q));
      const matchCategoryFilter = selectedCategory === 'all' || dress.category === selectedCategory;

      return (matchName || matchSub || matchCat || matchFabric || matchColor || matchOccasion) && matchCategoryFilter;
    });
  }, [dresses, searchQuery, selectedCategory]);

  return (
    <div className="bg-[#F4E8D2] text-[#A48F70] min-h-screen pt-28 sm:pt-36 pb-24 font-sans selection:bg-[#C3A684] selection:text-[#F4E8D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C3A684] font-bold">
            Catalog Search
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#A48F70] mt-2 mb-6">
            Search GLAM Collection
          </h1>

          {/* Dynamic Search Box */}
          <div className="relative shadow-xs bg-[#302016] border border-[#C3A684]/30 focus-within:border-[#C3A684] overflow-hidden transition-all">
            <Search className="w-5 h-5 text-[#C3A684]/60 absolute left-5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dresses by name, color, fabric, silhouette..."
              className="w-full pl-14 pr-12 py-4 text-sm sm:text-base text-[#A48F70] placeholder-[#A6927B]/50 bg-transparent focus:outline-none"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A6927B] hover:text-[#A48F70] p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Suggested Quick Search Terms */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-[#A6927B]">
            <span className="font-medium text-[#C3A684]">Popular:</span>
            {['Black', 'Champagne', 'Velvet', 'Satin', 'Engagement', 'Sequins'].map((term) => (
              <button
                key={term}
                onClick={() => setSearchQuery(term)}
                className="px-3 py-1 bg-[#302016] hover:border-[#C3A684] text-[#A48F70] border border-[#C3A684]/20 transition-colors text-[11px] uppercase tracking-wider"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Results Metadata Bar */}
        <div className="flex items-center justify-between py-4 border-b border-[#C3A684]/20 mb-8 text-xs sm:text-sm text-[#A6927B]">
          <div>
            {searchQuery.trim() ? (
              <p>
                Showing <strong className="text-[#A48F70]">{searchResults.length}</strong> results for "{searchQuery}"
              </p>
            ) : (
              <p>
                Showing all <strong className="text-[#A48F70]">{searchResults.length}</strong> dresses in boutique
              </p>
            )}
          </div>

          <button
            onClick={() => navigateTo('collection')}
            className="text-xs uppercase tracking-wider text-[#C3A684] hover:underline font-semibold"
          >
            Open Full Filters →
          </button>
        </div>

        {/* Results / Empty State */}
        {searchResults.length === 0 ? (
          <div className="bg-[#302016] border border-[#C3A684]/20 p-12 text-center max-w-lg mx-auto my-12 shadow-xs">
            <Sparkles className="w-10 h-10 text-[#C3A684] mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-light text-[#A48F70] mb-2">
              No dresses found
            </h3>
            <p className="text-sm text-[#A6927B] mb-6 font-serif italic">
              We couldn't find any dress matching "{searchQuery}". Try another search or explore our complete curated collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setSearchQuery('')}
                className="btn-glam-secondary"
              >
                Clear Search
              </button>
              <button
                onClick={() => navigateTo('collection')}
                className="btn-glam-primary"
              >
                Explore Full Collection
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {searchResults.map((dress) => (
              <DressCard
                key={dress.id}
                dress={dress}
                onQuickView={(d) => setQuickViewDress(d)}
              />
            ))}
          </div>
        )}
      </div>

      <QuickViewModal
        dress={quickViewDress}
        onClose={() => setQuickViewDress(null)}
      />
    </div>
  );
};
