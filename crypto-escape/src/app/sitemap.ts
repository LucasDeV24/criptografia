import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://crypto-escape.vercel.app';

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/episodes`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/ranking`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/reference`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/cadastro`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/entrar`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];
}
