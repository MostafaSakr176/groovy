import bridalImg from './assets/ritual-bridal.jpg'
import contourImg from './assets/ritual-contour.jpg'
import hydraImg from './assets/ritual-hydra.jpg'
import lumeImg from './assets/ritual-lume.jpg'
import resetImg from './assets/ritual-reset.jpg'
import softliftImg from './assets/ritual-softlift.jpg'

export type Treatment = {
  id: string
  name: string
  ritual: string
  duration: string
  from: string
  blurb: string
  wash: string
  image: string
}

export type Specialist = {
  id: string
  name: string
  title: string
  focus: string
  initials: string
  portrait: string
  tone: string
}

export type FlowId = 'velvet' | 'ritual' | 'concierge' | 'atelier' | 'whisper'

export const CLINIC = {
  name: 'Maison Lumière',
  whisper: 'Aesthetic atelier',
  city: 'Zamalek, Cairo',
  address: '14 Nile Garden, Zamalek',
  phone: '+20 100 440 2210',
  email: 'concierge@maisonlumiere.clinic',
  hours: 'Sun–Thu, 10:00–19:00',
}

export const TREATMENTS: Treatment[] = [
  {
    id: 'hydra',
    name: 'HydraGlow Facial',
    ritual: 'Skin ritual',
    duration: '75 min',
    from: 'EGP 2,800',
    blurb: 'Deep cleanse, lymphatic glow, and a quiet glass-skin finish.',
    wash: 'linear-gradient(145deg, #f3d9d0 0%, #e8c5b0 48%, #d9b7a3 100%)',
    image: hydraImg,
  },
  {
    id: 'softlift',
    name: 'SoftLift Consult',
    ritual: 'Injectables',
    duration: '45 min',
    from: 'EGP 4,500',
    blurb: 'A physician-led plan for harmony, never excess — toxin and filler mapping.',
    wash: 'linear-gradient(145deg, #ead9c8 0%, #d4b896 50%, #c4a07a 100%)',
    image: softliftImg,
  },
  {
    id: 'lume',
    name: 'Laser Lume',
    ritual: 'Light therapy',
    duration: '40 min',
    from: 'EGP 3,600',
    blurb: 'Calm pigmentation and texture with medical-grade light, not harshness.',
    wash: 'linear-gradient(145deg, #e7ddd2 0%, #cfc3b3 46%, #b7a48f 100%)',
    image: lumeImg,
  },
  {
    id: 'reset',
    name: 'Skin Reset Peel',
    ritual: 'Resurface',
    duration: '50 min',
    from: 'EGP 3,200',
    blurb: 'A tailored peel that brightens without stripping the barrier.',
    wash: 'linear-gradient(145deg, #e8d5c6 0%, #d7b8a6 52%, #c49a88 100%)',
    image: resetImg,
  },
  {
    id: 'bridal',
    name: 'Bridal Glow Atelier',
    ritual: 'Occasion',
    duration: '90 min',
    from: 'EGP 6,800',
    blurb: 'A private countdown ritual — skin, brows, and a camera-ready calm.',
    wash: 'linear-gradient(145deg, #f0d4d0 0%, #e0b8b4 48%, #c99690 100%)',
    image: bridalImg,
  },
  {
    id: 'contour',
    name: 'Contour Body Ritual',
    ritual: 'Body',
    duration: '60 min',
    from: 'EGP 5,200',
    blurb: 'Sculpting consultation with lymphatic care and a measured plan.',
    wash: 'linear-gradient(145deg, #ddd6cc 0%, #c3b7a8 50%, #a89886 100%)',
    image: contourImg,
  },
]

export type Offer = {
  id: string
  kicker: string
  title: string
  line: string
  save: string
  image: string
}

