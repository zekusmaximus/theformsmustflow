// types/index.ts
// TypeScript type definitions

export interface ValueProp {
  headline: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CopyVariant {
  v1: string;
  v2: string;
  v3: string;
  v4?: string;
  v5?: string;
}

export interface CopyVariants {
  heroH1: CopyVariant;
  heroSubhead: CopyVariant;
  primaryCTA: CopyVariant;
  secondaryCTA: CopyVariant;
  shortBlurb: { v1: string; v2: string; v3: string };
  longBlurb: { v1: string; v2: string };
  compTitles: string[];
  valueProps: ValueProp[];
  faq: FAQItem[];
  teaser: { v1: string; v2: string };
  authorBio: { short: string; long: string };
  microcopy: Record<string, string>;
  metadata: {
    seoTitle: { v1: string; v2: string; v3: string };
    metaDescription: { v1: string; v2: string; v3: string };
    openGraph: { title: { v1: string; v2: string }; description: { v1: string; v2: string } };
    twitterCard: { title: { v1: string; v2: string }; description: { v1: string; v2: string } };
  };
  ui: Record<string, string>;
}

export type HeadlineVariant = 1 | 2 | 3 | 4 | 5;

export interface FeatureFlags {
  emailCapture: boolean;
  pressKit: boolean;
  sampleRoute: boolean;
  exitIntent: boolean;
  scrollPulse: boolean;
  shareBar: boolean;
}

export interface SiteConfig {
  bookTitle: string;
  authorName: string;
  amazonUrl: string;
  siteUrl: string;
  siteName: string;
  colors: {
    primary: Record<string, string>;
    secondary: Record<string, string>;
    accent: Record<string, string>;
    metallic: Record<string, string>;
  };
  features: FeatureFlags;
  analytics: {
    enabled: boolean;
    plausibleDomain: string;
    gaMeasurementId: string;
  };
  emailCapture: {
    headline: string;
    subheadline: string;
    placeholder: string;
    buttonText: string;
    successMessage: string;
  };
  share: {
    twitterHandle: string;
    defaultMessage: string;
  };
  images: {
    cover: string;
    coverAlt: string;
    ogImage: string;
  };
  content: {
    defaultVariant: HeadlineVariant;
    sampleWordCount: number;
  };
}

// Analytics event types
export type AnalyticsEvent = 
  | 'cta_click'
  | 'secondary_cta_click'
  | 'scroll_depth'
  | 'exit_intent_shown'
  | 'email_capture_open'
  | 'email_capture_submit'
  | 'email_capture_success'
  | 'share_click'
  | 'copy_link'
  | 'faq_expand'
  | 'sample_page_view';

export interface AnalyticsPayload {
  event: AnalyticsEvent;
  properties?: Record<string, string | number | boolean>;
  timestamp?: number;
}
