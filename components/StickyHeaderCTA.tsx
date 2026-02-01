// components/StickyHeaderCTA.tsx
// Sticky header with CTA (desktop only)

'use client';

import React, { useState, useEffect } from 'react';
import { AmazonCTA } from './CTAButton';
import { copy } from '@/copy';
import { siteConfig } from '@/site.config';

interface StickyHeaderCTAProps {
  className?: string;
}

/**
 * Sticky Header CTA
 * 
 * Appears when user scrolls past hero section
 * Contains book title and buy button
 * Desktop only (hidden on mobile)
 * 
 * Usage:
 * <StickyHeaderCTA />
 */
export function StickyHeaderCTA({ className = '' }: StickyHeaderCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    let rafId: number;

    const handleScroll = () => {
      if (!ticking) {
        rafId = window.requestAnimationFrame(() => {
          // Show header after scrolling past 400px (roughly hero section)
          const shouldShow = window.scrollY > 400;
          setIsVisible(shouldShow);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${className}`}
      aria-hidden={!isVisible}
      data-section="sticky-header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Book title */}
          <div className="flex items-center">
            <span className="text-lg font-bold text-primary-900 truncate max-w-xs sm:max-w-md">
              {siteConfig.bookTitle}
            </span>
            <span className="hidden sm:inline mx-3 text-primary-300">|</span>
            <span className="hidden sm:inline text-sm text-primary-600">
              by {siteConfig.authorName}
            </span>
          </div>

          {/* CTA Button */}
          <AmazonCTA 
            size="sm" 
            trackLocation="sticky-header"
          >
            {copy.ui.stickyHeaderCTA}
          </AmazonCTA>
        </div>
      </div>
    </header>
  );
}
