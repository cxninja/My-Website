/**
 * Netlify Edge Function — injects per-case-study meta tags (title, description,
 * Open Graph, Twitter Card, JSON-LD Article schema) into the HTML response
 * for /edgy-insights/:slug URLs. Mirrors blog-head.ts so social previews
 * (LinkedIn, Twitter, Slack) see real per-page tags before any JS executes.
 *
 * Matches:
 *   /case-studies/:slug   (canonical)
 *   /edgy-insights/:slug  (legacy fallback URL)
 *
 * Skips:
 *   /case-studies, /edgy-insights  (list pages — handled by client SEO)
 */

import type { Context } from "https://edge.netlify.com";

const SANITY_PROJECT_ID = "s7vf0n9j";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2026-02-01";
const SITE_ORIGIN = "https://novatransform.com";

const INSIGHT_QUERY = `*[_type == "edgyInsight" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
  title,
  "slug": slug.current,
  summary,
  industry,
  year,
  "updatedAt": _updatedAt,
  image{ source, url, asset->{url}, alt },
  seo{ metaTitle, metaDescription, keywords }
}`;

type SanityInsight = {
  title: string;
  slug: string;
  summary?: string;
  industry?: string;
  year?: number;
  updatedAt?: string;
  image?: {
    source?: "url" | "upload";
    url?: string;
    asset?: { url?: string };
    alt?: string;
  };
  seo?: { metaTitle?: string; metaDescription?: string; keywords?: string[] };
};

function flexImageUrl(img: SanityInsight["image"]): string | undefined {
  if (!img) return undefined;
  if (img.source === "url" && img.url) return img.url;
  if (img.source === "upload" && img.asset?.url) return img.asset.url;
  return undefined;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function fetchInsight(slug: string): Promise<SanityInsight | null> {
  const url = new URL(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`
  );
  url.searchParams.set("query", INSIGHT_QUERY);
  url.searchParams.set("$slug", JSON.stringify(slug));
  const res = await fetch(url.toString(), { headers: { Accept: "application/json" } });
  if (!res.ok) return null;
  const json = (await res.json()) as { result?: SanityInsight };
  return json.result ?? null;
}

function buildMetaHtml(insight: SanityInsight, canonicalUrl: string): string {
  const title = insight.seo?.metaTitle || `${insight.title} | Edgy Insight | NovaTransform`;
  const description = insight.seo?.metaDescription || insight.summary || "";
  const heroUrl = flexImageUrl(insight.image);

  const caseStudyLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description,
    image: heroUrl ? [heroUrl] : undefined,
    dateModified: insight.updatedAt,
    publisher: {
      "@type": "Organization",
      name: "NovaTransform",
      logo: { "@type": "ImageObject", url: `${SITE_ORIGIN}/images/MainLogo.png` },
    },
    keywords: insight.seo?.keywords?.join(", "),
    articleSection: insight.industry,
    mainEntityOfPage: canonicalUrl,
  };
  const cleanLd = JSON.parse(JSON.stringify(caseStudyLd));

  const tags: string[] = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}">`,
    `<meta property="og:type" content="article">`,
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}">`,
    `<meta property="og:site_name" content="NovaTransform">`,
    heroUrl ? `<meta property="og:image" content="${escapeHtml(heroUrl)}">` : "",
    insight.updatedAt
      ? `<meta property="article:modified_time" content="${escapeHtml(insight.updatedAt)}">`
      : "",
    insight.industry
      ? `<meta property="article:section" content="${escapeHtml(insight.industry)}">`
      : "",
    ...(insight.seo?.keywords ?? []).map(
      (k) => `<meta property="article:tag" content="${escapeHtml(k)}">`
    ),
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(description)}">`,
    heroUrl ? `<meta name="twitter:image" content="${escapeHtml(heroUrl)}">` : "",
    `<script type="application/ld+json">${JSON.stringify(cleanLd)}</script>`,
  ].filter(Boolean);

  return `<!-- prerendered by edge function (edgy-insight-head) -->\n${tags.join("\n")}\n`;
}

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const parts = url.pathname.replace(/^\/+|\/+$/g, "").split("/");

  if (parts[0] !== "case-studies" && parts[0] !== "edgy-insights") return;
  if (parts.length === 1) return; // list page
  const slug = parts[1];
  if (!slug) return;

  const response = await context.next();
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) return response;

  const insight = await fetchInsight(slug).catch(() => null);
  if (!insight) return response;

  const canonical = `${SITE_ORIGIN}/case-studies/${insight.slug}`;
  const metaHtml = buildMetaHtml(insight, canonical);
  const html = await response.text();

  const stripped = html
    .replace(/<title>[^<]*<\/title>/i, "")
    .replace(/<meta\s+name="description"[^>]*>/i, "");

  const newHtml = stripped.replace(/<\/head>/i, `${metaHtml}</head>`);

  return new Response(newHtml, {
    status: response.status,
    headers: response.headers,
  });
};

export const config = { path: ["/case-studies/*", "/edgy-insights/*"] };
