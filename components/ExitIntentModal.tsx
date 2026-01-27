// components/ExitIntentModal.tsx
// Exit intent modal for email capture

'use client';

import React, { useEffect, useRef } from 'react';
import { EmailCapture } from './EmailCapture';
import { copy } from '@/copy';
import { useExitIntent } from '@/hooks';
import { siteConfig } from '@/site.config';
import { trackExitIntent } from '@/lib/analytics';

interface ExitIntentModalProps {
  onClose?: () => void;
}

/**
 * Exit Intent Modal
 * 
 * Shows when user tries to leave the page (desktop only)
 * Only activates if emailCapture feature flag is enabled
 * 
 * Usage:
 * <ExitIntentModal onClose={() => setShowModal(false)} />
 */
export function ExitIntentModal({ onClose }: ExitIntentModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Only enable if both flags are true
  const isEnabled = siteConfig.features.exitIntent && siteConfig.features.emailCapture;

  useExitIntent({
    enabled: isEnabled,
    onExitIntent: () => {
      // Modal is controlled by parent, this just triggers
    },
  });

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Close on click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      handleClose();
    }
  };

  const handleClose = () => {
    trackExitIntent('dismissed');
    onClose?.();
  };

  const handleSuccess = () => {
    trackExitIntent('submitted');
    // Modal will show success state, then close
    setTimeout(() => {
      onClose?.();
    }, 2000);
  };

  if (!isEnabled) return null;

  return (
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 md:p-8 animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-primary-400 hover:text-primary-600 hover:bg-primary-100 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h2 
            id="exit-intent-title"
            className="text-2xl font-bold text-primary-900 mb-2"
          >
            {copy.ui.exitIntentHeadline}
          </h2>
          <p className="text-primary-600">
            {copy.ui.exitIntentSubheadline}
          </p>
        </div>

        {/* Email capture form */}
        <EmailCapture 
          onSuccess={handleSuccess} 
          onCancel={handleClose}
        />
      </div>
    </div>
  );
}
