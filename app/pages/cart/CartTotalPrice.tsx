import type { DiscountOnTotalPrice } from '@commercetools/platform-sdk'
import type { ReactElement } from 'react'
import { formatProductItemPrice } from '~/utils/formatPrice'

type CartTotalPriceProps = {
  totalPrice?: number
  discount?: DiscountOnTotalPrice
}

export function CartTotalPrice({ totalPrice, discount }: CartTotalPriceProps): ReactElement {
  const hasDiscount = discount !== undefined
  return (
    <div className="text-center m-0 text-sm sm:text-base font-semibold">
      {hasDiscount
        ? `Total price with discount code applied: ${formatProductItemPrice(discount.discountedAmount?.centAmount ?? 0)}`
        : `Total price: ${formatProductItemPrice(totalPrice ?? 0)}`}
    </div>
  )
}
