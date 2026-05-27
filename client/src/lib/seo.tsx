import { Helmet } from "react-helmet-async";
import { brand } from "@/config/brand";
import { SITE_ORIGIN } from "@/config/site";

const SITE_URL = SITE_ORIGIN;
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  type?: string;
  noindex?: boolean;
}

function buildCanonical(path?: string): string {
  if (path) {
    const clean = path.split("?")[0].split("#")[0];
    return `${SITE_URL}${clean.startsWith("/") ? clean : `/${clean}`}`;
  }
  if (typeof window !== "undefined") {
    return `${SITE_URL}${window.location.pathname}`;
  }
  return SITE_URL;
}

function buildImage(image?: string): string {
  if (!image) return DEFAULT_OG_IMAGE;
  if (image.startsWith("http")) return image;
  return `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;
}

export function SEO({
  title,
  description = brand.meta.description,
  image,
  path,
  type = "website",
  noindex = false,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${brand.name}` : brand.meta.title;
  const canonical = buildCanonical(path);
  const ogImage = buildImage(image);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large, max-snippet:-1"
        }
      />
      <meta name="author" content={brand.name} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={brand.name} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <link rel="canonical" href={canonical} />
    </Helmet>
  );
}
