import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { deleteCategory } from '@/lib/admin/actions'
import { DeleteButton } from '@/components/admin/delete-button'
import { Plus, Pencil } from 'lucide-react'

export default async function AdminCategoriesPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('categories_additions')
    .select('*')
    .order('name', { ascending: true })

  const categories = data || []

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Category</h1>
          <p className="text-slate-500 text-sm mt-0.5">{categories.length} total</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" /> New Category
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {categories.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="mb-3">No categories yet.</p>
            <Link href="/admin/categories/new" className="text-blue-600 font-medium hover:underline">
              Add your first category →
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Image</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Name</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Description</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                      <Image
                        src={cat.image || '/No_Image_Available.jpg'}
                        alt={cat.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <p className="font-medium text-slate-900">{cat.name}</p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{cat.slug}</p>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell text-slate-500 text-xs max-w-xs">
                    <p className="line-clamp-2">{cat.description}</p>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/categories/${cat.id}/edit`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                      >
                        <Pencil className="w-3 h-3" /> Edit
                      </Link>
                      <DeleteButton
                        action={deleteCategory.bind(null, cat.id)}
                        confirmMessage="Delete this category?"
                      />
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
