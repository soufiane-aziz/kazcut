# Kazcut — Free E-Commerce & Freelancer Fee / Profit Calculators (2026)

Live app: **[https://kazcut.vercel.app](https://kazcut.vercel.app)**

Kazcut is an open-source, 100% client-side financial calculator suite built with Next.js, TypeScript, and Tailwind CSS. It helps merchants, marketplace sellers, and freelancers calculate exact transaction deductions, net take-home payouts, break-even ad spend (CAC), and reverse-invoice totals without signups or server-side data storage.

## Included Calculators

- **[PayPal Fee Calculator](https://kazcut.vercel.app/paypal-fee-calculator)** — Standard commercial (`2.99% + $0.49`), invoicing (`3.49% + $0.49`), international cross-border fees, Friends & Family vs. Goods & Services, and reverse-invoice math.
- **[Stripe Fee Calculator](https://kazcut.vercel.app/stripe-fee-calculator)** — Domestic card processing (`2.9% + $0.30`), international card markups (`+1.5%`), currency conversion (`+1.0%`), and chargeback dispute modeling.
- **[Etsy Seller Fee Calculator](https://kazcut.vercel.app/etsy-fee-calculator)** — `$0.20` listing fee, `6.5%` transaction fee on item + shipping, Etsy Payments processing, and `12%` / `15%` Offsite Ads fee modeling.
- **[Amazon FBA Calculator](https://kazcut.vercel.app/amazon-fba-calculator)** — Category referral commissions, size-tier fulfillment fees, landed shipping COGS, and off-peak vs. Q4 storage costs.
- **[Shopify Profit Margin Calculator](https://kazcut.vercel.app/shopify-profit-calculator)** — Plan-tiered Shopify Payments fees (`2.5%`–`2.9% + $0.30`), fulfillment costs, and Break-Even Customer Acquisition Cost (CAC).
- **[Freelance Hourly Rate Calculator](https://kazcut.vercel.app/freelance-hourly-rate-calculator)** — Tax-adjusted annual revenue targets, billable vs. non-billable time, overhead expenses, and day-rate conversion.

## Key Features

- **Two-Way Reverse Inversion:** Compute exact gross amounts to bill clients in order to net your exact target payout after fees.
- **Pre-Computed HTML Fee Reference Tables:** Fast-reference payout and fee tables across currencies (`USD`, `GBP`, `EUR`, `CAD`, `AUD`, `JPY`).
- **Privacy-First Client Execution:** Calculations run in-browser; no user financial numbers are stored on servers unless explicitly saved via optional template sharing.
- **Instant PDF Summary Export:** Client-side PDF breakdown generation via `jsPDF`.

## Local Development

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

See [`.env.example`](.env.example) for optional public configuration (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID`). Never commit `.env.local` or secret keys.

## License & Security

- Security reporting instructions: [`SECURITY.md`](SECURITY.md)
- Methodology & financial estimation disclaimer: [About](https://kazcut.vercel.app/about) · [Terms](https://kazcut.vercel.app/terms)
