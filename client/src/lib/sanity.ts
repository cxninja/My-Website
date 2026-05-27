import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const sanityClient = createClient({
  projectId: "s7vf0n9j",
  dataset: "production",
  apiVersion: "2026-02-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: SanityImageSource) => builder.image(source);

/**
 * Resolve a `flexibleImage` (upload-or-URL) to a plain string URL.
 * Returns null if the image is empty or malformed.
 */
export function resolveFlexibleImage(
  img: { source?: string; url?: string; asset?: any } | null | undefined,
  opts?: { width?: number; height?: number }
): string | null {
  if (!img) return null;
  if (img.source === "url" && img.url) return img.url;
  if (img.source === "upload" && img.asset) {
    let b = urlFor(img.asset);
    if (opts?.width) b = b.width(opts.width);
    if (opts?.height) b = b.height(opts.height).fit("crop");
    return b.url();
  }
  return null;
}

// ─── Shared GROQ fragments + types ───────────────────────────────────────────

const NOT_DRAFT = `!(_id in path("drafts.**"))`;
const FLEXIBLE_IMAGE = `{ source, url, asset->{_id, url}, alt, caption }`;

export type FlexibleImageData = {
  source?: "upload" | "url";
  url?: string;
  asset?: { _id?: string; url?: string };
  alt?: string;
  caption?: string;
} | null;

/**
 * Canonical URL for a blog post.
 * Format: /blog/{categorySlug}/{postSlug} when a primary category is present,
 *         /blog/{postSlug}                 otherwise (legacy fallback).
 */
export function postUrl(post: {
  slug: string;
  categories?: { title: string; slug: string }[] | null;
}): string {
  const cat = post.categories?.[0]?.slug;
  return cat ? `/blog/${cat}/${post.slug}` : `/blog/${post.slug}`;
}

// ─── Blog ────────────────────────────────────────────────────────────────────

export type AuthorLean = {
  name: string;
  slug: string;
  role?: string;
  avatar?: FlexibleImageData;
};

export type AuthorFull = AuthorLean & {
  _id: string;
  bio?: string;
  longBio?: any[];
  yearsExperience?: number;
  expertise?: string[];
  coverImage?: FlexibleImageData;
  socialLinks?: { _key: string; platform: string; url: string }[];
};

export type PostListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  updatedAt?: string;
  readingMinutes?: number;
  featured?: boolean;
  trending?: boolean;
  mainImage?: FlexibleImageData;
  author?: AuthorLean | null;
  categories?: { title: string; slug: string }[];
};

export type PostDetail = PostListItem & {
  body: any[];
  author?: AuthorFull | null;
  faqs?: { question: string; answer: any[] }[];
  seo?: { metaTitle?: string; metaDescription?: string; keywords?: string[] };
};

const AUTHOR_LEAN_PROJ = `{
  name,
  "slug": slug.current,
  role,
  avatar${FLEXIBLE_IMAGE}
}`;

const AUTHOR_FULL_PROJ = `{
  _id,
  name,
  "slug": slug.current,
  role,
  avatar${FLEXIBLE_IMAGE},
  coverImage${FLEXIBLE_IMAGE},
  bio,
  longBio,
  yearsExperience,
  expertise,
  socialLinks[]{_key, platform, url}
}`;

const POST_LIST_PROJ = `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "updatedAt": _updatedAt,
  readingMinutes,
  featured,
  trending,
  mainImage${FLEXIBLE_IMAGE},
  "author": author->${AUTHOR_LEAN_PROJ},
  "categories": categories[]->{title, "slug": slug.current}
}`;

const POST_BASE_ORDER = `order(coalesce(priority, 5) asc, publishedAt desc)`;

export const POSTS_QUERY = `*[_type == "post" && defined(slug.current) && ${NOT_DRAFT}] | ${POST_BASE_ORDER} ${POST_LIST_PROJ}`;

export const FEATURED_POSTS_QUERY = `*[_type == "post" && featured == true && defined(slug.current) && ${NOT_DRAFT}] | ${POST_BASE_ORDER} [0...6] ${POST_LIST_PROJ}`;

export const TRENDING_POSTS_QUERY = `*[_type == "post" && trending == true && defined(slug.current) && ${NOT_DRAFT}] | ${POST_BASE_ORDER} [0...5] ${POST_LIST_PROJ}`;

export const RELATED_POSTS_QUERY = `*[_type == "post" && _id != $excludeId && defined(slug.current) && ${NOT_DRAFT} && count((categories[]._ref)[@ in $categoryRefs]) > 0] | ${POST_BASE_ORDER} [0...3] ${POST_LIST_PROJ}`;

export const SEARCH_POSTS_QUERY = `*[_type == "post" && defined(slug.current) && ${NOT_DRAFT} && (title match $q || excerpt match $q || pt::text(body) match $q)] | ${POST_BASE_ORDER} [0...20] ${POST_LIST_PROJ}`;

export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug && ${NOT_DRAFT}][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "updatedAt": _updatedAt,
  readingMinutes,
  featured,
  trending,
  mainImage${FLEXIBLE_IMAGE},
  body[]{
    ...,
    _type == "image" => {..., asset->{url}},
    _type == "inlineImage" => {..., image{ source, url, asset->{url}, alt, caption }}
  },
  "author": author->${AUTHOR_FULL_PROJ},
  "categories": categories[]->{title, "slug": slug.current},
  faqs[]{question, answer},
  seo
}`;

export const AUTHOR_BY_SLUG_QUERY = `*[_type == "author" && slug.current == $slug && ${NOT_DRAFT}][0] ${AUTHOR_FULL_PROJ}`;

export const POSTS_BY_AUTHOR_QUERY = `*[_type == "post" && author->slug.current == $slug && defined(slug.current) && ${NOT_DRAFT}] | ${POST_BASE_ORDER} ${POST_LIST_PROJ}`;

// ─── Edgy Insights (case studies) ────────────────────────────────────────────

export type Metric = { _key?: string; label: string; delta: number; unit?: string };
export type Outcome = { _key?: string; metric: string; before: number; after: number; unit?: string };

export type EdgyInsightListItem = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  industry: string;
  year: number;
  image?: FlexibleImageData;
  featured?: boolean;
  priority?: number;
  capabilities?: string[];
  metrics?: Metric[];
};

export type StoryChapter = {
  _key: string;
  eyebrow?: string;
  title: string;
  paragraphs?: any[];
  bullets?: string[];
  highlights?: { _key: string; metric: string; label: string }[];
  pullQuote?: string;
  images?: FlexibleImageData[];
};

export type EdgyInsightDetail = EdgyInsightListItem & {
  context?: any[];
  approach?: string[];
  solution?: any[];
  storyChapters?: StoryChapter[];
  lessons?: string[];
  outcomes: Outcome[];
  testimonial?: { quote: string; author: string; title?: string; company?: string };
  seo?: { metaTitle?: string; metaDescription?: string; keywords?: string[] };
};

const EDGY_INSIGHT_LIST_PROJECTION = `{
  _id,
  title,
  "slug": slug.current,
  summary,
  industry,
  year,
  image${FLEXIBLE_IMAGE},
  featured,
  priority,
  capabilities,
  metrics[]{_key, label, delta, unit}
}`;

const EDGY_INSIGHT_FULL_PROJECTION = `{
  _id,
  title,
  "slug": slug.current,
  summary,
  industry,
  year,
  image${FLEXIBLE_IMAGE},
  featured,
  priority,
  capabilities,
  metrics[]{_key, label, delta, unit},
  context,
  approach,
  solution,
  storyChapters[]{
    _key,
    eyebrow,
    title,
    paragraphs,
    bullets,
    highlights[]{_key, metric, label},
    pullQuote,
    images[]${FLEXIBLE_IMAGE}
  },
  lessons,
  outcomes[]{_key, metric, before, after, unit},
  testimonial,
  seo
}`;

export const ALL_EDGY_INSIGHTS_QUERY = `*[_type == "edgyInsight" && defined(slug.current) && ${NOT_DRAFT}] | order(coalesce(priority, 5) asc, year desc) ${EDGY_INSIGHT_LIST_PROJECTION}`;

export const EDGY_INSIGHT_BY_SLUG_QUERY = `*[_type == "edgyInsight" && slug.current == $slug && ${NOT_DRAFT}][0] ${EDGY_INSIGHT_FULL_PROJECTION}`;
