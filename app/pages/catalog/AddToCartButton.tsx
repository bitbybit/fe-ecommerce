import { Check, ShoppingCart } from 'lucide-react'
import type { ReactElement } from 'react'
import { Button } from '~/components/ui/Button'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function AddToCartButton({ productId }: { productId: string }): ReactElement {
  // TODO:
  const isProductInCart = false

  return (
    <div onClick={(event) => event.stopPropagation()} className={isProductInCart ? 'cursor-auto' : 'cursor-pointer'}>
      <Button
        variant={isProductInCart ? 'secondary' : 'outline'}
        size="icon"
        className="relative cursor-pointer disabled:opacity-100"
        disabled={isProductInCart}
      >
        <ShoppingCart size={16} />
        {isProductInCart && <Check className="text-green-400 absolute bottom-0 right-0" />}
      </Button>
    </div>
  )
}
