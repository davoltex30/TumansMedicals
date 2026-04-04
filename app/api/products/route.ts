import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { Product } from '@/lib/schemas/product'

export const dynamic = 'force-dynamic'

function rowToProduct(row: Record<string, unknown>): Product {
  return {
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    categoryId: row.category_id as string,
    categoryName: row.category_name as string,
    description: row.description as string,
    shortDescription: row.short_description as string,
    priceOnRequest: row.price_on_request as boolean,
    image: row.image as string,
    images: (row.images as string[]) || [],
    specifications: (row.specifications as Record<string, string>) || {},
    features: (row.features as string[]) || [],
    inStock: row.in_stock as boolean,
    badge: (row.badge as string) || undefined,
    sku: row.sku as string,
  }
}

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products_additions')
    .select('*')
    .order('created_at', { ascending: false })

  let all: Product[] = (data || []).map(rowToProduct)

  const { searchParams } = req.nextUrl
  const categoryId = searchParams.get('categoryId')
  const search = searchParams.get('search')
  const page = parseInt(searchParams.get('page') || '1', 10)
  const perPage = parseInt(searchParams.get('perPage') || '12', 10)

  if (categoryId) all = all.filter((p) => p.categoryId === categoryId)
  if (search) {
    const q = search.toLowerCase()
    all = all.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q)
    )
  }

  const total = all.length
  const start = (page - 1) * perPage
  const data2 = all.slice(start, start + perPage)

  return NextResponse.json({ data: data2, total, page, perPage })
}
