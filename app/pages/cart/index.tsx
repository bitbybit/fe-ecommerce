import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/useTitle'
import { useFetchCart } from '~/hooks/useFetchCart'
import { useAppSelector } from '~/store/hooks'
import { selectCartItems, selectIsEmptyCart } from '~/store/cart'
import { EmptyBasket } from './EmptyBasket'
import { CART_TABLE_STATUS } from '~/store/cart/types'
import { CartItem } from './CartItem/CartItem'
import { CodeForm } from './CodeForm'
import { ClearCartButton } from './ClearCartButton'
import { CartTotalPrice } from './CartTotalPrice'

export default function Routes(): ReactElement {
  useTitle('Cart')
  useFetchCart()

  const { status, cart } = useAppSelector((state) => state.cart)
  const isEmptyCart = useAppSelector(selectIsEmptyCart) && status === CART_TABLE_STATUS.READY
  const cartItems = useAppSelector(selectCartItems)

  if (isEmptyCart) return <EmptyBasket />

  // TODO
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleClearCart = (): void => {}

  return (
    <div className="p-[10px] flex-grow w-full text-center">
      <ClearCartButton onClearCart={handleClearCart} />
      <CartTotalPrice totalPrice={cart?.totalPrice?.centAmount} discount={cart?.discountOnTotalPrice} />
      <div className="flex flex-col justify-start gap-y-4">
        {cartItems.map(({ name, productId, quantity, price, totalPrice, variant }) => (
          <CartItem
            key={productId}
            name={name}
            productId={productId}
            quantity={quantity}
            price={price}
            totalPrice={totalPrice}
            variant={variant}
            status={status}
          />
        ))}
      </div>
      <CodeForm />
    </div>
  )
}
