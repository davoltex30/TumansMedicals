'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X, LayoutGrid } from 'lucide-react'
import { useFilterStore } from '@/store/filter-store'
import { useCategories } from '@/hooks/use-categories'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export function ProductFilters({ totalCount }: { totalCount?: number }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { selectedCategory, searchQuery, setCategory, setSearch, resetFilters } = useFilterStore()
  const { data: categories } = useCategories()

  useEffect(() => {
    const cat = searchParams.get('category')
    const q = searchParams.get('q')
    if (cat) setCategory(cat)
    if (q) setSearch(q)
  }, []) // eslint-disable-line

  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedCategory) params.set('category', selectedCategory)
    if (searchQuery) params.set('q', searchQuery)
    router.replace(`/products?${params.toString()}`, { scroll: false })
  }, [selectedCategory, searchQuery]) // eslint-disable-line

  const hasFilters = !!selectedCategory || !!searchQuery

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-[#191c1e]">Browse Products</h3>
        <p className="text-xs text-[#757684] uppercase tracking-widest mt-0.5">Filter by category</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#757684] pointer-events-none" />
        <Input
          type="search"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-11 bg-white border-[#c4c5d5] text-[#191c1e] placeholder:text-[#757684] focus:border-[#00288e] focus:ring-[#00288e]"
          aria-label="Search products"
        />
      </div>

      <div>
        <p className="text-xs text-[#757684] uppercase tracking-widest mb-3 font-semibold">Categories</p>
        <div className="space-y-1">
          <button
            onClick={() => setCategory(null)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left',
              !selectedCategory
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-500 hover:bg-slate-100 hover:translate-x-1'
            )}
          >
            <LayoutGrid className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1 font-semibold">All Products</span>
            {totalCount !== undefined && (
              <span className={cn('text-xs tabular-nums', !selectedCategory ? 'text-blue-500' : 'text-[#c4c5d5]')}>
                {totalCount}
              </span>
            )}
          </button>

          {categories?.map((cat) => {
            const isActive = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left',
                  isActive
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-500 hover:bg-slate-100 hover:translate-x-1'
                )}
              >
                <span className="flex-1">{cat.name}</span>
                <span className={cn('text-xs tabular-nums', isActive ? 'text-blue-500' : 'text-[#c4c5d5]')}>
                  {cat.productCount}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {hasFilters && (
        <button
          onClick={resetFilters}
          className="flex items-center gap-1.5 text-sm text-[#757684] hover:text-red-600 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          Clear filters
        </button>
      )}

      <div className="pt-4 border-t border-[#e0e3e5]">
        <Link
          href="/contact"
          className="block w-full text-center bg-[#00288e] text-white px-4 py-3 rounded-lg font-bold text-sm hover:bg-[#1e40af] transition-all"
        >
          Request a Quote
        </Link>
      </div>
    </div>
  )
}
