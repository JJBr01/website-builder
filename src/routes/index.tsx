import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroSpeed from "@/assets/hero-speed.jpg";


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
  const [menuOpen, setMenuOpen] = useState(false)
  const [inquiryOpen, setInquiryOpen] = useState(false)
  return (
    <main className="overflow-hidden bg-paper text-ink">
      <section className="relative min-h-[92vh] px-5 pb-12 pt-5 sm:px-8 lg:px-14 lg:pb-16">
        <div className="speed-line absolute right-0 top-0 h-full w-[42%] bg-brand" />
        <nav className="relative z-10 flex items-center justify-between border-b border-ink/15 pb-5">
          <a href="/" aria-label="MOD 12 home">
            <Wordmark />
          </a>
          <div className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.14em] md:flex">
            <a className="transition-opacity hover:opacity-50" href="#services">Services</a>
            <a className="transition-opacity hover:opacity-50" href="#about">About</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setInquiryOpen(true)}
              className="group hidden items-center gap-3 rounded-full bg-ink px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-snow transition-transform hover:-translate-y-0.5 sm:flex"
            >
              Start a project <Arrow />
            </button>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="flex size-11 flex-col items-center justify-center gap-[5px] rounded-full bg-ink md:hidden"
            >
              <span className="h-[2px] w-5 bg-snow" />
              <span className="h-[2px] w-5 bg-snow" />
            </button>
          </div>
        </nav>

        <div className="relative z-10 flex min-h-[calc(92vh-92px)] flex-col justify-end pt-24">
          <div className="my-auto w-full py-6 sm:py-10">
            <img
              src={heroSpeed}
              alt="Long-exposure red and black motion streaks racing across a warm paper background"
              width={1600}
              height={800}
              className="h-[20vh] w-full rounded-[1.5rem] object-cover object-center ring-1 ring-ink/10 sm:h-[26vh] lg:h-[30vh]"
            />
          </div>
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

      <section id="services" className="bg-ink px-5 py-24 text-snow sm:px-8 lg:px-14 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand">What we do</p>
            <h2 className="max-w-md text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-7xl">From first thought to finish line.</h2>
          </div>
          <div className="self-center border-t border-snow/20">
            {services.map((service) => (
              <article key={service.number} className="group grid gap-5 border-b border-snow/20 py-8 sm:grid-cols-[80px_1fr_1fr] sm:py-10">
                <span className="font-mono text-xs text-brand">{service.number}</span>
                <h3 className="text-2xl font-semibold tracking-[-0.03em] transition-transform group-hover:translate-x-1">{service.title}</h3>
                <p className="text-sm leading-relaxed text-snow/60">{service.text}</p>
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

      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button aria-label="Close menu" className="absolute inset-0 bg-ink/50" onClick={() => setMenuOpen(false)} />
          <div className="drawer-in absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-ink p-6 text-snow">
            <div className="flex items-center justify-between">
              <Wordmark />
              <button aria-label="Close menu" onClick={() => setMenuOpen(false)} className="flex size-11 items-center justify-center rounded-full border border-snow/25 text-xl">×</button>
            </div>
            <nav className="mt-16 flex flex-col gap-6">
              {[['Services', '#services'], ['About', '#about'], ['Contact', '#contact']].map(([label, href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} className="text-5xl font-semibold tracking-[-0.05em] transition-colors hover:text-brand">{label}</a>
              ))}
            </nav>
            <div className="mt-auto">
              <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-snow/55">
                <span className="size-2 rounded-full bg-brand" /> New York / Worldwide
              </p>
              <button
                type="button"
                onClick={() => { setMenuOpen(false); setInquiryOpen(true) }}
                className="flex w-full items-center justify-center gap-3 rounded-full bg-brand px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-snow"
              >
                Start a project <Arrow />
              </button>
            </div>
          </div>
        </div>
      )}

      {inquiryOpen && <InquiryModal onClose={() => setInquiryOpen(false)} />}
    </main>
  )
}

