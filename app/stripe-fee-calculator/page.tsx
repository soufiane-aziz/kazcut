import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import StripeCalculator from '@/components/calculators/StripeCalculator';
import AdSenseSlot from '@/components/AdSenseSlot';

export const metadata: Metadata = {
  title: 'Stripe Fee Calculator (2026 Credit Card Processing Rates)',
  description:
    'Calculate Stripe credit card processing fees, international card surcharges, currency conversion costs, and dispute risk buffers.',
  alternates: {
    canonical: '/stripe-fee-calculator',
  },
  openGraph: {
    title: 'Stripe Fee Calculator | Kazcut',
    description:
      'Accurate Stripe credit card fee calculator with reverse invoice mode, international surcharges, and PDF export.',
    url: '/stripe-fee-calculator',
  },
};

export default function StripeFeePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Stripe Fee Calculator',
    description: 'Instant calculator for Stripe credit card transaction fees, international card markups, and chargebacks.',
    provider: {
      '@type': 'Organization',
      name: 'Kazcut',
    },
    feesAndCommissionsSpecification: 'Standard US domestic card processing: 2.9% + $0.30.',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Stripe standard processing fee in the United States?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Stripe charges 2.9% plus $0.30 per successful card charge for standard US domestic credit and debit cards.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the fees for international cards on Stripe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Stripe assesses an additional 1.5% surcharge for cards issued outside your home country. An extra 1.0% applies if currency conversion is required.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does a Stripe chargeback dispute cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Stripe charges a $15.00 dispute fee per chargeback. If the customer bank rules in your favor, this $15 fee is returned.',
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
        <AdSenseSlot slotId="stripe-top-banner" format="horizontal" minHeight={90} />
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-[#6E5D54]">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-[#2C221E] font-medium">Stripe Fee Calculator</span>
        </div>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#2C221E] sm:text-4xl">
          Stripe Fee Calculator
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#6E5D54]">
          Calculate Stripe payment processing deductions, cross-border card surcharges, currency conversion fees, and net bank payouts.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-medium text-[#6E5D54]">Regional Rates:</span>
          <Link
            href="/stripe-fee-calculator/in-usa"
            className="rounded border border-[#EFEAD8] bg-white px-2.5 py-1 text-[#2C221E] hover:border-[#C58842]"
          >
            United States (USD)
          </Link>
          <Link
            href="/stripe-fee-calculator/in-uk"
            className="rounded border border-[#EFEAD8] bg-white px-2.5 py-1 text-[#2C221E] hover:border-[#C58842]"
          >
            United Kingdom (GBP)
          </Link>
          <Link
            href="/stripe-fee-calculator/in-canada"
            className="rounded border border-[#EFEAD8] bg-white px-2.5 py-1 text-[#2C221E] hover:border-[#C58842]"
          >
            Canada (CAD)
          </Link>
        </div>
      </div>

      <StripeCalculator />

      <div className="mt-12">
        <AdSenseSlot slotId="stripe-bottom-banner" format="horizontal" minHeight={90} />
      </div>

      {/* Guide section */}
      <section className="mt-14 rounded-xl border border-[#EFEAD8] bg-white p-6 sm:p-8">
        <h2 className="text-base font-semibold text-[#2C221E]">
          Stripe Interchange Mechanics & Fee Structures
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 text-xs leading-relaxed text-[#6E5D54]">
          <div className="space-y-4">
            <h3 className="font-semibold text-[#2C221E]">Domestic vs. International Transactions</h3>
            <p>
              Domestic US transactions process at <strong>2.9% + $0.30</strong>. When a buyer uses a credit card issued outside the merchant’s account country, Stripe assesses an international card fee of <strong>+1.5%</strong>, raising the percentage fee to <strong>4.4%</strong>.
            </p>
            <h3 className="font-semibold text-[#2C221E]">Currency Conversion Fee</h3>
            <p>
              If your bank account settles in USD but the transaction is charged in EUR, GBP, or another foreign currency, Stripe applies an additional <strong>1.0%</strong> currency conversion fee.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-[#2C221E]">Volume Custom Pricing</h3>
            <p>
              Merchants processing over $80,000 monthly can request customized interchange-plus pricing from Stripe sales representatives to reduce effective processing costs down toward 2.0% - 2.4%.
            </p>
            <h3 className="font-semibold text-[#2C221E]">Chargeback Management</h3>
            <p>
              Each customer dispute triggers a mandatory $15 chargeback fee. Businesses with dispute rates exceeding 0.75% risk account reviews and mandatory reserve requirements.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

