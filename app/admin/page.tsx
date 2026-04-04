import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { FileText, Briefcase, Package, Tag, ArrowRight } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [
    { count: postCount },
    { count: projectCount },
    { count: productCount },
    { count: categoryCount },
    { data: recentPostsRaw },
    { data: recentProjectsRaw },
  ] = await Promise.all([
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('products_additions').select('*', { count: 'exact', head: true }),
    supabase.from('categories_additions').select('*', { count: 'exact', head: true }),
    supabase.from('blog_posts').select('id, title, published').order('date', { ascending: false }).limit(5),
    supabase.from('projects').select('id, title, status').order('featured', { ascending: false }).limit(5),
  ])

  const stats = [
    { label: 'Blog Posts', value: postCount ?? 0, icon: FileText, href: '/admin/blog', color: 'bg-purple-50 text-purple-700' },
    { label: 'Projects', value: projectCount ?? 0, icon: Briefcase, href: '/admin/projects', color: 'bg-blue-50 text-blue-700' },
    { label: 'Products', value: productCount ?? 0, icon: Package, href: '/admin/products', color: 'bg-green-50 text-green-700' },
    { label: 'Categories', value: categoryCount ?? 0, icon: Tag, href: '/admin/categories', color: 'bg-amber-50 text-amber-700' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Welcome back. Here is an overview of your website content.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl border border-slate-200 p-5 hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <div className={`inline-flex p-2.5 rounded-lg ${stat.color} mb-3`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-3xl font-black text-slate-900 mb-0.5">{stat.value}</p>
            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-900">Recent Blog Posts</h2>
            <Link href="/admin/blog" className="text-xs text-blue-600 font-medium flex items-center gap-1 hover:underline">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {!recentPostsRaw?.length ? (
            <p className="text-sm text-slate-400 py-4 text-center">No posts yet.</p>
          ) : (
            <ul className="space-y-3">
              {recentPostsRaw.map((post) => (
                <li key={post.id} className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-slate-700 font-medium truncate">{post.title}</span>
                  <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold ${post.published ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <Link
            href="/admin/blog/new"
            className="mt-5 w-full flex items-center justify-center gap-2 text-sm text-blue-600 font-medium border border-blue-200 rounded-lg py-2 hover:bg-blue-50 transition-colors"
          >
            + New Post
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-900">Recent Projects</h2>
            <Link href="/admin/projects" className="text-xs text-blue-600 font-medium flex items-center gap-1 hover:underline">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {!recentProjectsRaw?.length ? (
            <p className="text-sm text-slate-400 py-4 text-center">No projects yet.</p>
          ) : (
            <ul className="space-y-3">
              {recentProjectsRaw.map((project) => (
                <li key={project.id} className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-slate-700 font-medium truncate">{project.title}</span>
                  <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold ${project.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {project.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <Link
            href="/admin/projects/new"
            className="mt-5 w-full flex items-center justify-center gap-2 text-sm text-blue-600 font-medium border border-blue-200 rounded-lg py-2 hover:bg-blue-50 transition-colors"
          >
            + New Project
          </Link>
        </div>
      </div>
    </div>
  )
}
