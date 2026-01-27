// lib/seo.ts
// SEO metadata generation utilities

import { Metadata } from 'next';
import { siteConfig } from '@/site.config';
import { copy } from '@/copy';

interface SEOPayload {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'book';
}

export function generateMetadata(payload: SEOPayload = {}): Metadata {
  const {
    title = copy.metadata.seoTitle.v1,
    description = copy.metadata.metaDescription.v1,
    path = '/',
    image = siteConfig.images.ogImage,
    type = 'website',
  } = payload;

  const url = `${siteConfig.siteUrl}${path}`;
  const fullImageUrl = image.startsWith('http') ? image : `${siteConfig.siteUrl}${image}`;

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.siteUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.siteName,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: siteConfig.images.coverAlt,
        },
      ],
      type,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImageUrl],
      // creator: siteConfig.share.twitterHandle, // Uncomment when handle added
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // Add verification tokens here when available
      // google: 'your-google-verification-code',
    },
  };
}

// Generate JSON-LD structured data for Book schema
export function generateBookSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: siteConfig.bookTitle,
    author: {
      '@type': 'Person',
      name: siteConfig.authorName,
    },
    url: siteConfig.amazonUrl,
    // Note: ISBN intentionally omitted per requirements
    // ISBN: '978-XXXXXXXXXX',
    // numberOfPages: 0, // Intentionally omitted per requirements
    // publisher: '', // Intentionally omitted per requirements
    inLanguage: 'en',
    offers: {
      '@type': 'Offer',
      url: siteConfig.amazonUrl,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Amazon',
      },
    },
    // AggregateRating placeholder - add real data when available
    // aggregateRating: {
    //   '@type': 'AggregateRating',
    //   ratingValue: '0',
    //   reviewCount: '0',
    // },
  };
}

// Generate BreadcrumbList schema
export function generateBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.siteUrl}${item.path}`,
    })),
  };
}

// Generate WebSite schema
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
