'use client'

import { useState, useTransition, useRef } from 'react'
import { uploadImage } from '@/lib/admin/actions'
import { Upload, X, ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface Props {
  name?: string
  defaultValue?: string
  label?: string
}

export function ImageUploadField({ name = 'image', defaultValue = '', label = 'Image' }: Props) {
  const [imageUrl, setImageUrl] = useState(defaultValue)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return
    setError(null)
    const formData = new FormData()
    formData.append('file', fileList[0])
    startTransition(async () => {
      const result = await uploadImage(formData)
      if ('error' in result) {
        setError(result.error)
      } else {
        setImageUrl(result.url)
      }
    })
  }

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      {/* Hidden input submitted with the server action form */}
      <input type="hidden" name={name} value={imageUrl} />

      {imageUrl ? (
        <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
          <div className="relative h-48">
            <Image src={imageUrl} alt="Preview" fill className="object-cover" unoptimized />
          </div>
          <div className="absolute top-2 right-2 flex gap-1.5">
            <label className="cursor-pointer flex items-center gap-1.5 px-2.5 py-1.5 bg-white/95 rounded-lg text-slate-600 hover:bg-white shadow text-xs font-semibold transition-colors">
              <Upload className="w-3.5 h-3.5" />
              Change
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </label>
            <button
              type="button"
              onClick={() => setImageUrl('')}
              className="p-1.5 bg-white/95 rounded-lg text-red-500 hover:bg-white shadow transition-colors"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {isPending && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <p className="text-sm font-semibold text-blue-600">Uploading…</p>
            </div>
          )}
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
            dragOver ? 'border-blue-400 bg-blue-50' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
          onClick={() => inputRef.current?.click()}
        >
          <div className="flex flex-col items-center gap-2 pointer-events-none">
            <div className="p-3 bg-slate-100 rounded-full">
              <ImageIcon className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">
                Drop image here or <span className="text-blue-600">browse files</span>
              </p>
              <p className="text-xs text-slate-400 mt-0.5">JPEG, PNG, WebP, GIF — max 5 MB</p>
            </div>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          {isPending && <p className="mt-3 text-sm text-blue-600 font-semibold">Uploading…</p>}
        </div>
      )}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  )
}
