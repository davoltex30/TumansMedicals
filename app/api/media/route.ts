import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data, error } = await supabase.storage.from('uploads').list('', {
    limit: 200,
    sortBy: { column: 'created_at', order: 'desc' },
  })

  if (error || !data) return NextResponse.json({ files: [] })

  const files = data
    .filter((f) => f.name !== '.emptyFolderPlaceholder')
    .map((f) => {
      const { data: { publicUrl } } = supabase.storage.from('uploads').getPublicUrl(f.name)
      return { url: publicUrl, name: f.name }
    })

  return NextResponse.json({ files })
}
