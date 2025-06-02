import { type ReactElement } from 'react'
import { formatProductItemPrice } from '~/utils/formatPrice'

export function SalePrice({
  startPrice,
  discountPrice = 40
}: Readonly<{ startPrice: number; discountPrice?: number }>): ReactElement {
  const hasDiscount = discountPrice !== undefined && discountPrice < startPrice

  const startPriceFormatted = formatProductItemPrice(startPrice)

  if (hasDiscount) {
    return (
      <div className="flex gap-1">
        <div className="relative before:content-[''] before:absolute before:bg-red-500 before:h-[2px] before:w-full before:top-[50%] before:translate-y-[-50%] before:rotate-10 before:opacity-60">
          {startPriceFormatted}
        </div>
        <div className="text-green-400">{formatProductItemPrice(discountPrice)}</div>
      </div>
    )
  }

  return <div>{startPriceFormatted}</div>
}
