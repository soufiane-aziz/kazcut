import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PaypalCalculator from '@/components/calculators/PaypalCalculator';
import AdSenseSlot from '@/components/AdSenseSlot';
import CalculatorLinksBar from '@/components/CalculatorLinksBar';
import FeeCheatSheet from '@/components/FeeCheatSheet';
import RelatedCalculatorsGrid from '@/components/RelatedCalculatorsGrid';

export const metadata: Metadata = {
  title: 'PayPal Fee Calculator 2026 — Merchant & Invoice',
  description:
    'Free PayPal fee calculator for domestic, international, and invoice transactions. Calculate net payout or the exact amount to invoice to net your target.',
  alternates: {
    canonical: '/paypal-fee-calculator',
  },
  openGraph: {
    title: 'PayPal Fee Calculator | Kazcut',
    description:
      'Calculate domestic and international PayPal fees, net bank payout, and required invoice amounts with instant PDF summary export.',
    url: '/paypal-fee-calculator',
  },
};

export default function PaypalFeePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'PayPal Fee Calculator',
    description: 'Instant calculator for PayPal domestic, international, and invoicing transaction fees.',
    provider: {
      '@type': 'Organization',
      name: 'Kazcut',
    },
    feesAndCommissionsSpecification: 'Standard US domestic commercial: 2.99% + $0.49 fixed fee.',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the standard PayPal fee for goods and services in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The standard domestic fee for receiving commercial payments on PayPal US is 2.99% plus a $0.49 fixed fee per transaction.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I calculate how much to invoice so I receive an exact amount?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To net an exact target amount, use the reverse formula: Required Invoice = (Desired Net + Fixed Fee) / (1 - Percentage Rate). For example, to net $100 at 2.99% + $0.49, invoice $103.59.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much are PayPal international transaction fees?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'International payments incur an additional cross-border fee (typically 1.50%), bringing the rate to 4.49% plus the applicable fixed fee for the currency received.',
        },
      },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Top Banner AdSense Slot */}
      <div className="mb-6">
        <AdSenseSlot slotId="paypal-top-banner" format="horizontal" minHeight={90} />
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-[#6E5D54]">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-[#2C221E] font-medium">PayPal Fee Calculator</span>
        </div>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#2C221E] sm:text-4xl">
          PayPal Fee Calculator
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#6E5D54]">
          Calculate PayPal seller fees, invoicing deductions, and net bank deposits. Use reverse mode to calculate the exact invoice total required to net your target amount.
        </p>

        {/* Regional & Specialized Guides */}
        <CalculatorLinksBar
          calculatorSlug="paypal-fee-calculator"
          label="Regional &amp; Fee Guides:"
        />
      </div>

      {/* Calculator Component */}
      <PaypalCalculator />

      {/* Pre-Computed Reference Table */}
      <FeeCheatSheet calculatorSlug="paypal-fee-calculator" />

      {/* Below Action AdSense Slot */}
      <div className="mt-12">
        <AdSenseSlot slotId="paypal-bottom-banner" format="horizontal" minHeight={90} />
      </div>

      {/* Knowledge Base & FAQs */}
      <section className="mt-14 rounded-xl border border-[#E7DFCC] bg-white p-6 sm:p-8 box-card">
        <h2 className="text-base font-semibold text-[#2C221E]">
          PayPal Processing Fee Schedules & Calculation Rules
        </h2>
        
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4 text-xs leading-relaxed text-[#6E5D54]">
            <h3 className="font-semibold text-[#2C221E]">Domestic Commercial Transactions</h3>
            <p>
              Under PayPal current fee schedule, standard US domestic commercial transactions incur a rate of <strong>2.99% + $0.49 USD</strong>. This rate applies when selling products or services via standard PayPal checkout or online payment links.
            </p>
            <h3 className="font-semibold text-[#2C221E]">Invoicing and Payment Requests</h3>
            <p>
              Invoices generated directly within the PayPal merchant portal carry a slightly higher rate of <strong>3.49% + $0.49 USD</strong> due to payment processing and collection facilitation services.
            </p>
          </div>

          <div className="space-y-4 text-xs leading-relaxed text-[#6E5D54]">
            <h3 className="font-semibold text-[#2C221E]">Cross-Border & International Surcharges</h3>
            <p>
              Receiving payments originating from non-US accounts adds a 1.50% cross-border fee. For a commercial transaction, this yields an effective rate of <strong>4.49% + fixed currency fee</strong>. If currency exchange is required, PayPal applies an internal spread of 3.0% to 4.0% above wholesale rates.
            </p>
            <h3 className="font-semibold text-[#2C221E]">Reverse Calculation Formula</h3>
            <p className="font-mono bg-[#FAF5EE] p-2.5 rounded-md text-[11px] text-[#2C221E]">
              Required Invoice = (Desired Net + Fixed Fee) / (1 - Rate)
            </p>
          </div>
        </div>
      </section>

      <RelatedCalculatorsGrid currentSlug="paypal-fee-calculator" />
    </div>
  );
}

