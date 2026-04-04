'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import fs from 'fs'
import path from 'path'

// ─── HELPERS ───────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}`
}

function generateSku(categoryId: string, name: string): string {
  const catInitials = categoryId
    .split('-')
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
    .substring(0, 3)
  const prodInitials = name
    .trim()
    .split(/\s+/)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
    .substring(0, 3)
  const suffix = String(Date.now()).slice(-4)
  return `${catInitials}-${prodInitials}-${suffix}`
}

// ─── AUTH ──────────────────────────────────────────────────────────────────────

export async function loginAction(
  _prevState: { error: string } | undefined,
  formData: FormData
) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: 'Invalid email or password' }

  redirect('/admin')
}

export async function logoutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}

// ─── BLOG ──────────────────────────────────────────────────────────────────────

export async function createBlogPost(formData: FormData) {
  const supabase = await createClient()
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  const { error } = await supabase.from('blog_posts').insert({
    id: generateId('blog'),
    title,
    slug: slugify(title),
    excerpt: formData.get('excerpt') as string,
    content,
    author: formData.get('author') as string,
    date: new Date().toISOString(),
    image: (formData.get('image') as string) || '/Hero.jpg',
    tags: ((formData.get('tags') as string) || '').split(',').map((t) => t.trim()).filter(Boolean),
    category: formData.get('category') as string,
    published: formData.get('published') === 'true',
    read_time: Math.max(1, Math.ceil((content || '').split(' ').length / 200)),
  })
  if (error) throw new Error(error.message)

  revalidatePath('/blog')
  redirect('/admin/blog')
}

export async function updateBlogPost(id: string, formData: FormData) {
  const supabase = await createClient()
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const imageVal = formData.get('image') as string

  const { error } = await supabase
    .from('blog_posts')
    .update({
      title,
      slug: slugify(title),
      excerpt: formData.get('excerpt') as string,
      content,
      author: formData.get('author') as string,
      ...(imageVal && { image: imageVal }),
      tags: ((formData.get('tags') as string) || '').split(',').map((t) => t.trim()).filter(Boolean),
      category: formData.get('category') as string,
      published: formData.get('published') === 'true',
      read_time: Math.max(1, Math.ceil((content || '').split(' ').length / 200)),
    })
    .eq('id', id)
  if (error) throw new Error(error.message)

  revalidatePath('/blog')
  redirect('/admin/blog')
}

export async function deleteBlogPost(id: string) {
  const supabase = await createClient()
  await supabase.from('blog_posts').delete().eq('id', id)
  revalidatePath('/blog')
  redirect('/admin/blog')
}

