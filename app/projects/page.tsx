import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import type { Project } from '@/lib/schemas/project'
import { ProjectCard } from '@/components/projects/project-card'

export const metadata: Metadata = {
  title: 'Our Projects – Healthcare Delivery Across Cameroon',
  description:
    'Discover how Tumans Medicals SARL has equipped hospitals, clinics, and laboratories across Cameroon with world-class medical equipment.',
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

export default async function ProjectsPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('featured', { ascending: false })

  const projects = (data || []).map(rowToProject)
  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <div
        className="relative text-white py-28 px-4 overflow-hidden"
        style={{
          backgroundImage: 'url(/projects.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.58)' }} />
        {/* Accent stripe */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ backgroundColor: '#9e5862' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <p
            className="font-semibold text-sm tracking-widest uppercase mb-3"
            style={{ color: '#f4c2c8' }}
          >
            Our Work
          </p>
          <h1 className="text-4xl lg:text-6xl font-black mb-5 drop-shadow-lg">Projects</h1>
          <p className="max-w-xl mx-auto text-lg text-white/85 leading-relaxed">
            Real solutions delivered to hospitals, clinics, and laboratories across Cameroon and the Central African region.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Projects Completed', value: '50+' },
            { label: 'Healthcare Facilities', value: '30+' },
            { label: 'Regions Served', value: '8' },
            { label: 'Years of Experience', value: '10+' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-slate-100 p-5 text-center shadow-sm">
              <p className="text-3xl font-black mb-1" style={{ color: '#9e5862' }}>{stat.value}</p>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {featured.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-black mb-6" style={{ color: '#566955' }}>Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {others.length > 0 && (
          <div>
            <h2 className="text-2xl font-black mb-6" style={{ color: '#566955' }}>More Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {others.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {projects.length === 0 && (
          <p className="text-center text-slate-500 py-16">No projects yet. Check back soon.</p>
        )}
      </div>
    </div>
  )
}
