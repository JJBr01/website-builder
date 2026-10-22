import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MOD 12 — Independent Digital Studio" },
      { name: "description", content: "MOD 12 designs and builds high-performing websites for ambitious brands ready to move forward." },
      { property: "og:title", content: "MOD 12 — Ideas built at full speed" },
      { property: "og:description", content: "Strategy, design and development from an independent digital studio in New York." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  {
    number: '01',
    title: 'Strategy & direction',
    text: 'Positioning, user journeys, and a clear digital roadmap built around your business goals.',
  },
  {
    number: '02',
    title: 'Design that performs',
    text: 'Distinctive, conversion-minded interfaces that make your brand feel considered at every touchpoint.',
  },
  {
    number: '03',
    title: 'Development',
    text: 'Fast, responsive websites engineered for a seamless launch and effortless growth.',
  },
]

const Arrow = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4 fill-none stroke-current stroke-[1.8]">
    <path d="M3 10h13M11 5l5 5-5 5" />
  </svg>
)

const Wordmark = () => (
  <span className="flex items-center gap-2" aria-label="MOD 12">
    <span className="flex flex-col gap-[3px]" aria-hidden="true">
      <span className="h-[3px] w-7 -skew-x-[28deg] bg-brand" />
      <span className="ml-2 h-[3px] w-5 -skew-x-[28deg] bg-brand" />
      <span className="ml-4 h-[3px] w-3 -skew-x-[28deg] bg-brand" />
    </span>
    <span className="-skew-x-[10deg] text-xl font-bold uppercase leading-none tracking-[-0.09em]">
      MOD<span className="ml-1 text-brand">12</span>
    </span>
  </span>
)

