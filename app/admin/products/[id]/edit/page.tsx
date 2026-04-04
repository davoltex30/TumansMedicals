import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Product } from '@/lib/schemas/product'
import { updateProduct } from '@/lib/admin/actions'
import { ImageUploadField } from '@/components/admin/image-upload-field'
import { SpecificationsField } from '@/components/admin/specifications-field'
import { SubmitButton } from '@/components/admin/submit-button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface Props {
  params: Promise<{ id: string }>
}

function rowToProduct(row: Record<string, unknown>): Product {
  return {
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    categoryId: row.category_id as string,
    categoryName: row.category_name as string,
    description: row.description as string,
    shortDescription: row.short_description as string,
    priceOnRequest: row.price_on_request as boolean,
    image: row.image as string,
    images: (row.images as string[]) || [],
    specifications: (row.specifications as Record<string, string>) || {},
    features: (row.features as string[]) || [],
    inStock: row.in_stock as boolean,
    badge: (row.badge as string) || undefined,
    sku: row.sku as string,
  }
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('products_additions')
    .select('*')
    .eq('id', id)
    .single()
  if (!data) notFound()

  const product = rowToProduct(data)
  const updateAction = updateProduct.bind(null, id)

  // Fetch categories for the dropdown
  const { data: cats } = await supabase
    .from('categories_additions')
    .select('id, name')
    .order('name', { ascending: true })
  const categories = cats || []

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/products" className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-2xl font-black text-slate-900">Edit Product</h1>
      </div>

      <form action={updateAction} className="max-w-3xl space-y-5">
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <h2 className="font-bold text-slate-900 text-base">Product Information</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Product Name *</label>
            <input name="name" required defaultValue={product.name} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Category *</label>
              <select name="categoryId" defaultValue={product.categoryId} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Category Display Name *</label>
              <input name="categoryName" required defaultValue={product.categoryName} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Badge</label>
            <select name="badge" defaultValue={product.badge || ''} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="">None</option>
              <option value="New">New</option>
              <option value="Featured">Featured</option>
              <option value="Best Seller">Best Seller</option>
              <option value="Sale">Sale</option>
            </select>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">SKU</p>
              <p className="text-sm font-mono font-semibold text-slate-800 mt-0.5">{product.sku}</p>
            </div>
          </div>

          <ImageUploadField name="image" label="Product Image" defaultValue={product.image} />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Short Description *</label>
            <input name="shortDescription" required defaultValue={product.shortDescription} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Description *</label>
            <textarea name="description" required rows={5} defaultValue={product.description} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <SpecificationsField defaultValue={product.specifications} />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Key Features <span className="text-slate-400">(one per line)</span></label>
            <textarea name="features" rows={4} defaultValue={product.features.join('\n')} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="inStock" value="true" defaultChecked={product.inStock} className="w-4 h-4 rounded accent-blue-600" />
              <span className="text-sm font-medium text-slate-700">In Stock</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          <SubmitButton label="Save Changes" loadingLabel="Saving…" />
          <Link href="/admin/products" className="px-6 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
