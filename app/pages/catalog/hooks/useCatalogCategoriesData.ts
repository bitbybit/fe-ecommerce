import { useState, type Dispatch, type SetStateAction } from 'react'
import { toast } from 'sonner'
import { productApi, type ProductListCategory } from '~/api/namespaces/product'
import { CATALOG_STATUS } from './useCatalogData'

export type UseCatalogCategoriesDataResult = {
  categories: ProductListCategory[]
  fetchCategories: () => Promise<void>
}

export function useCatalogCategoriesData({
  setStatus
}: {
  setStatus: Dispatch<SetStateAction<CATALOG_STATUS>>
}): UseCatalogCategoriesDataResult {
  const [categories, setCategories] = useState<ProductListCategory[]>([])

  const fetchCategories = async (): Promise<void> => {
    setCategories([])
    setStatus(CATALOG_STATUS.LOADING)

    try {
      const categories = await productApi.getCategories()

      setCategories(categories)
      setStatus(CATALOG_STATUS.READY)
    } catch (error) {
      setStatus(CATALOG_STATUS.ERROR)

      toast(error instanceof Error ? error.message : 'Unknown error while getting product products')
    }
  }

  return { categories, fetchCategories }
}
