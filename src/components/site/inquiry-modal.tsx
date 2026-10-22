import { useEffect, useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL, inquirySchema, sendInquiry, type Inquiry } from "@/lib/inquiry";
import { buildMailto } from "@/lib/inquiry-form";
import { Arrow } from "./brand";

const scopes = ['Branding', 'Web design', 'Development', 'Full studio partner']
const budgets = ['$15k–$30k', '$30k–$60k', '$60k+']
const timelines = ['ASAP (<1 mo)', '1–3 months', 'Flexible']

type Field = 'scope' | 'name' | 'email' | 'notes';
type FieldErrors = Partial<Record<Field, string>>;
const fieldLabel = 'mb-3 block text-xs font-bold uppercase tracking-[0.16em] text-ink/55';
const fieldControl = 'w-full border-b border-ink/25 bg-transparent py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper';

function Chips({ label, options, value, onChange, multi, error }: { label: string; options: string[]; value: string[]; onChange: (v: string[]) => void; multi?: boolean; error?: string | undefined }) {
  return (
    <fieldset aria-invalid={error ? true : undefined} aria-describedby={error ? 'inquiry-scope-error' : undefined}>
      <legend className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-ink/55">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value.includes(o)
          return (
            <Button variant="site" size="site"
              key={o}
              type="button"
              aria-pressed={active}
              data-inquiry-field={label === 'Scope' ? 'scope' : undefined}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? 'inquiry-scope-error' : undefined}
              onClick={() => onChange(multi ? (active ? value.filter((v) => v !== o) : [...value, o]) : [o])}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${active ? 'border-brand bg-brand text-snow' : 'border-ink/20 hover:border-ink'}`}
            >
              {o}
            </Button>
          )
        })}
      </div>
      {error && <p id="inquiry-scope-error" className="mt-2 text-sm font-medium text-brand-text">{error}</p>}
    </fieldset>
  )
}

export function InquiryModal({ onClose, onRestoreFocus }: { onClose: () => void; onRestoreFocus: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [scope, setScope] = useState<string[]>([])
  const [budget, setBudget] = useState<string[]>([])
  const [timeline, setTimeline] = useState<string[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [company, setCompany] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [fallback, setFallback] = useState<string | null>(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (sending) return
    const parsed = inquirySchema.safeParse({
      name, email, scope, notes, company,
      budget: budget[0], timeline: timeline[0],
    })
    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      let firstInvalid: Field | undefined;
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (field !== 'scope' && field !== 'name' && field !== 'email' && field !== 'notes') continue;
        nextErrors[field] ??= issue.message;
        firstInvalid ??= field;
      }
      setErrors(nextErrors);
      requestAnimationFrame(() => {
        if (firstInvalid) formRef.current?.querySelector<HTMLElement>(`[data-inquiry-field="${firstInvalid}"]`)?.focus();
      });
      return;
    }
    setErrors({})
    setSending(true)
    const data: Inquiry = parsed.data
    try {
      const result = await sendInquiry({ data })
      if (result.ok) return setSent(true)
      // Email service not set up or it failed: hand the visitor a ready-made email instead of losing the lead.
      setFallback(buildMailto(data))
    } catch {
      setFallback(buildMailto(data))
    } finally {
      setSending(false)
    }
  }

  return (
    <DialogPrimitive.Root open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay aria-hidden="true" onClick={onClose} className="fixed inset-0 z-50 bg-ink/60" />
      <div className="pointer-events-none fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <DialogPrimitive.Content aria-labelledby="inquiry-heading" aria-describedby={undefined} onOpenAutoFocus={(event) => { event.preventDefault(); headingRef.current?.focus(); }} onCloseAutoFocus={(event) => { event.preventDefault(); onRestoreFocus(); }} className="pointer-events-auto relative max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-t-[2rem] bg-paper p-6 text-ink sm:rounded-[2rem] sm:p-10">
        <div className="mb-8 flex items-start justify-between gap-6">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-text">Start a project</p>
            <DialogPrimitive.Title asChild><h2 id="inquiry-heading" ref={headingRef} tabIndex={-1} className="text-4xl font-semibold tracking-[-0.05em] focus:outline-none"><span role="status" aria-live="polite">{sent ? 'Inquiry sent.' : 'Tell us what you’re building.'}</span></h2></DialogPrimitive.Title>
          </div>
          <Button variant="site" size="site" aria-label="Close" onClick={onClose} className="flex size-11 shrink-0 items-center justify-center rounded-full border border-ink/20 text-xl">×</Button>
        </div>
        {sent ? (
          <div>
            <p className="max-w-md leading-relaxed text-ink/65">We got your brief and will reply to {email.trim()} within two working days.</p>
            <Button variant="site" size="site" onClick={onClose} className="mt-8 rounded-full bg-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-snow">Close</Button>
          </div>
        ) : (
          <form ref={formRef} noValidate onSubmit={submit} className="flex flex-col gap-7">
            <Chips label="Scope" options={scopes} value={scope} onChange={setScope} multi error={errors.scope} />
            <Chips label="Budget" options={budgets} value={budget} onChange={setBudget} />
            <Chips label="Timeline" options={timelines} value={timeline} onChange={setTimeline} />
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label htmlFor="inquiry-name" className={fieldLabel}>Name</label><input id="inquiry-name" data-inquiry-field="name" placeholder="Your name" maxLength={100} value={name} onChange={(e) => setName(e.target.value)} aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? 'inquiry-name-error' : undefined} className={fieldControl} />{errors.name && <p id="inquiry-name-error" className="mt-2 text-sm font-medium text-brand-text">{errors.name}</p>}</div>
              <div><label htmlFor="inquiry-email" className={fieldLabel}>Email</label><input id="inquiry-email" data-inquiry-field="email" type="email" placeholder="Email" maxLength={255} value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? 'inquiry-email-error' : undefined} className={fieldControl} />{errors.email && <p id="inquiry-email-error" className="mt-2 text-sm font-medium text-brand-text">{errors.email}</p>}</div>
            </div>
            <div><label htmlFor="inquiry-notes" className={fieldLabel}>Project notes</label><textarea id="inquiry-notes" data-inquiry-field="notes" placeholder="A few words about the project" rows={3} maxLength={1000} value={notes} onChange={(e) => setNotes(e.target.value)} aria-invalid={errors.notes ? true : undefined} aria-describedby={errors.notes ? 'inquiry-notes-error' : undefined} className={`resize-none ${fieldControl}`} />{errors.notes && <p id="inquiry-notes-error" className="mt-2 text-sm font-medium text-brand-text">{errors.notes}</p>}</div>
            <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" value={company} onChange={(e) => setCompany(e.target.value)} className="absolute -left-[9999px] size-px opacity-0" />
            {fallback && (
              <div role="alert" className="rounded-2xl border border-ink/15 p-5 text-sm leading-relaxed">
                <p className="text-ink/75">The form couldn’t send your inquiry. Your details are ready in an email instead.</p>
                <a href={fallback} className="mt-3 inline-block font-semibold text-brand-text underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-brand">Open it in your email app</a>
                <p className="mt-2 text-ink/55">Or write to {CONTACT_EMAIL} directly.</p>
              </div>
            )}
            <Button variant="site" size="site" type="submit" disabled={sending} className="flex items-center justify-center gap-3 self-start rounded-full bg-ink px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-snow motion-safe:transition-transform motion-safe:hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0">
              {sending ? 'Sending…' : <>Send inquiry <Arrow /></>}
            </Button>
          </form>
        )}
      </DialogPrimitive.Content>
      </div>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
