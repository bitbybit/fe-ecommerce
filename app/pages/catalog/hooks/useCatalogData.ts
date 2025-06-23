import { useState, useEffect, type Dispatch, type SetStateAction } from 'react'
import { useParams } from 'react-router'
import { PRODUCT_LIST_ITEMS_PER_PAGE } from '~/api/namespaces/product'
import { useCatalogCategoriesData, type UseCatalogCategoriesDataResult } from './useCatalogCategoriesData'
import { useCatalogProductsData, type UseCatalogProductsDataResult } from './useCatalogProductsData'
import { useCatalogFiltersData, type UseCatalogFiltersDataResult } from './useCatalogFiltersData'

export enum CATALOG_STATUS {
  LOADING = 'LOADING',
  READY = 'READY',
  ERROR = 'ERROR'
}

export type UseCatalogDataResult = {
  categories: UseCatalogCategoriesDataResult['categories']
  currentPage: number
  fetchProducts: UseCatalogProductsDataResult['fetchProducts']
  filters: UseCatalogFiltersDataResult['filters']
  hasNoProducts: boolean
  pagesCount: number
  products: UseCatalogProductsDataResult['products']
  resetCurrentPageAndSearchText: () => void
  searchText: string
  setCurrentPage: Dispatch<SetStateAction<number>>
  setSearchText: Dispatch<SetStateAction<string>>
  status: CATALOG_STATUS
}

export function useCatalogData(): UseCatalogDataResult {
  const [status, setStatus] = useState<CATALOG_STATUS>(CATALOG_STATUS.LOADING)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchText, setSearchText] = useState<string>('')
  const { categoryId = '' } = useParams()
  const { categories, fetchCategories } = useCatalogCategoriesData({ setStatus })
  const { products, fetchProducts, total } = useCatalogProductsData({ setStatus })
  const { filters, fetchFilters } = useCatalogFiltersData({ setStatus })
  const hasNoProducts = status === CATALOG_STATUS.READY && products.length === 0
  const pagesCount = Math.ceil(total / PRODUCT_LIST_ITEMS_PER_PAGE)

  const resetCurrentPageAndSearchText = (): void => {
    setCurrentPage(1)
    setSearchText('')
  }

  useEffect(() => void Promise.all([fetchFilters(), fetchProducts(), fetchCategories()]), [])

  useEffect(() => void fetchProducts(), [categoryId])

  return {
    categories,
    currentPage,
    fetchProducts,
    filters,
    hasNoProducts,
    pagesCount,
    products,
    resetCurrentPageAndSearchText,
    searchText,
    setCurrentPage,
    setSearchText,
    status
  }
}
