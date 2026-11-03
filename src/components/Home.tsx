import { motion } from 'framer-motion'
import { CLINIC, FLOWS, TREATMENTS, type FlowId } from '../data'
import { BrandMark, GhostButton, GoldButton } from './Brand'
import { Hero } from './Hero'
import { Specialists } from './Specialists'
import hero from '../assets/hero-img.jpg'
const fade = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function Home({
  onBook,
  onSelectFlow,
}: {
  onBook: () => void
  onSelectFlow: (id: FlowId) => void
}) {
  return (
    <main>
      <Hero onBook={onBook} />
      <About onBook={onBook} />
      <Rituals />
      <Specialists />
      <Ideas onSelectFlow={onSelectFlow} />
      <Visit onBook={onBook} />
      <Footer />
    </main>
  )
}

function About({ onBook }: { onBook: () => void }) {
  return (
    <section id="about" className="relative overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_80%_10%,rgba(228,196,188,0.45),transparent_55%),radial-gradient(700px_380px_at_10%_80%,rgba(216,196,160,0.28),transparent_50%)]" />
      <div className="grain" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <motion.div initial="hidden" animate="show" variants={fade}>
          <p className="kicker">The atelier · {CLINIC.city}</p>
          <h2 className="serif mt-5 max-w-xl text-5xl leading-[1.08] font-medium text-espresso sm:text-6xl lg:text-7xl">
            Light, composed, unmistakably you.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/80 sm:text-lg">
            Unhurried consultations for skin, contour, and glow. Medical-grade
            care wrapped in the quiet of an atelier.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <GoldButton onClick={onBook} className="rounded-full px-7 py-3.5 text-[0.72rem]">
              Book Consultant
            </GoldButton>
            <a href="#rituals" className="no-underline">
              <GhostButton className="rounded-full px-7 py-3.5 text-[0.72rem]">
                Explore rituals
              </GhostButton>
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-2">
            {['HydraGlow', 'SoftLift', 'Laser Lume', 'Bridal'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gold/25 bg-white/40 px-3 py-1 text-[0.68rem] tracking-[0.16em] text-ink/70 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-[2.5rem] border border-gold/20" />
          <div className="relative overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-40px_rgba(36,28,24,0.55)]">
            <img
              src={hero}
              alt="A calm facial ritual at the clinic"
              className="aspect-[4/5] w-full object-cover sm:aspect-[5/6]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-espresso/45 via-transparent to-blush/10" />
            <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4 text-ivory">
              <div>
                <p className="kicker text-champagne">Signature</p>
                <p className="serif text-2xl">HydraGlow hour</p>
              </div>
              <p className="text-[0.7rem] tracking-[0.16em] uppercase opacity-80">75 min</p>
            </div>
          </div>
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="absolute -bottom-6 -left-2 hidden max-w-[220px] rounded-2xl border border-gold/20 bg-ivory/90 p-4 shadow-[0_20px_40px_-28px_rgba(36,28,24,0.5)] backdrop-blur sm:block"
          >
            <p className="kicker">Next atelier hour</p>
            <p className="serif mt-1 text-xl text-espresso">Tue · 11:30</p>
            <p className="mt-1 text-xs text-ink/70">Dr. Amira · facial harmony</p>
          </motion.aside>
        </motion.div>
      </div>
    </section>
  )
}

function Rituals() {
  return (
    <section id="rituals" className="relative bg-cream/60 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="max-w-xl">
          <p className="kicker">The rituals</p>
          <h2 className="serif mt-3 text-4xl text-espresso sm:text-5xl">
            Treatments with a quiet finish.
          </h2>
          <p className="mt-4 text-ink/75">
            Every visit begins with a consultant — never a sales script. Choose
            the ritual, then sit with the specialist who knows it by heart.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TREATMENTS.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.06, duration: 0.55 }}
              className="group overflow-hidden rounded-[1.4rem] border border-gold/15 bg-ivory"
            >
              <div className="relative h-48 overflow-hidden bg-mist">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-espresso/45 via-transparent to-espresso/10" />
                <span className="absolute top-4 left-4 rounded-full bg-ivory/80 px-3 py-1 text-[0.65rem] tracking-[0.2em] text-espresso/80 uppercase backdrop-blur-sm">
                  {item.ritual}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="serif text-2xl text-espresso">{item.name}</h3>
                  <span className="text-[0.68rem] tracking-[0.12em] text-gold uppercase">
                    {item.duration}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{item.blurb}</p>
                <p className="mt-4 text-xs tracking-[0.16em] text-ink/55 uppercase">
                  From {item.from}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Ideas({ onSelectFlow }: { onSelectFlow: (id: FlowId) => void }) {
  return (
    <section id="ideas" className="relative overflow-hidden bg-espresso py-20 text-ivory lg:py-28">
      <div className="grain opacity-20" />
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <p className="kicker">Five booking ideas</p>
        <h2 className="serif mt-3 max-w-2xl text-4xl sm:text-5xl">
          How the consultant moment can feel.
        </h2>
        <p className="mt-4 max-w-xl text-ivory/70">
          Same appointment. Five animated languages — from a silk overlay to a
          whispered concierge. Open any of them from the header, too.
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {FLOWS.map((flow, i) => (
            <motion.button
              key={flow.id}
              type="button"
              onClick={() => onSelectFlow(flow.id)}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -6 }}
              className="flex h-full flex-col rounded-[1.4rem] border border-white/10 bg-white/5 p-5 text-left text-ivory"
            >
              <span className="font-display text-3xl text-gold-soft">{flow.number}</span>
              <span className="mt-4 serif text-2xl">{flow.name}</span>
              <span className="mt-1 text-[0.65rem] tracking-[0.2em] text-champagne uppercase">
                {flow.kicker}
              </span>
              <span className="mt-3 text-sm leading-relaxed text-ivory/70">{flow.line}</span>
              <span className="mt-auto pt-5 text-[0.65rem] tracking-[0.18em] text-gold-soft uppercase">
                Try this flow
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}

function Visit({ onBook }: { onBook: () => void }) {
  return (
    <section id="visit" className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="kicker">Visit the atelier</p>
          <h2 className="serif mt-3 text-4xl text-espresso sm:text-5xl">
            A quiet hour, held for you.
          </h2>
          <p className="mt-4 max-w-md text-ink/75">
            Consultations are private, fifty minutes, and never rushed. Arrive a
            little early — tea is poured, skin is read, a plan is sketched.
          </p>
          <GoldButton onClick={onBook} className="mt-8 rounded-full px-7 py-3.5 text-[0.72rem]">
            Book Consultant
          </GoldButton>
        </div>
        <dl className="grid gap-6 sm:grid-cols-2">
          {[
            ['Address', CLINIC.address],
            ['Hours', CLINIC.hours],
            ['Concierge', CLINIC.phone],
            ['Notes', CLINIC.email],
          ].map(([label, value]) => (
            <div key={label} className="border-t border-gold/20 pt-4">
              <dt className="kicker">{label}</dt>
              <dd className="serif mt-2 text-2xl text-espresso">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-gold/15 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 sm:flex-row sm:items-center lg:px-8">
        <BrandMark size="sm" />
        <p className="text-xs tracking-[0.16em] text-ink/55 uppercase">
          {CLINIC.name} · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
