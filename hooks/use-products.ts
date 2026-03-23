'use client'

import { useQuery } from '@tanstack/react-query'
import {
  getProducts,
  getProductById,
  getProductBySlug,
  getRelatedProducts,
} from '@/lib/api/products'

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

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  })
}

export function useProductBySlug(slug: string) {
  return useQuery({
    queryKey: ['product-slug', slug],
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  })
}

export function useRelatedProducts(categoryId: string, excludeId: string) {
  return useQuery({
    queryKey: ['related-products', categoryId, excludeId],
    queryFn: () => getRelatedProducts(categoryId, excludeId),
    enabled: !!categoryId && !!excludeId,
    staleTime: 10 * 60 * 1000,
  })
}
