import { createClient } from '@/lib/supabase/server'
import type { Category } from '@/lib/schemas/category'
import type { Product } from '@/lib/schemas/product'

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

export async function fetchCategories(): Promise<Category[]> {
  const supabase = await createClient()

  const [{ data: cats }, { data: counts }] = await Promise.all([
    supabase.from('categories_additions').select('*').order('name', { ascending: true }),
    supabase.rpc('get_product_counts_by_category'),
  ])

  const countMap: Record<string, number> = {}
  for (const row of counts || []) {
    countMap[row.category_id] = Number(row.count)
  }

  return (cats || []).map((row) => ({
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    description: row.description as string,
    icon: row.icon as string,
    productCount: countMap[row.id] ?? 0,
    image: row.image as string,
  }))
}

export async function fetchProducts(params?: {
  categoryId?: string
  search?: string
  page?: number
  perPage?: number
}): Promise<{ data: Product[]; total: number; page: number; perPage: number }> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products_additions')
    .select('*')
    .order('created_at', { ascending: false })

  let all: Product[] = (data || []).map(rowToProduct)

  if (params?.categoryId) all = all.filter((p) => p.categoryId === params.categoryId)
  if (params?.search) {
    const q = params.search.toLowerCase()
    all = all.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q)
    )
  }

  const total = all.length
  const page = params?.page ?? 1
  const perPage = params?.perPage ?? 12
  const start = (page - 1) * perPage

  return { data: all.slice(start, start + perPage), total, page, perPage }
}
