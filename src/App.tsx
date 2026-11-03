import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { BookingProvider, useBooking, type OverlayView } from './booking'
import { Chooser } from './components/Chooser'
import { Header } from './components/Header'
import { Home } from './components/Home'
import { InstallPrompt } from './components/InstallPrompt'
import type { FlowId } from './data'
import { useLockBody } from './hooks'
import { AtelierCalendar } from './flows/AtelierCalendar'
import { CinematicRitual } from './flows/CinematicRitual'
import { ConciergeDrawer } from './flows/ConciergeDrawer'
import { VelvetModal } from './flows/VelvetModal'
import { WhisperConcierge } from './flows/WhisperConcierge'

export default function App() {
  return (
    <BookingProvider>
      <ClinicApp />
    </BookingProvider>
  )
}

function ClinicApp() {
  const { reset } = useBooking()
  const [view, setView] = useState<OverlayView>(null)
  useLockBody(view !== null)

  function openChooser() {
    reset()
    setView('chooser')
  }

  function openFlow(id: FlowId) {
    reset()
    setView(id)
  }

  function close() {
    setView(null)
  }

  return (
    <div className="min-h-svh bg-ivory">
      <Header onBook={openChooser} />
      <Home onBook={openChooser} onSelectFlow={openFlow} />
      <InstallPrompt hidden={view !== null} />
      <AnimatePresence>
        {view === 'chooser' ? (
          <Chooser key="chooser" onClose={close} onSelect={openFlow} />
        ) : null}
        {view === 'velvet' ? (
          <VelvetModal key="velvet" onClose={close} onSwitch={openChooser} />
        ) : null}
        {view === 'ritual' ? (
          <CinematicRitual key="ritual" onClose={close} onSwitch={openChooser} />
        ) : null}
        {view === 'concierge' ? (
          <ConciergeDrawer key="concierge" onClose={close} onSwitch={openChooser} />
        ) : null}
        {view === 'atelier' ? (
          <AtelierCalendar key="atelier" onClose={close} onSwitch={openChooser} />
        ) : null}
        {view === 'whisper' ? (
          <WhisperConcierge key="whisper" onClose={close} onSwitch={openChooser} />
        ) : null}
      </AnimatePresence>
    </div>
  )
}
