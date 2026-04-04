'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'

interface Row {
  key: string
  value: string
}

interface Props {
  defaultValue?: Record<string, string>
}

export function SpecificationsField({ defaultValue = {} }: Props) {
  const [rows, setRows] = useState<Row[]>(
    Object.entries(defaultValue).map(([key, value]) => ({ key, value }))
  )

  function addRow() {
    setRows((prev) => [...prev, { key: '', value: '' }])
  }

  function removeRow(index: number) {
    setRows((prev) => prev.filter((_, i) => i !== index))
  }

  function updateRow(index: number, field: 'key' | 'value', val: string) {
    setRows((prev) =>
      prev.map((r, i) => (i === index ? { ...r, [field]: val } : r))
    )
  }

  const serialized = JSON.stringify(
    Object.fromEntries(
      rows
        .filter((r) => r.key.trim())
        .map((r) => [r.key.trim(), r.value.trim()])
    )
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-slate-700">
          Specifications <span className="text-slate-400 font-normal">(optional)</span>
        </label>
        <button
          type="button"
          onClick={addRow}
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add row
        </button>
      </div>

      {/* Hidden input carries serialized specs to the server action */}
      <input type="hidden" name="specifications" value={serialized} />

      {rows.length === 0 ? (
        <div
          onClick={addRow}
          className="border border-dashed border-slate-200 rounded-lg px-4 py-5 text-center text-sm text-slate-400 cursor-pointer hover:border-slate-300 hover:text-slate-500 transition-colors"
        >
          Click &ldquo;Add row&rdquo; to add a specification (e.g. Material, Length, Sterility)
        </div>
      ) : (
        <div className="space-y-2">
          <div className="grid grid-cols-[1fr_1fr_auto] gap-2 px-1">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">Property</span>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">Value</span>
            <span />
          </div>
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
              <input
                type="text"
                value={row.key}
                onChange={(e) => updateRow(i, 'key', e.target.value)}
                placeholder="e.g. Material"
                className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={row.value}
                onChange={(e) => updateRow(i, 'value', e.target.value)}
                placeholder="e.g. Stainless steel"
                className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => removeRow(i)}
                className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
