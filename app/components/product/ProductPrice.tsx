import { type ReactElement } from 'react'
import { formatProductItemPrice } from '~/utils/formatPrice'

type ProductPriceProps = {
  startPrice: number
  discountPrice?: number
}

export function ProductPrice({ startPrice, discountPrice }: ProductPriceProps): ReactElement {
  const hasDiscount = discountPrice !== undefined && discountPrice < startPrice

  const formattedStartPrice = formatProductItemPrice(startPrice)
  const formattedDiscountPrice = formatProductItemPrice(discountPrice)

  if (hasDiscount) {
    return (
      <div className="flex gap-1">
        <div
          data-testid="start-price"
          className="relative before:content-[''] before:absolute before:bg-red-500 before:h-[2px] before:w-full before:top-[50%] before:translate-y-[-50%] before:rotate-10 before:opacity-60"
        >
          {formattedStartPrice}
        </div>
        <div data-testid="discount-price" className="text-green-400">
          {formattedDiscountPrice}
        </div>
      </div>
    )
  }

  return <div>{formattedStartPrice}</div>
}
