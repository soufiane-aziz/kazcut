import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PROGRAMMATIC_PAGES } from '@/lib/geoData';
import { getSiteUrl } from '@/lib/siteUrl';
import AdSenseSlot from '@/components/AdSenseSlot';
import PaypalCalculator from '@/components/calculators/PaypalCalculator';
import StripeCalculator from '@/components/calculators/StripeCalculator';
import EtsyCalculator from '@/components/calculators/EtsyCalculator';
import AmazonFbaCalculator from '@/components/calculators/AmazonFbaCalculator';
import ShopifyCalculator from '@/components/calculators/ShopifyCalculator';
import FreelanceCalculator from '@/components/calculators/FreelanceCalculator';

interface PageProps {
  params: Promise<{
    calculator: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(PROGRAMMATIC_PAGES).map((key) => {
    const [calculator, slug] = key.split('/');
    return {
      calculator,
      slug,
    };
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { calculator, slug } = await params;
  const key = `${calculator}/${slug}`;
  const config = PROGRAMMATIC_PAGES[key];

  if (!config) {
    return {
      title: 'Page Not Found | Kazcut',
    };
  }

  const baseUrl = getSiteUrl();

  return {
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: {
      canonical: `${baseUrl}/${calculator}/${slug}`,
    },
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      url: `${baseUrl}/${calculator}/${slug}`,
      siteName: 'Kazcut',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.metaTitle,
      description: config.metaDescription,
    },
  };
}

export default async function ProgrammaticPage({ params }: PageProps) {
  const { calculator, slug } = await params;
  const key = `${calculator}/${slug}`;
  const config = PROGRAMMATIC_PAGES[key];

  if (!config) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: config.title,
    description: config.description,
    provider: {
      '@type': 'Organization',
      name: 'Kazcut',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: config.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: getSiteUrl(),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: calculator.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        item: `${getSiteUrl()}/${calculator}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: config.title,
        item: `${getSiteUrl()}/${calculator}/${slug}`,
      },
    ],
  };

  // Render the appropriate calculator engine
  const renderCalculatorEngine = () => {
    switch (calculator) {
      case 'paypal-fee-calculator':
        return (
          <PaypalCalculator
            initialCurrency={config.defaultCurrency as any}
            initialAmount={config.defaultInputs?.amount ?? 100}
            initialRateType={config.defaultInputs?.rateType ?? 'standard'}
          />
        );
      case 'stripe-fee-calculator':
        return (
          <StripeCalculator
            initialCurrency={config.defaultCurrency as any}
            initialAmount={config.defaultInputs?.amount ?? 100}
            initialRatePercent={config.defaultInputs?.customRatePercent ?? 2.9}
            initialFixedFee={config.defaultInputs?.customFixedFee}
          />
        );
      case 'etsy-fee-calculator':
        return (
          <EtsyCalculator
            initialCurrency={config.defaultCurrency as any}
            initialSalePrice={config.defaultInputs?.salePrice ?? 35}
            initialItemCost={config.defaultInputs?.itemCost ?? 10}
            initialShippingCharged={config.defaultInputs?.shippingCharged ?? 0}
            initialShippingCost={config.defaultInputs?.shippingCost ?? 0}
            initialOffsiteAds={config.defaultInputs?.offsiteAds ?? 'none'}
          />
        );
      case 'amazon-fba-calculator':
        return (
          <AmazonFbaCalculator
            initialCurrency={config.defaultCurrency as any}
            initialItemPrice={config.defaultInputs?.itemPrice ?? 29.99}
            initialCogs={config.defaultInputs?.cogs ?? 6.50}
            initialInboundShipping={config.defaultInputs?.inboundShipping ?? 1.25}
            initialReferralRate={config.defaultInputs?.referralRatePercent ?? 15}
            initialFbaTier={config.defaultInputs?.fbaTier ?? 'large_standard_under_1lb'}
          />
        );
      case 'shopify-profit-calculator':
        return (
          <ShopifyCalculator
            initialCurrency={config.defaultCurrency as any}
            initialRetailPrice={config.defaultInputs?.retailPrice ?? 49.99}
            initialCogs={config.defaultInputs?.cogs ?? 15.0}
            initialAdSpend={config.defaultInputs?.adSpendPerOrder ?? 18.0}
            initialPlanType={config.defaultInputs?.planType ?? 'basic'}
          />
        );
      case 'freelance-hourly-rate-calculator':
        return (
          <FreelanceCalculator
            initialCurrency={config.defaultCurrency as any}
            initialIncome={config.defaultInputs?.targetNetAnnualIncome ?? 120000}
            initialHoursPerWeek={config.defaultInputs?.hoursPerWeek ?? 35}
            initialTaxRate={config.defaultInputs?.effectiveTaxRatePercent ?? 28}
          />
        );
      default:
        notFound();
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Top Banner AdSense Slot */}
      <div className="mb-6">
        <AdSenseSlot slotId={`geo-${slug}-top-banner`} format="horizontal" minHeight={90} />
      </div>

      {/* Breadcrumb & Title */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-[#6E5D54]">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link href={`/${calculator}`} className="hover:underline capitalize">
            {calculator.replace(/-/g, ' ')}
          </Link>
          <span>/</span>
          <span className="text-[#2C221E] font-medium">{config.title}</span>
        </div>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#2C221E] sm:text-4xl">
          {config.h1}
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#6E5D54]">
          {config.description}
        </p>

        {/* Market Highlights */}
        {config.marketNotes && config.marketNotes.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {config.marketNotes.map((note, idx) => (
              <span
                key={idx}
                className="inline-flex items-center rounded-md border border-[#EFEAD8] bg-[#FAF5EE] px-3 py-1 font-mono text-[11px] text-[#2C221E]"
              >
                {note}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Render Calculator */}
      {renderCalculatorEngine()}

      {/* Below Action AdSense Slot */}
      <div className="mt-12">
        <AdSenseSlot slotId={`geo-${slug}-bottom-banner`} format="horizontal" minHeight={90} />
      </div>

      {/* Localized FAQ Section */}
      {config.faqs && config.faqs.length > 0 && (
        <section className="mt-14 rounded-xl border border-[#E7DFCC] bg-white p-6 sm:p-8 box-card">
          <h2 className="text-base font-semibold text-[#2C221E]">
            Frequently Asked Questions: {config.title}
          </h2>
          <div className="mt-6 divide-y divide-[#EFEAD8]">
            {config.faqs.map((faq, idx) => (
              <div key={idx} className="py-4 first:pt-0 last:pb-0">
                <h3 className="text-xs font-semibold text-[#2C221E]">
                  {faq.question}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#6E5D54]">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

