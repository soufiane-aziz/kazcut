import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import AdSenseSlot from '@/components/AdSenseSlot';
import ScrollReveal from '@/components/ScrollReveal';
import { ALL_CALCULATORS, getFeaturedGuides } from '@/lib/geoData';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Kazcut',
        operatingSystem: 'All (Web-based)',
        applicationCategory: 'BusinessApplication',
        description:
          'Official Kazcut profit and platform fee calculation platform for digital merchants and freelancers.',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is Kazcut?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Kazcut is a 100% free financial and fee calculation platform designed for digital merchants, e-commerce stores, and independent freelancers. Kazcut calculates exact transaction fees, net margins, and required invoice totals for PayPal, Stripe, Etsy, Amazon FBA, Shopify, and freelance hourly billing.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is Kazcut related to CapCut or video editing software?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Kazcut is an independent digital financial calculator utility engineered exclusively for commercial fee modeling, merchant take-home estimations, and payment processing economics. Kazcut has no relation or affiliation with CapCut or video editing software.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are Kazcut calculations updated for 2026 rates?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Kazcut algorithms are continuously calibrated against official 2026 merchant fee schedules, cross-border assessment surcharges, and marketplace commission schedules.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does Kazcut store my financial numbers?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. All mathematical operations execute entirely client-side inside your browser thread with zero server compute, ensuring complete data privacy and instant reactivity.',
            },
          },
        ],
      },
    ],
  };

  const featuredGuides = getFeaturedGuides();

  const comparisonRows = [
    {
      platform: 'PayPal (Standard)',
      domesticFee: '2.99% + $0.49',
      internationalFee: '4.49% + $0.49',
      payoutDelay: 'Instant to 1 Business Day',
      payoutNetOn100: '$96.52',
    },
    {
      platform: 'Stripe (Card Processing)',
      domesticFee: '2.90% + $0.30',
      internationalFee: '4.40% + $0.30',
      payoutDelay: '2 Business Days rolling',
      payoutNetOn100: '$96.80',
    },
    {
      platform: 'Etsy (Direct Checkout)',
      domesticFee: '6.5% + 3.0% + $0.45',
      internationalFee: 'Varies by currency',
      payoutDelay: 'Next business day',
      payoutNetOn100: '$90.05',
    },
    {
      platform: 'Shopify (Basic Plan)',
      domesticFee: '2.90% + $0.30',
      internationalFee: '+1.0% cross-border',
      payoutDelay: '2 to 3 Business Days',
      payoutNetOn100: '$96.80',
    },
    {
      platform: 'Amazon FBA (Consumer)',
      domesticFee: '~15% referral + ~$3.86 FBA',
      internationalFee: 'Export fees apply',
      payoutDelay: 'Bi-weekly settlement',
      payoutNetOn100: '~$66.14',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Banner AdSense Slot */}
      <div className="mb-8">
        <AdSenseSlot
          slotId="header-top-banner"
          format="horizontal"
          minHeight={90}
          className="mx-auto max-w-5xl"
        />
      </div>

      {/* Hero Section */}
      <ScrollReveal>
        <div className="py-8 text-center sm:py-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#EFEAD8] bg-[#FAF5EE] px-3 py-1 text-xs font-medium text-[#6E5D54]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C58842]" />
            Updated for 2026 Merchant Fee Schedules
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#2C221E] sm:text-5xl">
            Calculate platform fees and net profit.
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#6E5D54] sm:text-base">
            High-precision financial calculators for digital merchants, e-commerce stores, and independent freelancers. 100% client-side computation with instant PDF summary exports.
          </p>

          {/* Quick Launch Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {ALL_CALCULATORS.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                className="inline-flex items-center gap-1.5 rounded-md border border-[#E7DFCC] bg-white px-3 py-1.5 text-xs font-medium text-[#2C221E] shadow-xs transition hover:shadow-md hover:border-[#C58842] hover:bg-[#FAF5EE] hover:-translate-y-0.5"
              >
                <span>{tool.shortName}</span>
                <ArrowUpRight className="h-3 w-3 text-[#9B8C83]" />
              </Link>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Core Tools Directory Grid */}
      <section id="tools" className="mt-8">
        <ScrollReveal>
          <div className="border-b border-[#EFEAD8] pb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#2C221E]">
              Financial Calculator Directory
            </h2>
            <p className="mt-1 text-xs text-[#6E5D54]">
              Select a specialized engine below to calculate fee deductions, profit margins, and required invoice totals.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ALL_CALCULATORS.map((tool, idx) => (
            <ScrollReveal
              key={tool.slug}
              delayMs={idx * 100}
              className="h-full"
            >
              <Link
                href={`/${tool.slug}`}
                className="group flex h-full flex-col justify-between rounded-xl border border-[#E7DFCC] bg-white p-6 box-card-interactive"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-[#FAF5EE] px-2 py-0.5 text-[10px] font-medium text-[#6E5D54]">
                      {tool.category}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[#9B8C83] transition group-hover:text-[#C58842] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-[#2C221E] group-hover:text-[#C58842] transition">
                    {tool.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#6E5D54]">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#EFEAD8] pt-3 flex items-center justify-between text-xs font-medium text-[#C58842]">
                  <span>Open Calculator</span>
                  <span className="font-mono text-[11px] text-[#9B8C83]">2026 Rates</span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Platform Fee Comparison Matrix */}
      <ScrollReveal delayMs={150}>
        <section className="mt-14 rounded-xl border border-[#E7DFCC] bg-white p-6 box-card">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#EFEAD8] pb-4 gap-2">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#2C221E]">
                Platform Fee Comparison Matrix
              </h2>
              <p className="mt-1 text-xs text-[#6E5D54]">
                Side-by-side comparison of baseline transaction fees, payout schedules, and net take-home on a standard $100.00 transaction.
              </p>
            </div>
            <span className="text-[11px] font-mono text-[#9B8C83]">
              Standard Commercial Tiers
            </span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#EFEAD8] bg-[#FAF5EE] text-[#6E5D54]">
                <tr>
                  <th className="px-4 py-3 font-medium">Processing Platform</th>
                  <th className="px-4 py-3 font-medium">Domestic Fee Rate</th>
                  <th className="px-4 py-3 font-medium">Cross-Border Surcharge</th>
                  <th className="px-4 py-3 font-medium">Settlement Delay</th>
                  <th className="px-4 py-3 font-medium text-right">Net Payout on $100</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFEAD8] font-mono">
                {comparisonRows.map((row) => (
                  <tr key={row.platform} className="hover:bg-[#FDFBF7] transition">
                    <td className="px-4 py-3 font-sans font-semibold text-[#2C221E]">
                      {row.platform}
                    </td>
                    <td className="px-4 py-3 text-[#2C221E]">{row.domesticFee}</td>
                    <td className="px-4 py-3 text-[#6E5D54]">{row.internationalFee}</td>
                    <td className="px-4 py-3 font-sans text-[#6E5D54]">{row.payoutDelay}</td>
                    <td className="px-4 py-3 text-right font-bold text-[#C58842]">
                      {row.payoutNetOn100}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </ScrollReveal>

      {/* Specialized Fee & Profit Guides (Internal Linking for Long-Tail Rankings) */}
      <ScrollReveal delayMs={165}>
        <section className="mt-14 rounded-xl border border-[#E7DFCC] bg-white p-6 box-card">
          <div className="flex flex-col gap-1 border-b border-[#EFEAD8] pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#2C221E]">
                Specialized Fee &amp; Profit Guides (2026)
              </h2>
              <p className="mt-1 text-xs text-[#6E5D54]">
                Jump directly to country-specific rate schedules, cross-border card calculators, and break-even models.
              </p>
            </div>
            <Link
              href="/about"
              className="text-xs font-medium text-[#C58842] hover:underline"
            >
              View 2026 Methodology →
            </Link>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredGuides.map(({ href, config }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-start justify-between gap-3 rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] p-3.5 transition hover:border-[#C58842] hover:bg-[#FAF5EE]"
              >
                <div>
                  <h3 className="text-xs font-semibold text-[#2C221E] group-hover:text-[#C58842] transition">
                    {config.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-[#6E5D54]">
                    {config.description}
                  </p>
                </div>
                <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#9B8C83] transition group-hover:text-[#C58842]" />
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Brand Entity & Knowledge Center */}
      <ScrollReveal delayMs={175}>
        <section className="mt-14 rounded-xl border border-[#E7DFCC] bg-white p-6 sm:p-8 box-card">
          <div className="border-b border-[#EFEAD8] pb-4">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C58842]">
              Platform Knowledge
            </span>
            <h2 className="mt-1 text-xl font-bold text-[#2C221E] sm:text-2xl">
              About Kazcut Financial Platform
            </h2>
            <p className="mt-1 text-xs text-[#6E5D54]">
              High-precision digital commerce calculation tools engineered for sellers, founders, and independent contractors worldwide.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 text-xs leading-relaxed text-[#6E5D54]">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[#2C221E] text-sm">
                  What is Kazcut?
                </h3>
                <p className="mt-1">
                  <strong>Kazcut</strong> is a dedicated financial calculation engine engineered to solve merchant processing opacity. Whether calculating fee deductions on PayPal and Stripe or modeling multi-tier profit margins across Etsy, Amazon FBA, and Shopify, Kazcut gives sellers instant mathematical clarity before billing or fulfilling orders.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#2C221E] text-sm">
                  Entity Disambiguation
                </h3>
                <p className="mt-1">
                  <strong>Kazcut</strong> is an independent fintech utility brand. Kazcut has no affiliation, connection, or sponsorship with video editing applications such as CapCut or multimedia editing tools. All Kazcut tools focus exclusively on commercial financial analytics and merchant fee accounting.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[#2C221E] text-sm">
                  Reverse Net Inversion Logic
                </h3>
                <p className="mt-1">
                  Most merchant fee calculators only tell you what is deducted from an invoice. Kazcut features two-way mathematical inversion: determine exactly what gross dollar amount you must invoice a client or customer to receive your desired net profit after domestic and cross-border cuts.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#2C221E] text-sm">
                  Zero Server Data Transmission
                </h3>
                <p className="mt-1">
                  All transaction formulas execute purely client-side within your browser runtime. None of your sales figures, customer billing totals, or pricing configurations are sent to or stored on remote servers.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Bottom AdSense Section */}
      <ScrollReveal delayMs={200}>
        <div className="mt-14">
          <AdSenseSlot
            slotId="home-footer-banner"
            format="horizontal"
            minHeight={90}
            className="mx-auto max-w-5xl"
          />
        </div>
      </ScrollReveal>
    </div>
  );
}
