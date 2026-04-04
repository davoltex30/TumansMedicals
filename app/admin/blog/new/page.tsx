import { createBlogPost } from '@/lib/admin/actions'
import { ImageUploadField } from '@/components/admin/image-upload-field'
import { SubmitButton } from '@/components/admin/submit-button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NewBlogPostPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/blog" className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-2xl font-black text-slate-900">New Blog Post</h1>
      </div>

      <form action={createBlogPost} className="max-w-3xl space-y-5">
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <h2 className="font-bold text-slate-900 text-base">Post Details</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Title *</label>
            <input name="title" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Post title" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Author *</label>
              <input name="author" required defaultValue="Tumans Medicals Editorial Team" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Category *</label>
              <input name="category" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Medical Equipment" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Tags <span className="text-slate-400">(comma-separated)</span></label>
            <input name="tags" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Surgery, Equipment, Healthcare" />
          </div>

          <ImageUploadField name="image" label="Featured Image" />
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <h2 className="font-bold text-slate-900 text-base">Content</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Excerpt *</label>
            <textarea name="excerpt" required rows={2} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="A short summary of the post (1–2 sentences)" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Content *</label>
            <textarea name="content" required rows={16} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono" placeholder="Write your post content here. Separate paragraphs with a blank line." />
            <p className="text-xs text-slate-400 mt-1">Separate paragraphs with a blank line.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-bold text-slate-900 text-base mb-4">Publishing</h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="published" value="true" className="w-4 h-4 rounded accent-blue-600" />
            <span className="text-sm font-medium text-slate-700">Publish immediately</span>
          </label>
          <p className="text-xs text-slate-400 mt-1 ml-7">If unchecked, the post will be saved as a draft.</p>
        </div>

        <div className="flex gap-3">
          <SubmitButton label="Create Post" loadingLabel="Creating…" />
          <Link href="/admin/blog" className="px-6 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
