import { type ReactElement } from 'react'

export default function Loading(): ReactElement {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-2 text-blue-600">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-300 border-t-transparent" />
      <p className="text-sm font-medium text-blue-500">Loading...</p>
    </div>
  )
}
