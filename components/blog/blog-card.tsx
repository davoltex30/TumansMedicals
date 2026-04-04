import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import type { BlogPost } from '@/lib/schemas/blog'

export function BlogCard({ post }: { post: BlogPost }) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized={post.image.startsWith('/')}
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="text-xs font-medium">
            {post.category}
          </Badge>
          <span className="text-xs text-slate-400">{post.readTime} min read</span>
        </div>
        <h3 className="font-bold text-slate-900 text-lg leading-snug mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-3 mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{post.author}</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </Link>
  )
}
