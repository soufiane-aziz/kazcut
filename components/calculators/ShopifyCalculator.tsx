'use client';

import React, { useState, useId } from 'react';
import {
  calculateShopify,
  formatCurrency,
  formatPercent,
  SHOPIFY_PLAN_RATES,
} from '@/lib/calculations';
import { shopifySchema, ShopifyInputs } from '@/lib/validations';
import FeeChart from '@/components/FeeChart';
import PdfExportButton from '@/components/PdfExportButton';
import SaveCalculationModal from '@/components/SaveCalculationModal';
import LoadedTemplateBanner from '@/components/LoadedTemplateBanner';
import { useSavedTemplate } from '@/hooks/useSavedTemplate';

interface ShopifyCalculatorProps {
  initialCurrency?: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  initialRetailPrice?: number;
  initialCogs?: number;
  initialAdSpend?: number;
  initialPlanType?: ShopifyInputs['planType'];
}

export default function ShopifyCalculator({
  initialCurrency = 'USD',
  initialRetailPrice = 59.0,
  initialCogs = 15.0,
  initialAdSpend = 18.0,
  initialPlanType = 'basic',
}: ShopifyCalculatorProps) {
  const [retailPrice, setRetailPrice] = useState<number>(initialRetailPrice);
  const [cogs, setCogs] = useState<number>(initialCogs);
  const [shippingCharged, setShippingCharged] = useState<number>(0);
  const [shippingCost, setShippingCost] = useState<number>(5.50);
  const [adSpendPerOrder, setAdSpendPerOrder] = useState<number>(initialAdSpend);
  const [otherCostsPerOrder, setOtherCostsPerOrder] = useState<number>(2.0);
  const [planType, setPlanType] = useState<ShopifyInputs['planType']>(initialPlanType);
  const [customPercent, setCustomPercent] = useState<number>(2.4);
  const [customFixed, setCustomFixed] = useState<number>(0.25);
  const [monthlyOrders, setMonthlyOrders] = useState<number>(500);
  const [currency, setCurrency] = useState<ShopifyInputs['currency']>(initialCurrency);

  const { loadedTemplateTitle, dismissLoadedTemplate } = useSavedTemplate({
    calculatorType: 'shopify',
    schema: shopifySchema,
    onApply: (inputs) => {
      setRetailPrice(inputs.retailPrice);
      setCogs(inputs.cogs);
      setShippingCharged(inputs.shippingCharged);
      setShippingCost(inputs.shippingCost);
      setAdSpendPerOrder(inputs.adSpendPerOrder);
      setOtherCostsPerOrder(inputs.otherCostsPerOrder);
      setPlanType(inputs.planType);
      if (inputs.customGatewayPercent !== undefined) setCustomPercent(inputs.customGatewayPercent);
      if (inputs.customGatewayFixed !== undefined) setCustomFixed(inputs.customGatewayFixed);
      setMonthlyOrders(inputs.estimatedMonthlyOrders);
      setCurrency(inputs.currency);
    },
  });

  const containerId = useId().replace(/:/g, '');
  const reportElementId = `shopify-report-${containerId}`;

  const parsedInputs: ShopifyInputs = shopifySchema.parse({
    retailPrice: isNaN(retailPrice) || retailPrice <= 0 ? 0.01 : retailPrice,
    cogs: isNaN(cogs) || cogs < 0 ? 0 : cogs,
    shippingCharged: isNaN(shippingCharged) || shippingCharged < 0 ? 0 : shippingCharged,
    shippingCost: isNaN(shippingCost) || shippingCost < 0 ? 0 : shippingCost,
    adSpendPerOrder: isNaN(adSpendPerOrder) || adSpendPerOrder < 0 ? 0 : adSpendPerOrder,
    otherCostsPerOrder: isNaN(otherCostsPerOrder) || otherCostsPerOrder < 0 ? 0 : otherCostsPerOrder,
    planType,
    customGatewayPercent: planType === 'custom' ? customPercent : undefined,
    customGatewayFixed: planType === 'custom' ? customFixed : undefined,
    estimatedMonthlyOrders: isNaN(monthlyOrders) || monthlyOrders < 1 ? 1 : Math.round(monthlyOrders),
    currency,
  });

  const result = calculateShopify(parsedInputs);

  return (
    <div className="space-y-8">
      <LoadedTemplateBanner title={loadedTemplateTitle} onDismiss={dismissLoadedTemplate} />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Input Form */}
        <div className="rounded-xl border border-[#E7DFCC] bg-white p-6 box-card lg:col-span-6">
          <div className="flex items-center justify-between border-b border-[#EFEAD8] pb-4">
            <h2 className="text-sm font-semibold tracking-tight text-[#2C221E]">
              Unit Economics & Marketing Costs
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
            {/* Price & COGS */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-[#6E5D54]">
                  Retail Price ({currency})
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={retailPrice || ''}
                  onChange={(e) => setRetailPrice(parseFloat(e.target.value) || 0)}
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

            {/* Ad Spend CAC & Monthly Orders */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-[#6E5D54]">
                  Ad Spend CAC / Order
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={adSpendPerOrder || ''}
                  onChange={(e) => setAdSpendPerOrder(parseFloat(e.target.value) || 0)}
                  className="mt-1.5 w-full rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] px-3.5 py-2 font-mono text-xs text-[#2C221E] focus:border-[#C58842] focus:outline-hidden"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#6E5D54]">
                  Monthly Orders
                </label>
                <input
                  type="number"
                  min="1"
                  step="50"
                  value={monthlyOrders}
                  onChange={(e) => setMonthlyOrders(parseInt(e.target.value, 10) || 1)}
                  className="mt-1.5 w-full rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] px-3.5 py-2 font-mono text-xs text-[#2C221E] focus:border-[#C58842] focus:outline-hidden"
                />
              </div>
            </div>

            {/* Shipping Details */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-[#6E5D54]">
                  Shipping Charged to Customer
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={shippingCharged || ''}
                  onChange={(e) => setShippingCharged(parseFloat(e.target.value) || 0)}
                  className="mt-1.5 w-full rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] px-3.5 py-2 font-mono text-xs text-[#2C221E] focus:border-[#C58842] focus:outline-hidden"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#6E5D54]">
                  Fulfillment & Postage Cost
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={shippingCost || ''}
                  onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                  className="mt-1.5 w-full rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] px-3.5 py-2 font-mono text-xs text-[#2C221E] focus:border-[#C58842] focus:outline-hidden"
                />
              </div>
            </div>

            {/* Shopify Plan Tier */}
            <div>
              <label className="text-xs font-medium text-[#6E5D54]">
                Shopify Plan (Gateway Rates)
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {(Object.keys(SHOPIFY_PLAN_RATES) as (keyof typeof SHOPIFY_PLAN_RATES)[]).map((key) => {
                  const plan = SHOPIFY_PLAN_RATES[key];
                  const isSelected = planType === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setPlanType(key)}
                      className={`rounded-lg border p-2 text-center text-xs transition ${
                        isSelected
                          ? 'border-[#C58842] bg-[#FAF5EE] font-semibold text-[#2C221E]'
                          : 'border-[#EFEAD8] bg-white text-[#6E5D54] hover:bg-[#FDFBF7]'
                      }`}
                    >
                      <div className="capitalize">{key}</div>
                      <div className="mt-0.5 text-[10px] text-[#6E5D54]">{plan.percent}% + {plan.fixed}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Other Costs */}
            <div>
              <label className="text-xs font-medium text-[#6E5D54]">
                Packaging & Other Operating Expenses per Order
              </label>
              <input
                type="number"
                step="0.1"
                value={otherCostsPerOrder || ''}
                onChange={(e) => setOtherCostsPerOrder(parseFloat(e.target.value) || 0)}
                className="mt-1.5 w-full rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] px-3.5 py-2 font-mono text-xs text-[#2C221E] focus:border-[#C58842] focus:outline-hidden"
              />
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
                  Order Profitability
                </span>
                <h3 className="text-base font-semibold text-[#2C221E]">
                  Net Profit per Order
                </h3>
              </div>
              <div className="text-right">
                <span className={`font-mono text-2xl font-bold tracking-tight ${result.netProfitPerOrder >= 0 ? 'text-[#C58842]' : 'text-[#B43428]'}`}>
                  {formatCurrency(result.netProfitPerOrder, currency)}
                </span>
                <div className="text-[10px] text-[#6E5D54]">
                  Net Margin: {formatPercent(result.netMarginPercent)}
                </div>
              </div>
            </div>

            {/* Break-Even CAC Callout */}
            <div className="mt-4 rounded-lg bg-[#FAF5EE] p-3 text-xs leading-relaxed text-[#6E5D54]">
              Maximum allowable ad spend (Break-Even CAC) is{' '}
              <strong className="font-mono text-[#2C221E]">{formatCurrency(result.breakEvenCac, currency)}</strong>. Spending above this threshold on first-order acquisition will result in negative transaction profit.
            </div>

            {/* Dynamic Breakdown Chart */}
            <div className="mt-6">
              <FeeChart
                grossAmount={result.orderGross}
                totalFees={result.totalExpenses - result.netProfitPerOrder}
                netPayout={Math.max(0, result.netProfitPerOrder)}
                currency={currency}
                slices={result.breakdown}
                feeLabel="Expenses & Fees"
                netLabel="Net Profit"
              />
            </div>

            {/* Monthly Forecast Cards */}
            <div className="mt-6 grid grid-cols-3 gap-2 border-t border-[#EFEAD8] pt-4">
              <div className="rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] p-2.5 text-center">
                <div className="text-[10px] font-medium text-[#6E5D54]">Gross Revenue</div>
                <div className="mt-1 font-mono text-xs font-semibold text-[#2C221E]">
                  {formatCurrency(result.monthlyRevenue, currency)}
                </div>
              </div>
              <div className="rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] p-2.5 text-center">
                <div className="text-[10px] font-medium text-[#6E5D54]">Gateway Fees</div>
                <div className="mt-1 font-mono text-xs font-semibold text-[#6E5D54]">
                  {formatCurrency(result.monthlyGatewayFees, currency)}
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
                Per Order Unit Economics
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
                      <td className="px-3.5 py-2.5 font-sans text-[#2C221E]">Gross Order Revenue</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">Retail + Shipping</td>
                      <td className="px-3.5 py-2.5 text-right font-semibold text-[#2C221E]">
                        {formatCurrency(result.orderGross, currency)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3.5 py-2.5 font-sans text-[#2C221E]">Product COGS & Shipping</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">Unit + Postage</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">
                        -{formatCurrency(result.cogsTotal, currency)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3.5 py-2.5 font-sans text-[#2C221E]">Shopify Payment Gateway</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">{SHOPIFY_PLAN_RATES[planType].percent}% + {formatCurrency(SHOPIFY_PLAN_RATES[planType].fixed, currency)}</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">
                        -{formatCurrency(result.gatewayFee, currency)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3.5 py-2.5 font-sans text-[#2C221E]">Ad Spend (CAC)</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">Per paid order</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">
                        -{formatCurrency(result.adSpend, currency)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3.5 py-2.5 font-sans text-[#2C221E]">Packaging & Operations</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">Misc overhead</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">
                        -{formatCurrency(result.otherCosts, currency)}
                      </td>
                    </tr>
                    <tr className="bg-[#FAF5EE]">
                      <td className="px-3.5 py-2.5 font-sans font-semibold text-[#2C221E]">Net Profit per Order</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">
                        {formatPercent(result.netMarginPercent)}
                      </td>
                      <td className="px-3.5 py-2.5 text-right font-bold text-[#C58842]">
                        {formatCurrency(result.netProfitPerOrder, currency)}
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
              filename={`kazcut-shopify-profit-${currency}-${retailPrice}`}
              calculatorType="shopify"
            />
            <SaveCalculationModal
              calculatorType="shopify"
              currency={currency}
              inputs={parsedInputs}
              results={result}
              defaultTitle={`Shopify ${formatCurrency(retailPrice, currency)} Unit Profit Calculation`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

