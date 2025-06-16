import { Minus, Plus } from 'lucide-react'
import type { ReactElement } from 'react'
import { Button } from '~/components/ui/Button'

type QuantityControlProperties = {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
}

export function QuantityControl({ quantity, onIncrease, onDecrease }: QuantityControlProperties): ReactElement {
  return (
    <div className="flex gap-2">
      <Button
        variant="gray"
        className="w-6 h-6 rounded-sm cursor-pointer"
        onClick={onDecrease}
        disabled={quantity === 1}
      >
        <Minus />
      </Button>
      <div className="w-6 h-6 flex justify-center items-center">{quantity}</div>
      <Button variant="gray" className="w-6 h-6 rounded-sm cursor-pointer" onClick={onIncrease}>
        <Plus />
      </Button>
    </div>
  )
}
