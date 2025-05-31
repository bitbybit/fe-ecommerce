import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { type ProductProjection } from '@commercetools/platform-sdk'
import {
  productApi,
  type ProductListFilter,
  type ProductListQueryParameters,
  type ProductListAppliedFilters
} from '~/api/namespaces/product'

export enum CATALOG_STATUS {
  LOADING = 'LOADING',
  READY = 'READY',
  ERROR = 'ERROR'
}

export type UseCatalogDataResult = {
  fetchProducts: (payload?: ProductListQueryParameters) => Promise<void>
  filters: ProductListFilter[]
  products: ProductProjection[]
  status: CATALOG_STATUS
}

/**
 * Fetch products and available filters
 * @returns UseCatalogDataResult
 */
export function useCatalogData(): UseCatalogDataResult {
  const [products, setProducts] = useState<ProductProjection[]>([])
  const [filters, setFilters] = useState<ProductListFilter[]>([])
  const [status, setStatus] = useState<CATALOG_STATUS>(CATALOG_STATUS.LOADING)

  const fetchProducts = async (
    payload?: ProductListQueryParameters,
    filters?: ProductListAppliedFilters
  ): Promise<void> => {
    setProducts([])
    setStatus(CATALOG_STATUS.LOADING)

    try {
      const response = await productApi.getProducts({ ...payload, limit: 100 }, filters)
      setProducts(response.body.results)
      setStatus(CATALOG_STATUS.READY)
    } catch (error) {
      setStatus(CATALOG_STATUS.ERROR)
      toast(error instanceof Error ? error.message : 'Unknown error while getting products')
    }
  }

  const fetchFilters = async (): Promise<void> => {
    setFilters([])
    setStatus(CATALOG_STATUS.LOADING)

    try {
      const filters = await productApi.getFilters()
      setFilters(filters)
      setStatus(CATALOG_STATUS.READY)
    } catch (error) {
      setStatus(CATALOG_STATUS.ERROR)
      toast(error instanceof Error ? error.message : 'Unknown error while getting product filters')
    }
  }

  useEffect(() => void Promise.all([fetchFilters(), fetchProducts()]), [])

  return { products, filters, status, fetchProducts }
}
