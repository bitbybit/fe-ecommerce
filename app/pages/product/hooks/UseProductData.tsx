import { useState, useEffect } from 'react'
import { productApi } from '~/api/namespaces/product'
import { toast } from 'sonner'
import { type ProductData } from '../types/productTypes'

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
