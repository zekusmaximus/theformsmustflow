// components/EmailCapture.tsx
// Email capture form with dummy handler

'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/site.config';
import { isValidEmail } from '@/lib/utils';
import { trackEmailCapture } from '@/lib/analytics';

interface EmailCaptureProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  className?: string;
}

/**
 * Email Capture Form
 * 
 * Collects email addresses for later follow-up
 * Currently uses dummy handler - wire your own service
 * 
 * TODO: Connect to your email service (Mailchimp, ConvertKit, etc.)
 * 
 * Usage:
 * <EmailCapture onSuccess={() => setShowModal(false)} />
 */
export function EmailCapture({ onSuccess, onCancel, className = '' }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate email
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    trackEmailCapture('submit');

    // === TODO: WIRE YOUR EMAIL SERVICE HERE ===
    // Example integrations:
    //
    // Mailchimp:
    //   await fetch('/api/subscribe', {
    //     method: 'POST',
    //     body: JSON.stringify({ email }),
    //   });
    //
    // ConvertKit:
    //   await fetch(`https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, api_key: API_KEY }),
    //   });
    //
    // ==========================================

    // Simulate API call (remove in production)
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('[Email Capture] Submitted:', email);

    setIsSubmitting(false);
    setIsSuccess(true);
    trackEmailCapture('success');
    onSuccess?.();
  };

  if (isSuccess) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-primary-900 mb-2">
          {siteConfig.emailCapture.successMessage}
        </h3>
        <p className="text-primary-600">
          We&apos;ve sent the book link to {email}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-4">
        <div>
          <label 
            htmlFor="email-capture"
            className="sr-only"
          >
            Email address
          </label>
          <input
            id="email-capture"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={siteConfig.emailCapture.placeholder}
            className="w-full px-4 py-3 rounded-lg border border-primary-300 focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all"
            disabled={isSubmitting}
            autoFocus
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm" role="alert">
            {error}
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-accent-600 hover:bg-accent-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : siteConfig.emailCapture.buttonText}
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-6 py-3 border border-primary-300 text-primary-700 font-medium rounded-lg hover:bg-primary-50 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
