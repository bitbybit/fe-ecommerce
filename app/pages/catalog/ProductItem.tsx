import { type ProductProjection } from '@commercetools/platform-sdk'
import { type ReactElement } from 'react'
import { generatePath, useNavigate } from 'react-router'
import { Card, CardContent, CardDescription, CardTitle } from '~/components/ui/Card'
import { Check, ShoppingCart } from 'lucide-react'
import { Button } from '~/components/ui/Button'
import { SaleBadge } from '~/components/product/SaleBadge'
import { AspectRatio } from '~/components/ui/AspectRatio'
import { ProductPrice } from '~/components/product/ProductPrice'
import { ROUTES } from '~/routes'

type ProductItemProperties = { product: ProductProjection }

export function ProductItem({ product }: ProductItemProperties): ReactElement {
  const navigate = useNavigate()

  const name = product.name['en-US']
  const description = product.description?.['en-US'] ?? name
  const image = product.masterVariant.images?.[0]?.url
  const price = product.masterVariant.prices?.[0]?.value?.centAmount ?? 0
  const discountPrice = product.masterVariant.prices?.[0].discounted?.value?.centAmount

  const navigateTo = (productId: string): Promise<void> | void => {
    return navigate(generatePath(ROUTES.PRODUCT, { productId }))
  }

  return (
    <Card
      className="w-full m-0 max-w-2xs aspect-[3/4] hover:scale-105 hover:shadow-xl/30 transition duration-300 hover:bg-stone-50"
      onClick={() => void navigateTo(product.id)}
    >
      <CardContent className="space-y-0 h-full flex flex-col justify-between gap-y-2 relative">
        {discountPrice !== undefined && <SaleBadge />}
        <AspectRatio ratio={4 / 3} className="bg-white rounded-md">
          <img src={image} alt={name} className="w-full h-full object-contain" />
        </AspectRatio>
        <hr />
        <CardTitle className="leading-normal line-clamp-1">{name}</CardTitle>
        <CardDescription className="flex-1 line-clamp-2">{description}</CardDescription>
        <div className="flex justify-between items-center">
          <ProductPrice startPrice={price} discountPrice={discountPrice} />
          <AddToCartButton productId={product.id} />
        </div>
      </CardContent>
    </Card>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function AddToCartButton({ productId }: { productId: string }): ReactElement {
  // TODO:
  const isProductInCart = false

  return (
    <div onClick={(event) => event.stopPropagation()}>
      <Button
        variant={isProductInCart ? 'secondary' : 'outline'}
        size="icon"
        className="relative cursor-pointer disabled:opacity-100"
        disabled={isProductInCart}
      >
        <ShoppingCart size={16} />
        {isProductInCart && <Check className="text-green-400 absolute bottom-0 right-0" />}
      </Button>
    </div>
  )
}
