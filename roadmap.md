# Accessibility review follow-up
- [ ] Correct visual validation focus order and Scope error attributes.
- [ ] Improve small brand text on ink and remove mismatched button focus offsets.
- [ ] Add opener restoration regression coverage and run tests; verify browser behavior and automatic build.

# Homepage conversion
- [x] Add hero inquiry CTA and services link, process strip, shared pricing signal and accessible FAQs with structured data.
- [x] All 16 tests and automatic build pass; verify desktop/mobile hero modal and focus restoration, section order, pricing, accordion keyboard controls, structured data and reduced motion.

# Accessibility and bug fixes
- [x] Improve inquiry focus, scroll locking, labels, validation, announcements and bounded email fallback.
- [x] Fix small-text contrast, reduced motion, menu labeling and unpublished metadata.
- [x] Run all 14 regression tests and verify desktop/mobile keyboard flows, opener focus restoration and actual submit-to-fallback (1798-character URL); automatic build passes.

# Navigation and SEO
- [x] Add Services and Contact pages and real-page navigation.
- [x] Add active links, pinned header, skip link, accessible drawer, footer navigation and branded 404.
- [x] Expand page metadata, ProfessionalService, WebSite, BreadcrumbList and Service structured data, and performance signals without changing inquiry behavior.
- [x] Verify routing tests and desktop/mobile navigation, focus handling, menu scroll lock, metadata uniqueness and shared inquiry opening.
- [x] Extract shared header, drawer, footer and unchanged inquiry modal.
- [x] Add About page with approved content and navigation.
- [x] Add route metadata, Organization data and branded 1200×630 share artwork.
- [x] Add About routing test and verify desktop/mobile flows and build status.
- [ ] Complete public URL, absolute SEO URLs, /sitemap.xml server route listing /, /services, /about and /contact, and robots Sitemap directive (blocked: not published; sitemap installation requires a public origin). Static robots.txt contains a clear TODO.