// components/CoverMock.tsx
// Book cover display with hover effects

'use client';

import React from 'react';
import Image from 'next/image';
import { siteConfig } from '@/site.config';

interface CoverMockProps {
  className?: string;
  priority?: boolean;
}

/**
 * Book Cover Display Component
 * 
 * Features:
 * - Responsive sizing
 * - Shadow effects
 * - Hover lift animation
 * - Priority loading option
 * 
 * Usage:
 * <CoverMock priority />
 */
export function CoverMock({ className = '', priority = false }: CoverMockProps) {
  return (
    <div 
      className={`relative group ${className}`}
      data-section="cover"
    >
      {/* Shadow layer */}
      <div 
        className="absolute inset-0 bg-primary-900/20 rounded-lg transform translate-y-4 translate-x-2 blur-lg transition-all duration-300 group-hover:translate-y-6 group-hover:translate-x-3 group-hover:bg-primary-900/30"
        aria-hidden="true"
      />
      
      {/* Book spine effect */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-primary-800/40 to-transparent rounded-l-lg z-10"
        aria-hidden="true"
      />
      
      {/* Cover image */}
      <div className="relative overflow-hidden rounded-lg shadow-2xl transition-transform duration-300 group-hover:-translate-y-2">
        <Image
          src={siteConfig.images.cover}
          alt={siteConfig.images.coverAlt}
          width={400}
          height={600}
          priority={priority}
          className="w-full h-auto"
          sizes="(max-width: 768px) 280px, (max-width: 1200px) 350px, 400px"
        />
        
        {/* Subtle overlay on hover */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-hidden="true"
        />
      </div>
      
      {/* Corner accent */}
      <div 
        className="absolute -bottom-2 -right-2 w-16 h-16 bg-accent-500 rounded-full opacity-20 blur-xl"
        aria-hidden="true"
      />
    </div>
  );
}

/**
 * Cover with caption
 */
interface CoverWithCaptionProps extends CoverMockProps {
  caption?: string;
}

export function CoverWithCaption({ 
  caption = 'Available on Amazon', 
  ...props 
}: CoverWithCaptionProps) {
  return (
    <figure className="flex flex-col items-center">
      <CoverMock {...props} />
      <figcaption className="mt-4 text-sm text-primary-600 text-center">
        {caption}
      </figcaption>
    </figure>
  );
}
