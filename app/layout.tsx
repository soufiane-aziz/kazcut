import type { Metadata } from 'next';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GuideModal from '@/components/GuideModal';
import { GuideProvider } from '@/context/GuideContext';
import { getSiteUrl } from '@/lib/siteUrl';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Free PayPal, Stripe & Etsy Fee Calculator (2026) | Kazcut',
    template: '%s | Kazcut',
  },
  description:
    'Free fee & profit calculator for PayPal, Stripe, Etsy, Amazon FBA, Shopify, and freelancers. Updated for 2026 rates with reverse-fee math and PDF exports.',
  keywords: [
    // Brand & Variations
    'Kazcut',
    'kazcut',
    'Kazcut official',
    'Kazcut calculator',
    'Kazcut fee calculator',
    'Kazcut profit calculator',
    'Kazcut tools',
    'kazcut app',
    'kazcut online',
    'kazcut free',
    'kaz cut',
    'kazcut financial calculator',
    'kazcut e-commerce calculator',
    // PayPal Keywords
    'paypal fee calculator',
    'paypal fee calculator 2026',
    'paypal fees',
    'how much does paypal take',
    'paypal seller fees',
    'paypal goods and services fee',
    'paypal invoice fee calculator',
    'calculate paypal fee',
    'paypal cut calculator',
    'paypal reverse fee calculator',
    'paypal net amount calculator',
    'paypal commercial transaction fee',
    'paypal merchant fees',
    'paypal cross border fee',
    'paypal international transaction fee',
    'paypal deduction calculator',
    // Stripe Keywords
    'stripe fee calculator',
    'stripe fee calculator 2026',
    'stripe credit card fee calculator',
    'stripe processing fees',
    'stripe fees 2026',
    'how much does stripe charge',
    'stripe transaction fee calculator',
    'stripe interchange fee',
    'stripe payout calculator',
    'stripe dispute fee calculator',
    'stripe currency conversion fee',
    'stripe billing fee calculator',
    'stripe invoice calculator',
    'stripe net profit calculator',
    'stripe seller fees',
    // Etsy Keywords
    'etsy fee calculator',
    'etsy seller fee calculator',
    'etsy fee calculator 2026',
    'how much does etsy take',
    'etsy profit calculator',
    'etsy listing fee calculator',
    'etsy transaction fee calculator',
    'etsy payment processing fee',
    'etsy offsite ads fee calculator',
    'etsy regulatory operating fee',
    'etsy seller fees breakdown',
    'etsy pricing calculator',
    'etsy break even calculator',
    'etsy shop profit calculator',
    'etsy seller profit margin',
    // Amazon FBA Keywords
    'amazon fba calculator',
    'amazon fba fee calculator',
    'amazon fba profit calculator',
    'amazon seller fee calculator',
    'amazon referral fee calculator',
    'amazon fulfillment fee calculator',
    'amazon fba storage fee calculator',
    'amazon fba unit economics',
    'amazon fba margins calculator',
    'amazon fba break even',
    'amazon fba calculator 2026',
    'amazon seller central calculator',
    'amazon revenue calculator',
    'amazon seller profit margin',
    // Shopify Keywords
    'shopify profit margin calculator',
    'shopify fee calculator',
    'shopify profit calculator',
    'shopify fees 2026',
    'shopify basic plan fees',
    'shopify payment gateway fees',
    'shopify transaction fee calculator',
    'shopify store profit calculator',
    'shopify break even roas calculator',
    'shopify roas break even',
    'shopify ad spend margin calculator',
    'shopify gross margin calculator',
    'shopify ecommerce profit calculator',
    'shopify net profit calculator',
    // Freelance & Contractor Keywords
    'freelance hourly rate calculator',
    'how much to charge freelance',
    'how much should i charge freelance',
    'freelance rate calculator',
    'freelance billable rate calculator',
    'contractor hourly rate calculator',
    'consultant hourly rate calculator',
    'freelance day rate calculator',
    'freelance pricing calculator',
    'freelance salary to hourly rate',
    'freelancer net income calculator',
    'freelance tax calculator overhead',
    'freelance pricing strategy',
    'contractor billing rate calculator',
    // Financial & E-Commerce Core Keywords
    'reverse fee calculator',
    'merchant processing fee',
    'merchant processing fee calculator',
    'e-commerce profit calculator',
    'credit card processing fee calculator',
    'payment processor fee comparison',
    'online seller fee calculator',
    'net profit calculator online',
    'break even calculator ecommerce',
    'gross to net fee calculator',
    'invoice amount calculator',
    'digital commerce fee calculator',
    'small business fee calculator',
    'instant fee deduction calculator',
    'merchant take home pay calculator',
    'online transaction fee estimator',
  ],
  authors: [{ name: 'Kazcut Engineering', url: siteUrl }],
  creator: 'Kazcut',
  publisher: 'Kazcut',
  applicationName: 'Kazcut',
  category: 'Finance',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: {
      ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
        ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
        : {}),
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Kazcut',
    title: 'Free PayPal, Stripe & Etsy Fee Calculator (2026) | Kazcut',
    description:
      'High-precision financial calculators for PayPal, Stripe, Etsy, Amazon FBA, Shopify, and freelancers. Reverse net logic & instant PDF exports.',
    images: [
      {
        url: `${siteUrl}/icon-512.png`,
        width: 512,
        height: 512,
        alt: 'Kazcut Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Free PayPal, Stripe & Etsy Fee Calculator (2026) | Kazcut',
    description:
      'Calculate exact platform fees, take-home net profit, and break-even thresholds across major commerce platforms.',
    images: [`${siteUrl}/icon-512.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rawAdsenseId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID?.trim();
  const rawGoogleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID?.trim();
  const adsensePublisherId =
    rawAdsenseId && /^ca-pub-\d{10,20}$/.test(rawAdsenseId) ? rawAdsenseId : undefined;
  const googleTagId =
    rawGoogleTagId && /^(G|AW|GT|DC)-[A-Z0-9]+$/.test(rawGoogleTagId) ? rawGoogleTagId : undefined;

  // Global Brand & WebSite Structured JSON-LD for Google Rich Results
  const globalSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Kazcut',
        alternateName: [
          'Kazcut Official',
          'Kazcut Fee Calculator',
          'Kazcut Profit Calculator',
          'Kazcut Financial Tools',
          'Kazcut App',
        ],
        description: 'Official Kazcut precision profit and platform fee calculation platform for digital merchants and freelancers.',
        publisher: {
          '@id': `${siteUrl}/#organization`,
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Kazcut',
        legalName: 'Kazcut Platform',
        alternateName: ['Kazcut Official', 'Kazcut Tools'],
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/icon-512.png`,
          width: 512,
          height: 512,
        },
        sameAs: ['https://github.com/soufiane-aziz/kazcut'],
        description:
          'Kazcut provides open-access financial transaction fee calculators, break-even estimators, and net take-home computations for global digital commerce.',
      },
      {
        '@type': 'Brand',
        '@id': `${siteUrl}/#brand`,
        name: 'Kazcut',
        alternateName: 'Kazcut Calculator',
        description:
          'Kazcut is an independent digital financial calculator utility, engineered for calculating merchant processing fees and e-commerce margins.',
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${siteUrl}/#software`,
        name: 'Kazcut Fee & Profit Calculator Platform',
        operatingSystem: 'All (Web-based)',
        applicationCategory: 'BusinessApplication',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon-48.png" sizes="48x48" type="image/png" />
        <link rel="icon" href="/icon-96.png" sizes="96x96" type="image/png" />
        <link rel="icon" href="/icon-192.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/icon-512.png" sizes="512x512" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="apple-mobile-web-app-title" content="Kazcut" />
        <meta name="application-name" content="Kazcut" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
        {adsensePublisherId && (
          <Script
            id="google-adsense"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsensePublisherId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        {googleTagId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
            />
            <Script
              id="google-tag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', ${JSON.stringify(googleTagId)}, {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2C221E] antialiased">
        <GuideProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <GuideModal />
        </GuideProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
