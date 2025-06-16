import { type ProductProjection } from '@commercetools/platform-sdk'
import { type ReactElement } from 'react'
import { H1, H3, P } from '~/components/ui/typography'
import { ProductPrice } from '~/components/product/ProductPrice'
import { CartToggleButton } from './CartToggleButton'
import { useProductInfo } from '../hooks/useProductInfo'

const LANG = 'en-US'

export function ProductInfo({ product }: { product: ProductProjection }): ReactElement {
  const { name, description, price, discount } = useProductInfo(product)
  return (
    <div className="flex-1 flex flex-col justify-start gap-4 text-left mx-6">
      <H1 className="text-2xl font-semibold">{name[LANG]}</H1>
      {description && <P className="text-muted-foreground">{description[LANG]}</P>}
      <H3>
        <ProductPrice startPrice={price} discountPrice={discount} />
      </H3>
      <CartToggleButton product={product} />
    </div>
  )
}
