import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { BlogPost } from '@/lib/schemas/blog'
import { updateBlogPost } from '@/lib/admin/actions'
import { ImageUploadField } from '@/components/admin/image-upload-field'
import { SubmitButton } from '@/components/admin/submit-button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface Props {
  params: Promise<{ id: string }>
}

function rowToPost(row: Record<string, unknown>): BlogPost {
  return {
    id: row.id as string,
    title: row.title as string,
    slug: row.slug as string,
    excerpt: row.excerpt as string,
    content: row.content as string,
    author: row.author as string,
    date: row.date as string,
    image: row.image as string,
    tags: (row.tags as string[]) || [],
    category: row.category as string,
    published: row.published as boolean,
    readTime: row.read_time as number,
  }
}

export default async function EditBlogPostPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('blog_posts').select('*').eq('id', id).single()
  if (!data) notFound()

  const post = rowToPost(data)
  const updateAction = updateBlogPost.bind(null, id)

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/blog" className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-2xl font-black text-slate-900">Edit Blog Post</h1>
      </div>

      <form action={updateAction} className="max-w-3xl space-y-5">
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <h2 className="font-bold text-slate-900 text-base">Post Details</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Title *</label>
            <input name="title" required defaultValue={post.title} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Author *</label>
              <input name="author" required defaultValue={post.author} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Category *</label>
              <input name="category" required defaultValue={post.category} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Tags <span className="text-slate-400">(comma-separated)</span></label>
            <input name="tags" defaultValue={post.tags.join(', ')} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <ImageUploadField name="image" label="Featured Image" defaultValue={post.image} />
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <h2 className="font-bold text-slate-900 text-base">Content</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Excerpt *</label>
            <textarea name="excerpt" required rows={2} defaultValue={post.excerpt} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Content *</label>
            <textarea name="content" required rows={16} defaultValue={post.content} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-bold text-slate-900 text-base mb-4">Publishing</h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="published" value="true" defaultChecked={post.published} className="w-4 h-4 rounded accent-blue-600" />
            <span className="text-sm font-medium text-slate-700">Published</span>
          </label>
        </div>

        <div className="flex gap-3">
          <SubmitButton label="Save Changes" loadingLabel="Saving…" />
          <Link href="/admin/blog" className="px-6 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
