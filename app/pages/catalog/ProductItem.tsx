import { type ProductProjection } from '@commercetools/platform-sdk'
import { type ReactElement } from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '~/components/ui/Card'
import { ShoppingCart } from 'lucide-react'
import { Button } from '~/components/ui/Button'
import { AspectRatio } from '~/components/ui/AspectRatio'
import { formatProductItemPrice } from '~/utils/formatPrice'
import { SaleBadge } from '~/components/product/SaleBadge'
import { SalePrice } from '~/components/product/SalePrice'

export function ProductItem({ product }: { product: ProductProjection }): ReactElement {
  const name = product.name['en-US']
  const description = product.description?.['en-US'] ?? name
  const image = product.masterVariant.images?.[0]?.url
  const price = formatProductItemPrice(product.masterVariant.prices?.[0].value.centAmount)
  const discountPrice = product.masterVariant.prices?.[0].discounted?.value.centAmount

  return (
    <Card className="w-full max-w-2xs aspect-[3/4] hover:scale-105 hover:shadow-xl/30 transition duration-300 cursor-pointer hover:bg-stone-50">
      <CardContent className="space-y-0 h-full flex flex-col justify-between gap-y-2 relative">
        {discountPrice && <SaleBadge />}
        <AspectRatio ratio={4 / 3} className="bg-white rounded-md">
          <img src={image} alt={name} className="w-full h-full object-contain" />
        </AspectRatio>
        <hr />
        <CardTitle className="leading-normal line-clamp-1">{name}</CardTitle>
        <CardDescription className="flex-1 line-clamp-2">{description}</CardDescription>
        <div className="flex justify-between items-center">
          <SalePrice startPrice={price} discountPrice={discountPrice} />
          <Button variant="outline" size="icon">
            <ShoppingCart size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
