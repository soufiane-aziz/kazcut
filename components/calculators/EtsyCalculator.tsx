'use client';

import React, { useState, useId } from 'react';
import { calculateEtsy, formatCurrency, formatPercent } from '@/lib/calculations';
import { etsySchema, EtsyInputs } from '@/lib/validations';
import FeeChart from '@/components/FeeChart';
import PdfExportButton from '@/components/PdfExportButton';
import SaveCalculationModal from '@/components/SaveCalculationModal';
import LoadedTemplateBanner from '@/components/LoadedTemplateBanner';
import { useSavedTemplate } from '@/hooks/useSavedTemplate';

interface EtsyCalculatorProps {
  initialCurrency?: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  initialSalePrice?: number;
  initialItemCost?: number;
  initialShippingCharged?: number;
  initialShippingCost?: number;
  initialOffsiteAds?: 'none' | 'standard_15' | 'high_volume_12';
}

export default function EtsyCalculator({
  initialCurrency = 'USD',
  initialSalePrice = 35.0,
  initialItemCost = 10.0,
  initialShippingCharged = 4.5,
  initialShippingCost = 4.0,
  initialOffsiteAds = 'none',
}: EtsyCalculatorProps) {
  const [salePrice, setSalePrice] = useState<number>(initialSalePrice);
  const [shippingCharged, setShippingCharged] = useState<number>(initialShippingCharged);
  const [itemCost, setItemCost] = useState<number>(initialItemCost);
  const [shippingCost, setShippingCost] = useState<number>(initialShippingCost);
  const [quantity, setQuantity] = useState<number>(1);
  const [offsiteAds, setOffsiteAds] = useState<'none' | 'standard_15' | 'high_volume_12'>(initialOffsiteAds);
  const [currency, setCurrency] = useState<EtsyInputs['currency']>(initialCurrency);

  // Payment processing rates
  const [paymentPercent, setPaymentPercent] = useState<number>(3.0);
  const [paymentFixed, setPaymentFixed] = useState<number>(0.25);
  const [regulatoryFeePercent, setRegulatoryFeePercent] = useState<number>(0);

  const { loadedTemplateTitle, dismissLoadedTemplate } = useSavedTemplate({
    calculatorType: 'etsy',
    schema: etsySchema,
    onApply: (inputs) => {
      setSalePrice(inputs.salePrice);
      setShippingCharged(inputs.shippingCharged);
      setItemCost(inputs.itemCost);
      setShippingCost(inputs.shippingCost);
      setQuantity(inputs.quantity);
      setOffsiteAds(inputs.offsiteAds);
      setPaymentPercent(inputs.paymentProcessingPercent);
      setPaymentFixed(inputs.paymentProcessingFixed);
      setRegulatoryFeePercent(inputs.regulatoryOperatingFeePercent);
      setCurrency(inputs.currency);
    },
  });

  const containerId = useId().replace(/:/g, '');
  const reportElementId = `etsy-report-${containerId}`;

  const parsedInputs: EtsyInputs = etsySchema.parse({
    salePrice: isNaN(salePrice) || salePrice <= 0 ? 0.01 : salePrice,
    shippingCharged: isNaN(shippingCharged) || shippingCharged < 0 ? 0 : shippingCharged,
    itemCost: isNaN(itemCost) || itemCost < 0 ? 0 : itemCost,
    shippingCost: isNaN(shippingCost) || shippingCost < 0 ? 0 : shippingCost,
    quantity: isNaN(quantity) || quantity < 1 ? 1 : Math.round(quantity),
    offsiteAds,
    paymentProcessingPercent: paymentPercent,
    paymentProcessingFixed: paymentFixed,
    regulatoryOperatingFeePercent: regulatoryFeePercent,
    currency,
  });

  const result = calculateEtsy(parsedInputs);

  return (
    <div className="space-y-8">
      <LoadedTemplateBanner title={loadedTemplateTitle} onDismiss={dismissLoadedTemplate} />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Input Form */}
        <div className="rounded-xl border border-[#E7DFCC] bg-white p-6 box-card lg:col-span-6">
          <div className="flex items-center justify-between border-b border-[#EFEAD8] pb-4">
            <h2 className="text-sm font-semibold tracking-tight text-[#2C221E]">
              Listing & Cost Parameters
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
              <option value="AUD">AUD (AU$)</option>
            </select>
          </div>

          <div className="mt-6 space-y-5">
            {/* Sale Price & Quantity */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-[#6E5D54]">
                  Item Sale Price ({currency})
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.1"
                  value={salePrice || ''}
                  onChange={(e) => setSalePrice(parseFloat(e.target.value) || 0)}
                  className="mt-1.5 w-full rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] px-3.5 py-2 font-mono text-xs font-medium text-[#2C221E] focus:border-[#C58842] focus:outline-hidden"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#6E5D54]">
                  Quantity Sold
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
                  className="mt-1.5 w-full rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] px-3.5 py-2 font-mono text-xs font-medium text-[#2C221E] focus:border-[#C58842] focus:outline-hidden"
                />
              </div>
            </div>

            {/* Shipping Charged vs Shipping Actual Cost */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-[#6E5D54]">
                  Shipping Charged to Buyer
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={shippingCharged || ''}
                  onChange={(e) => setShippingCharged(parseFloat(e.target.value) || 0)}
                  className="mt-1.5 w-full rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] px-3.5 py-2 font-mono text-xs text-[#2C221E] focus:border-[#C58842] focus:outline-hidden"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#6E5D54]">
                  Actual Shipping Cost to Ship
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={shippingCost || ''}
                  onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                  className="mt-1.5 w-full rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] px-3.5 py-2 font-mono text-xs text-[#2C221E] focus:border-[#C58842] focus:outline-hidden"
                />
              </div>
            </div>

            {/* Item Production Cost (COGS) */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-[#6E5D54]">
                  Item Production Cost / Materials
                </label>
                <span className="font-mono text-xs font-semibold text-[#2C221E]">
                  {formatCurrency(itemCost, currency)}
                </span>
              </div>
              <input
                type="number"
                step="0.01"
                min="0"
                value={itemCost || ''}
                onChange={(e) => setItemCost(parseFloat(e.target.value) || 0)}
                className="mt-1.5 w-full rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] px-3.5 py-2 font-mono text-xs text-[#2C221E] focus:border-[#C58842] focus:outline-hidden"
              />
            </div>

            {/* Offsite Ads Setting */}
            <div className="rounded-lg border border-[#EFEAD8] bg-[#FAF5EE] p-4">
              <label className="block text-xs font-semibold text-[#2C221E]">
                Etsy Offsite Ads Fee
              </label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setOffsiteAds('none')}
                  className={`rounded-md border p-2 text-center text-xs transition ${
                    offsiteAds === 'none'
                      ? 'border-[#C58842] bg-white font-semibold text-[#2C221E]'
                      : 'border-[#EFEAD8] text-[#6E5D54] hover:bg-white'
                  }`}
                >
                  None (0%)
                </button>
                <button
                  type="button"
                  onClick={() => setOffsiteAds('standard_15')}
                  className={`rounded-md border p-2 text-center text-xs transition ${
                    offsiteAds === 'standard_15'
                      ? 'border-[#C58842] bg-white font-semibold text-[#2C221E]'
                      : 'border-[#EFEAD8] text-[#6E5D54] hover:bg-white'
                  }`}
                >
                  Standard (15%)
                </button>
                <button
                  type="button"
                  onClick={() => setOffsiteAds('high_volume_12')}
                  className={`rounded-md border p-2 text-center text-xs transition ${
                    offsiteAds === 'high_volume_12'
                      ? 'border-[#C58842] bg-white font-semibold text-[#2C221E]'
                      : 'border-[#EFEAD8] text-[#6E5D54] hover:bg-white'
                  }`}
                >
                  High Vol (12%)
                </button>
              </div>
            </div>

            {/* Detailed Fee Parameters Accordion/Toggle */}
            <div className="border-t border-[#EFEAD8] pt-4">
              <span className="text-xs font-semibold text-[#2C221E]">
                Payment Processing & Regulatory Rates
              </span>
              <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[11px] text-[#6E5D54]">Payment % Rate</label>
                  <input
                    type="number"
                    step="0.1"
                    value={paymentPercent}
                    onChange={(e) => setPaymentPercent(parseFloat(e.target.value) || 0)}
                    className="mt-1 w-full rounded-md border border-[#EFEAD8] bg-[#FDFBF7] px-3 py-1.5 font-mono text-xs text-[#2C221E]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#6E5D54]">Fixed Fee ({currency})</label>
                  <input
                    type="number"
                    step="0.01"
                    value={paymentFixed}
                    onChange={(e) => setPaymentFixed(parseFloat(e.target.value) || 0)}
                    className="mt-1 w-full rounded-md border border-[#EFEAD8] bg-[#FDFBF7] px-3 py-1.5 font-mono text-xs text-[#2C221E]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Calculations & Visuals */}
        <div className="space-y-6 lg:col-span-6">
          <div
            id={reportElementId}
            className="rounded-xl border border-[#E7DFCC] bg-white p-6 box-card"
          >
            <div className="flex items-center justify-between border-b border-[#EFEAD8] pb-4">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C58842]">
                  Net Profit Summary
                </span>
                <h3 className="text-base font-semibold text-[#2C221E]">
                  Take-Home Profit
                </h3>
              </div>
              <div className="text-right">
                <span className="font-mono text-2xl font-bold tracking-tight text-[#C58842]">
                  {formatCurrency(result.netProfit, currency)}
                </span>
                <div className="text-[10px] text-[#6E5D54]">
                  Margin: {formatPercent(result.profitMarginPercent)} | ROI: {formatPercent(result.roiPercent)}
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-[#FAF5EE] p-3 text-xs leading-relaxed text-[#6E5D54]">
              Gross revenue of <strong className="font-mono text-[#2C221E]">{formatCurrency(result.grossRevenue, currency)}</strong> minus{' '}
              <strong className="font-mono text-[#2C221E]">{formatCurrency(result.totalPlatformFees, currency)}</strong> in Etsy fees and{' '}
              <strong className="font-mono text-[#2C221E]">{formatCurrency(result.totalProductCosts, currency)}</strong> in COGS leaves a net profit of{' '}
              <strong className="font-mono text-[#C58842]">{formatCurrency(result.netProfit, currency)}</strong>.
            </div>

            {/* Dynamic Breakdown Chart */}
            <div className="mt-6">
              <FeeChart
                grossAmount={result.grossRevenue}
                totalFees={result.totalPlatformFees}
                netPayout={result.netProfit}
                currency={currency}
                slices={result.breakdown}
                feeLabel="Etsy Fees"
                netLabel="Net Profit"
              />
            </div>

            {/* Side-by-Side Breakdown Table */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2C221E]">
                Cost & Fee Itemization
              </h4>
              <div className="mt-3 overflow-hidden rounded-lg border border-[#EFEAD8]">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-[#EFEAD8] bg-[#FAF5EE] font-medium text-[#6E5D54]">
                    <tr>
                      <th className="px-3.5 py-2.5">Category</th>
                      <th className="px-3.5 py-2.5 text-right">Calculation</th>
                      <th className="px-3.5 py-2.5 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFEAD8] bg-white font-mono">
                    <tr>
                      <td className="px-3.5 py-2.5 font-sans text-[#2C221E]">Gross Revenue</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">Item + Shipping</td>
                      <td className="px-3.5 py-2.5 text-right font-semibold text-[#2C221E]">
                        {formatCurrency(result.grossRevenue, currency)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3.5 py-2.5 font-sans text-[#2C221E]">Etsy Listing Fee</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">{formatCurrency(0.20, currency)} × {quantity}</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">
                        -{formatCurrency(result.listingFees, currency)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3.5 py-2.5 font-sans text-[#2C221E]">Transaction Fee</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">6.50%</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">
                        -{formatCurrency(result.transactionFees, currency)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3.5 py-2.5 font-sans text-[#2C221E]">Payment Processing</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">
                        {paymentPercent}% + {formatCurrency(paymentFixed, currency)}
                      </td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">
                        -{formatCurrency(result.paymentProcessingFees, currency)}
                      </td>
                    </tr>
                    {result.offsiteAdsFees > 0 && (
                      <tr>
                        <td className="px-3.5 py-2.5 font-sans text-[#2C221E]">Offsite Ads Fee</td>
                        <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">{offsiteAds === 'standard_15' ? '15%' : '12%'}</td>
                        <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">
                          -{formatCurrency(result.offsiteAdsFees, currency)}
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td className="px-3.5 py-2.5 font-sans text-[#2C221E]">Total COGS & Shipping</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">Production + Delivery</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">
                        -{formatCurrency(result.totalProductCosts, currency)}
                      </td>
                    </tr>
                    <tr className="bg-[#FAF5EE]">
                      <td className="px-3.5 py-2.5 font-sans font-semibold text-[#2C221E]">Net Take-Home Profit</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">
                        {formatPercent(result.profitMarginPercent)}
                      </td>
                      <td className="px-3.5 py-2.5 text-right font-bold text-[#C58842]">
                        {formatCurrency(result.netProfit, currency)}
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
              filename={`kazcut-etsy-profit-${currency}-${salePrice}`}
              calculatorType="etsy"
            />
            <SaveCalculationModal
              calculatorType="etsy"
              currency={currency}
              inputs={parsedInputs}
              results={result}
              defaultTitle={`Etsy ${formatCurrency(salePrice, currency)} Listing Profit Calculation`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

