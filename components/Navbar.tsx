'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#EFEAD8] bg-[#FDFBF7]/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Simple Text-Only Logo */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-[#2C221E] transition hover:opacity-80"
          >
            Kazcut
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-1 md:flex">
            {CALCULATOR_NAV_LINKS.slice(0, 4).map((link) => {
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

            {/* More Calculators Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                className="flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium text-[#6E5D54] transition hover:bg-[#FAF5EE] hover:text-[#2C221E]"
              >
                More
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 mt-1 w-48 rounded-md border border-[#EFEAD8] bg-white py-1 shadow-sm">
                  {CALCULATOR_NAV_LINKS.slice(4).map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-3 py-2 text-xs font-medium text-[#6E5D54] transition hover:bg-[#FAF5EE] hover:text-[#2C221E]"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Action Button */}
        <div className="hidden items-center gap-3 sm:flex">
          <Link
            href="/#tools"
            className="inline-flex h-8 items-center justify-center rounded-md bg-[#C58842] px-3.5 text-xs font-medium text-white transition hover:bg-[#A86E31]"
          >
            All Calculators
          </Link>
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
              <Link
                href="/#tools"
                onClick={() => setIsMobileOpen(false)}
                className="flex w-full items-center justify-center rounded-md bg-[#C58842] py-2 text-xs font-medium text-white transition hover:bg-[#A86E31]"
              >
                All Calculators
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

