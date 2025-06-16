import type { ReactElement } from 'react'
import { ProductImage } from '~/components/product/ProductImage'
import { ProductPrice } from '~/components/product/ProductPrice'
import { Card, CardContent, CardTitle } from '~/components/ui/Card'
import { QuantityControl } from './QuantityControl'
import { formatProductItemPrice } from '~/utils/formatPrice'
import type { Price } from '@commercetools/platform-sdk'
import { Button } from '~/components/ui/Button'
import { Trash2 } from 'lucide-react'

type CartItemViewProperties = {
  name: string
  imageUrl?: string
  price: Price
  quantity: number
  totalPrice: number
  onIncrease: () => void
  onDecrease: () => void
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function CartItemView({
  name,
  imageUrl,
  price,
  quantity,
  totalPrice,
  onIncrease,
  onDecrease,
  onDelete
}: CartItemViewProperties): ReactElement {
  return (
    <Card className="w-full max-w-2xl py-4 sm:py-6">
      <CardContent className="space-y-2 px-4 sm:px-6">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-y-4">
            <CardTitle>{name}</CardTitle>
            <ProductPrice startPrice={price.value.centAmount} discountPrice={price.discounted?.value?.centAmount} />
          </div>
          <div className="w-[100px]">
            <ProductImage imageUrl={imageUrl} alt={name} />
          </div>
        </div>
        <hr />
        <div className="flex items-center justify-between gap-2">
          <QuantityControl quantity={quantity} onIncrease={onIncrease} onDecrease={onDecrease} />
          <div className="text-sm">Total: {formatProductItemPrice(totalPrice)}</div>
          <Button variant="outline" onClick={onDelete}>
            <Trash2 />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
