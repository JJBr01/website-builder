import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteLayout } from "@/components/site/layout";
import { INK_THEME_COLOR, jsonLd, professionalService } from "@/lib/site";
import { Button } from "@/components/ui/button";

function NotFoundComponent() {
  return (
    <section data-hero className="relative min-h-[80vh] bg-paper px-5 pb-24 pt-44 text-ink sm:px-8 lg:px-14 lg:pt-56">
      <div aria-hidden="true" className="speed-line absolute right-0 top-0 h-full w-[42%] bg-brand" />
      <div className="relative z-10"><p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-brand">404 · Page not found</p><h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] sm:text-7xl lg:text-8xl">A wrong turn.<br /><span className="text-brand">Keep moving.</span></h1><p className="mt-9 max-w-xl border-t border-ink/15 pt-6 text-lg leading-relaxed text-ink/65">This page doesn't exist or has moved. Let's get you back on track.</p><nav aria-label="Page not found" className="mt-9 flex flex-wrap gap-6 text-xs font-bold uppercase tracking-[0.14em]"><Link to="/" className="underline decoration-brand underline-offset-8">Home →</Link><Link to="/services" className="underline decoration-brand underline-offset-8">Services →</Link><Link to="/contact" className="underline decoration-brand underline-offset-8">Contact →</Link></nav></div>
    </section>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </Button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "MOD 12" },
      { property: "og:site_name", content: "MOD 12" },
      { property: "og:locale", content: "en_US" },
      { name: "theme-color", content: INK_THEME_COLOR },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    scripts: [jsonLd(professionalService)],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <SiteLayout><Outlet /></SiteLayout>
    </QueryClientProvider>
  );
}
