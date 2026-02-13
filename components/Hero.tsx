// components/Hero.tsx
// Hero section with headline, subhead, CTAs, and cover

'use client';

import React from 'react';
import { CoverMock } from './CoverMock';
import { AmazonCTA, SampleCTA } from './CTAButton';
import { copy } from '@/copy';
import { getVariantCopy } from '@/hooks';
import { useVariant } from '@/hooks';
import { siteConfig } from '@/site.config';

interface HeroProps {
  className?: string;
}

/**
 * Hero Section
 * 
 * Main landing page hero with:
 * - Dynamic headline/subhead based on variant
 * - Book cover image
 * - Primary and secondary CTAs
 * - Trust microcopy
 * 
 * Usage:
 * <Hero />
 */
export function Hero({ className = '' }: HeroProps) {
  const { variant } = useVariant();
  
  const headline = getVariantCopy(copy.heroH1, variant);
  const subhead = getVariantCopy(copy.heroSubhead, variant);
  const primaryCTA = getVariantCopy(copy.primaryCTA, variant);
  const secondaryCTA = getVariantCopy(copy.secondaryCTA, variant);

  return (
    <section 
      className={`relative min-h-screen flex items-center pt-20 pb-16 md:pt-24 md:pb-24 overflow-hidden ${className}`}
      data-section="hero"
      aria-labelledby="hero-heading"
    >
      {/* Background gradient - dark cinematic */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-950 to-dark-900"
        aria-hidden="true"
      />

      {/* Cinematic vignette overlay */}
      <div 
        className="absolute inset-0 vignette"
        aria-hidden="true"
      />
      
      {/* Decorative elements - neon glow orbs with pulsing animation */}
      <div 
        className="absolute top-20 right-10 w-64 h-64 bg-neon-500/20 rounded-full blur-3xl animate-pulse"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-20 left-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '1s' }}
        aria-hidden="true"
      />

      {/* Grain / paper texture */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Stamped watermark - holographic dark theme */}
      <div 
        className="absolute -right-16 md:-right-10 top-16 hidden xl:block rotate-[-18deg]" 
        aria-hidden="true"
      >
        <div className="stamp-shadow-dark border-4 border-neon-500/30 bg-dark-800/60 px-6 py-2 text-6xl font-black uppercase tracking-[0.4em] text-neon-400/30 shadow-neon">
          STAMPED
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <div className="relative text-center lg:text-left order-2 lg:order-1">
            {/* Folder stack framing - dark theme */}
            <div className="pointer-events-none absolute -inset-x-2 -inset-y-3 max-w-2xl mx-auto lg:mx-0">
              <div className="absolute inset-0 -left-3 -right-3 rotate-[-2deg] rounded-2xl border border-dark-700 bg-dark-800/80 shadow-md" />
              <div className="absolute inset-0 left-3 right-1 rotate-1 rounded-2xl border border-dark-700 bg-dark-900/90 shadow-lg" />
              <div className="absolute -top-3 left-10 right-10 h-3 bg-accent-500 rotate-[-4deg] rounded-sm shadow-md" />
              <div className="absolute -bottom-4 left-14 right-14 h-3 bg-accent-600 rotate-3 rounded-sm shadow-lg" />
            </div>

            <div className="relative max-w-2xl mx-auto lg:mx-0">
              {/* Genre tag - holographic label */}
              <p className="inline-block px-4 py-1.5 bg-neon-500/20 text-neon-400 text-sm font-medium rounded-full mb-3 rotate-[-1deg] border border-neon-500/30 shadow-neon-sm">
                Satirical Science Fiction
              </p>

              {/* Change #2: New Release badge */}
              <div className="mb-6">
                <span className="inline-block px-4 py-1.5 bg-[rgba(255,215,0,0.15)] text-[#ffd700] text-sm font-medium rounded-full border border-[rgba(255,215,0,0.3)]">
                  ✨ New Release — February 2026
                </span>
              </div>

              {/* Headline - dark theme with text shadow */}
              <h1
                id="hero-heading"
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-dark-50 leading-tight mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
              >
                {headline}
              </h1>

              {/* Change #5: Recommended For */}
              <p className="text-sm md:text-base text-dark-400 italic mb-4 max-w-2xl mx-auto lg:mx-0">
                ⭐ Recommended for fans of <strong className="font-semibold not-italic text-dark-300">Douglas Adams</strong>, <strong className="font-semibold not-italic text-dark-300">Terry Pratchett</strong>, and anyone who&apos;s ever filled out form 27B/6
              </p>

              {/* Subhead - dark theme */}
              <p className="text-lg md:text-xl text-dark-300 leading-relaxed mb-6 max-w-2xl mx-auto lg:mx-0">
                {subhead}
              </p>

              {/* Change #3: Try before you buy helper text */}
              <p className="text-sm text-dark-400 mb-4 text-center lg:text-left">
                🤔 Not sure yet?{' '}
                <a href="/sample" className="text-neon-400 underline hover:text-neon-300 transition-colors">
                  Read a free sample first
                </a>{' '}
                <span className="hidden sm:inline">(850 words, 4 min read)</span>
                <span className="sm:hidden">(4 min read)</span>
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                <AmazonCTA
                  size="lg"
                  trackLocation="hero"
                >
                  {primaryCTA}
                </AmazonCTA>

                <SampleCTA
                  size="lg"
                  trackLocation="hero"
                >
                  {secondaryCTA}
                </SampleCTA>
              </div>

              {/* Trust microcopy - dark theme */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-dark-400">
                <TrustBadge icon="check">
                  {copy.microcopy.instantDelivery}
                </TrustBadge>
                <TrustBadge icon="lock">
                  {copy.microcopy.secureCheckout}
                </TrustBadge>
                <TrustBadge icon="device">
                  {copy.microcopy.readOnAnyDevice}
                </TrustBadge>
              </div>
            </div>
          </div>

          {/* Cover image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="w-64 sm:w-72 md:w-80 lg:w-96">
              <CoverMock priority />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden lg:flex justify-center mt-16">
          <div className="animate-bounce">
            <svg 
              className="w-6 h-6 text-neon-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

interface TrustBadgeProps {
  icon: 'check' | 'lock' | 'device';
  children: React.ReactNode;
}

function TrustBadge({ icon, children }: TrustBadgeProps) {
  const icons = {
    check: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    lock: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    device: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  };

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-neon-400">
        {icons[icon]}
      </span>
      {children}
    </span>
  );
}
