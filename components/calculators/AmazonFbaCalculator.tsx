'use client';

import React, { useState, useId } from 'react';
import {
  calculateAmazonFba,
  formatCurrency,
  formatPercent,
  FBA_TIER_FEES,
} from '@/lib/calculations';
import { amazonFbaSchema, AmazonFbaInputs } from '@/lib/validations';
import FeeChart from '@/components/FeeChart';
import PdfExportButton from '@/components/PdfExportButton';
import SaveCalculationModal from '@/components/SaveCalculationModal';

interface AmazonFbaCalculatorProps {
  initialCurrency?: 'USD' | 'EUR' | 'GBP' | 'CAD';
  initialItemPrice?: number;
  initialCogs?: number;
  initialInboundShipping?: number;
  initialReferralRate?: number;
  initialFbaTier?: AmazonFbaInputs['fbaTier'];
}

export default function AmazonFbaCalculator({
  initialCurrency = 'USD',
  initialItemPrice = 29.99,
  initialCogs = 6.50,
  initialInboundShipping = 1.25,
  initialReferralRate = 15,
  initialFbaTier = 'large_standard_under_1lb',
}: AmazonFbaCalculatorProps) {
  const [itemPrice, setItemPrice] = useState<number>(initialItemPrice);
  const [cogs, setCogs] = useState<number>(initialCogs);
  const [inboundShipping, setInboundShipping] = useState<number>(initialInboundShipping);
  const [category, setCategory] = useState<string>('Home & Kitchen');
  const [referralRate, setReferralRate] = useState<number>(initialReferralRate);
  const [fbaTier, setFbaTier] = useState<AmazonFbaInputs['fbaTier']>(initialFbaTier);
  const [customFbaFee, setCustomFbaFee] = useState<number>(4.25);
  const [storageMonths, setStorageMonths] = useState<number>(1);
  const [storagePerUnit, setStoragePerUnit] = useState<number>(0.25);
  const [salesVelocity, setSalesVelocity] = useState<number>(350);
  const [currency, setCurrency] = useState<AmazonFbaInputs['currency']>(initialCurrency);

  const containerId = useId().replace(/:/g, '');
  const reportElementId = `amazon-report-${containerId}`;

  const parsedInputs: AmazonFbaInputs = amazonFbaSchema.parse({
    itemPrice: isNaN(itemPrice) || itemPrice <= 0 ? 0.01 : itemPrice,
    cogs: isNaN(cogs) || cogs < 0 ? 0 : cogs,
    inboundShipping: isNaN(inboundShipping) || inboundShipping < 0 ? 0 : inboundShipping,
    category,
    referralRatePercent: referralRate,
    fbaTier,
    customFbaFee: fbaTier === 'custom' ? customFbaFee : undefined,
    monthlyStorageMonths: storageMonths,
    estimatedStoragePerUnit: storagePerUnit,
    salesVelocityPerMonth: isNaN(salesVelocity) || salesVelocity < 1 ? 1 : Math.round(salesVelocity),
    currency,
  });

  const result = calculateAmazonFba(parsedInputs);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Input Form */}
        <div className="rounded-xl border border-[#E7DFCC] bg-white p-6 box-card lg:col-span-6">
          <div className="flex items-center justify-between border-b border-[#EFEAD8] pb-4">
            <h2 className="text-sm font-semibold tracking-tight text-[#2C221E]">
              Product Economics & Logistics
            </h2>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as any)}
              className="rounded-lg border border-[#EFEAD8] bg-[#FAF5EE] px-2.5 py-1 text-xs font-medium text-[#2C221E] focus:outline-hidden"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CAD">CAD (CA$)</option>
            </select>
          </div>

          <div className="mt-6 space-y-5">
            {/* Price & COGS */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-[#6E5D54]">
                  Retail Price ({currency})
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={itemPrice || ''}
                  onChange={(e) => setItemPrice(parseFloat(e.target.value) || 0)}
                  className="mt-1.5 w-full rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] px-3.5 py-2 font-mono text-xs font-medium text-[#2C221E] focus:border-[#C58842] focus:outline-hidden"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#6E5D54]">
                  Product Cost (COGS)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={cogs || ''}
                  onChange={(e) => setCogs(parseFloat(e.target.value) || 0)}
                  className="mt-1.5 w-full rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] px-3.5 py-2 font-mono text-xs font-medium text-[#2C221E] focus:border-[#C58842] focus:outline-hidden"
                />
              </div>
            </div>

            {/* Inbound Shipping & Monthly Sales Velocity */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-[#6E5D54]">
                  Inbound Freight / Unit
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={inboundShipping || ''}
                  onChange={(e) => setInboundShipping(parseFloat(e.target.value) || 0)}
                  className="mt-1.5 w-full rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] px-3.5 py-2 font-mono text-xs text-[#2C221E] focus:border-[#C58842] focus:outline-hidden"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#6E5D54]">
                  Units Sold / Month
                </label>
                <input
                  type="number"
                  min="1"
                  step="10"
                  value={salesVelocity}
                  onChange={(e) => setSalesVelocity(parseInt(e.target.value, 10) || 1)}
                  className="mt-1.5 w-full rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] px-3.5 py-2 font-mono text-xs text-[#2C221E] focus:border-[#C58842] focus:outline-hidden"
                />
              </div>
            </div>

            {/* FBA Fulfillment Tier Selection */}
            <div>
              <label className="text-xs font-medium text-[#6E5D54]">
                FBA Size Tier & Fulfillment Fee
              </label>
              <select
                value={fbaTier}
                onChange={(e) => setFbaTier(e.target.value as any)}
                className="mt-1.5 w-full rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] px-3 py-2 text-xs font-medium text-[#2C221E] focus:border-[#C58842] focus:outline-hidden"
              >
                <option value="small_standard">Small standard (under 16 oz) - {formatCurrency(FBA_TIER_FEES.small_standard, currency)}</option>
                <option value="large_standard_under_1lb">Large standard (under 1 lb) - {formatCurrency(FBA_TIER_FEES.large_standard_under_1lb, currency)}</option>
                <option value="large_standard_over_1lb">Large standard (1 to 2 lb) - {formatCurrency(FBA_TIER_FEES.large_standard_over_1lb, currency)}</option>
                <option value="small_oversize">Small oversize - {formatCurrency(FBA_TIER_FEES.small_oversize, currency)}</option>
                <option value="custom">Custom fulfillment fee override</option>
              </select>

              {fbaTier === 'custom' && (
                <div className="mt-2">
                  <label className="text-[11px] text-[#6E5D54]">Custom FBA Fee per unit ({currency})</label>
                  <input
                    type="number"
                    step="0.01"
                    value={customFbaFee}
                    onChange={(e) => setCustomFbaFee(parseFloat(e.target.value) || 0)}
                    className="mt-1 w-full rounded-md border border-[#EFEAD8] bg-[#FDFBF7] px-3 py-1.5 font-mono text-xs text-[#2C221E]"
                  />
                </div>
              )}
            </div>

            {/* Referral Fee & Storage Parameters */}
            <div className="grid grid-cols-2 gap-3 border-t border-[#EFEAD8] pt-4">
              <div>
                <label className="text-xs font-medium text-[#6E5D54]">
                  Referral Fee (%)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={referralRate}
                  onChange={(e) => setReferralRate(parseFloat(e.target.value) || 0)}
                  className="mt-1 w-full rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] px-3 py-1.5 font-mono text-xs text-[#2C221E] focus:border-[#C58842] focus:outline-hidden"
                />
                <span className="text-[10px] text-[#9B8C83]">Standard rate: 15%</span>
              </div>
              <div>
                <label className="text-xs font-medium text-[#6E5D54]">
                  Storage Months
                </label>
                <input
                  type="number"
                  min="0"
                  max="12"
                  value={storageMonths}
                  onChange={(e) => setStorageMonths(parseFloat(e.target.value) || 0)}
                  className="mt-1 w-full rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] px-3 py-1.5 font-mono text-xs text-[#2C221E] focus:border-[#C58842] focus:outline-hidden"
                />
                <span className="text-[10px] text-[#9B8C83]">~{formatCurrency(storagePerUnit, currency)}/mo/unit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Calculations & Projections */}
        <div className="space-y-6 lg:col-span-6">
          <div
            id={reportElementId}
            className="rounded-xl border border-[#E7DFCC] bg-white p-6 box-card"
          >
            <div className="flex items-center justify-between border-b border-[#EFEAD8] pb-4">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C58842]">
                  Unit Economics
                </span>
                <h3 className="text-base font-semibold text-[#2C221E]">
                  Net Profit per Unit
                </h3>
              </div>
              <div className="text-right">
                <span className="font-mono text-2xl font-bold tracking-tight text-[#C58842]">
                  {formatCurrency(result.netProfitPerUnit, currency)}
                </span>
                <div className="text-[10px] text-[#6E5D54]">
                  Margin: {formatPercent(result.netMarginPercent)} | ROI: {formatPercent(result.roiPercent)}
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-[#FAF5EE] p-3 text-xs leading-relaxed text-[#6E5D54]">
              For a retail price of <strong className="font-mono text-[#2C221E]">{formatCurrency(itemPrice, currency)}</strong>, total Amazon fees equal{' '}
              <strong className="font-mono text-[#2C221E]">{formatCurrency(result.totalAmazonFeesPerUnit, currency)}</strong>. After product cost ({formatCurrency(result.totalCostPerUnit, currency)}), net take-home is{' '}
              <strong className="font-mono text-[#C58842]">{formatCurrency(result.netProfitPerUnit, currency)}</strong> per unit.
            </div>

            {/* Dynamic Breakdown Chart */}
            <div className="mt-6">
              <FeeChart
                grossAmount={result.itemPrice}
                totalFees={result.totalAmazonFeesPerUnit}
                netPayout={result.netProfitPerUnit}
                currency={currency}
                slices={result.breakdown}
                feeLabel="Amazon Fees"
                netLabel="Net Margin"
              />
            </div>

            {/* Monthly Projections Grid */}
            <div className="mt-6 grid grid-cols-3 gap-2 border-t border-[#EFEAD8] pt-4">
              <div className="rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] p-2.5 text-center">
                <div className="text-[10px] font-medium text-[#6E5D54]">Monthly Gross</div>
                <div className="mt-1 font-mono text-xs font-semibold text-[#2C221E]">
                  {formatCurrency(result.monthlyRevenue, currency)}
                </div>
              </div>
              <div className="rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] p-2.5 text-center">
                <div className="text-[10px] font-medium text-[#6E5D54]">Amazon Cut</div>
                <div className="mt-1 font-mono text-xs font-semibold text-[#6E5D54]">
                  {formatCurrency(result.monthlyAmazonFees, currency)}
                </div>
              </div>
              <div className="rounded-lg border border-[#E8DFC9] bg-[#FAF5EE] p-2.5 text-center">
                <div className="text-[10px] font-medium text-[#A86E31]">Monthly Net Profit</div>
                <div className="mt-1 font-mono text-xs font-semibold text-[#C58842]">
                  {formatCurrency(result.monthlyNetProfit, currency)}
                </div>
              </div>
            </div>

            {/* Side-by-Side Breakdown Table */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2C221E]">
                Per Unit Itemization
              </h4>
              <div className="mt-3 overflow-hidden rounded-lg border border-[#EFEAD8]">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-[#EFEAD8] bg-[#FAF5EE] font-medium text-[#6E5D54]">
                    <tr>
                      <th className="px-3.5 py-2.5">Component</th>
                      <th className="px-3.5 py-2.5 text-right">Calculation</th>
                      <th className="px-3.5 py-2.5 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFEAD8] bg-white font-mono">
                    <tr>
                      <td className="px-3.5 py-2.5 font-sans text-[#2C221E]">Retail Price</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">Listing</td>
                      <td className="px-3.5 py-2.5 text-right font-semibold text-[#2C221E]">
                        {formatCurrency(result.itemPrice, currency)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3.5 py-2.5 font-sans text-[#2C221E]">Referral Fee</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">{referralRate}%</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">
                        -{formatCurrency(result.referralFeePerUnit, currency)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3.5 py-2.5 font-sans text-[#2C221E]">FBA Fulfillment</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">Tier pick & pack</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">
                        -{formatCurrency(result.fulfillmentFeePerUnit, currency)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3.5 py-2.5 font-sans text-[#2C221E]">Storage Fee</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">{storageMonths} month(s)</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">
                        -{formatCurrency(result.storageFeePerUnit, currency)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3.5 py-2.5 font-sans text-[#2C221E]">Product COGS & Inbound</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">Manufacturing + Freight</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">
                        -{formatCurrency(result.totalCostPerUnit, currency)}
                      </td>
                    </tr>
                    <tr className="bg-[#FAF5EE]">
                      <td className="px-3.5 py-2.5 font-sans font-semibold text-[#2C221E]">Net Profit Margin</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">
                        {formatPercent(result.netMarginPercent)}
                      </td>
                      <td className="px-3.5 py-2.5 text-right font-bold text-[#C58842]">
                        {formatCurrency(result.netProfitPerUnit, currency)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <PdfExportButton
              targetElementId={reportElementId}
              filename={`kazcut-amazon-fba-margin-${currency}-${itemPrice}`}
              calculatorType="amazon"
            />
            <SaveCalculationModal
              calculatorType="amazon"
              currency={currency}
              inputs={parsedInputs}
              results={result}
              defaultTitle={`Amazon FBA ${formatCurrency(itemPrice, currency)} Unit Profit Calculation`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

