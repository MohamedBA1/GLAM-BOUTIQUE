import React from 'react';

interface GlamLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'nav' | 'lg' | 'xl' | 'hero';
  className?: string;
  showText?: boolean;
  variant?: 'light' | 'dark' | 'standard';
}

export const GlamLogo: React.FC<GlamLogoProps> = ({
  size = 'md',
  className = '',
  showText = false,
  variant = 'standard',
}) => {
  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    nav: 'w-12 h-12 md:w-16 md:h-16',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
    hero: 'w-36 h-36 md:w-44 md:h-44',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div className={`relative ${sizeClasses[size]} shrink-0 transition-transform duration-300 hover:scale-105`}>
        <img
          src="/assets/Glam%20Dresses%20Rental%20Logo.png"
          alt="GLAM Boutique Logo"
          className="w-full h-full object-contain drop-shadow-sm rounded-full"
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-serif tracking-widest text-lg md:text-xl font-medium leading-none ${
            variant === 'light' ? 'text-white' : 'text-[#1A1A1A]'
          }`}>
            GLAM
          </span>
          <span className={`text-[10px] tracking-[0.3em] uppercase font-light mt-1 ${
            variant === 'light' ? 'text-[#B08D57]' : 'text-[#8A7A6D]'
          }`}>
            Boutique • New Damietta
          </span>
        </div>
      )}
    </div>
  );
};
