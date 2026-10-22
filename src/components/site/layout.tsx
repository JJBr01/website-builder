import { useState, type ReactNode } from "react";
import { SiteHeader } from "./header";
import { MobileMenu } from "./mobile-menu";
import { SiteFooter } from "./footer";
import { InquiryModal } from "./inquiry-modal";

export function SiteLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const startProject = () => setInquiryOpen(true);
  return (
    <div className="relative overflow-hidden bg-paper text-ink">
      <SiteHeader onStartProject={startProject} onOpenMenu={() => setMenuOpen(true)} />
      {children}
      <SiteFooter onStartProject={startProject} />
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} onStartProject={startProject} />}
      {inquiryOpen && <InquiryModal onClose={() => setInquiryOpen(false)} />}
    </div>
  );
}