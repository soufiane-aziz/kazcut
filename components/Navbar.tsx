'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, HelpCircle } from 'lucide-react';
import { useGuide } from '@/context/GuideContext';

const CALCULATOR_NAV_LINKS = [
  { name: 'PayPal', href: '/paypal-fee-calculator' },
  { name: 'Stripe', href: '/stripe-fee-calculator' },
  { name: 'Etsy', href: '/etsy-fee-calculator' },
  { name: 'Amazon FBA', href: '/amazon-fba-calculator' },
  { name: 'Shopify', href: '/shopify-profit-calculator' },
  { name: 'Freelance Rate', href: '/freelance-hourly-rate-calculator' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { openGuide } = useGuide();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#EFEAD8] bg-[#FDFBF7]/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo with 'cut' in Caramel */}
        <div className="flex shrink-0 items-center">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight transition hover:opacity-85"
          >
            <span className="text-[#2C221E]">Kaz</span>
            <span className="text-[#C58842]">cut</span>
          </Link>
        </div>

        {/* Center: All Menu Elements Separated and Centered */}
        <nav className="hidden items-center justify-center gap-1 md:flex flex-1 px-4">
          {CALCULATOR_NAV_LINKS.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                  isActive
                    ? 'bg-[#F4EAD9] text-[#2C221E]'
                    : 'text-[#6E5D54] hover:bg-[#FAF5EE] hover:text-[#2C221E]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: Action Button to Open Platform Guide */}
        <div className="hidden shrink-0 items-center gap-3 sm:flex">
          <button
            type="button"
            onClick={openGuide}
            className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md bg-[#C58842] px-3.5 text-xs font-medium text-white shadow-xs transition hover:bg-[#A86E31] cursor-pointer"
          >
            <HelpCircle className="h-3.5 w-3.5 opacity-90" />
            <span>Platform Guide</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="inline-flex items-center justify-center rounded-md p-1.5 text-[#6E5D54] hover:bg-[#F4EAD9] hover:text-[#2C221E]"
            aria-label="Toggle navigation menu"
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="border-t border-[#EFEAD8] bg-[#FDFBF7] px-4 py-3 md:hidden">
          <div className="flex flex-col space-y-1">
            {CALCULATOR_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                  pathname.startsWith(link.href)
                    ? 'bg-[#F4EAD9] text-[#2C221E]'
                    : 'text-[#6E5D54] hover:bg-[#FAF5EE] hover:text-[#2C221E]'
                }`}
              >
                {link.name} Fee Calculator
              </Link>
            ))}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileOpen(false);
                  openGuide();
                }}
                className="flex w-full items-center justify-center gap-1.5 rounded-md bg-[#C58842] py-2 text-xs font-medium text-white transition hover:bg-[#A86E31]"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                <span>Platform Guide</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
