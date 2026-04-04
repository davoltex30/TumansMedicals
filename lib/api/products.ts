import type { Product } from '@/lib/schemas/product'

// Simulates API — replace with real API when backend is ready

export async function getProducts(params?: {
  categoryId?: string
  search?: string
  page?: number
  perPage?: number
}): Promise<{ data: Product[]; total: number; page: number; perPage: number }> {
  const url = new URL('/api/products', window.location.origin)
  if (params?.categoryId) url.searchParams.set('categoryId', params.categoryId)
  if (params?.search) url.searchParams.set('search', params.search)
  if (params?.page) url.searchParams.set('page', String(params.page))
  if (params?.perPage) url.searchParams.set('perPage', String(params.perPage))
  const res = await fetch(url.toString())
  return res.json()
}
