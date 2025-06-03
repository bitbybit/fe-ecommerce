import { type ProductProjection } from '@commercetools/platform-sdk'
import { type ReactElement } from 'react'
import { Card, CardContent } from '~/components/ui/Card'
import { Button } from '~/components/ui/Button'
import { ProductImages } from './ProductImages'
import { ProductInfo } from './ProductInfo'

export default function ProductDetailBody({ product }: { product: ProductProjection | undefined }): ReactElement {
  if (product === undefined) {
    throw new Error('Product not found')
  }

  const name = product.name
  const description = product.description ?? name
  const price = product.masterVariant.prices?.[0]?.value?.centAmount ?? 0
  const images = product.masterVariant.images ?? []
  const discount = product.masterVariant.prices?.[0].discounted?.value?.centAmount ?? undefined

  return (
    <div className="w-full flex flex-col flex-grow items-start gap-10 p-6">
      <Button variant="outline" onClick={() => history.back()}>
        ← Back to catalog
      </Button>
      <Card className="w-full flex-grow rounded-xl border border-muted bg-card shadow-sm overflow-hidden">
        <CardContent className="flex flex-wrap items-start p-0">
          <ProductImages images={images} />
          <ProductInfo name={name} description={description} price={price} discount={discount} />
        </CardContent>
      </Card>
    </div>
  )
}
