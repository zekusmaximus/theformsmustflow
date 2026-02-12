// app/sample/page.tsx
// Sample/teaser page for SEO and engagement

import type { Metadata } from 'next';
import Link from 'next/link';
import { CoverMock } from '@/components/CoverMock';
import { AmazonCTA } from '@/components/CTAButton';
import { SampleTeaser } from '@/components/Teaser';
import { Footer } from '@/components/Footer';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { copy } from '@/copy';
import { siteConfig } from '@/site.config';
import { calculateReadingTime } from '@/lib/utils';

// Generate metadata for sample page
export const metadata: Metadata = generateSEOMetadata({
  title: `Read a Sample | ${copy.metadata.seoTitle.v1}`,
  description: `Preview The Forms Must Flow with original teaser content. ${copy.metadata.metaDescription.v1}`,
  path: '/sample/',
});

/**
 * Sample Page
 * 
 * Displays original teaser content (NOT from the book)
 * Used for SEO and user engagement
 * Includes reading time estimate
 */
export default function SamplePage() {
  const readingTime = calculateReadingTime(siteConfig.content.sampleWordCount);

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-primary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center justify-between">
            <Link 
              href="/"
              className="text-lg font-bold text-primary-900 hover:text-accent-600 transition-colors"
            >
              {siteConfig.bookTitle}
            </Link>
            <AmazonCTA size="sm" trackLocation="sample-header">
              Buy on Amazon
            </AmazonCTA>
          </nav>
        </div>
      </header>

      {/* Content */}
      <article className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
              {copy.ui.samplePageTitle}
            </h1>
            <div className="flex items-center justify-center gap-4 text-sm text-primary-500">
              <span className="inline-flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {readingTime} {copy.ui.sampleReadingTime}
              </span>
              <span>|</span>
              <span>{siteConfig.content.sampleWordCount} words</span>
            </div>
          </header>

          {/* Cover image */}
          <div className="flex justify-center mb-12">
            <div className="w-48 md:w-56">
              <CoverMock />
            </div>
          </div>

          {/* Teaser content */}
          <div className="mb-12">
            <SampleTeaser />
          </div>

          {/* CTA */}
          <div className="text-center py-8 border-t border-primary-200">
            <p className="text-primary-600 mb-6">
              Want to read the full story?
            </p>
            <AmazonCTA size="lg" trackLocation="sample-footer">
              Buy on Amazon
            </AmazonCTA>
          </div>
        </div>
      </article>

      {/* Footer */}
      <Footer />
    </main>
  );
}
