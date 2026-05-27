/**
 * Netlify Edge Function — serves a sitemap index plus three child sitemaps:
 *
 *   /sitemap.xml               → sitemap index (points to the three below)
 *   /sitemap-pages.xml         → static website pages
 *   /sitemap-case-studies.xml  → edgyInsight documents from Sanity
 *   /sitemap-blog.xml          → blog posts + author profile pages from Sanity
 *
 * Splitting by content type keeps each file small (Google's per-file caps are
 * 50K URLs / 50MB), makes Search Console diagnostics readable per-section,
 * and lets crawlers re-fetch only the section that changed.
 */

import type { Context } from "https://edge.netlify.com";

const SANITY_PROJECT_ID = "s7vf0n9j";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2026-02-01";
const SITE_ORIGIN = "https://novatransform.com";

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

// Note: /innovations is intentionally excluded — it's Phase 2, kept noindex
// until launch so Google doesn't crawl an unfinished page.
const STATIC_ROUTES: { path: string; priority: number; changefreq: string }[] = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/about", priority: 0.7, changefreq: "monthly" },
  { path: "/philosophy", priority: 0.6, changefreq: "monthly" },
  { path: "/expertise", priority: 0.9, changefreq: "monthly" },
  { path: "/expertise/customer-success", priority: 0.8, changefreq: "monthly" },
  { path: "/expertise/digital-marketing", priority: 0.8, changefreq: "monthly" },
  { path: "/expertise/digital-transformation", priority: 0.8, changefreq: "monthly" },
  { path: "/expertise/gtm-strategy", priority: 0.8, changefreq: "monthly" },
  { path: "/expertise/leadership-scaling", priority: 0.8, changefreq: "monthly" },
  { path: "/expertise/cross-industry", priority: 0.8, changefreq: "monthly" },
  { path: "/expertise/ai-innovation", priority: 0.8, changefreq: "monthly" },
  { path: "/expertise/stakeholder-engagement", priority: 0.8, changefreq: "monthly" },
  { path: "/case-studies", priority: 0.8, changefreq: "weekly" },
  { path: "/toolkit", priority: 0.6, changefreq: "monthly" },
  { path: "/blog", priority: 0.8, changefreq: "daily" },
  { path: "/contact", priority: 0.5, changefreq: "yearly" },
];

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function isoDate(s?: string): string | undefined {
  if (!s) return undefined;
  return s.split("T")[0];
}

function urlNode(
  loc: string,
  opts: { lastmod?: string; priority?: number; changefreq?: string } = {}
): string {
  const parts = [`    <loc>${escapeXml(loc)}</loc>`];
  if (opts.lastmod) parts.push(`    <lastmod>${isoDate(opts.lastmod)}</lastmod>`);
  if (opts.changefreq) parts.push(`    <changefreq>${opts.changefreq}</changefreq>`);
  if (typeof opts.priority === "number") parts.push(`    <priority>${opts.priority.toFixed(1)}</priority>`);
  return `  <url>\n${parts.join("\n")}\n  </url>`;
}

function sitemapNode(loc: string, lastmod?: string): string {
  const parts = [`    <loc>${escapeXml(loc)}</loc>`];
  if (lastmod) parts.push(`    <lastmod>${isoDate(lastmod)}</lastmod>`);
  return `  <sitemap>\n${parts.join("\n")}\n  </sitemap>`;
}

function wrapUrlset(urls: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;
}

function wrapIndex(sitemaps: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.join("\n")}
</sitemapindex>
`;
}

async function sanityFetch<T>(query: string): Promise<T[]> {
  const url = new URL(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`
  );
  url.searchParams.set("query", query);
  const res = await fetch(url.toString(), { headers: { Accept: "application/json" } });
  if (!res.ok) return [];
  const json = (await res.json()) as { result?: T[] };
  return json.result ?? [];
}

function maxDate(dates: (string | undefined)[]): string | undefined {
  const valid = dates.filter((d): d is string => Boolean(d)).sort();
  return valid.length ? valid[valid.length - 1] : undefined;
}

function xmlResponse(body: string): Response {
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
      "Netlify-CDN-Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

// ─── Builders ────────────────────────────────────────────────────────────────

function buildPagesSitemap(): string {
  const urls = STATIC_ROUTES.map((r) =>
    urlNode(`${SITE_ORIGIN}${r.path}`, { priority: r.priority, changefreq: r.changefreq })
  );
  return wrapUrlset(urls);
}

async function buildCaseStudiesSitemap(): Promise<string> {
  const insights = await sanityFetch<InsightRow>(INSIGHTS_QUERY).catch(() => []);
  const urls = insights.map((i) =>
    urlNode(`${SITE_ORIGIN}/case-studies/${i.slug}`, {
      lastmod: i.updatedAt,
      priority: 0.7,
      changefreq: "monthly",
    })
  );
  return wrapUrlset(urls);
}

async function buildBlogSitemap(): Promise<string> {
  const [posts, authors] = await Promise.all([
    sanityFetch<PostRow>(POSTS_QUERY).catch(() => []),
    sanityFetch<AuthorRow>(AUTHORS_QUERY).catch(() => []),
  ]);

  const urls: string[] = [];
  for (const p of posts) {
    const path = p.categorySlug ? `/blog/${p.categorySlug}/${p.slug}` : `/blog/${p.slug}`;
    urls.push(
      urlNode(`${SITE_ORIGIN}${path}`, {
        lastmod: p.updatedAt || p.publishedAt,
        priority: 0.7,
        changefreq: "monthly",
      })
    );
  }
  for (const a of authors) {
    urls.push(
      urlNode(`${SITE_ORIGIN}/blog/author/${a.slug}`, {
        lastmod: a.updatedAt,
        priority: 0.4,
        changefreq: "monthly",
      })
    );
  }
  return wrapUrlset(urls);
}

async function buildIndex(): Promise<string> {
  // lastmod on the index entries lets crawlers skip unchanged sections.
  const [posts, insights, authors] = await Promise.all([
    sanityFetch<PostRow>(POSTS_QUERY).catch(() => []),
    sanityFetch<InsightRow>(INSIGHTS_QUERY).catch(() => []),
    sanityFetch<AuthorRow>(AUTHORS_QUERY).catch(() => []),
  ]);
  const blogLastmod = maxDate([
    ...posts.map((p) => p.updatedAt || p.publishedAt),
    ...authors.map((a) => a.updatedAt),
  ]);
  const csLastmod = maxDate(insights.map((i) => i.updatedAt));

  return wrapIndex([
    sitemapNode(`${SITE_ORIGIN}/sitemap-pages.xml`),
    sitemapNode(`${SITE_ORIGIN}/sitemap-case-studies.xml`, csLastmod),
    sitemapNode(`${SITE_ORIGIN}/sitemap-blog.xml`, blogLastmod),
  ]);
}

// ─── Router ──────────────────────────────────────────────────────────────────

export default async (request: Request, _context: Context) => {
  const path = new URL(request.url).pathname;

  if (path === "/sitemap.xml") return xmlResponse(await buildIndex());
  if (path === "/sitemap-pages.xml") return xmlResponse(buildPagesSitemap());
  if (path === "/sitemap-case-studies.xml") return xmlResponse(await buildCaseStudiesSitemap());
  if (path === "/sitemap-blog.xml") return xmlResponse(await buildBlogSitemap());

  // Path matched the function config but not any known sitemap — fall through.
  return;
};

export const config = {
  path: ["/sitemap.xml", "/sitemap-pages.xml", "/sitemap-case-studies.xml", "/sitemap-blog.xml"],
};
