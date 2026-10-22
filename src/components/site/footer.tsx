import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { CONTACT_EMAIL } from "@/lib/inquiry";
import { Arrow, Wordmark } from "./brand";

export function SiteFooter({ onStartProject }: { onStartProject: () => void }) { return (
      <footer id="contact" className="bg-ink px-5 pb-8 pt-24 text-snow sm:px-8 lg:px-14 lg:pt-32">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-brand-on-dark">Have a project in mind?</p>
        <Button variant="site" size="site" onClick={onStartProject} className="group flex h-auto w-full items-end justify-between whitespace-normal rounded-none bg-transparent text-left text-snow border-b border-snow/25 pb-8">
          <span className="text-[clamp(3rem,8vw,8rem)] font-semibold leading-none tracking-[-0.065em]">Let’s make it move.</span>
          <span className="mb-2 hidden size-16 items-center justify-center rounded-full bg-brand motion-safe:transition-transform motion-safe:group-hover:rotate-[-15deg] sm:flex">
            <Arrow />
          </span>
        </Button>
        <div className="mt-10 grid gap-8 border-b border-snow/20 pb-10 sm:grid-cols-2">
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-4 text-xs font-semibold uppercase tracking-[0.14em] sm:max-w-xs">
            <Link to="/" className="hover:text-brand-on-dark">Home</Link>
            <Link to="/services" className="hover:text-brand-on-dark">Services</Link>
            <Link to="/about" className="hover:text-brand-on-dark">About</Link>
            <Link to="/contact" className="hover:text-brand-on-dark">Contact</Link>
          </nav>
          <div className="space-y-4 sm:text-right"><a href={`mailto:${CONTACT_EMAIL}`} className="text-lg underline decoration-brand underline-offset-4">{CONTACT_EMAIL}</a><p className="text-xs font-semibold uppercase tracking-[0.14em] text-snow/60">Florida / Remote</p></div>
        </div>
        <div className="mt-8 flex flex-col gap-5 text-xs font-semibold uppercase tracking-[0.14em] text-snow/45 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-snow">
            <Wordmark />
          </div>
          <span>Independent studio</span>
          <span>© {new Date().getFullYear()} MOD 12</span>
        </div>
      </footer>
); }
