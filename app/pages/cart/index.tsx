import { type MouseEvent, type ReactElement } from 'react'
import { useTitle } from '~/hooks/useTitle'
import { useFetchCart } from '~/hooks/useFetchCart'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { removeProduct, selectCartItems, selectIsEmptyCart } from '~/store/cart'
import { EmptyBasket } from './EmptyBasket'
import { CodeForm } from './CodeForm'
import { ProductPrice } from '~/components/product/ProductPrice'
import { formatProductItemPrice } from '~/utils/formatPrice'
import { CART_TABLE_STATUS } from '~/store/cart/types'

// TODO: remove comment
// eslint-disable-next-line max-lines-per-function
export default function Routes(): ReactElement {
  useTitle('Cart')
  useFetchCart()

  const dispatch = useAppDispatch()
  const { status, cart } = useAppSelector((state) => state.cart)
  const isEmptyCart = useAppSelector(selectIsEmptyCart) && status === CART_TABLE_STATUS.READY
  const cartItems = useAppSelector(selectCartItems)

  if (isEmptyCart) {
    return <EmptyBasket />
  }

  // TODO: move to separate component
  const handleClick = async (
    event: MouseEvent<HTMLAnchorElement>,
    productId: string,
    quantity: number
  ): Promise<void> => {
    event.preventDefault()
    await dispatch(removeProduct({ productId, quantity })).unwrap()
  }
  return (
    <>
      {cartItems.map(({ name, productId, quantity, price, totalPrice, variant }) => (
        <div key={productId} className="flex items-center gap-5">
          <img src={variant.images?.[0]?.url} alt="Preview" width="25" />

          <div>
            {name['en-US']} (amount: {quantity})
          </div>

          <ProductPrice startPrice={price.value.centAmount} discountPrice={price.discounted?.value?.centAmount} />

          {quantity > 1 && <div>Price of all items: {formatProductItemPrice(totalPrice.centAmount)}</div>}

          {status === CART_TABLE_STATUS.LOADING ? (
            // TODO: add some loader
            <>...</>
          ) : (
            <a href="#" onClick={(event) => void handleClick(event, productId, quantity)}>
              remove
            </a>
          )}
        </div>
      ))}
      {cart?.discountOnTotalPrice === undefined ? (
        <div>Total price: {formatProductItemPrice(cart?.totalPrice?.centAmount ?? 0)}</div>
      ) : (
        <div>
          Total price with discount code applied:{' '}
          {formatProductItemPrice(cart?.discountOnTotalPrice?.discountedAmount?.centAmount ?? 0)}
        </div>
      )}
      <CodeForm />
    </>
  )
}
