import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { type ProductProjection } from '@commercetools/platform-sdk'
import {
  productApi,
  type ProductListFilter,
  type ProductListQueryParameters,
  type ProductListAppliedFilters,
  type ProductListAppliedSort,
  type CategoryFilter
} from '~/api/namespaces/product'

export enum CATALOG_STATUS {
  LOADING = 'LOADING',
  READY = 'READY',
  ERROR = 'ERROR'
}

export type UseCatalogDataResult = {
  fetchProducts: (
    payload?: ProductListQueryParameters,
    filters?: ProductListAppliedFilters,
    sort?: ProductListAppliedSort,
    searchText?: string
  ) => Promise<void>
  filters: ProductListFilter[]
  products: ProductProjection[]
  categories: CategoryFilter[]
  status: CATALOG_STATUS
}

// eslint-disable-next-line max-lines-per-function
export function useCatalogData(): UseCatalogDataResult {
  const [products, setProducts] = useState<ProductProjection[]>([])
  const [filters, setFilters] = useState<ProductListFilter[]>([])
  const [status, setStatus] = useState<CATALOG_STATUS>(CATALOG_STATUS.LOADING)
  const [categories, setCategories] = useState<CategoryFilter[]>([])

  const fetchProducts = async (
    payload?: ProductListQueryParameters,
    filters?: ProductListAppliedFilters,
    sort?: ProductListAppliedSort,
    searchText?: string
  ): Promise<void> => {
    setProducts([])
    setStatus(CATALOG_STATUS.LOADING)
    try {
      const response = await productApi.getProducts({ ...payload, limit: 100 }, filters, sort, searchText)
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

  const fetchCategories = async (): Promise<void> => {
    setCategories([])
    setStatus(CATALOG_STATUS.LOADING)
    try {
      const categories = await productApi.buildCategoriesTree()
      setCategories(categories)
      setStatus(CATALOG_STATUS.READY)
    } catch (error) {
      setStatus(CATALOG_STATUS.ERROR)
      toast(error instanceof Error ? error.message : 'Unknown error while getting product categories')
    }
  }

  useEffect(() => void Promise.all([fetchFilters(), fetchProducts(), fetchCategories()]), [])

  return { products, filters, categories, status, fetchProducts }
}
