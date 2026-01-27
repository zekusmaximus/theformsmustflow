// hooks/useExitIntent.ts
// Hook for detecting exit intent (desktop only)

'use client';

import { useEffect, useRef, useCallback } from 'react';
import { trackExitIntent } from '@/lib/analytics';

interface UseExitIntentOptions {
  enabled?: boolean;
  cooldown?: number; // Cooldown in milliseconds
  onExitIntent?: () => void;
}

interface UseExitIntentReturn {
  hasTriggered: React.MutableRefObject<boolean>;
  reset: () => void;
}

/**
 * Hook to detect exit intent on desktop
 * Triggers when mouse leaves the viewport toward the top (address bar)
 * 
 * Note: This only works on desktop. Mobile exit intent is not reliably detectable.
 * 
 * Usage:
 * const { hasTriggered, reset } = useExitIntent({
 *   enabled: features.exitIntent && features.emailCapture,
 *   onExitIntent: () => setShowModal(true),
 * });
 */
export function useExitIntent(options: UseExitIntentOptions = {}): UseExitIntentReturn {
  const {
    enabled = true,
    cooldown = 60000, // 1 minute cooldown
    onExitIntent,
  } = options;

  const hasTriggered = useRef(false);
  const lastTriggerTime = useRef<number>(0);

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      // Only trigger if mouse leaves toward the top (address bar area)
      if (e.clientY > 20) return;

      // Check cooldown
      const now = Date.now();
      if (now - lastTriggerTime.current < cooldown) return;

      // Check if already triggered
      if (hasTriggered.current) return;

      // Don't trigger if user is interacting with form elements
      const target = e.relatedTarget as HTMLElement;
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA') return;

      hasTriggered.current = true;
      lastTriggerTime.current = now;
      
      trackExitIntent('shown');
      onExitIntent?.();
    },
    [cooldown, onExitIntent]
  );

  useEffect(() => {
    // Only enable on desktop (check for touch support)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!enabled || isTouchDevice) return;

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled, handleMouseLeave]);

  const reset = useCallback(() => {
    hasTriggered.current = false;
  }, []);

  return { hasTriggered, reset };
}

/**
 * Check if device is mobile/touch
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}
