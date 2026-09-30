export type DressCategory = 
  | 'Evening Dresses'
  | 'Wedding Guest Dresses'
  | 'Engagement Dresses'
  | 'Party Dresses'
  | 'Formal Dresses'
  | 'Black Dresses'
  | 'New Arrivals';

export type AvailabilityStatus = 'available' | 'reserved' | 'unavailable' | 'maintenance';

export type DressSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'Custom Fit';

export interface Dress {
  id: string;
  name: string;
  arabicName?: string;
  subtitle: string;
  category: DressCategory;
  occasions: string[];
  rentalPrice: number; // in EGP (Egyptian Pounds)
  depositPrice: number;
  originalValue?: number;
  images: string[];
  sizes: DressSize[];
  colors: string[];
  description: string;
  fabric: string;
  silhouette: string;
  length: string;
  rentalDuration: string; // e.g. "3 Days" or "4 Days"
  availabilityStatus: AvailabilityStatus;
  reservedDates: string[]; // List of YYYY-MM-DD
  featured?: boolean;
  isNewArrival?: boolean;
  tags: string[];
  rating: number;
  reviewsCount: number;
  sku: string;
}

export interface CategoryInfo {
  id: string;
  name: DressCategory;
  slug: string;
  tagline: string;
  description: string;
  heroImage: string;
  dressCount: number;
}

export interface Route {
  page:
    | 'home'
    | 'collection'
    | 'search'
    | 'dress-details'
    | 'about'
    | 'contact'
    | 'faq'
    | 'terms-and-conditions'
    | 'privacy-policy'
    | string;
  params: Record<string, string>;
}

export interface BoutiqueSettings {
  boutiqueName: string;
  tagline: string;
  phone: string;
  whatsappNumber: string;
  whatsappFormatted: string;
  instagramHandle: string;
  address: {
    city: string;
    street: string;
    building: string;
    country: string;
    fullText: string;
  };
  openingHours: string;
  rentalDurationDays: number;
  depositPercentage: number;
  confirmationMethod: string;
  cancellationPolicy: string;
  fittingAppointmentRequired: boolean;
}

export interface FilterState {
  category: string;
  size: string;
  color: string;
  priceRange: [number, number];
  availability: 'all' | 'available' | 'reserved';
  occasion: string;
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'popular';
  searchQuery: string;
}

export type FitRating = 'Runs Small' | 'True to Size' | 'Runs Large';

export interface Review {
  id: string;
  dressId: string;
  customerName: string;
  customerPhone?: string;
  rating: number; // 1 to 5
  comment: string;
  occasion?: string;
  fitRating?: FitRating;
  eventDate?: string;
  createdAt: string;
  verifiedRental?: boolean;
}

export interface RatingSummary {
  average: number;
  count: number;
  breakdown: Record<number, number>; // 5: count, 4: count, etc.
  fitBreakdown?: {
    trueToSize: number;
    runsSmall: number;
    runsLarge: number;
  };
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  status?: string;
  notes?: string;
  createdAt: string;
}
