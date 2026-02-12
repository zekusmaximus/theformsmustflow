# The Forms Must Flow - Landing Site

Marketing site for *The Forms Must Flow* by Jeffrey A. Zyjeski.

## Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS

## Requirements

- Node.js 18+
- npm

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev    # Start dev server
npm run build  # Production build
npm run start  # Run production server
npm run lint   # Next.js linting
```

## Routes

- `/` - main landing page
- `/sample` - sample/teaser page
- `/thank-you` - thank-you page used by email capture flow

## Current Landing Page Sections

1. Sticky header CTA (desktop)
2. Hero
3. Value props
4. Permit Desk mini-game
5. Teaser content
6. Testimonials
7. FAQ
8. Author bio
9. Final CTA
10. Share bar (feature-flagged)
11. Footer
12. Mobile sticky CTA
13. Exit-intent modal (feature-flagged and requires email capture)

## Configuration

### `site.config.ts`
Primary place for site settings:

- Book metadata (`bookTitle`, `authorName`, `amazonUrl`)
- Canonical site URL (`siteUrl`)
- Theme color tokens
- Feature flags
- Analytics placeholders
- Email capture text
- Share defaults
- Image paths
- Content defaults (including copy variant and sample word count)

### `copy.ts`
Centralized content copy and variant packs.

- Headline/subhead/CTA variants for A/B testing
- Long/short blurbs, FAQ, metadata text, UI labels
- Variant selection supports query parameter `?v=1` through `?v=5` and localStorage persistence

## Important Components and Modules

- `app/page.tsx` - main landing composition
- `components/PermitDeskGame.tsx` - interactive mini-game loaded client-side only
- `components/Testimonials.tsx` - social-proof section
- `lib/seo.ts` - metadata + JSON-LD schema generation
- `lib/analytics.ts` - analytics event interface (stubbed)
- `lib/forms.ts` and `src/lib/forms.ts` - form templates used by the mini-game (root file re-exports from `src/`)

## Assets and SEO Files

- `public/images/cover.jpg` - primary cover image
- `public/images/og.jpg` - social sharing image
- `public/sitemap.xml` - sitemap (currently includes `/` and `/sample`)

## Deployment Notes

- Build output is Next.js standard output (`.next/`) for `npm run build` + `npm run start`.
- `next.config.js` uses:
  - `images.unoptimized = true`
  - `trailingSlash = true`
  - security headers
  - host redirect from `theformsmustflow.online` to `www.theformsmustflow.online`

If you need fully static hosting, add explicit static export configuration and a dedicated export flow before relying on `out/`.

## Known Cleanup Opportunities

- Some text contains mojibake characters in source files (for example smart quotes rendered incorrectly).
- `components/PermitDeskGame.tsx` and `lib/forms.ts` currently proxy to `src/*` implementations; consolidating to one location would reduce duplication.
- Analytics and email capture integrations are still placeholders.

## License

All rights reserved. For exclusive use by Jeffrey A. Zyjeski.

