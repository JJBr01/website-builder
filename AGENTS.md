<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Site architecture
- Share the header, mobile drawer, footer and single inquiry modal through SiteLayout around the root Outlet so every page uses the same interactions.
- Keep inquiry-modal extraction behavior-identical and leave src/lib/inquiry.ts untouched during presentation changes.
- Use the site's neutral Button variant and size for existing controls so extraction preserves their original appearance.
- Centralize public URL and leaf metadata in src/lib/site.ts; keep the URL empty until publication and defer absolute image tags and sitemap setup rather than use preview URLs.
- Keep one main landmark in SiteLayout; content routes return sections and share its inquiry context rather than create another modal.
- Share service content through src/lib/services.ts so the home teaser, full services page and structured data stay aligned.
- Keep the header out of document flow and pin it only after the route's data-hero section; manage drawer keyboard focus and body scrolling independently of inquiry behavior.
