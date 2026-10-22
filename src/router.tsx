import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { Button } from "@/components/ui/button";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: ({ reset }) => <div className="bg-paper px-5 py-44 text-ink"><h1 className="text-5xl font-semibold">This page didn't load.</h1><Button variant="site" size="site" onClick={reset} className="mt-8 rounded-full bg-ink px-6 py-3 text-snow">Try again</Button></div>,
  });

  return router;
};
