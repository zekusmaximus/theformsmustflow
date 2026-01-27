// lib/analytics.ts
// Analytics interface with stub implementation
// TODO: Wire your own analytics service (Plausible, GA4, etc.)

import { AnalyticsEvent, AnalyticsPayload } from '@/types';

// Configuration flag - set to true when analytics are wired
const ANALYTICS_ENABLED = false;

/**
 * Track an analytics event
 * 
 * TODO: To wire your analytics service:
 * 1. Set ANALYTICS_ENABLED to true
 * 2. Import your analytics library (Plausible, GA4, etc.)
 * 3. Replace the console.log with actual tracking code
 * 
 * Example for Plausible:
 *   window.plausible?.(event, { props: properties })
 * 
 * Example for GA4:
 *   gtag('event', event, properties)
 */
export function trackEvent(event: AnalyticsEvent, properties?: Record<string, string | number | boolean>): void {
  const payload: AnalyticsPayload = {
    event,
    properties,
    timestamp: Date.now(),
  };

  if (ANALYTICS_ENABLED) {
    // === WIRE YOUR ANALYTICS HERE ===
    // Example: window.plausible?.(event, { props: properties })
    // Example: gtag('event', event, properties)
    console.log('[Analytics]', payload);
  } else {
    // Development mode: log to console
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics - DEV]', payload);
    }
  }
}

/**
 * Track a CTA click specifically
 * This is the most important conversion event
 */
export function trackCTAClick(location: string, variant: string = 'default'): void {
  trackEvent('cta_click', {
    location,
    variant,
    url: 'https://a.co/d/h9ehTip',
  });
}

/**
 * Track secondary CTA (sample/read more) clicks
 */
export function trackSecondaryCTAClick(location: string): void {
  trackEvent('secondary_cta_click', {
    location,
    destination: '/sample',
  });
}

/**
 * Track scroll depth milestones
 */
export function trackScrollDepth(depth: number): void {
  trackEvent('scroll_depth', {
    depth_percent: depth,
  });
}

/**
 * Track exit intent modal interactions
 */
export function trackExitIntent(action: 'shown' | 'dismissed' | 'submitted'): void {
  trackEvent('exit_intent_shown', {
    action,
  });
}

/**
 * Track email capture interactions
 */
export function trackEmailCapture(action: 'open' | 'submit' | 'success' | 'error'): void {
  trackEvent(`email_capture_${action}` as AnalyticsEvent, {
    timestamp: Date.now(),
  });
}

/**
 * Track share button clicks
 */
export function trackShare(platform: string): void {
  trackEvent('share_click', {
    platform,
  });
}

/**
 * Track copy link action
 */
export function trackCopyLink(): void {
  trackEvent('copy_link');
}

/**
 * Track FAQ accordion interactions
 */
export function trackFAQExpand(questionIndex: number): void {
  trackEvent('faq_expand', {
    question_index: questionIndex,
  });
}

/**
 * Track sample page views
 */
export function trackSamplePageView(): void {
  trackEvent('sample_page_view');
}

/**
 * Initialize analytics
 * Call this in your layout or app initialization
 */
export function initAnalytics(): void {
  if (ANALYTICS_ENABLED) {
    // === INITIALIZE YOUR ANALYTICS HERE ===
    // Example: Load Plausible script
    // Example: Initialize GA4
    console.log('[Analytics] Initialized');
  }
}
