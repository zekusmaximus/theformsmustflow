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
  robots?: Metadata['robots'];
}

function toCanonicalUrl(path: string = '/'): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  let normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (normalizedPath !== '/' && !normalizedPath.endsWith('/')) {
    normalizedPath = `${normalizedPath}/`;
  }

  return `${siteConfig.siteUrl}${normalizedPath}`;
}

export function generateMetadata(payload: SEOPayload = {}): Metadata {
  const {
    title = copy.metadata.seoTitle.v1,
    description = copy.metadata.metaDescription.v1,
    path = '/',
    image = siteConfig.images.ogImage,
    type = 'website',
    robots,
  } = payload;

  const url = toCanonicalUrl(path);
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
    robots: robots ?? {
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
    description: copy.metadata.metaDescription.v1,
    author: {
      '@type': 'Person',
      name: siteConfig.authorName,
      url: 'https://www.zyjeski.com/',
    },
    url: toCanonicalUrl('/'),
    image: `${siteConfig.siteUrl}${siteConfig.images.cover}`,
    sameAs: [siteConfig.amazonUrl],
    // Note: ISBN intentionally omitted per requirements
    // ISBN: '978-XXXXXXXXXX',
    // numberOfPages: 0, // Intentionally omitted per requirements
    // publisher: '', // Intentionally omitted per requirements
    inLanguage: 'en',
    workExample: [
      {
        '@type': 'Book',
        name: `${siteConfig.bookTitle} - Kindle Edition`,
        bookFormat: 'https://schema.org/EBook',
        offers: {
          '@type': 'Offer',
          url: siteConfig.amazonUrl,
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: 'Amazon',
          },
        },
      },
      {
        '@type': 'Book',
        name: `${siteConfig.bookTitle} - Paperback`,
        bookFormat: 'https://schema.org/Paperback',
        offers: {
          '@type': 'Offer',
          url: siteConfig.amazonUrl,
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: 'Amazon',
          },
        },
      },
    ],
    // AggregateRating placeholder - add real data when available
    // aggregateRating: {
    //   '@type': 'AggregateRating',
    //   ratingValue: '0',
    //   reviewCount: '0',
    // },
  };
}

export function generateFAQPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: copy.faq.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
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
