import type { Category } from '@/lib/schemas/category'

// Simulates API — replace with real API when backend is ready

export async function getCategories(): Promise<Category[]> {
  const res = await fetch('/api/categories')
  return res.json()
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories()
  return categories.find((c) => c.slug === slug) ?? null
}

