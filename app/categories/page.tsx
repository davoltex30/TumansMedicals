import type { Metadata } from 'next'
import { CategoriesContent } from '@/components/categories/categories-content'

export const metadata: Metadata = {
  title: 'Product Categories',
  description: 'Explore our comprehensive range of medical equipment categories — from surgical instruments to laboratory diagnostics.',
}

export default function CategoriesPage() {
  return <CategoriesContent />
}
