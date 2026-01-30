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
import PermitDeskGame from "@/components/PermitDeskGame";

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

      {/* Mini-game: The Permit Desk */}
      <section id="permit-desk" className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <p className="inline-block px-4 py-1.5 bg-accent-100 text-accent-700 text-sm font-medium rounded-full mb-3 md:mb-4">
              Mini-Game
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900">
              The Permit Desk
            </h2>
            <p className="mt-3 text-primary-600 max-w-2xl mx-auto">
              Stop a hive-mind invasion the only way that works: paperwork.
            </p>
          </div>

          <PermitDeskGame />
        </div>
      </section>

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
