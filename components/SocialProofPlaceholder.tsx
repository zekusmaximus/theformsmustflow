// components/SocialProofPlaceholder.tsx
// Placeholder for future social proof content

'use client';

import React from 'react';
import { copy } from '@/copy';

interface SocialProofPlaceholderProps {
  className?: string;
}

/**
 * Social Proof Placeholder
 * 
 * Empty slot for future reviews, endorsements, etc.
 * Clearly labeled as placeholder
 * 
 * Usage:
 * <SocialProofPlaceholder />
 */
export function SocialProofPlaceholder({ className = '' }: SocialProofPlaceholderProps) {
  return (
    <section 
      className={`py-12 border-2 border-dashed border-primary-200 rounded-xl bg-primary-50/50 ${className}`}
      data-section="social-proof"
      aria-label="Social proof placeholder"
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-4">
          <svg 
            className="w-6 h-6 text-primary-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
            />
          </svg>
        </div>
        <p className="text-sm text-primary-500 font-medium">
          {copy.ui.socialProofPlaceholder}
        </p>
        <p className="text-xs text-primary-400 mt-2">
          [This section is reserved for authentic reviews, endorsements, or accolades when available]
        </p>
      </div>
    </section>
  );
}
