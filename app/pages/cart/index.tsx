import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/useTitle'
import { useFetchCart } from '~/hooks/useFetchCart'
import { useAppSelector } from '~/store/hooks'
import { selectCartItems, selectIsEmptyCart } from '~/store/cart'
import { EmptyCart } from './EmptyCart'
import { CART_TABLE_STATUS } from '~/store/cart/types'
import { CartItem } from './CartItem/CartItem'
import { CodeForm } from './CodeForm'
import { Loading } from '~/components/Loading'
import { CartTopPanel } from './CartTopPanel'

export default function Cart(): ReactElement {
  useTitle('Cart')
  useFetchCart()

  const { status } = useAppSelector((state) => state.cart)
  const isEmptyCart = useAppSelector(selectIsEmptyCart) && status === CART_TABLE_STATUS.READY
  const cartItems = useAppSelector(selectCartItems)

  if (status === CART_TABLE_STATUS.LOADING) return <Loading />
  if (isEmptyCart) return <EmptyCart />

  // TODO
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleClearCart = (): void => {}

  return (
    <div className="py-6 px-4 flex-grow w-full text-center">
      <CartTopPanel onClearCart={handleClearCart} />
      <CodeForm />
      <div className="flex flex-col justify-start gap-y-4">
        {cartItems.map((lineItem) => (
          <CartItem key={lineItem.productId} lineItem={lineItem} />
        ))}
      </div>
    </div>
  )
}
