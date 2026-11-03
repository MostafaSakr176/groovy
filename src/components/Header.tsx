import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BrandMark, GoldButton } from './Brand'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#rituals', label: 'Rituals' },
  { href: '#specialists', label: 'Specialists' },
  { href: '#ideas', label: 'Booking ideas' },
  { href: '#visit', label: 'Visit' },
]

export function Header({ onBook }: { onBook: () => void }) {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        solid
          ? 'bg-ivory/90 shadow-[0_10px_40px_-24px_rgba(36,28,24,0.45)] backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
        <BrandMark size="sm" light={!solid} />
        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-[0.72rem] tracking-[0.22em] uppercase no-underline transition-colors ${
                solid ? 'text-ink/80 hover:text-espresso' : 'text-ivory/85 hover:text-ivory'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <GoldButton
            onClick={onBook}
            className="rounded-full px-4 py-2 text-[0.62rem] sm:px-5 sm:py-2.5 sm:text-[0.68rem]"
          >
            Book Consultant
          </GoldButton>
          <button
            type="button"
            className={`flex h-10 w-10 items-center justify-center rounded-full border md:hidden ${
              solid ? 'border-gold/30 text-espresso' : 'border-ivory/30 text-ivory'
            }`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5">
              <span className={`block h-px w-4 ${solid ? 'bg-espresso' : 'bg-ivory'}`} />
              <span className={`block h-px w-4 ${solid ? 'bg-espresso' : 'bg-ivory'}`} />
            </span>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-gold/15 bg-ivory/95 md:hidden"
          >
            <div className="flex flex-col gap-4 px-5 py-5">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm tracking-[0.18em] text-espresso uppercase no-underline"
                >
                  {link.label}
                </a>
              ))}
              <GoldButton
                onClick={() => {
                  setOpen(false)
                  onBook()
                }}
                className="rounded-full px-5 py-3 text-[0.68rem]"
              >
                Book Consultant
              </GoldButton>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
