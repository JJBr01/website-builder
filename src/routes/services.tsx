import { createFileRoute } from "@tanstack/react-router";
import { services } from "@/lib/services";
import { breadcrumbSchema, jsonLd, pageHead, serviceSchemas } from "@/lib/site";
import { projectPriceSignal } from "@/lib/project-offer";

export const Route = createFileRoute('/services')({
  head: () => ({ ...pageHead('/services', 'Web Design & Development Services — MOD 12', 'Explore web strategy, design and development from MOD 12. A Florida studio building distinctive, performance-minded websites with a direct line to your developer.'), scripts: [jsonLd(breadcrumbSchema('/services', 'Services')), ...serviceSchemas.map(jsonLd)] }),
  component: Services,
});
function Services() {
  return <>
    <section data-hero className="relative px-5 pb-20 pt-44 sm:px-8 sm:pb-24 lg:px-14 lg:pb-32 lg:pt-56">
      <div aria-hidden="true" className="speed-line absolute right-0 top-0 h-full w-[42%] bg-brand" />
      <div className="relative z-10"><p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-ink/55"><span className="h-px w-10 bg-brand" />What we do</p><h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] sm:text-7xl lg:text-8xl">Web design &amp; development services</h1><p className="mt-9 max-w-xl border-t border-ink/15 pt-6 text-lg leading-relaxed text-ink/65">From first thought to finish line. Strategy, design and development for small businesses, startups and established brands ready to move forward.</p></div>
    </section>
    {services.map((service, index) => <section key={service.number} className={`px-5 py-24 sm:px-8 lg:px-14 lg:py-36 ${index === 1 ? 'bg-brand text-snow' : 'bg-ink text-snow'}`}><div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24"><div><p className={`mb-4 font-mono text-xs ${index === 1 ? 'text-snow' : 'text-brand'}`}>{service.number}</p><h2 className="max-w-md text-5xl font-semibold leading-[0.95] sm:text-7xl">{service.title}</h2></div><div className="max-w-2xl space-y-6 self-center border-t border-snow/20 pt-6">{service.paragraphs.map((paragraph) => <p key={paragraph} className={`text-lg leading-relaxed ${index === 1 ? 'text-snow' : 'text-snow/80'}`}>{paragraph}</p>)}</div></div></section>)}
    <section className="px-5 py-20 sm:px-8 lg:px-14 lg:py-28"><h2 className="text-4xl font-semibold sm:text-6xl">How a project works</h2><p className="mt-6 text-sm leading-relaxed text-ink/65">{projectPriceSignal}</p><ol className="mt-12 grid gap-8 border-t border-ink/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">{[{ title: 'Discover', text: 'Understand your goals, audience and direction.' }, { title: 'Design', text: 'Shape the content, journeys and visual experience.' }, { title: 'Build', text: 'Bring the design to life with performance in mind.' }, { title: 'Launch', text: 'Review, refine and hand over your code, content and accounts.' }].map((step, index) => <li key={step.title}><h3 className="flex items-center gap-3 text-2xl font-semibold">{step.title}{index < 3 && <span aria-hidden="true" className="text-brand">→</span>}</h3><p className="mt-3 text-sm leading-relaxed text-ink/65">{step.text}</p></li>)}</ol></section>
  </>;
}
