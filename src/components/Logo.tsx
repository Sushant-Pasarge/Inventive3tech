import React from 'react';
import InventiveLogo from './InventiveLogo';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark' | 'green';
}

export default function Logo({
  className = '',
  showText = true,
  size = 'md',
  variant = 'light',
}: LogoProps) {
  // Dimensions based on size
  const iconPixelSize = {
    sm: 36,
    md: 44,
    lg: 76,
  }[size];

  const textClass = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
  }[size];

  // Colors based on variant
  const brandColor = variant === 'light' ? '#10B981' : '#34D399';
  const textGreenClass = variant === 'light' ? 'text-emerald-500' : 'text-emerald-400';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* High-fidelity Brand Emblem SVG Icon */}
      <div className="transition-transform duration-500 hover:scale-105 shrink-0">
        <InventiveLogo 
          size={iconPixelSize} 
          textColor={brandColor} 
          accentColor={brandColor} 
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`${textClass} font-bold font-sans tracking-tight ${textGreenClass}`}>
            <span>
              Inventive
            </span>
            <span className="font-extrabold">
              3
            </span>
            <span className="ml-1 font-semibold">
              Tech
            </span>
          </span>
        </div>
      )}
    </div>
  );
}
