import { MetadataRoute } from 'next';
import { ALL_CALCULATORS, PROGRAMMATIC_PAGES } from '@/lib/geoData';
import { getSiteUrl } from '@/lib/siteUrl';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const currentDate = new Date().toISOString();

  // Root Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // Core Calculator Root Pages
  ALL_CALCULATORS.forEach((calc) => {
    routes.push({
      url: `${baseUrl}/${calc.slug}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    });
  });

  // Programmatic Dynamic Routes (Geo-SEO & Platforms)
  Object.keys(PROGRAMMATIC_PAGES).forEach((key) => {
    routes.push({
      url: `${baseUrl}/${key}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  return routes;
}

