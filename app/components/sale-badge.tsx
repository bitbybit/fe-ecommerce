import type { ReactElement } from 'react'

const SALE_BADGE_TEXT = 'Summer Sale -15% 🏖'

export function SaleBadge(): ReactElement {
  return (
    <div className="absolute right-0 -top-4 bg-rose-500 text-sm rounded-sm text-red-50 z-[777] px-[10px] py-[2px] opacity-70">
      {SALE_BADGE_TEXT}
    </div>
  )
}
