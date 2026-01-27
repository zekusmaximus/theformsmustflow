// components/ShareBar.tsx
// Social sharing buttons with copy-to-clipboard

'use client';

import React, { useState } from 'react';
import { copy } from '@/copy';
import { siteConfig } from '@/site.config';
import { generateShareUrls, copyToClipboard } from '@/lib/utils';
import { trackShare, trackCopyLink } from '@/lib/analytics';

interface ShareBarProps {
  className?: string;
  url?: string;
  text?: string;
}

/**
 * Share Bar Component
 * 
 * Social sharing buttons + copy link functionality
 * Always enabled by default
 * 
 * Usage:
 * <ShareBar />
 */
export function ShareBar({ 
  className = '',
  url = siteConfig.siteUrl,
  text = copy.share.defaultMessage,
}: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const shareUrls = generateShareUrls(url, text);

  const handleCopyLink = async () => {
    const success = await copyToClipboard(url);
    if (success) {
      trackCopyLink();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = (platform: string, shareUrl: string) => {
    trackShare(platform);
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <section 
      className={`py-12 ${className}`}
      data-section="share"
      aria-labelledby="share-heading"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 
          id="share-heading"
          className="text-xl font-semibold text-primary-900 mb-6"
        >
          {copy.ui.shareHeadline}
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${copied ? 'bg-green-100 text-green-700' : 'bg-primary-100 text-primary-700 hover:bg-primary-200'}`}
            aria-label={copy.ui.copyLink}
          >
            <LinkIcon className="w-4 h-4 mr-2" />
            {copied ? copy.ui.linkCopied : copy.ui.copyLink}
          </button>

          {/* Twitter */}
          <button
            onClick={() => handleShare('twitter', shareUrls.twitter)}
            className="inline-flex items-center px-4 py-2 rounded-lg font-medium bg-[#1DA1F2] text-white hover:bg-[#1a8cd8] transition-colors"
            aria-label="Share on Twitter"
          >
            <TwitterIcon className="w-4 h-4 mr-2" />
            Twitter
          </button>

          {/* Facebook */}
          <button
            onClick={() => handleShare('facebook', shareUrls.facebook)}
            className="inline-flex items-center px-4 py-2 rounded-lg font-medium bg-[#4267B2] text-white hover:bg-[#365899] transition-colors"
            aria-label="Share on Facebook"
          >
            <FacebookIcon className="w-4 h-4 mr-2" />
            Facebook
          </button>

          {/* Email */}
          <a
            href={shareUrls.email}
            className="inline-flex items-center px-4 py-2 rounded-lg font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            aria-label="Share via Email"
          >
            <EmailIcon className="w-4 h-4 mr-2" />
            Email
          </a>
        </div>
      </div>
    </section>
  );
}

// Icon components
function LinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
