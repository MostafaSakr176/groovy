import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { BrandMark, GoldButton, GoldRule } from './Brand'
import { useLockBody } from '../hooks'

const LINKS = [
  { href: '#about', label: 'About', number: '01' },
  { href: '#rituals', label: 'Rituals', number: '02' },
  { href: '#specialists', label: 'Specialists', number: '03' },
  { href: '#ideas', label: 'Booking ideas', number: '04' },
  { href: '#visit', label: 'Visit', number: '05' },
]

export function Header({ onBook }: { onBook: () => void }) {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  useLockBody(open)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function close() {
    setOpen(false)
  }

  const menu = (
    <AnimatePresence>
      {open ? (
        <div className="md:hidden" key="side-nav">
          <motion.button
            type="button"
            aria-label="Close menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-espresso/50 backdrop-blur-sm"
            onClick={close}
          />
          <motion.aside
            role="dialog"
            aria-label="Menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            className="silk-panel fixed inset-y-0 right-0 z-[90] flex h-svh w-[min(86vw,380px)] flex-col border-l border-gold/20 shadow-[-30px_0_80px_-40px_rgba(36,28,24,0.5)]"
          >
            <div className="flex items-start justify-between px-6 pt-7">
              <div>
                <p className="kicker">Menu</p>
                <p className="serif mt-1 text-3xl text-espresso">The atelier</p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/25 text-lg text-espresso"
              >
                ×
              </button>
            </div>
            <GoldRule className="mx-6 my-6 max-w-[8rem]" />
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.06, duration: 0.4 }}
                  className="flex items-baseline gap-4 rounded-2xl px-3 py-3 text-espresso no-underline transition hover:bg-gold/10"
                >
                  <span className="text-[0.65rem] tracking-[0.2em] text-gold uppercase">
                    {link.number}
                  </span>
                  <span className="serif text-3xl">{link.label}</span>
                </motion.a>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42 }}
              className="border-t border-gold/15 px-6 py-5"
            >
              <GoldButton
                onClick={() => {
                  close()
                  onBook()
                }}
                className="w-full rounded-full px-5 py-3.5 text-[0.68rem]"
              >
                Book Consultant
              </GoldButton>
            </motion.div>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  )

  return (
    <>
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
              className="hidden rounded-full px-5 py-2.5 text-[0.68rem] md:inline-flex"
            >
              Book Consultant
            </GoldButton>
            <button
              type="button"
              className={`flex h-10 w-10 items-center justify-center rounded-full border md:hidden ${
                solid ? 'border-gold/30 text-espresso' : 'border-ivory/30 text-ivory'
              }`}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span className="sr-only">Menu</span>
              <span className="relative flex h-3 w-4">
                <span
                  className={`absolute top-0 left-0 block h-px w-4 origin-center transition duration-300 ${
                    solid ? 'bg-espresso' : 'bg-ivory'
                  } ${open ? 'translate-y-[5.5px] rotate-45' : ''}`}
                />
                <span
                  className={`absolute top-[5.5px] left-0 block h-px w-4 transition duration-300 ${
                    solid ? 'bg-espresso' : 'bg-ivory'
                  } ${open ? 'scale-x-0 opacity-0' : ''}`}
                />
                <span
                  className={`absolute bottom-0 left-0 block h-px w-4 origin-center transition duration-300 ${
                    solid ? 'bg-espresso' : 'bg-ivory'
                  } ${open ? '-translate-y-[5.5px] -rotate-45' : ''}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>
      {mounted ? createPortal(menu, document.body) : null}
    </>
  )
}
