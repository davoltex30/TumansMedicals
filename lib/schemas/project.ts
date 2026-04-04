import { z } from 'zod'

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  client: z.string(),
  location: z.string(),
  image: z.string(),
  images: z.array(z.string()),
  status: z.enum(['completed', 'ongoing']),
  year: z.string(),
  category: z.string(),
  technologies: z.array(z.string()),
  featured: z.boolean(),
})

export type Project = z.infer<typeof ProjectSchema>
