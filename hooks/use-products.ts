'use client'

import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/lib/api/products'

export function useProducts(params?: {
  categoryId?: string
  search?: string
  page?: number
  perPage?: number
}) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
    staleTime: 5 * 60 * 1000,
  })
}
