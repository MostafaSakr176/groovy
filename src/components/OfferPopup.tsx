import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { currentOffer } from '../data'
import { useLockBody } from '../hooks'
import { GoldButton, GoldRule } from './Brand'

const STORAGE_KEY = 'maison-lumiere-offer-popup'
const SHOW_AFTER_MS = 280
const offer = currentOffer()

function readDismissed() {
  if (!offer) return true
  try {
    return sessionStorage.getItem(STORAGE_KEY) === offer.id
  } catch {
    return false
  }
}

export function OfferPopup({
  hidden = false,
  onBook,
  onOpenChange,
}: {
  hidden?: boolean
  onBook: () => void
  onOpenChange?: (open: boolean) => void
}) {
  const reduceMotion = useReducedMotion()
  const [dismissed, setDismissed] = useState(readDismissed)
  const [ready, setReady] = useState(false)
  const open = Boolean(offer) && ready && !dismissed && !hidden

  useLockBody(open)

  useEffect(() => {
    if (dismissed || !offer) return
    const timer = window.setTimeout(() => setReady(true), SHOW_AFTER_MS)
    return () => window.clearTimeout(timer)
  }, [dismissed])

  useEffect(() => {
    onOpenChange?.(open)
  }, [open, onOpenChange])

  useEffect(() => {
    if (hidden && ready && !dismissed) dismiss()
  }, [hidden, ready, dismissed])

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function persist() {
    if (!offer) return
    try {
      sessionStorage.setItem(STORAGE_KEY, offer.id)
    } catch {
      /* ignore quota / private mode */
    }
  }

  function dismiss() {
    persist()
    setDismissed(true)
  }

  function interested() {
    persist()
    setDismissed(true)
    onBook()
  }

  if (!offer) return null

  const rise = reduceMotion
    ? { duration: 0.2 }
    : { type: 'spring' as const, stiffness: 170, damping: 22 }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="offer-popup"
          className="fixed inset-0 z-50 overflow-y-auto overscroll-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            aria-label="Dismiss offer"
            onClick={dismiss}
            className="fixed inset-0 bg-espresso/55 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <div className="flex min-h-full items-center justify-center px-4 py-8 lg:px-10 lg:py-12">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="offer-popup-title"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={rise}
              className="silk-panel relative max-h-[90svh] w-full max-w-2xl overflow-y-auto overflow-x-hidden rounded-[2rem] border border-gold/30 shadow-[0_40px_90px_-30px_rgba(36,28,24,0.6)] md:max-w-2xl lg:max-w-4xl"
            >
              <div className="grain opacity-20" />
              <button
                type="button"
                onClick={dismiss}
                aria-label="Close offer"
                className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-ivory/95 text-lg text-espresso shadow-[0_8px_20px_-8px_rgba(36,28,24,0.55)] backdrop-blur-sm lg:top-5 lg:right-5 lg:h-11 lg:w-11 lg:text-xl"
              >
                ×
              </button>
              <div className="relative grid sm:grid-cols-[1.05fr_0.95fr] lg:min-h-[36rem]">
                <button
                  type="button"
                  onClick={interested}
                  className="relative h-48 overflow-hidden bg-espresso sm:h-auto sm:min-h-full"
                  aria-label={`View ${offer.title}`}
                >
                  <img
                    src={offer.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-espresso/55 via-transparent to-espresso/20" />
                  <span className="absolute bottom-4 left-4 rounded-full border border-gold/40 bg-espresso/50 px-3 py-1 text-[0.62rem] tracking-[0.2em] text-gold-soft uppercase backdrop-blur-sm lg:bottom-6 lg:left-6 lg:px-4 lg:py-1.5 lg:text-[0.7rem]">
                    {offer.save}
                  </span>
                </button>
                <div className="relative flex flex-col px-6 py-6 sm:px-8 sm:py-8 sm:pr-14 lg:px-12 lg:py-12 lg:pr-16">
                  <p className="kicker">Current offer</p>
                  <p className="mt-3 text-[0.68rem] tracking-[0.22em] text-gold uppercase">
                    {offer.kicker}
                  </p>
                  <h2
                    id="offer-popup-title"
                    className="serif mt-2 text-4xl leading-[1.08] font-medium text-espresso sm:text-5xl lg:mt-4 lg:text-6xl"
                  >
                    {offer.title}
                  </h2>
                  <GoldRule className="my-5 max-w-[7rem] lg:my-7 lg:max-w-36" />
                  <p className="text-sm leading-relaxed text-ink/75 sm:text-base lg:max-w-md lg:text-lg">
                    {offer.line}
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:mt-auto sm:flex-row sm:items-center lg:mt-12">
                    <GoldButton
                      onClick={interested}
                      className="rounded-full px-6 py-3.5 text-[0.68rem] lg:px-8 lg:py-4 lg:text-[0.72rem]"
                    >
                      I am interested
                    </GoldButton>
                    <button
                      type="button"
                      onClick={dismiss}
                      className="rounded-full px-4 py-3 text-[0.68rem] tracking-[0.16em] text-ink/50 uppercase"
                    >
                      Not now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
