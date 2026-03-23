import { create } from 'zustand'

interface FilterState {
  selectedCategory: string | null
  searchQuery: string
  currentPage: number
  setCategory: (categoryId: string | null) => void
  setSearch: (query: string) => void
  setPage: (page: number) => void
  resetFilters: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedCategory: null,
  searchQuery: '',
  currentPage: 1,
  setCategory: (categoryId) => set({ selectedCategory: categoryId, currentPage: 1 }),
  setSearch: (query) => set({ searchQuery: query, currentPage: 1 }),
  setPage: (page) => set({ currentPage: page }),
  resetFilters: () => set({ selectedCategory: null, searchQuery: '', currentPage: 1 }),
}))
