import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useBooking } from '../booking'
import {
  DateChips,
  FlowChrome,
  FlowFooter,
  GuestFields,
  HeldCard,
  SpecialistTiles,
  TimeChips,
  TreatmentTiles,
} from '../components/pickers'

const STEPS = ['Ritual', 'Specialist', 'Hour', 'Your name']

export function VelvetModal({
  onClose,
  onSwitch,
}: {
  onClose: () => void
  onSwitch: () => void
}) {
  const booking = useBooking()
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  const nextDisabled =
    (step === 0 && !booking.draft.treatmentId) ||
    (step === 1 && !booking.draft.specialistId) ||
    (step === 2 && (!booking.draft.date || !booking.draft.time)) ||
    (step === 3 &&
      (!booking.draft.guest.name.trim() || !booking.draft.guest.phone.trim()))

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="fixed inset-0 bg-espresso/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <div className="flex min-h-full items-center justify-center px-4 py-8">
        <motion.div
          role="dialog"
          aria-labelledby="velvet-title"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ type: 'spring', stiffness: 170, damping: 20 }}
          className="silk-panel relative flex max-h-[90svh] w-full max-w-xl flex-col overflow-hidden rounded-[2rem] border border-gold/30 shadow-[0_40px_90px_-30px_rgba(36,28,24,0.6)]"
        >
          <div className="pointer-events-none absolute inset-3 rounded-[1.6rem] border border-gold/15" />
          <div className="relative shrink-0 px-6 pt-6 sm:px-8 sm:pt-8">
            <FlowChrome
              kicker="Idea 01 · Velvet overlay"
              title="A private salon"
              onClose={onClose}
              onSwitch={onSwitch}
            />
            {!done ? (
              <div className="mb-4 flex gap-2">
                {STEPS.map((label, i) => (
                  <div key={label} className="flex-1">
                    <div className={`h-px ${i <= step ? 'bg-gold' : 'bg-gold/20'}`} />
                    <p
                      className={`mt-2 text-[0.6rem] tracking-[0.16em] uppercase ${
                        i === step ? 'text-gold' : 'text-ink/40'
                      }`}
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <div className="relative min-h-0 flex-1 overflow-y-auto px-6 pb-4 sm:px-8">
            {!done ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.35 }}
                >
                  {step === 0 && (
                    <>
                      <p id="velvet-title" className="serif mb-4 text-2xl text-espresso">
                        Which ritual calls you?
                      </p>
                      <TreatmentTiles />
                    </>
                  )}
                  {step === 1 && (
                    <>
                      <p className="serif mb-4 text-2xl text-espresso">
                        Who should sit with you?
                      </p>
                      <SpecialistTiles />
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <p className="serif mb-4 text-2xl text-espresso">
                        Choose a quiet hour.
                      </p>
                      <p className="mb-2 text-xs tracking-[0.16em] text-gold uppercase">
                        Day
                      </p>
                      <DateChips />
                      <p className="mt-5 mb-2 text-xs tracking-[0.16em] text-gold uppercase">
                        Time
                      </p>
                      <TimeChips />
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <p className="serif mb-4 text-2xl text-espresso">
                        Leave your name with us.
                      </p>
                      <GuestFields
                        formId="velvet-guest"
                        hideCta
                        onSubmit={() => setDone(true)}
                      />
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            ) : (
              <HeldCard onDone={onClose} />
            )}
          </div>
          {!done ? (
            <FlowFooter
              back={step > 0 ? () => setStep((s) => s - 1) : undefined}
              next={step < 3 ? () => setStep((s) => s + 1) : undefined}
              nextDisabled={nextDisabled}
              nextType={step === 3 ? 'submit' : 'button'}
              form={step === 3 ? 'velvet-guest' : undefined}
              nextLabel={step === 3 ? 'Hold this hour' : 'Continue'}
            />
          ) : null}
        </motion.div>
      </div>
    </motion.div>
  )
}
