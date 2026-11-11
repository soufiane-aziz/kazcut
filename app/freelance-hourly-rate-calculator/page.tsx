import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import FreelanceCalculator from '@/components/calculators/FreelanceCalculator';
import AdSenseSlot from '@/components/AdSenseSlot';

export const metadata: Metadata = {
  title: 'Freelance Hourly Rate Calculator (Take-Home Income & Tax Formula)',
  description:
    'Calculate the exact billable hourly rate required to hit your target take-home salary after self-employment taxes, business expenses, and unbillable hours.',
  alternates: {
    canonical: 'https://kazcut.vercel.app/freelance-hourly-rate-calculator',
  },
  openGraph: {
    title: 'Freelance Hourly Rate Calculator | Kazcut',
    description:
      'Determine your target billable hourly and day rate based on desired net income, tax rate, and business overhead.',
    url: 'https://kazcut.vercel.app/freelance-hourly-rate-calculator',
  },
};

export default function FreelanceRatePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Freelance Hourly Rate Calculator',
    description: 'Calculate billable hourly rates based on net income goals, self-employment taxes, and non-billable time.',
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
        name: 'How do I calculate my freelance hourly rate from my desired salary?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Divide your total gross income requirement (desired net income adjusted for taxes + business expenses + profit buffer) by your total annual billable hours (working weeks × hours per week × billable efficiency ratio).',
        },
      },
      {
        '@type': 'Question',
        name: 'What percentage of freelance time is typically billable?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most independent professionals maintain between 65% and 75% billable time. The remaining 25% to 35% is required for administrative tasks, client communication, pitching, invoicing, and professional development.',
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
        <AdSenseSlot slotId="freelance-top-banner" format="horizontal" minHeight={90} />
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-[#6E5D54]">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-[#2C221E] font-medium">Freelance Hourly Rate Calculator</span>
        </div>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#2C221E] sm:text-4xl">
          Freelance Hourly Rate Calculator
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#6E5D54]">
          Determine the billable hourly and day rate required to reach your net income target after self-employment taxes, business overhead, and unbillable administrative time.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-medium text-[#6E5D54]">Role Profiles:</span>
          <Link
            href="/freelance-hourly-rate-calculator/for-software-engineers"
            className="rounded border border-[#EFEAD8] bg-white px-2.5 py-1 text-[#2C221E] hover:border-[#C58842]"
          >
            Software Engineers
          </Link>
          <Link
            href="/freelance-hourly-rate-calculator/for-designers"
            className="rounded border border-[#EFEAD8] bg-white px-2.5 py-1 text-[#2C221E] hover:border-[#C58842]"
          >
            UI/UX Designers
          </Link>
        </div>
      </div>

      <FreelanceCalculator />

      <div className="mt-12">
        <AdSenseSlot slotId="freelance-bottom-banner" format="horizontal" minHeight={90} />
      </div>

      <section className="mt-14 rounded-xl border border-[#EFEAD8] bg-white p-6 sm:p-8">
        <h2 className="text-base font-semibold text-[#2C221E]">
          Freelance Rate Modeling Principles
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 text-xs leading-relaxed text-[#6E5D54]">
          <div className="space-y-4">
            <h3 className="font-semibold text-[#2C221E]">The Employee vs. Contractor Multiplier</h3>
            <p>
              Salaried employees receive employer-paid payroll taxes, health insurance, paid leave, and equipment. Freelancers must add at least 35% to 50% to equivalent salaried rates to maintain parity.
            </p>
            <h3 className="font-semibold text-[#2C221E]">Billable Capacity Realism</h3>
            <p>
              Assuming a 40-hour billable week is a common pitfall. Solo practitioners typically bill between 24 and 30 hours per week while working a 40-hour week.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-[#2C221E]">Self-Employment Taxes</h3>
            <p>
              In the United States, self-employment tax (15.3% FICA) applies to net business earnings on top of federal and state income tax brackets.
            </p>
            <h3 className="font-semibold text-[#2C221E]">Value-Based & Day Rate Packaging</h3>
            <p>
              Converting billable hourly rates to day rates (Hourly Rate × 8) or value-based project fees avoids micro-tracking and aligns client incentives around outcomes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

