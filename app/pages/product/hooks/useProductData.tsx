import { useState, useEffect } from 'react'
import { productApi } from '~/api/namespaces/product'
import { toast } from 'sonner'
import type { ProductProjection } from '@commercetools/platform-sdk'

export enum PRODUCT_STATUS {
  LOADING = 'LOADING',
  READY = 'READY',
  ERROR = 'ERROR'
}

type UseProductDataResult = {
  product: ProductProjection | undefined
  status: PRODUCT_STATUS
}

export function useProductData(): UseProductDataResult {
  const [product, setProduct] = useState<ProductProjection>()
  const [status, setStatus] = useState<PRODUCT_STATUS>(PRODUCT_STATUS.LOADING)

  useEffect(() => {
    async function fetchProductsData(): Promise<void> {
      setStatus(PRODUCT_STATUS.LOADING)
      try {
        const response = await productApi.getProductByID()
        setProduct(response.body)
        setStatus(PRODUCT_STATUS.READY)
      } catch (error) {
        setStatus(PRODUCT_STATUS.ERROR)
        toast(error instanceof Error ? error.message : 'Unknown error while getting product data')
      }
    }

    void fetchProductsData()
  }, [])

  return { product, status }
}
