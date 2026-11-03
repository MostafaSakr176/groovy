import { motion } from 'framer-motion'
import type { FormEvent } from 'react'
import { useBooking } from '../booking'
import { Portrait } from './Brand'
import {
  SPECIALISTS,
  TIMES,
  TREATMENTS,
  formatDay,
  isoDay,
  slotTaken,
  upcomingOpenDays,
} from '../data'

export function TreatmentTiles({
  dense = false,
}: {
  dense?: boolean
}) {
  const { draft, setTreatment } = useBooking()
  return (
    <div className={`grid gap-3 ${dense ? 'sm:grid-cols-2' : 'sm:grid-cols-2'}`}>
      {TREATMENTS.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => setTreatment(item.id)}
          className={`choice rounded-2xl p-4 ${draft.treatmentId === item.id ? 'is-on' : ''}`}
        >
          <div className="mb-3 h-16 overflow-hidden rounded-xl bg-mist">
            <img src={item.image} alt="" className="h-full w-full object-cover" />
          </div>
          <p className="kicker">{item.ritual}</p>
          <p className="serif mt-1 text-xl text-espresso">{item.name}</p>
          <p className="mt-1 text-xs text-ink/65">
            {item.duration} · from {item.from}
          </p>
        </button>
      ))}
    </div>
  )
}

export function SpecialistTiles({ portraits = true }: { portraits?: boolean }) {
  const { draft, setSpecialist } = useBooking()
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {SPECIALISTS.map((person) => {
        const on = draft.specialistId === person.id
        return (
          <button
            key={person.id}
            type="button"
            onClick={() => setSpecialist(person.id)}
            className={`choice flex gap-3 rounded-2xl p-3 ${on ? 'is-on' : ''}`}
          >
            {portraits ? (
              <Portrait
                src={person.portrait}
                alt=""
                initials={person.initials}
                className="h-16 w-14 rounded-xl object-cover"
              />
            ) : (
              <span
                className="flex h-16 w-14 items-center justify-center rounded-xl text-sm tracking-[0.12em] text-ivory"
                style={{ background: person.tone }}
              >
                {person.initials}
              </span>
            )}
            <span className="text-left">
              <span className="serif block text-lg text-espresso">{person.name}</span>
              <span className="mt-0.5 block text-xs text-ink/65">{person.title}</span>
              <span className="mt-1 block text-[0.7rem] text-gold">{person.focus}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

type ChipTone = 'light' | 'dark'

function chipClass(tone: ChipTone) {
  return tone === 'dark' ? 'choice-dark' : 'choice'
}

export function DateChips({ tone = 'light' }: { tone?: ChipTone }) {
  const { draft, setDate } = useBooking()
  const days = upcomingOpenDays(10)
  return (
    <div className="flex flex-wrap gap-2">
      {days.map((day) => {
        const iso = isoDay(day)
        const on = draft.date === iso
        return (
          <button
            key={iso}
            type="button"
            onClick={() => setDate(iso)}
            className={`${chipClass(tone)} rounded-full px-3.5 py-2 text-sm ${on ? 'is-on' : ''}`}
          >
            {formatDay(day)}
          </button>
        )
      })}
    </div>
  )
}

export function TimeChips({ tone = 'light' }: { tone?: ChipTone }) {
  const { draft, setTime } = useBooking()
  if (!draft.date) {
    return (
      <p className={`text-sm ${tone === 'dark' ? 'text-ivory/55' : 'text-ink/60'}`}>
        Choose a day first.
      </p>
    )
  }
  return (
    <div className="flex flex-wrap gap-2">
      {TIMES.map((time) => {
        const taken = slotTaken(draft.date!, time)
        const on = draft.time === time
        return (
          <button
            key={time}
            type="button"
            disabled={taken}
            onClick={() => setTime(time)}
            className={`${chipClass(tone)} rounded-full px-4 py-2 text-sm ${
              tone === 'light' ? 'disabled:cursor-not-allowed disabled:opacity-35' : ''
            } ${on ? 'is-on' : ''}`}
          >
            {taken ? `${time} held` : time}
          </button>
        )
      })}
    </div>
  )
}

export function GuestFields({
  onSubmit,
  cta = 'Hold this hour',
  tone = 'light',
  hideCta = false,
  formId,
}: {
  onSubmit: () => void
  cta?: string
  tone?: ChipTone
  hideCta?: boolean
  formId?: string
}) {
  const { draft, setGuest } = useBooking()
  const field = tone === 'dark' ? 'field-dark' : 'field'
  const label = tone === 'dark' ? 'text-gold-soft' : 'text-gold'

  function handle(e: FormEvent) {
    e.preventDefault()
    if (!draft.guest.name.trim() || !draft.guest.phone.trim()) return
    onSubmit()
  }

  return (
    <form id={formId} onSubmit={handle} className="grid gap-3">
      <label className={`grid gap-1.5 text-xs tracking-[0.16em] uppercase ${label}`}>
        Full name
        <input
          className={`${field} rounded-xl text-base tracking-normal normal-case`}
          value={draft.guest.name}
          onChange={(e) => setGuest({ name: e.target.value })}
          placeholder="Your name"
          required
        />
      </label>
      <label className={`grid gap-1.5 text-xs tracking-[0.16em] uppercase ${label}`}>
        Mobile
        <input
          className={`${field} rounded-xl text-base tracking-normal normal-case`}
          value={draft.guest.phone}
          onChange={(e) => setGuest({ phone: e.target.value })}
          placeholder="+20 …"
          required
        />
      </label>
      <label className={`grid gap-1.5 text-xs tracking-[0.16em] uppercase ${label}`}>
        Email
        <input
          className={`${field} rounded-xl text-base tracking-normal normal-case`}
          type="email"
          value={draft.guest.email}
          onChange={(e) => setGuest({ email: e.target.value })}
          placeholder="Optional"
        />
      </label>
      <label className={`grid gap-1.5 text-xs tracking-[0.16em] uppercase ${label}`}>
        A note for your specialist
        <textarea
          className={`${field} min-h-20 rounded-xl text-base tracking-normal normal-case`}
          value={draft.guest.note}
          onChange={(e) => setGuest({ note: e.target.value })}
          placeholder="Skin concerns, occasion, preferences"
        />
      </label>
      {hideCta ? null : (
        <button type="submit" className="gold-cta mt-2 rounded-full px-6 py-3 text-[0.72rem]">
          <span className="relative z-10">{cta}</span>
        </button>
      )}
    </form>
  )
}

export function HeldCard({ onDone }: { onDone: () => void }) {
  const { draft, treatment, specialist } = useBooking()
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 140, damping: 14 }}
        className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40"
      >
        <span className="h-2.5 w-2.5 rotate-45 bg-gold" />
      </motion.div>
      <p className="kicker">Reservation held</p>
      <h3 className="serif mt-2 text-3xl text-espresso">We have a quiet hour for you.</h3>
      <p className="mt-4 text-sm leading-relaxed text-ink/75">
        {treatment?.name} with {specialist?.name}
        <br />
        {draft.date} · {draft.time}
        <br />
        {draft.guest.name}
      </p>
      <p className="mt-3 text-xs text-ink/55">
        Concierge will confirm by WhatsApp within the hour.
      </p>
      <button
        type="button"
        onClick={onDone}
        className="ghost-cta mt-6 rounded-full px-6 py-2.5 text-[0.68rem]"
      >
        Return to the atelier
      </button>
    </motion.div>
  )
}

export function FlowChrome({
  title,
  kicker,
  onClose,
  onSwitch,
  light = false,
}: {
  title: string
  kicker: string
  onClose: () => void
  onSwitch: () => void
  light?: boolean
}) {
  const ink = light ? 'text-ivory' : 'text-espresso'
  const mute = light ? 'text-ivory/60' : 'text-ink/50'
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <p className="kicker">{kicker}</p>
        <h2 className={`serif mt-1 text-3xl ${ink}`}>{title}</h2>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onSwitch}
          className={`text-[0.65rem] tracking-[0.16em] uppercase ${mute}`}
        >
          Other ideas
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={`flex h-9 w-9 items-center justify-center rounded-full border ${
            light ? 'border-white/20 text-ivory' : 'border-gold/25 text-espresso'
          }`}
        >
          ×
        </button>
      </div>
    </div>
  )
}

