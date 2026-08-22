/**
 * Generates ImportCAS favicon set from brand/logo-mark.png
 * Run: node scripts/generate-favicons.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')
const srcPath = join(publicDir, 'brand', 'logo-mark.png')

// Prefer sharp if available; otherwise fall back to a tiny pure-PNG scaler is not practical.
// Installs sharp as optional runtime for this script only when missing.
async function loadSharp() {
  try {
    const require = createRequire(import.meta.url)
    return require('sharp')
  } catch {
    const { execSync } = await import('node:child_process')
    execSync('npm install --no-save --no-package-lock sharp@0.34.2', {
      cwd: root,
      stdio: 'inherit',
    })
    const require = createRequire(import.meta.url)
    return require('sharp')
  }
}

function packIco(pngBuffers) {
  const count = pngBuffers.length
  const headerSize = 6
  const entrySize = 16
  const dirSize = headerSize + entrySize * count
  let offset = dirSize
  const entries = pngBuffers.map((buf) => {
    const entry = { offset, size: buf.length }
    offset += buf.length
    return entry
  })
  const out = Buffer.alloc(offset)
  out.writeUInt16LE(0, 0)
  out.writeUInt16LE(1, 2)
  out.writeUInt16LE(count, 4)
  pngBuffers.forEach((buf, i) => {
    const meta = entries[i]
    // Read PNG IHDR for width/height
    const w = buf.readUInt32BE(16)
    const h = buf.readUInt32BE(20)
    const o = headerSize + entrySize * i
    out.writeUInt8(w >= 256 ? 0 : w, o)
    out.writeUInt8(h >= 256 ? 0 : h, o + 1)
    out.writeUInt8(0, o + 2)
    out.writeUInt8(0, o + 3)
    out.writeUInt16LE(1, o + 4)
    out.writeUInt16LE(32, o + 6)
    out.writeUInt32LE(meta.size, o + 8)
    out.writeUInt32LE(meta.offset, o + 12)
    buf.copy(out, meta.offset)
  })
  return out
}

async function renderIcon(sharp, size, { padRatio = 0.12, background = { r: 0, g: 0, b: 0, alpha: 0 } } = {}) {
  const pad = Math.round(size * padRatio)
  const inner = Math.max(1, size - pad * 2)
  const icon = await sharp(srcPath)
    .resize(inner, inner, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: size <= 32 ? 'lanczos3' : 'lanczos3',
    })
    .png()
    .toBuffer()

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background,
    },
  })
    .composite([{ input: icon, gravity: 'centre' }])
    .png({ compressionLevel: 9 })
    .toBuffer()
}

async function main() {
  const sharp = await loadSharp()
  // Verify source has alpha / usable pixels
  const meta = await sharp(srcPath).metadata()
  console.log(`source ${meta.width}x${meta.height} format=${meta.format}`)

  const transparent = { r: 0, g: 0, b: 0, alpha: 0 }
  // Slightly more padding on tiny sizes so silhouette reads
  const png16 = await renderIcon(sharp, 16, { padRatio: 0.1, background: transparent })
  const png32 = await renderIcon(sharp, 32, { padRatio: 0.1, background: transparent })
  const png48 = await renderIcon(sharp, 48, { padRatio: 0.1, background: transparent })
  const apple = await renderIcon(sharp, 180, {
    padRatio: 0.14,
    // iOS home screen: dark plate behind turquoise for contrast
    background: { r: 18, g: 18, b: 18, alpha: 1 },
  })
  const android192 = await renderIcon(sharp, 192, {
    padRatio: 0.14,
    background: { r: 18, g: 18, b: 18, alpha: 1 },
  })
  const android512 = await renderIcon(sharp, 512, {
    padRatio: 0.14,
    background: { r: 18, g: 18, b: 18, alpha: 1 },
  })
  // Generic PNG favicon (transparent) at 32 for fallback
  const faviconPng = png32

  writeFileSync(join(publicDir, 'favicon-16x16.png'), png16)
  writeFileSync(join(publicDir, 'favicon-32x32.png'), png32)
  writeFileSync(join(publicDir, 'favicon.png'), faviconPng)
  writeFileSync(join(publicDir, 'apple-touch-icon.png'), apple)
  writeFileSync(join(publicDir, 'android-chrome-192x192.png'), android192)
  writeFileSync(join(publicDir, 'android-chrome-512x512.png'), android512)
  writeFileSync(join(publicDir, 'favicon.ico'), packIco([png16, png32, png48]))

  const manifest = {
    name: 'ImportCAS',
    short_name: 'ImportCAS',
    description:
      'ImportCAS — Tu acceso directo a la tecnología en Colombia: Confianza, Claridad y Tranquilidad.',
    start_url: '/',
    display: 'standalone',
    background_color: '#121212',
    theme_color: '#66C9CF',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
  writeFileSync(join(publicDir, 'site.webmanifest'), `${JSON.stringify(manifest, null, 2)}\n`)

  console.log('Wrote favicon set + site.webmanifest')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
