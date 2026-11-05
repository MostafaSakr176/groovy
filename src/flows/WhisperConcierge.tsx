import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useBooking } from '../booking'
import { HeldCard } from '../components/pickers'
import {
  CLINIC,
  SPECIALISTS,
  TIMES,
  TREATMENTS,
  formatDay,
  isoDay,
  slotTaken,
  upcomingOpenDays,
} from '../data'

type Msg = { id: string; from: 'her' | 'you'; text: string }

const DAYS = upcomingOpenDays(6)

export function WhisperConcierge({
  onClose,
  onSwitch,
}: {
  onClose: () => void
  onSwitch: () => void
}) {
  const booking = useBooking()
  const [phase, setPhase] = useState(0)
  const [typing, setTyping] = useState(true)
  const [messages, setMessages] = useState<Msg[]>([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [done, setDone] = useState(false)
  const scroller = useRef<HTMLDivElement>(null)
  const idRef = useRef(0)

  function push(from: Msg['from'], text: string) {
    idRef.current += 1
    setMessages((prev) => [...prev, { id: String(idRef.current), from, text }])
  }

  useEffect(() => {
    const t = window.setTimeout(() => {
      setTyping(false)
      push('her', `Welcome to ${CLINIC.name}. What would you like to sit for?`)
    }, 650)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing, phase])

  function chooseTreatment(id: string, name: string) {
    booking.setTreatment(id)
    push('you', name)
    setTyping(true)
    window.setTimeout(() => {
      push('her', 'A beautiful choice. Who would you like beside you?')
      setTyping(false)
      setPhase(1)
    }, 650)
  }

  function chooseSpecialist(id: string, name: string) {
    booking.setSpecialist(id)
    push('you', name)
    setTyping(true)
    window.setTimeout(() => {
      push('her', 'When would you like to visit the atelier?')
      setTyping(false)
      setPhase(2)
    }, 650)
  }

  function chooseDay(iso: string, label: string) {
    booking.setDate(iso)
    push('you', label)
    setTyping(true)
    window.setTimeout(() => {
      push('her', 'And which hour feels unhurried?')
      setTyping(false)
      setPhase(3)
    }, 550)
  }

  function chooseTime(time: string) {
    booking.setTime(time)
    push('you', time)
    setTyping(true)
    window.setTimeout(() => {
      push('her', 'May I take your name and a mobile, to hold the room?')
      setTyping(false)
      setPhase(4)
    }, 550)
  }

  function submitGuest() {
    if (!name.trim() || !phone.trim()) return
    booking.setGuest({ name, phone })
    push('you', name)
    setDone(true)
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        className="absolute inset-0 bg-espresso/40 backdrop-blur-sm"
        aria-label="Close"
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ type: 'spring', stiffness: 140, damping: 18 }}
        className="silk-panel relative flex h-[min(720px,92svh)] w-full max-w-md flex-col overflow-hidden rounded-[1.8rem] border border-gold/25 shadow-[0_30px_70px_-28px_rgba(36,28,24,0.5)]"
      >
        <header className="flex items-center justify-between border-b border-gold/15 px-5 py-4">
          <div>
            <p className="kicker">Idea 05 · Whisper</p>
            <p className="serif text-2xl text-espresso">Concierge</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onSwitch}
              className="text-[0.62rem] tracking-[0.14em] text-ink/45 uppercase"
            >
              Ideas
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/25"
            >
              ×
            </button>
          </div>
        </header>
        <div ref={scroller} className="scroll-thin flex-1 space-y-3 overflow-auto px-4 py-5">
          {done ? (
            <div className="px-2 py-6">
              <HeldCard onDone={onClose} />
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.from === 'her'
                      ? 'bg-white/70 text-espresso'
                      : 'ml-auto bg-gold/25 text-espresso'
                  }`}
                >
                  {msg.from === 'her' ? (
                    <span className="mb-1 block text-[0.6rem] tracking-[0.18em] text-gold uppercase">
                      Concierge
                    </span>
                  ) : null}
                  {msg.text}
                </motion.div>
              ))}
              {typing ? <Typing /> : null}
            </>
          )}
        </div>
        {!done && !typing ? (
          <div className="border-t border-gold/15 px-4 py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {phase === 0 && (
                  <ChipRow>
                    {TREATMENTS.map((item) => (
                      <Chip
                        key={item.id}
                        onClick={() => chooseTreatment(item.id, item.name)}
                      >
                        {item.name}
                      </Chip>
                    ))}
                  </ChipRow>
                )}
                {phase === 1 && (
                  <ChipRow>
                    {SPECIALISTS.map((person) => (
                      <Chip
                        key={person.id}
                        onClick={() => chooseSpecialist(person.id, person.name)}
                      >
                        {person.name.split(' ').slice(-1)[0]} · {person.title}
                      </Chip>
                    ))}
                  </ChipRow>
                )}
                {phase === 2 && (
                  <ChipRow>
                    {DAYS.map((day) => {
                      const iso = isoDay(day)
                      return (
                        <Chip key={iso} onClick={() => chooseDay(iso, formatDay(day))}>
                          {formatDay(day)}
                        </Chip>
                      )
                    })}
                  </ChipRow>
                )}
                {phase === 3 && booking.draft.date && (
                  <ChipRow>
                    {TIMES.filter((time) => !slotTaken(booking.draft.date!, time)).map(
                      (time) => (
                        <Chip key={time} onClick={() => chooseTime(time)}>
                          {time}
                        </Chip>
                      ),
                    )}
                  </ChipRow>
                )}
                {phase === 4 && (
                  <form
                    className="grid gap-2"
                    onSubmit={(e) => {
                      e.preventDefault()
                      submitGuest()
                    }}
                  >
                    <input
                      className="field rounded-xl"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <input
                      className="field rounded-xl"
                      placeholder="Mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                    <button type="submit" className="gold-cta rounded-full px-5 py-2.5 text-[0.68rem]">
                      <span className="relative z-10">Hold this hour</span>
                    </button>
                  </form>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        ) : null}
      </motion.div>
    </motion.div>
  )
}

function ChipRow({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-2">{children}</div>
}

function Chip({
  children,
  onClick,
}: {
  children: ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="choice rounded-full px-3.5 py-2 text-sm"
    >
      {children}
    </button>
  )
}

function Typing() {
  return (
    <div className="flex w-fit items-center gap-1 rounded-2xl bg-white/70 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-gold"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.12 }}
        />
      ))}
    </div>
  )
}
