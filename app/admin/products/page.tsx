import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Product } from '@/lib/schemas/product'
import { deleteProduct } from '@/lib/admin/actions'
import { DeleteButton } from '@/components/admin/delete-button'
import { Plus, Pencil, ImageOff } from 'lucide-react'

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

export default async function AdminProductsPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products_additions')
    .select('*')
    .order('created_at', { ascending: false })

  const products = (data || []).map(rowToProduct)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Products</h1>
          <p className="text-slate-500 text-sm mt-0.5">{products.length} total products</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {products.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="mb-3">No products yet.</p>
            <Link href="/admin/products/new" className="text-blue-600 font-medium hover:underline">
              Add your first product →
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell w-16">Image</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Product</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Category</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">SKU</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Stock</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 hidden sm:table-cell">
                    {product.image ? (
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0">
                        <Image src={product.image} alt={product.name} fill className="object-cover" sizes="40px" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-lg border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-300 flex-shrink-0">
                        <ImageOff className="w-4 h-4" />
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-slate-900 truncate max-w-xs">{product.name}</p>
                      {product.badge && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-medium flex-shrink-0">
                          {product.badge}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell text-slate-500 text-xs">{product.categoryName}</td>
                  <td className="px-5 py-3 hidden lg:table-cell text-slate-400 font-mono text-xs">{product.sku}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                      >
                        <Pencil className="w-3 h-3" /> Edit
                      </Link>
                      <DeleteButton action={deleteProduct.bind(null, product.id)} confirmMessage="Delete this product?" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
