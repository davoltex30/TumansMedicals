'use client'

import { useActionState } from 'react'
import { loginAction } from '@/lib/admin/actions'
import { Plus } from 'lucide-react'

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, undefined)

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl mb-4">
            <Plus className="w-7 h-7 text-white" strokeWidth={3} />
          </div>
          <h1 className="text-white text-2xl font-black">Tumans Medicals</h1>
          <p className="text-slate-400 text-sm mt-1">Admin Panel</p>
        </div>

        <form action={formAction} className="bg-white rounded-2xl p-8 shadow-2xl">
          <h2 className="text-slate-900 font-bold text-lg mb-6">Sign in</h2>

          {state?.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-5">
              {state.error}
            </div>
          )}

          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              defaultValue="admin@tumansmedicals.com"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="admin@tumansmedicals.com"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter admin password"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60"
          >
            {isPending ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-slate-500 text-xs mt-6">
          Default: <code className="text-slate-300">admin@tumansmedicals.com</code> / <code className="text-slate-300">admin123</code>
        </p>
      </div>
    </div>
  )
}
