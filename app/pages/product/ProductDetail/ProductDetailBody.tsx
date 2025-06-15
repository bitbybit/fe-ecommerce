import { type ProductProjection } from '@commercetools/platform-sdk'
import { type ReactElement } from 'react'
import { Card, CardContent } from '~/components/ui/Card'
import { ProductImages } from './ProductImages'
import { ProductInfo } from './ProductInfo'
import { ProductBreadcrumbs } from './ProductBreadcrumbs'
import { type ProductListCategory } from '~/api/namespaces/product'

function getBreadcrumbs(
  categories: ProductListCategory[],
  categoryId: string,
  breadcrumbs: ProductListCategory[] = []
): ProductListCategory[] {
  for (const category of categories) {
    const newBreadcrumbs = [...breadcrumbs, category]

    if (category.id === categoryId) {
      return newBreadcrumbs
    }

    if (category.subCategories !== undefined && category.subCategories.length > 0) {
      const result = getBreadcrumbs(category.subCategories, categoryId, newBreadcrumbs)
      if (result) return result
    }
  }

  return []
}

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

  const name = product.name
  const description = product.description ?? name
  const price = product.masterVariant.prices?.[0]?.value?.centAmount ?? 0
  const images = product.masterVariant.images ?? []
  const discount = product.masterVariant.prices?.[0].discounted?.value?.centAmount ?? undefined
  const breadcrumbs =
    product.categories?.[0]?.id === undefined ? [] : getBreadcrumbs(categories, product.categories[0].id)

  return (
    <div className="w-full flex flex-col flex-grow items-start gap-10 p-6">
      <ProductBreadcrumbs breadcrumbs={breadcrumbs} />
      <Card className="w-full flex-grow rounded-xl border border-muted bg-card shadow-sm overflow-hidden">
        <CardContent className="flex flex-wrap items-start p-0">
          <ProductImages images={images} />
          <ProductInfo name={name} description={description} price={price} discount={discount} product={product} />
        </CardContent>
      </Card>
    </div>
  )
}
