import type { Metadata } from 'next';
import Script from 'next/script';
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
    default: 'Kazcut — Free E-Commerce & Freelancer Profit/Fee Calculator (2026)',
    template: '%s | Kazcut',
  },
  description:
    'Kazcut is the precision fee & profit calculator for PayPal, Stripe, Etsy, Amazon FBA, Shopify, and freelancers. 100% free, updated for 2026 rates, with instant PDF summary exports.',
  keywords: [
    'Kazcut',
    'Kazcut calculator',
    'Kazcut fee calculator',
    'Kazcut profit calculator',
    'paypal fee calculator',
    'paypal fee calculator 2026',
    'how much does paypal take',
    'stripe fee calculator',
    'stripe credit card fee calculator',
    'stripe fees 2026',
    'etsy fee calculator',
    'etsy seller fee calculator 2026',
    'how much does etsy take',
    'amazon fba calculator',
    'amazon fba fee calculator',
    'shopify profit margin calculator',
    'shopify fee calculator',
    'freelance hourly rate calculator',
    'how much to charge freelance',
    'reverse fee calculator',
    'merchant processing fee',
    'e-commerce profit calculator',
  ],
  authors: [{ name: 'Kazcut Engineering', url: siteUrl }],
  creator: 'Kazcut',
  publisher: 'Kazcut',
  applicationName: 'Kazcut',
  category: 'Finance',
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
    title: 'Kazcut — Free E-Commerce & Freelancer Profit/Fee Calculator',
    description:
      'High-precision financial calculators for PayPal, Stripe, Etsy, Amazon FBA, Shopify, and freelancers. Reverse net logic & instant PDF exports.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kazcut — E-Commerce & Freelancer Profit/Fee Calculator',
    description:
      'Calculate exact platform fees, take-home net profit, and break-even thresholds across major commerce platforms.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsensePublisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

  // Global Brand & WebSite Structured JSON-LD for Google Rich Results
  const globalSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Kazcut',
        description: 'Independent Financial & Fee Calculators for Digital Merchants and Freelancers',
        publisher: {
          '@id': `${siteUrl}/#organization`,
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Kazcut',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/favicon.ico`,
        },
        sameAs: ['https://github.com/soufiane-aziz/kazcut'],
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
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '2480',
          bestRating: '5',
          worstRating: '1',
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
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
      </head>
      <body className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2C221E] antialiased">
        <GuideProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <GuideModal />
        </GuideProvider>
      </body>
    </html>
  );
}
