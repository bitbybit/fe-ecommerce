import { Minus, Plus } from 'lucide-react'
import type { ReactElement } from 'react'
import { Button } from '~/components/ui/Button'

type QuantityControlProperties = {
  quantity: number
  onQuantityChange: (quantity: number) => void
}

export function QuantityControl({ quantity, onQuantityChange }: QuantityControlProperties): ReactElement {
  const handleDecrease = (): void => {
    if (quantity > 1) onQuantityChange(quantity - 1)
  }

  const handleIncrease = (): void => {
    onQuantityChange(quantity + 1)
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="gray"
        className="w-6 h-6 rounded-sm cursor-pointer"
        onClick={handleDecrease}
        disabled={quantity === 1}
      >
        <Minus />
      </Button>
      <div className="w-6 h-6 flex justify-center items-center">{quantity}</div>
      <Button variant="gray" className="w-6 h-6 rounded-sm cursor-pointer" onClick={handleIncrease}>
        <Plus />
      </Button>
    </div>
  )
}
