import { z } from 'zod'

export const BlogPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  content: z.string(),
  author: z.string(),
  date: z.string(),
  image: z.string(),
  tags: z.array(z.string()),
  category: z.string(),
  published: z.boolean(),
  readTime: z.number(),
})

export type BlogPost = z.infer<typeof BlogPostSchema>
