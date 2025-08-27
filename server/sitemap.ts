import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

// An array of your website's routes
const links = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/services", changefreq: "weekly", priority: 0.8 },
  { url: "/service/digital-marketing", changefreq: "monthly", priority: 0.7 },
  { url: "/service/manufacturing-analytics", changefreq: "monthly", priority: 0.7 },
  { url: "/service/digital-transformation", changefreq: "monthly", priority: 0.7 },
  { url: "/service/customer-success", changefreq: "monthly", priority: 0.7 },
  { url: "/case-studies", changefreq: "weekly", priority: 0.8 },
  { url: "/case-studies/precision-plant-oee-lift", changefreq: "weekly", priority: 0.8 },
  { url: "/case-studies/b2b-lead-engine", changefreq: "weekly", priority: 0.8 },
  { url: "/case-studies/healthcare-patient-journey", changefreq: "weekly", priority: 0.8 },
  { url: "/case-studies/retail-inventory-optimization", changefreq: "weekly", priority: 0.8 },
  { url: "/case-studies/fintech-customer-onboarding", changefreq: "weekly", priority: 0.8 },
  { url: "/about", changefreq: "monthly", priority: 0.6 },
  { url: "/contact", changefreq: "yearly", priority: 0.5 },
];

export const generateSitemap = async () => {
  const stream = new SitemapStream({ hostname: "https://your-website-url.com" });
  const xmlStream = Readable.from(links).pipe(stream);
  const sitemap = await streamToPromise(xmlStream).then((data) => data.toString());
  return sitemap;
};
