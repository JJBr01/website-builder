import { CONTACT_EMAIL } from "@/lib/inquiry";
import { services } from "@/lib/services";

export const SITE_NAME = "MOD 12";
export const INK_THEME_COLOR = "oklch(0.18 0 0)";
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
      ...(SITE_URL ? [{ property: "og:url", content: siteUrl(path) }] : []),
      { name: "twitter:card", content: "summary_large_image" },
      // Image tags require an absolute public URL. Activate them once SITE_URL is known.
      ...(SITE_URL ? [
        { property: "og:image", content: siteUrl(DEFAULT_OG_IMAGE) },
        { name: "twitter:image", content: siteUrl(DEFAULT_OG_IMAGE) },
      ] : []),
    ],
    links: SITE_URL ? [{ rel: "canonical", href: siteUrl(path) }] : [],
  };
}

export const professionalService = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  ...(SITE_URL ? { url: SITE_URL, logo: siteUrl("/favicon.ico") } : {}),
   email: CONTACT_EMAIL,
  areaServed: "Worldwide",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sarasota",
    addressRegion: "FL",
    addressCountry: "US",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  ...(SITE_URL ? { url: siteUrl("/") } : {}),
};

export function breadcrumbSchema(path: string, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", ...(SITE_URL ? { item: siteUrl("/") } : {}) },
      { "@type": "ListItem", position: 2, name, ...(SITE_URL ? { item: siteUrl(path) } : {}) },
    ],
  };
}

export const serviceSchemas = services.map((service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.title,
  description: service.text,
  provider: professionalService,
  areaServed: "Worldwide",
  ...(SITE_URL ? { url: siteUrl("/services") } : {}),
}));

export function jsonLd(data: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}