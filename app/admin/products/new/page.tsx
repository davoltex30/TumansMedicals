import { createProduct } from '@/lib/admin/actions'
import { createClient } from '@/lib/supabase/server'
import { ImageUploadField } from '@/components/admin/image-upload-field'
import { SpecificationsField } from '@/components/admin/specifications-field'
import { SubmitButton } from '@/components/admin/submit-button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function NewProductPage() {
  const supabase = await createClient()
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
        <h1 className="text-2xl font-black text-slate-900">Add Product</h1>
      </div>

      <form action={createProduct} className="max-w-3xl space-y-5">
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <h2 className="font-bold text-slate-900 text-base">Product Information</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Product Name *</label>
            <input name="name" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Full product name" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Category *</label>
              <select name="categoryId" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Category Display Name *</label>
              <input name="categoryName" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Surgical Equipment" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Badge <span className="text-slate-400">(optional)</span></label>
            <select name="badge" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="">None</option>
              <option value="New">New</option>
              <option value="Featured">Featured</option>
              <option value="Best Seller">Best Seller</option>
              <option value="Sale">Sale</option>
            </select>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">SKU</span> will be auto-generated from the category and product name when saved.
          </div>

          <ImageUploadField name="image" label="Product Image" />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Short Description *</label>
            <input name="shortDescription" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="One-line summary for product cards" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Description *</label>
            <textarea name="description" required rows={5} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Detailed product description" />
          </div>

          <SpecificationsField />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Key Features <span className="text-slate-400">(one per line)</span></label>
            <textarea name="features" rows={4} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Feature one&#10;Feature two&#10;Feature three" />
          </div>

          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="inStock" value="true" defaultChecked className="w-4 h-4 rounded accent-blue-600" />
              <span className="text-sm font-medium text-slate-700">In Stock</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          <SubmitButton label="Add Product" loadingLabel="Creating…" />
          <Link href="/admin/products" className="px-6 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
