import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Project } from '@/lib/schemas/project'
import { deleteProject } from '@/lib/admin/actions'
import { DeleteButton } from '@/components/admin/delete-button'
import { Plus, Pencil, Star } from 'lucide-react'

function rowToProject(row: Record<string, unknown>): Project {
  return {
    id: row.id as string,
    title: row.title as string,
    slug: row.slug as string,
    description: row.description as string,
    client: row.client as string,
    location: row.location as string,
    image: row.image as string,
    images: (row.images as string[]) || [],
    status: row.status as 'completed' | 'ongoing',
    year: row.year as string,
    category: row.category as string,
    technologies: (row.technologies as string[]) || [],
    featured: row.featured as boolean,
  }
}

export default async function AdminProjectsPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('featured', { ascending: false })

  const projects = (data || []).map(rowToProject)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Projects</h1>
          <p className="text-slate-500 text-sm mt-0.5">{projects.length} total projects</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" /> New Project
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {projects.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="mb-3">No projects yet.</p>
            <Link href="/admin/projects/new" className="text-blue-600 font-medium hover:underline">
              Add your first project →
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Title</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Client</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Category</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-slate-900 truncate max-w-xs">{project.title}</p>
                      {project.featured && <Star className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" fill="currentColor" />}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{project.location} · {project.year}</p>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell text-slate-500 truncate max-w-[200px]">{project.client}</td>
                  <td className="px-5 py-4 hidden lg:table-cell text-slate-500">{project.category}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${project.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/projects/${project.id}/edit`} title="Edit" className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeleteButton action={deleteProject.bind(null, project.id)} confirmMessage="Delete this project?" />
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
