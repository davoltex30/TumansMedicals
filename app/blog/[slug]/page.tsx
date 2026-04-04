import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { BlogPost } from '@/lib/schemas/blog'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
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

async function getPost(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  return data ? rowToPost(data) : null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Post Not Found' }
  return { title: post.title, description: post.excerpt }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const formattedDate = new Date(post.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const paragraphs = post.content.split('\n\n').filter(Boolean)

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-blue-700 font-medium hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 mb-8">
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden bg-slate-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            unoptimized={post.image.startsWith('/')}
          />
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Badge variant="secondary">{post.category}</Badge>
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs text-slate-400">#{tag}</span>
          ))}
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-slate-500 mb-8 pb-8 border-b border-slate-100">
          <span className="font-medium">{post.author}</span>
          <span>·</span>
          <span>{formattedDate}</span>
          <span>·</span>
          <span>{post.readTime} min read</span>
        </div>

        <div className="prose prose-slate max-w-none">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-slate-700 leading-relaxed mb-5 text-base">
              {para}
            </p>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-blue-700 font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </article>
    </div>
  )
}
