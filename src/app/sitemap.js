export default function sitemap() {
  const baseUrl = 'https://www.nomadexpressgroup.com';
  const routes = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/services', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/services/full-truckload', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services/ltl', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services/expedited', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services/refrigerated', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services/flatbed', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services/warehousing', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/fleet', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/coverage', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/careers', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/apply', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/gallery', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/quote', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}


