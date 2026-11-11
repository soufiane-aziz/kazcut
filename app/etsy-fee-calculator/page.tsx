import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import EtsyCalculator from '@/components/calculators/EtsyCalculator';
import AdSenseSlot from '@/components/AdSenseSlot';

export const metadata: Metadata = {
  title: 'Etsy Seller Fee & Profit Calculator (2026 Listing & Transaction Rates)',
  description:
    'Free Etsy profit calculator. Factor in listing fees, 6.5% transaction fees, payment processing, offsite ads, and COGS to calculate true net margin.',
  alternates: {
    canonical: '/etsy-fee-calculator',
  },
  openGraph: {
    title: 'Etsy Fee & Profit Calculator | Kazcut',
    description:
      'Calculate Etsy seller fees, offsite ads deductions, and net margins for handmade and digital products.',
    url: '/etsy-fee-calculator',
  },
};

export default function EtsyFeePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Etsy Fee Calculator',
    description: 'Calculate Etsy seller listing fees, 6.5% transaction cut, payment processing, and net profit margins.',
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
        name: 'What percentage does Etsy take from a sale?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Etsy charges a 6.5% transaction fee on the total sale price (including postage and gift wrapping), plus payment processing (typically 3% + $0.25 in the US) and a $0.20 listing fee.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Etsy charge fees on shipping cost charged to the buyer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Etsy applies the 6.5% transaction fee and payment processing fee to the total amount paid by the buyer, which includes shipping charged.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do Etsy Offsite Ads work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If a buyer clicks an Etsy advertisement on Google, Facebook, or Bing and purchases from your shop within 30 days, Etsy charges an Offsite Ads fee: 15% for shops under $10,000/year (optional), or 12% for shops over $10,000/year (mandatory).',
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
        <AdSenseSlot slotId="etsy-top-banner" format="horizontal" minHeight={90} />
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-[#6E5D54]">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-[#2C221E] font-medium">Etsy Fee Calculator</span>
        </div>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#2C221E] sm:text-4xl">
          Etsy Seller Fee & Profit Calculator
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#6E5D54]">
          Calculate total Etsy seller fees, listing costs, payment processing, and net profit margins across physical handmade goods and digital downloads.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-medium text-[#6E5D54]">Product Models:</span>
          <Link
            href="/etsy-fee-calculator/for-digital-products"
            className="rounded border border-[#EFEAD8] bg-white px-2.5 py-1 text-[#2C221E] hover:border-[#C58842]"
          >
            Digital Downloads & SVGs
          </Link>
          <Link
            href="/etsy-fee-calculator/for-handmade-items"
            className="rounded border border-[#EFEAD8] bg-white px-2.5 py-1 text-[#2C221E] hover:border-[#C58842]"
          >
            Handmade & Physical Goods
          </Link>
        </div>
      </div>

      <EtsyCalculator />

      <div className="mt-12">
        <AdSenseSlot slotId="etsy-bottom-banner" format="horizontal" minHeight={90} />
      </div>

      <section className="mt-14 rounded-xl border border-[#EFEAD8] bg-white p-6 sm:p-8">
        <h2 className="text-base font-semibold text-[#2C221E]">
          Etsy Fee Schedule Breakdown (2026 Updates)
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 text-xs leading-relaxed text-[#6E5D54]">
          <div className="space-y-4">
            <h3 className="font-semibold text-[#2C221E]">Listing Fee</h3>
            <p>
              Etsy assesses a flat <strong>$0.20 USD</strong> listing fee for each item listed or auto-renewed upon sale. Listings expire after 4 months if un-renewed.
            </p>
            <h3 className="font-semibold text-[#2C221E]">Transaction Fee (6.5%)</h3>
            <p>
              When an item sells, Etsy charges <strong>6.5%</strong> of the total display price, including the amount you charge for shipping and gift wrapping.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-[#2C221E]">Etsy Payments Processing</h3>
            <p>
              In the US, Etsy charges <strong>3.0% + $0.25 USD</strong> for processing buyer payment methods. International seller rates vary by country (e.g. 4.0% + £0.20 in the UK).
            </p>
            <h3 className="font-semibold text-[#2C221E]">Offsite Advertising Surcharge</h3>
            <p>
              Sales attributed to external search and social ads placed by Etsy incur an additional <strong>15%</strong> (for sellers below $10,000 threshold) or <strong>12%</strong> (for high-volume sellers).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

