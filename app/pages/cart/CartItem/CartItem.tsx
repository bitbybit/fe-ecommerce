import { type ReactElement, type MouseEvent } from 'react'
import { type LineItem } from '@commercetools/platform-sdk'
import { removeProduct, updateQuantity } from '~/store/cart'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { CART_TABLE_STATUS } from '~/store/cart/types'
import { CartItemView } from './CartItemView'
import { LANG } from '~/api/client'

type CartItemProps = {
  lineItem: LineItem
}

const MIN_QUANTITY = 1

export function CartItem({ lineItem }: CartItemProps): ReactElement {
  const { name, productId, quantity, price, totalPrice, variant } = lineItem
  const dispatch = useAppDispatch()
  const imageUrl = variant.images?.[0]?.url

  const { status } = useAppSelector((state) => state.cart)
  const isCartLoading = status === CART_TABLE_STATUS.LOADING

  const handleQuantityChange = async (newQuantity: number): Promise<void> => {
    if (isCartLoading || newQuantity < MIN_QUANTITY) return
    await dispatch(updateQuantity({ productId, quantity: newQuantity })).unwrap()
  }

  const handleDeleteItem = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault()
    if (isCartLoading) return
    await dispatch(removeProduct({ productId, quantity })).unwrap()
  }

  return (
    <CartItemView
      name={name[LANG]}
      imageUrl={imageUrl}
      price={price}
      quantity={quantity}
      totalPrice={totalPrice.centAmount}
      onQuantityChange={(newQuantity) => void handleQuantityChange(newQuantity)}
      onDelete={(event) => void handleDeleteItem(event)}
    />
  )
}
