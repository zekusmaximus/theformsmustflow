// app/layout.tsx
// Root layout with SEO, JSON-LD, and global providers

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/site.config';
import { generateBookSchema, generateWebsiteSchema } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Global metadata with metadataBase for absolute URLs
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "The Forms Must Flow — A Satirical Sci-Fi Novel",
    template: "%s | The Forms Must Flow",
  },
  description: "Resistance is futile… unless you have the proper permit. A sharp sci-fi satire where bureaucracy becomes humanity's last defense.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The Forms Must Flow — A Satirical Sci-Fi Novel",
    description: "Resistance is futile… unless you have the proper permit. A sharp sci-fi satire where bureaucracy becomes humanity's last defense.",
    url: "/",
    siteName: siteConfig.siteName,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/og.jpg",
        alt: "The Forms Must Flow book cover - an alien bureaucrat faces a government stamp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Forms Must Flow — A Satirical Sci-Fi Novel",
    description: "Resistance is futile… unless you have the proper permit. A sharp sci-fi satire where bureaucracy becomes humanity's last defense.",
    images: ["/images/og.jpg"],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Generate JSON-LD schemas
  const bookSchema = generateBookSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        
        {/* Preconnect to Amazon */}
        <link rel="preconnect" href="https://www.amazon.com" />
        <link rel="dns-prefetch" href="https://www.amazon.com" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${inter.className} antialiased text-primary-900 bg-white`}>
        {children}
      </body>
    </html>
  );
}
