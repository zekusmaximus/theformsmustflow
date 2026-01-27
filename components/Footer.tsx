// components/Footer.tsx
// Site footer with links and copyright

'use client';

import React from 'react';
import { siteConfig } from '@/site.config';
import { copy } from '@/copy';

interface FooterProps {
  className?: string;
}

/**
 * Footer Component
 * 
 * Site footer with copyright and optional links
 * 
 * Usage:
 * <Footer />
 */
export function Footer({ className = '' }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className={`bg-primary-900 text-primary-300 py-12 ${className}`}
      data-section="footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo / Title */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white">
              {siteConfig.bookTitle}
            </h3>
            <p className="text-sm text-primary-400 mt-1">
              by {siteConfig.authorName}
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <li>
                <a 
                  href={siteConfig.amazonUrl}
                  className="hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy on Amazon
                </a>
              </li>
              <li>
                <a 
                  href="/sample"
                  className="hover:text-white transition-colors"
                >
                  Read a Sample
                </a>
              </li>
              {siteConfig.features.pressKit && (
                <li>
                  <a 
                    href="/press-kit"
                    className="hover:text-white transition-colors"
                  >
                    {copy.ui.pressKitLabel}
                  </a>
                </li>
              )}
            </ul>
          </nav>

          {/* Copyright */}
          <div className="text-center md:text-right text-sm text-primary-500">
            <p>&copy; {currentYear} {siteConfig.authorName}</p>
            <p className="mt-1">All rights reserved.</p>
          </div>
        </div>

        {/* Amazon disclosure */}
        <div className="mt-8 pt-8 border-t border-primary-800 text-xs text-primary-500 text-center">
          <p>
            As an Amazon Associate, we may earn from qualifying purchases. 
            All purchases are processed securely through Amazon.
          </p>
        </div>
      </div>
    </footer>
  );
}
