import { type ProductProjection } from '@commercetools/platform-sdk'
import { type ReactElement } from 'react'
import { Card, CardContent } from '~/components/ui/Card'
import { ProductImages } from './ProductImages'
import { ProductInfo } from './ProductInfo'
import { ProductBreadcrumbs } from './ProductBreadcrumbs'
import { type ProductListCategory } from '~/api/namespaces/product'
import { useProductInfo } from '../hooks/useProductInfo'

export function ProductDetailBody({
  categories,
  product
}: {
  categories: ProductListCategory[]
  product: ProductProjection | undefined
}): ReactElement {
  if (product === undefined) {
    throw new Error('Product not found')
  }

  const { breadcrumbs, images } = useProductInfo(product, categories)

  return (
    <div className="w-full flex flex-col flex-grow items-start gap-10 p-6">
      <ProductBreadcrumbs breadcrumbs={breadcrumbs} />
      <Card className="w-full flex-grow rounded-xl border border-muted bg-card shadow-sm overflow-hidden">
        <CardContent className="flex flex-wrap items-start p-0">
          <ProductImages images={images} />
          <ProductInfo product={product} />
        </CardContent>
      </Card>
    </div>
  )
}
