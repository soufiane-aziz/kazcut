export interface ProgrammaticPageConfig {
  calculatorSlug: string;
  subSlug: string; // e.g. "in-usa"
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  description: string;
  defaultCurrency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY' | 'CHF';
  defaultInputs?: Record<string, any>;
  faqs: { question: string; answer: string }[];
  marketNotes: string[];
}

export const PROGRAMMATIC_PAGES: Record<string, ProgrammaticPageConfig> = {
  // PAYPAL
  'paypal-fee-calculator/in-usa': {
    calculatorSlug: 'paypal-fee-calculator',
    subSlug: 'in-usa',
    title: 'PayPal Fee Calculator USA',
    metaTitle: 'PayPal Fee Calculator USA (2026 Rates) | Kazcut',
    metaDescription: 'Accurately calculate US domestic PayPal merchant fees (2.99% + $0.49), invoicing fees, and international cross-border surcharges.',
    h1: 'PayPal Fee Calculator: United States',
    description: 'Calculate domestic and international PayPal merchant processing fees for US commercial accounts, invoicing, and micropayments.',
    defaultCurrency: 'USD',
    defaultInputs: {
      amount: 100,
      mode: 'receive',
      rateType: 'standard',
      currency: 'USD',
    },
    faqs: [
      {
        question: 'What is the standard US PayPal transaction fee?',
        answer: 'The standard domestic commercial transaction fee for US PayPal accounts is 2.99% plus a $0.49 fixed fee per transaction.'
      },
      {
        question: 'How much does PayPal charge for invoices sent in the US?',
        answer: 'PayPal Invoicing within the US incurs a rate of 3.49% plus a $0.49 fixed fee.'
      },
      {
        question: 'What is the international transaction fee for US sellers?',
        answer: 'Receiving payments from international buyers adds a 1.50% cross-border fee, resulting in 4.49% plus the fixed fee in the received currency.'
      }
    ],
    marketNotes: [
      'Domestic commercial rate: 2.99% + $0.49 USD.',
      'Invoicing and payment requests: 3.49% + $0.49 USD.',
      'International surcharge: +1.50% cross-border fee.'
    ]
  },

  'paypal-fee-calculator/in-uk': {
    calculatorSlug: 'paypal-fee-calculator',
    subSlug: 'in-uk',
    title: 'PayPal Fee Calculator UK',
    metaTitle: 'PayPal Fee Calculator UK (2026 Rates) | Kazcut',
    metaDescription: 'Calculate United Kingdom PayPal seller fees: 2.90% + £0.30 domestic standard and cross-border European payments.',
    h1: 'PayPal Fee Calculator: United Kingdom',
    description: 'Calculate UK PayPal seller fees, domestic transactions, and international conversion deductions.',
    defaultCurrency: 'GBP',
    defaultInputs: {
      amount: 100,
      mode: 'receive',
      rateType: 'standard',
      currency: 'GBP',
      customPercentage: 2.90,
      customFixedFee: 0.30,
    },
    faqs: [
      {
        question: 'What is the standard UK PayPal fee?',
        answer: 'Standard domestic commercial transactions in the UK are charged at 2.90% plus a fixed fee of £0.30.'
      },
      {
        question: 'Are PayPal fees in the UK subject to VAT?',
        answer: 'Financial transaction fees from PayPal are generally exempt from UK VAT under current HMRC regulations.'
      }
    ],
    marketNotes: [
      'Domestic standard rate: 2.90% + £0.30 GBP.',
      'Cross-border payments into the UK incur additional exchange and regional fees.'
    ]
  },

  'paypal-fee-calculator/in-canada': {
    calculatorSlug: 'paypal-fee-calculator',
    subSlug: 'in-canada',
    title: 'PayPal Fee Calculator Canada',
    metaTitle: 'PayPal Fee Calculator Canada (2026 Rates) | Kazcut',
    metaDescription: 'Calculate Canadian PayPal merchant rates, CAD domestic transactions (2.90% + $0.59 CAD), and US-Canada cross-border fees.',
    h1: 'PayPal Fee Calculator: Canada',
    description: 'Precision calculation for Canadian PayPal transactions, cross-border US sales, and net bank deposit amounts.',
    defaultCurrency: 'CAD',
    defaultInputs: {
      amount: 100,
      mode: 'receive',
      rateType: 'standard',
      currency: 'CAD',
      customPercentage: 2.90,
      customFixedFee: 0.59,
    },
    faqs: [
      {
        question: 'What is the Canadian domestic PayPal fee?',
        answer: 'Canadian domestic transactions are charged 2.90% plus CA$0.59 fixed fee.'
      },
      {
        question: 'What fee applies to payments from US customers to Canada?',
        answer: 'Cross-border payments from US buyers to Canadian merchants incur an additional 1.50% fee plus currency conversion adjustments.'
      }
    ],
    marketNotes: [
      'Standard Canadian domestic rate: 2.90% + $0.59 CAD.',
      'US-to-Canada cross-border surcharge: +1.50%.'
    ]
  },

  'paypal-fee-calculator/in-germany': {
    calculatorSlug: 'paypal-fee-calculator',
    subSlug: 'in-germany',
    title: 'PayPal Fee Calculator Germany',
    metaTitle: 'PayPal Gebührenrechner Deutschland (2026) | Kazcut',
    metaDescription: 'Berechnen Sie PayPal Händlergebühren in Deutschland und dem Euroraum: 2.99% + 0.39€ Festgebühr.',
    h1: 'PayPal Gebührenrechner: Deutschland & Eurozone',
    description: 'Ermitteln Sie PayPal-Transaktionsgebühren, Auszahlungsbeträge und Nettogewinne für Händler in Deutschland.',
    defaultCurrency: 'EUR',
    defaultInputs: {
      amount: 100,
      mode: 'receive',
      rateType: 'standard',
      currency: 'EUR',
      customPercentage: 2.99,
      customFixedFee: 0.39,
    },
    faqs: [
      {
        question: 'Wie hoch sind die PayPal-Gebühren für gewerbliche Verkäufer in Deutschland?',
        answer: 'Die Standardgebühr für gewerbliche Händler beträgt 2,99% plus 0,39 € Festgebühr pro Transaktion.'
      },
      {
        question: 'Fallen für internationale Zahlungen Zusatzgebühren an?',
        answer: 'Für Zahlungen außerhalb des Europäischen Wirtschaftsraums (EWR) fällt eine grenzüberschreitende Gebühr von 1,29% bis 1,99% an.'
      }
    ],
    marketNotes: [
      'Inländischer Standardsatz: 2,99% + 0,39 €.',
      'EWR-Transaktionen ohne Währungsumrechnung unterliegen reduzierten Sätzen.'
    ]
  },

  // STRIPE
  'stripe-fee-calculator/in-usa': {
    calculatorSlug: 'stripe-fee-calculator',
    subSlug: 'in-usa',
    title: 'Stripe Fee Calculator USA',
    metaTitle: 'Stripe Fee Calculator USA (2026 Rates) | Kazcut',
    metaDescription: 'Calculate Stripe processing fees in the United States (2.9% + $0.30), international card markups, and chargeback exposure.',
    h1: 'Stripe Fee Calculator: United States',
    description: 'Accurate breakdown of US Stripe card processing costs, payout amounts, and dispute risk buffers.',
    defaultCurrency: 'USD',
    defaultInputs: {
      amount: 100,
      mode: 'receive',
      isInternational: false,
      needsCurrencyConversion: false,
      currency: 'USD',
    },
    faqs: [
      {
        question: 'What is the standard US Stripe processing fee?',
        answer: 'Stripe charges 2.9% plus $0.30 per successful card charge for standard US domestic credit and debit cards.'
      },
      {
        question: 'What is the fee for international cards on Stripe?',
        answer: 'Stripe adds an additional 1.5% for cards issued outside the United States. If currency conversion is required, an extra 1.0% fee applies.'
      },
      {
        question: 'How much does a Stripe chargeback dispute cost?',
        answer: 'Stripe assesses a $15.00 dispute fee per chargeback, which is refunded if the dispute is resolved in your favor.'
      }
    ],
    marketNotes: [
      'US Domestic Card Processing: 2.9% + $0.30 USD.',
      'International Card Surcharge: +1.5%.',
      'Currency Conversion Surcharge: +1.0%.'
    ]
  },

  'stripe-fee-calculator/in-canada': {
    calculatorSlug: 'stripe-fee-calculator',
    subSlug: 'in-canada',
    title: 'Stripe Fee Calculator Canada',
    metaTitle: 'Stripe Fee Calculator Canada (2026 Rates) | Kazcut',
    metaDescription: 'Calculate Canadian Stripe processing fees: 2.9% + CA$0.30 domestic, international card charges, and dispute costs.',
    h1: 'Stripe Fee Calculator: Canada',
    description: 'Calculate Canadian Stripe credit card fees, cross-border transactions, and net bank deposit totals.',
    defaultCurrency: 'CAD',
    defaultInputs: {
      amount: 100,
      mode: 'receive',
      isInternational: false,
      needsCurrencyConversion: false,
      currency: 'CAD',
    },
    faqs: [
      {
        question: 'What are Stripe transaction rates in Canada?',
        answer: 'Domestic Canadian cards are charged 2.9% + CA$0.30. Interac debit transactions through compatible gateways incur separate volume rates.'
      }
    ],
    marketNotes: [
      'Canadian standard card rate: 2.9% + CA$0.30.',
      'International surcharge: +1.5% for non-Canadian cards.'
    ]
  },

  'stripe-fee-calculator/in-uk': {
    calculatorSlug: 'stripe-fee-calculator',
    subSlug: 'in-uk',
    title: 'Stripe Fee Calculator UK',
    metaTitle: 'Stripe Fee Calculator UK (2026 Rates) | Kazcut',
    metaDescription: 'Calculate UK Stripe card processing fees: 1.5% + 20p for UK/EEA cards and 3.25% + 20p for international cards.',
    h1: 'Stripe Fee Calculator: United Kingdom',
    description: 'Breakdown of UK domestic and international Stripe interchange rates, payout totals, and VAT treatment.',
    defaultCurrency: 'GBP',
    defaultInputs: {
      amount: 100,
      mode: 'receive',
      isInternational: false,
      needsCurrencyConversion: false,
      currency: 'GBP',
      customRatePercent: 1.5,
      customFixedFee: 0.20,
    },
    faqs: [
      {
        question: 'What is the UK domestic card rate for Stripe?',
        answer: 'Standard UK and European Economic Area (EEA) consumer cards are charged 1.5% plus £0.20 per transaction.'
      },
      {
        question: 'What is the international card fee on Stripe UK?',
        answer: 'International cards issued outside the UK/EEA are charged 3.25% plus £0.20 per transaction.'
      }
    ],
    marketNotes: [
      'UK & EEA standard cards: 1.5% + £0.20 GBP.',
      'International cards: 3.25% + £0.20 GBP.'
    ]
  },

  // ETSY
  'etsy-fee-calculator/for-digital-products': {
    calculatorSlug: 'etsy-fee-calculator',
    subSlug: 'for-digital-products',
    title: 'Etsy Fee Calculator for Digital Products',
    metaTitle: 'Etsy Digital Products Fee Calculator (2026) | Kazcut',
    metaDescription: 'Calculate net profit margins on Etsy digital downloads, printables, templates, and SVG files with zero shipping costs.',
    h1: 'Etsy Fee Calculator: Digital Downloads & Printables',
    description: 'Analyze net profit margins for digital products on Etsy. Accounts for the $0.20 listing fee, 6.5% transaction fee, and payment processing without physical shipping overhead.',
    defaultCurrency: 'USD',
    defaultInputs: {
      salePrice: 15,
      shippingCharged: 0,
      itemCost: 0.50,
      shippingCost: 0,
      quantity: 1,
      offsiteAds: 'none',
      paymentProcessingPercent: 3.0,
      paymentProcessingFixed: 0.25,
      regulatoryOperatingFeePercent: 0,
      currency: 'USD',
    },
    faqs: [
      {
        question: 'What are the main fees for selling digital products on Etsy?',
        answer: 'Digital items incur the standard $0.20 USD listing fee (auto-renewed every 4 months or per sale), a 6.5% transaction fee on the sale price, and payment processing fees (typically 3% + $0.25 in the US).'
      },
      {
        question: 'Do digital products on Etsy pay transaction fees on shipping?',
        answer: 'No. Since digital items have no shipping charge, the 6.5% transaction fee applies strictly to the item price.'
      }
    ],
    marketNotes: [
      'Zero shipping overhead delivers high 70-85% net margins on digital inventory.',
      'Listing renewal occurs automatically upon each multi-quantity digital download sale.'
    ]
  },

  'etsy-fee-calculator/for-handmade-items': {
    calculatorSlug: 'etsy-fee-calculator',
    subSlug: 'for-handmade-items',
    title: 'Etsy Fee Calculator for Handmade Products',
    metaTitle: 'Etsy Handmade Fee & Profit Calculator (2026) | Kazcut',
    metaDescription: 'Calculate true profit margins for physical handmade products on Etsy including material costs, packaging, and shipping fees.',
    h1: 'Etsy Fee Calculator: Handmade & Physical Goods',
    description: 'Calculate net margins for handmade sellers accounting for materials, packaging, domestic postage, Etsy listing, and transaction cuts.',
    defaultCurrency: 'USD',
    defaultInputs: {
      salePrice: 45,
      shippingCharged: 5,
      itemCost: 14,
      shippingCost: 4.50,
      quantity: 1,
      offsiteAds: 'none',
      paymentProcessingPercent: 3.0,
      paymentProcessingFixed: 0.25,
      regulatoryOperatingFeePercent: 0,
      currency: 'USD',
    },
    faqs: [
      {
        question: 'Does Etsy charge the 6.5% transaction fee on postage?',
        answer: 'Yes. Etsy charges the 6.5% transaction fee on both the product price and the postage amount billed to the customer.'
      },
      {
        question: 'Can I opt out of Etsy Offsite Ads?',
        answer: 'Sellers making under $10,000 USD in trailing 12 months can opt out. Once you cross $10,000, participation is mandatory at a 12% fee on attributed sales.'
      }
    ],
    marketNotes: [
      'Transaction fee of 6.5% applies to (Item Price + Shipping Charged).',
      'Always factor packaging materials and transit insurance into physical COGS.'
    ]
  },

  // AMAZON FBA
  'amazon-fba-calculator/in-usa': {
    calculatorSlug: 'amazon-fba-calculator',
    subSlug: 'in-usa',
    title: 'Amazon FBA Calculator USA',
    metaTitle: 'Amazon FBA Fee & Profit Calculator USA (2026) | Kazcut',
    metaDescription: 'Calculate Amazon US FBA fulfillment fees, category referral rates (8-15%), monthly storage fees, and net ROI.',
    h1: 'Amazon FBA Calculator: United States',
    description: 'Real-time margin and ROI calculator for Amazon US sellers. Incorporates current FBA tier fulfillment schedules, referral cuts, and ocean/air freight inbound costs.',
    defaultCurrency: 'USD',
    defaultInputs: {
      itemPrice: 29.99,
      cogs: 6.50,
      inboundShipping: 1.20,
      category: 'Home & Kitchen',
      referralRatePercent: 15,
      fbaTier: 'large_standard_under_1lb',
      monthlyStorageMonths: 1,
      estimatedStoragePerUnit: 0.25,
      salesVelocityPerMonth: 500,
      currency: 'USD',
    },
    faqs: [
      {
        question: 'How are Amazon FBA fulfillment fees calculated in the US?',
        answer: 'Fulfillment fees depend on package dimensions and shipping weight. Standard items under 1 lb are currently charged around $3.86 per unit.'
      },
      {
        question: 'What is the standard Amazon referral fee rate?',
        answer: 'Most consumer product categories carry a 15% referral fee on the gross sales price, with lower rates (e.g. 8%) on electronics.'
      }
    ],
    marketNotes: [
      'Referral fee: 15% standard across most consumer merchandise.',
      'Large standard tier (< 1 lb): $3.86 FBA base fee.',
      'Peak monthly inventory storage rates apply from October through December.'
    ]
  },

  'amazon-fba-calculator/in-germany': {
    calculatorSlug: 'amazon-fba-calculator',
    subSlug: 'in-germany',
    title: 'Amazon FBA Calculator Germany & Pan-EU',
    metaTitle: 'Amazon FBA Rechner Deutschland (2026) | Kazcut',
    metaDescription: 'Berechnen Sie Amazon FBA Gebühren für Amazon.de, Fulfillment-Kosten, Verkaufsgebühren und Nettomargen in Euro.',
    h1: 'Amazon FBA Rechner: Deutschland (Amazon.de)',
    description: 'Ermitteln Sie Fulfillment-Kosten, Verkaufsgebühren, Transportkosten und Nettogewinne für Amazon.de Händler.',
    defaultCurrency: 'EUR',
    defaultInputs: {
      itemPrice: 29.99,
      cogs: 7.00,
      inboundShipping: 1.50,
      category: 'Haushalt',
      referralRatePercent: 15,
      fbaTier: 'large_standard_under_1lb',
      customFbaFee: 3.95,
      monthlyStorageMonths: 1,
      estimatedStoragePerUnit: 0.28,
      salesVelocityPerMonth: 300,
      currency: 'EUR',
    },
    faqs: [
      {
        question: 'Wie hoch sind die Verkaufsgebühren bei Amazon.de?',
        answer: 'Die meisten Produktkategorien haben eine Verkaufsgebühr von 15 % auf den Bruttoverkaufspreis.'
      }
    ],
    marketNotes: [
      'Verkaufsgebühr: 15% im Durchschnitt.',
      'Deutsche Umsatzsteuer (19% MwSt.) bei Preisen beachten.'
    ]
  },

  // SHOPIFY
  'shopify-profit-calculator/for-dropshipping': {
    calculatorSlug: 'shopify-profit-calculator',
    subSlug: 'for-dropshipping',
    title: 'Shopify Dropshipping Profit Calculator',
    metaTitle: 'Shopify Dropshipping Profit Calculator (2026) | Kazcut',
    metaDescription: 'Calculate realistic net margins for Shopify dropshipping stores. Factor in ad spend CAC, supplier COGS, and payment gateway fees.',
    h1: 'Shopify Profit Calculator: Dropshipping Business Model',
    description: 'Calculate true take-home margins for dropshipping brands. Accurately accounts for aggressive customer acquisition costs (CAC), supplier product charges, and gateway transactions.',
    defaultCurrency: 'USD',
    defaultInputs: {
      retailPrice: 49.99,
      cogs: 16.00,
      shippingCharged: 0,
      shippingCost: 0,
      adSpendPerOrder: 22.00,
      otherCostsPerOrder: 2.00,
      planType: 'basic',
      estimatedMonthlyOrders: 400,
      currency: 'USD',
    },
    faqs: [
      {
        question: 'What is a typical net profit margin for a dropshipping store?',
        answer: 'Healthy dropshipping stores generally achieve a net profit margin between 10% and 22% after accounting for paid traffic CAC and supplier COGS.'
      },
      {
        question: 'What is break-even CAC?',
        answer: 'Break-even CAC is the maximum customer acquisition cost you can spend on an order before suffering a net financial loss on the transaction.'
      }
    ],
    marketNotes: [
      'Customer acquisition costs often consume 35-50% of top-line revenue in dropshipping.',
      'Maintain at least a 3.0x markup on supplier base cost to preserve healthy net profitability.'
    ]
  },

  'shopify-profit-calculator/for-dtc-brands': {
    calculatorSlug: 'shopify-profit-calculator',
    subSlug: 'for-dtc-brands',
    title: 'Shopify DTC Brand Margin Calculator',
    metaTitle: 'Shopify DTC Brand Profit Margin Calculator (2026) | Kazcut',
    metaDescription: 'Calculate unit economics, blended ad CAC, custom packaging, and net profit margins for direct-to-consumer e-commerce brands.',
    h1: 'Shopify Profit Calculator: DTC Brands & Private Label',
    description: 'Analyze unit economics for direct-to-consumer retail brands selling via Shopify. Tracks packaging, custom fulfillment, marketing CAC, and gateway transaction rates.',
    defaultCurrency: 'USD',
    defaultInputs: {
      retailPrice: 78.00,
      cogs: 18.50,
      shippingCharged: 6.00,
      shippingCost: 7.20,
      adSpendPerOrder: 24.00,
      otherCostsPerOrder: 3.50,
      planType: 'shopify',
      estimatedMonthlyOrders: 1200,
      currency: 'USD',
    },
    faqs: [
      {
        question: 'What plan is best for DTC brands doing over $50,000/month?',
        answer: 'At scale, the Shopify Plan (2.7% + 30¢) or Advanced Shopify (2.5% + 30¢) saves thousands in payment processing fees compared to the Basic plan.'
      }
    ],
    marketNotes: [
      'Target gross margins of 65%+ to safely absorb advertising volatility and freight surcharges.',
      'Repeat purchase rate significantly boosts blended lifetime margin beyond first-order CAC.'
    ]
  },

  // FREELANCE HOURLY RATE
  'freelance-hourly-rate-calculator/for-software-engineers': {
    calculatorSlug: 'freelance-hourly-rate-calculator',
    subSlug: 'for-software-engineers',
    title: 'Freelance Rate Calculator for Software Engineers',
    metaTitle: 'Freelance Software Engineer Hourly Rate Calculator | Kazcut',
    metaDescription: 'Calculate the exact hourly and day rate required to hit your desired take-home salary after self-employment taxes, equipment, and non-billable hours.',
    h1: 'Freelance Rate Calculator: Software Developers & Engineers',
    description: 'Determine billable hourly rates for freelance software engineers, cloud architects, and full-stack developers. Factors in unbillable coding/admin time and self-employment taxes.',
    defaultCurrency: 'USD',
    defaultInputs: {
      targetNetAnnualIncome: 140000,
      hoursPerWeek: 35,
      vacationWeeksPerYear: 5,
      nonBillablePercent: 25,
      effectiveTaxRatePercent: 30,
      annualBusinessExpenses: 8000,
      profitMarginBufferPercent: 15,
      currency: 'USD',
    },
    faqs: [
      {
        question: 'Why do freelance software engineers need a higher hourly rate than full-time employees?',
        answer: 'Freelancers must cover employer and employee payroll taxes (self-employment tax), health insurance, retirement contributions, hardware/software tooling, and unbillable sales/administrative time.'
      },
      {
        question: 'How much of a software engineer’s time is truly billable?',
        answer: 'Most solo software consultants bill between 25 and 30 hours per week; the remaining 10 to 15 hours are consumed by client communication, scoping, code reviews, and administrative tasks.'
      }
    ],
    marketNotes: [
      'Account for 20-30% non-billable overhead for administrative tasks, client meetings, and invoicing.',
      'Self-employment tax in the US adds a mandatory 15.3% FICA burden on top of federal and state income tax.'
    ]
  },

  'freelance-hourly-rate-calculator/for-designers': {
    calculatorSlug: 'freelance-hourly-rate-calculator',
    subSlug: 'for-designers',
    title: 'Freelance Rate Calculator for UI/UX Designers',
    metaTitle: 'Freelance Designer Hourly Rate Calculator (2026) | Kazcut',
    metaDescription: 'Calculate your freelance design hourly rate based on target income, portfolio and pitch time, Figma subscriptions, and taxes.',
    h1: 'Freelance Rate Calculator: UI/UX & Product Designers',
    description: 'Calculate hourly and project pricing for freelance designers. Includes Figma subscriptions, hardware amortization, client pitch time, and tax allocations.',
    defaultCurrency: 'USD',
    defaultInputs: {
      targetNetAnnualIncome: 95000,
      hoursPerWeek: 35,
      vacationWeeksPerYear: 4,
      nonBillablePercent: 30,
      effectiveTaxRatePercent: 28,
      annualBusinessExpenses: 6500,
      profitMarginBufferPercent: 15,
      currency: 'USD',
    },
    faqs: [
      {
        question: 'What percentage of time should freelance designers reserve for non-billable work?',
        answer: 'Designers typically spend 25% to 35% of their working hours on pitch decks, contract negotiations, feedback cycles, and portfolio updates.'
      }
    ],
    marketNotes: [
      'Factor software licenses (Figma, Adobe Creative Cloud, 3D renderers) directly into overhead.',
      'Day rate pricing (typically 8x billable hourly rate) reduces micro-time tracking overhead.'
    ]
  },
};

