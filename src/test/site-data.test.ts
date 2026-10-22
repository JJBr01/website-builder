import { describe, expect, it } from "vitest";
import { breadcrumbSchema, pageHead, professionalService, serviceSchemas, SITE_URL, websiteSchema } from "@/lib/site";

describe("Public-address structured data", () => {
  it("does not invent a public address before publication", () => {
    if (SITE_URL) return;
    expect(professionalService).not.toHaveProperty("url");
    expect(professionalService).not.toHaveProperty("logo");
    expect(websiteSchema).not.toHaveProperty("url");
    expect(serviceSchemas.every((service) => !("url" in service))).toBe(true);
    expect(breadcrumbSchema("/contact", "Contact").itemListElement.every((item) => !("item" in item))).toBe(true);
  });
  it("omits canonical and og:url while the public address is empty", () => {
    expect(SITE_URL).toBe("");
    const head = pageHead('/contact', 'Contact MOD 12', 'Contact the studio.');
    expect(head.links).toEqual([]);
    expect(head.meta.some((tag) => 'property' in tag && tag.property === 'og:url')).toBe(false);
  });
});