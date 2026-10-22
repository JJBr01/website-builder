import { createFileRoute, Link } from "@tanstack/react-router";
import heroSpeed from "@/assets/hero-speed.jpg";
import { jsonLd, pageHead, websiteSchema } from "@/lib/site";
import { services } from "@/lib/services";
import { Button } from "@/components/ui/button";
import { Arrow } from "@/components/site/brand";
import { useSiteInquiry } from "@/components/site/layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { inquirySteps, projectFaqs, projectFaqSchema, projectPriceSignal } from "@/lib/project-offer";


export const Route = createFileRoute("/")({
  head: () => ({ ...pageHead("/", "MOD 12 — Web Design & Development Studio | Sarasota, FL", "MOD 12 is an independent web design and development studio in Sarasota, Florida. Thoughtful strategy, distinctive design and fast websites for ambitious brands."), scripts: [jsonLd(websiteSchema), jsonLd(projectFaqSchema)] }),
  component: Index,
});

function Index() {
  const startProject = useSiteInquiry();
  return (
    <>
      <section data-hero className="relative min-h-[92vh] px-5 pb-12 pt-5 sm:px-8 lg:px-14 lg:pb-16">
        <div className="speed-line absolute right-0 top-0 h-full w-[42%] bg-brand" />
        <div aria-hidden="true" className="h-[65px] md:h-[61px]" />

        <div className="relative z-10 flex min-h-[calc(92vh-92px)] flex-col justify-end pt-24">
          <div className="my-auto w-full py-6 sm:py-10">
            <img
              src={heroSpeed}
              alt="Long-exposure red and black motion streaks racing across a warm paper background"
              width={1600}
              height={800}
              loading="eager"
              fetchPriority="high"
              className="h-[20vh] w-full rounded-[1.5rem] object-cover object-center ring-1 ring-ink/10 sm:h-[26vh] lg:h-[30vh]"
            />
          </div>
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-ink/55">
            <span className="h-px w-10 bg-brand" />
            Web design &amp; development · Sarasota, FL
          </p>
          <h1 className="max-w-[1100px] text-[clamp(4.2rem,11vw,10rem)] font-semibold leading-[0.82] tracking-[-0.075em]">
            Ideas built
            <span className="block pl-[10vw]">at <span className="text-brand">full speed.</span></span>
          </h1>
          <div className="mt-9 flex flex-col gap-8 border-t border-ink/15 pt-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-lg leading-relaxed text-ink/65">
              We bring web design and development together to build high-performing websites for ambitious brands ready to move forward.
            </p>
            <div className="flex flex-col items-start gap-5 md:items-end">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <Button variant="site" size="site" onClick={startProject} className="min-h-11 rounded-full bg-ink px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-snow motion-safe:transition-transform motion-safe:hover:-translate-y-0.5">Start a project <Arrow /></Button>
                <Link to="/services" className="inline-flex min-h-11 items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-ink underline decoration-brand underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">See services <span aria-hidden="true">→</span></Link>
              </div>
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full motion-safe:animate-ping rounded-full bg-brand opacity-40" />
                <span className="relative inline-flex size-2 rounded-full bg-brand" />
              </span>
              Now booking new projects
            </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-ink px-5 py-24 text-snow sm:px-8 lg:px-14 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand">What we do</p>
            <h2 className="max-w-md text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-7xl">From first thought to finish line.</h2>
            <Link to="/services" className="mt-8 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-snow underline decoration-brand underline-offset-8">See all services <span aria-hidden="true">→</span></Link>
            <p className="mt-5 text-sm leading-relaxed text-snow/80">{projectPriceSignal}</p>
          </div>
          <div className="self-center border-t border-snow/20">
            {services.map((service) => (
              <article key={service.number} className="group grid gap-5 border-b border-snow/20 py-8 sm:grid-cols-[80px_1fr_1fr] sm:py-10">
                <span className="font-mono text-xs text-brand">{service.number}</span>
                <h3 className="text-2xl font-semibold tracking-[-0.03em] motion-safe:transition-transform motion-safe:group-hover:translate-x-1">{service.title}</h3>
                <p className="text-sm leading-relaxed text-snow/60">{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper px-5 py-20 text-ink sm:px-8 lg:px-14 lg:py-28" aria-labelledby="home-process-heading">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-text">How it works</p>
        <h2 id="home-process-heading" className="text-5xl font-semibold leading-[0.95] sm:text-7xl">From inquiry to launch.</h2>
        <ol className="mt-12 grid gap-8 border-t border-ink/15 pt-8 md:grid-cols-3">
          {inquirySteps.map((step) => <li key={step.number}><p className="mb-4 font-mono text-xs text-brand-text">{step.number}</p><h3 className="text-2xl font-semibold">{step.title}</h3><p className="mt-3 max-w-md text-sm leading-relaxed text-ink/65">{step.text}</p></li>)}
        </ol>
      </section>

      <section id="about" className="bg-brand px-5 py-20 text-snow sm:px-8 lg:px-14 lg:py-28">
        <div className="grid items-end gap-16 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-snow">Small team. Serious momentum.</p>
            <p className="max-w-4xl text-4xl font-medium leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              No bloated teams or slow handoffs. Just senior thinking, sharp execution, and a direct line from idea to impact.
            </p>
          </div>
          <div className="flex gap-10 border-t border-snow/30 pt-6 lg:block">
            <div className="lg:mb-10">
              <strong className="block text-2xl font-semibold">One point of contact</strong>
              <span className="text-sm text-snow">You work directly with the person building your site.</span>
            </div>
            <div>
              <strong className="block text-2xl font-semibold">You own everything</strong>
              <span className="text-sm text-snow">Code, content and accounts are yours at launch.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper px-5 py-24 text-ink sm:px-8 lg:px-14 lg:py-36" aria-labelledby="home-faq-heading">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <div><p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-text">FAQ</p><h2 id="home-faq-heading" className="max-w-md text-5xl font-semibold leading-[0.95] sm:text-7xl">Before we get moving.</h2></div>
          <Accordion type="single" collapsible className="border-t border-ink/15">
            {projectFaqs.map(({ question, answer }, index) => <AccordionItem key={question} value={`faq-${index}`} className="border-ink/15"><AccordionTrigger className="min-h-11 gap-6 py-6 text-xl font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-reduce:transition-none [&_svg]:text-ink/65 [&_svg]:motion-reduce:transition-none">{question}</AccordionTrigger><AccordionContent className="max-w-2xl pb-6 text-base leading-relaxed text-ink/65">{answer}</AccordionContent></AccordionItem>)}
          </Accordion>
        </div>
      </section>

    </>
  )
}
