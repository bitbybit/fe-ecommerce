import { type LocalizedString } from '@commercetools/platform-sdk'
import { type ReactElement } from 'react'
import { H1, H3, P } from '~/components/ui/typography'
import { SalePrice } from '~/components/product/SalePrice'

const LANG = 'en-US'

export function ProductInfo({
  name,
  description,
  price,
  discount
}: Readonly<{
  name: LocalizedString
  description: LocalizedString
  price: number
  discount?: number
}>): ReactElement {
  return (
    <div className="flex-1 flex flex-col justify-start gap-4 text-left mx-6">
      <H1 className="text-2xl font-semibold">{name[LANG]}</H1>
      <P className="text-muted-foreground">{description[LANG]}</P>
      <H3>
        <SalePrice startPrice={price} discountPrice={discount} />
      </H3>
    </div>
  )
}
