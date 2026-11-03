import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useBooking } from '../booking'
import {
  FlowChrome,
  GuestFields,
  HeldCard,
  SpecialistTiles,
  TimeChips,
  TreatmentTiles,
} from '../components/pickers'
import { clinicOpen, isoDay, monthGrid } from '../data'

const WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function AtelierCalendar({
  onClose,
  onSwitch,
}: {
  onClose: () => void
  onSwitch: () => void
}) {
  const booking = useBooking()
  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const cells = monthGrid(cursor.getFullYear(), cursor.getMonth())
  const label = cursor.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain px-4 py-6 lg:flex lg:items-center lg:justify-center lg:overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        className="fixed inset-0 bg-cream/70 backdrop-blur-md"
        aria-label="Close"
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        className="relative mx-auto grid w-full max-w-5xl overflow-x-hidden rounded-[2rem] border border-gold/20 bg-ivory shadow-[0_40px_80px_-36px_rgba(36,28,24,0.45)] lg:max-h-[94svh] lg:grid-cols-[1.1fr_0.9fr] lg:overflow-hidden"
      >
        <div className="min-h-0 border-b border-gold/15 p-6 sm:p-8 lg:overflow-y-auto lg:border-r lg:border-b-0">
          <FlowChrome
            kicker="Idea 04 · Atelier calendar"
            title="The day leads."
            onClose={onClose}
            onSwitch={onSwitch}
          />
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() =>
                setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))
              }
              className="text-[0.7rem] tracking-[0.16em] uppercase"
            >
              Prev
            </button>
            <AnimatePresence mode="wait">
              <motion.p
                key={label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="serif text-2xl text-espresso"
              >
                {label}
              </motion.p>
            </AnimatePresence>
            <button
              type="button"
              onClick={() =>
                setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))
              }
              className="text-[0.7rem] tracking-[0.16em] uppercase"
            >
              Next
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[0.62rem] tracking-[0.14em] text-gold uppercase">
            {WEEK.map((d) => (
              <span key={d} className="py-2">
                {d}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((cell, i) => {
              if (!cell) return <span key={`e-${i}`} />
              const iso = isoDay(cell)
              const open = clinicOpen(cell) && cell >= today
              const on = booking.draft.date === iso
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={!open}
                  onClick={() => booking.setDate(iso)}
                  className={`aspect-square rounded-2xl text-sm transition ${
                    on
                      ? 'bg-gold text-espresso'
                      : open
                        ? 'hover:bg-blush/40'
                        : 'text-ink/25'
                  }`}
                >
                  {cell.getDate()}
                </button>
              )
            })}
          </div>
          <div className="mt-6">
            <p className="mb-2 text-xs tracking-[0.16em] text-gold uppercase">Hours</p>
            <TimeChips />
          </div>
        </div>
        <div className="scroll-thin min-h-0 bg-cream/40 p-6 pb-10 sm:p-8 lg:overflow-auto">
          {done ? (
            <HeldCard onDone={onClose} />
          ) : (
            <>
              <p className="kicker">Then the ritual</p>
              <div className="mt-4 flex gap-2">
                {['Treatment', 'Specialist', 'Name'].map((label, i) => (
                  <span
                    key={label}
                    className={`rounded-full px-3 py-1 text-[0.62rem] tracking-[0.14em] uppercase ${
                      i === step ? 'bg-gold/20 text-espresso' : 'text-ink/40'
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-5"
                >
                  {step === 0 && <TreatmentTiles dense />}
                  {step === 1 && <SpecialistTiles />}
                  {step === 2 && (
                    <GuestFields onSubmit={() => setDone(true)} cta="Hold the day" />
                  )}
                </motion.div>
              </AnimatePresence>
              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className="text-[0.68rem] tracking-[0.16em] text-ink/50 uppercase"
                >
                  Back
                </button>
                {step < 2 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s + 1)}
                    disabled={
                      !booking.draft.date ||
                      !booking.draft.time ||
                      (step === 0 && !booking.draft.treatmentId) ||
                      (step === 1 && !booking.draft.specialistId)
                    }
                    className="gold-cta rounded-full px-5 py-2.5 text-[0.68rem] disabled:opacity-40"
                  >
                    <span className="relative z-10">Continue</span>
                  </button>
                ) : null}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
