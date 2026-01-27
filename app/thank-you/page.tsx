// app/thank-you/page.tsx
// Thank you page for email capture (only used if emailCapture enabled)

import type { Metadata } from 'next';
import Link from 'next/link';
import { AmazonCTA } from '@/components/CTAButton';
import { Footer } from '@/components/Footer';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { copy } from '@/copy';
import { siteConfig } from '@/site.config';

// Generate metadata
export const metadata: Metadata = generateSEOMetadata({
  title: `Thank You | ${copy.metadata.seoTitle.v1}`,
  description: `Thanks for your interest in The Forms Must Flow. Get your copy on Amazon.`,
  path: '/thank-you',
});

/**
 * Thank You Page
 * 
 * Shown after email capture submission
 * Only used if emailCapture feature flag is enabled
 */
export default function ThankYouPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-primary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/"
            className="text-lg font-bold text-primary-900 hover:text-accent-600 transition-colors"
          >
            {siteConfig.bookTitle}
          </Link>
        </div>
      </header>

      {/* Content */}
      <section className="flex-1 flex items-center justify-center py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Success icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg 
              className="w-10 h-10 text-green-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            {copy.ui.thankYouTitle}
          </h1>

          {/* Message */}
          <p className="text-lg text-primary-600 mb-8">
            {copy.ui.thankYouMessage}
          </p>

          {/* CTA */}
          <AmazonCTA size="lg" trackLocation="thank-you">
            {copy.ui.thankYouCTA}
          </AmazonCTA>

          {/* Back to home */}
          <p className="mt-8">
            <Link 
              href="/"
              className="text-accent-600 hover:text-accent-700 font-medium"
            >
              &larr; Back to homepage
            </Link>
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
