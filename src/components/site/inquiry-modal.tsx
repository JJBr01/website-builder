import { useEffect, useState } from "react";
import { CONTACT_EMAIL, inquirySchema, inquiryToText, sendInquiry, type Inquiry } from "@/lib/inquiry";
import { Arrow } from "./brand";

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

export function InquiryModal({ onClose }: { onClose: () => void }) {
  const [scope, setScope] = useState<string[]>([])
  const [budget, setBudget] = useState<string[]>([])
  const [timeline, setTimeline] = useState<string[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [company, setCompany] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [fallback, setFallback] = useState<string | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (sending) return
    const parsed = inquirySchema.safeParse({
      name, email, scope, notes, company,
      budget: budget[0], timeline: timeline[0],
    })
    if (!parsed.success) return setError(parsed.error.issues[0]?.message ?? 'Check the form and try again.')
    setError('')
    setSending(true)
    const data: Inquiry = parsed.data
    try {
      const result = await sendInquiry({ data })
      if (result.ok) return setSent(true)
      // Email service not set up or it failed: hand the visitor a ready-made email instead of losing the lead.
      setFallback(`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('New project inquiry from ' + data.name)}&body=${encodeURIComponent(inquiryToText(data))}`)
    } catch {
      setFallback(`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('New project inquiry from ' + data.name)}&body=${encodeURIComponent(inquiryToText(data))}`)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label="Start a project">
      <button aria-label="Close" className="absolute inset-0 bg-ink/60" onClick={onClose} />
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-[2rem] bg-paper p-6 text-ink sm:rounded-[2rem] sm:p-10">
        <div className="mb-8 flex items-start justify-between gap-6">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand">Start a project</p>
            <h2 className="text-4xl font-semibold tracking-[-0.05em]">{sent ? 'Inquiry sent.' : 'Tell us what you’re building.'}</h2>
          </div>
          <button aria-label="Close" onClick={onClose} className="flex size-11 shrink-0 items-center justify-center rounded-full border border-ink/20 text-xl">×</button>
        </div>
        {sent ? (
          <div>
            <p className="max-w-md leading-relaxed text-ink/65">We got your brief and will reply to {email.trim()} within two working days.</p>
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
            <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" value={company} onChange={(e) => setCompany(e.target.value)} className="absolute -left-[9999px] size-px opacity-0" />
            {error && <p role="alert" className="text-sm font-medium text-brand">{error}</p>}
            {fallback && (
              <div role="alert" className="rounded-2xl border border-ink/15 p-5 text-sm leading-relaxed">
                <p className="text-ink/75">The form couldn’t send your inquiry. Your details are ready in an email instead.</p>
                <a href={fallback} className="mt-3 inline-block font-semibold text-brand underline underline-offset-4">Open it in your email app</a>
                <p className="mt-2 text-ink/55">Or write to {CONTACT_EMAIL} directly.</p>
              </div>
            )}
            <button type="submit" disabled={sending} className="flex items-center justify-center gap-3 self-start rounded-full bg-ink px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-snow transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0">
              {sending ? 'Sending…' : <>Send inquiry <Arrow /></>}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
