import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export function GET() {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads')

  if (!fs.existsSync(uploadsDir)) {
    return NextResponse.json({ files: [] })
  }

  const entries = fs.readdirSync(uploadsDir)
  const imageExts = ['.jpg', '.jpeg', '.png', '.webp', '.gif']

  const files = entries
    .filter((name) => imageExts.includes(path.extname(name).toLowerCase()))
    .sort((a, b) => {
      const aTime = fs.statSync(path.join(uploadsDir, a)).mtimeMs
      const bTime = fs.statSync(path.join(uploadsDir, b)).mtimeMs
      return bTime - aTime
    })
    .map((name) => ({ url: `/uploads/${name}`, name }))

  return NextResponse.json({ files })
}
