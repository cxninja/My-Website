import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import { createClient } from "@sanity/client";

// Dev-server sitemaps. Mirrors netlify/edge-functions/sitemap.ts so
// `npm run dev` and the deployed Netlify edge function produce equivalent
// output. Index + three child sitemaps:
//   /sitemap.xml               → index
//   /sitemap-pages.xml         → static pages
//   /sitemap-case-studies.xml  → edgyInsight
//   /sitemap-blog.xml          → blog posts + author pages

const sanity = createClient({
  projectId: "s7vf0n9j",
  dataset: "production",
  apiVersion: "2026-02-01",
  useCdn: true,
});

// /innovations is intentionally excluded — Phase 2, noindex.
const STATIC_LINKS = [
  { url: "/", priority: 1.0, changefreq: "weekly" as const },
  { url: "/about", priority: 0.7, changefreq: "monthly" as const },
  { url: "/philosophy", priority: 0.6, changefreq: "monthly" as const },
  { url: "/leadership", priority: 0.6, changefreq: "monthly" as const },
  { url: "/practice", priority: 0.9, changefreq: "monthly" as const },
  { url: "/practice/customer-success", priority: 0.8, changefreq: "monthly" as const },
  { url: "/practice/digital-marketing", priority: 0.8, changefreq: "monthly" as const },
  { url: "/practice/digital-transformation", priority: 0.8, changefreq: "monthly" as const },
  { url: "/practice/gtm-strategy", priority: 0.8, changefreq: "monthly" as const },
  { url: "/practice/leadership-scaling", priority: 0.8, changefreq: "monthly" as const },
  { url: "/practice/cross-industry", priority: 0.8, changefreq: "monthly" as const },
  { url: "/practice/ai-innovation", priority: 0.8, changefreq: "monthly" as const },
  { url: "/practice/stakeholder-engagement", priority: 0.8, changefreq: "monthly" as const },
  { url: "/case-studies", priority: 0.8, changefreq: "weekly" as const },
  { url: "/toolkit", priority: 0.6, changefreq: "monthly" as const },
  { url: "/blog", priority: 0.8, changefreq: "daily" as const },
  { url: "/contact", priority: 0.5, changefreq: "yearly" as const },
];

const POSTS_QUERY = `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]{
  "slug": slug.current,
  "categorySlug": categories[0]->slug.current,
  "updatedAt": _updatedAt,
  publishedAt
}`;

const INSIGHTS_QUERY = `*[_type == "edgyInsight" && defined(slug.current) && !(_id in path("drafts.**"))]{
  "slug": slug.current,
  "updatedAt": _updatedAt
}`;

const AUTHORS_QUERY = `*[_type == "author" && defined(slug.current) && !(_id in path("drafts.**"))]{
  "slug": slug.current,
  "updatedAt": _updatedAt
}`;

type PostRow = { slug: string; categorySlug?: string; updatedAt?: string; publishedAt?: string };
type InsightRow = { slug: string; updatedAt?: string };
type AuthorRow = { slug: string; updatedAt?: string };

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function isoDate(s?: string): string | undefined {
  return s ? s.split("T")[0] : undefined;
}

function maxDate(dates: (string | undefined)[]): string | undefined {
  const valid = dates.filter((d): d is string => Boolean(d)).sort();
  return valid.length ? valid[valid.length - 1] : undefined;
}

async function streamLinks(
  hostname: string,
  links: { url: string; priority: number; changefreq: string; lastmod?: string }[]
): Promise<string> {
  const stream = new SitemapStream({ hostname });
  const xmlStream = Readable.from(links).pipe(stream);
  return (await streamToPromise(xmlStream)).toString();
}

export const generatePagesSitemap = (hostname: string) =>
  streamLinks(hostname, STATIC_LINKS);

export const generateCaseStudiesSitemap = async (hostname: string) => {
  const insights = await sanity.fetch<InsightRow[]>(INSIGHTS_QUERY).catch(() => []);
  return streamLinks(
    hostname,
    insights.map((i) => ({
      url: `/case-studies/${i.slug}`,
      priority: 0.7,
      changefreq: "monthly" as const,
      lastmod: i.updatedAt,
    }))
  );
};

export const generateBlogSitemap = async (hostname: string) => {
  const [posts, authors] = await Promise.all([
    sanity.fetch<PostRow[]>(POSTS_QUERY).catch(() => []),
    sanity.fetch<AuthorRow[]>(AUTHORS_QUERY).catch(() => []),
  ]);
  return streamLinks(hostname, [
    ...posts.map((p) => ({
      url: p.categorySlug ? `/blog/${p.categorySlug}/${p.slug}` : `/blog/${p.slug}`,
      priority: 0.7,
      changefreq: "monthly" as const,
      lastmod: p.updatedAt || p.publishedAt,
    })),
    ...authors.map((a) => ({
      url: `/blog/author/${a.slug}`,
      priority: 0.4,
      changefreq: "monthly" as const,
      lastmod: a.updatedAt,
    })),
  ]);
};

export const generateSitemapIndex = async (hostname: string) => {
  const [posts, insights, authors] = await Promise.all([
    sanity.fetch<PostRow[]>(POSTS_QUERY).catch(() => []),
    sanity.fetch<InsightRow[]>(INSIGHTS_QUERY).catch(() => []),
    sanity.fetch<AuthorRow[]>(AUTHORS_QUERY).catch(() => []),
  ]);
  const blogLastmod = maxDate([
    ...posts.map((p) => p.updatedAt || p.publishedAt),
    ...authors.map((a) => a.updatedAt),
  ]);
  const csLastmod = maxDate(insights.map((i) => i.updatedAt));

  const entry = (loc: string, lastmod?: string) => {
    const parts = [`    <loc>${escapeXml(loc)}</loc>`];
    if (lastmod) parts.push(`    <lastmod>${isoDate(lastmod)}</lastmod>`);
    return `  <sitemap>\n${parts.join("\n")}\n  </sitemap>`;
  };

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entry(`${hostname}/sitemap-pages.xml`)}
${entry(`${hostname}/sitemap-case-studies.xml`, csLastmod)}
${entry(`${hostname}/sitemap-blog.xml`, blogLastmod)}
</sitemapindex>
`;
};

// Back-compat: prior callers imported `generateSitemap`. Keep the export
// pointing at the new index so nothing else has to change.
export const generateSitemap = generateSitemapIndex;
