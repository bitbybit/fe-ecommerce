import { useState, useEffect } from 'react'
import type { LocalizedString } from '@commercetools/platform-sdk'
import { productApi } from '~/api/namespaces/product'

type Image = {
  dimensions: {
    w: number
    h: number
  }
  url: string
}

export function useProductData(): {
  name: LocalizedString | undefined
  description: LocalizedString | undefined
  price: number | undefined
  discount: number | undefined
  images: Image[] | undefined
} {
  const [name, setName] = useState<LocalizedString>()
  const [description, setDescription] = useState<LocalizedString>()
  const [price, setPrice] = useState<number>()
  const [discount, setDiscount] = useState<number>()
  const [images, setImages] = useState<Image[]>()

  useEffect(() => {
    async function fetchProductsData(): Promise<void> {
      try {
        const response = await productApi.getProductByID()
        const variant = response.body.masterVariant
        const priceInfo = variant.prices?.[0]

        setName(response.body.name)
        setDescription(response.body.description ?? undefined)
        setImages(variant.images ?? undefined)
        setPrice(priceInfo?.value?.centAmount ?? undefined)
        setDiscount(priceInfo?.discounted?.value?.centAmount ?? undefined)
      } catch (error) {
        console.error('error while getting products:', error)
      }
    }

    void fetchProductsData()
  }, [])

  return { name, description, price, discount, images }
}
