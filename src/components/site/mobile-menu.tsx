import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Arrow, Wordmark } from "./brand";

export function MobileMenu({ onClose, onStartProject }: { onClose: () => void; onStartProject: () => void }) {
  const drawer = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    drawer.current?.querySelector<HTMLButtonElement>('button')?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); closeRef.current(); }
      if (event.key !== 'Tab') return;
      const items = drawer.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!items?.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', keydown);
    const desktop = window.matchMedia('(min-width: 768px)');
    const resized = () => { if (desktop.matches) closeRef.current(); };
    desktop.addEventListener('change', resized);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', keydown); desktop.removeEventListener('change', resized); };
  }, []);
  return <div className="fixed inset-0 z-50 md:hidden">
    <div aria-hidden="true" className="absolute inset-0 bg-ink/50" onClick={onClose} />
    <div ref={drawer} role="dialog" aria-modal="true" aria-label="Menu" className="drawer-in absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col overflow-y-auto bg-ink p-6 text-snow">
      <div className="flex items-center justify-between"><Wordmark /><Button variant="site" size="site" aria-label="Close menu" onClick={onClose} className="flex size-11 items-center justify-center rounded-full border border-snow/25 text-xl">×</Button></div>
      <nav aria-label="Primary mobile" className="mt-16 flex flex-col gap-6">
        {([{ to: '/services', name: 'Services' }, { to: '/about', name: 'About' }, { to: '/contact', name: 'Contact' }] as const).map(({ to, name }) => <Link key={to} to={to} onClick={onClose} aria-current={pathname === to ? 'page' : undefined} className="site-nav-link w-fit text-5xl font-semibold tracking-[-0.05em] transition-colors hover:text-brand">{name}</Link>)}
      </nav>
      <div className="mt-auto pt-10"><p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-snow/55"><span className="size-2 rounded-full bg-brand" />Florida / Remote</p><Button variant="site" size="site" type="button" onClick={() => { onClose(); onStartProject(); }} className="flex w-full items-center justify-center gap-3 rounded-full bg-brand px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-snow">Start a project <Arrow /></Button></div>
    </div>
  </div>;
}
