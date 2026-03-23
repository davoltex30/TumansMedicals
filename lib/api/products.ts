import { products } from '@/data/products'
import type { Product } from '@/lib/schemas/product'

// Simulates API — replace baseURL calls with real API when backend is ready

export async function getProducts(params?: {
  categoryId?: string
  search?: string
  page?: number
  perPage?: number
}): Promise<{ data: Product[]; total: number; page: number; perPage: number }> {
  await new Promise((resolve) => setTimeout(resolve, 300)) // simulate latency

  let filtered = [...products]

  if (params?.categoryId) {
    filtered = filtered.filter((p) => p.categoryId === params.categoryId)
  }

  if (params?.search) {
    const q = params.search.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q)
    )
  }

  const page = params?.page ?? 1
  const perPage = params?.perPage ?? 12
  const start = (page - 1) * perPage
  const data = filtered.slice(start, start + perPage)

  return { data, total: filtered.length, page, perPage }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return products.find((p) => p.slug === slug) ?? null
}

export async function getProductById(id: string): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return products.find((p) => p.id === id) ?? null
}

export async function getRelatedProducts(
  categoryId: string,
  excludeId: string
): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return products
    .filter((p) => p.categoryId === categoryId && p.id !== excludeId)
    .slice(0, 4)
}
