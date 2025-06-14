import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useCatalogCategoriesData, type UseCatalogCategoriesDataResult } from './useCatalogCategoriesData'
import { useCatalogProductsData, type UseCatalogProductsDataResult } from './useCatalogProductsData'
import { useCatalogFiltersData, type UseCatalogFiltersDataResult } from './useCatalogFiltersData'

export enum CATALOG_STATUS {
  LOADING = 'LOADING',
  READY = 'READY',
  ERROR = 'ERROR'
}

export type UseCatalogDataResult = {
  fetchProducts: UseCatalogProductsDataResult['fetchProducts']
  filters: UseCatalogFiltersDataResult['filters']
  products: UseCatalogProductsDataResult['products']
  categories: UseCatalogCategoriesDataResult['categories']
  status: CATALOG_STATUS
  total: number
}

export function useCatalogData(): UseCatalogDataResult {
  const [status, setStatus] = useState<CATALOG_STATUS>(CATALOG_STATUS.LOADING)

  const { categoryId = '' } = useParams()

  const { categories, fetchCategories } = useCatalogCategoriesData({ setStatus })
  const { products, fetchProducts, total } = useCatalogProductsData({ setStatus })
  const { filters, fetchFilters } = useCatalogFiltersData({ setStatus })

  useEffect(() => void Promise.all([fetchFilters(), fetchProducts(), fetchCategories()]), [])

  useEffect(() => void fetchProducts(), [categoryId])

  return { products, filters, categories, status, total, fetchProducts }
}
