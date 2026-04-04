import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { BlogPost } from '@/lib/schemas/blog'
import { deleteBlogPost, toggleBlogPublished } from '@/lib/admin/actions'
import { DeleteButton } from '@/components/admin/delete-button'
import { Plus, Pencil, Eye, EyeOff } from 'lucide-react'

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

export default async function AdminBlogPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .order('date', { ascending: false })

  const posts = (data || []).map(rowToPost)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Blog Posts</h1>
          <p className="text-slate-500 text-sm mt-0.5">{posts.length} total posts</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {posts.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="mb-3">No blog posts yet.</p>
            <Link href="/admin/blog/new" className="text-blue-600 font-medium hover:underline">
              Create your first post →
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Title</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Category</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Author</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-900 truncate max-w-xs">{post.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {new Date(post.date).toLocaleDateString('en-GB')} · {post.readTime} min read
                    </p>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell text-slate-500">{post.category}</td>
                  <td className="px-5 py-4 hidden lg:table-cell text-slate-500 truncate max-w-[150px]">{post.author}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${post.published ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <form action={toggleBlogPublished.bind(null, post.id)}>
                        <button type="submit" title={post.published ? 'Unpublish' : 'Publish'} className="p-2 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors">
                          {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </form>
                      <Link href={`/admin/blog/${post.id}/edit`} title="Edit" className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeleteButton action={deleteBlogPost.bind(null, post.id)} confirmMessage="Delete this post?" />
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
