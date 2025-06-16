import type { LineItem } from '@commercetools/platform-sdk'
import { useState, type ReactElement } from 'react'
import type { CART_TABLE_STATUS } from '~/store/cart/types'
import { addProduct, removeProduct } from '~/store/cart'
import { useAppDispatch } from '~/store/hooks'
import { CartItemView } from './CartItemView'

const LOCALE = 'en-US'

type CartItemProperties = Pick<LineItem, 'name' | 'productId' | 'quantity' | 'price' | 'totalPrice' | 'variant'> & {
  status: CART_TABLE_STATUS
}

export function CartItem({ name, productId, quantity, price, totalPrice, variant }: CartItemProperties): ReactElement {
  const dispatch = useAppDispatch()
  const imageUrl = variant.images?.[0]?.url
  const [itemQuantity, setItemQuantity] = useState<number>(quantity)

  const handleIncreaseQuantity = async (): Promise<void> => {
    await dispatch(addProduct({ productId, quantity: 1 })).unwrap()
    setItemQuantity(itemQuantity + 1)
  }
  const handleDecreaseQuantity = async (): Promise<void> => {
    if (itemQuantity <= 1) return
    await dispatch(removeProduct({ productId, quantity: 1 })).unwrap()
    setItemQuantity(itemQuantity - 1)
  }
  const handleDeleteItem = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault()
    await dispatch(removeProduct({ productId, quantity: itemQuantity })).unwrap()
  }

  return (
    <CartItemView
      name={name[LOCALE]}
      imageUrl={imageUrl}
      price={price}
      quantity={itemQuantity}
      totalPrice={totalPrice.centAmount}
      onIncrease={() => void handleIncreaseQuantity()}
      onDecrease={() => void handleDecreaseQuantity()}
      onDelete={(event) => void handleDeleteItem(event)}
    />
  )
}
