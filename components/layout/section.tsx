import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  container?: boolean
}

export function Section({ children, className, id, container = true }: SectionProps) {
  return (
    <section id={id} className={cn('py-16 lg:py-24', className)}>
      {container ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      ) : (
        children
      )}
    </section>
  )
}

export function SectionHeader({
  label,
  title,
  description,
  align = 'center',
  className,
  light = false,
}: {
  label?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
  light?: boolean
}) {
  return (
    <div className={cn('mb-12', align === 'center' && 'text-center', className)}>
      {label && (
        <span className={cn(
          'block text-xs font-bold uppercase tracking-[0.2em] mb-3',
          light ? 'text-[#b8c4ff]' : 'text-[#00288e]'
        )}>
          {label}
        </span>
      )}
      <h2 className={cn(
        'text-3xl lg:text-4xl font-extrabold tracking-tight mb-3',
        light ? 'text-white' : 'text-[#191c1e]'
      )}>
        {title}
      </h2>
      {label && (
        <div className={cn(
          'h-1 w-14 rounded-full mb-5',
          align === 'center' ? 'mx-auto' : '',
          light ? 'bg-[#b8c4ff]' : 'bg-[#00288e]'
        )} />
      )}
      {description && (
        <p className={cn(
          'text-lg leading-relaxed',
          light ? 'text-white/60' : 'text-[#444653]',
          align === 'center' && 'max-w-2xl mx-auto'
        )}>
          {description}
        </p>
      )}
    </div>
  )
}
