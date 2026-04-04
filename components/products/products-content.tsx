'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useFilterStore } from '@/store/filter-store'
import { useProducts } from '@/hooks/use-products'
import { ProductGrid } from './product-grid'
import { ProductFilters } from './product-filters'
import { Section } from '@/components/layout/section'

export function ProductsContent() {
  const { selectedCategory, searchQuery, currentPage, setPage } = useFilterStore()
  const { data, isLoading } = useProducts({
    categoryId: selectedCategory || undefined,
    search: searchQuery || undefined,
    page: currentPage,
    perPage: 12,
  })
  const { data: allData } = useProducts({ perPage: 1 })

  return (
    <>
      {/* Page header */}
      <section className="pt-28 pb-10 bg-gradient-to-b from-muted/40 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">All Products</h1>
          <p className="text-muted-foreground">
            {data ? `${data.total} products available` : 'Browse our complete catalog'}
          </p>
        </div>
      </section>

      <Section>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <ProductFilters totalCount={allData?.total} />
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            <ProductGrid
              products={data?.data || []}
              isLoading={isLoading}
              emptyMessage="No products match your search. Try adjusting the filters."
            />

            {/* Pagination */}
            {data && data.total > data.perPage && (() => {
              const totalPages = Math.ceil(data.total / data.perPage)
              const page = data.page

              // Build page numbers: always show first, last, current ±1, with ellipsis gaps
              const pages: (number | '...')[] = []
              const range = new Set([1, totalPages, page - 1, page, page + 1].filter(n => n >= 1 && n <= totalPages))
              const sorted = Array.from(range).sort((a, b) => a - b)
              sorted.forEach((n, i) => {
                if (i > 0 && n - (sorted[i - 1] as number) > 1) pages.push('...')
                pages.push(n)
              })

              return (
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-[#757684]">
                    Showing {(page - 1) * data.perPage + 1}–{Math.min(page * data.perPage, data.total)} of {data.total} products
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => { setPage(page - 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                      disabled={page === 1}
                      className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#e0e3e5] text-[#191c1e] hover:border-[#00288e] hover:text-[#00288e] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {pages.map((p, i) =>
                      p === '...' ? (
                        <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-sm text-[#757684]">…</span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                          className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${
                            p === page
                              ? 'bg-[#00288e] text-white'
                              : 'border border-[#e0e3e5] text-[#191c1e] hover:border-[#00288e] hover:text-[#00288e]'
                          }`}
                          aria-label={`Page ${p}`}
                          aria-current={p === page ? 'page' : undefined}
                        >
                          {p}
                        </button>
                      )
                    )}

                    <button
                      onClick={() => { setPage(page + 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                      disabled={page === totalPages}
                      className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#e0e3e5] text-[#191c1e] hover:border-[#00288e] hover:text-[#00288e] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      aria-label="Next page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      </Section>
    </>
  )
}
