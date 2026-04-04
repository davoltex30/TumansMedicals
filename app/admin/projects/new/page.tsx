import { createProject } from '@/lib/admin/actions'
import { ImageUploadField } from '@/components/admin/image-upload-field'
import { SubmitButton } from '@/components/admin/submit-button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NewProjectPage() {
  const currentYear = new Date().getFullYear().toString()

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/projects" className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-2xl font-black text-slate-900">New Project</h1>
      </div>

      <form action={createProject} className="max-w-3xl space-y-5">
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <h2 className="font-bold text-slate-900 text-base">Project Details</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Project Title *</label>
            <input name="title" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Surgical Theater Outfitting – General Hospital" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Client *</label>
              <input name="client" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Hospital or organization name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Location *</label>
              <input name="location" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="City, Region" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Category *</label>
              <select name="category" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
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
              <select name="status" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option value="completed">Completed</option>
                <option value="ongoing">Ongoing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Year *</label>
              <input name="year" required defaultValue={currentYear} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="2024" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Technologies / Equipment <span className="text-slate-400">(comma-separated)</span></label>
            <input name="technologies" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="LED Operating Lights, Patient Monitors, Anesthesia Machines" />
          </div>

          <ImageUploadField name="image" label="Cover Image" />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Description *</label>
            <textarea name="description" required rows={5} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Describe the scope of work, what was delivered, and the outcome." />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="featured" value="true" className="w-4 h-4 rounded accent-blue-600" />
            <span className="text-sm font-medium text-slate-700">Feature this project on the Projects page</span>
          </label>
        </div>

        <div className="flex gap-3">
          <SubmitButton label="Create Project" loadingLabel="Creating…" />
          <Link href="/admin/projects" className="px-6 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
