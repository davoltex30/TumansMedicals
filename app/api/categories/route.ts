import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { Category } from '@/lib/schemas/category'

export const dynamic = 'force-dynamic'

export async function GET() {
  const supabase = await createClient()

  const [{ data: cats }, { data: counts }] = await Promise.all([
    supabase.from('categories_additions').select('*').order('name', { ascending: true }),
    supabase.rpc('get_product_counts_by_category'),
  ])

  // Build count lookup
  const countMap: Record<string, number> = {}
  for (const row of counts || []) {
    countMap[row.category_id] = Number(row.count)
  }

  const categories: Category[] = (cats || []).map((row) => ({
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    description: row.description as string,
    icon: row.icon as string,
    productCount: countMap[row.id] ?? 0,
    image: row.image as string,
  }))

  return NextResponse.json(categories)
}
