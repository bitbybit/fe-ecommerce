import { Sparkles } from 'lucide-react'
import type { ReactElement } from 'react'

export function NoProductsFound(): ReactElement {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="max-w-xs flex flex-col items-center justify-center gap-4 text-center">
        <Sparkles size={60} className="text-neural-200" />
        <p className="text-sm">We couldn’t find any products matching your search.</p>
      </div>
    </div>
  )
}
