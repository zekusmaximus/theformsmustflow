// hooks/useCTAPulse.ts
// Hook for managing CTA pulse animation on scroll

'use client';

import { useState, useCallback } from 'react';
import { useScrollDepth } from './useScrollDepth';

interface UseCTAPulseOptions {
  threshold?: number;
  pulseOnce?: boolean;
}

interface UseCTAPulseReturn {
  shouldPulse: boolean;
  stopPulse: () => void;
  resetPulse: () => void;
}

/**
 * Hook to manage CTA pulse animation
 * Pulses when user scrolls past threshold and hasn't clicked CTA
 * 
 * Usage:
 * const { shouldPulse, stopPulse } = useCTAPulse({ threshold: 35 });
 * 
 * // In component:
 * <button className={shouldPulse ? 'animate-pulse' : ''} onClick={() => { stopPulse(); handleCTA(); }}>
 */
export function useCTAPulse(options: UseCTAPulseOptions = {}): UseCTAPulseReturn {
  const { threshold = 35, pulseOnce = true } = options;
  
  const [shouldPulse, setShouldPulse] = useState(false);
  const [hasPulsed, setHasPulsed] = useState(false);

  const handleThresholdReached = useCallback(() => {
    if (pulseOnce && hasPulsed) return;
    
    setShouldPulse(true);
    setHasPulsed(true);

    // Auto-stop pulse after 3 seconds
    setTimeout(() => {
      setShouldPulse(false);
    }, 3000);
  }, [pulseOnce, hasPulsed]);

  const { reset } = useScrollDepth({
    threshold,
    onThresholdReached: handleThresholdReached,
    trackAnalytics: false,
  });

  const stopPulse = useCallback(() => {
    setShouldPulse(false);
  }, []);

  const resetPulse = useCallback(() => {
    setShouldPulse(false);
    setHasPulsed(false);
    reset();
  }, [reset]);

  return { shouldPulse, stopPulse, resetPulse };
}
