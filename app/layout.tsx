// app/layout.tsx
// Root layout with SEO, JSON-LD, and global providers

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/site.config';
import { copy } from '@/copy';
import { generateMetadata as generateSEOMetadata, generateBookSchema, generateWebsiteSchema } from '@/lib/seo';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Generate metadata
export const metadata: Metadata = generateSEOMetadata({
  title: copy.metadata.seoTitle.v1,
  description: copy.metadata.metaDescription.v1,
});

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
