import { type ReactElement, type MouseEvent, useState } from 'react'
import { Check, ShoppingCart } from 'lucide-react'
import { type ProductProjection } from '@commercetools/platform-sdk'
import { cn } from '~/utils/ui'
import { Button } from '~/components/ui/Button'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { addProduct, selectIsInCart } from '~/store/cart'

type AddToCartButtonProperties = { product: ProductProjection }

export function AddToCartButton({ product }: AddToCartButtonProperties): ReactElement {
  const dispatch = useAppDispatch()
  const isProductInCart = useAppSelector(selectIsInCart(product))
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleClick = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.stopPropagation()
    setIsLoading(true)
    try {
      await dispatch(addProduct({ productId: product.id, quantity: 1 })).unwrap()
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    // TODO: move to separate component
    return <>...</>
  }

  return (
    <Button
      variant={isProductInCart ? 'secondary' : 'outline'}
      size="icon"
      className={cn(
        'relative cursor-pointer disabled:opacity-100',
        isProductInCart ? 'cursor-not-allowed' : 'cursor-pointer'
      )}
      disabled={isProductInCart}
      onClick={(event) => void handleClick(event)}
    >
      <ShoppingCart size={16} />
      {isProductInCart && <Check className="text-green-400 absolute bottom-0 right-0" />}
    </Button>
  )
}
