import { describe, expect, it } from "vitest";
import { breadcrumbSchema, professionalService, serviceSchemas, SITE_URL, websiteSchema } from "@/lib/site";

describe("Public-address structured data", () => {
  it("does not invent a public address before publication", () => {
    if (SITE_URL) return;
    expect(professionalService).not.toHaveProperty("url");
    expect(professionalService).not.toHaveProperty("logo");
    expect(websiteSchema).not.toHaveProperty("url");
    expect(serviceSchemas.every((service) => !("url" in service))).toBe(true);
    expect(breadcrumbSchema("/contact", "Contact").itemListElement.every((item) => !("item" in item))).toBe(true);
  });
});