export const ALL_CALCULATORS = [
  {
    slug: 'paypal-fee-calculator',
    name: 'PayPal Fee Calculator',
    shortName: 'PayPal',
    description: 'Calculate PayPal domestic, international, and invoicing transaction fees and required invoice totals.',
    category: 'Payment Processors',
  },
  {
    slug: 'stripe-fee-calculator',
    name: 'Stripe Fee Calculator',
    shortName: 'Stripe',
    description: 'Calculate Stripe processing fees, international card markups, currency conversion, and dispute costs.',
    category: 'Payment Processors',
  },
  {
    slug: 'etsy-fee-calculator',
    name: 'Etsy Seller Fee Calculator',
    shortName: 'Etsy',
    description: 'Calculate Etsy listing fees, transaction cuts, payment processing, offsite ads, and net profit margins.',
    category: 'Marketplaces',
  },
  {
    slug: 'amazon-fba-calculator',
    name: 'Amazon FBA Profit Calculator',
    shortName: 'Amazon FBA',
    description: 'Calculate Amazon referral fees, FBA fulfillment tiers, inventory storage costs, and ROI per unit.',
    category: 'Marketplaces',
  },
  {
    slug: 'shopify-profit-calculator',
    name: 'Shopify Profit Margin Calculator',
    shortName: 'Shopify',
    description: 'Calculate gross and net profit margins, ad spend CAC break-even, and payment gateway costs.',
    category: 'E-Commerce',
  },
  {
    slug: 'freelance-hourly-rate-calculator',
    name: 'Freelance Hourly Rate Calculator',
    shortName: 'Freelance',
    description: 'Determine the exact hourly rate required to reach your net income goal after taxes and business overhead.',
    category: 'Freelancing',
  },
];

