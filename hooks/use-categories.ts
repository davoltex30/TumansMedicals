'use client'

import { useQuery } from '@tanstack/react-query'
import { getCategories, getCategoryBySlug } from '@/lib/api/categories'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 15 * 60 * 1000,
  })
}

export function useCategoryBySlug(slug: string) {
  return useQuery({
    queryKey: ['category-slug', slug],
    queryFn: () => getCategoryBySlug(slug),
    enabled: !!slug,
    staleTime: 15 * 60 * 1000,
  })
}
