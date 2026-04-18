# Banya Lab

Marketing site + booking flow for Banya Lab (Oʻahu): Ukrainian banya on the ocean, retreats, healing work.

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS v4**
- **Stripe Checkout** (via `/api/checkout` + webhook stub at `/api/stripe-webhook`)
- **Calendly** embed (`NEXT_PUBLIC_CALENDLY_URL`)

## Structure

```
src/
  app/
    page.tsx                   → main landing (all services)
    retreats/page.tsx          → separate retreats landing with custom flow
    book/[serviceId]/page.tsx  → per-service booking with live add-on pricing
    api/checkout/route.ts      → Stripe Checkout session creation
    api/stripe-webhook/route.ts → webhook handler (fill in after Stripe setup)
    success/page.tsx · cancel/page.tsx
  components/
    Nav · Footer · ServiceCard · BookingForm · RetreatForm · CalendlyEmbed
    ui/Button.tsx
  lib/
    services.ts                → SINGLE SOURCE OF TRUTH for services, prices, add-ons
    stripe.ts · cn.ts · format.ts
public/media/                  → drop photos/videos here (see README inside)
```

## Setup

```bash
npm install
cp .env.example .env.local     # fill in Stripe + Calendly keys
npm run dev
```

Open http://localhost:3000.

## Editing services & prices

All services, variants, add-ons, and retreat config live in `src/lib/services.ts`. Change a price, add an add-on, remove a service — it propagates to all pages.

## Retreat referral links

Share `https://yoursite.com/retreats?ref=maksim` — the `ref` param is captured, shown in the UI as "booking through <host>", and passed to Stripe session metadata. 80/20 payout handled manually for now.

## Media

Placeholder SVGs are in `public/media/*/hero.svg`. Drop real images with the same path/name, or update the `hero` field in `src/lib/services.ts`.

## Stripe

1. Set `STRIPE_SECRET_KEY` in `.env.local`.
2. For webhooks locally: `stripe listen --forward-to localhost:3000/api/stripe-webhook` → copy the webhook secret to `STRIPE_WEBHOOK_SECRET`.
3. In production, register the webhook endpoint in Stripe Dashboard.

## Deploy

Push to GitHub → import to Vercel → set env vars → ship.
