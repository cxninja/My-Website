/**
 * Netlify Edge Function — injects per-post meta tags (title, description,
 * Open Graph, Twitter Card, JSON-LD Article schema) into the HTML response
 * for blog post URLs. Runs at the edge before serving so that social previews
 * (LinkedIn, Twitter, Slack) see the right tags without any JS execution.
 *
 * Matches:
 *   /blog/:slug                (legacy)
 *   /blog/:categorySlug/:slug  (canonical)
 *
 * Skips:
 *   /blog                      (list page — handled by client SEO)
 *   /blog/author/*             (author profile — handled by client SEO)
 */

import type { Context } from "https://edge.netlify.com";

const SANITY_PROJECT_ID = "s7vf0n9j";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2026-02-01";
const SITE_ORIGIN = "https://novatransform.com"; // adjust to your prod origin

// Single GROQ query covering both URL shapes — slug is always the last segment.
const POST_QUERY = `*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "updatedAt": _updatedAt,
  readingMinutes,
  mainImage{ source, url, asset->{url}, alt },
  "author": author->{ name, "slug": slug.current, role, avatar{ source, url, asset->{url} } },
  "categoryTitle": categories[0]->title,
  "categorySlug": categories[0]->slug.current,
  seo{ metaTitle, metaDescription, keywords }
}`;

type SanityPost = {
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  updatedAt?: string;
  readingMinutes?: number;
  mainImage?: {
    source?: "url" | "upload";
    url?: string;
    asset?: { url?: string };
    alt?: string;
  };
  author?: {
    name: string;
    slug: string;
    role?: string;
    avatar?: { source?: string; url?: string; asset?: { url?: string } };
  };
  categoryTitle?: string;
  categorySlug?: string;
  seo?: { metaTitle?: string; metaDescription?: string; keywords?: string[] };
};

function flexImageUrl(img: SanityPost["mainImage"] | SanityPost["author"]["avatar"]) {
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

async function fetchPost(slug: string): Promise<SanityPost | null> {
  const url = new URL(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`
  );
  url.searchParams.set("query", POST_QUERY);
  url.searchParams.set("$slug", JSON.stringify(slug));
  const res = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) return null;
  const json = (await res.json()) as { result?: SanityPost };
  return json.result ?? null;
}

function buildMetaHtml(post: SanityPost, canonicalUrl: string): string {
  const title = post.seo?.metaTitle || `${post.title} — NovaTransform Blog`;
  const description = post.seo?.metaDescription || post.excerpt || "";
  const heroUrl = flexImageUrl(post.mainImage);
  const authorAvatarUrl = flexImageUrl(post.author?.avatar);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description,
    image: heroUrl ? [heroUrl] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.name,
          url: `${SITE_ORIGIN}/blog/author/${post.author.slug}`,
          jobTitle: post.author.role,
          image: authorAvatarUrl,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "NovaTransform",
      logo: { "@type": "ImageObject", url: `${SITE_ORIGIN}/images/MainLogo.png` },
    },
    keywords: post.seo?.keywords?.join(", "),
    articleSection: post.categoryTitle,
    wordCount: post.readingMinutes ? post.readingMinutes * 200 : undefined,
    mainEntityOfPage: canonicalUrl,
  };

  // Strip undefined for cleaner JSON-LD
  const cleanLd = JSON.parse(JSON.stringify(articleLd));

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
    heroUrl ? `<meta property="og:image:width" content="1600">` : "",
    heroUrl ? `<meta property="og:image:height" content="900">` : "",
    `<meta property="article:published_time" content="${escapeHtml(post.publishedAt)}">`,
    post.updatedAt
      ? `<meta property="article:modified_time" content="${escapeHtml(post.updatedAt)}">`
      : "",
    post.author?.name
      ? `<meta property="article:author" content="${escapeHtml(post.author.name)}">`
      : "",
    post.categoryTitle
      ? `<meta property="article:section" content="${escapeHtml(post.categoryTitle)}">`
      : "",
    ...(post.seo?.keywords ?? []).map(
      (k) => `<meta property="article:tag" content="${escapeHtml(k)}">`
    ),
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(description)}">`,
    heroUrl ? `<meta name="twitter:image" content="${escapeHtml(heroUrl)}">` : "",
    `<script type="application/ld+json">${JSON.stringify(cleanLd)}</script>`,
  ].filter(Boolean);

  return `<!-- prerendered by edge function -->\n${tags.join("\n")}\n`;
}

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const parts = url.pathname.replace(/^\/+|\/+$/g, "").split("/");

  // Skip /blog (list) and /blog/author/* and /blog/(empty)
  if (parts[0] !== "blog") return; // not our path
  if (parts.length === 1) return; // /blog
  if (parts[1] === "author") return; // /blog/author/*

  // Slug is always the last segment for /blog/:slug or /blog/:cat/:slug
  const slug = parts[parts.length - 1];
  if (!slug) return;

  // Get the upstream HTML
  const response = await context.next();
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) return response;

  const post = await fetchPost(slug).catch(() => null);
  if (!post) return response;

  const canonical = post.categorySlug
    ? `${SITE_ORIGIN}/blog/${post.categorySlug}/${post.slug}`
    : `${SITE_ORIGIN}/blog/${post.slug}`;

  const metaHtml = buildMetaHtml(post, canonical);
  const html = await response.text();

  // Strip the default <title> and any existing description meta from the shell,
  // then inject our tags right before </head>.
  const stripped = html
    .replace(/<title>[^<]*<\/title>/i, "")
    .replace(/<meta\s+name="description"[^>]*>/i, "");

  const newHtml = stripped.replace(/<\/head>/i, `${metaHtml}</head>`);

  return new Response(newHtml, {
    status: response.status,
    headers: response.headers,
  });
};

export const config = { path: ["/blog/*"] };
