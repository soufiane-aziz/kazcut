import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Kazcut Privacy Policy: how client-side financial calculations, anonymous analytics, and optional advertising cookies are handled.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2 text-xs text-[#6E5D54]">
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <span className="font-medium text-[#2C221E]">Privacy Policy</span>
      </div>

      <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#2C221E] sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-xs text-[#9B8C83]">Last updated: November 2026</p>

      <div className="mt-8 space-y-6 rounded-xl border border-[#E7DFCC] bg-white p-6 sm:p-8 text-xs leading-relaxed text-[#6E5D54] box-card">
        <section>
          <h2 className="text-sm font-semibold text-[#2C221E]">1. Client-Side Financial Calculations</h2>
          <p className="mt-2">
            All fee, profit margin, tax, and invoice calculations on Kazcut run directly inside your web browser. Your product prices, cost of goods sold, invoice totals, and income targets are not transmitted to or stored on our servers during normal calculator usage.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-[#2C221E]">2. Analytics &amp; Performance Monitoring</h2>
          <p className="mt-2">
            Kazcut uses privacy-friendly performance telemetry (such as Vercel Web Analytics and Vercel Speed Insights, and Google Analytics when configured) to measure aggregate page views, page load performance, and error rates. This aggregate data helps us improve calculator reliability and accuracy.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-[#2C221E]">3. Advertising &amp; Third-Party Cookies</h2>
          <p className="mt-2">
            When advertising is active via Google AdSense, third-party vendors (including Google) may use cookies to serve ads based on your prior visits to this website or other websites. You can opt out of personalized advertising by visiting Google Ads Settings or using your browser’s cookie controls.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-[#2C221E]">4. External Links</h2>
          <p className="mt-2">
            Kazcut may link to external documentation or repositories (such as GitHub). We are not responsible for the privacy practices or content of third-party websites.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-[#2C221E]">5. Contact</h2>
          <p className="mt-2">
            Questions about this Privacy Policy or data handling can be submitted via our{' '}
            <a
              href="https://github.com/soufiane-aziz/kazcut/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#C58842] hover:underline"
            >
              GitHub repository issues page
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

