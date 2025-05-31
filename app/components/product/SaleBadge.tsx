import { type ReactElement } from 'react'

export function SaleBadge(): ReactElement {
  return (
    <div className="absolute right-0 -top-4 bg-rose-500 text-base rounded-sm text-red-50 z-[777] px-[10px] py-[2px] opacity-70">
      Sale
    </div>
  )
}