function Index() {
  return (
    <main className="overflow-hidden bg-paper text-ink">
      <section className="relative min-h-[92vh] px-5 pb-12 pt-5 sm:px-8 lg:px-14 lg:pb-16">
        <div className="speed-line absolute right-0 top-0 h-full w-[42%] bg-brand" />
        <nav className="relative z-10 flex items-center justify-between border-b border-ink/15 pb-5">
          <a href="/" aria-label="MOD 12 home">
            <Wordmark />
          </a>
          <div className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.14em] md:flex">
            <a className="transition-opacity hover:opacity-50" href="#work">Work</a>
            <a className="transition-opacity hover:opacity-50" href="#services">Services</a>
            <a className="transition-opacity hover:opacity-50" href="#about">About</a>
          </div>
          <a
            href="#contact"
            className="group flex items-center gap-3 rounded-full bg-ink px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-snow transition-transform hover:-translate-y-0.5"
          >
            Start a project <Arrow />
          </a>
        </nav>

        <div className="relative z-10 flex min-h-[calc(92vh-92px)] flex-col justify-end pt-24">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-ink/55">
            <span className="h-px w-10 bg-brand" />
            Independent digital studio
          </p>
          <h1 className="max-w-[1100px] text-[clamp(4.2rem,11vw,10rem)] font-semibold leading-[0.82] tracking-[-0.075em]">
            Ideas built
            <span className="block pl-[10vw]">at <span className="text-brand">full speed.</span></span>
          </h1>
          <div className="mt-9 flex flex-col gap-8 border-t border-ink/15 pt-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-lg leading-relaxed text-ink/65">
              We design and build high-performing websites for ambitious brands ready to move forward.
            </p>
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-40" />
                <span className="relative inline-flex size-2 rounded-full bg-brand" />
              </span>
              Booking projects for Q2
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="bg-ink px-5 py-24 text-snow sm:px-8 lg:px-14 lg:py-36">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand">Selected work</p>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">Built to lead.</h2>
          </div>
          <p className="hidden max-w-xs text-sm leading-relaxed text-snow/45 md:block">
            Every project is designed to sharpen your position and turn attention into action.
          </p>
        </div>

        <div className="group grid overflow-hidden border-y border-snow/15 lg:grid-cols-[1.6fr_1fr]">
          <div className="project-visual relative min-h-[420px] overflow-hidden bg-stone p-8 sm:min-h-[560px] sm:p-12">
            <div className="absolute inset-x-[8%] top-[12%] bottom-0 rotate-[-3deg] rounded-t-xl bg-cream p-3 shadow-2xl transition-transform duration-700 group-hover:rotate-0 group-hover:scale-[1.02]">
              <div className="flex h-full flex-col overflow-hidden rounded-lg bg-brand p-6 text-snow">
                <div className="flex items-center justify-between border-b border-snow/30 pb-4 text-[10px] font-bold uppercase tracking-widest">
                  <span>Velo / Performance</span><span>Menu</span>
                </div>
                <div className="flex flex-1 items-center">
                  <p className="text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.82] tracking-[-0.07em]">MOVE<br />BEYOND.</p>
                </div>
                <div className="h-14 w-14 rounded-full border border-snow/50" />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between px-1 py-8 lg:p-10">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-snow/45">
              <span>Brand platform</span><span>2025</span>
            </div>
            <div className="mt-24">
              <h3 className="text-4xl font-semibold tracking-[-0.04em]">Velo Performance</h3>
              <p className="mt-4 max-w-sm leading-relaxed text-snow/50">
                Reframing an elite performance brand with a digital experience engineered to inspire motion.
              </p>
              <a href="#contact" className="mt-8 inline-flex items-center gap-3 border-b border-snow/30 pb-2 text-xs font-bold uppercase tracking-[0.16em] transition-colors hover:border-brand hover:text-brand">
                View project <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="border-0 bg-transparent px-5 py-24 shadow-none sm:px-8 lg:px-14 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <div>
            <p className="mb-4 border-paper bg-transparent text-[47px] font-bold uppercase tracking-[0.2em] text-brand after:mt-1 after:block after:h-px after:w-full after:bg-ink after:content-['']">What we do</p>
            <h2 className="max-w-md text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-7xl">From first thought to finish line.</h2>
          </div>
          <div className="-mx-[7px] -my-[15px] self-center border-t border-ink/20 lg:-translate-x-12">
            {services.map((service) => (
              <article key={service.number} className="group grid gap-5 border-b border-ink/20 py-8 sm:grid-cols-[80px_1fr_1fr] sm:py-10">
                <span className="font-mono text-xs text-brand">{service.number}</span>
                <h3 className="text-2xl font-semibold tracking-[-0.03em] transition-transform group-hover:translate-x-1">{service.title}</h3>
                <p className="text-sm leading-relaxed text-ink/55">{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-3 mb-3 overflow-hidden rounded-[2rem] bg-brand px-5 py-20 text-snow sm:mx-5 sm:px-8 lg:px-14 lg:py-28">
        <div className="grid items-end gap-16 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-snow/60">Small team. Serious momentum.</p>
            <p className="max-w-4xl text-4xl font-medium leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              No bloated teams or slow handoffs. Just senior thinking, sharp execution, and a direct line from idea to impact.
            </p>
          </div>
          <div className="flex gap-10 border-t border-snow/30 pt-6 lg:block">
            <div className="lg:mb-10">
              <strong className="block text-4xl font-semibold">24+</strong>
              <span className="text-xs uppercase tracking-widest text-snow/60">Projects launched</span>
            </div>
            <div>
              <strong className="block text-4xl font-semibold">11</strong>
              <span className="text-xs uppercase tracking-widest text-snow/60">Design awards</span>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-ink px-5 pb-8 pt-24 text-snow sm:px-8 lg:px-14 lg:pt-32">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-brand">Have a project in mind?</p>
        <a href="mailto:hello@mod12.co" className="group flex items-end justify-between border-b border-snow/25 pb-8">
          <span className="text-[clamp(3rem,8vw,8rem)] font-semibold leading-none tracking-[-0.065em]">Let’s make it move.</span>
          <span className="mb-2 hidden size-16 items-center justify-center rounded-full bg-brand transition-transform group-hover:rotate-[-15deg] sm:flex">
            <Arrow />
          </span>
        </a>
        <div className="mt-8 flex flex-col gap-5 text-xs font-semibold uppercase tracking-[0.14em] text-snow/45 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-snow">
            <Wordmark />
          </div>
          <span>Independent studio · New York / Worldwide</span>
          <span>© 2025 MOD 12</span>
        </div>
      </footer>
    </main>
  )
}
