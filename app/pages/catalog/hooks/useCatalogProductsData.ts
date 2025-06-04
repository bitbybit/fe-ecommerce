import { useState, type Dispatch, type SetStateAction } from 'react'
import { useParams } from 'react-router'
import { type ProductProjection } from '@commercetools/platform-sdk'
import { toast } from 'sonner'
import {
  productApi,
  type ProductListAppliedFilters,
  type ProductListAppliedSort,
  type ProductListQueryParameters
} from '~/api/namespaces/product'
import { CATALOG_STATUS } from './useCatalogData'

export type UseCatalogProductsDataResult = {
  products: ProductProjection[]
  fetchProducts: (
    payload?: ProductListQueryParameters,
    filters?: ProductListAppliedFilters,
    sort?: ProductListAppliedSort,
    searchText?: string
  ) => Promise<void>
}

export type ProductListAppliedPayload = {
  filters: ProductListAppliedFilters
  sort: ProductListAppliedSort
}

const cache: ProductListAppliedPayload = { filters: [], sort: [] }

const updateCache = (
  filters: ProductListAppliedFilters | undefined,
  sort: ProductListAppliedSort | undefined
): void => {
  if (filters !== undefined && filters.length > 0) cache.filters = filters
  if (sort !== undefined && sort.length > 0) cache.sort = sort
}

export function useCatalogProductsData({
  setStatus
}: {
  setStatus: Dispatch<SetStateAction<CATALOG_STATUS>>
}): UseCatalogProductsDataResult {
  const [products, setProducts] = useState<ProductProjection[]>([])
  const { categoryId = '' } = useParams()

  const fetchProducts = async (
    parameters?: ProductListQueryParameters,
    filters?: ProductListAppliedFilters,
    sort?: ProductListAppliedSort,
    searchText?: string
  ): Promise<void> => {
    setProducts([])
    setStatus(CATALOG_STATUS.LOADING)
    updateCache(filters, sort)

    try {
      const response = await productApi.getProducts(
        { ...parameters, limit: 100 },
        cache.filters,
        cache.sort,
        searchText,
        categoryId
      )

      setProducts(response.body.results)
      setStatus(CATALOG_STATUS.READY)
    } catch (error) {
      setStatus(CATALOG_STATUS.ERROR)

      toast(error instanceof Error ? error.message : 'Unknown error while getting products')
    }
  }

  return { products, fetchProducts }
}
