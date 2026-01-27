// components/CTAButton.tsx
// Primary and secondary CTA buttons with tracking

'use client';

import React from 'react';
import { trackCTAClick, trackSecondaryCTAClick } from '@/lib/analytics';
import { siteConfig } from '@/site.config';

interface CTAButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  isExternal?: boolean;
  trackLocation?: string;
  trackVariant?: string;
  ariaLabel?: string;
}

/**
 * Primary CTA Button
 * 
 * Variants:
 * - primary: Solid background (main CTA)
 * - secondary: Alternative style
 * - outline: Border-only style
 * 
 * Usage:
 * <CTAButton variant="primary" trackLocation="hero">
 *   Buy on Amazon
 * </CTAButton>
 */
export function CTAButton({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  children,
  className = '',
  isExternal = true,
  trackLocation = 'unknown',
  trackVariant = 'default',
  ariaLabel,
}: CTAButtonProps) {
  const handleClick = () => {
    if (variant === 'primary') {
      trackCTAClick(trackLocation, trackVariant);
    } else {
      trackSecondaryCTAClick(trackLocation);
    }
    onClick?.();
  };

  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 stamp-texture';

  const variantStyles = {
    primary: 'bg-neon-600 hover:bg-neon-500 text-white focus:ring-neon-400 shadow-neon hover:shadow-neon-lg glow-neon hover:-translate-y-0.5',
    secondary: 'bg-dark-700 hover:bg-dark-600 text-white focus:ring-neon-400 border border-neon-500/50 shadow-md hover:shadow-neon-sm',
    outline: 'border-2 border-neon-500 text-neon-400 hover:bg-neon-500/10 focus:ring-neon-400 hover:shadow-neon-sm',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={combinedClassName}
        onClick={handleClick}
        {...(isExternal && {
          target: '_blank',
          rel: 'noopener noreferrer',
        })}
        aria-label={ariaLabel}
      >
        {children}
        {isExternal && variant === 'primary' && (
          <svg 
            className="ml-2 w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
            />
          </svg>
        )}
      </a>
    );
  }

  return (
    <button
      className={combinedClassName}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

/**
 * Amazon CTA Button (pre-configured)
 * 
 * Usage:
 * <AmazonCTA size="lg" trackLocation="hero">
 *   Buy on Amazon
 * </AmazonCTA>
 */
interface AmazonCTAProps {
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  trackLocation?: string;
  className?: string;
  onClick?: () => void;
}

export function AmazonCTA({
  size = 'lg',
  children = 'Buy on Amazon',
  trackLocation = 'unknown',
  className = '',
  onClick,
}: AmazonCTAProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <CTAButton
        variant="primary"
        size={size}
        href={siteConfig.amazonUrl}
        trackLocation={trackLocation}
        className={className}
        onClick={onClick}
        ariaLabel="Buy The Forms Must Flow on Amazon (opens in new tab)"
      >
        {children}
      </CTAButton>
      <p className="text-xs text-primary-400 text-center">
        Opens Amazon • Kindle Unlimited + paperback • Takes 10 seconds
      </p>
    </div>
  );
}

/**
 * Sample CTA Button (pre-configured)
 * 
 * Usage:
 * <SampleCTA trackLocation="hero" />
 */
interface SampleCTAProps {
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  trackLocation?: string;
  className?: string;
}

export function SampleCTA({
  size = 'md',
  children = 'Read a Sample',
  trackLocation = 'unknown',
  className = '',
}: SampleCTAProps) {
  return (
    <CTAButton
      variant="outline"
      size={size}
      href="/sample"
      isExternal={false}
      trackLocation={trackLocation}
      className={className}
      ariaLabel="Read a sample of The Forms Must Flow"
    >
      {children}
    </CTAButton>
  );
}
