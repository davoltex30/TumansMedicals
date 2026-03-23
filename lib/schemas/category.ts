import { z } from 'zod'

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  icon: z.string(),
  productCount: z.number(),
  image: z.string(),
})

export type Category = z.infer<typeof CategorySchema>
