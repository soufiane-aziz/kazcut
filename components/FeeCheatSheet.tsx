import React from 'react';
import {
  calculateAmazonFba,
  calculateEtsy,
  calculateFreelance,
  calculatePaypal,
  calculateShopify,
  calculateStripe,
  formatCurrency,
  formatPercent,
} from '@/lib/calculations';
import { ProgrammaticPageConfig } from '@/lib/geoData';

interface FeeCheatSheetProps {
  calculatorSlug: string;
  config?: ProgrammaticPageConfig;
}

interface CheatSheetTableData {
  heading: string;
  subtitle: string;
  headers: string[];
  rows: string[][];
  workedExample: string;
}

const SAMPLE_TRANSACTION_AMOUNTS = [10, 25, 50, 100, 250, 500, 1000, 2500];
const SAMPLE_ETSY_PRICES = [10, 20, 35, 50, 75, 100, 150, 250];
const SAMPLE_AMAZON_PRICES = [15, 20, 29.99, 40, 50, 75, 100, 150];
const SAMPLE_SHOPIFY_PRICES = [25, 40, 50, 65, 85, 100, 150, 250];
const SAMPLE_FREELANCE_INCOMES = [50000, 75000, 100000, 120000, 150000, 200000];

function buildCheatSheet(calculatorSlug: string, config?: ProgrammaticPageConfig): CheatSheetTableData | null {
  const defaults = config?.defaultInputs ?? {};
  const currency = (config?.defaultCurrency ?? defaults.currency ?? 'USD') as any;

  switch (calculatorSlug) {
    case 'paypal-fee-calculator': {
      const rateType = defaults.rateType ?? 'standard';
      const customPercentage = defaults.customPercentage;
      const customFixedFee = defaults.customFixedFee;
      const currencyValid = currency === 'CHF' ? 'USD' : currency;

      const rows = SAMPLE_TRANSACTION_AMOUNTS.map((amount) => {
        const send = calculatePaypal({
          amount,
          mode: 'send',
          rateType,
          currency: currencyValid,
          customPercentage,
          customFixedFee,
        });
        const receive = calculatePaypal({
          amount,
          mode: 'receive',
          rateType,
          currency: currencyValid,
          customPercentage,
          customFixedFee,
        });
        return [
          formatCurrency(amount, currencyValid),
          formatCurrency(send.totalFee, currencyValid),
          formatCurrency(send.netPayout, currencyValid),
          formatCurrency(receive.grossAmount, currencyValid),
          formatPercent(send.effectiveRatePercent),
        ];
      });

      const exampleSend = calculatePaypal({
        amount: 100,
        mode: 'send',
        rateType,
        currency: currencyValid,
        customPercentage,
        customFixedFee,
      });
      const exampleReceive = calculatePaypal({
        amount: 100,
        mode: 'receive',
        rateType,
        currency: currencyValid,
        customPercentage,
        customFixedFee,
      });

      return {
        heading: `PayPal Fee Cheat Sheet (${currencyValid}, 2026 Schedule)`,
        subtitle: `Quick reference for standard fee deductions and exact reverse invoice amounts to net your target payout in ${currencyValid}.`,
        headers: ['Amount', 'PayPal Fee', 'Net Received', 'Invoice to Net Amount', 'Effective Rate'],
        rows,
        workedExample: `Example: On a ${formatCurrency(100, currencyValid)} charge, PayPal deducts ${formatCurrency(exampleSend.totalFee, currencyValid)} (${formatPercent(exampleSend.effectiveRatePercent)}), leaving ${formatCurrency(exampleSend.netPayout, currencyValid)}. To take home the full ${formatCurrency(100, currencyValid)}, invoice ${formatCurrency(exampleReceive.grossAmount, currencyValid)}.`,
      };
    }

    case 'stripe-fee-calculator': {
      const isInternational = Boolean(defaults.isInternational);
      const needsCurrencyConversion = Boolean(defaults.needsCurrencyConversion);
      const customRatePercent = defaults.customRatePercent;
      const customFixedFee = defaults.customFixedFee;
      const currencyValid = currency === 'CHF' ? 'USD' : currency;

      const rows = SAMPLE_TRANSACTION_AMOUNTS.map((amount) => {
        const send = calculateStripe({
          amount,
          mode: 'send',
          isInternational,
          needsCurrencyConversion,
          customRatePercent,
          customFixedFee,
          currency: currencyValid,
        });
        const receive = calculateStripe({
          amount,
          mode: 'receive',
          isInternational,
          needsCurrencyConversion,
          customRatePercent,
          customFixedFee,
          currency: currencyValid,
        });
        return [
          formatCurrency(amount, currencyValid),
          formatCurrency(send.totalFee, currencyValid),
          formatCurrency(send.netPayout, currencyValid),
          formatCurrency(receive.grossAmount, currencyValid),
          formatPercent(send.effectiveRatePercent),
        ];
      });

      const example = calculateStripe({
        amount: 100,
        mode: 'send',
        isInternational,
        needsCurrencyConversion,
        customRatePercent,
        customFixedFee,
        currency: currencyValid,
      });
      const exampleReverse = calculateStripe({
        amount: 100,
        mode: 'receive',
        isInternational,
        needsCurrencyConversion,
        customRatePercent,
        customFixedFee,
        currency: currencyValid,
      });

      return {
        heading: `Stripe Processing Fee Table (${currencyValid}, 2026)`,
        subtitle: 'Pre-calculated card processing deductions, net payouts, and gross billing amounts for common transaction sizes.',
        headers: ['Charge Amount', 'Stripe Fee', 'Net Payout', 'Charge to Net Amount', 'Effective Rate'],
        rows,
        workedExample: `Example: Charging ${formatCurrency(100, currencyValid)} results in ${formatCurrency(example.totalFee, currencyValid)} in Stripe fees and a ${formatCurrency(example.netPayout, currencyValid)} payout. To clear ${formatCurrency(100, currencyValid)} after fees, charge ${formatCurrency(exampleReverse.grossAmount, currencyValid)}.`,
      };
    }

    case 'etsy-fee-calculator': {
      const offsiteAds = defaults.offsiteAds ?? 'none';
      const paymentProcessingPercent = defaults.paymentProcessingPercent ?? 3.0;
      const paymentProcessingFixed = defaults.paymentProcessingFixed ?? 0.25;
      const regulatoryOperatingFeePercent = defaults.regulatoryOperatingFeePercent ?? 0;
      const currencyValid = currency === 'JPY' || currency === 'CHF' ? 'USD' : currency;

      const rows = SAMPLE_ETSY_PRICES.map((salePrice) => {
        const res = calculateEtsy({
          salePrice,
          shippingCharged: 0,
          itemCost: 0,
          shippingCost: 0,
          quantity: 1,
          offsiteAds,
          paymentProcessingPercent,
          paymentProcessingFixed,
          regulatoryOperatingFeePercent,
          currency: currencyValid,
        });
        return [
          formatCurrency(salePrice, currencyValid),
          formatCurrency(res.listingFees + res.transactionFees, currencyValid),
          formatCurrency(res.paymentProcessingFees, currencyValid),
          formatCurrency(res.offsiteAdsFees, currencyValid),
          formatCurrency(res.totalPlatformFees, currencyValid),
          formatCurrency(res.netProfit, currencyValid),
        ];
      });

      const example = calculateEtsy({
        salePrice: 50,
        shippingCharged: 0,
        itemCost: 0,
        shippingCost: 0,
        quantity: 1,
        offsiteAds,
        paymentProcessingPercent,
        paymentProcessingFixed,
        regulatoryOperatingFeePercent,
        currency: currencyValid,
      });

      return {
        heading: `Etsy Seller Fee Breakdown by Item Price (${currencyValid}, 2026)`,
        subtitle: 'Estimated total Etsy fees (listing + 6.5% transaction + payment processing) before product and shipping costs.',
        headers: ['Sale Price', 'Listing + 6.5% Tx', 'Processing Fee', 'Offsite Ads', 'Total Etsy Fees', 'Payout Before COGS'],
        rows,
        workedExample: `Example: On a ${formatCurrency(50, currencyValid)} sale under this fee profile, total Etsy deductions equal ${formatCurrency(example.totalPlatformFees, currencyValid)}, leaving ${formatCurrency(example.netProfit, currencyValid)} before your material and shipping costs.`,
      };
    }

    case 'amazon-fba-calculator': {
      const referralRatePercent = defaults.referralRatePercent ?? 15;
      const fbaTier = defaults.fbaTier ?? 'large_standard_under_1lb';
      const monthlyStorageMonths = defaults.monthlyStorageMonths ?? 1;
      const estimatedStoragePerUnit = defaults.estimatedStoragePerUnit ?? 0.15;
      const currencyValid = ['USD', 'EUR', 'GBP', 'CAD'].includes(currency) ? currency : 'USD';

      const rows = SAMPLE_AMAZON_PRICES.map((itemPrice) => {
        const res = calculateAmazonFba({
          itemPrice,
          cogs: 0,
          inboundShipping: 0,
          category: 'Standard Consumer',
          referralRatePercent,
          fbaTier,
          monthlyStorageMonths,
          estimatedStoragePerUnit,
          salesVelocityPerMonth: 100,
          currency: currencyValid,
        });
        return [
          formatCurrency(itemPrice, currencyValid),
          formatCurrency(res.referralFeePerUnit, currencyValid),
          formatCurrency(res.fulfillmentFeePerUnit + res.storageFeePerUnit, currencyValid),
          formatCurrency(res.totalAmazonFeesPerUnit, currencyValid),
          formatCurrency(Math.max(0, res.netProfitPerUnit), currencyValid),
        ];
      });

      const example = calculateAmazonFba({
        itemPrice: 29.99,
        cogs: 0,
        inboundShipping: 0,
        category: 'Standard Consumer',
        referralRatePercent,
        fbaTier,
        monthlyStorageMonths,
        estimatedStoragePerUnit,
        salesVelocityPerMonth: 100,
        currency: currencyValid,
      });

      return {
        heading: `Amazon FBA Fee Schedule by Retail Price (${currencyValid}, 2026)`,
        subtitle: `Includes ${referralRatePercent}% referral commission plus FBA pick-and-pack fulfillment and estimated monthly storage.`,
        headers: ['Retail Price', 'Referral Fee', 'FBA + Storage', 'Total Amazon Fees', 'Max Landed Cost to Break Even'],
        rows,
        workedExample: `Example: At ${formatCurrency(29.99, currencyValid)}, Amazon fees total ${formatCurrency(example.totalAmazonFeesPerUnit, currencyValid)}, leaving ${formatCurrency(Math.max(0, example.netProfitPerUnit), currencyValid)} to cover your landed COGS, PPC ads, and net profit.`,
      };
    }

    case 'shopify-profit-calculator': {
      const planType = defaults.planType ?? 'basic';
      const currencyValid = currency === 'JPY' || currency === 'CHF' ? 'USD' : currency;

      const rows = SAMPLE_SHOPIFY_PRICES.map((retailPrice) => {
        const res = calculateShopify({
          retailPrice,
          cogs: 0,
          shippingCharged: 0,
          shippingCost: 0,
          adSpendPerOrder: 0,
          otherCostsPerOrder: 0,
          planType,
          estimatedMonthlyOrders: 100,
          currency: currencyValid,
        });
        return [
          formatCurrency(retailPrice, currencyValid),
          formatCurrency(res.gatewayFee, currencyValid),
          formatCurrency(res.breakEvenCac, currencyValid),
          formatCurrency(res.breakEvenCac * 0.6, currencyValid),
        ];
      });

      const example = calculateShopify({
        retailPrice: 65,
        cogs: 0,
        shippingCharged: 0,
        shippingCost: 0,
        adSpendPerOrder: 0,
        otherCostsPerOrder: 0,
        planType,
        estimatedMonthlyOrders: 100,
        currency: currencyValid,
      });

      return {
        heading: `Shopify Payments Fee & Margin Table (${currencyValid}, 2026)`,
        subtitle: 'Gateway fee deductions and maximum COGS + ad spend budget per order size.',
        headers: ['Order Value', 'Gateway Fee', 'Net After Gateway', 'Suggested Max COGS + Ad Spend (40% Margin)'],
        rows,
        workedExample: `Example: On a ${formatCurrency(65, currencyValid)} order, Shopify Payments deducts ${formatCurrency(example.gatewayFee, currencyValid)}, leaving ${formatCurrency(example.breakEvenCac, currencyValid)} before COGS, shipping, and paid acquisition.`,
      };
    }

    case 'freelance-hourly-rate-calculator': {
      const effectiveTaxRatePercent = defaults.effectiveTaxRatePercent ?? 28;
      const hoursPerWeek = defaults.hoursPerWeek ?? 35;
      const vacationWeeksPerYear = defaults.vacationWeeksPerYear ?? 3;
      const nonBillablePercent = defaults.nonBillablePercent ?? 25;
      const annualBusinessExpenses = defaults.annualBusinessExpenses ?? 5000;
      const profitMarginBufferPercent = defaults.profitMarginBufferPercent ?? 10;
      const currencyValid = currency === 'JPY' ? 'USD' : currency;

      const rows = SAMPLE_FREELANCE_INCOMES.map((targetNetAnnualIncome) => {
        const res = calculateFreelance({
          targetNetAnnualIncome,
          hoursPerWeek,
          vacationWeeksPerYear,
          nonBillablePercent,
          effectiveTaxRatePercent,
          annualBusinessExpenses,
          profitMarginBufferPercent,
          currency: currencyValid,
        });
        return [
          formatCurrency(targetNetAnnualIncome, currencyValid),
          formatCurrency(res.totalAnnualRevenueTarget, currencyValid),
          formatCurrency(res.monthlyGrossTarget, currencyValid),
          formatCurrency(res.requiredHourlyRate, currencyValid),
          formatCurrency(res.dayRate, currencyValid),
        ];
      });

      const example = calculateFreelance({
        targetNetAnnualIncome: 100000,
        hoursPerWeek,
        vacationWeeksPerYear,
        nonBillablePercent,
        effectiveTaxRatePercent,
        annualBusinessExpenses,
        profitMarginBufferPercent,
        currency: currencyValid,
      });

      return {
        heading: `Freelance Hourly & Day Rate Benchmarks (${currencyValid}, 2026)`,
        subtitle: `Based on ${effectiveTaxRatePercent}% estimated tax rate, ${100 - nonBillablePercent}% billable efficiency, and ${vacationWeeksPerYear} weeks PTO/year.`,
        headers: ['Target Net / Yr', 'Gross Revenue Needed', 'Monthly Billing Target', 'Hourly Rate', 'Day Rate'],
        rows,
        workedExample: `Example: To take home ${formatCurrency(100000, currencyValid)} net per year after taxes and overhead, you need ${formatCurrency(example.totalAnnualRevenueTarget, currencyValid)} in annual gross billings—about ${formatCurrency(example.requiredHourlyRate, currencyValid)}/hr or ${formatCurrency(example.dayRate, currencyValid)}/day.`,
      };
    }

    default:
      return null;
  }
}

