'use client'

import { AlertCircle, X } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export function GuestBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-amber-500/10 border-b border-amber-500/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <p className="text-sm text-amber-800 dark:text-amber-200">
            You&apos;re exploring NEXUS in guest mode.{' '}
            <Link href="/sign-in" className="font-semibold underline hover:opacity-80">
              Sign in
            </Link>{' '}
            to save your portfolio, goals, and access your personal recommendations.
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-amber-500/20 rounded transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4 text-amber-600" />
        </button>
      </div>
    </div>
  )
}
