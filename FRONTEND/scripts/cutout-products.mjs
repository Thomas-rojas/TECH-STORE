import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'products')

const sources = {
  'iphone-16-pro': [
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-blacktitanium?wid=3000&hei=3000&fmt=png-alpha&qlt=90',
  ],
  'iphone-16': [
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=3000&hei=3000&fmt=png-alpha&qlt=90',
  ],
  'iphone-15': [
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=3000&hei=3000&fmt=png-alpha&qlt=90',
  ],
  'iphone-15-pro': [
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=3000&hei=3000&fmt=png-alpha&qlt=90',
  ],
  'macbook-pro': [
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202410?wid=3000&hei=3000&fmt=png-alpha&qlt=90',
  ],
  'macbook-air': [
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402?wid=3000&hei=3000&fmt=png-alpha&qlt=90',
  ],
  'ipad-pro': [
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-finish-unselect-gallery-1-202405?wid=3000&hei=3000&fmt=png-alpha&qlt=90',
    'https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-pro-11-2024.jpg',
  ],
  'ipad-air': [
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-finish-select-gallery-202405-11inch-blue-wifi?wid=3000&hei=3000&fmt=png-alpha&qlt=90',
  ],
  'airpods-pro': [
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-pro-2-hero-select-202409?wid=3000&hei=3000&fmt=png-alpha&qlt=90',
  ],
  'airpods-4': [
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-4-hero-select-202409?wid=3000&hei=3000&fmt=png-alpha&qlt=90',
  ],
  'apple-watch': [
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-case-42-aluminum-jetblack-nc-s10?wid=3000&hei=3000&fmt=png-alpha&qlt=90',
  ],
  'apple-watch-se': [
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-case-44-aluminum-midnight-nc-se_VW_PF?wid=3000&hei=3000&fmt=png-alpha&qlt=90',
  ],
  keyboard: [
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MK2A3?wid=3000&hei=3000&fmt=png-alpha&qlt=90',
  ],
  'apple-pencil': [
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MX2D3?wid=3000&hei=3000&fmt=png-alpha&qlt=90',
  ],
  pixel: ['https://images.unsplash.com/photo-1749953680414-62d2afc6c29c?auto=format&fit=crop&w=1600&q=80'],
  xiaomi: ['https://fdn2.gsmarena.com/vv/bigpic/xiaomi-14.jpg'],
}

function luminance(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function sample(data, width, x, y) {
  const i = (y * width + x) * 4
  return { r: data[i], g: data[i + 1], b: data[i + 2], a: data[i + 3] }
}

function distance(a, b) {
  return Math.hypot(a.r - b.r, a.g - b.g, a.b - b.b)
}

function isAppleStudioGray(r, g, b) {
  return Math.hypot(r - 245, g - 245, b - 247) < 16
}

function isStudio(r, g, b, a, bg, keyLight, keyDark) {
  if (a < 24) return true
  if (isAppleStudioGray(r, g, b)) return true
  const lum = luminance(r, g, b)
  const gray = Math.abs(r - g) < 12 && Math.abs(g - b) < 12 && Math.abs(r - b) < 12
  const dist = distance({ r, g, b }, bg)
  if (keyLight) return (gray && lum > 222) || dist < 18
  if (keyDark) return lum < 14 || dist < 16
  return false
}

function cutout(data, width, height) {
  const inset = Math.max(2, Math.floor(width * 0.02))
  const bgSamples = [
    sample(data, width, inset, inset),
    sample(data, width, width - 1 - inset, inset),
    sample(data, width, inset, height - 1 - inset),
    sample(data, width, width - 1 - inset, height - 1 - inset),
  ]
  const opaqueCorners = bgSamples.filter((p) => p.a > 200)
  const pool = opaqueCorners.length ? opaqueCorners : bgSamples
  const bg = {
    r: pool.reduce((s, p) => s + p.r, 0) / pool.length,
    g: pool.reduce((s, p) => s + p.g, 0) / pool.length,
    b: pool.reduce((s, p) => s + p.b, 0) / pool.length,
  }
  const bgLum = luminance(bg.r, bg.g, bg.b)
  const keyLight = opaqueCorners.length >= 2 && bgLum > 80
  const keyDark = opaqueCorners.length >= 2 && bgLum < 40

  const seen = new Uint8Array(width * height)
  const qx = new Int32Array(width * height)
  const qy = new Int32Array(width * height)
  let qh = 0
  let qt = 0

  const enqueue = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return
    const idx = y * width + x
    if (seen[idx]) return
    seen[idx] = 1
    qx[qt] = x
    qy[qt] = y
    qt += 1
  }

  for (let x = 0; x < width; x += 1) {
    enqueue(x, 0)
    enqueue(x, height - 1)
  }
  for (let y = 0; y < height; y += 1) {
    enqueue(0, y)
    enqueue(width - 1, y)
  }

  while (qh < qt) {
    const x = qx[qh]
    const y = qy[qh]
    qh += 1
    const i = (y * width + x) * 4
    if (!isStudio(data[i], data[i + 1], data[i + 2], data[i + 3], bg, keyLight, keyDark)) continue
    data[i + 3] = 0
    enqueue(x + 1, y)
    enqueue(x - 1, y)
    enqueue(x, y + 1)
    enqueue(x, y - 1)
  }

  const copy = Buffer.from(data)
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const i = (y * width + x) * 4
      if (copy[i + 3] < 24) continue
      let trans = 0
      if (copy[((y * width + x + 1) * 4) + 3] < 24) trans += 1
      if (copy[((y * width + x - 1) * 4) + 3] < 24) trans += 1
      if (copy[(((y + 1) * width + x) * 4) + 3] < 24) trans += 1
      if (copy[(((y - 1) * width + x) * 4) + 3] < 24) trans += 1
      if (trans >= 3) data[i + 3] = 0
    }
  }
}

async function fetchFirst(urls) {
  for (const url of urls) {
    const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
    if (response.ok) return Buffer.from(await response.arrayBuffer())
  }
  throw new Error(`all sources failed`)
}

async function processOne(name, urls) {
  const input = await fetchFirst(urls)
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .resize(2400, 2400, { fit: 'inside', withoutEnlargement: true })
    .raw()
    .toBuffer({ resolveWithObject: true })

  cutout(data, info.width, info.height)

  const file = join(outDir, `${name}.png`)
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 12 })
    .png({ compressionLevel: 9 })
    .toFile(file)
  console.log('ok', name)
}

await mkdir(outDir, { recursive: true })
for (const [name, urls] of Object.entries(sources)) {
  try {
    await processOne(name, urls)
  } catch (error) {
    console.error('fail', name, error.message)
  }
}

await writeFile(join(outDir, '.gitkeep'), '')