export const OFFERS: Offer[] = [
  {
    id: 'glow',
    kicker: 'New guest ritual',
    title: 'HydraGlow, first visit.',
    line: 'A glass-skin hour with a complimentary reading of the barrier.',
    save: 'Save 20%',
    image: hydraImg,
  },
  {
    id: 'lift',
    kicker: 'Physician consult',
    title: 'SoftLift mapping, on us.',
    line: 'A harmony plan for toxin and filler — no charge for the consultation.',
    save: 'Complimentary',
    image: softliftImg,
  },
  {
    id: 'light',
    kicker: 'Autumn series',
    title: 'Laser Lume, three sessions.',
    line: 'Calm pigmentation with medical-grade light, never harshness.',
    save: 'From EGP 8,900',
    image: lumeImg,
  },
  {
    id: 'bride',
    kicker: 'Occasion atelier',
    title: 'Bridal Glow countdown.',
    line: 'Skin, brows, and a camera-ready calm in the weeks before the day.',
    save: 'Package from EGP 6,800',
    image: bridalImg,
  },
]

export const SPECIALISTS: Specialist[] = [
  {
    id: 'amira',
    name: 'Dr. Amira El-Sayed',
    title: 'Medical Director',
    focus: 'Facial harmony & injectables',
    initials: 'AE',
    portrait:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&h=600&q=80',
    tone: '#c17b72',
  },
  {
    id: 'nour',
    name: 'Dr. Nour Hassan',
    title: 'Aesthetic Physician',
    focus: 'Laser, peel & pigmentation',
    initials: 'NH',
    portrait:
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&h=600&q=80',
    tone: '#b08d57',
  },
  {
    id: 'lina',
    name: 'Lina Farouk',
    title: 'Lead Facialist',
    focus: 'Glow facials & skin barrier',
    initials: 'LF',
    portrait:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=480&h=600&q=80',
    tone: '#8b9a87',
  },
  {
    id: 'yara',
    name: 'Dr. Yara Mansour',
    title: 'Body & Contour',
    focus: 'Sculpting & bridal plans',
    initials: 'YM',
    portrait:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=480&h=600&q=80',
    tone: '#9a7b6d',
  },
]

export const FLOWS: {
  id: FlowId
  number: string
  name: string
  kicker: string
  line: string
  mood: string
}[] = [
  {
    id: 'velvet',
    number: '01',
    name: 'Velvet Overlay',
    kicker: 'Quiet salon',
    line: 'The room dims. A silk-framed card blooms from the button — one unhurried step at a time.',
    mood: 'Centered · intimate · gold-lined',
  },
  {
    id: 'ritual',
    number: '02',
    name: 'Cinematic Ritual',
    kicker: 'Full-canvas journey',
    line: 'A darkened atelier. Each question fills the screen, like walking from room to room.',
    mood: 'Immersive · editorial · slow',
  },
  {
    id: 'concierge',
    number: '03',
    name: 'Concierge Drawer',
    kicker: 'Private reception',
    line: 'A reception desk slides in from the right. Meet your specialist while you reserve.',
    mood: 'Side panel · portrait-led · compact',
  },
  {
    id: 'atelier',
    number: '04',
    name: 'Atelier Calendar',
    kicker: 'Date first',
    line: 'Choose the day your skin is ready. The calendar leads; treatment follows.',
    mood: 'Calendar-first · airy · precise',
  },
  {
    id: 'whisper',
    number: '05',
    name: 'Whisper Concierge',
    kicker: 'Conversation',
    line: 'No forms. A whispered exchange with the clinic concierge — answer in soft chips.',
    mood: 'Chat · chips · handwritten calm',
  },
]

export const TIMES = ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30']

export function formatDay(date: Date) {
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

export function isoDay(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function clinicOpen(date: Date) {
  const day = date.getDay()
  return day !== 5 && day !== 6
}

export function upcomingOpenDays(count = 16) {
  const days: Date[] = []
  const cursor = new Date()
  cursor.setHours(0, 0, 0, 0)
  let guard = 0
  while (days.length < count && guard < 60) {
    if (clinicOpen(cursor)) days.push(new Date(cursor))
    cursor.setDate(cursor.getDate() + 1)
    guard += 1
  }
  return days
}

export function monthGrid(year: number, month: number) {
  const first = new Date(year, month, 1)
  const startPad = first.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (Date | null)[] = []
  for (let i = 0; i < startPad; i += 1) cells.push(null)
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(new Date(year, month, d))
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

export function slotTaken(dateIso: string, time: string) {
  let hash = 0
  const key = dateIso + time
  for (let i = 0; i < key.length; i += 1) hash = (hash * 31 + key.charCodeAt(i)) % 97
  return hash % 7 === 0
}
