// components/FinalCTA.tsx
// Final call-to-action section

'use client';

import React from 'react';
import { AmazonCTA, SampleCTA } from './CTAButton';
import { copy } from '@/copy';
import { siteConfig } from '@/site.config';

interface FinalCTAProps {
  className?: string;
}

/**
 * Final CTA Section
 * 
 * Last conversion opportunity before footer
 * Reinforces value proposition and provides clear next steps
 * 
 * Usage:
 * <FinalCTA />
 */
export function FinalCTA({ className = '' }: FinalCTAProps) {
  return (
    <section 
      className={`py-16 md:py-24 bg-gradient-to-br from-primary-900 to-primary-800 ${className}`}
      data-section="final-cta"
      aria-labelledby="final-cta-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 
          id="final-cta-heading"
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
        >
          {copy.ui.finalCTAHeadline}
        </h2>
        
        <p className="text-lg md:text-xl text-primary-200 mb-10 max-w-2xl mx-auto">
          {copy.ui.finalCTASubheadline}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <AmazonCTA 
            size="lg" 
            trackLocation="final-cta"
            className="bg-accent-500 hover:bg-accent-400"
          >
            Get the Book — $4.98
          </AmazonCTA>
          
          <SampleCTA 
            size="lg" 
            trackLocation="final-cta"
            className="border-white text-white hover:bg-white/10"
          >
            Read Sample First
          </SampleCTA>
        </div>

        {/* Additional trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-primary-300">
          <span className="inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {copy.microcopy.instantDelivery}
          </span>
          <span className="inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            {copy.microcopy.secureCheckout}
          </span>
        </div>

        {/* Amazon badge */}
        <p className="mt-8 text-xs text-primary-400">
          Available exclusively on Amazon
        </p>
      </div>
    </section>
  );
}
