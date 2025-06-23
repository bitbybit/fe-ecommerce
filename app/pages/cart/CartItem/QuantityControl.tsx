import { Minus, Plus } from 'lucide-react'
import type { ReactElement } from 'react'
import { Button } from '~/components/ui/Button'
import { CART_TABLE_STATUS } from '~/store/cart/types'
import { useAppSelector } from '~/store/hooks'

type QuantityControlProps = {
  quantity: number
  onQuantityChange: (quantity: number) => void
}

export function QuantityControl({ quantity, onQuantityChange }: QuantityControlProps): ReactElement {
  const { status } = useAppSelector((state) => state.cart)
  const isCartLoading = status === CART_TABLE_STATUS.LOADING

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
        disabled={quantity === 1 || isCartLoading}
        aria-label="decrease-button"
      >
        <Minus />
      </Button>
      <div className="w-6 h-6 flex justify-center items-center">{quantity}</div>
      <Button
        variant="gray"
        className="w-6 h-6 rounded-sm cursor-pointer"
        onClick={handleIncrease}
        aria-label="increase-button"
        disabled={isCartLoading}
      >
        <Plus />
      </Button>
    </div>
  )
}
