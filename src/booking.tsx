import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { SPECIALISTS, TREATMENTS, type FlowId } from './data'

export type Guest = {
  name: string
  phone: string
  email: string
  note: string
}

export type Draft = {
  treatmentId: string | null
  specialistId: string | null
  date: string | null
  time: string | null
  guest: Guest
}

const emptyGuest: Guest = { name: '', phone: '', email: '', note: '' }

const emptyDraft: Draft = {
  treatmentId: null,
  specialistId: null,
  date: null,
  time: null,
  guest: emptyGuest,
}

type BookingContextValue = {
  draft: Draft
  setTreatment: (id: string) => void
  setSpecialist: (id: string) => void
  setDate: (iso: string) => void
  setTime: (time: string) => void
  setGuest: (guest: Partial<Guest>) => void
  reset: () => void
  treatment: (typeof TREATMENTS)[number] | undefined
  specialist: (typeof SPECIALISTS)[number] | undefined
  readyToConfirm: boolean
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<Draft>(emptyDraft)

  const value = useMemo<BookingContextValue>(() => {
    const treatment = TREATMENTS.find((item) => item.id === draft.treatmentId)
    const specialist = SPECIALISTS.find((item) => item.id === draft.specialistId)
    return {
      draft,
      setTreatment: (id) =>
        setDraft((prev) => ({ ...prev, treatmentId: id })),
      setSpecialist: (id) =>
        setDraft((prev) => ({ ...prev, specialistId: id })),
      setDate: (iso) => setDraft((prev) => ({ ...prev, date: iso, time: null })),
      setTime: (time) => setDraft((prev) => ({ ...prev, time })),
      setGuest: (guest) =>
        setDraft((prev) => ({ ...prev, guest: { ...prev.guest, ...guest } })),
      reset: () => setDraft(emptyDraft),
      treatment,
      specialist,
      readyToConfirm: Boolean(
        draft.treatmentId &&
          draft.specialistId &&
          draft.date &&
          draft.time &&
          draft.guest.name.trim() &&
          draft.guest.phone.trim(),
      ),
    }
  }, [draft])

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used inside BookingProvider')
  return ctx
}

export type OverlayView = FlowId | 'chooser' | null
