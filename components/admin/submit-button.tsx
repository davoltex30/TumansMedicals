'use client'

import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'

interface Props {
  label: string
  loadingLabel?: string
  className?: string
}

export function SubmitButton({ label, loadingLabel, className }: Props) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={
        className ??
        'inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors'
      }
    >
      {pending && <Loader2 className="w-4 h-4 animate-spin" />}
      {pending ? (loadingLabel ?? 'Saving…') : label}
    </button>
  )
}
