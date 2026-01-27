// hooks/useScrollDepth.ts
// Hook for tracking scroll depth and triggering CTA pulse

'use client';

import { useEffect, useRef, useCallback } from 'react';
import { trackScrollDepth } from '@/lib/analytics';
import { throttle } from '@/lib/utils';

interface UseScrollDepthOptions {
  threshold?: number; // Percentage (0-100) to trigger
  onThresholdReached?: () => void;
  trackAnalytics?: boolean;
}

interface UseScrollDepthReturn {
  hasReachedThreshold: React.MutableRefObject<boolean>;
  reset: () => void;
}

/**
 * Hook to track scroll depth and trigger callbacks
 * 
 * Usage:
 * const { hasReachedThreshold, reset } = useScrollDepth({
 *   threshold: 35,
 *   onThresholdReached: () => setShowPulse(true),
 * });
 */
export function useScrollDepth(options: UseScrollDepthOptions = {}): UseScrollDepthReturn {
  const {
    threshold = 35,
    onThresholdReached,
    trackAnalytics = true,
  } = options;

  const hasReachedThreshold = useRef(false);
  const trackedMilestones = useRef<Set<number>>(new Set());

  const calculateScrollDepth = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (docHeight === 0) return 0;
    
    return Math.round((scrollTop / docHeight) * 100);
  }, []);

  const handleScroll = useCallback(
    throttle(() => {
      const depth = calculateScrollDepth();

      // Track milestone depths for analytics
      if (trackAnalytics) {
        const milestones = [25, 50, 75, 90];
        milestones.forEach((milestone) => {
          if (depth >= milestone && !trackedMilestones.current.has(milestone)) {
            trackedMilestones.current.add(milestone);
            trackScrollDepth(milestone);
          }
        });
      }

      // Check threshold
      if (depth >= threshold && !hasReachedThreshold.current) {
        hasReachedThreshold.current = true;
        onThresholdReached?.();
      }
    }, 200),
    [threshold, onThresholdReached, trackAnalytics, calculateScrollDepth]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const reset = useCallback(() => {
    hasReachedThreshold.current = false;
    trackedMilestones.current.clear();
  }, []);

  return { hasReachedThreshold, reset };
}
