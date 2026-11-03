import { useState, type ReactNode } from 'react'

export function BrandMark({
  light = false,
  size = 'md',
}: {
  light?: boolean
  size?: 'sm' | 'md'
}) {
  const box = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'
  const type = size === 'sm' ? 'text-lg' : 'text-xl'
  const ink = light ? 'text-ivory' : 'text-espresso'
  const stroke = light ? '#C9A56A' : '#B08D57'

  return (
    <a href="#top" className={`flex items-center gap-3 no-underline ${ink}`}>
      <svg viewBox="0 0 48 48" className={box} aria-hidden="true">
        <circle cx="24" cy="24" r="18" fill="none" stroke={stroke} strokeWidth="1.2" />
        <path
          d="M24 12c2.2 5 7 8 11.2 8.8C31 21.8 26.2 24.8 24 30c-2.2-5.2-7-8.2-11.2-9.2C17 20 21.8 17 24 12Z"
          fill={stroke}
        />
      </svg>
      <span className="leading-none">
        <span className={`serif block ${type} tracking-[0.18em] uppercase`}>
          Maison Lumière
        </span>
        <span className="mt-1 block text-[0.62rem] tracking-[0.32em] uppercase text-gold">
          Aesthetic atelier
        </span>
      </span>
    </a>
  )
}

export function GoldRule({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-linear-to-r from-transparent to-gold/70" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold/80" />
      <span className="h-px flex-1 bg-linear-to-l from-transparent to-gold/70" />
    </div>
  )
}

export function GoldButton({
  children,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`gold-cta disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <span className="relative z-10">{children}</span>
    </button>
  )
}

export function Portrait({
  src,
  alt,
  initials,
  className = '',
}: {
  src: string
  alt: string
  initials: string
  className?: string
}) {
  const [ok, setOk] = useState(true)
  if (!ok) {
    return (
      <div
        className={`flex items-center justify-center bg-sand text-sm tracking-[0.14em] text-espresso ${className}`}
      >
        {initials}
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setOk(false)}
      className={className}
    />
  )
}

export function GhostButton({
  children,
  className = '',
  onClick,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <button type="button" onClick={onClick} className={`ghost-cta ${className}`}>
      {children}
    </button>
  )
}
