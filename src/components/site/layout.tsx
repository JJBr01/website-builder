import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { SiteHeader } from "./header";
import { MobileMenu } from "./mobile-menu";
import { SiteFooter } from "./footer";
import { InquiryModal } from "./inquiry-modal";

const SiteInquiryContext = createContext<(() => void) | null>(null);
export function useSiteInquiry() {
  const open = useContext(SiteInquiryContext);
  if (!open) throw new Error("Inquiry controls must be inside SiteLayout");
  return open;
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const inquiryOpenerRef = useRef<HTMLElement | null>(null);
  const closeMenu = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };
  const startProject = () => {
    inquiryOpenerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setInquiryOpen(true);
  };
  return (
    <SiteInquiryContext.Provider value={startProject}>
    <div className="relative overflow-hidden bg-paper text-ink">
      <a href="#main" className="skip-link">Skip to content</a>
      <SiteHeader menuOpen={menuOpen} menuButtonRef={menuButtonRef} onStartProject={startProject} onOpenMenu={() => setMenuOpen(true)} />
      <main id="main" tabIndex={-1} className="bg-paper text-ink outline-none">{children}</main>
      <SiteFooter onStartProject={startProject} />
      {menuOpen && <MobileMenu onClose={closeMenu} onStartProject={startProject} />}
      {inquiryOpen && <InquiryModal onClose={() => setInquiryOpen(false)} onRestoreFocus={() => inquiryOpenerRef.current?.focus()} />}
    </div>
    </SiteInquiryContext.Provider>
  );
}