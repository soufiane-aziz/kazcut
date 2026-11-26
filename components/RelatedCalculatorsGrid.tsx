import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ALL_CALCULATORS } from '@/lib/geoData';

interface RelatedCalculatorsGridProps {
  currentSlug: string;
}

/**
 * Cross-links to other Kazcut calculators to strengthen internal link graph and session depth.
 */
export default function RelatedCalculatorsGrid({ currentSlug }: RelatedCalculatorsGridProps) {
  const others = ALL_CALCULATORS.filter((calc) => calc.slug !== currentSlug);

  return (
    <section className="mt-12 rounded-xl border border-[#E7DFCC] bg-white p-6 sm:p-8 box-card">
      <div className="border-b border-[#EFEAD8] pb-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[#2C221E]">
          More Free Profit &amp; Fee Calculators
        </h2>
        <p className="mt-1 text-xs text-[#6E5D54]">
          Compare platform processing deductions and unit economics across your other sales channels.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            className="group flex flex-col justify-between rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] p-4 transition hover:border-[#C58842] hover:bg-[#FAF5EE]"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium uppercase tracking-wide text-[#9B8C83]">
                  {tool.category}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#9B8C83] transition group-hover:text-[#C58842]" />
              </div>
              <h3 className="mt-1.5 text-sm font-semibold text-[#2C221E] group-hover:text-[#C58842] transition">
                {tool.name}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[#6E5D54]">
                {tool.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

