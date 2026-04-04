import fs from 'fs'
import path from 'path'

const DB_DIR = path.join(process.cwd(), 'db')

function ensureDbDir() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true })
  }
}

export function readDb<T>(filename: string, defaultValue: T): T {
  ensureDbDir()
  const filepath = path.join(DB_DIR, filename)
  if (!fs.existsSync(filepath)) return defaultValue
  try {
    return JSON.parse(fs.readFileSync(filepath, 'utf-8')) as T
  } catch {
    return defaultValue
  }
}

export function writeDb<T>(filename: string, data: T): void {
  ensureDbDir()
  const filepath = path.join(DB_DIR, filename)
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8')
}
