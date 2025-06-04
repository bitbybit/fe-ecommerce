import { useState, type Dispatch, type SetStateAction } from 'react'
import { toast } from 'sonner'
import { productApi, type ProductListFilter } from '~/api/namespaces/product'
import { CATALOG_STATUS } from './useCatalogData'

export type UseCatalogFiltersDataResult = {
  filters: ProductListFilter[]
  fetchFilters: () => Promise<void>
}

export function useCatalogFiltersData({
  setStatus
}: {
  setStatus: Dispatch<SetStateAction<CATALOG_STATUS>>
}): UseCatalogFiltersDataResult {
  const [filters, setFilters] = useState<ProductListFilter[]>([])

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

  return { filters, fetchFilters }
}
