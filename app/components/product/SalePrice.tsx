import { type ReactElement } from 'react'
import { formatProductItemPrice } from '~/utils/formatPrice'

type SalePriceProperties = {
  startPrice: string
  discountPrice?: number
}

export function SalePrice({ startPrice, discountPrice }: SalePriceProperties): ReactElement {
  return discountPrice ? (
    <div>
      <div className="relative before:content-[''] before:absolute before:bg-red-500 before:h-[2px] before:w-full before:top-[50%] before:translate-y-[-50%] before:rotate-10 before:opacity-60">
        {startPrice}
      </div>
      <div className="text-green-400">{formatProductItemPrice(discountPrice)}</div>
    </div>
  ) : (
    <div>{startPrice}</div>
  )
}
