'use client';

import React from 'react';
import { formatCurrency, formatPercent } from '@/lib/calculations';

export interface BreakdownSlice {
  label: string;
  amount: number;
  percent: number;
  color?: string;
}

interface FeeChartProps {
  grossAmount: number;
  totalFees: number;
  netPayout: number;
  currency?: string;
  slices?: BreakdownSlice[];
  feeLabel?: string;
  netLabel?: string;
}

const DEFAULT_COLORS = [
  '#C58842', // Caramel Primary
  '#2C221E', // Dark Cocoa
  '#6E5D54', // Muted Mocha
  '#A86E31', // Deep Amber
  '#8C7A6B', // Taupe
  '#D4A373', // Light Caramel
];

export default function FeeChart({
  grossAmount,
  totalFees,
  netPayout,
  currency = 'USD',
  slices,
  feeLabel = 'Platform Fees',
  netLabel = 'Net Payout',
}: FeeChartProps) {
  const safeGross = Math.max(0.01, grossAmount);
  const netRatio = Math.min(100, Math.max(0, (netPayout / safeGross) * 100));
  const feeRatio = Math.min(100, Math.max(0, (totalFees / safeGross) * 100));

  // Determine breakdown segments
  const segments: BreakdownSlice[] = slices && slices.length > 0
    ? slices
    : [
        { label: netLabel, amount: netPayout, percent: netRatio, color: '#C58842' },
        { label: feeLabel, amount: totalFees, percent: feeRatio, color: '#2C221E' },
      ];

  return (
    <div className="rounded-xl border border-[#EFEAD8] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="flex items-center justify-between border-b border-[#EFEAD8] pb-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#2C221E]">
          Revenue Distribution
        </h3>
        <span className="text-xs font-medium text-[#6E5D54]">
          Gross: {formatCurrency(grossAmount, currency)}
        </span>
      </div>

      {/* Primary Proportional Visual Bar */}
      <div className="mt-4">
        <div className="relative flex h-3.5 w-full overflow-hidden rounded-full bg-[#FAF5EE] p-0.5">
          {segments.map((seg, idx) => {
            const widthPct = Math.max(0, Math.min(100, seg.percent));
            if (widthPct <= 0) return null;
            const segmentColor = seg.color || DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
            return (
              <div
                key={idx}
                style={{
                  width: `${widthPct}%`,
                  backgroundColor: segmentColor,
                }}
                className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-300"
                title={`${seg.label}: ${formatCurrency(seg.amount, currency)} (${formatPercent(seg.percent)})`}
              />
            );
          })}
        </div>
      </div>

      {/* Key Metric Cards */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] p-3">
          <div className="text-[11px] font-medium text-[#6E5D54]">Gross Revenue</div>
          <div className="mt-1 font-mono text-base font-semibold text-[#2C221E]">
            {formatCurrency(grossAmount, currency)}
          </div>
          <div className="mt-0.5 text-[10px] text-[#9B8C83]">100.00% Baseline</div>
        </div>

        <div className="rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] p-3">
          <div className="text-[11px] font-medium text-[#6E5D54]">{feeLabel}</div>
          <div className="mt-1 font-mono text-base font-semibold text-[#6E5D54]">
            {formatCurrency(totalFees, currency)}
          </div>
          <div className="mt-0.5 text-[10px] text-[#6E5D54]">
            {formatPercent(feeRatio)} of gross
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 rounded-lg border border-[#E8DFC9] bg-[#FAF5EE] p-3">
          <div className="text-[11px] font-medium text-[#A86E31]">{netLabel}</div>
          <div className="mt-1 font-mono text-base font-semibold text-[#C58842]">
            {formatCurrency(netPayout, currency)}
          </div>
          <div className="mt-0.5 text-[10px] font-medium text-[#A86E31]">
            {formatPercent(netRatio)} retention
          </div>
        </div>
      </div>

      {/* Segment Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#EFEAD8] pt-3 text-xs">
        {segments.map((seg, idx) => {
          const color = seg.color || DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
          return (
            <div key={idx} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-[#6E5D54]">{seg.label}:</span>
              <span className="font-mono font-medium text-[#2C221E]">
                {formatPercent(seg.percent)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

