import { z } from 'zod';

export const paypalSchema = z.object({
  amount: z.number().min(0.01).max(10_000_000),
  mode: z.enum(['receive', 'send']),
  rateType: z.enum(['standard', 'international', 'invoicing', 'qr', 'micropayment']),
  currency: z.enum(['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY']),
  customPercentage: z.number().min(0).max(100).optional(),
  customFixedFee: z.number().min(0).max(100).optional(),
});

export const stripeSchema = z.object({
  amount: z.number().min(0.01).max(10_000_000),
  mode: z.enum(['receive', 'send']),
  isInternational: z.boolean(),
  needsCurrencyConversion: z.boolean(),
  customRatePercent: z.number().min(0).max(20).optional(),
  customFixedFee: z.number().min(0).max(10).optional(),
  estimatedMonthlyVolume: z.number().min(0).max(100_000_000).optional(),
  estimatedDisputeRate: z.number().min(0).max(10).optional(),
  currency: z.enum(['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY']),
});

export const etsySchema = z.object({
  salePrice: z.number().min(0.01).max(1_000_000),
  shippingCharged: z.number().min(0).max(100_000),
  itemCost: z.number().min(0).max(1_000_000),
  shippingCost: z.number().min(0).max(100_000),
  quantity: z.number().int().min(1).max(10_000),
  offsiteAds: z.enum(['none', 'standard_15', 'high_volume_12']),
  paymentProcessingPercent: z.number().min(0).max(20),
  paymentProcessingFixed: z.number().min(0).max(10),
  regulatoryOperatingFeePercent: z.number().min(0).max(5),
  currency: z.enum(['USD', 'EUR', 'GBP', 'CAD', 'AUD']),
});

export const amazonFbaSchema = z.object({
  itemPrice: z.number().min(0.01).max(1_000_000),
  cogs: z.number().min(0).max(1_000_000),
  inboundShipping: z.number().min(0).max(10_000),
  category: z.string(),
  referralRatePercent: z.number().min(0).max(50),
  fbaTier: z.enum(['small_standard', 'large_standard_under_1lb', 'large_standard_over_1lb', 'small_oversize', 'custom']),
  customFbaFee: z.number().min(0).max(500).optional(),
  monthlyStorageMonths: z.number().min(0).max(24),
  estimatedStoragePerUnit: z.number().min(0).max(100),
  salesVelocityPerMonth: z.number().int().min(1).max(100_000),
  currency: z.enum(['USD', 'EUR', 'GBP', 'CAD']),
});

export const shopifySchema = z.object({
  retailPrice: z.number().min(0.01).max(1_000_000),
  cogs: z.number().min(0).max(1_000_000),
  shippingCharged: z.number().min(0).max(10_000),
  shippingCost: z.number().min(0).max(10_000),
  adSpendPerOrder: z.number().min(0).max(10_000),
  otherCostsPerOrder: z.number().min(0).max(10_000),
  planType: z.enum(['basic', 'shopify', 'advanced', 'custom']),
  customGatewayPercent: z.number().min(0).max(20).optional(),
  customGatewayFixed: z.number().min(0).max(10).optional(),
  estimatedMonthlyOrders: z.number().int().min(1).max(500_000),
  currency: z.enum(['USD', 'EUR', 'GBP', 'CAD', 'AUD']),
});

export const freelanceSchema = z.object({
  targetNetAnnualIncome: z.number().min(1_000).max(10_000_000),
  hoursPerWeek: z.number().min(1).max(80),
  vacationWeeksPerYear: z.number().min(0).max(26),
  nonBillablePercent: z.number().min(0).max(75),
  effectiveTaxRatePercent: z.number().min(0).max(60),
  annualBusinessExpenses: z.number().min(0).max(1_000_000),
  profitMarginBufferPercent: z.number().min(0).max(100),
  currency: z.enum(['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'CHF']),
});

export type PaypalInputs = z.infer<typeof paypalSchema>;
export type StripeInputs = z.infer<typeof stripeSchema>;
export type EtsyInputs = z.infer<typeof etsySchema>;
export type AmazonFbaInputs = z.infer<typeof amazonFbaSchema>;
export type ShopifyInputs = z.infer<typeof shopifySchema>;
export type FreelanceInputs = z.infer<typeof freelanceSchema>;

