import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Arrow, Wordmark } from "./brand";

export function MobileMenu({ onClose, onStartProject }: { onClose: () => void; onStartProject: () => void }) { return (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <Button variant="site" size="site" aria-label="Close menu" className="absolute inset-0 bg-ink/50" onClick={() => onClose()} />
          <div className="drawer-in absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-ink p-6 text-snow">
            <div className="flex items-center justify-between">
              <Wordmark />
              <Button variant="site" size="site" aria-label="Close menu" onClick={() => onClose()} className="flex size-11 items-center justify-center rounded-full border border-snow/25 text-xl">×</Button>
            </div>
            <nav className="mt-16 flex flex-col gap-6">
              <Link to="/" hash="services" onClick={onClose} className="text-5xl font-semibold tracking-[-0.05em] transition-colors hover:text-brand">Services</Link>
              <Link to="/about" onClick={onClose} className="text-5xl font-semibold tracking-[-0.05em] transition-colors hover:text-brand">About</Link>
              <Link to="." hash="contact" onClick={onClose} className="text-5xl font-semibold tracking-[-0.05em] transition-colors hover:text-brand">Contact</Link>
            </nav>
            <div className="mt-auto">
              <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-snow/55">
                <span className="size-2 rounded-full bg-brand" /> Florida / Remote
              </p>
              <Button variant="site" size="site"
                type="button"
                onClick={() => { onClose(); onStartProject() }}
                className="flex w-full items-center justify-center gap-3 rounded-full bg-brand px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-snow"
              >
                Start a project <Arrow />
              </Button>
            </div>
          </div>
        </div>
); }
