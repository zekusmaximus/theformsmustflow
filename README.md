# The Forms Must Flow — Landing Page

A high-converting landing page for the satirical sci-fi novel *The Forms Must Flow* by Jeffrey A. Zyjeski.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# The static export will be in the `dist` folder
```

## Project Structure

```
forms-must-flow/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── sample/page.tsx    # Sample/teaser page
│   ├── thank-you/page.tsx # Thank you page
│   ├── layout.tsx         # Root layout with SEO
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Hero.tsx
│   ├── CTAButton.tsx
│   ├── CoverMock.tsx
│   ├── ValueProps.tsx
│   ├── Teaser.tsx
│   ├── FAQAccordion.tsx
│   ├── AuthorBio.tsx
│   ├── StickyHeaderCTA.tsx
│   ├── MobileStickyCTA.tsx
│   ├── ShareBar.tsx
│   ├── Footer.tsx
│   ├── EmailCapture.tsx
│   ├── ExitIntentModal.tsx
│   ├── FinalCTA.tsx
│   └── SocialProofPlaceholder.tsx
├── hooks/                 # Custom React hooks
│   ├── useVariant.ts
│   ├── useScrollDepth.ts
│   ├── useExitIntent.ts
│   └── useCTAPulse.ts
├── lib/                   # Utility functions
│   ├── analytics.ts       # Analytics stub
│   ├── seo.ts            # SEO metadata generation
│   └── utils.ts          # General utilities
├── types/                 # TypeScript types
├── public/images/         # Static images
├── site.config.ts         # Site configuration
├── copy.ts               # All copy variants
└── next.config.js        # Next.js configuration
```

## Configuration

Edit `site.config.ts` to customize:

- Book title, author name, Amazon URL
- Theme colors
- Feature flags (email capture, exit intent, etc.)
- Analytics settings

### Feature Flags

```typescript
features: {
  emailCapture: false,   // Enable email signup modal
  pressKit: false,       // Show press kit link
  sampleRoute: true,     // Enable /sample page
  exitIntent: true,      // Enable exit-intent modal
  scrollPulse: true,     // Enable mobile CTA pulse
  shareBar: true,        // Show social sharing
}
```

## Copy Variants

All copy is in `copy.ts` with multiple variants for A/B testing:

- 5 headline variants
- 5 subhead variants
- 5 CTA button variants
- 3 short blurbs
- 2 long blurbs

Select a variant via URL: `?v=1` through `?v=5`

## Analytics

Analytics are stubbed in `lib/analytics.ts`. To wire your service:

1. Set `ANALYTICS_ENABLED = true`
2. Add your tracking code in the `trackEvent` function
3. Supports Plausible, GA4, or any custom solution

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify

```bash
# Build
npm run build

# Deploy dist folder
drag and drop dist/ to Netlify
```

### Static Hosting

```bash
npm run build
# Upload contents of dist/ to your server
```

## Customization

### Swap Cover Image

Replace `public/images/cover.jpg` with your book cover.

### Update Colors

Edit the color palette in `tailwind.config.ts` and `site.config.ts`.

### Add Real Reviews

Replace `SocialProofPlaceholder` component with actual reviews when available.

### Connect Email Service

Edit `components/EmailCapture.tsx` and add your Mailchimp/ConvertKit integration.

## License

All rights reserved. This landing page is for the exclusive use of Jeffrey A. Zyjeski.
