/**
 * GLAM Boutique Image Optimization Utility
 * 
 * Provides automated CDN query generation for modern formats (WebP),
 * responsive srcset generation for multi-device delivery,
 * and standard responsive size presets to maintain haute-couture clarity
 * while cutting bandwidth by 50-70%.
 */

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number; // 1-100, default 80
  format?: 'webp' | 'avif' | 'auto';
  fit?: 'crop' | 'clip' | 'scale' | 'max';
  dpr?: number;
}

/**
 * Transforms an image URL (especially Unsplash CDN URLs) with optimal compression,
 * modern WebP format, and responsive dimensions.
 */
export function getOptimizedImageUrl(
  url: string,
  options: ImageOptimizationOptions = {}
): string {
  if (!url) return '';

  const {
    width,
    height,
    quality = 82,
    format = 'webp',
    fit = 'crop',
    dpr,
  } = options;

  try {
    // Check if the URL is from Unsplash CDN
    if (url.includes('images.unsplash.com')) {
      const urlObj = new URL(url);
      
      // Enforce modern WebP compression
      if (format === 'webp') {
        urlObj.searchParams.set('fm', 'webp');
      } else if (format === 'auto') {
        urlObj.searchParams.set('auto', 'format');
      }

      urlObj.searchParams.set('fit', fit);
      urlObj.searchParams.set('q', quality.toString());

      if (width) {
        urlObj.searchParams.set('w', width.toString());
      }
      if (height) {
        urlObj.searchParams.set('h', height.toString());
      }
      if (dpr) {
        urlObj.searchParams.set('dpr', dpr.toString());
      }

      return urlObj.toString();
    }

    // If it's another URL that already has query params or is a relative/data URL
    return url;
  } catch {
    // If URL parsing fails, return the original
    return url;
  }
}

/**
 * Generates a responsive srcset string with WebP formatting across device breakpoints
 */
export function getResponsiveSrcSet(
  url: string,
  widths: number[] = [360, 640, 960, 1280, 1600],
  quality: number = 80
): string {
  if (!url || !url.includes('images.unsplash.com')) {
    return '';
  }

  return widths
    .map((w) => {
      const optimized = getOptimizedImageUrl(url, {
        width: w,
        quality,
        format: 'webp',
      });
      return `${optimized} ${w}w`;
    })
    .join(', ');
}

/**
 * Standard responsive `sizes` attribute presets for common layout patterns
 */
export const RESPONSIVE_SIZES = {
  // Grid of cards (1 col mobile, 2 col sm, 3 col md, 4 col lg)
  cardGrid: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw',
  
  // Hero section banner
  heroBanner: '(max-width: 768px) 100vw, 100vw',
  
  // Large product detail gallery
  productGallery: '(max-width: 1024px) 100vw, 58vw',
  
  // Thumbnail row
  thumbnail: '(max-width: 640px) 25vw, 120px',
  
  // Two-column editorial splits
  editorialSplit: '(max-width: 768px) 100vw, 50vw',
};
