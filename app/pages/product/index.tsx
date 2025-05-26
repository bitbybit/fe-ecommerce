import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/use-title'
import { productApi } from '~/api/namespaces/product'
import { useState, useEffect } from 'react'
import type { LocalizedString } from '@commercetools/platform-sdk'
import { Card, CardContent } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { P, H3, H1 } from '~/components/ui/typography'
type Image = {
  dimensions: {
    w: number
    h: number
  }
  url: string
}

/* eslint-disable-next-line max-lines-per-function */
export default function Routes(): ReactElement {
  useTitle('About')

  const [name, setName] = useState<LocalizedString | undefined>()
  const [description, setDescription] = useState<LocalizedString | undefined>()
  const [price, setPrice] = useState<number | undefined>()
  const [image, setImage] = useState<Image | undefined>()

  useEffect(() => {
    async function fetchProducts(): Promise<void> {
      try {
        const response = await productApi.getProductByID()
        console.log(response)
        setName(response.body.name)
        setDescription(response.body.description ?? undefined)
        setImage(response.body.masterVariant.images?.[0] ?? undefined)
        setPrice(response.body.masterVariant.prices?.[0].value?.centAmount ?? undefined)
      } catch (error) {
        console.error('error while getting products:', error)
      }
    }

    void fetchProducts()
  }, [])

  return (
    <div className="w-full flex flex-col items-start gap-10">
      <div>
        <Button variant="outline" onClick={() => history.back()}>
          ← Back to catalog
        </Button>
      </div>
      <Card className="w-full rounded-xl border border-muted bg-card shadow-sm">
        <CardContent className="flex flex-col md:flex-row gap-8 items-start justify-start p-6 text-left">
          {image && (
            <img
              src={image.url}
              width={image.dimensions.w}
              height={image.dimensions.h}
              alt={name?.['en-US'] ?? 'Product'}
              className="max-w-[400px] h-auto object-contain self-start"
            />
          )}

          <div className="flex-1 flex flex-col justify-start gap-4 text-left">
            <H1 className="text-2xl font-semibold">{name ? name['en-US'] : 'Loading...'}</H1>
            <P className="text-muted-foreground">{description ? description['en-US'] : 'Loading...'}</P>
            <H3>{price ? `$${(price / 100).toFixed(2)}` : 'Loading...'}</H3>
            <Button variant="default" size="lg">
              Add to cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
