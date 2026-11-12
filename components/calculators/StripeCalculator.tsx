'use client';

import React, { useState, useId } from 'react';
import {
  calculateStripe,
  formatCurrency,
  formatPercent,
  STRIPE_FIXED_FEES,
} from '@/lib/calculations';
import { stripeSchema, StripeInputs } from '@/lib/validations';
import FeeChart from '@/components/FeeChart';
import PdfExportButton from '@/components/PdfExportButton';
import SaveCalculationModal from '@/components/SaveCalculationModal';

interface StripeCalculatorProps {
  initialCurrency?: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY';
  initialAmount?: number;
  initialRatePercent?: number;
  initialFixedFee?: number;
}

export default function StripeCalculator({
  initialCurrency = 'USD',
  initialAmount = 100,
  initialRatePercent = 2.9,
  initialFixedFee,
}: StripeCalculatorProps) {
  const [amount, setAmount] = useState<number>(initialAmount);
  const [mode, setMode] = useState<'receive' | 'send'>('receive');
  const [currency, setCurrency] = useState<StripeInputs['currency']>(initialCurrency);
  const [isInternational, setIsInternational] = useState(false);
  const [needsCurrencyConversion, setNeedsCurrencyConversion] = useState(false);
  const [customRatePercent, setCustomRatePercent] = useState(initialRatePercent);
  const [customFixedFee, setCustomFixedFee] = useState(
    initialFixedFee ?? (STRIPE_FIXED_FEES[initialCurrency] || 0.30)
  );
  const [useCustomRate, setUseCustomRate] = useState(false);
  
  // Chargeback / dispute estimations
  const [monthlyVolume, setMonthlyVolume] = useState<number>(10000);
  const [disputeRate, setDisputeRate] = useState<number>(0.25); // 0.25% industry baseline

  const containerId = useId().replace(/:/g, '');
  const reportElementId = `stripe-report-${containerId}`;

  const parsedInputs: StripeInputs = stripeSchema.parse({
    amount: isNaN(amount) || amount <= 0 ? 0.01 : amount,
    mode,
    isInternational,
    needsCurrencyConversion,
    currency,
    customRatePercent: useCustomRate ? customRatePercent : undefined,
    customFixedFee: useCustomRate ? customFixedFee : undefined,
    estimatedMonthlyVolume: monthlyVolume,
    estimatedDisputeRate: disputeRate,
  });

  const result = calculateStripe(parsedInputs);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Inputs */}
        <div className="rounded-xl border border-[#E7DFCC] bg-white p-6 box-card lg:col-span-6">
          <div className="flex items-center justify-between border-b border-[#EFEAD8] pb-4">
            <h2 className="text-sm font-semibold tracking-tight text-[#2C221E]">
              Stripe Parameters
            </h2>
            <div className="flex rounded-lg border border-[#EFEAD8] bg-[#FAF5EE] p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setMode('receive')}
                className={`rounded-md px-3 py-1 font-medium transition ${
                  mode === 'receive'
                    ? 'bg-white text-[#2C221E] shadow-xs'
                    : 'text-[#6E5D54] hover:text-[#2C221E]'
                }`}
              >
                I want to receive
              </button>
              <button
                type="button"
                onClick={() => setMode('send')}
                className={`rounded-md px-3 py-1 font-medium transition ${
                  mode === 'send'
                    ? 'bg-white text-[#2C221E] shadow-xs'
                    : 'text-[#6E5D54] hover:text-[#2C221E]'
                }`}
              >
                I am charging
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Amount & Currency */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-[#6E5D54]">
                  {mode === 'receive' ? 'Desired Net Payout' : 'Transaction Charge'}
                </label>
                <span className="font-mono text-xs font-semibold text-[#2C221E]">
                  {formatCurrency(amount, currency)}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <div className="relative flex-1">
                  <input
                    type="number"
                    min="1"
                    max="1000000"
                    step="any"
                    value={amount || ''}
                    onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] px-3.5 py-2 font-mono text-sm font-medium text-[#2C221E] focus:border-[#C58842] focus:outline-hidden"
                  />
                </div>
                <select
                  value={currency}
                  onChange={(e) => {
                    const c = e.target.value as any;
                    setCurrency(c);
                    setCustomFixedFee(STRIPE_FIXED_FEES[c] || 0.30);
                  }}
                  className="rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] px-3 py-2 text-xs font-medium text-[#2C221E] focus:border-[#C58842] focus:outline-hidden"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="CAD">CAD (CA$)</option>
                  <option value="AUD">AUD (AU$)</option>
                  <option value="JPY">JPY (¥)</option>
                </select>
              </div>

              <input
                type="range"
                min="10"
                max="5000"
                step="10"
                value={Math.min(5000, amount || 0)}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                className="mt-3 w-full cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#9B8C83]">
                <span>{formatCurrency(10, currency)}</span>
                <span>{formatCurrency(1000, currency)}</span>
                <span>{formatCurrency(2500, currency)}</span>
                <span>{formatCurrency(5000, currency)}+</span>
              </div>
            </div>

            {/* Interchange & Cross-Border Toggles */}
            <div className="space-y-3 rounded-lg border border-[#EFEAD8] bg-[#FAF5EE] p-4">
              <span className="text-xs font-semibold text-[#2C221E]">
                Payment Surcharges & Modifiers
              </span>

              <label className="flex items-center justify-between cursor-pointer text-xs text-[#2C221E]">
                <span>International Card (+1.50%)</span>
                <input
                  type="checkbox"
                  checked={isInternational}
                  onChange={(e) => setIsInternational(e.target.checked)}
                  className="h-4 w-4 rounded accent-[#C58842]"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer text-xs text-[#2C221E]">
                <span>Currency Conversion (+1.00%)</span>
                <input
                  type="checkbox"
                  checked={needsCurrencyConversion}
                  onChange={(e) => setNeedsCurrencyConversion(e.target.checked)}
                  className="h-4 w-4 rounded accent-[#C58842]"
                />
              </label>
            </div>

            {/* Volume Pricing / Custom Rate */}
            <div className="border-t border-[#EFEAD8] pt-4">
              <button
                type="button"
                onClick={() => setUseCustomRate(!useCustomRate)}
                className="text-xs font-medium text-[#C58842] hover:underline"
              >
                {useCustomRate ? 'Reset to standard Stripe rate (2.9% + 30¢)' : 'Enter custom negotiated volume rate'}
              </button>

              {useCustomRate && (
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-[#6E5D54]">
                      Base Fee %
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={customRatePercent}
                      onChange={(e) => setCustomRatePercent(parseFloat(e.target.value) || 0)}
                      className="mt-1 w-full rounded-md border border-[#EFEAD8] bg-[#FDFBF7] px-3 py-1.5 font-mono text-xs text-[#2C221E]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-[#6E5D54]">
                      Fixed Fee ({currency})
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={customFixedFee}
                      onChange={(e) => setCustomFixedFee(parseFloat(e.target.value) || 0)}
                      className="mt-1 w-full rounded-md border border-[#EFEAD8] bg-[#FDFBF7] px-3 py-1.5 font-mono text-xs text-[#2C221E]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Chargeback Modeling */}
            <div className="border-t border-[#EFEAD8] pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#6E5D54]">
                  Monthly Volume for Dispute Estimation
                </span>
                <span className="font-mono text-xs font-semibold text-[#2C221E]">
                  {formatCurrency(monthlyVolume, currency)}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={monthlyVolume}
                onChange={(e) => setMonthlyVolume(parseFloat(e.target.value))}
                className="w-full cursor-pointer"
              />
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#6E5D54]">Estimated Dispute Rate:</span>
                <span className="font-mono font-medium text-[#2C221E]">{disputeRate}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Output & Visuals */}
        <div className="space-y-6 lg:col-span-6">
          <div
            id={reportElementId}
            className="rounded-xl border border-[#E7DFCC] bg-white p-6 box-card"
          >
            <div className="flex items-center justify-between border-b border-[#EFEAD8] pb-4">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C58842]">
                  Stripe Settlement
                </span>
                <h3 className="text-base font-semibold text-[#2C221E]">
                  {mode === 'receive' ? 'Total Required Charge' : 'Net Deposit Payout'}
                </h3>
              </div>
              <div className="text-right">
                <span className="font-mono text-2xl font-bold tracking-tight text-[#2C221E]">
                  {formatCurrency(mode === 'receive' ? result.grossAmount : result.netPayout, currency)}
                </span>
                <div className="text-[10px] text-[#6E5D54]">
                  Effective Rate: {formatPercent(result.effectiveRatePercent)}
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-[#FAF5EE] p-3 text-xs leading-relaxed text-[#6E5D54]">
              {mode === 'receive' ? (
                <>
                  To net <strong className="font-mono text-[#2C221E]">{formatCurrency(amount, currency)}</strong>, you must charge{' '}
                  <strong className="font-mono text-[#C58842]">{formatCurrency(result.grossAmount, currency)}</strong>. Stripe deducts{' '}
                  <strong className="font-mono text-[#2C221E]">{formatCurrency(result.totalFee, currency)}</strong> in processing costs.
                </>
              ) : (
                <>
                  For a <strong className="font-mono text-[#2C221E]">{formatCurrency(amount, currency)}</strong> charge, Stripe deducts{' '}
                  <strong className="font-mono text-[#2C221E]">{formatCurrency(result.totalFee, currency)}</strong>, leaving{' '}
                  <strong className="font-mono text-[#C58842]">{formatCurrency(result.netPayout, currency)}</strong> net.
                </>
              )}
            </div>

            {/* Dynamic Breakdown Chart */}
            <div className="mt-6">
              <FeeChart
                grossAmount={result.grossAmount}
                totalFees={result.totalFee}
                netPayout={result.netPayout}
                currency={currency}
                slices={result.breakdown}
                feeLabel="Stripe Fees"
                netLabel="Net Settlement"
              />
            </div>

            {/* Side-by-Side Breakdown Table */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2C221E]">
                Fee Schedule Breakdown
              </h4>
              <div className="mt-3 overflow-hidden rounded-lg border border-[#EFEAD8]">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-[#EFEAD8] bg-[#FAF5EE] font-medium text-[#6E5D54]">
                    <tr>
                      <th className="px-3.5 py-2.5">Component</th>
                      <th className="px-3.5 py-2.5 text-right">Rate</th>
                      <th className="px-3.5 py-2.5 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFEAD8] bg-white font-mono">
                    <tr>
                      <td className="px-3.5 py-2.5 font-sans text-[#2C221E]">Base Processing</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">
                        {customRatePercent}% + {formatCurrency(customFixedFee, currency)}
                      </td>
                      <td className="px-3.5 py-2.5 text-right font-medium text-[#6E5D54]">
                        -{formatCurrency(result.baseFee, currency)}
                      </td>
                    </tr>
                    {result.internationalFee > 0 && (
                      <tr>
                        <td className="px-3.5 py-2.5 font-sans text-[#2C221E]">International Card Surcharge</td>
                        <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">+1.50%</td>
                        <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">
                          -{formatCurrency(result.internationalFee, currency)}
                        </td>
                      </tr>
                    )}
                    {result.conversionFee > 0 && (
                      <tr>
                        <td className="px-3.5 py-2.5 font-sans text-[#2C221E]">Currency Conversion Surcharge</td>
                        <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">+1.00%</td>
                        <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">
                          -{formatCurrency(result.conversionFee, currency)}
                        </td>
                      </tr>
                    )}
                    <tr className="bg-[#FAF5EE]">
                      <td className="px-3.5 py-2.5 font-sans font-semibold text-[#2C221E]">Total Processing Fee</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">
                        {formatPercent(result.effectiveRatePercent)}
                      </td>
                      <td className="px-3.5 py-2.5 text-right font-bold text-[#A86E31]">
                        -{formatCurrency(result.totalFee, currency)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Chargeback Risk Estimation Callout */}
            <div className="mt-4 rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] p-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#2C221E]">Estimated Monthly Dispute Cost:</span>
                <span className="font-mono font-semibold text-[#B43428]">
                  ~{formatCurrency(result.estimatedDisputeLossMonthly, currency)}/mo
                </span>
              </div>
              <p className="mt-1 text-[11px] text-[#6E5D54]">
                Based on $15 dispute fee per contested charge at {disputeRate}% incident frequency on {formatCurrency(monthlyVolume, currency)} monthly volume.
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <PdfExportButton
              targetElementId={reportElementId}
              filename={`kazcut-stripe-fees-${currency}-${amount}`}
              calculatorType="stripe"
            />
            <SaveCalculationModal
              calculatorType="stripe"
              currency={currency}
              inputs={parsedInputs}
              results={result}
              defaultTitle={`Stripe ${currency} ${formatCurrency(amount, currency)} Calculation`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

