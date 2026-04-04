import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Project } from '@/lib/schemas/project'
import { updateProject } from '@/lib/admin/actions'
import { ImageUploadField } from '@/components/admin/image-upload-field'
import { SubmitButton } from '@/components/admin/submit-button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface Props {
  params: Promise<{ id: string }>
}

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

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('projects').select('*').eq('id', id).single()
  if (!data) notFound()

  const project = rowToProject(data)
  const updateAction = updateProject.bind(null, id)

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/projects" className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-2xl font-black text-slate-900">Edit Project</h1>
      </div>

      <form action={updateAction} className="max-w-3xl space-y-5">
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <h2 className="font-bold text-slate-900 text-base">Project Details</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Project Title *</label>
            <input name="title" required defaultValue={project.title} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Client *</label>
              <input name="client" required defaultValue={project.client} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Location *</label>
              <input name="location" required defaultValue={project.location} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Category *</label>
              <select name="category" defaultValue={project.category} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option value="Surgical">Surgical</option>
                <option value="Laboratory">Laboratory</option>
                <option value="Diagnostics">Diagnostics</option>
                <option value="Emergency">Emergency</option>
                <option value="Medical Furniture">Medical Furniture</option>
                <option value="Consumables">Consumables</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Status *</label>
              <select name="status" defaultValue={project.status} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option value="completed">Completed</option>
                <option value="ongoing">Ongoing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Year *</label>
              <input name="year" required defaultValue={project.year} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Technologies / Equipment</label>
            <input name="technologies" defaultValue={project.technologies.join(', ')} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <ImageUploadField name="image" label="Cover Image" defaultValue={project.image} />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Description *</label>
            <textarea name="description" required rows={5} defaultValue={project.description} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="featured" value="true" defaultChecked={project.featured} className="w-4 h-4 rounded accent-blue-600" />
            <span className="text-sm font-medium text-slate-700">Feature this project</span>
          </label>
        </div>

        <div className="flex gap-3">
          <SubmitButton label="Save Changes" loadingLabel="Saving…" />
          <Link href="/admin/projects" className="px-6 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
