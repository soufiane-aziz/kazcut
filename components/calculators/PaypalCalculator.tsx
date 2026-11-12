'use client';

import React, { useState, useId } from 'react';
import {
  calculatePaypal,
  formatCurrency,
  formatPercent,
  PAYPAL_RATE_PRESETS,
  PAYPAL_FIXED_FEES,
} from '@/lib/calculations';
import { paypalSchema, PaypalInputs } from '@/lib/validations';
import FeeChart from '@/components/FeeChart';
import PdfExportButton from '@/components/PdfExportButton';
import SaveCalculationModal from '@/components/SaveCalculationModal';

interface PaypalCalculatorProps {
  initialCurrency?: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY';
  initialRateType?: 'standard' | 'international' | 'invoicing' | 'qr' | 'micropayment';
  initialAmount?: number;
}

export default function PaypalCalculator({
  initialCurrency = 'USD',
  initialRateType = 'standard',
  initialAmount = 100,
}: PaypalCalculatorProps) {
  const [amount, setAmount] = useState<number>(initialAmount);
  const [mode, setMode] = useState<'receive' | 'send'>('receive');
  const [rateType, setRateType] = useState<PaypalInputs['rateType']>(initialRateType);
  const [currency, setCurrency] = useState<PaypalInputs['currency']>(initialCurrency);
  const [useCustomRate, setUseCustomRate] = useState(false);
  const [customPercentage, setCustomPercentage] = useState(2.99);
  const [customFixedFee, setCustomFixedFee] = useState(0.49);

  const containerId = useId().replace(/:/g, '');
  const reportElementId = `paypal-report-${containerId}`;

  // Safe input validation
  const parsedInputs: PaypalInputs = paypalSchema.parse({
    amount: isNaN(amount) || amount <= 0 ? 0.01 : amount,
    mode,
    rateType,
    currency,
    customPercentage: useCustomRate ? customPercentage : undefined,
    customFixedFee: useCustomRate ? customFixedFee : undefined,
  });

  const result = calculatePaypal(parsedInputs);

  // Quick comparison tiers
  const comparisonTiers = [25, 50, 100, 250, 500, 1000];

  return (
    <div className="space-y-8">
      {/* Interactive Controls & Output Container */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Inputs & Sliders */}
        <div className="rounded-xl border border-[#E7DFCC] bg-white p-6 box-card lg:col-span-6">
          <div className="flex items-center justify-between border-b border-[#EFEAD8] pb-4">
            <h2 className="text-sm font-semibold tracking-tight text-[#2C221E]">
              Calculator Settings
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
                I am invoicing
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Amount Input with Live Slider */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-[#6E5D54]">
                  {mode === 'receive' ? 'Desired Net Amount' : 'Invoice / Charge Amount'}
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
                    max="100000"
                    step="any"
                    value={amount || ''}
                    onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] px-3.5 py-2 font-mono text-sm font-medium text-[#2C221E] focus:border-[#C58842] focus:outline-hidden"
                  />
                </div>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as any)}
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

              {/* Slider */}
              <input
                type="range"
                min="5"
                max="2500"
                step="5"
                value={Math.min(2500, amount || 0)}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                className="mt-3 w-full cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#9B8C83]">
                <span>{formatCurrency(5, currency)}</span>
                <span>{formatCurrency(500, currency)}</span>
                <span>{formatCurrency(1000, currency)}</span>
                <span>{formatCurrency(2500, currency)}+</span>
              </div>
            </div>

            {/* Rate Type Selection */}
            <div>
              <label className="text-xs font-medium text-[#6E5D54]">
                Transaction Fee Tier
              </label>
              <div className="mt-2 grid grid-cols-1 gap-2">
                {(Object.keys(PAYPAL_RATE_PRESETS) as (keyof typeof PAYPAL_RATE_PRESETS)[]).map((key) => {
                  const preset = PAYPAL_RATE_PRESETS[key];
                  const isSelected = !useCustomRate && rateType === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setUseCustomRate(false);
                        setRateType(key);
                      }}
                      className={`flex items-center justify-between rounded-lg border p-3 text-left transition ${
                        isSelected
                          ? 'border-[#C58842] bg-[#FAF5EE] text-[#2C221E]'
                          : 'border-[#EFEAD8] bg-white text-[#6E5D54] hover:bg-[#FDFBF7]'
                      }`}
                    >
                      <span className="text-xs font-medium">{preset.label}</span>
                      <span className="font-mono text-xs font-semibold text-[#2C221E]">
                        {preset.percent}%
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Rate Toggle */}
            <div className="border-t border-[#EFEAD8] pt-4">
              <button
                type="button"
                onClick={() => setUseCustomRate(!useCustomRate)}
                className="text-xs font-medium text-[#C58842] hover:underline"
              >
                {useCustomRate ? 'Use standard rate presets' : 'Customize fee percentage and fixed fee manually'}
              </button>

              {useCustomRate && (
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-[#6E5D54]">
                      Percentage Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={customPercentage}
                      onChange={(e) => setCustomPercentage(parseFloat(e.target.value) || 0)}
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
          </div>
        </div>

        {/* Right Column: Results & Real-time Chart */}
        <div className="space-y-6 lg:col-span-6">
          {/* Printable Report Wrapper */}
          <div
            id={reportElementId}
            className="rounded-xl border border-[#E7DFCC] bg-white p-6 box-card"
          >
            <div className="flex items-center justify-between border-b border-[#EFEAD8] pb-4">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C58842]">
                  Calculation Result
                </span>
                <h3 className="text-base font-semibold text-[#2C221E]">
                  {mode === 'receive' ? 'Required Invoice Total' : 'Net Bank Payout'}
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

            {/* Micro Breakdown Alert */}
            <div className="mt-4 rounded-lg bg-[#FAF5EE] p-3 text-xs leading-relaxed text-[#6E5D54]">
              {mode === 'receive' ? (
                <>
                  To net <strong className="font-mono text-[#2C221E]">{formatCurrency(amount, currency)}</strong>, you must invoice{' '}
                  <strong className="font-mono text-[#C58842]">{formatCurrency(result.grossAmount, currency)}</strong>. PayPal will deduct{' '}
                  <strong className="font-mono text-[#2C221E]">{formatCurrency(result.totalFee, currency)}</strong> in fees.
                </>
              ) : (
                <>
                  On a charge of <strong className="font-mono text-[#2C221E]">{formatCurrency(amount, currency)}</strong>, PayPal will deduct{' '}
                  <strong className="font-mono text-[#2C221E]">{formatCurrency(result.totalFee, currency)}</strong> in fees, leaving a net deposit of{' '}
                  <strong className="font-mono text-[#C58842]">{formatCurrency(result.netPayout, currency)}</strong>.
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
                feeLabel="PayPal Fee"
                netLabel="Net Payout"
              />
            </div>

            {/* Side-by-Side Breakdown Table */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2C221E]">
                Detailed Fee Itemization
              </h4>
              <div className="mt-3 overflow-hidden rounded-lg border border-[#EFEAD8]">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-[#EFEAD8] bg-[#FAF5EE] font-medium text-[#6E5D54]">
                    <tr>
                      <th className="px-3.5 py-2.5">Line Item</th>
                      <th className="px-3.5 py-2.5 text-right">Calculation</th>
                      <th className="px-3.5 py-2.5 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFEAD8] bg-white font-mono">
                    <tr>
                      <td className="px-3.5 py-2.5 font-sans text-[#2C221E]">Gross Transaction</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">Total Billed</td>
                      <td className="px-3.5 py-2.5 text-right font-semibold text-[#2C221E]">
                        {formatCurrency(result.grossAmount, currency)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3.5 py-2.5 font-sans text-[#2C221E]">Percentage Fee</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">
                        {useCustomRate ? `${customPercentage}%` : `${PAYPAL_RATE_PRESETS[rateType].percent}%`}
                      </td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">
                        -{formatCurrency(result.feePercentageAmount, currency)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3.5 py-2.5 font-sans text-[#2C221E]">Fixed Transaction Fee</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">Per transaction</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">
                        -{formatCurrency(result.fixedFeeAmount, currency)}
                      </td>
                    </tr>
                    <tr className="bg-[#FDFBF7]">
                      <td className="px-3.5 py-2.5 font-sans font-semibold text-[#2C221E]">Total PayPal Deductions</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">
                        {formatPercent(result.effectiveRatePercent)}
                      </td>
                      <td className="px-3.5 py-2.5 text-right font-semibold text-[#A86E31]">
                        -{formatCurrency(result.totalFee, currency)}
                      </td>
                    </tr>
                    <tr className="bg-[#FAF5EE]">
                      <td className="px-3.5 py-2.5 font-sans font-semibold text-[#2C221E]">Net Deposited to Bank</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">Take-Home</td>
                      <td className="px-3.5 py-2.5 text-right font-bold text-[#C58842]">
                        {formatCurrency(result.netPayout, currency)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Action Row: PDF Export & Save Template */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <PdfExportButton
              targetElementId={reportElementId}
              filename={`kazcut-paypal-fees-${currency}-${amount}`}
              calculatorType="paypal"
            />
            <SaveCalculationModal
              calculatorType="paypal"
              currency={currency}
              inputs={parsedInputs}
              results={result}
              defaultTitle={`PayPal ${currency} ${formatCurrency(amount, currency)} Calculation`}
            />
          </div>
        </div>
      </div>

      {/* Comparison Reference Matrix */}
      <div className="rounded-xl border border-[#E7DFCC] bg-white p-6 box-card">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#2C221E]">
          Volume Reference Matrix ({currency})
        </h3>
        <p className="mt-1 text-xs text-[#6E5D54]">
          Quick reference table for standard PayPal transaction amounts under selected fee tier.
        </p>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#EFEAD8] bg-[#FAF5EE] text-[#6E5D54]">
              <tr>
                <th className="px-4 py-2 font-medium">Billed Amount</th>
                <th className="px-4 py-2 font-medium">PayPal Fee</th>
                <th className="px-4 py-2 font-medium">Net Payout</th>
                <th className="px-4 py-2 font-medium">Effective Fee %</th>
                <th className="px-4 py-2 font-medium">To Net This Exact Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFEAD8] font-mono">
              {comparisonTiers.map((tier) => {
                const sendingRes = calculatePaypal({
                  amount: tier,
                  mode: 'send',
                  rateType,
                  currency,
                  customPercentage: useCustomRate ? customPercentage : undefined,
                  customFixedFee: useCustomRate ? customFixedFee : undefined,
                });
                const receivingRes = calculatePaypal({
                  amount: tier,
                  mode: 'receive',
                  rateType,
                  currency,
                  customPercentage: useCustomRate ? customPercentage : undefined,
                  customFixedFee: useCustomRate ? customFixedFee : undefined,
                });

                return (
                  <tr key={tier} className="hover:bg-[#FDFBF7]">
                    <td className="px-4 py-2 font-semibold text-[#2C221E]">
                      {formatCurrency(tier, currency)}
                    </td>
                    <td className="px-4 py-2 text-[#6E5D54]">
                      {formatCurrency(sendingRes.totalFee, currency)}
                    </td>
                    <td className="px-4 py-2 font-medium text-[#2C221E]">
                      {formatCurrency(sendingRes.netPayout, currency)}
                    </td>
                    <td className="px-4 py-2 text-[#6E5D54]">
                      {formatPercent(sendingRes.effectiveRatePercent)}
                    </td>
                    <td className="px-4 py-2 font-semibold text-[#C58842]">
                      Invoice {formatCurrency(receivingRes.grossAmount, currency)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

