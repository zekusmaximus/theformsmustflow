// components/AuthorBio.tsx
// Author biography section

'use client';

import React from 'react';
import { copy } from '@/copy';
import { siteConfig } from '@/site.config';

interface AuthorBioProps {
  variant?: 'short' | 'long';
  className?: string;
}

/**
 * Author Bio Component
 * 
 * Displays author information with bio
 * 
 * Usage:
 * <AuthorBio variant="long" />
 */
export function AuthorBio({ variant = 'long', className = '' }: AuthorBioProps) {
  const bioContent = copy.authorBio[variant];

  return (
    <section 
      className={`py-16 md:py-24 bg-primary-50 ${className}`}
      data-section="author"
      aria-labelledby="author-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          id="author-heading"
          className="text-3xl md:text-4xl font-bold text-primary-900 text-center mb-12"
        >
          {copy.ui.authorHeadline}
        </h2>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          {/* Author avatar placeholder */}
          <div className="flex-shrink-0">
            <AuthorAvatar />
          </div>

          {/* Bio content */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold text-primary-900 mb-4">
              {siteConfig.authorName}
            </h3>
            <div className="prose prose-lg text-primary-700">
              {bioContent.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 last:mb-0 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Author Avatar Placeholder
 * Replace with actual author photo when available
 */
function AuthorAvatar() {
  return (
    <div 
      className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg"
      aria-label={`${siteConfig.authorName} avatar`}
    >
      <span className="text-4xl md:text-5xl font-bold text-white">
        {siteConfig.authorName.split(' ').map(n => n[0]).join('')}
      </span>
    </div>
  );
}