export function FlowFooter({
  back,
  next,
  nextLabel = 'Continue',
  nextDisabled,
  nextType = 'button',
  form,
  tone = 'light',
}: {
  back?: () => void
  next?: () => void
  nextLabel?: string
  nextDisabled?: boolean
  nextType?: 'button' | 'submit'
  form?: string
  tone?: ChipTone
}) {
  const bar =
    tone === 'dark'
      ? 'border-white/10 bg-espresso/95'
      : 'border-gold/15 bg-ivory/95'
  const backClass =
    tone === 'dark'
      ? 'text-[0.7rem] tracking-[0.18em] text-ivory/50 uppercase'
      : 'text-[0.7rem] tracking-[0.18em] text-ink/55 uppercase'

  return (
    <div
      className={`flex shrink-0 items-center justify-between gap-3 border-t px-6 py-4 backdrop-blur-md ${bar}`}
    >
      {back ? (
        <button type="button" onClick={back} className={backClass}>
          Back
        </button>
      ) : (
        <span />
      )}
      {next || form ? (
        <button
          type={nextType}
          form={form}
          onClick={nextType === 'button' ? next : undefined}
          disabled={nextDisabled}
          className="gold-cta rounded-full px-6 py-2.5 text-[0.7rem] disabled:opacity-40"
        >
          <span className="relative z-10">{nextLabel}</span>
        </button>
      ) : null}
    </div>
  )
}
