import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShopifyCalculator from '@/components/calculators/ShopifyCalculator';
import AdSenseSlot from '@/components/AdSenseSlot';
import CalculatorLinksBar from '@/components/CalculatorLinksBar';
import FeeCheatSheet from '@/components/FeeCheatSheet';
import RelatedCalculatorsGrid from '@/components/RelatedCalculatorsGrid';

export const metadata: Metadata = {
  title: 'Shopify Profit Margin & Fee Calculator (2026)',
  description:
    'Free Shopify profit margin calculator. Factor in COGS, ad spend CAC, fulfillment, and payment gateway fees to calculate net transaction profit.',
  alternates: {
    canonical: '/shopify-profit-calculator',
  },
  openGraph: {
    title: 'Shopify Profit Margin Calculator | Kazcut',
    description:
      'Calculate Shopify store margins, break-even CAC, gateway fees, and monthly net profit with instant PDF export.',
    url: '/shopify-profit-calculator',
  },
};

export default function ShopifyProfitPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Shopify Profit Margin Calculator',
    description: 'Calculate unit economics, ad spend CAC limits, and gateway transaction rates for Shopify stores.',
    provider: {
      '@type': 'Organization',
      name: 'Kazcut',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the payment processing fees on Shopify?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Using Shopify Payments, rates depend on your plan: Basic Shopify is 2.9% + 30¢, Shopify Plan is 2.7% + 30¢, and Advanced Shopify is 2.5% + 30¢.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Break-Even CAC?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Break-even CAC (Customer Acquisition Cost) is the maximum dollar amount you can spend to acquire an order before losing money on the transaction: Retail Price minus COGS minus Gateway Fees minus Shipping and Packaging.',
        },
      },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mb-6">
        <AdSenseSlot slotId="shopify-top-banner" format="horizontal" minHeight={90} />
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-[#6E5D54]">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-[#2C221E] font-medium">Shopify Profit Margin Calculator</span>
        </div>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#2C221E] sm:text-4xl">
          Shopify Profit Margin Calculator
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#6E5D54]">
          Analyze unit economics for direct-to-consumer and dropshipping stores. Account for product manufacturing, shipping postage, paid advertising CAC, and Shopify Payments transaction rates.
        </p>

        <CalculatorLinksBar
          calculatorSlug="shopify-profit-calculator"
          label="Store &amp; CAC Guides:"
        />
      </div>

      <ShopifyCalculator />

      <FeeCheatSheet calculatorSlug="shopify-profit-calculator" />

      <div className="mt-12">
        <AdSenseSlot slotId="shopify-bottom-banner" format="horizontal" minHeight={90} />
      </div>

      <section className="mt-14 rounded-xl border border-[#E7DFCC] bg-white p-6 sm:p-8 box-card">
        <h2 className="text-base font-semibold text-[#2C221E]">
          Shopify Unit Economics & Margin Optimization
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 text-xs leading-relaxed text-[#6E5D54]">
          <div className="space-y-4">
            <h3 className="font-semibold text-[#2C221E]">Shopify Plan Gateway Tiers</h3>
            <p>
              As monthly revenue scales, upgrading plans delivers significant transaction savings. For example, moving from Basic (2.9% + 30¢) to Advanced (2.5% + 30¢) saves $400 in fees for every $100,000 in monthly sales volume.
            </p>
            <h3 className="font-semibold text-[#2C221E]">Managing Customer Acquisition Costs (CAC)</h3>
            <p>
              Tracking first-order CAC versus lifetime value (LTV) is critical. Stores relying on single-purchase transactions must maintain ad spend below their break-even threshold.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-[#2C221E]">Blended Shipping Economics</h3>
            <p>
              Offering free shipping increases conversion rates but compresses gross margins. Always model shipping costs as part of the total cost of goods sold.
            </p>
            <h3 className="font-semibold text-[#2C221E]">Operating Buffers</h3>
            <p>
              Reserve 2-5% of gross revenue for returns, chargebacks, and packaging damage to maintain realistic financial projections.
            </p>
          </div>
        </div>
      </section>

      <RelatedCalculatorsGrid currentSlug="shopify-profit-calculator" />
    </div>
  );
}

