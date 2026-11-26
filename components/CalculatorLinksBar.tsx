import React from 'react';
import Link from 'next/link';
import { getSubPagesForCalculator } from '@/lib/geoData';

interface CalculatorLinksBarProps {
  calculatorSlug: string;
  currentSubSlug?: string;
  label?: string;
}

/**
 * Renders internal navigation links to all programmatic guides and regional schedules
 * belonging to a calculator, preventing orphaned pages and passing internal link equity.
 */
export default function CalculatorLinksBar({
  calculatorSlug,
  currentSubSlug,
  label = 'Specialized Guides & Regional Rates:',
}: CalculatorLinksBarProps) {
  const subPages = getSubPagesForCalculator(calculatorSlug);

  if (subPages.length === 0) return null;

  return (
    <nav
      aria-label="Related calculator guides"
      className="mt-4 flex flex-wrap items-center gap-2 text-xs"
    >
      <span className="font-medium text-[#6E5D54]">{label}</span>
      {currentSubSlug && (
        <Link
          href={`/${calculatorSlug}`}
          className="rounded border border-[#EFEAD8] bg-white px-2.5 py-1 text-[#2C221E] transition hover:border-[#C58842]"
        >
          Overview
        </Link>
      )}
      {subPages.map(({ href, config }) => {
        const isActive = currentSubSlug === config.subSlug;
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className={`rounded border px-2.5 py-1 transition ${isActive
                ? 'border-[#C58842] bg-[#FAF5EE] font-semibold text-[#2C221E]'
                : 'border-[#EFEAD8] bg-white text-[#2C221E] hover:border-[#C58842]'
              }`}
          >
            {config.title}
          </Link>
        );
      })}
    </nav>
  );
}

