import { useState, useEffect } from 'react'
import type { LocalizedString } from '@commercetools/platform-sdk'
import { productApi } from '~/api/namespaces/product'
import { toast } from 'sonner'

type Image = {
  dimensions: {
    w: number
    h: number
  }
  url: string
}

type ProductData = {
  name?: LocalizedString
  description?: LocalizedString
  price?: number
  discount?: number
  images?: Image[]
}

export function useProductData(): ProductData {
  const [product, setProduct] = useState<ProductData>({})
  useEffect(() => {
    async function fetchProductsData(): Promise<void> {
      try {
        const response = await productApi.getProductByID()
        const variant = response.body.masterVariant
        const priceInfo = variant.prices?.[0]

        setProduct({
          name: response.body.name,
          description: response.body.description,
          images: variant.images,
          price: priceInfo?.value?.centAmount,
          discount: priceInfo?.discounted?.value?.centAmount
        })
      } catch {
        toast('Error while getting products')
      }
    }

    void fetchProductsData()
  }, [])

  return product
}
