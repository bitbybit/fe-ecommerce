import { useState, type Dispatch, type SetStateAction } from 'react'
import { useParams } from 'react-router'
import { type ProductProjection } from '@commercetools/platform-sdk'
import { toast } from 'sonner'
import {
  ITEMS_PER_PAGE,
  PRODUCT_LIST_DEFAULT_APPLIED_FILTERS,
  PRODUCT_LIST_DEFAULT_APPLIED_SORT,
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
  total: number
}

export type ProductListAppliedPayload = {
  filters: ProductListAppliedFilters
  sort: ProductListAppliedSort
}

const cache: ProductListAppliedPayload = {
  filters: [...PRODUCT_LIST_DEFAULT_APPLIED_FILTERS],
  sort: [...PRODUCT_LIST_DEFAULT_APPLIED_SORT]
}

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
  const [total, setTotal] = useState<number>(0)
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
        { ...parameters, limit: ITEMS_PER_PAGE },
        cache.filters,
        cache.sort,
        searchText,
        categoryId
      )
      setProducts(response.body.results)
      setTotal(response.body.total ?? 0)
      setStatus(CATALOG_STATUS.READY)
    } catch (error) {
      setStatus(CATALOG_STATUS.ERROR)

      toast(error instanceof Error ? error.message : 'Unknown error while getting products')
    }
  }

  return { products, fetchProducts, total }
}
