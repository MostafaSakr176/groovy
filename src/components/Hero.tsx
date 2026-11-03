import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { OFFERS } from '../data'
import { GoldButton } from './Brand'

export function Hero({ onBook }: { onBook: () => void }) {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const offer = OFFERS[index]
  const total = OFFERS.length

  function go(step: number) {
    setIndex((current) => (current + step + total) % total)
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % OFFERS.length)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section
      id="top"
      className="relative h-svh min-h-[640px] overflow-hidden bg-espresso text-ivory"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={offer.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0.2 : 0.9,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
        >
          <img
            src={offer.image}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-espresso/80 via-espresso/45 to-espresso/20" />
          <div className="absolute inset-0 bg-linear-to-t from-espresso/70 via-transparent to-espresso/25" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-16 pt-28 lg:justify-center lg:px-8 lg:pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <p className="kicker text-champagne">{offer.kicker}</p>
            <p className="mt-3 inline-block rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-[0.68rem] tracking-[0.18em] text-gold-soft uppercase">
              {offer.save}
            </p>
            <h1 className="serif mt-5 text-5xl leading-[1.08] font-medium sm:text-6xl lg:text-7xl">
              {offer.title}
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ivory/80 sm:text-lg">
              {offer.line}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <GoldButton onClick={onBook} className="rounded-full px-7 py-3.5 text-[0.72rem]">
                Book Consultant
              </GoldButton>
              <a
                href="#about"
                className="text-[0.72rem] tracking-[0.18em] text-ivory/70 uppercase no-underline"
              >
                Meet the atelier
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-between gap-4">
          <div className="flex gap-2" role="tablist" aria-label="Offers">
            {OFFERS.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={item.title}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index ? 'w-10 bg-gold-soft' : 'w-1.5 bg-ivory/30 hover:bg-ivory/55'
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous offer"
              onClick={() => go(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 text-xl text-ivory transition hover:border-gold-soft hover:bg-white/10"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next offer"
              onClick={() => go(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 text-xl text-ivory transition hover:border-gold-soft hover:bg-white/10"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
