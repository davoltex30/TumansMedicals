'use client'

import { useState, useTransition } from 'react'
import { uploadImage, deleteMedia } from '@/lib/admin/actions'
import { Upload, Copy, Trash2, Image as ImageIcon, Check } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'

interface UploadedFile {
  url: string
  name: string
}

export default function AdminMediaPage() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isPending, startTransition] = useTransition()
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)

  // Load existing uploaded files from the server
  useEffect(() => {
    fetch('/api/media')
      .then((r) => r.json())
      .then((data) => setFiles(data.files || []))
      .catch(() => {})
  }, [])

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  function handleFileUpload(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return
    setUploadError(null)
    const formData = new FormData()
    formData.append('file', fileList[0])
    startTransition(async () => {
      const result = await uploadImage(formData)
      if ('error' in result) {
        setUploadError(result.error)
      } else {
        const name = result.url.split('/').pop() || result.url
        setFiles((prev) => [{ url: result.url, name }, ...prev])
      }
    })
  }

  function handleDelete(url: string) {
    if (!confirm('Delete this image?')) return
    const filename = url.split('/').pop() || ''
    startTransition(async () => {
      await deleteMedia(filename)
      setFiles((prev) => prev.filter((f) => f.url !== url))
    })
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-900">Media Library</h1>
        <p className="text-slate-500 text-sm mt-0.5">Upload images and copy URLs to use in blog posts, products, and projects.</p>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-10 text-center mb-8 transition-colors ${dragOver ? 'border-blue-400 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFileUpload(e.dataTransfer.files) }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="p-4 bg-slate-100 rounded-full">
            <Upload className="w-6 h-6 text-slate-500" />
          </div>
          <div>
            <p className="font-semibold text-slate-700">Drop an image here or</p>
            <label className="cursor-pointer">
              <span className="text-blue-600 font-semibold hover:underline">browse files</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
            </label>
          </div>
          <p className="text-xs text-slate-400">JPEG, PNG, WebP, GIF — max 5 MB</p>
        </div>
        {isPending && <p className="mt-4 text-sm text-blue-600 font-medium">Uploading…</p>}
        {uploadError && <p className="mt-4 text-sm text-red-600">{uploadError}</p>}
      </div>

      {/* Gallery */}
      {files.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No images uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {files.map((file) => (
            <div key={file.url} className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="relative aspect-square bg-slate-100">
                <Image
                  src={file.url}
                  alt={file.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-2">
                <p className="text-xs text-slate-500 truncate" title={file.name}>{file.name}</p>
              </div>
              {/* Hover actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => copyUrl(file.url)}
                  className="p-2 bg-white rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  title="Copy URL"
                >
                  {copiedUrl === file.url ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleDelete(file.url)}
                  className="p-2 bg-white rounded-lg text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