/**
 * Server-rendered HTML reference table for quick fee lookups and search indexing.
 */
export default function FeeCheatSheet({ calculatorSlug, config }: FeeCheatSheetProps) {
  const sheet = buildCheatSheet(calculatorSlug, config);

  if (!sheet) return null;

  return (
    <section className="mt-12 rounded-xl border border-[#E7DFCC] bg-white p-6 sm:p-8 box-card">
      <div className="flex flex-col gap-2 border-b border-[#EFEAD8] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-[#2C221E]">{sheet.heading}</h2>
          <p className="mt-1 text-xs text-[#6E5D54]">{sheet.subtitle}</p>
        </div>
        <span className="shrink-0 rounded-full border border-[#EFEAD8] bg-[#FAF5EE] px-2.5 py-1 font-mono text-[10px] font-medium text-[#6E5D54]">
          Updated Nov 2026
        </span>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#EFEAD8] bg-[#FAF5EE] text-[#6E5D54]">
            <tr>
              {sheet.headers.map((header, idx) => (
                <th
                  key={header}
                  className={`px-4 py-2.5 font-medium ${idx === sheet.headers.length - 1 ? 'text-right' : ''}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EFEAD8] font-mono">
            {sheet.rows.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-[#FDFBF7] transition">
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className={`px-4 py-2.5 ${cellIdx === 0
                        ? 'font-semibold text-[#2C221E]'
                        : cellIdx === row.length - 1
                          ? 'text-right font-semibold text-[#C58842]'
                          : 'text-[#6E5D54]'
                      }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 rounded-lg border border-[#EFEAD8] bg-[#FAF5EE]/70 px-4 py-3 text-xs leading-relaxed text-[#6E5D54]">
        {sheet.workedExample}
      </p>
    </section>
  );
}

