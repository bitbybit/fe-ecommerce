import type { DiscountOnTotalPrice } from '@commercetools/platform-sdk'
import type { ReactElement } from 'react'
import { formatProductItemPrice } from '~/utils/formatPrice'

type CartTotalPriceProps = {
  totalPrice?: number
  discount?: DiscountOnTotalPrice
}

export function CartTotalPrice({ totalPrice, discount }: CartTotalPriceProps): ReactElement {
  const hasDiscount = discount !== undefined
  const fullPrice = (totalPrice ?? 0) + (discount?.discountedAmount?.centAmount ?? 0)
  const discountedPrice = totalPrice ?? 0

  return (
    <div className="text-center m-0 text-sm sm:text-base font-semibold justify-items-start">
      <div>Total price: {formatProductItemPrice(fullPrice)}</div>
      {hasDiscount && <div>Total price with discount code applied: {formatProductItemPrice(discountedPrice)}</div>}
    </div>
  )
}
