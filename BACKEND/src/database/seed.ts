import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !key) {
  throw new Error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before seeding')
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
})

async function main() {
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'importcas'
  const adminId = process.env.SEED_ADMIN_IDENTIFICATION || 'admin'
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@importcas.com'
  const passwordHash = await bcrypt.hash(adminPassword, 10)

  const { data: existingAdmin } = await supabase
    .from('users')
    .select('id')
    .eq('identification', adminId)
    .maybeSingle()

  if (existingAdmin) {
    await supabase
      .from('users')
      .update({
        password_hash: passwordHash,
        role: 'admin',
        email: adminEmail,
      })
      .eq('id', existingAdmin.id)
  } else {
    await supabase.from('users').insert({
      name: 'Administrador ImportCAS',
      email: adminEmail,
      phone: '3000000000',
      id_type: 'Cédula',
      identification: adminId,
      password_hash: passwordHash,
      role: 'admin',
    })
  }

  const { data: iphone } = await supabase
    .from('categories')
    .upsert(
      {
        slug: 'iphone',
        name: 'iPhone',
        description: 'Teléfonos Apple',
        sort_order: 1,
      },
      { onConflict: 'slug' },
    )
    .select('*')
    .single()

  await supabase.from('categories').upsert(
    {
      slug: 'mac',
      name: 'Mac',
      description: 'Computadores Apple',
      sort_order: 2,
    },
    { onConflict: 'slug' },
  )

  if (iphone) {
    await supabase.from('products').upsert(
      {
        slug: 'iphone-17-pro-max',
        sku: 'IP17PM-SEED',
        name: 'iPhone 17 Pro Max',
        brand: 'Apple',
        short_description: 'El iPhone más avanzado.',
        description: 'Producto de ejemplo del seed ImportCAS.',
        highlight: 'A18 Pro',
        price: 7_499_000,
        images: ['/products/iphone-17-pro-max.png'],
        category_id: iphone.id,
        stock: 10,
        specs: { chip: 'A18 Pro', display: '6.9"' },
        tags: ['apple', 'iphone'],
        featured: true,
        is_new: true,
        active: true,
      },
      { onConflict: 'sku' },
    )
  }

  console.log('Seed OK (Supabase) — admin:', adminId, '/', adminPassword)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
