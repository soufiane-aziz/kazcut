'use client';

import React, { useState, useId } from 'react';
import { calculateFreelance, formatCurrency, formatPercent } from '@/lib/calculations';
import { freelanceSchema, FreelanceInputs } from '@/lib/validations';
import FeeChart from '@/components/FeeChart';
import PdfExportButton from '@/components/PdfExportButton';
import SaveCalculationModal from '@/components/SaveCalculationModal';

interface FreelanceCalculatorProps {
  initialCurrency?: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'CHF';
  initialIncome?: number;
  initialHoursPerWeek?: number;
  initialTaxRate?: number;
}

export default function FreelanceCalculator({
  initialCurrency = 'USD',
  initialIncome = 120000,
  initialHoursPerWeek = 35,
  initialTaxRate = 28,
}: FreelanceCalculatorProps) {
  const [targetNetIncome, setTargetNetIncome] = useState<number>(initialIncome);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(initialHoursPerWeek);
  const [vacationWeeks, setVacationWeeks] = useState<number>(4);
  const [nonBillablePercent, setNonBillablePercent] = useState<number>(25);
  const [taxRate, setTaxRate] = useState<number>(initialTaxRate);
  const [businessExpenses, setBusinessExpenses] = useState<number>(7500);
  const [profitBuffer, setProfitBuffer] = useState<number>(10);
  const [currency, setCurrency] = useState<FreelanceInputs['currency']>(initialCurrency);

  const containerId = useId().replace(/:/g, '');
  const reportElementId = `freelance-report-${containerId}`;

  const parsedInputs: FreelanceInputs = freelanceSchema.parse({
    targetNetAnnualIncome: isNaN(targetNetIncome) || targetNetIncome < 1000 ? 1000 : targetNetIncome,
    hoursPerWeek: isNaN(hoursPerWeek) || hoursPerWeek < 1 ? 1 : Math.min(80, hoursPerWeek),
    vacationWeeksPerYear: isNaN(vacationWeeks) || vacationWeeks < 0 ? 0 : Math.min(26, vacationWeeks),
    nonBillablePercent: isNaN(nonBillablePercent) || nonBillablePercent < 0 ? 0 : Math.min(75, nonBillablePercent),
    effectiveTaxRatePercent: isNaN(taxRate) || taxRate < 0 ? 0 : Math.min(60, taxRate),
    annualBusinessExpenses: isNaN(businessExpenses) || businessExpenses < 0 ? 0 : businessExpenses,
    profitMarginBufferPercent: isNaN(profitBuffer) || profitBuffer < 0 ? 0 : Math.min(100, profitBuffer),
    currency,
  });

  const result = calculateFreelance(parsedInputs);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Input Form */}
        <div className="rounded-xl border border-[#EFEAD8] bg-white p-6 shadow-xs lg:col-span-6">
          <div className="flex items-center justify-between border-b border-[#EFEAD8] pb-4">
            <h2 className="text-sm font-semibold tracking-tight text-[#2C221E]">
              Income Goal & Time Commitment
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
              <option value="CHF">CHF (CHF)</option>
            </select>
          </div>

          <div className="mt-6 space-y-5">
            {/* Target Take-Home Income */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-[#6E5D54]">
                  Desired Take-Home Annual Income (After Taxes)
                </label>
                <span className="font-mono text-xs font-semibold text-[#2C221E]">
                  {formatCurrency(targetNetIncome, currency)}
                </span>
              </div>
              <input
                type="number"
                step="5000"
                min="10000"
                value={targetNetIncome || ''}
                onChange={(e) => setTargetNetIncome(parseFloat(e.target.value) || 0)}
                className="mt-1.5 w-full rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] px-3.5 py-2 font-mono text-xs font-medium text-[#2C221E] focus:border-[#C58842] focus:outline-hidden"
              />
              <input
                type="range"
                min="30000"
                max="300000"
                step="5000"
                value={Math.min(300000, targetNetIncome || 0)}
                onChange={(e) => setTargetNetIncome(parseFloat(e.target.value))}
                className="mt-2 w-full cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#9B8C83]">
                <span>{formatCurrency(30000, currency)}</span>
                <span>{formatCurrency(120000, currency)}</span>
                <span>{formatCurrency(200000, currency)}</span>
                <span>{formatCurrency(300000, currency)}+</span>
              </div>
            </div>

            {/* Hours & Vacation Weeks */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-[#6E5D54]">
                  Working Hours / Week
                </label>
                <input
                  type="number"
                  min="5"
                  max="60"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(parseFloat(e.target.value) || 0)}
                  className="mt-1.5 w-full rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] px-3.5 py-2 font-mono text-xs font-medium text-[#2C221E] focus:border-[#C58842] focus:outline-hidden"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#6E5D54]">
                  Vacation & Sick Weeks / Year
                </label>
                <input
                  type="number"
                  min="0"
                  max="12"
                  value={vacationWeeks}
                  onChange={(e) => setVacationWeeks(parseFloat(e.target.value) || 0)}
                  className="mt-1.5 w-full rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] px-3.5 py-2 font-mono text-xs font-medium text-[#2C221E] focus:border-[#C58842] focus:outline-hidden"
                />
              </div>
            </div>

            {/* Non-Billable Overhead % & Taxes */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-[#6E5D54]">
                  Non-Billable Time (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  step="5"
                  value={nonBillablePercent}
                  onChange={(e) => setNonBillablePercent(parseFloat(e.target.value) || 0)}
                  className="mt-1.5 w-full rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] px-3.5 py-2 font-mono text-xs text-[#2C221E] focus:border-[#C58842] focus:outline-hidden"
                />
                <span className="text-[10px] text-[#9B8C83]">Admin, proposals, pitches</span>
              </div>
              <div>
                <label className="text-xs font-medium text-[#6E5D54]">
                  Effective Tax Rate (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="55"
                  step="1"
                  value={taxRate}
                  onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                  className="mt-1.5 w-full rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] px-3.5 py-2 font-mono text-xs text-[#2C221E] focus:border-[#C58842] focus:outline-hidden"
                />
                <span className="text-[10px] text-[#9B8C83]">Income + self-employment tax</span>
              </div>
            </div>

            {/* Business Expenses & Safety Buffer */}
            <div className="grid grid-cols-2 gap-3 border-t border-[#EFEAD8] pt-4">
              <div>
                <label className="text-xs font-medium text-[#6E5D54]">
                  Annual Expenses ({currency})
                </label>
                <input
                  type="number"
                  step="500"
                  value={businessExpenses || ''}
                  onChange={(e) => setBusinessExpenses(parseFloat(e.target.value) || 0)}
                  className="mt-1 w-full rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] px-3 py-1.5 font-mono text-xs text-[#2C221E] focus:border-[#C58842] focus:outline-hidden"
                />
                <span className="text-[10px] text-[#9B8C83]">Software, hardware, insurance</span>
              </div>
              <div>
                <label className="text-xs font-medium text-[#6E5D54]">
                  Profit Buffer (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  step="5"
                  value={profitBuffer}
                  onChange={(e) => setProfitBuffer(parseFloat(e.target.value) || 0)}
                  className="mt-1 w-full rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] px-3 py-1.5 font-mono text-xs text-[#2C221E] focus:border-[#C58842] focus:outline-hidden"
                />
                <span className="text-[10px] text-[#9B8C83]">Emergency & re-investment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Calculations & Recommended Rates */}
        <div className="space-y-6 lg:col-span-6">
          <div
            id={reportElementId}
            className="rounded-xl border border-[#EFEAD8] bg-white p-6 shadow-xs"
          >
            <div className="flex items-center justify-between border-b border-[#EFEAD8] pb-4">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C58842]">
                  Target Billable Rate
                </span>
                <h3 className="text-base font-semibold text-[#2C221E]">
                  Required Hourly Rate
                </h3>
              </div>
              <div className="text-right">
                <span className="font-mono text-2xl font-bold tracking-tight text-[#C58842]">
                  {formatCurrency(result.requiredHourlyRate, currency)}/hr
                </span>
                <div className="text-[10px] text-[#6E5D54]">
                  Day Rate: {formatCurrency(result.dayRate, currency)}
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-[#FAF5EE] p-3 text-xs leading-relaxed text-[#6E5D54]">
              To take home <strong className="font-mono text-[#2C221E]">{formatCurrency(targetNetIncome, currency)}</strong> after taxes ({formatPercent(taxRate)}) and {formatCurrency(businessExpenses, currency)} expenses, you must invoice{' '}
              <strong className="font-mono text-[#C58842]">{formatCurrency(result.totalAnnualRevenueTarget, currency)}</strong> annually across{' '}
              <strong className="font-mono text-[#2C221E]">{Math.round(result.billableHoursPerYear)} billable hours</strong> ({Math.round(result.billableHoursPerWeek)} hrs/wk).
            </div>

            {/* Dynamic Breakdown Chart */}
            <div className="mt-6">
              <FeeChart
                grossAmount={result.totalAnnualRevenueTarget}
                totalFees={result.annualTaxAmount + result.targetNetAnnualIncome * (profitBuffer / 100) + businessExpenses}
                netPayout={result.targetNetAnnualIncome}
                currency={currency}
                slices={result.breakdown}
                feeLabel="Taxes & Expenses"
                netLabel="Take-Home Income"
              />
            </div>

            {/* Time Allocation Grid */}
            <div className="mt-6 grid grid-cols-3 gap-2 border-t border-[#EFEAD8] pt-4">
              <div className="rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] p-2.5 text-center">
                <div className="text-[10px] font-medium text-[#6E5D54]">Annual Billable Hrs</div>
                <div className="mt-1 font-mono text-xs font-semibold text-[#2C221E]">
                  {Math.round(result.billableHoursPerYear)} hrs
                </div>
              </div>
              <div className="rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] p-2.5 text-center">
                <div className="text-[10px] font-medium text-[#6E5D54]">Monthly Gross Target</div>
                <div className="mt-1 font-mono text-xs font-semibold text-[#6E5D54]">
                  {formatCurrency(result.monthlyGrossTarget, currency)}
                </div>
              </div>
              <div className="rounded-lg border border-[#E8DFC9] bg-[#FAF5EE] p-2.5 text-center">
                <div className="text-[10px] font-medium text-[#A86E31]">Estimated Tax Target</div>
                <div className="mt-1 font-mono text-xs font-semibold text-[#C58842]">
                  {formatCurrency(result.annualTaxAmount, currency)}
                </div>
              </div>
            </div>

            {/* Side-by-Side Breakdown Table */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2C221E]">
                Annual Financial Breakdown
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
                      <td className="px-3.5 py-2.5 font-sans text-[#2C221E]">Target Net Take-Home</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">Goal</td>
                      <td className="px-3.5 py-2.5 text-right font-semibold text-[#C58842]">
                        {formatCurrency(targetNetIncome, currency)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3.5 py-2.5 font-sans text-[#2C221E]">Estimated Income & Self-Employment Tax</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">{taxRate}% effective</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">
                        {formatCurrency(result.annualTaxAmount, currency)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3.5 py-2.5 font-sans text-[#2C221E]">Annual Business Overhead</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">Expenses</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">
                        {formatCurrency(businessExpenses, currency)}
                      </td>
                    </tr>
                    <tr className="bg-[#FAF5EE]">
                      <td className="px-3.5 py-2.5 font-sans font-semibold text-[#2C221E]">Total Gross Invoicing Target</td>
                      <td className="px-3.5 py-2.5 text-right text-[#6E5D54]">Annual Gross</td>
                      <td className="px-3.5 py-2.5 text-right font-bold text-[#2C221E]">
                        {formatCurrency(result.totalAnnualRevenueTarget, currency)}
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
              filename={`kazcut-freelance-rate-${currency}-${targetNetIncome}`}
              calculatorType="freelance"
            />
            <SaveCalculationModal
              calculatorType="freelance"
              currency={currency}
              inputs={parsedInputs}
              results={result}
              defaultTitle={`Freelance ${formatCurrency(targetNetIncome, currency)} Net Rate Calculation`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

