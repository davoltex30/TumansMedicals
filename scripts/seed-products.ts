import { createClient } from '@supabase/supabase-js'
import { products } from '../data/products'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function seed() {
  console.log(`Importing ${products.length} products...`)

  const rows = products.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    category_id: p.categoryId,
    category_name: p.categoryName,
    description: p.description,
    short_description: p.shortDescription,
    price_on_request: p.priceOnRequest,
    image: p.image || '/No_Image_Available.jpg',
    images: p.images ?? [],
    specifications: p.specifications ?? {},
    features: p.features ?? [],
    in_stock: p.inStock,
    badge: p.badge ?? null,
    sku: p.sku,
  }))

  // Upsert in batches of 100
  const BATCH = 100
  let inserted = 0
  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH)
    const { error } = await supabase
      .from('products_additions')
      .upsert(batch, { onConflict: 'id' })
    if (error) {
      console.error(`Batch ${i / BATCH + 1} failed:`, error.message)
      process.exit(1)
    }
    inserted += batch.length
    console.log(`  ${inserted}/${rows.length} done`)
  }

  console.log('Done.')
}

seed().catch((e) => { console.error(e); process.exit(1) })
