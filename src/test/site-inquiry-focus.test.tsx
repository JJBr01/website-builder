import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory, createRootRoute, createRoute, createRouter, Outlet, RouterProvider } from '@tanstack/react-router';
import { afterEach, expect, it } from 'vitest';
import { SiteLayout, useSiteInquiry } from '@/components/site/layout';
import { Button } from '@/components/ui/button';

afterEach(cleanup);

function InquiryOpener() {
  const openInquiry = useSiteInquiry();
  return <Button onClick={openInquiry}>Open inquiry from this button</Button>;
}

it('closing the shared inquiry modal restores focus to the actual opening button', async () => {
  const root = createRootRoute({ component: () => <SiteLayout><Outlet /></SiteLayout> });
  const index = createRoute({ getParentRoute: () => root, path: '/', component: InquiryOpener });
  const router = createRouter({ routeTree: root.addChildren([index]), history: createMemoryHistory({ initialEntries: ['/'] }) });
  await router.load();
  render(<RouterProvider router={router} />);
  const opener = await screen.findByRole('button', { name: 'Open inquiry from this button' });
  opener.focus();
  fireEvent.click(opener);
  expect(await screen.findByRole('dialog')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Tell us what you’re building.' })).toHaveFocus();
  fireEvent.click(screen.getByRole('button', { name: 'Close', exact: true }));
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  await waitFor(() => expect(opener).toHaveFocus());
});