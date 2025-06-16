import type { LineItem } from '@commercetools/platform-sdk'
import { type ReactElement } from 'react'
import { addProduct, removeProduct } from '~/store/cart'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { CartItemView } from './CartItemView'
import { CART_TABLE_STATUS } from '~/store/cart/types'

const LOCALE = 'en-US'

type CartItemProperties = {
  lineItem: LineItem
}

export function CartItem({ lineItem }: CartItemProperties): ReactElement {
  const { name, productId, quantity, price, totalPrice, variant } = lineItem
  const dispatch = useAppDispatch()
  const imageUrl = variant.images?.[0]?.url

  const { status } = useAppSelector((state) => state.cart)
  const isCartLoading = status === CART_TABLE_STATUS.LOADING

  const handleIncreaseQuantity = async (): Promise<void> => {
    if (isCartLoading) return
    await dispatch(addProduct({ productId, quantity: 1 })).unwrap()
  }

  const handleDecreaseQuantity = async (): Promise<void> => {
    if (isCartLoading || quantity <= 1) return
    await dispatch(removeProduct({ productId, quantity: 1 })).unwrap()
  }

  const handleDeleteItem = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault()
    if (isCartLoading) return
    await dispatch(removeProduct({ productId, quantity })).unwrap()
  }

  return (
    <CartItemView
      name={name[LOCALE]}
      imageUrl={imageUrl}
      price={price}
      quantity={quantity}
      totalPrice={totalPrice.centAmount}
      onIncrease={() => void handleIncreaseQuantity()}
      onDecrease={() => void handleDecreaseQuantity()}
      onDelete={(event) => void handleDeleteItem(event)}
    />
  )
}
