// hooks/useVariant.ts
// Hook for A/B variant selection via query param and localStorage persistence

'use client';

import { useEffect, useState } from 'react';
import { HeadlineVariant } from '@/types';
import { getLocalStorage, setLocalStorage, getUrlParam } from '@/lib/utils';
import { siteConfig } from '@/site.config';

const STORAGE_KEY = 'tfmf_variant';

interface UseVariantReturn {
  variant: HeadlineVariant;
  setVariant: (variant: HeadlineVariant) => void;
}

/**
 * Hook to manage headline variant selection
 * 
 * Priority:
 * 1. URL query param (?v=1|2|3|4|5)
 * 2. localStorage (previously selected)
 * 3. Default from config
 * 
 * Usage:
 * const { variant } = useVariant();
 * const headline = copy.heroH1[`v${variant}`];
 */
export function useVariant(): UseVariantReturn {
  const [variant, setVariantState] = useState<HeadlineVariant>(siteConfig.content.defaultVariant);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isInitialized) return;

    // Check URL param first
    const urlVariant = getUrlParam('v');
    if (urlVariant && /^[1-5]$/.test(urlVariant)) {
      const parsedVariant = parseInt(urlVariant, 10) as HeadlineVariant;
      setVariantState(parsedVariant);
      setLocalStorage(STORAGE_KEY, parsedVariant);
      setIsInitialized(true);
      return;
    }

    // Fall back to localStorage
    const storedVariant = getLocalStorage<HeadlineVariant | null>(STORAGE_KEY, null);
    if (storedVariant && [1, 2, 3, 4, 5].includes(storedVariant)) {
      setVariantState(storedVariant);
    }

    setIsInitialized(true);
  }, [isInitialized]);

  const setVariant = (newVariant: HeadlineVariant) => {
    setVariantState(newVariant);
    setLocalStorage(STORAGE_KEY, newVariant);
  };

  return { variant, setVariant };
}

/**
 * Get copy based on current variant
 * Helper function to select the right variant from copy objects
 */
export function getVariantCopy<T extends Record<string, string>>(
  copyVariants: T,
  variant: HeadlineVariant
): string {
  const key = `v${variant}` as keyof T;
  return copyVariants[key] || copyVariants.v1;
}
