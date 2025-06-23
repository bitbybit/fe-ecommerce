import { type ReactElement, type MouseEvent, useState } from 'react'
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
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleQuantityChange = async (newQuantity: number): Promise<void> => {
    if (isCartLoading || newQuantity < MIN_QUANTITY) return
    setIsLoading(true)
    try {
      await dispatch(updateQuantity({ productId, quantity: newQuantity })).unwrap()
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteItem = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault()
    if (isCartLoading) return
    setIsLoading(true)
    try {
      await dispatch(removeProduct({ productId, quantity })).unwrap()
    } finally {
      setIsLoading(false)
    }
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
      isLoading={isLoading}
    />
  )
}
