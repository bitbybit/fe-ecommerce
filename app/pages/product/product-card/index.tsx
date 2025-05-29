import { type ReactElement } from 'react'
import { Card, CardContent } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { useProductData } from './use-product-data'
import { ProductImages } from './product-images'
import { ProductInfo } from './product-info'

export default function ProductCard(): ReactElement {
  const { name, description, price, discount, images } = useProductData()

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
