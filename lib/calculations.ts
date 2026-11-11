import {
  PaypalInputs,
  StripeInputs,
  EtsyInputs,
  AmazonFbaInputs,
  ShopifyInputs,
  FreelanceInputs,
} from './validations';

export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'CA$',
  AUD: 'AU$',
  JPY: '¥',
  CHF: 'CHF ',
};

export function formatCurrency(amount: number, currency = 'USD'): string {
  const symbol = CURRENCY_SYMBOLS[currency] || '$';
  if (currency === 'JPY') {
    return `${symbol}${Math.round(amount).toLocaleString('en-US')}`;
  }
  return `${symbol}${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatPercent(val: number): string {
  return `${val.toFixed(2)}%`;
}

// 1. PAYPAL CALCULATOR
export interface PaypalResult {
  grossAmount: number;
  feePercentageAmount: number;
  fixedFeeAmount: number;
  totalFee: number;
  netPayout: number;
  effectiveRatePercent: number;
  breakdown: { label: string; amount: number; percent: number }[];
}

export const PAYPAL_FIXED_FEES: Record<string, number> = {
  USD: 0.49,
  EUR: 0.39,
  GBP: 0.30,
  CAD: 0.59,
  AUD: 0.59,
  JPY: 40,
};

export const PAYPAL_RATE_PRESETS = {
  standard: { percent: 2.99, label: 'Domestic Commercial (2.99% + fixed)' },
  international: { percent: 4.49, label: 'International Commercial (4.49% + fixed)' },
  invoicing: { percent: 3.49, label: 'PayPal Invoicing (3.49% + fixed)' },
  qr: { percent: 1.90, label: 'QR Code Transactions (1.90% + $0.10)' },
  micropayment: { percent: 4.99, label: 'Micropayments (4.99% + $0.09)' },
};

export function calculatePaypal(inputs: PaypalInputs): PaypalResult {
  const fixedFee = inputs.customFixedFee ?? (
    inputs.rateType === 'qr' ? 0.10 :
    inputs.rateType === 'micropayment' ? 0.09 :
    (PAYPAL_FIXED_FEES[inputs.currency] || 0.49)
  );
  
  const percentRate = inputs.customPercentage ?? PAYPAL_RATE_PRESETS[inputs.rateType].percent;
  const rateFraction = percentRate / 100;

  let gross = 0;
  let fee = 0;
  let net = 0;

  if (inputs.mode === 'receive') {
    // User wants to net inputs.amount
    // net = gross - (gross * rateFraction + fixedFee) = gross * (1 - rateFraction) - fixedFee
    // gross = (net + fixedFee) / (1 - rateFraction)
    gross = (inputs.amount + fixedFee) / (1 - rateFraction);
    fee = gross * rateFraction + fixedFee;
    net = inputs.amount;
  } else {
    // User charges inputs.amount
    gross = inputs.amount;
    fee = gross * rateFraction + fixedFee;
    net = gross - fee;
  }

  const feePercentageAmount = gross * rateFraction;
  const effectiveRatePercent = gross > 0 ? (fee / gross) * 100 : 0;

  return {
    grossAmount: gross,
    feePercentageAmount,
    fixedFeeAmount: fixedFee,
    totalFee: fee,
    netPayout: Math.max(0, net),
    effectiveRatePercent,
    breakdown: [
      { label: 'Net Payout', amount: Math.max(0, net), percent: gross > 0 ? (Math.max(0, net) / gross) * 100 : 0 },
      { label: 'Percentage Fee', amount: feePercentageAmount, percent: gross > 0 ? (feePercentageAmount / gross) * 100 : 0 },
      { label: 'Fixed Transaction Fee', amount: fixedFee, percent: gross > 0 ? (fixedFee / gross) * 100 : 0 },
    ],
  };
}

// 2. STRIPE CALCULATOR
export interface StripeResult {
  grossAmount: number;
  baseFee: number;
  internationalFee: number;
  conversionFee: number;
  totalFee: number;
  netPayout: number;
  effectiveRatePercent: number;
  estimatedDisputeLossMonthly: number;
  breakdown: { label: string; amount: number; percent: number }[];
}

export const STRIPE_FIXED_FEES: Record<string, number> = {
  USD: 0.30,
  EUR: 0.25,
  GBP: 0.20,
  CAD: 0.30,
  AUD: 0.30,
  JPY: 30,
};

export function calculateStripe(inputs: StripeInputs): StripeResult {
  const basePercent = inputs.customRatePercent ?? 2.9;
  const fixedFee = inputs.customFixedFee ?? (STRIPE_FIXED_FEES[inputs.currency] || 0.30);
  
  let additionalPercent = 0;
  if (inputs.isInternational) additionalPercent += 1.5;
  if (inputs.needsCurrencyConversion) additionalPercent += 1.0;

  const totalPercent = basePercent + additionalPercent;
  const totalRateFraction = totalPercent / 100;

  let gross = 0;
  let totalFee = 0;
  let net = 0;

  if (inputs.mode === 'receive') {
    gross = (inputs.amount + fixedFee) / (1 - totalRateFraction);
    totalFee = gross * totalRateFraction + fixedFee;
    net = inputs.amount;
  } else {
    gross = inputs.amount;
    totalFee = gross * totalRateFraction + fixedFee;
    net = gross - totalFee;
  }

  const baseFee = gross * (basePercent / 100) + fixedFee;
  const internationalFee = inputs.isInternational ? gross * 0.015 : 0;
  const conversionFee = inputs.needsCurrencyConversion ? gross * 0.01 : 0;
  const effectiveRatePercent = gross > 0 ? (totalFee / gross) * 100 : 0;

  // Chargeback dispute cost estimation
  const monthlyVolume = inputs.estimatedMonthlyVolume ?? 0;
  const disputeRate = (inputs.estimatedDisputeRate ?? 0) / 100;
  const estimatedDisputeLossMonthly = (monthlyVolume * disputeRate * 15);

  return {
    grossAmount: gross,
    baseFee,
    internationalFee,
    conversionFee,
    totalFee,
    netPayout: Math.max(0, net),
    effectiveRatePercent,
    estimatedDisputeLossMonthly,
    breakdown: [
      { label: 'Net Payout', amount: Math.max(0, net), percent: gross > 0 ? (Math.max(0, net) / gross) * 100 : 0 },
      { label: 'Standard Processing Fee', amount: baseFee, percent: gross > 0 ? (baseFee / gross) * 100 : 0 },
      ...(internationalFee > 0 ? [{ label: 'International Card Surcharge', amount: internationalFee, percent: (internationalFee / gross) * 100 }] : []),
      ...(conversionFee > 0 ? [{ label: 'Currency Conversion Surcharge', amount: conversionFee, percent: (conversionFee / gross) * 100 }] : []),
    ],
  };
}

// 3. ETSY CALCULATOR
export interface EtsyResult {
  grossRevenue: number;
  listingFees: number;
  transactionFees: number;
  paymentProcessingFees: number;
  offsiteAdsFees: number;
  regulatoryFees: number;
  totalPlatformFees: number;
  totalProductCosts: number;
  netProfit: number;
  profitMarginPercent: number;
  roiPercent: number;
  breakdown: { label: string; amount: number; percent: number }[];
}

export function calculateEtsy(inputs: EtsyInputs): EtsyResult {
  const qty = inputs.quantity;
  const grossRevenue = (inputs.salePrice + inputs.shippingCharged) * qty;
  const totalProductCosts = (inputs.itemCost + inputs.shippingCost) * qty;

  const listingFees = 0.20 * qty;
  const transactionFees = grossRevenue * 0.065;
  const paymentProcessingFees = (grossRevenue * (inputs.paymentProcessingPercent / 100)) + (inputs.paymentProcessingFixed * qty);
  
  let offsiteAdsRate = 0;
  if (inputs.offsiteAds === 'standard_15') offsiteAdsRate = 0.15;
  if (inputs.offsiteAds === 'high_volume_12') offsiteAdsRate = 0.12;
  const offsiteAdsFees = grossRevenue * offsiteAdsRate;

  const regulatoryFees = grossRevenue * (inputs.regulatoryOperatingFeePercent / 100);

  const totalPlatformFees = listingFees + transactionFees + paymentProcessingFees + offsiteAdsFees + regulatoryFees;
  const netProfit = grossRevenue - totalPlatformFees - totalProductCosts;
  const profitMarginPercent = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;
  const roiPercent = totalProductCosts > 0 ? (netProfit / totalProductCosts) * 100 : 0;

  return {
    grossRevenue,
    listingFees,
    transactionFees,
    paymentProcessingFees,
    offsiteAdsFees,
    regulatoryFees,
    totalPlatformFees,
    totalProductCosts,
    netProfit,
    profitMarginPercent,
    roiPercent,
    breakdown: [
      { label: 'Net Profit', amount: Math.max(0, netProfit), percent: grossRevenue > 0 ? (Math.max(0, netProfit) / grossRevenue) * 100 : 0 },
      { label: 'Etsy Transaction Fees', amount: transactionFees, percent: grossRevenue > 0 ? (transactionFees / grossRevenue) * 100 : 0 },
      { label: 'Payment Processing', amount: paymentProcessingFees, percent: grossRevenue > 0 ? (paymentProcessingFees / grossRevenue) * 100 : 0 },
      { label: 'Product & Shipping Cost', amount: totalProductCosts, percent: grossRevenue > 0 ? (totalProductCosts / grossRevenue) * 100 : 0 },
      { label: 'Listing & Offsite Ads', amount: listingFees + offsiteAdsFees + regulatoryFees, percent: grossRevenue > 0 ? ((listingFees + offsiteAdsFees + regulatoryFees) / grossRevenue) * 100 : 0 },
    ],
  };
}

// 4. AMAZON FBA CALCULATOR
export interface AmazonFbaResult {
  itemPrice: number;
  referralFeePerUnit: number;
  fulfillmentFeePerUnit: number;
  storageFeePerUnit: number;
  totalAmazonFeesPerUnit: number;
  totalCostPerUnit: number;
  netProfitPerUnit: number;
  netMarginPercent: number;
  roiPercent: number;
  monthlyRevenue: number;
  monthlyNetProfit: number;
  monthlyAmazonFees: number;
  breakdown: { label: string; amount: number; percent: number }[];
}

export const FBA_TIER_FEES: Record<string, number> = {
  small_standard: 3.22,
  large_standard_under_1lb: 3.86,
  large_standard_over_1lb: 4.75,
  small_oversize: 9.73,
  custom: 0,
};

export function calculateAmazonFba(inputs: AmazonFbaInputs): AmazonFbaResult {
  const referralFeePerUnit = inputs.itemPrice * (inputs.referralRatePercent / 100);
  const fulfillmentFeePerUnit = inputs.fbaTier === 'custom' 
    ? (inputs.customFbaFee ?? 0)
    : (FBA_TIER_FEES[inputs.fbaTier] || 3.86);

  const storageFeePerUnit = inputs.estimatedStoragePerUnit * inputs.monthlyStorageMonths;
  const totalAmazonFeesPerUnit = referralFeePerUnit + fulfillmentFeePerUnit + storageFeePerUnit;
  const totalCostPerUnit = inputs.cogs + inputs.inboundShipping;

  const netProfitPerUnit = inputs.itemPrice - totalAmazonFeesPerUnit - totalCostPerUnit;
  const netMarginPercent = inputs.itemPrice > 0 ? (netProfitPerUnit / inputs.itemPrice) * 100 : 0;
  const roiPercent = totalCostPerUnit > 0 ? (netProfitPerUnit / totalCostPerUnit) * 100 : 0;

  const velocity = inputs.salesVelocityPerMonth;
  const monthlyRevenue = inputs.itemPrice * velocity;
  const monthlyNetProfit = netProfitPerUnit * velocity;
  const monthlyAmazonFees = totalAmazonFeesPerUnit * velocity;

  return {
    itemPrice: inputs.itemPrice,
    referralFeePerUnit,
    fulfillmentFeePerUnit,
    storageFeePerUnit,
    totalAmazonFeesPerUnit,
    totalCostPerUnit,
    netProfitPerUnit,
    netMarginPercent,
    roiPercent,
    monthlyRevenue,
    monthlyNetProfit,
    monthlyAmazonFees,
    breakdown: [
      { label: 'Net Profit', amount: Math.max(0, netProfitPerUnit), percent: inputs.itemPrice > 0 ? (Math.max(0, netProfitPerUnit) / inputs.itemPrice) * 100 : 0 },
      { label: 'Product & Shipping COGS', amount: totalCostPerUnit, percent: inputs.itemPrice > 0 ? (totalCostPerUnit / inputs.itemPrice) * 100 : 0 },
      { label: 'FBA Fulfillment Fee', amount: fulfillmentFeePerUnit, percent: inputs.itemPrice > 0 ? (fulfillmentFeePerUnit / inputs.itemPrice) * 100 : 0 },
      { label: 'Amazon Referral Fee', amount: referralFeePerUnit, percent: inputs.itemPrice > 0 ? (referralFeePerUnit / inputs.itemPrice) * 100 : 0 },
      { label: 'Storage Fee', amount: storageFeePerUnit, percent: inputs.itemPrice > 0 ? (storageFeePerUnit / inputs.itemPrice) * 100 : 0 },
    ],
  };
}

// 5. SHOPIFY CALCULATOR
export interface ShopifyResult {
  orderGross: number;
  cogsTotal: number;
  gatewayFee: number;
  adSpend: number;
  otherCosts: number;
  totalExpenses: number;
  netProfitPerOrder: number;
  netMarginPercent: number;
  breakEvenCac: number;
  monthlyRevenue: number;
  monthlyNetProfit: number;
  monthlyGatewayFees: number;
  breakdown: { label: string; amount: number; percent: number }[];
}

export const SHOPIFY_PLAN_RATES = {
  basic: { percent: 2.9, fixed: 0.30, label: 'Basic Shopify (2.9% + 30¢)' },
  shopify: { percent: 2.7, fixed: 0.30, label: 'Shopify Plan (2.7% + 30¢)' },
  advanced: { percent: 2.5, fixed: 0.30, label: 'Advanced Shopify (2.5% + 30¢)' },
  custom: { percent: 2.4, fixed: 0.25, label: 'Shopify Plus / Custom' },
};

export function calculateShopify(inputs: ShopifyInputs): ShopifyResult {
  const orderGross = inputs.retailPrice + inputs.shippingCharged;
  const cogsTotal = inputs.cogs + inputs.shippingCost;

  const planRate = inputs.planType === 'custom'
    ? { percent: inputs.customGatewayPercent ?? 2.4, fixed: inputs.customGatewayFixed ?? 0.25 }
    : SHOPIFY_PLAN_RATES[inputs.planType];

  const gatewayFee = (orderGross * (planRate.percent / 100)) + planRate.fixed;
  const adSpend = inputs.adSpendPerOrder;
  const otherCosts = inputs.otherCostsPerOrder;

  const totalExpenses = cogsTotal + gatewayFee + adSpend + otherCosts;
  const netProfitPerOrder = orderGross - totalExpenses;
  const netMarginPercent = orderGross > 0 ? (netProfitPerOrder / orderGross) * 100 : 0;
  
  // Maximum ad spend before losing money
  const breakEvenCac = Math.max(0, orderGross - cogsTotal - gatewayFee - otherCosts);

  const orders = inputs.estimatedMonthlyOrders;
  const monthlyRevenue = orderGross * orders;
  const monthlyNetProfit = netProfitPerOrder * orders;
  const monthlyGatewayFees = gatewayFee * orders;

  return {
    orderGross,
    cogsTotal,
    gatewayFee,
    adSpend,
    otherCosts,
    totalExpenses,
    netProfitPerOrder,
    netMarginPercent,
    breakEvenCac,
    monthlyRevenue,
    monthlyNetProfit,
    monthlyGatewayFees,
    breakdown: [
      { label: 'Net Profit', amount: Math.max(0, netProfitPerOrder), percent: orderGross > 0 ? (Math.max(0, netProfitPerOrder) / orderGross) * 100 : 0 },
      { label: 'COGS & Fulfillment', amount: cogsTotal, percent: orderGross > 0 ? (cogsTotal / orderGross) * 100 : 0 },
      { label: 'Ad Spend (CAC)', amount: adSpend, percent: orderGross > 0 ? (adSpend / orderGross) * 100 : 0 },
      { label: 'Shopify Gateway Fee', amount: gatewayFee, percent: orderGross > 0 ? (gatewayFee / orderGross) * 100 : 0 },
      { label: 'Other Operating Costs', amount: otherCosts, percent: orderGross > 0 ? (otherCosts / orderGross) * 100 : 0 },
    ],
  };
}

// 6. FREELANCE HOURLY RATE CALCULATOR
export interface FreelanceResult {
  targetNetAnnualIncome: number;
  grossIncomeNeeded: number;
  totalAnnualRevenueTarget: number;
  totalAnnualHours: number;
  billableHoursPerYear: number;
  billableHoursPerWeek: number;
  requiredHourlyRate: number;
  dayRate: number;
  monthlyGrossTarget: number;
  annualTaxAmount: number;
  breakdown: { label: string; amount: number; percent: number }[];
}

export function calculateFreelance(inputs: FreelanceInputs): FreelanceResult {
  const taxRateFraction = inputs.effectiveTaxRatePercent / 100;
  // Net = Gross * (1 - taxRate) => Gross = Net / (1 - taxRate)
  const grossIncomeNeeded = taxRateFraction < 1 
    ? inputs.targetNetAnnualIncome / (1 - taxRateFraction)
    : inputs.targetNetAnnualIncome;

  const annualTaxAmount = grossIncomeNeeded - inputs.targetNetAnnualIncome;
  const bufferAmount = inputs.targetNetAnnualIncome * (inputs.profitMarginBufferPercent / 100);
  
  const totalAnnualRevenueTarget = grossIncomeNeeded + inputs.annualBusinessExpenses + bufferAmount;

  const workingWeeks = Math.max(1, 52 - inputs.vacationWeeksPerYear);
  const totalAnnualHours = workingWeeks * inputs.hoursPerWeek;
  
  const billableRatio = 1 - (inputs.nonBillablePercent / 100);
  const billableHoursPerYear = Math.max(1, totalAnnualHours * billableRatio);
  const billableHoursPerWeek = billableHoursPerYear / workingWeeks;

  const requiredHourlyRate = totalAnnualRevenueTarget / billableHoursPerYear;
  const dayRate = requiredHourlyRate * (inputs.hoursPerWeek / 5);
  const monthlyGrossTarget = totalAnnualRevenueTarget / 12;

  return {
    targetNetAnnualIncome: inputs.targetNetAnnualIncome,
    grossIncomeNeeded,
    totalAnnualRevenueTarget,
    totalAnnualHours,
    billableHoursPerYear,
    billableHoursPerWeek,
    requiredHourlyRate,
    dayRate,
    monthlyGrossTarget,
    annualTaxAmount,
    breakdown: [
      { label: 'Take-Home Income', amount: inputs.targetNetAnnualIncome, percent: (inputs.targetNetAnnualIncome / totalAnnualRevenueTarget) * 100 },
      { label: 'Estimated Taxes', amount: annualTaxAmount, percent: (annualTaxAmount / totalAnnualRevenueTarget) * 100 },
      { label: 'Business Expenses', amount: inputs.annualBusinessExpenses, percent: (inputs.annualBusinessExpenses / totalAnnualRevenueTarget) * 100 },
      ...(bufferAmount > 0 ? [{ label: 'Reinvestment & Safety Buffer', amount: bufferAmount, percent: (bufferAmount / totalAnnualRevenueTarget) * 100 }] : []),
    ],
  };
}

