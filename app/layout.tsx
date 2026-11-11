import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://kazcut.vercel.app'),
  title: {
    default: 'Kazcut | E-Commerce & Freelancer Profit Fee Calculator',
    template: '%s | Kazcut',
  },
  description:
    'Calculate platform fees, merchant processing rates, and net take-home profits across PayPal, Stripe, Etsy, Amazon FBA, Shopify, and freelance consulting.',
  keywords: [
    'fee calculator',
    'paypal fee calculator',
    'stripe fee calculator',
    'etsy fee calculator',
    'amazon fba calculator',
    'shopify profit margin calculator',
    'freelance hourly rate calculator',
    'merchant processing fee',
    'net profit calculation',
  ],
  authors: [{ name: 'Kazcut Engineering' }],
  creator: 'Kazcut',
  publisher: 'Kazcut',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://kazcut.vercel.app',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kazcut.vercel.app',
    siteName: 'Kazcut',
    title: 'Kazcut | E-Commerce & Freelancer Profit Fee Calculator',
    description:
      'High-precision platform fee and profit calculators for PayPal, Stripe, Etsy, Amazon FBA, Shopify, and freelancers.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kazcut | E-Commerce & Freelancer Profit Fee Calculator',
    description:
      'Accurately calculate net profits and merchant processing fees with live interactive sliders and PDF export.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsensePublisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

  return (
    <html lang="en">
      <head>
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
