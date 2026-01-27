// components/Teaser.tsx
// Teaser content display with disclaimer

'use client';

import React from 'react';
import { copy } from '@/copy';
import { getVariantCopy } from '@/hooks';
import { useVariant } from '@/hooks';

interface TeaserProps {
  variant?: 'full' | 'compact';
  className?: string;
}

/**
 * Teaser Content Component
 * 
 * Displays original teaser text (NOT from the book)
 * with clear disclaimer
 * 
 * Usage:
 * <Teaser variant="compact" />
 */
export function Teaser({ variant = 'compact', className = '' }: TeaserProps) {
  const [currentExcerptIndex, setCurrentExcerptIndex] = React.useState(0);
  const allExcerpts = [copy.teaser.v1, copy.teaser.v2, copy.teaser.v3];

  // Auto-rotate through excerpts every 30 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExcerptIndex((prev) => (prev + 1) % allExcerpts.length);
    }, 30000);
    return () => clearInterval(interval);
  }, [allExcerpts.length]);

  if (variant === 'compact') {
    return (
      <section 
        className={`py-16 md:py-24 bg-primary-50 ${className}`}
        data-section="teaser"
        aria-labelledby="teaser-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            id="teaser-heading"
            className="text-3xl md:text-4xl font-bold text-primary-900 text-center mb-4"
          >
            Preview the Tone
          </h2>
          <p className="text-center text-primary-600 mb-12 max-w-2xl mx-auto">
            A taste of what awaits—excerpts from the novel showcasing the book&apos;s voice and style.
          </p>
          
          <TeaserContent content={allExcerpts[currentExcerptIndex]} />
          
          {/* Excerpt navigation dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {allExcerpts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentExcerptIndex(idx)}
                className={`h-2.5 w-8 rounded-full transition-all duration-300 ${
                  idx === currentExcerptIndex ? 'bg-accent-600' : 'bg-primary-200 hover:bg-primary-300'
                }`}
                aria-label={`Show excerpt ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className={className} data-section="teaser">
      <TeaserContent content={allExcerpts[currentExcerptIndex]} />
    </div>
  );
}

interface TeaserContentProps {
  content: string;
}

function TeaserContent({ content }: TeaserContentProps) {
  // Extract the title (first line) and the actual content
  const lines = content.split('\n');
  const title = lines[0];
  const bodyContent = lines.slice(1).join('\n').trim();

  return (
    <article className="relative">
      {/* Decorative quote marks */}
      <div 
        className="absolute -top-4 -left-4 text-8xl text-accent-200 font-serif leading-none select-none"
        aria-hidden="true"
      >
        &ldquo;
      </div>
      
      <div className="relative bg-white rounded-xl shadow-lg p-8 md:p-12">
        {/* Chapter title - styled prominently */}
        <h3 className="text-lg font-bold text-accent-700 uppercase tracking-widest mb-6 border-b-2 border-accent-200 pb-3">
          {title}
        </h3>
        
        {/* Teaser content */}
        <div className="prose prose-lg prose-primary max-w-none">
          {bodyContent.split('\n\n').map((paragraph, index) => (
            <p 
              key={index} 
              className="text-primary-700 leading-relaxed mb-4 last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </div>
        
        {/* Bottom accent */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-400 via-secondary-400 to-primary-400 rounded-b-xl"
          aria-hidden="true"
        />
      </div>
    </article>
  );
}

/**
 * Teaser for sample page (full version)
 * Displays all three excerpts from the novel
 */
export function SampleTeaser() {
  const allExcerpts = [copy.teaser.v1, copy.teaser.v2, copy.teaser.v3];

  return (
    <article className="prose prose-lg prose-primary max-w-none space-y-12">
      {allExcerpts.map((excerpt, excerptIndex) => {
        // Extract the title (first line) and the actual content
        const lines = excerpt.split('\n');
        const title = lines[0];
        const bodyContent = lines.slice(1).join('\n').trim();

        return (
          <div key={excerptIndex}>
            {/* Chapter title - styled prominently */}
            <h3 className="text-xl font-bold text-accent-700 uppercase tracking-widest mb-6 border-b-2 border-accent-200 pb-3">
              {title}
            </h3>
            
            {bodyContent.split('\n\n').map((paragraph, index) => (
              <p 
                key={index} 
                className="text-primary-700 leading-relaxed mb-6"
              >
                {paragraph}
              </p>
            ))}
          </div>
        );
      })}
    </article>
  );
}
