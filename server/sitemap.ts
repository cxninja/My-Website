import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

// An array of your website's routes
const links = [
  { url: "/", priority: 1.0 },
  { url: "/about", priority: 0.6 },
  { url: "/leadership", priority: 0.6 },
  
  // New structure - Capabilities
  { url: "/expertise", priority: 0.8 },
  { url: "/capability/customer-success", priority: 0.7 },
  { url: "/capability/digital-marketing", priority: 0.7 },
  { url: "/capability/digital-transformation", priority: 0.7 },
  { url: "/capability/gtm-strategy", priority: 0.7 },
  { url: "/capability/leadership-scaling", priority: 0.7 },
  { url: "/capability/cross-industry", priority: 0.7 },
  { url: "/capability/ai-innovation", priority: 0.7 },
  { url: "/capability/stakeholder-engagement", priority: 0.7 },
  
  // New structure - Edgy Insights
  { url: "/edgy-insights", priority: 0.8 },
  { url: "/edgy-insights/retention-revolution", priority: 0.8 },
  { url: "/edgy-insights/marketing-edge", priority: 0.8 },
  { url: "/edgy-insights/transformation-thrust", priority: 0.8 },
  { url: "/edgy-insights/engagement-evolution", priority: 0.8 },
  { url: "/edgy-insights/scaling-surge", priority: 0.8 },
  { url: "/edgy-insights/stakeholder-sync", priority: 0.8 },
  
  // New pages
  { url: "/innovations", priority: 0.6 },
  { url: "/toolkit", priority: 0.6 },
  { url: "/connect", priority: 0.5 },
  
  // Legacy URLs (for SEO transition)
  { url: "/services", priority: 0.3 },
  { url: "/case-studies", priority: 0.3 },
  { url: "/contact", priority: 0.3 },
];

export const generateSitemap = async (hostname: string) => {
  const stream = new SitemapStream({ hostname });
  const xmlStream = Readable.from(links).pipe(stream);
  const sitemap = await streamToPromise(xmlStream).then((data) => data.toString());
  return sitemap;
};
