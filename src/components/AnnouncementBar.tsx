import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useLayoutEffect, useState } from 'react'
import { ANNOUNCEMENTS, type Announcement, type AnnouncementKind } from '../data'

const STORAGE_KEY = 'maison-lumiere-announce'
const BAR_HEIGHT = '2.5rem'
const ROTATE_MS = 4500
const SIGNATURE = ANNOUNCEMENTS.map((item) => item.id).join('|')

const KIND: Record<AnnouncementKind, { label: string; className: string }> = {
  offer: { label: 'Offer', className: 'text-gold-soft' },
  notice: { label: 'Notice', className: 'text-champagne' },
  alert: { label: 'Alert', className: 'text-blush' },
}

function readDismissed() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === SIGNATURE
  } catch {
    return false
  }
}

export function AnnouncementBar({ onBook }: { onBook: () => void }) {
  const reduceMotion = useReducedMotion()
  const [dismissed, setDismissed] = useState(readDismissed)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const visible = ANNOUNCEMENTS.length > 0 && !dismissed

  useLayoutEffect(() => {
    document.documentElement.style.setProperty(
      '--announce-h',
      visible ? BAR_HEIGHT : '0px',
    )
    return () => {
      document.documentElement.style.setProperty('--announce-h', '0px')
    }
  }, [visible])

  useEffect(() => {
    if (!visible || paused || !reduceMotion || ANNOUNCEMENTS.length < 2) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % ANNOUNCEMENTS.length)
    }, ROTATE_MS)
    return () => window.clearInterval(timer)
  }, [visible, paused, reduceMotion])

  function dismiss() {
    try {
      sessionStorage.setItem(STORAGE_KEY, SIGNATURE)
    } catch {
      /* ignore quota / private mode */
    }
    setDismissed(true)
  }

  function activate(item: Announcement) {
    if (item.action === 'book') onBook()
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.aside
          key="announce"
          role="region"
          aria-label="Offers and announcements"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: BAR_HEIGHT, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-0 z-45 overflow-hidden bg-[#1a1512] text-ivory"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setPaused(false)
            }
          }}
        >
          <div className="relative flex h-10 items-center">
            {reduceMotion ? (
              <StaticReel index={index} onActivate={activate} />
            ) : (
              <Marquee paused={paused} onActivate={activate} />
            )}
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-20 items-center justify-end bg-linear-to-l from-espresso via-espresso/85 to-transparent pr-2 sm:w-24 sm:pr-3">
              <button
                type="button"
                onClick={dismiss}
                aria-label="Dismiss announcements"
                className="pointer-events-auto flex h-7 w-7 items-center justify-center rounded-full text-lg leading-none text-ivory/70 transition hover:bg-ivory/10 hover:text-ivory"
              >
                ×
              </button>
            </div>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  )
}

function Marquee({
  paused,
  onActivate,
}: {
  paused: boolean
  onActivate: (item: Announcement) => void
}) {
  const unit = [...ANNOUNCEMENTS, ...ANNOUNCEMENTS, ...ANNOUNCEMENTS]

  return (
    <div
      className="flex min-w-0 flex-1 overflow-hidden"
      style={{
        maskImage:
          'linear-gradient(to right, black 0%, black calc(100% - 5.5rem), transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, black 0%, black calc(100% - 5.5rem), transparent 100%)',
      }}
    >
      <div
        className="announce-marquee flex w-max shrink-0 flex-nowrap"
        style={{ animationPlayState: paused ? 'paused' : 'running' }}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 flex-nowrap items-center whitespace-nowrap"
          >
            {unit.map((item, i) => (
              <li
                key={`${copy}-${item.id}-${i}`}
                className="flex shrink-0 items-center"
              >
                <Diamond />
                <AnnouncementCopy
                  item={item}
                  tabIndex={copy === 0 && i < ANNOUNCEMENTS.length ? 0 : -1}
                  onActivate={onActivate}
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

function StaticReel({
  index,
  onActivate,
}: {
  index: number
  onActivate: (item: Announcement) => void
}) {
  const item = ANNOUNCEMENTS[index]
  if (!item) return null

  return (
    <div className="flex min-w-0 flex-1 justify-center px-10">
      <AnnouncementCopy item={item} tabIndex={0} onActivate={onActivate} />
    </div>
  )
}

function AnnouncementCopy({
  item,
  tabIndex,
  onActivate,
}: {
  item: Announcement
  tabIndex: number
  onActivate: (item: Announcement) => void
}) {
  const kind = KIND[item.kind]
  const cta = item.action === 'book' ? 'Book' : item.href ? 'See' : null
  const className =
    'flex shrink-0 items-center gap-3 whitespace-nowrap px-5 py-1 text-left no-underline'

  const inner = (
    <>
      <span
        className={`text-[0.62rem] tracking-[0.28em] uppercase ${kind.className}`}
      >
        {kind.label}
      </span>
      <span className="text-[0.72rem] tracking-[0.04em] text-ivory">
        {item.text}
      </span>
      {cta ? (
        <span className="text-[0.62rem] tracking-[0.2em] text-gold-soft uppercase">
          {cta} →
        </span>
      ) : null}
    </>
  )

  if (item.action === 'book') {
    return (
      <button
        type="button"
        tabIndex={tabIndex}
        onClick={() => onActivate(item)}
        className={`${className} cursor-pointer bg-transparent`}
      >
        {inner}
      </button>
    )
  }

  if (item.href) {
    return (
      <a href={item.href} tabIndex={tabIndex} className={className}>
        {inner}
      </a>
    )
  }

  return <span className={className}>{inner}</span>
}

function Diamond() {
  return (
    <span
      aria-hidden="true"
      className="mx-1 h-1 w-1 shrink-0 rotate-45 bg-gold/70"
    />
  )
}
