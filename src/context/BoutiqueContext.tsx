import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Dress,
  CategoryInfo,
  BoutiqueSettings,
  Review,
  RatingSummary,
} from '../types';
import {
  INITIAL_DRESSES,
  CATEGORIES,
  INITIAL_SETTINGS,
  INITIAL_REVIEWS,
} from '../data/dresses';

export interface RouteState {
  page: string;
  params: Record<string, string>;
}

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'info' | 'error';
}

interface BoutiqueContextType {
  dresses: Dress[];
  categories: CategoryInfo[];
  settings: BoutiqueSettings;
  reviews: Review[];
  currentRoute: RouteState;
  toasts: ToastMessage[];

  // Navigation
  navigateTo: (page: string, params?: Record<string, string>) => void;
  goBack: () => void;

  // Reviews & Ratings
  getDressReviews: (dressId: string) => Review[];
  getDressRatingSummary: (dressId: string) => RatingSummary;

  // Feedback Toasts
  addToast: (title: string, message?: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const BoutiqueContext = createContext<BoutiqueContextType | undefined>(undefined);

export const BoutiqueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Pure static data with no backend or fake database simulation
  const dresses = INITIAL_DRESSES;
  const categories = CATEGORIES;
  const settings = INITIAL_SETTINGS;
  const reviews = INITIAL_REVIEWS;

  // Clean up any deprecated localStorage keys from previous versions
  useEffect(() => {
    try {
      localStorage.removeItem('glam_bookings');
      localStorage.removeItem('glam_customers');
      localStorage.removeItem('glam_user');
      localStorage.removeItem('glam_dresses');
      localStorage.removeItem('glam_categories');
      localStorage.removeItem('glam_settings');
      localStorage.removeItem('glam_reviews');
      localStorage.removeItem('glam_saved_gowns');
    } catch {
      // ignore
    }
  }, []);

  // Routing State
  const [currentRoute, setCurrentRoute] = useState<RouteState>({
    page: 'home',
    params: {},
  });
  const [routeHistory, setRouteHistory] = useState<RouteState[]>([]);

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, message?: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigateTo = (page: string, params: Record<string, string> = {}) => {
    setRouteHistory((prev) => [...prev, currentRoute]);
    setCurrentRoute({ page, params });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (routeHistory.length > 0) {
      const prev = routeHistory[routeHistory.length - 1];
      setRouteHistory((h) => h.slice(0, -1));
      setCurrentRoute(prev);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigateTo('home');
    }
  };

  const getDressReviews = (dressId: string): Review[] => {
    return reviews.filter((r) => r.dressId === dressId);
  };

  const getDressRatingSummary = (dressId: string): RatingSummary => {
    const dressReviews = getDressReviews(dressId);
    if (dressReviews.length === 0) {
      return {
        average: 5.0,
        count: 0,
        breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        fitBreakdown: { trueToSize: 0, runsSmall: 0, runsLarge: 0 },
      };
    }

    const totalRating = dressReviews.reduce((sum, r) => sum + r.rating, 0);
    const average = parseFloat((totalRating / dressReviews.length).toFixed(1));

    const breakdown: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    const fitBreakdown = { trueToSize: 0, runsSmall: 0, runsLarge: 0 };

    dressReviews.forEach((r) => {
      breakdown[r.rating] = (breakdown[r.rating] || 0) + 1;
      if (r.fitRating === 'True to Size') fitBreakdown.trueToSize++;
      else if (r.fitRating === 'Runs Small') fitBreakdown.runsSmall++;
      else if (r.fitRating === 'Runs Large') fitBreakdown.runsLarge++;
    });

    return {
      average,
      count: dressReviews.length,
      breakdown,
      fitBreakdown,
    };
  };

  return (
    <BoutiqueContext.Provider
      value={{
        dresses,
        categories,
        settings,
        reviews,
        currentRoute,
        toasts,
        navigateTo,
        goBack,
        getDressReviews,
        getDressRatingSummary,
        addToast,
        removeToast,
      }}
    >
      {children}
    </BoutiqueContext.Provider>
  );
};

export const useBoutique = () => {
  const context = useContext(BoutiqueContext);
  if (!context) {
    throw new Error('useBoutique must be used within a BoutiqueProvider');
  }
  return context;
};
