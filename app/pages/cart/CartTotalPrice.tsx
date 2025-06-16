import type { DiscountOnTotalPrice } from '@commercetools/platform-sdk'
import type { ReactElement } from 'react'
import { formatProductItemPrice } from '~/utils/formatPrice'

type CartTotalPriceProperties = {
  totalPrice?: number
  discount?: DiscountOnTotalPrice
}

export function CartTotalPrice({ totalPrice, discount }: CartTotalPriceProperties): ReactElement {
  const hasDiscount = discount !== undefined
  return (
    <div className="text-center">
      {hasDiscount
        ? `Total price with discount code applied: ${formatProductItemPrice(discount.discountedAmount?.centAmount ?? 0)}`
        : `Total price: ${formatProductItemPrice(totalPrice ?? 0)}`}
    </div>
  )
}
