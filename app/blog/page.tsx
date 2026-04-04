import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import type { BlogPost } from '@/lib/schemas/blog'
import { BlogCard } from '@/components/blog/blog-card'

export const metadata: Metadata = {
  title: 'Blog – Medical Insights & Company News',
  description:
    'Stay up to date with the latest in medical equipment, healthcare trends in Cameroon, and news from Tumans Medicals SARL.',
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

export default async function BlogPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('date', { ascending: false })

  const posts = (data || []).map(rowToPost)

  return (
    <div className="pt-24 pb-16">
      <div className="bg-gradient-to-br from-blue-950 to-blue-800 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-blue-300 font-semibold text-sm tracking-widest uppercase mb-3">
            Insights & Updates
          </p>
          <h1 className="text-4xl lg:text-5xl font-black mb-4">Our Blog</h1>
          <p className="text-blue-200 max-w-xl mx-auto text-lg">
            Medical equipment guides, company news, and healthcare insights from the Tumans Medicals team.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length === 0 ? (
          <p className="text-center text-slate-500 py-16">No posts published yet. Check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
