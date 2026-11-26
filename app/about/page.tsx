import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Calculator, RefreshCw, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Kazcut & Fee Calculation Methodology (2026)',
  description:
    'Learn how Kazcut verifies 2026 PayPal, Stripe, Etsy, Amazon FBA, and Shopify fee schedules, reverse invoice formulas, and client-side privacy standards.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2 text-xs text-[#6E5D54]">
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <span className="font-medium text-[#2C221E]">About &amp; Methodology</span>
      </div>

      <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#2C221E] sm:text-4xl">
        About Kazcut &amp; Fee Methodology
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-[#6E5D54]">
        Kazcut is an independent financial calculation platform built for online sellers, e-commerce founders, and freelancers who need transparent net-payout and break-even numbers before sending an invoice or pricing a product.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[#E7DFCC] bg-white p-5 box-card">
          <Calculator className="h-5 w-5 text-[#C58842]" />
          <h2 className="mt-3 text-sm font-semibold text-[#2C221E]">Two-Way Math</h2>
          <p className="mt-1.5 text-xs leading-relaxed text-[#6E5D54]">
            Forward fee deductions plus reverse net-inversion formulas so you know the exact gross invoice needed to take home your target payout.
          </p>
        </div>

        <div className="rounded-xl border border-[#E7DFCC] bg-white p-5 box-card">
          <RefreshCw className="h-5 w-5 text-[#C58842]" />
          <h2 className="mt-3 text-sm font-semibold text-[#2C221E]">2026 Rate Calibration</h2>
          <p className="mt-1.5 text-xs leading-relaxed text-[#6E5D54]">
            Baseline percentage tiers, fixed transaction fees, and fulfillment schedules are calibrated against published 2026 platform fee documentation.
          </p>
        </div>

        <div className="rounded-xl border border-[#E7DFCC] bg-white p-5 box-card">
          <ShieldCheck className="h-5 w-5 text-[#C58842]" />
          <h2 className="mt-3 text-sm font-semibold text-[#2C221E]">100% Client-Side</h2>
          <p className="mt-1.5 text-xs leading-relaxed text-[#6E5D54]">
            All inputs and calculation results execute inside your browser thread. Kazcut does not store or transmit your sales figures to remote servers.
          </p>
        </div>
      </div>

      <section className="mt-8 space-y-5 rounded-xl border border-[#E7DFCC] bg-white p-6 sm:p-8 text-xs leading-relaxed text-[#6E5D54] box-card">
        <div>
          <h2 className="text-base font-semibold text-[#2C221E]">How Reverse Fee Inversion Works</h2>
          <p className="mt-2">
            When a processor charges a percentage rate <em>r</em> plus a fixed fee <em>f</em>, simply adding <em>r</em>% on top of your target payout leaves you short because the processor charges a percentage on the larger gross total. Kazcut solves the exact algebraic inverse:
          </p>
          <p className="mt-3 rounded-md bg-[#FAF5EE] px-4 py-2.5 font-mono text-[11px] text-[#2C221E]">
            Required Gross Invoice = (Target Net Payout + Fixed Fee) / (1 - Percentage Rate)
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-[#2C221E]">Platform Schedules Covered</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>
              <Link href="/paypal-fee-calculator" className="font-medium text-[#2C221E] hover:text-[#C58842] underline">
                PayPal Fee Calculator
              </Link>{' '}
              — Standard commercial (2.99% + $0.49), invoicing (3.49% + $0.49), international (+1.50%), micropayments, and QR rates across USD, GBP, EUR, CAD, AUD, and JPY.
            </li>
            <li>
              <Link href="/stripe-fee-calculator" className="font-medium text-[#2C221E] hover:text-[#C58842] underline">
                Stripe Fee Calculator
              </Link>{' '}
              — Domestic card processing (2.9% + $0.30), international card surcharges (+1.5%), currency conversion (+1.0%), and $15 chargeback dispute modeling.
            </li>
            <li>
              <Link href="/etsy-fee-calculator" className="font-medium text-[#2C221E] hover:text-[#C58842] underline">
                Etsy Seller Fee Calculator
              </Link>{' '}
              — $0.20 listing fee, 6.5% transaction fee on item + shipping, Etsy Payments processing, and 12%/15% Offsite Ads fees.
            </li>
            <li>
              <Link href="/amazon-fba-calculator" className="font-medium text-[#2C221E] hover:text-[#C58842] underline">
                Amazon FBA Calculator
              </Link>{' '}
              — Category referral commissions, size-tier fulfillment fees, landed freight COGS, and standard vs. Q4 peak monthly storage.
            </li>
            <li>
              <Link href="/shopify-profit-calculator" className="font-medium text-[#2C221E] hover:text-[#C58842] underline">
                Shopify Profit Margin Calculator
              </Link>{' '}
              — Plan-tiered Shopify Payments rates (2.5%–2.9% + 30¢), blended shipping, and Break-Even Customer Acquisition Cost (CAC).
            </li>
            <li>
              <Link href="/freelance-hourly-rate-calculator" className="font-medium text-[#2C221E] hover:text-[#C58842] underline">
                Freelance Hourly Rate Calculator
              </Link>{' '}
              — Tax-adjusted gross target, non-billable administrative ratio, PTO weeks, overhead expenses, and day-rate conversion.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-semibold text-[#2C221E]">Feedback &amp; Corrections</h2>
          <p className="mt-2">
            Spot a regional rate update or want to suggest a new marketplace tier? Open an issue or pull request on the public repository:
          </p>
          <a
            href="https://github.com/soufiane-aziz/kazcut"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 font-medium text-[#C58842] hover:underline"
          >
            <span>github.com/soufiane-aziz/kazcut</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </section>
    </div>
  );
}

