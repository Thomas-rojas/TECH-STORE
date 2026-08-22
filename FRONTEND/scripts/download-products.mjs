import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'products')

const sources = {
  'iphone-16-pro': [
    'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-pro.jpg',
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-blacktitanium?wid=1200&hei=1200&fmt=png-alpha&qlt=90',
  ],
  'iphone-16': [
    'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16.jpg',
  ],
  'iphone-15': [
    'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15.jpg',
  ],
  'macbook-pro': [
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202410?wid=1200&hei=1200&fmt=png-alpha&qlt=90',
    'https://fdn2.gsmarena.com/vv/bigpic/apple-macbook-pro-14-2024.jpg',
  ],
  'macbook-air': [
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402?wid=1200&hei=1200&fmt=png-alpha&qlt=90',
    'https://fdn2.gsmarena.com/vv/bigpic/apple-macbook-air-13-2024.jpg',
  ],
  'mac-mini': [
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-mini-hero-202410?wid=1200&hei=1200&fmt=png-alpha&qlt=90',
    'https://fdn2.gsmarena.com/vv/bigpic/apple-mac-mini-2024.jpg',
  ],
  'ipad-pro': [
    'https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-pro-11-2024.jpg',
  ],
  'ipad-air': [
    'https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-air-11-2024.jpg',
  ],
  'ipad-mini': [
    'https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-mini-2024.jpg',
  ],
  'airpods-pro': [
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-pro-2-hero-select-202409?wid=1200&hei=1200&fmt=png-alpha&qlt=90',
    'https://fdn2.gsmarena.com/vv/bigpic/apple-airpods-pro-2nd-gen.jpg',
  ],
  'airpods-4': [
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-4-hero-select-202409?wid=1200&hei=1200&fmt=png-alpha&qlt=90',
    'https://fdn2.gsmarena.com/vv/bigpic/apple-airpods-4.jpg',
  ],
  'apple-watch': [
    'https://fdn2.gsmarena.com/vv/bigpic/apple-watch-series-10.jpg',
  ],
  'apple-watch-se': [
    'https://fdn2.gsmarena.com/vv/bigpic/apple-watch-se3.jpg',
  ],
  'apple-pencil': [
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MX2D3?wid=1200&hei=1200&fmt=png-alpha&qlt=90',
    'https://images.unsplash.com/photo-1629131726692-1accd0c53fb1?auto=format&fit=crop&w=1400&q=80',
  ],
  airtag: [
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-single-select-202104?wid=1200&hei=1200&fmt=png-alpha&qlt=90',
    'https://fdn2.gsmarena.com/vv/bigpic/apple-airtag.jpg',
  ],
  charger: [
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MU7W2?wid=1200&hei=1200&fmt=png-alpha&qlt=90',
    'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1400&q=80',
  ],
  'echo-pop': [
    'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=1400&q=80',
  ],
  'echo-dot': [
    'https://upload.wikimedia.org/wikipedia/commons/2/24/Amazon_Echo_Dot_5_mit_Uhr.jpg',
    'https://images.unsplash.com/photo-1512446816042-444d641267d4?auto=format&fit=crop&w=1400&q=80',
  ],
  'echo-show-5': [
    'https://upload.wikimedia.org/wikipedia/commons/8/87/Echo_Show_5_2._Gen..jpg',
    'https://images.unsplash.com/photo-1512446816042-444d641267d4?auto=format&fit=crop&w=1400&q=80',
  ],
  'echo-show-8': [
    'https://images.unsplash.com/photo-1512446816042-444d641267d4?auto=format&fit=crop&w=1400&q=80',
  ],
  'echo-spot': [
    'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=1400&q=80',
  ],
  'bose-s1': [
    'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1400&q=80',
  ],
  lark: [
    'https://images.unsplash.com/photo-1590602847861-f517fe5ae64d?auto=format&fit=crop&w=1400&q=80',
  ],
  roku: [
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1400&q=80',
  ],
  'sony-wh': [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=80',
  ],
  'asus-rog': [
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1600&q=80',
  ],
  'msi-gaming': [
    'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1600&q=80',
  ],
  legion: [
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1600&q=80',
  ],
}

const headers = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
}

async function fetchFirst(name, urls) {
  for (const url of urls) {
    try {
      const response = await fetch(url, { headers, redirect: 'follow' })
      if (!response.ok) {
        console.warn('skip', name, response.status, url.slice(0, 70))
        continue
      }
      const buffer = Buffer.from(await response.arrayBuffer())
      if (buffer.length < 2000) continue
      const type = response.headers.get('content-type') ?? ''
      const ext = type.includes('png') || url.includes('fmt=png') ? 'png' : 'jpg'
      return { buffer, ext }
    } catch (error) {
      console.warn('skip', name, error.message)
    }
  }
  throw new Error(`all sources failed for ${name}`)
}

await mkdir(outDir, { recursive: true })
const map = {}

for (const [name, urls] of Object.entries(sources)) {
  try {
    const { buffer, ext } = await fetchFirst(name, urls)
    const file = `${name}.${ext}`
    await writeFile(join(outDir, file), buffer)
    map[name] = `/products/${file}`
    console.log('ok', file, buffer.length)
  } catch (error) {
    console.error('fail', name, error.message)
  }
}

await writeFile(join(outDir, 'manifest.json'), JSON.stringify(map, null, 2))
console.log('done', Object.keys(map).length)
