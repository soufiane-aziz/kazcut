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

          {/* Localized Schedules */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#2C221E]">
              Regional Schedules
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link href="/paypal-fee-calculator/in-usa" className="hover:text-[#2C221E] transition">
                  PayPal Fees USA
                </Link>
              </li>
              <li>
                <Link href="/paypal-fee-calculator/in-uk" className="hover:text-[#2C221E] transition">
                  PayPal Fees UK
                </Link>
              </li>
              <li>
                <Link href="/stripe-fee-calculator/in-usa" className="hover:text-[#2C221E] transition">
                  Stripe Fees USA
                </Link>
              </li>
              <li>
                <Link href="/amazon-fba-calculator/in-usa" className="hover:text-[#2C221E] transition">
                  Amazon FBA USA
                </Link>
              </li>
              <li>
                <Link href="/shopify-profit-calculator/for-dropshipping" className="hover:text-[#2C221E] transition">
                  Shopify Dropshipping
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Methodology */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#2C221E]">
              Methodology
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-[#6E5D54]">
              All calculations execute client-side. Financial rates reflect published baseline fee schedules for 2026. Formulas account for domestic and international tier distinctions.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-[#EFEAD8] pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#9B8C83]">
          <p>© 2026 Kazcut. Financial calculations provided for estimation purposes only.</p>
          <div className="mt-2 sm:mt-0 flex gap-4">
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

