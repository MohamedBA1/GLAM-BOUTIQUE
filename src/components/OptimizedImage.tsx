import React, { useState } from 'react';
import { getOptimizedImageUrl, getResponsiveSrcSet, RESPONSIVE_SIZES } from '../utils/imageOptimizer';

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  aspectRatio?: string; // e.g. '3/4' or '16/9' or '1/1'
  sizesPreset?: keyof typeof RESPONSIVE_SIZES;
  containerClassName?: string;
  quality?: number;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  aspectRatio,
  sizesPreset,
  sizes,
  className = '',
  containerClassName = '',
  quality = 82,
  onError,
  onLoad,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Derive responsive sizes string
  const resolvedSizes = sizes || (sizesPreset ? RESPONSIVE_SIZES[sizesPreset] : undefined);

  // Modern WebP optimized source
  const optimizedWebpSrc = getOptimizedImageUrl(src, {
    width: width || 800,
    quality,
    format: 'webp',
  });

  // Responsive WebP srcSet
  const webpSrcSet = getResponsiveSrcSet(src, [360, 640, 960, 1280, 1600], quality);

  // Fallback JPEG source
  const fallbackSrc = getOptimizedImageUrl(src, {
    width: width || 800,
    quality,
    format: 'auto',
  });

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    if (onError) onError(e);
  };

  return (
    <div
      className={`relative overflow-hidden bg-[#302016] ${containerClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Skeleton Pulse while loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-[#261811] animate-pulse pointer-events-none" />
      )}

      {hasError ? (
        <div className="w-full h-full min-h-[120px] flex flex-col items-center justify-center p-4 bg-[#302016] text-[#A6927B] text-xs text-center border border-[#C3A684]/20">
          <span className="font-serif italic text-sm text-[#C3A684]">GLAM Boutique</span>
          <span className="text-[11px] mt-1 text-[#A6927B]">Image Preview Unavailable</span>
        </div>
      ) : (
        <picture>
          {/* Modern WebP Picture Source */}
          {webpSrcSet && (
            <source
              type="image/webp"
              srcSet={webpSrcSet}
              sizes={resolvedSizes}
            />
          )}

          <img
            src={optimizedWebpSrc || fallbackSrc}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            sizes={resolvedSizes}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
            {...rest}
          />
        </picture>
      )}
    </div>
  );
};
