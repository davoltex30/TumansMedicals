import { createClient } from '@/lib/supabase/server'
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

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products_additions')
    .select('*')
    .eq('slug', slug)
    .single()
  return data ? rowToProduct(data) : null
}

export async function getRelatedProducts(categoryId: string, excludeId: string): Promise<Product[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products_additions')
    .select('*')
    .eq('category_id', categoryId)
    .neq('id', excludeId)
    .limit(4)
  return (data || []).map(rowToProduct)
}
