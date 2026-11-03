import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { SPECIALISTS } from '../data'
import { GoldRule, Portrait } from './Brand'

function wrapOffset(i: number, active: number, total: number) {
  let offset = i - active
  if (offset > total / 2) offset -= total
  if (offset < -total / 2) offset += total
  return offset
}

export function Specialists() {
  const reduceMotion = useReducedMotion()
  const total = SPECIALISTS.length
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const active = SPECIALISTS[index]

  function go(step: number) {
    setIndex((current) => (current + step + total) % total)
  }

  useEffect(() => {
    if (paused || reduceMotion) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % SPECIALISTS.length)
    }, 4800)
    return () => window.clearInterval(timer)
  }, [paused, reduceMotion])

  return (
    <section id="specialists" className="overflow-hidden py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <GoldRule className="mb-10 max-w-xs" />
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="kicker">The specialists</p>
            <h2 className="serif mt-3 max-w-xl text-4xl text-espresso sm:text-5xl">
              Hands you can trust with your face.
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <CarouselButton label="Previous specialist" onClick={() => go(-1)}>
              ‹
            </CarouselButton>
            <CarouselButton label="Next specialist" onClick={() => go(1)}>
              ›
            </CarouselButton>
          </div>
        </div>
      </div>

      <div
        className="relative mx-auto mt-8 max-w-6xl px-5 lg:px-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <motion.div
          className="relative h-[400px] cursor-grab touch-pan-y active:cursor-grabbing sm:h-[450px]"
          style={{ perspective: 1400 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.16}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) go(1)
            else if (info.offset.x > 60) go(-1)
          }}
        >
          {SPECIALISTS.map((person, i) => {
            const offset = wrapOffset(i, index, total)
            const isActive = offset === 0
            const hidden = Math.abs(offset) > 1
            return (
              <motion.article
                key={person.id}
                className="absolute top-0 left-1/2 w-[min(78vw,300px)] origin-center sm:w-[320px]"
                style={{ transformStyle: 'preserve-3d' }}
                initial={false}
                animate={{
                  x: `calc(-50% + ${offset * 72}%)`,
                  scale: isActive ? 1 : 0.78,
                  opacity: hidden ? 0 : isActive ? 1 : 0.45,
                  zIndex: 10 - Math.abs(offset),
                  rotateY: reduceMotion ? 0 : offset * -12,
                  filter: isActive ? 'saturate(1)' : 'saturate(0.72)',
                }}
                transition={
                  reduceMotion
                    ? { duration: 0.2 }
                    : { type: 'spring', stiffness: 140, damping: 22 }
                }
                onClick={() => setIndex(i)}
              >
                <div
                  className={`relative overflow-hidden rounded-[1.8rem] bg-mist ${
                    isActive ? 'ring-1 ring-gold/50' : ''
                  }`}
                >
                  <Portrait
                    src={person.portrait}
                    alt={person.name}
                    initials={person.initials}
                    className="pointer-events-none aspect-[3/4] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-espresso/70 via-espresso/10 to-transparent" />
                  <p className="absolute bottom-4 left-4 text-[0.65rem] tracking-[0.18em] text-ivory uppercase">
                    {person.title}
                  </p>
                </div>
              </motion.article>
            )
          })}
        </motion.div>

        <div className="min-h-[4rem] text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <h3 className="serif text-3xl text-espresso">{active.name}</h3>
              <p className="mt-1 text-sm text-ink/70">{active.focus}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2" role="tablist" aria-label="Specialists">
          {SPECIALISTS.map((person, i) => (
            <button
              key={person.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={person.name}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? 'w-8 bg-gold' : 'w-1.5 bg-gold/25 hover:bg-gold/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function CarouselButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: string
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-xl leading-none text-espresso transition hover:border-gold hover:bg-champagne/20"
    >
      {children}
    </button>
  )
}
