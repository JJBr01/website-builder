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
