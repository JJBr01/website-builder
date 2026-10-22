import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Arrow } from "@/components/site/brand";
import { useSiteInquiry } from "@/components/site/layout";
import { CONTACT_EMAIL } from "@/lib/inquiry";
import { breadcrumbSchema, jsonLd, pageHead } from "@/lib/site";

export const Route = createFileRoute('/contact')({
  head: () => ({ ...pageHead('/contact', 'Contact MOD 12 — Start a Web Project', 'Have a website in mind? Talk directly with Justin James at MOD 12 about web design and development. Based in Florida, working with clients anywhere.'), scripts: [jsonLd(breadcrumbSchema('/contact', 'Contact'))] }),
  component: Contact,
});
function Contact() {
  const startProject = useSiteInquiry();
  return <section data-hero className="relative px-5 pb-24 pt-44 sm:px-8 lg:px-14 lg:pb-32 lg:pt-56">
    <div aria-hidden="true" className="speed-line absolute right-0 top-0 h-full w-[42%] bg-brand" />
    <div className="relative z-10"><p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-ink/55"><span className="h-px w-10 bg-brand" />Contact MOD 12</p><h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] sm:text-7xl lg:text-8xl">Start a <span className="text-brand">project.</span></h1><p className="mt-9 max-w-xl border-t border-ink/15 pt-6 text-lg leading-relaxed text-ink/65">Have a project in mind? Tell us where you are and where you want to go. A direct conversation with the person who will design and build your site.</p><Button variant="site" size="site" onClick={startProject} className="mt-9 rounded-full bg-ink px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-snow">Start a project <Arrow /></Button><div className="mt-16 space-y-5 border-t border-ink/15 pt-6"><a href={`mailto:${CONTACT_EMAIL}`} className="break-words text-2xl font-semibold underline decoration-brand underline-offset-8 sm:text-3xl">{CONTACT_EMAIL}</a><p className="text-sm leading-relaxed text-ink/65">Sarasota / Tampa, Florida · Working remotely with clients anywhere</p></div></div>
  </section>;
}
