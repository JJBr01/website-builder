import { createFileRoute } from "@tanstack/react-router";
import { breadcrumbSchema, jsonLd, pageHead } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({ ...pageHead("/about", "About — MOD 12", "Meet Justin James at MOD 12, an independent Florida studio. Direct collaboration, thoughtful web design and performance-minded development for businesses everywhere."), scripts: [jsonLd(breadcrumbSchema('/about', 'About'))] }),
  component: About,
});

const principles = [
  { title: "One point of contact", text: "The person you talk to is the person designing and building your site. A direct line, from the first conversation to launch." },
  { title: "Fast, clear communication", text: "Straight answers, clear next steps and timely updates. Less back-and-forth. More forward motion." },
  { title: "Built to perform. Ready to be found.", text: "Performance and search are part of the plan from day one, not a checklist saved for the finish line." },
  { title: "You own everything", text: "Your code, content and accounts are yours at launch. No lock-in. Just a solid foundation to move forward." },
];

function About() {
  return (
    <>
      <section data-hero className="relative px-5 pb-20 pt-44 sm:px-8 sm:pb-24 lg:px-14 lg:pb-32 lg:pt-56">
        <div aria-hidden="true" className="speed-line absolute right-0 top-0 h-full w-[42%] bg-brand" />
        <div className="relative z-10">
          <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-ink/55"><span className="h-px w-10 bg-brand" />About MOD 12</p>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-7xl lg:text-8xl">Small studio.<br />Direct line.<br /><span className="text-brand">Real momentum.</span></h1>
          <p className="mt-9 max-w-xl border-t border-ink/15 pt-6 text-lg leading-relaxed text-ink/65">An independent studio where the person you talk to is the person who builds your site. For small businesses, startups and established brands ready to move forward.</p>
        </div>
      </section>
      <section className="bg-brand px-5 py-20 text-snow sm:px-8 lg:px-14 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <div><p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-snow/60">Who's behind it</p><h2 className="text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-7xl">Justin James.</h2></div>
          <p className="max-w-3xl self-center text-2xl font-medium leading-relaxed sm:text-3xl">MOD 12 is led by Justin James, a web developer and designer with a background in web development, graphic design and automation engineering, based in the Sarasota / Tampa area of Florida and working with clients anywhere.</p>
        </div>
      </section>
      <section className="bg-ink px-5 py-24 text-snow sm:px-8 lg:px-14 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <div><p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand">How we work</p><h2 className="max-w-md text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-7xl">Less friction.<br />More progress.</h2></div>
          <div className="border-t border-snow/20">{principles.map(({ title, text }) => <article key={title} className="grid gap-5 border-b border-snow/20 py-8 sm:grid-cols-2 sm:py-10"><h3 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h3><p className="text-sm leading-relaxed text-snow/60">{text}</p></article>)}</div>
        </div>
      </section>
    </>
  );
}