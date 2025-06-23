import { type ReactElement, type MouseEvent } from 'react'
import { Trash2 } from 'lucide-react'
import { type Price } from '@commercetools/platform-sdk'
import { Card, CardContent, CardTitle } from '~/components/ui/Card'
import { Button } from '~/components/ui/Button'
import { ProductImage } from '~/components/product/ProductImage'
import { ProductPrice } from '~/components/product/ProductPrice'
import { QuantityControl } from './QuantityControl'
import { formatProductItemPrice } from '~/utils/formatPrice'

type CartItemViewProps = {
  name: string
  imageUrl?: string
  price: Price
  quantity: number
  totalPrice: number
  onQuantityChange: (quantity: number) => void
  onDelete: (event: MouseEvent<HTMLButtonElement>) => void
  isLoading: boolean
}

export function CartItemView({
  name,
  imageUrl,
  price,
  quantity,
  totalPrice,
  onQuantityChange,
  onDelete,
  isLoading
}: CartItemViewProps): ReactElement {
  return (
    <Card className="w-full max-w-2xl py-4 sm:py-6">
      <CardContent className="space-y-2 px-4 sm:px-6">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-y-4 items-start">
            <CardTitle>{name}</CardTitle>
            <ProductPrice startPrice={price.value.centAmount} discountPrice={price.discounted?.value?.centAmount} />
          </div>
          <div className="w-[100px]">
            <ProductImage imageUrl={imageUrl} alt={name} />
          </div>
        </div>
        <hr />
        <div className="flex items-center justify-between gap-2">
          <QuantityControl quantity={quantity} onQuantityChange={onQuantityChange} />
          <div className="text-sm">Total: {formatProductItemPrice(totalPrice)}</div>
          {isLoading ? (
            <div className="h-6 w-6 mt-3 mr-[15px] animate-spin rounded-full border-2 border-neural-300 border-t-transparent" />
          ) : (
            <Button variant="outline" onClick={onDelete}>
              <Trash2 />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
