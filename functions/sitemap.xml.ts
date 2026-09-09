export async function onRequestGet(): Promise<Response> {
  const baseUrl = 'https://odishaaspirants.com';
  const now = new Date().toISOString();

  const staticUrls = [
    { loc: `${baseUrl}/`, changefreq: 'always', priority: '1.0' },
    { loc: `${baseUrl}/latest-jobs`, changefreq: 'daily', priority: '0.9' },
    { loc: `${baseUrl}/admit-card`, changefreq: 'daily', priority: '0.8' },
    { loc: `${baseUrl}/answer-key`, changefreq: 'daily', priority: '0.8' },
    { loc: `${baseUrl}/result`, changefreq: 'daily', priority: '0.8' },
    { loc: `${baseUrl}/syllabus`, changefreq: 'weekly', priority: '0.7' },
    { loc: `${baseUrl}/pyq`, changefreq: 'weekly', priority: '0.7' },
    { loc: `${baseUrl}/about-us`, changefreq: 'monthly', priority: '0.5' },
    { loc: `${baseUrl}/contact-us`, changefreq: 'monthly', priority: '0.5' },
    { loc: `${baseUrl}/disclaimer`, changefreq: 'monthly', priority: '0.4' },
    { loc: `${baseUrl}/privacy-policy`, changefreq: 'monthly', priority: '0.4' },
    { loc: `${baseUrl}/terms-conditions`, changefreq: 'monthly', priority: '0.4' },
  ];

  let dynamicUrls: { loc: string; changefreq: string; priority: string }[] = [];

  try {
    const res = await fetch('https://api.odishaaspirants.com/api/jobs');
    const json = (await res.json()) as any;
    if (json.success && Array.isArray(json.data)) {
      dynamicUrls = json.data.map((job: any) => {
        const slug =
          job.slug ||
          `${job.board}-${job.title}`
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
        return {
          loc: `${baseUrl}/articles/${slug}`,
          changefreq: 'daily',
          priority: '0.8',
        };
      });
    }
  } catch {
    // Return static URLs if database/api request fails
  }

  const allUrls = [...staticUrls, ...dynamicUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=1800, s-maxage=3600',
    },
  });
}
