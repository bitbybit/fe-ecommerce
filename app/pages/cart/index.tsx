import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/useTitle'
import { useFetchCart } from '~/hooks/useFetchCart'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { clearCart, selectCartItems, selectIsEmptyCart } from '~/store/cart'
import { CART_TABLE_STATUS } from '~/store/cart/types'
import { Loading } from '~/components/Loading'
import { EmptyCart } from './EmptyCart'
import { CartItem } from './CartItem/CartItem'
import { CodeForm } from './CodeForm'
import { CartTopPanel } from './CartTopPanel'

export default function Cart(): ReactElement {
  useTitle('Cart')
  useFetchCart()

  const dispatch = useAppDispatch()
  const { status } = useAppSelector((state) => state.cart)
  const isEmptyCart = useAppSelector(selectIsEmptyCart) && status === CART_TABLE_STATUS.READY
  const cartItems = useAppSelector(selectCartItems)

  if (status === CART_TABLE_STATUS.LOADING) {
    return <Loading />
  }

  if (isEmptyCart) {
    return <EmptyCart />
  }

  const handleClearCart = async (): Promise<void> => {
    await dispatch(clearCart()).unwrap()
  }

  return (
    <div className="py-6 px-4 flex-grow w-full text-center">
      <CartTopPanel onClearCart={() => void handleClearCart()} />
      <CodeForm />
      <div className="flex flex-col justify-start gap-y-4">
        {cartItems.map((lineItem) => (
          <CartItem key={lineItem.productId} lineItem={lineItem} />
        ))}
      </div>
    </div>
  )
}
