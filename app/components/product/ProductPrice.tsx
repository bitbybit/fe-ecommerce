import { type ReactElement } from 'react'
import { formatProductItemPrice } from '~/utils/formatPrice'

type ProductPriceProperties = {
  startPrice: number
  discountPrice?: number
}

export function ProductPrice({ startPrice, discountPrice }: ProductPriceProperties): ReactElement {
  const hasDiscount = discountPrice !== undefined && discountPrice < startPrice

  const formattedStartPrice = formatProductItemPrice(startPrice)

  if (hasDiscount) {
    return (
      <div className="flex gap-1">
        <div className="relative before:content-[''] before:absolute before:bg-red-500 before:h-[2px] before:w-full before:top-[50%] before:translate-y-[-50%] before:rotate-10 before:opacity-60">
          {formattedStartPrice}
        </div>
        <div className="text-green-400">{formatProductItemPrice(discountPrice)}</div>
      </div>
    )
  }

  return <div>{formattedStartPrice}</div>
}
