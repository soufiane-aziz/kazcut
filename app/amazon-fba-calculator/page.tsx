import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import AmazonFbaCalculator from '@/components/calculators/AmazonFbaCalculator';
import AdSenseSlot from '@/components/AdSenseSlot';

export const metadata: Metadata = {
  title: 'Amazon FBA Profit & Fee Calculator (2026 Fulfillment Rates)',
  description:
    'Free Amazon FBA calculator. Calculate referral fees, FBA fulfillment tier costs, storage fees, and unit net profit margin.',
  alternates: {
    canonical: 'https://kazcut.vercel.app/amazon-fba-calculator',
  },
  openGraph: {
    title: 'Amazon FBA Profit & Fee Calculator | Kazcut',
    description:
      'Calculate Amazon FBA unit economics, pick and pack fulfillment costs, and net margin ROI with instant PDF export.',
    url: 'https://kazcut.vercel.app/amazon-fba-calculator',
  },
};

export default function AmazonFbaPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Amazon FBA Calculator',
    description: 'Calculate Amazon FBA fulfillment costs, category referral percentages, and unit ROI.',
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
        name: 'How much does Amazon FBA take per sale?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Amazon takes a referral fee (typically 15% across major consumer categories) plus an FBA fulfillment fee based on package size and shipping weight (ranging from $3.22 for small standard to $4.75+ for standard products).',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Amazon referral fee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The referral fee is a category-based commission Amazon charges for each item sold on the platform, ranging from 8% for consumer electronics to 15% for Home & Kitchen, Toys, and Apparel.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do monthly inventory storage fees impact Amazon profits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Amazon charges standard monthly storage fees (around $0.87 per cubic foot January-September, and $2.40 per cubic foot during peak Q4 October-December). Slow-moving inventory incurs aged inventory surcharges.',
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
        <AdSenseSlot slotId="amazon-top-banner" format="horizontal" minHeight={90} />
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-[#6E5D54]">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-[#2C221E] font-medium">Amazon FBA Calculator</span>
        </div>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#2C221E] sm:text-4xl">
          Amazon FBA Fee & Profit Calculator
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#6E5D54]">
          Determine unit economics, referral commissions, FBA pick and pack costs, and monthly net profitability for Amazon seller central merchants.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-medium text-[#6E5D54]">Regional Marketplaces:</span>
          <Link
            href="/amazon-fba-calculator/in-usa"
            className="rounded border border-[#EFEAD8] bg-white px-2.5 py-1 text-[#2C221E] hover:border-[#C58842]"
          >
            Amazon US (USD)
          </Link>
          <Link
            href="/amazon-fba-calculator/in-germany"
            className="rounded border border-[#EFEAD8] bg-white px-2.5 py-1 text-[#2C221E] hover:border-[#C58842]"
          >
            Amazon Germany / Pan-EU (EUR)
          </Link>
        </div>
      </div>

      <AmazonFbaCalculator />

      <div className="mt-12">
        <AdSenseSlot slotId="amazon-bottom-banner" format="horizontal" minHeight={90} />
      </div>

      <section className="mt-14 rounded-xl border border-[#EFEAD8] bg-white p-6 sm:p-8">
        <h2 className="text-base font-semibold text-[#2C221E]">
          Amazon FBA Fee Structure Guidelines
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 text-xs leading-relaxed text-[#6E5D54]">
          <div className="space-y-4">
            <h3 className="font-semibold text-[#2C221E]">Category Referral Commission</h3>
            <p>
              Amazon charges a percentage of the total sales price. The majority of categories charge <strong>15%</strong> (with minimum referral fees of $0.30), while electronics and appliances charge 8%.
            </p>
            <h3 className="font-semibold text-[#2C221E]">FBA Pick & Pack Fulfillment Rates</h3>
            <p>
              Fulfillment rates are calculated using package length, width, height, and unit shipping weight. Small standard items process at <strong>$3.22</strong>, while large standard tiers range from <strong>$3.86 to $4.75+</strong>.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-[#2C221E]">Inbound Transportation Allocation</h3>
            <p>
              Always amortize air/ocean freight and customs duties into the landed unit cost. Inbound shipping commonly adds $0.80 to $2.50 per unit depending on carton density.
            </p>
            <h3 className="font-semibold text-[#2C221E]">Storage & Aged Inventory</h3>
            <p>
              Maintaining high sell-through velocity prevents aged inventory surcharges. Inventory stored beyond 180 days incurs significant monthly penalties.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

