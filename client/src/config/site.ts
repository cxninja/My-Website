// Single source of truth for the site's canonical origin.
//
// Why an env var and not window.location.origin?
//   Canonical URLs and JSON-LD `url` fields need to be stable across
//   localhost dev, deploy previews, and production — otherwise each
//   environment gets indexed as a separate site and ranking signal splits.
//
// How to override per environment:
//   Set `VITE_SITE_URL` in .env (locally) or in Netlify build env vars.
//   Default falls back to the production canonical domain.
export const SITE_URL: string =
  (import.meta.env.VITE_SITE_URL as string | undefined) ?? "https://novatransform.com";

// Strip trailing slash so callers can safely do `${SITE_URL}/path`.
export const SITE_ORIGIN: string = SITE_URL.replace(/\/+$/, "");

// Convenience: build an absolute URL from a path.
export function siteUrl(path: string = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${clean}`;
}
