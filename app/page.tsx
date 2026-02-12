// app/page.tsx

import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';
import { generateBookSchema, generateFAQPageSchema, generateMetadata as generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'The Forms Must Flow - A Satirical Sci-Fi Novel',
  description:
    "Resistance is futile... unless you have the proper permit. A sharp sci-fi satire where bureaucracy becomes humanity's last defense, by Jeffrey A. Zyjeski.",
  path: '/',
});

export default function LandingPage() {
  const bookSchema = generateBookSchema();
  const faqPageSchema = generateFAQPageSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <HomePageClient />
    </>
  );
}

