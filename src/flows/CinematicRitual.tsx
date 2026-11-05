import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useBooking } from '../booking'
import { DateChips, FlowFooter, GuestFields, HeldCard, TimeChips } from '../components/pickers'
import { Portrait } from '../components/Brand'
import { SPECIALISTS, TREATMENTS } from '../data'

export function CinematicRitual({
  onClose,
  onSwitch,
}: {
  onClose: () => void
  onSwitch: () => void
}) {
  const booking = useBooking()
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const total = 5
  const progress = done ? 1 : step / (total - 1)

  const nextDisabled =
    (step === 1 && !booking.draft.treatmentId) ||
    (step === 2 && !booking.draft.specialistId) ||
    (step === 3 && (!booking.draft.date || !booking.draft.time)) ||
    (step === 4 &&
      (!booking.draft.guest.name.trim() || !booking.draft.guest.phone.trim()))

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-espresso text-ivory"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="grain opacity-25" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_80%_0%,rgba(193,123,114,0.22),transparent_50%)]" />
      <header className="relative flex shrink-0 items-center justify-between px-6 py-5">
        <p className="kicker">Idea 02 · Cinematic ritual</p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onClose}
            className="text-[0.65rem] tracking-[0.16em] text-ivory/70 uppercase"
          >
            Close
          </button>
        </div>
      </header>
      <div className="relative mx-auto h-px w-full max-w-5xl shrink-0 bg-white/10">
        <motion.div
          className="h-px bg-gold-soft"
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="relative mx-auto min-h-0 w-full max-w-5xl flex-1 overflow-y-auto px-6 py-10">
        {done ? (
          <div className="mx-auto max-w-lg rounded-[2rem] bg-ivory p-8 text-espresso">
            <HeldCard onDone={onClose} />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -28 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
            >
              {step === 0 && (
                <div className="max-w-3xl">
                  <p className="kicker">Step 01</p>
                  <h2 className="serif mt-3 text-5xl leading-tight sm:text-7xl">
                    Begin the ritual.
                  </h2>
                  <p className="mt-5 max-w-md text-ivory/70">
                    One question at a time. No noise. Choose the treatment that
                    your skin is asking for.
                  </p>
                </div>
              )}
              {step === 1 && (
                <>
                  <h2 className="serif mb-8 text-4xl sm:text-6xl">The ritual.</h2>
                  <div className="grid gap-4 md:grid-cols-3">
                    {TREATMENTS.map((item, i) => {
                      const on = booking.draft.treatmentId === item.id
                      return (
                        <motion.button
                          key={item.id}
                          type="button"
                          onClick={() => booking.setTreatment(item.id)}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className={`overflow-hidden rounded-[1.4rem] border text-left ${
                            on ? 'border-gold-soft' : 'border-white/10'
                          }`}
                        >
                          <div className="h-28 overflow-hidden bg-mist">
                            <img
                              src={item.image}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="bg-white/5 p-4">
                            <p className="serif text-2xl">{item.name}</p>
                            <p className="mt-1 text-sm text-ivory/65">{item.blurb}</p>
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <h2 className="serif mb-8 text-4xl sm:text-6xl">Your specialist.</h2>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {SPECIALISTS.map((person) => {
                      const on = booking.draft.specialistId === person.id
                      return (
                        <button
                          key={person.id}
                          type="button"
                          onClick={() => booking.setSpecialist(person.id)}
                          className={`overflow-hidden rounded-[1.5rem] border text-left ${
                            on ? 'border-gold-soft' : 'border-white/10'
                          }`}
                        >
                          <Portrait
                            src={person.portrait}
                            alt=""
                            initials={person.initials}
                            className="aspect-[3/4] w-full object-cover"
                          />
                          <div className="p-3">
                            <p className="serif text-xl">{person.name}</p>
                            <p className="text-xs text-ivory/60">{person.focus}</p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </>
              )}
              {step === 3 && (
                <div className="max-w-2xl">
                  <h2 className="serif mb-6 text-4xl sm:text-6xl">The hour.</h2>
                  <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6">
                    <p className="mb-3 text-xs tracking-[0.2em] text-gold-soft uppercase">
                      Day
                    </p>
                    <DateChips tone="dark" />
                    <p className="mt-6 mb-3 text-xs tracking-[0.2em] text-gold-soft uppercase">
                      Time
                    </p>
                    <TimeChips tone="dark" />
                  </div>
                </div>
              )}
              {step === 4 && (
                <div className="grid items-start gap-10 lg:grid-cols-[1fr_0.8fr]">
                  <div>
                    <h2 className="serif text-4xl sm:text-6xl">Your name.</h2>
                    <p className="mt-3 text-ivory/65">
                      We hold the room under it until you arrive.
                    </p>
                  </div>
                  <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6">
                    <GuestFields
                      tone="dark"
                      formId="ritual-guest"
                      hideCta
                      onSubmit={() => setDone(true)}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      {!done ? (
        <FlowFooter
          tone="dark"
          back={step > 0 ? () => setStep((s) => s - 1) : undefined}
          next={step < 4 ? () => setStep((s) => s + 1) : undefined}
          nextDisabled={nextDisabled}
          nextType={step === 4 ? 'submit' : 'button'}
          form={step === 4 ? 'ritual-guest' : undefined}
          nextLabel={
            step === 0 ? 'Enter the atelier' : step === 4 ? 'Seal the hour' : 'Continue'
          }
        />
      ) : null}
    </motion.div>
  )
}
