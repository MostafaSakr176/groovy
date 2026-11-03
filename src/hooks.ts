import { useEffect } from 'react'

let lockCount = 0

function applyLock() {
  document.body.style.overflow = 'hidden'
  document.documentElement.style.overflow = 'hidden'
}

function clearLock() {
  document.body.style.removeProperty('overflow')
  document.documentElement.style.removeProperty('overflow')
}

export function useLockBody(lock: boolean) {
  useEffect(() => {
    if (!lock) return

    if (lockCount === 0) applyLock()
    lockCount += 1

    return () => {
      lockCount = Math.max(0, lockCount - 1)
      if (lockCount === 0) clearLock()
    }
  }, [lock])
}
