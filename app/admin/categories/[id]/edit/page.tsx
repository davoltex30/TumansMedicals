import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { updateCategory } from '@/lib/admin/actions'
import { ImageUploadField } from '@/components/admin/image-upload-field'
import { SubmitButton } from '@/components/admin/submit-button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditCategoryPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('categories_additions')
    .select('*')
    .eq('id', id)
    .single()
  if (!data) notFound()

  const updateAction = updateCategory.bind(null, id)

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/categories" className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-2xl font-black text-slate-900">Edit Category</h1>
      </div>

      <form action={updateAction} className="max-w-2xl space-y-5">
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Category Name *</label>
            <input name="name" required defaultValue={data.name} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Description *</label>
            <textarea name="description" required rows={3} defaultValue={data.description} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <ImageUploadField name="image" label="Category Image" defaultValue={data.image} />
        </div>

        <div className="flex gap-3">
          <SubmitButton label="Save Changes" loadingLabel="Saving…" />
          <Link href="/admin/categories" className="px-6 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
