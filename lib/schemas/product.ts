import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  categoryId: z.string(),
  categoryName: z.string(),
  description: z.string(),
  shortDescription: z.string(),
  price: z.number().optional(),
  priceOnRequest: z.boolean().optional(),
  image: z.string(),
  images: z.array(z.string()),
  specifications: z.record(z.string(), z.string()),
  features: z.array(z.string()),
  inStock: z.boolean(),
  badge: z.string().optional(),
  sku: z.string(),
})

export type Product = z.infer<typeof ProductSchema>

export const ProductsResponseSchema = z.object({
  data: z.array(ProductSchema),
  total: z.number(),
  page: z.number(),
  perPage: z.number(),
})

export type ProductsResponse = z.infer<typeof ProductsResponseSchema>

export const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  company: z.string().min(1, 'Company name is required'),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type ContactFormData = z.infer<typeof ContactFormSchema>