const scopes = ['Branding', 'Web design', 'Development', 'Full studio partner']
const budgets = ['$15k–$30k', '$30k–$60k', '$60k+']
const timelines = ['ASAP (<1 mo)', '1–3 months', 'Flexible']

function Chips({ label, options, value, onChange, multi }: { label: string; options: string[]; value: string[]; onChange: (v: string[]) => void; multi?: boolean }) {
  return (
    <fieldset>
      <legend className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-ink/55">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value.includes(o)
          return (
            <button
              key={o}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(multi ? (active ? value.filter((v) => v !== o) : [...value, o]) : [o])}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${active ? 'border-brand bg-brand text-snow' : 'border-ink/20 hover:border-ink'}`}
            >
              {o}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

function InquiryModal({ onClose }: { onClose: () => void }) {
  const [scope, setScope] = useState<string[]>([])
  const [budget, setBudget] = useState<string[]>([])
  const [timeline, setTimeline] = useState<string[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || name.length > 100) return setError('Please enter your name.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || email.length > 255) return setError('Please enter a valid email.')
    if (scope.length === 0) return setError('Pick at least one scope.')
    if (notes.length > 1000) return setError('Notes must be under 1000 characters.')
    setError('')
    const body = `Name: ${name.trim()}\nEmail: ${email.trim()}\nScope: ${scope.join(', ')}\nBudget: ${budget[0] ?? '-'}\nTimeline: ${timeline[0] ?? '-'}\n\n${notes.trim()}`
    window.location.href = `mailto:hello@mod12.co?subject=${encodeURIComponent('New project inquiry — ' + name.trim())}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label="Start a project">
      <button aria-label="Close" className="absolute inset-0 bg-ink/60" onClick={onClose} />
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-[2rem] bg-paper p-6 text-ink sm:rounded-[2rem] sm:p-10">
        <div className="mb-8 flex items-start justify-between gap-6">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand">Start a project</p>
            <h2 className="text-4xl font-semibold tracking-[-0.05em]">{sent ? 'Thanks — talk soon.' : 'Tell us what you’re building.'}</h2>
          </div>
          <button aria-label="Close" onClick={onClose} className="flex size-11 shrink-0 items-center justify-center rounded-full border border-ink/20 text-xl">×</button>
        </div>
        {sent ? (
          <div>
            <p className="max-w-md leading-relaxed text-ink/65">Your email app should have opened with your brief ready to send. We reply within two working days.</p>
            <button onClick={onClose} className="mt-8 rounded-full bg-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-snow">Close</button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-7">
            <Chips label="Scope" options={scopes} value={scope} onChange={setScope} multi />
            <Chips label="Budget" options={budgets} value={budget} onChange={setBudget} />
            <Chips label="Timeline" options={timelines} value={timeline} onChange={setTimeline} />
            <div className="grid gap-4 sm:grid-cols-2">
              <input aria-label="Name" placeholder="Your name" maxLength={100} value={name} onChange={(e) => setName(e.target.value)} className="border-b border-ink/25 bg-transparent py-3 outline-none focus:border-brand" />
              <input aria-label="Email" type="email" placeholder="Email" maxLength={255} value={email} onChange={(e) => setEmail(e.target.value)} className="border-b border-ink/25 bg-transparent py-3 outline-none focus:border-brand" />
            </div>
            <textarea aria-label="Project notes" placeholder="A few words about the project" rows={3} maxLength={1000} value={notes} onChange={(e) => setNotes(e.target.value)} className="resize-none border-b border-ink/25 bg-transparent py-3 outline-none focus:border-brand" />
            {error && <p className="text-sm font-medium text-brand">{error}</p>}
            <button type="submit" className="flex items-center justify-center gap-3 self-start rounded-full bg-ink px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-snow transition-transform hover:-translate-y-0.5">
              Send inquiry <Arrow />
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