export async function toggleBlogPublished(id: string) {
  const supabase = await createClient()
  const { data } = await supabase.from('blog_posts').select('published').eq('id', id).single()
  if (data) {
    await supabase.from('blog_posts').update({ published: !data.published }).eq('id', id)
    revalidatePath('/blog')
  }
  redirect('/admin/blog')
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

export async function createProject(formData: FormData) {
  const supabase = await createClient()
  const title = formData.get('title') as string

  const { error } = await supabase.from('projects').insert({
    id: generateId('proj'),
    title,
    slug: slugify(title),
    description: formData.get('description') as string,
    client: formData.get('client') as string,
    location: formData.get('location') as string,
    image: (formData.get('image') as string) || '/Hero.jpg',
    images: [],
    status: (formData.get('status') as string) || 'completed',
    year: (formData.get('year') as string) || new Date().getFullYear().toString(),
    category: formData.get('category') as string,
    technologies: ((formData.get('technologies') as string) || '').split(',').map((t) => t.trim()).filter(Boolean),
    featured: formData.get('featured') === 'true',
  })
  if (error) throw new Error(error.message)

  revalidatePath('/projects')
  redirect('/admin/projects')
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createClient()
  const title = formData.get('title') as string
  const imageVal = formData.get('image') as string

  const { error } = await supabase
    .from('projects')
    .update({
      title,
      slug: slugify(title),
      description: formData.get('description') as string,
      client: formData.get('client') as string,
      location: formData.get('location') as string,
      ...(imageVal && { image: imageVal }),
      status: (formData.get('status') as string) || 'completed',
      year: formData.get('year') as string,
      category: formData.get('category') as string,
      technologies: ((formData.get('technologies') as string) || '').split(',').map((t) => t.trim()).filter(Boolean),
      featured: formData.get('featured') === 'true',
    })
    .eq('id', id)
  if (error) throw new Error(error.message)

  revalidatePath('/projects')
  redirect('/admin/projects')
}

export async function deleteProject(id: string) {
  const supabase = await createClient()
  await supabase.from('projects').delete().eq('id', id)
  revalidatePath('/projects')
  redirect('/admin/projects')
}

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────

export async function createProduct(formData: FormData) {
  const supabase = await createClient()
  const name = formData.get('name') as string
  const categoryId = formData.get('categoryId') as string
  const specsRaw = formData.get('specifications') as string
  const specifications = specsRaw
    ? (() => { try { return JSON.parse(specsRaw) } catch { return {} } })()
    : {}

  const { error } = await supabase.from('products_additions').insert({
    id: generateId('prod'),
    name,
    slug: slugify(name),
    category_id: categoryId,
    category_name: formData.get('categoryName') as string,
    description: formData.get('description') as string,
    short_description: formData.get('shortDescription') as string,
    price_on_request: true,
    image: (formData.get('image') as string) || '/No_Image_Available.jpg',
    images: [],
    specifications,
    features: ((formData.get('features') as string) || '').split('\n').map((f) => f.trim()).filter(Boolean),
    in_stock: formData.get('inStock') === 'true',
    badge: (formData.get('badge') as string) || null,
    sku: generateSku(categoryId, name),
  })
  if (error) throw new Error(error.message)

  revalidatePath('/products')
  redirect('/admin/products')
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient()
  const name = formData.get('name') as string
  const imageVal = formData.get('image') as string
  const specsRaw = formData.get('specifications') as string
  const specifications = specsRaw
    ? (() => { try { return JSON.parse(specsRaw) } catch { return undefined } })()
    : undefined

  await supabase
    .from('products_additions')
    .update({
      name,
      slug: slugify(name),
      category_id: formData.get('categoryId') as string,
      category_name: formData.get('categoryName') as string,
      description: formData.get('description') as string,
      short_description: formData.get('shortDescription') as string,
      ...(imageVal && { image: imageVal }),
      ...(specifications !== undefined && { specifications }),
      features: ((formData.get('features') as string) || '').split('\n').map((f) => f.trim()).filter(Boolean),
      in_stock: formData.get('inStock') === 'true',
      badge: (formData.get('badge') as string) || null,
    })
    .eq('id', id)

  revalidatePath('/products')
  redirect('/admin/products')
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()
  await supabase.from('products_additions').delete().eq('id', id)
  revalidatePath('/products')
  redirect('/admin/products')
}

// ─── CATEGORIES ───────────────────────────────────────────────────────────────

export async function createCategory(formData: FormData) {
  const supabase = await createClient()
  const name = formData.get('name') as string

  const { error } = await supabase.from('categories_additions').insert({
    id: slugify(name),
    name,
    slug: slugify(name),
    description: formData.get('description') as string,
    icon: (formData.get('icon') as string) || 'Package',
    product_count: 0,
    image: (formData.get('image') as string) || '/No_Image_Available.jpg',
  })
  if (error) throw new Error(error.message)

  revalidatePath('/categories')
  redirect('/admin/categories')
}

export async function updateCategory(id: string, formData: FormData) {
  const supabase = await createClient()
  const imageVal = formData.get('image') as string

  const { error } = await supabase
    .from('categories_additions')
    .update({
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      icon: (formData.get('icon') as string) || 'Package',
      ...(imageVal && { image: imageVal }),
    })
    .eq('id', id)
  if (error) throw new Error(error.message)

  revalidatePath('/categories')
  redirect('/admin/categories')
}

export async function deleteCategory(id: string) {
  const supabase = await createClient()
  await supabase.from('categories_additions').delete().eq('id', id)
  revalidatePath('/categories')
  redirect('/admin/categories')
}

// ─── MEDIA ────────────────────────────────────────────────────────────────────

export async function uploadImage(formData: FormData): Promise<{ url: string } | { error: string }> {
  const file = formData.get('file') as File | null
  if (!file || !file.name) return { error: 'No file provided' }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!allowedTypes.includes(file.type)) return { error: 'Only JPEG, PNG, WebP, and GIF are allowed' }
  if (file.size > 5 * 1024 * 1024) return { error: 'File size must be under 5 MB' }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-').toLowerCase()
  const filename = `${Date.now()}-${safeName}`
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads')

  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

  const buffer = Buffer.from(await file.arrayBuffer())
  fs.writeFileSync(path.join(uploadsDir, filename), buffer)

  revalidatePath('/admin/media')
  return { url: `/uploads/${filename}` }
}

export async function deleteMedia(filename: string) {
  const safeName = path.basename(filename)
  const filepath = path.join(process.cwd(), 'public', 'uploads', safeName)
  if (fs.existsSync(filepath)) fs.unlinkSync(filepath)
  revalidatePath('/admin/media')
}
