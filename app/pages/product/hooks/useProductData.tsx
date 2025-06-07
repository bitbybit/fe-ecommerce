import { type ProductProjection } from '@commercetools/platform-sdk'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'
import { productApi, type ProductListCategory } from '~/api/namespaces/product'
import { ROUTES } from '~/routes'

export enum PRODUCT_STATUS {
  LOADING = 'LOADING',
  READY = 'READY',
  ERROR = 'ERROR'
}

type UseProductDataResult = {
  categories: ProductListCategory[]
  product: ProductProjection | undefined
  status: PRODUCT_STATUS
}

export function useProductData(): UseProductDataResult {
  const [product, setProduct] = useState<ProductProjection>()
  const [categories, setCategories] = useState<ProductListCategory[]>([])
  const [status, setStatus] = useState<PRODUCT_STATUS>(PRODUCT_STATUS.LOADING)

  const navigate = useNavigate()
  const { productId } = useParams()

  useEffect(() => {
    async function fetchProductData(): Promise<void> {
      if (productId === undefined) {
        throw new Error('Product id must be provided')
      }

      setStatus(PRODUCT_STATUS.LOADING)
      try {
        const response = await productApi.getProductById(productId)
        const categories = await productApi.getCategories()
        setCategories(categories)
        setProduct(response.body)
        setStatus(PRODUCT_STATUS.READY)
      } catch (error) {
        setStatus(PRODUCT_STATUS.ERROR)
        toast(error instanceof Error ? error.message : 'Unknown error while getting product data')
        await navigate(ROUTES.CATALOG, { replace: true })
      }
    }

    void fetchProductData()
  }, [navigate, productId])

  return { categories, product, status }
}
