// site.config.ts
// Central configuration for The Forms Must Flow landing page
// Edit this file to customize the site

export const siteConfig = {
  // Book Information
  bookTitle: "The Forms Must Flow",
  authorName: "Jeffrey A. Zyjeski",
  amazonUrl: "https://a.co/d/h9ehTip",
  
  // Site Metadata
  siteUrl: "https://www.theformsmustflow.online",
  siteName: "The Forms Must Flow",
  
  // Theme Colors - Extracted from cover art
  // Primary: Deep bureaucratic blue
  // Secondary: Warm stamp beige
  // Accent: Magenta form pink
  // Metallic: Alien silver
  colors: {
    primary: {
      50: '#f0f4f8',
      100: '#d9e2ec',
      200: '#bcccdc',
      300: '#9fb3c8',
      400: '#829ab1',
      500: '#627d98',
      600: '#486581',
      700: '#334e68',
      800: '#243b53',
      900: '#102a43',
      950: '#061523',
    },
    secondary: {
      50: '#fdf8f3',
      100: '#f9e9d8',
      200: '#f0d2b3',
      300: '#e6b88a',
      400: '#d99c66',
      500: '#c97f47',
      600: '#a66336',
      700: '#7d4a2a',
      800: '#54321e',
      900: '#2e1b11',
      950: '#1a0f09',
    },
    accent: {
      50: '#fdf2f8',
      100: '#fce7f3',
      200: '#fbcfe8',
      300: '#f9a8d4',
      400: '#f472b6',
      500: '#ec4899',
      600: '#db2777',
      700: '#be185d',
      800: '#9d174d',
      900: '#831843',
      950: '#500724',
    },
    metallic: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    },
  },
  
  // Feature Flags
  // Toggle features on/off without code changes
  features: {
    emailCapture: false,      // Enable email signup modal
    pressKit: false,          // Show press kit link
    sampleRoute: true,        // Enable /sample page
    exitIntent: true,         // Enable exit-intent modal (only if emailCapture is true)
    scrollPulse: true,        // Enable mobile CTA pulse on scroll
    shareBar: true,           // Show social sharing buttons
  },
  
  // Analytics Configuration (stub - wire your own)
  analytics: {
    enabled: false,
    plausibleDomain: '',      // e.g., 'theformsmustflow.com'
    gaMeasurementId: '',      // e.g., 'G-XXXXXXXXXX'
  },
  
  // Email Capture Settings (for when emailCapture is enabled)
  emailCapture: {
    headline: "Get the Link Sent to Your Inbox",
    subheadline: "No spam. Just the book link and occasional updates.",
    placeholder: "Enter your email",
    buttonText: "Send Me the Link",
    successMessage: "Check your inbox!",
    // TODO: Add your email service integration in components/EmailCapture.tsx
  },
  
  // Share Configuration
  share: {
    twitterHandle: '',        // @yourhandle (optional)
    defaultMessage: "Just discovered 'The Forms Must Flow' — satirical sci-fi about bureaucracy vs. alien invasion. Check it out:",
  },
  
  // Images
  images: {
    cover: '/images/cover.jpg',
    coverAlt: 'The Forms Must Flow book cover - an alien bureaucrat faces a government stamp',
    ogImage: '/images/og.jpg', // 1200x630 recommended
  },
  
  // Content Settings
  content: {
    defaultVariant: 1,        // Default headline variant (1-5)
    sampleWordCount: 850,     // Word count for reading time estimate
  },
} as const;

export type SiteConfig = typeof siteConfig;
