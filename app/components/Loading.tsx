import { type ReactElement } from 'react'

export function Loading(): ReactElement {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-2 text-neural-600">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-neural-300 border-t-transparent" />
      <p className="text-sm font-medium text-neural-500">Loading...</p>
    </div>
  )
}
