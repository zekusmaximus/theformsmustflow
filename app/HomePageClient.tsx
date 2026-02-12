// app/HomePageClient.tsx
// Main landing page client composition

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
import dynamic from 'next/dynamic';

const PermitDeskGame = dynamic(() => import('@/components/PermitDeskGame'), {
  ssr: false,
});

export default function HomePageClient() {
  const [showExitModal, setShowExitModal] = useState(false);

  useExitIntent({
    enabled: siteConfig.features.exitIntent && siteConfig.features.emailCapture,
    onExitIntent: () => setShowExitModal(true),
  });

  return (
    <main className="min-h-screen">
      <StickyHeaderCTA />
      <Hero />
      <ValueProps />

      <section id="permit-desk" className="py-8 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4 md:mb-6">
            <p className="inline-block px-3 py-1 bg-accent-100 text-accent-700 text-xs font-medium rounded-full mb-2">
              Mini-Game
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-primary-900">
              The Permit Desk
            </h2>
            <p className="mt-1.5 text-sm text-primary-600 max-w-2xl mx-auto">
              Stop a hive-mind invasion the only way that works: paperwork.
            </p>
          </div>

          <PermitDeskGame />
        </div>
      </section>

      <Teaser />
      <Testimonials className="my-8" />
      <FAQAccordion />
      <AuthorBio variant="long" />
      <FinalCTA />
      {siteConfig.features.shareBar && <ShareBar />}
      <Footer />
      <MobileStickyCTA />

      {showExitModal && (
        <ExitIntentModal onClose={() => setShowExitModal(false)} />
      )}
    </main>
  );
}

