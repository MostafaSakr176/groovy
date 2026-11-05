import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useBooking } from '../booking'
import {
  DateChips,
  FlowFooter,
  GuestFields,
  HeldCard,
  TimeChips,
  TreatmentTiles,
} from '../components/pickers'
import { Portrait } from '../components/Brand'
import { SPECIALISTS } from '../data'

export function ConciergeDrawer({
  onClose,
  onSwitch,
}: {
  onClose: () => void
  onSwitch: () => void
}) {
  const booking = useBooking()
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  return (
    <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-espresso/35 backdrop-blur-[2px]"
      />
      <motion.aside
        role="dialog"
        aria-labelledby="concierge-title"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        className="silk-panel absolute inset-y-0 right-0 flex w-full max-w-md flex-col overflow-hidden border-l border-gold/25 shadow-[-30px_0_80px_-40px_rgba(36,28,24,0.45)]"
      >
        <div className="flex items-center justify-between px-6 pt-6">
          <div>
            <p className="kicker">Idea 03 · Concierge</p>
            <h2 id="concierge-title" className="serif text-3xl text-espresso">
              Reception
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/25"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
        {booking.specialist ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-6 mt-5 overflow-hidden rounded-2xl"
          >
            <div className="relative h-36">
              <Portrait
                src={booking.specialist.portrait}
                alt=""
                initials={booking.specialist.initials}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-espresso/70 to-transparent" />
              <p className="absolute bottom-3 left-3 text-sm text-ivory">
                {booking.specialist.name}
                <span className="block text-[0.65rem] tracking-[0.14em] uppercase opacity-80">
                  {booking.specialist.title}
                </span>
              </p>
            </div>
          </motion.div>
        ) : null}
        <div className="scroll-thin mt-4 min-h-0 flex-1 overflow-auto px-6 pb-4">
          {done ? (
            <HeldCard onDone={onClose} />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
              >
                {step === 0 && (
                  <>
                    <p className="serif mb-3 text-xl text-espresso">
                      Who is at the desk for you?
                    </p>
                    <div className="grid gap-2">
                      {SPECIALISTS.map((person) => {
                        const on = booking.draft.specialistId === person.id
                        return (
                          <button
                            key={person.id}
                            type="button"
                            onClick={() => booking.setSpecialist(person.id)}
                            className={`choice flex items-center gap-3 rounded-2xl p-2 ${on ? 'is-on' : ''}`}
                          >
                            <Portrait
                              src={person.portrait}
                              alt=""
                              initials={person.initials}
                              className="h-14 w-12 rounded-xl object-cover"
                            />
                            <span className="text-left">
                              <span className="serif block text-lg">{person.name}</span>
                              <span className="text-xs text-ink/60">{person.focus}</span>
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </>
                )}
                {step === 1 && (
                  <>
                    <p className="serif mb-3 text-xl text-espresso">The ritual</p>
                    <TreatmentTiles dense />
                  </>
                )}
                {step === 2 && (
                  <>
                    <p className="serif mb-3 text-xl text-espresso">Hold a chair</p>
                    <DateChips />
                    <div className="mt-4">
                      <TimeChips />
                    </div>
                  </>
                )}
                {step === 3 && (
                  <>
                    <p className="serif mb-3 text-xl text-espresso">Your details</p>
                    <GuestFields
                      formId="concierge-guest"
                      hideCta
                      onSubmit={() => setDone(true)}
                    />
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        {!done ? (
          <FlowFooter
            back={step > 0 ? () => setStep((s) => s - 1) : undefined}
            next={step < 3 ? () => setStep((s) => s + 1) : undefined}
            nextDisabled={
              (step === 0 && !booking.draft.specialistId) ||
              (step === 1 && !booking.draft.treatmentId) ||
              (step === 2 && (!booking.draft.date || !booking.draft.time)) ||
              (step === 3 &&
                (!booking.draft.guest.name.trim() || !booking.draft.guest.phone.trim()))
            }
            nextType={step === 3 ? 'submit' : 'button'}
            form={step === 3 ? 'concierge-guest' : undefined}
            nextLabel={step === 3 ? 'Ask the desk to hold it' : 'Continue'}
          />
        ) : null}
      </motion.aside>
    </motion.div>
  )
}
