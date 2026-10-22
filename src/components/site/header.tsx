import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Arrow, Wordmark } from "./brand";

export function SiteHeader({ onStartProject, onOpenMenu }: { onStartProject: () => void; onOpenMenu: () => void }) {
 return <header className="absolute left-5 right-5 top-5 z-20 sm:left-8 sm:right-8 lg:left-14 lg:right-14">
        <nav className="relative z-10 flex items-center justify-between border-b border-ink/15 pb-5">
          <Link to="/" aria-label="MOD 12 home">
            <Wordmark />
          </Link>
          <div className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.14em] md:flex">
            <Link className="transition-opacity hover:opacity-50" to="/" hash="services">Services</Link>
            <Link className="transition-opacity hover:opacity-50" to="/about">About</Link>
            <Link className="transition-opacity hover:opacity-50" to="." hash="contact">Contact</Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="site" size="site"
              type="button"
              onClick={() => onStartProject()}
              className="group hidden items-center gap-3 rounded-full bg-ink px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-snow transition-transform hover:-translate-y-0.5 sm:flex"
            >
              Start a project <Arrow />
            </Button>
            <Button variant="site" size="site"
              type="button"
              aria-label="Open menu"
              onClick={() => onOpenMenu()}
              className="flex size-11 flex-col items-center justify-center gap-[5px] rounded-full bg-ink md:hidden"
            >
              <span className="h-[2px] w-5 bg-snow" />
              <span className="h-[2px] w-5 bg-snow" />
            </Button>
          </div>
        </nav>
</header>;
}
