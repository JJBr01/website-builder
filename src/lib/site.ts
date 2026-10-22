export const SITE_NAME = "MOD 12";
// Set to the project's published URL after first publication; change it when a custom domain is connected.
// No public URL exists yet. Never substitute the editor preview address.
export const SITE_URL: string = "";
export const DEFAULT_OG_IMAGE = "/og-image.jpg";

export function siteUrl(path: string) {
  return SITE_URL ? new URL(path, `${SITE_URL.replace(/\/$/, "")}/`).href : path;
}

export function pageHead(path: string, title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl(path) },
      { name: "twitter:card", content: "summary_large_image" },
      // Image tags require an absolute public URL. Activate them once SITE_URL is known.
      ...(SITE_URL ? [
        { property: "og:image", content: siteUrl(DEFAULT_OG_IMAGE) },
        { name: "twitter:image", content: siteUrl(DEFAULT_OG_IMAGE) },
      ] : []),
    ],
    links: [{ rel: "canonical", href: siteUrl(path) }],
  };
}

export const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  ...(SITE_URL ? { url: SITE_URL, logo: siteUrl("/favicon.ico") } : {}),
  email: "hello@mod12.co",
  areaServed: "Worldwide",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sarasota",
    addressRegion: "FL",
    addressCountry: "US",
  },
};