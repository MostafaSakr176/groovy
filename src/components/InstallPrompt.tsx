import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { GoldButton } from './Brand'

const STORAGE_KEY = 'maison-lumiere-install-dismissed'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

type Help = 'ios' | 'android' | 'desktop'

function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches ||
    ('standalone' in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone))
  )
}

function isIos() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent)
}

function isAndroid() {
  return /android/i.test(navigator.userAgent)
}

function isMobile() {
  return (
    isIos() ||
    isAndroid() ||
    window.matchMedia('(max-width: 768px)').matches
  )
}

export function InstallPrompt({ hidden = false }: { hidden?: boolean }) {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null)
  const [open, setOpen] = useState(false)
  const [help, setHelp] = useState<Help | null>(null)
  const mobile = isMobile()

  useEffect(() => {
    if (isStandalone() || localStorage.getItem(STORAGE_KEY) === '1') {
      return
    }

    function onPrompt(event: Event) {
      event.preventDefault()
      setDeferred(event as BeforeInstallPromptEvent)
    }

    window.addEventListener('beforeinstallprompt', onPrompt)

    const timer = window.setTimeout(() => setOpen(true), 1800)

    function onInstalled() {
      setOpen(false)
      setDeferred(null)
    }
    window.addEventListener('appinstalled', onInstalled)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, '1')
    setOpen(false)
    setHelp(null)
  }

  async function install() {
    if (deferred) {
      await deferred.prompt()
      const choice = await deferred.userChoice
      if (choice.outcome === 'accepted') {
        setOpen(false)
        localStorage.setItem(STORAGE_KEY, '1')
      }
      setDeferred(null)
      return
    }
    setHelp(isIos() ? 'ios' : isAndroid() || mobile ? 'android' : 'desktop')
  }

  const visible = open && !hidden && !isStandalone()

  return (
    <AnimatePresence>
      {visible ? (
        <motion.aside
          role="dialog"
          aria-label="Install DERMA CLINICS"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 160, damping: 20 }}
          className="silk-panel fixed inset-x-3 bottom-3 z-30 overflow-hidden rounded-[1.4rem] border border-gold/25 p-4 shadow-[0_24px_50px_-24px_rgba(36,28,24,0.55)] sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[380px]"
        >
          <div className="flex items-start gap-3">
            <img
              src="/apple-touch-icon.png"
              alt=""
              className="h-12 w-12 shrink-0 rounded-2xl"
            />
            <div className="min-w-0 flex-1">
              <p className="kicker">{mobile ? 'On your phone' : 'On your computer'}</p>
              <p className="serif text-xl text-espresso">Keep DERMA in your apps.</p>
              <p className="mt-1 text-sm text-ink/70">
                {mobile
                  ? 'Install DERMA CLINICS to open it from your home screen, like a native app.'
                  : 'Install DERMA CLINICS on this computer and open it from your desktop or dock, like a native app.'}
              </p>
            </div>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/25 text-espresso"
            >
              ×
            </button>
          </div>
          {help === 'ios' ? (
            <ol className="mt-4 space-y-2 text-sm text-ink/80">
              <li>1. Tap the Share button in Safari.</li>
              <li>2. Choose Add to Home Screen.</li>
              <li>3. Tap Add — DERMA CLINICS appears with your other apps.</li>
            </ol>
          ) : null}
          {help === 'android' ? (
            <p className="mt-4 text-sm text-ink/80">
              Open the browser menu and tap Install app or Add to Home screen.
            </p>
          ) : null}
          {help === 'desktop' ? (
            <ol className="mt-4 space-y-2 text-sm text-ink/80">
              <li>1. Chrome or Edge: use the install icon in the address bar, or the browser menu, then Install app.</li>
              <li>2. Safari: File → Add to Dock, or Share → Add to Dock.</li>
            </ol>
          ) : null}
          <div className="mt-4 flex gap-2">
            <GoldButton onClick={install} className="flex-1 rounded-full px-4 py-3 text-[0.68rem]">
              {help ? 'How to install' : mobile && !deferred ? 'Add to Home Screen' : 'Install app'}
            </GoldButton>
            <button
              type="button"
              onClick={dismiss}
              className="rounded-full px-4 py-3 text-[0.68rem] tracking-[0.16em] text-ink/55 uppercase"
            >
              Not now
            </button>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  )
}
