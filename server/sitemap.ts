import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

// An array of your website's routes
const links = [
  { url: "/", priority: 1.0 },
  { url: "/services", priority: 0.8 },
  { url: "/service/digital-marketing", priority: 0.7 },
  { url: "/service/manufacturing-analytics", priority: 0.7 },
  { url: "/service/digital-transformation", priority: 0.7 },
  { url: "/service/customer-success", priority: 0.7 },
  { url: "/case-studies", priority: 0.8 },
  { url: "/case-studies/precision-plant-oee-lift", priority: 0.8 },
  { url: "/case-studies/b2b-lead-engine", priority: 0.8 },
  { url: "/case-studies/healthcare-patient-journey", priority: 0.8 },
  { url: "/case-studies/retail-inventory-optimization", priority: 0.8 },
  { url: "/case-studies/fintech-customer-onboarding", priority: 0.8 },
  { url: "/about", priority: 0.6 },
  { url: "/contact", priority: 0.5 },
];

export const generateSitemap = async (hostname: string) => {
  const stream = new SitemapStream({ hostname });
  const xmlStream = Readable.from(links).pipe(stream);
  const sitemap = await streamToPromise(xmlStream).then((data) => data.toString());
  return sitemap;
};
