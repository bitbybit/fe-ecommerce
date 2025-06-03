import { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import {
  PRODUCT_LIST_FILTER_FALSE,
  PRODUCT_LIST_FILTER_TRUE,
  PRODUCT_LIST_FILTER_NONE,
  type ProductListAppliedFilters,
  type ProductListAppliedSort,
  type ProductListFilter,
  type ProductListSort,
  PRODUCT_LIST_SORT_ASC,
  PRODUCT_LIST_SORT_DESC
} from '~/api/namespaces/product'
import { Button } from '~/components/ui/Button'
import { Label } from '~/components/ui/Label'
import { FilterFormField } from './FilterFormField'
import { SortFormField } from './SortFormField'
import { type UseCatalogDataResult } from '../hooks/useCatalogData'

// TODO: items per page
export const PRODUCTS_LIMIT = 100

type FilterFormBodyProperties = {
  filters: ProductListFilter[]
  fetch: UseCatalogDataResult['fetchProducts']
}

const SORT_KEY_PREFIX = 'sort_'

const sorts: ProductListSort[] = [
  {
    key: `${SORT_KEY_PREFIX}price`,
    label: 'Price',
    defaultValue: PRODUCT_LIST_SORT_DESC,
    options: [
      { label: 'Price', value: PRODUCT_LIST_FILTER_NONE },
      { label: 'Price ↑', value: PRODUCT_LIST_SORT_ASC },
      { label: 'Price ↓', value: PRODUCT_LIST_SORT_DESC }
    ]
  },
  {
    key: `${SORT_KEY_PREFIX}name_en-US`,
    label: 'Name',
    defaultValue: PRODUCT_LIST_FILTER_NONE,
    options: [
      { label: 'Name', value: PRODUCT_LIST_FILTER_NONE },
      { label: 'Name ↑', value: PRODUCT_LIST_SORT_ASC },
      { label: 'Name ↓', value: PRODUCT_LIST_SORT_DESC }
    ]
  }
]

export type FormValues = Record<string, unknown>

const convertFormValuesToAppliedFilters = (
  data: FormValues,
  filters: ProductListFilter[]
): ProductListAppliedFilters => {
  return filters
    .map((filter) => {
      const formValue = data[filter.key]

      if (
        formValue === undefined ||
        formValue === '' ||
        formValue === PRODUCT_LIST_FILTER_NONE ||
        (Array.isArray(formValue) && formValue.length === 0) ||
        filter.key.startsWith(SORT_KEY_PREFIX)
      ) {
        return
      }

      let value = formValue
      if (value === true) {
        value = PRODUCT_LIST_FILTER_TRUE
      } else if (value === false) {
        value = PRODUCT_LIST_FILTER_FALSE
      }

      return {
        key: filter.key,
        type: filter.type,
        value
      }
    })
    .filter((filter): filter is ProductListAppliedFilters[number] => filter !== undefined)
}

const convertFormValuesToSort = (data: FormValues, sorts: ProductListSort[]): ProductListAppliedSort => {
  return sorts
    .map((sort) => {
      const formValue = data[sort.key]

      if (!sort.key.startsWith(SORT_KEY_PREFIX) || formValue === PRODUCT_LIST_FILTER_NONE) {
        return
      }

      return {
        key: sort.key.slice(SORT_KEY_PREFIX.length),
        value: formValue
      }
    })
    .filter((item): item is ProductListAppliedSort[number] => item !== undefined)
}

function getDefaultFormValues(filters: ProductListFilter[], sorts: ProductListSort[]): FormValues {
  return {
    ...Object.fromEntries(
      filters
        .filter((filter) => filter.type === 'range')
        .map(({ key, options }) => [key, options.map(({ value }) => value)])
    ),
    ...Object.fromEntries(filters.filter((filter) => filter.type === 'boolean').map(({ key }) => [key, false])),
    ...Object.fromEntries(filters.filter((filter) => filter.type === 'set').map(({ key }) => [key, ''])),
    ...Object.fromEntries(sorts.map((sort) => [sort.key, sort.defaultValue]))
  }
}

export function FilterFormBody({ filters, fetch }: FilterFormBodyProperties): ReactElement {
  const defaultValues = getDefaultFormValues(filters, sorts)
  const form = useForm<FormValues>({ defaultValues })

  const handleApply = (data: FormValues): Promise<void> =>
    fetch(
      { limit: PRODUCTS_LIMIT },
      convertFormValuesToAppliedFilters(data, filters),
      convertFormValuesToSort(data, sorts)
    )

  const handleReset = (): Promise<void> => {
    form.reset(defaultValues)
    return handleApply(form.getValues())
  }

  return (
    <form
      onSubmit={(event) => void form.handleSubmit(handleApply)(event)}
      className="space-y-4 pl-2 pt-2 w-1/4 min-w-[180px] max-w-[220px]"
    >
      {filters.map((filter, index) => (
        <FilterFormField control={form.control} filter={filter} key={`${filter.type}-${filter.key}-${index}`} />
      ))}
      <Label>Sort</Label>
      {sorts.map((sort, index) => (
        <SortFormField sort={sort} sorts={sorts} key={`${sort.key}-${index}`} form={form} />
      ))}
      <hr />
      <div className="flex justify-between">
        <Button variant="outline" type="button" onClick={() => void handleReset()}>
          Reset
        </Button>
        <Button type="submit">Apply</Button>
      </div>
    </form>
  )
}
