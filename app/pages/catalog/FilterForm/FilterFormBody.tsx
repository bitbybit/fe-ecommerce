import { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import {
  type ProductListAppliedFilters,
  type ProductListAppliedSort,
  type ProductListFilter,
  type ProductListSort
} from '~/api/namespaces/product'
import { Button } from '~/components/ui/Button'
import { FilterFormField } from './FilterFormField'
import { type UseCatalogDataResult } from '../hooks/useCatalogData'
import { SortFormField } from '~/pages/catalog/FilterForm/SortFormField'
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from '~/components/ui/Sidebar'

// TODO: items per page
export const PRODUCTS_LIMIT = 100

type FilterFormBodyProperties = {
  filters: ProductListFilter[]
  fetch: UseCatalogDataResult['fetchProducts']
}

const sortOptions: ProductListSort[] = [
  {
    key: 'name_en-US',
    label: 'Name',
    defaultValue: 'asc',
    options: [
      { label: 'Name ASC', value: 'asc' },
      { label: 'Name DESC', value: 'desc' }
    ]
  },
  {
    key: 'price',
    label: 'Price',
    defaultValue: 'asc',
    options: [
      { label: 'Price ASC', value: 'asc' },
      { label: 'Price DESC', value: 'desc' }
    ]
  }
]

type FormValues = Record<string, unknown>

const convertFormValuesToAppliedFilters = (
  data: FormValues,
  filters: ProductListFilter[]
): ProductListAppliedFilters => {
  return filters
    .map((filter) => {
      const value = data[filter.key]

      if (
        value === undefined ||
        value === '' ||
        (Array.isArray(value) && value.length === 0) ||
        value === 'asc' ||
        value === 'desc'
      ) {
        return
      }

      return {
        key: filter.key,
        type: filter.type,
        value: value
      }
    })
    .filter((filter): filter is ProductListAppliedFilters[number] => filter !== undefined)
}

const convertFormValuesToSort = (data: FormValues, sorts: ProductListSort[]): ProductListAppliedSort => {
  return sorts
    .map((sort) => {
      const value = data[sort.key]

      if (value === 'asc' || value === 'desc') {
        return {
          key: sort.key,
          value
        }
      }
    })
    .filter((item): item is ProductListAppliedSort[number] => item !== undefined)
}

export function FilterFormBody({ filters, fetch }: FilterFormBodyProperties): ReactElement {
  const { control, handleSubmit, reset } = useForm<FormValues>()

  const handleFiltering = (data: FormValues): Promise<void> =>
    fetch(
      { limit: PRODUCTS_LIMIT },
      convertFormValuesToAppliedFilters(data, filters),
      convertFormValuesToSort(data, sortOptions)
    )

  const handleReset = (): Promise<void> => {
    reset()
    return fetch({ limit: PRODUCTS_LIMIT }, [])
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <form onSubmit={(event) => void handleSubmit(handleFiltering)(event)} className="space-y-4">
          <SidebarContent className="p-4">
            {filters.map((filter, index) => (
              <FilterFormField control={control} filter={filter} key={`${filter.type}-${filter.key}-${index}`} />
            ))}
            {sortOptions.map((sort, index) => (
              <SortFormField control={control} sort={sort} key={`${sort.key}-${index}`} />
            ))}
            <div className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => void handleReset()}>
                Reset
              </Button>
              <Button type="submit">Apply</Button>
            </div>
          </SidebarContent>
        </form>
      </Sidebar>
      <SidebarTrigger />
    </SidebarProvider>
  )
}
