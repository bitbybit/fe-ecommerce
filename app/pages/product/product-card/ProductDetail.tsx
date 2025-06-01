import { type ReactElement } from 'react'
import { Card, CardContent } from '~/components/ui/Card'
import { Button } from '~/components/ui/Button'
import { ProductImages } from './ProductImages'
import { ProductInfo } from './ProductInfo'
import type { LocalizedString } from '@commercetools/platform-sdk'

type Image = {
  dimensions: { w: number; h: number }
  url: string
}

export type ProductCardProperties = {
  name: LocalizedString
  description: LocalizedString
  price: number
  discount?: number
  images?: Image[]
}

export default function ProductDetail({
  name,
  description,
  price,
  discount,
  images
}: ProductCardProperties): ReactElement {
  return (
    <div className="w-full flex flex-col items-start gap-10">
      <Button variant="outline" onClick={() => history.back()}>
        ← Back to catalog
      </Button>
      <Card className="w-full rounded-xl border border-muted bg-card shadow-sm overflow-hidden">
        <CardContent className="flex flex-col md:flex-row md:gap-40 items-start justify-start p-6 text-left break-words">
          <ProductImages images={images} />
          <ProductInfo name={name} description={description} price={price} discount={discount} />
        </CardContent>
      </Card>
    </div>
  )
}
