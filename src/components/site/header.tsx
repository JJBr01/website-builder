import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState, type RefObject } from "react";
import { Button } from "@/components/ui/button";
import { Arrow, Wordmark } from "./brand";

export function SiteHeader({ onStartProject, onOpenMenu, menuButtonRef, menuOpen }: { onStartProject: () => void; onOpenMenu: () => void; menuButtonRef: RefObject<HTMLButtonElement | null>; menuOpen: boolean }) {
  const { pathname } = useLocation();
  const [pinned, setPinned] = useState(false);
  useEffect(() => {
    const update = () => {
      const hero = document.querySelector('[data-hero]');
      setPinned(hero ? hero.getBoundingClientRect().bottom <= 100 : window.scrollY > 100);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [pathname]);
  return <header className={`site-header ${pinned ? 'site-header-pinned' : ''}`}>
    <nav aria-label="Primary" className="relative z-10 flex items-center justify-between border-b border-ink/15 pb-5">
      <Link to="/" aria-label="MOD 12 home"><Wordmark /></Link>
      <div className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.14em] md:flex">
        {([{ to: '/services', name: 'Services' }, { to: '/about', name: 'About' }, { to: '/contact', name: 'Contact' }] as const).map(({ to, name }) => <Link key={to} to={to} aria-current={pathname === to ? 'page' : undefined} className="site-nav-link transition-opacity hover:opacity-50">{name}</Link>)}
      </div>
      <div className="flex items-center gap-3">
        <Button variant="site" size="site" type="button" onClick={onStartProject} className="group hidden items-center gap-3 rounded-full bg-ink px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-snow transition-transform hover:-translate-y-0.5 sm:flex">Start a project <Arrow /></Button>
        <Button ref={menuButtonRef} variant="site" size="site" type="button" aria-label="Open menu" aria-expanded={menuOpen} aria-controls={menuOpen ? 'mobile-menu' : undefined} onClick={onOpenMenu} className="flex size-11 flex-col items-center justify-center gap-[5px] rounded-full bg-ink md:hidden"><span className="h-[2px] w-5 bg-snow" /><span className="h-[2px] w-5 bg-snow" /></Button>
      </div>
    </nav>
  </header>;
}
