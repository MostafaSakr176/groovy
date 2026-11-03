import { motion } from 'framer-motion'
import { FLOWS, type FlowId } from '../data'
import { GoldRule } from './Brand'

export function Chooser({
  onSelect,
  onClose,
}: {
  onSelect: (id: FlowId) => void
  onClose: () => void
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        className="fixed inset-0 bg-espresso/45 backdrop-blur-md"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="flex min-h-full items-center justify-center px-4 py-8">
      <motion.div
        role="dialog"
        aria-labelledby="chooser-title"
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 160, damping: 20 }}
        className="silk-panel relative w-full max-w-5xl rounded-[2rem] border border-gold/20 p-6 shadow-[0_40px_80px_-32px_rgba(36,28,24,0.55)] sm:p-10"
      >
        <div className="grain opacity-20" />
        <div className="relative">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="kicker">Book consultant</p>
              <h2 id="chooser-title" className="serif mt-2 text-4xl text-espresso sm:text-5xl">
                How shall we begin?
              </h2>
              <p className="mt-3 max-w-lg text-sm text-ink/70">
                Five animated consultation flows, designed for a beauty clinic.
                Pick a mood — the appointment is the same.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 text-lg text-espresso"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <GoldRule className="my-8 max-w-xs" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {FLOWS.map((flow, i) => (
              <motion.button
                key={flow.id}
                type="button"
                onClick={() => onSelect(flow.id)}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.06 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="group flex flex-col rounded-[1.4rem] border border-gold/20 bg-white/50 p-4 text-left"
              >
                <span className="serif text-3xl text-gold">{flow.number}</span>
                <span className="serif mt-3 text-xl text-espresso">{flow.name}</span>
                <span className="mt-1 text-[0.62rem] tracking-[0.2em] text-gold uppercase">
                  {flow.kicker}
                </span>
                <span className="mt-3 text-sm leading-relaxed text-ink/70">{flow.line}</span>
                <span className="mt-auto pt-5 text-[0.65rem] tracking-[0.18em] text-gold uppercase group-hover:underline">
                  Open this idea
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
      </div>
    </motion.div>
  )
}
