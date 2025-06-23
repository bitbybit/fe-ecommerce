import type { DiscountOnTotalPrice } from '@commercetools/platform-sdk'
import type { ReactElement } from 'react'
import { formatProductItemPrice } from '~/utils/formatPrice'

type CartTotalPriceProps = {
  priceAfterDiscount?: number
  discountOnTotal?: DiscountOnTotalPrice
}

export function CartTotalPrice({ priceAfterDiscount, discountOnTotal }: CartTotalPriceProps): ReactElement {
  const hasDiscount = discountOnTotal !== undefined
  const fullPrice = (priceAfterDiscount ?? 0) + (discountOnTotal?.discountedAmount?.centAmount ?? 0)
  const discountedPrice = priceAfterDiscount ?? 0

  return (
    <div className="text-center m-0 text-sm sm:text-base font-semibold justify-items-start">
      <div>Total price: {formatProductItemPrice(fullPrice)}</div>
      {hasDiscount && <div>Total price with discount code applied: {formatProductItemPrice(discountedPrice)}</div>}
    </div>
  )
}
