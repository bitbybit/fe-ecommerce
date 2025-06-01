import type { LocalizedString } from '@commercetools/platform-sdk'
import type { ReactElement } from 'react'
import { H1, H3, P } from '~/components/ui/typography'
import { formatProductItemPrice } from '~/utils/formatPrice'

const LANG = 'en-US'

export function ProductInfo({
  name,
  description,
  price,
  discount
}: {
  name: LocalizedString
  description: LocalizedString
  price: number
  discount?: number
}): ReactElement {
  const hasDiscount = discount !== undefined && discount < price

  return (
    <div className="flex-1 flex flex-col justify-start gap-4 text-left">
      <H1 className="text-2xl font-semibold">{name[LANG]}</H1>
      <P className="text-muted-foreground">{description ? description[LANG] : 'Loading...'}</P>
      {hasDiscount ? (
        <div className="flex items-baseline gap-2">
          <P className="line-through text-muted-foreground">{formatProductItemPrice(price)}</P>
          <P className="text-destructive font-bold text-xl">{formatProductItemPrice(discount)}</P>
        </div>
      ) : (
        <H3>{formatProductItemPrice(price)}</H3>
      )}
    </div>
  )
}
