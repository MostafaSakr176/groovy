import { deflateSync } from 'node:zlib'
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')

function crc32(buf) {
  let crc = ~0
  for (const byte of buf) {
    crc ^= byte
    for (let i = 0; i < 8; i += 1) {
      const mask = -(crc & 1)
      crc = (crc >>> 1) ^ (0xedb88320 & mask)
    }
  }
  return ~crc >>> 0
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type)
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const crcBuf = Buffer.alloc(4)
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])))
  return Buffer.concat([len, typeBuf, data, crcBuf])
}

function png(size, paint) {
  const raw = Buffer.alloc((size * 4 + 1) * size)
  for (let y = 0; y < size; y += 1) {
    const row = y * (size * 4 + 1)
    raw[row] = 0
    for (let x = 0; x < size; x += 1) {
      const [r, g, b, a] = paint(x, y, size)
      const i = row + 1 + x * 4
      raw[i] = r
      raw[i + 1] = g
      raw[i + 2] = b
      raw[i + 3] = a
    }
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8
  ihdr[9] = 6
  const pngBuf = Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
  return pngBuf
}

function icon(x, y, size) {
  const cx = (size - 1) / 2
  const cy = (size - 1) / 2
  const dx = x - cx
  const dy = y - cy
  const dist = Math.sqrt(dx * dx + dy * dy)
  const ring = size * 0.28
  const ringW = Math.max(1.2, size * 0.022)
  const espresso = [36, 28, 24, 255]
  const gold = [201, 165, 106, 255]
  if (Math.abs(dist - ring) < ringW) return gold
  const leaf =
    Math.abs(dx) < size * 0.22 &&
    Math.abs(dy) < size * 0.28 &&
    Math.abs(dx) / (size * 0.22) + Math.abs(dy) / (size * 0.28) < 1.05
  if (leaf) return gold
  return espresso
}

function maskable(x, y, size) {
  const pad = size * 0.12
  if (x < pad || y < pad || x >= size - pad || y >= size - pad) {
    return [36, 28, 24, 255]
  }
  return icon(x, y, size)
}

writeFileSync(join(outDir, 'pwa-192x192.png'), png(192, icon))
writeFileSync(join(outDir, 'pwa-512x512.png'), png(512, icon))
writeFileSync(join(outDir, 'pwa-maskable-512x512.png'), png(512, maskable))
writeFileSync(join(outDir, 'apple-touch-icon.png'), png(180, icon))
console.log('PWA icons written to public/')
