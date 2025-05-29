import type { LocalizedString } from '@commercetools/platform-sdk'
import type { ReactElement } from 'react'
import { H1, H3, P } from '~/components/ui/typography'

const LANG = 'en-US'

export function ProductInfo({
  name,
  description,
  price,
  discount
}: {
  name?: LocalizedString
  description?: LocalizedString
  price?: number
  discount?: number
}): ReactElement {
  const isLoading = price === undefined
  const hasDiscount = discount !== undefined && discount < price!

  return (
    <div className="flex-1 flex flex-col justify-start gap-4 text-left">
      <H1 className="text-2xl font-semibold">{name ? name[LANG] : 'Loading...'}</H1>
      <P className="text-muted-foreground">{description ? description[LANG] : 'Loading...'}</P>
      {isLoading ? (
        <H3>Loading...</H3>
      ) : hasDiscount ? (
        <div className="flex items-baseline gap-2">
          <P className="line-through text-muted-foreground">${(price / 100).toFixed(2)}</P>
          <P className="text-destructive font-bold text-xl">${(discount / 100).toFixed(2)}</P>
        </div>
      ) : (
        <H3>${(price / 100).toFixed(2)}</H3>
      )}
    </div>
  )
}
