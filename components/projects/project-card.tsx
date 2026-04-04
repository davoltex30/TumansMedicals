import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import type { Project } from '@/lib/schemas/project'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized={project.image.startsWith('/')}
        />
        <div className="absolute top-3 right-3">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
              project.status === 'completed'
                ? 'bg-green-100 text-green-700'
                : 'bg-amber-100 text-amber-700'
            }`}
          >
            {project.status === 'completed' ? 'Completed' : 'Ongoing'}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">{project.category}</Badge>
          <span className="text-xs text-slate-400">{project.year}</span>
        </div>
        <h3 className="font-bold text-slate-900 text-base leading-snug mb-1 line-clamp-2">
          {project.title}
        </h3>
        <p className="text-sm text-slate-500 mb-3">{project.client}</p>
        <p className="text-xs text-slate-400 line-clamp-3 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs text-slate-400 px-2 py-0.5">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
