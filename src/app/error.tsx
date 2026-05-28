'use client'

import { useEffect } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-16 h-16 bg-status-error/10 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="text-status-error w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold text-text-primary mb-2">Something went wrong!</h2>
      <p className="text-text-secondary max-w-md mb-8">
        An unexpected error occurred while loading this page. Our team has been notified.
      </p>
      <button
        onClick={() => reset()}
        className="btn-primary flex items-center gap-2"
      >
        <RotateCcw size={18} />
        Try again
      </button>
    </div>
  )
}
