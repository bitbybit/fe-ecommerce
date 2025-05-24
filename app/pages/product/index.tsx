import type { ProductProjection } from '@commercetools/platform-sdk'
import { type ReactElement } from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '~/components/ui/card'
import { useTitle } from '~/hooks/use-title'
import { ShoppingCart } from 'lucide-react'
import { Button } from '~/components/ui/button'

export default function Product({ product }: { product: ProductProjection }): ReactElement {
  useTitle('Product')

  const name = product.name['en-US']
  const description = product.description?.['en-US'] ?? name
  const image = product.masterVariant.images?.[0]?.url
  const TO_CENT_DOLLAR = 100
  const price = '$' + Number(product.masterVariant.prices?.[0].value.centAmount) / TO_CENT_DOLLAR

  return (
    <Card className="h-[470px] max-w-xs">
      <CardContent className="space-y-0 h-full flex flex-col justify-between">
        <div className="pb-[15px] border-b border-gray-200">
          <img src={image} alt={name} className="w-100 h-70 object-contain" />
        </div>
        <CardTitle className="line-clamp-1">{name}</CardTitle>
        <CardDescription className="max-h-[20%] line-clamp-2">{description}</CardDescription>
        <div className="flex justify-between items-center">
          <div>{price}</div>
          <Button variant="outline" size="icon">
            <ShoppingCart size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
