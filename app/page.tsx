// app/page.tsx
// Main landing page

'use client';

import React, { useState } from 'react';
import {
  Hero,
  ValueProps,
  Teaser,
  FAQAccordion,
  AuthorBio,
  StickyHeaderCTA,
  MobileStickyCTA,
  ShareBar,
  Footer,
  FinalCTA,
  ExitIntentModal,
  Testimonials,
} from '@/components';
import { useExitIntent } from '@/hooks';
import { siteConfig } from '@/site.config';

/**
 * Landing Page
 * 
 * Sections in order:
 * 1. Sticky Header CTA (desktop)
 * 2. Hero
 * 3. Value Props
 * 4. Teaser (original content, not book excerpt)
 * 5. Social Proof
 * 6. FAQ
 * 7. Author Bio
 * 8. Final CTA
 * 9. Share Bar
 * 10. Footer
 * 11. Mobile Sticky CTA
 * 12. Exit Intent Modal (conditional)
 */
export default function LandingPage() {
  const [showExitModal, setShowExitModal] = useState(false);

  // Initialize exit intent detection
  useExitIntent({
    enabled: siteConfig.features.exitIntent && siteConfig.features.emailCapture,
    onExitIntent: () => setShowExitModal(true),
  });

  return (
    <main className="min-h-screen">
      {/* Sticky header CTA - desktop only */}
      <StickyHeaderCTA />

      {/* Hero section */}
      <Hero />

      {/* Value propositions */}
      <ValueProps />

      {/* Teaser content */}
      <Teaser />

      {/* Social proof */}
      <Testimonials className="my-8" />

      {/* FAQ accordion */}
      <FAQAccordion />

      {/* Author biography */}
      <AuthorBio variant="long" />

      {/* Final CTA */}
      <FinalCTA />

      {/* Share bar */}
      {siteConfig.features.shareBar && <ShareBar />}

      {/* Footer */}
      <Footer />

      {/* Mobile sticky CTA */}
      <MobileStickyCTA />

      {/* Exit intent modal */}
      {showExitModal && (
        <ExitIntentModal onClose={() => setShowExitModal(false)} />
      )}
    </main>
  );
}
