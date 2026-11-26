import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-[#EFEAD8] bg-[#FAF5EE] text-[#6E5D54]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo & Direct Description */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
              <Image
                src="/icon-48.png"
                alt="Kazcut Logo"
                width={22}
                height={22}
                className="rounded-md border border-[#E7DFCC]/60"
              />
              <span>
                <span className="text-[#2C221E]">Kaz</span>
                <span className="text-[#C58842]">cut</span>
              </span>
            </Link>
            <p className="mt-2 text-xs leading-relaxed text-[#6E5D54]">
              Independent financial calculators and profit fee estimation tools for digital merchants, e-commerce sellers, and freelancers.
            </p>
          </div>

          {/* Core Calculators */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#2C221E]">
              Platform Calculators
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link href="/paypal-fee-calculator" className="hover:text-[#2C221E] transition">
                  PayPal Fee Calculator
                </Link>
              </li>
              <li>
                <Link href="/stripe-fee-calculator" className="hover:text-[#2C221E] transition">
                  Stripe Fee Calculator
                </Link>
              </li>
              <li>
                <Link href="/etsy-fee-calculator" className="hover:text-[#2C221E] transition">
                  Etsy Seller Fee Calculator
                </Link>
              </li>
              <li>
                <Link href="/amazon-fba-calculator" className="hover:text-[#2C221E] transition">
                  Amazon FBA Calculator
                </Link>
              </li>
              <li>
                <Link href="/shopify-profit-calculator" className="hover:text-[#2C221E] transition">
                  Shopify Profit Margin Calculator
                </Link>
              </li>
              <li>
                <Link href="/freelance-hourly-rate-calculator" className="hover:text-[#2C221E] transition">
                  Freelance Hourly Rate Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Localized & Specialized Guides */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#2C221E]">
              Popular Fee Guides
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link href="/paypal-fee-calculator/friends-and-family-vs-goods-and-services" className="hover:text-[#2C221E] transition">
                  PayPal F&amp;F vs Goods &amp; Services
                </Link>
              </li>
              <li>
                <Link href="/paypal-fee-calculator/invoicing-rates" className="hover:text-[#2C221E] transition">
                  PayPal Invoice Rates (3.49%)
                </Link>
              </li>
              <li>
                <Link href="/stripe-fee-calculator/international-cards" className="hover:text-[#2C221E] transition">
                  Stripe International Card Fees
                </Link>
              </li>
              <li>
                <Link href="/etsy-fee-calculator/offsite-ads-fee" className="hover:text-[#2C221E] transition">
                  Etsy Offsite Ads (12% vs 15%)
                </Link>
              </li>
              <li>
                <Link href="/amazon-fba-calculator/storage-fees" className="hover:text-[#2C221E] transition">
                  Amazon FBA Storage Fees
                </Link>
              </li>
              <li>
                <Link href="/shopify-profit-calculator/break-even-cac" className="hover:text-[#2C221E] transition">
                  Shopify Break-Even CAC
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Methodology */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#2C221E]">
              Platform &amp; Trust
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-[#6E5D54]">
              All calculations execute client-side. Financial rates reflect published baseline fee schedules for 2026.
            </p>
            <ul className="mt-3 space-y-1.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-[#2C221E] transition">
                  About &amp; Methodology
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#2C221E] transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#2C221E] transition">
                  Terms &amp; Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-[#EFEAD8] pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#9B8C83]">
          <p>© 2026 Kazcut. Financial calculations provided for estimation purposes only.</p>
          <div className="mt-2 sm:mt-0 flex flex-wrap gap-4">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <Link href="/sitemap.xml" className="hover:underline">
              Sitemap
            </Link>
            <Link href="/robots.txt" className="hover:underline">
              Robots
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

