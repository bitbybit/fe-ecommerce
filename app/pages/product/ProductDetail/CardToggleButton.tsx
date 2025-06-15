import { type ReactElement, useState, type MouseEvent } from 'react'
import { type ProductProjection } from '@commercetools/platform-sdk'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { addProduct, removeProduct, selectIsInCart } from '~/store/cart'
import { Button } from '~/components/ui/Button'
import { toast } from 'sonner'
import { P } from '~/components/ui/typography'

type CartToggleButtonProperties = { product: ProductProjection }

export function CartToggleButton({ product }: CartToggleButtonProperties): ReactElement {
  const dispatch = useAppDispatch()
  const isInCart = useAppSelector(selectIsInCart(product))
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const handleClick = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.stopPropagation()
    setIsLoading(true)
    setError(undefined)
    try {
      if (isInCart) {
        await dispatch(removeProduct({ productId: product.id, quantity: 1 })).unwrap()
        toast('❌ Removed from Cart')
      } else {
        await dispatch(addProduct({ productId: product.id, quantity: 1 })).unwrap()
        toast('🛒 Added to Cart')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
      toast(error instanceof Error ? error.message : '❌ Failed to update the cart')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button
        variant={isInCart ? 'secondary' : 'default'}
        disabled={isLoading}
        onClick={(event) => void handleClick(event)}
        className="w-[220px] h-10 text-base"
      >
        {isLoading ? 'Loading...' : isInCart ? 'Remove from Cart' : 'Add to Cart'}
      </Button>
      {error && <P className="text-red-500 mt-2 text-sm">{error}</P>}
    </>
  )
}
