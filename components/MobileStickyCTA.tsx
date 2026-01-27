// components/MobileStickyCTA.tsx
// Bottom sticky CTA bar (mobile only)

'use client';

import React from 'react';
import { AmazonCTA } from './CTAButton';
import { copy } from '@/copy';
import { useCTAPulse } from '@/hooks';
import { siteConfig } from '@/site.config';

interface MobileStickyCTAProps {
  className?: string;
}

/**
 * Mobile Sticky CTA Bar
 * 
 * Fixed bottom bar with CTA button
 * Mobile only (hidden on desktop)
 * Includes pulse animation when user scrolls past threshold
 * 
 * Usage:
 * <MobileStickyCTA />
 */
export function MobileStickyCTA({ className = '' }: MobileStickyCTAProps) {
  const { shouldPulse, stopPulse } = useCTAPulse({
    threshold: 35,
    pulseOnce: true,
  });

  // Only show if scroll pulse feature is enabled
  if (!siteConfig.features.scrollPulse) {
    return (
      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-primary-200 p-4 md:hidden ${className}`}
        data-section="mobile-cta"
      >
        <AmazonCTA 
          size="md" 
          trackLocation="mobile-sticky"
          className="w-full"
        >
          {copy.ui.mobileStickyCTA}
        </AmazonCTA>
      </div>
    );
  }

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-primary-200 p-4 md:hidden ${className}`}
      data-section="mobile-cta"
    >
      <AmazonCTA 
        size="md" 
        trackLocation="mobile-sticky"
        className={`w-full transition-all duration-300 ${shouldPulse ? 'animate-pulse ring-4 ring-accent-400 ring-opacity-50' : ''}`}
        onClick={stopPulse}
      >
        {shouldPulse ? copy.ui.scrollPulseText : copy.ui.mobileStickyCTA}
      </AmazonCTA>
    </div>
  );
}
