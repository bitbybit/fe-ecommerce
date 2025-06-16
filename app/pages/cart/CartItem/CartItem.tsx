import type { LineItem } from '@commercetools/platform-sdk'
import { type ReactElement } from 'react'
import { removeProduct, updateQuantity } from '~/store/cart'
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

  const handleQuantityChange = async (newQuantity: number): Promise<void> => {
    if (isCartLoading || newQuantity < 1) return
    await dispatch(updateQuantity({ productId, quantity: newQuantity })).unwrap()
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
      onQuantityChange={(newQuantity) => void handleQuantityChange(newQuantity)}
      onDelete={(event) => void handleDeleteItem(event)}
    />
  )
}
