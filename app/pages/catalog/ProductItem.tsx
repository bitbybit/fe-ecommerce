import { type ProductProjection } from '@commercetools/platform-sdk'
import { type ReactElement } from 'react'
import { generatePath, useNavigate } from 'react-router'
import { Card, CardContent, CardDescription, CardTitle } from '~/components/ui/Card'
import { SaleBadge } from '~/components/product/SaleBadge'
import { ProductPrice } from '~/components/product/ProductPrice'
import { ROUTES } from '~/routes'
import { AddToCartButton } from './AddToCartButton'
import { ProductImage } from '~/components/product/ProductImage'
import { LANG } from '~/api/client'

type ProductItemProps = { product: ProductProjection }

export function ProductItem({ product }: ProductItemProps): ReactElement {
  const navigate = useNavigate()

  const name = product.name[LANG]
  const description = product.description?.[LANG] ?? name
  const image = product.masterVariant.images?.[0]?.url
  const price = product.masterVariant.prices?.[0]?.value?.centAmount ?? 0
  const discountPrice = product.masterVariant.prices?.[0].discounted?.value?.centAmount

  const navigateTo = (productId: string): Promise<void> | void => {
    return navigate(generatePath(ROUTES.PRODUCT, { productId }))
  }

  return (
    <Card
      className="w-full m-0 max-w-2xs aspect-[3/4] hover:scale-105 hover:shadow-xl/30 transition duration-300 hover:bg-stone-50 cursor-pointer"
      onClick={() => void navigateTo(product.id)}
    >
      <CardContent className="space-y-0 h-full flex flex-col justify-between gap-y-2 relative">
        {discountPrice !== undefined && <SaleBadge />}
        <ProductImage imageUrl={image} alt={name} />
        <hr />
        <CardTitle className="leading-normal line-clamp-1">{name}</CardTitle>
        <CardDescription className="flex-1 line-clamp-2">{description}</CardDescription>
        <div className="flex justify-between items-center">
          <ProductPrice startPrice={price} discountPrice={discountPrice} />
          <AddToCartButton product={product} />
        </div>
      </CardContent>
    </Card>
  )
}
