import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Use & Financial Disclaimer',
  description:
    'Kazcut Terms of Use and financial estimation disclaimer for merchant fee and profit margin calculators.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2 text-xs text-[#6E5D54]">
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <span className="font-medium text-[#2C221E]">Terms of Use</span>
      </div>

      <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#2C221E] sm:text-4xl">
        Terms of Use &amp; Financial Disclaimer
      </h1>
      <p className="mt-2 text-xs text-[#9B8C83]">Last updated: November 2026</p>

      <div className="mt-8 space-y-6 rounded-xl border border-[#E7DFCC] bg-white p-6 sm:p-8 text-xs leading-relaxed text-[#6E5D54] box-card">
        <section>
          <h2 className="text-sm font-semibold text-[#2C221E]">1. Informational &amp; Estimation Purpose Only</h2>
          <p className="mt-2">
            Kazcut calculators are provided for informational, budgeting, and estimation purposes only. They do not constitute financial, tax, accounting, or legal advice.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-[#2C221E]">2. Fee Accuracy &amp; Account-Specific Rates</h2>
          <p className="mt-2">
            Payment processors and marketplaces (including PayPal, Stripe, Etsy, Amazon, and Shopify) update fee schedules periodically and may apply custom volume discounts, regional taxes, currency spreads, or reserve holds specific to your merchant account. Always verify exact fee deductions inside your official merchant dashboard before finalizing financial commitments.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-[#2C221E]">3. Independent Utility Brand</h2>
          <p className="mt-2">
            Kazcut is an independent financial calculator platform and is not affiliated with, endorsed by, or sponsored by PayPal, Stripe, Etsy, Amazon, Shopify, or CapCut. All third-party trademarks belong to their respective owners and are used solely to identify supported fee schedules.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-[#2C221E]">4. Limitation of Liability</h2>
          <p className="mt-2">
            Kazcut is provided &ldquo;as is&rdquo; without warranties of any kind. We are not liable for pricing errors, tax miscalculations, or business losses resulting from reliance on calculator outputs.
          </p>
        </section>
      </div>
    </div>
  );
}

