import { categories } from '@/data/categories'
import type { Category } from '@/lib/schemas/category'

export async function getCategories(): Promise<Category[]> {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return categories
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  await new Promise((resolve) => setTimeout(resolve, 150))
  return categories.find((c) => c.slug === slug) ?? null
}
