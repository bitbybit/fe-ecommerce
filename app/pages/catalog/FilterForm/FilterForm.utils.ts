import {
  PRODUCT_LIST_DEFAULT_APPLIED_FILTERS,
  PRODUCT_LIST_FILTER_FALSE,
  PRODUCT_LIST_FILTER_NONE,
  PRODUCT_LIST_FILTER_TRUE,
  PRODUCT_LIST_SORT_ASC,
  PRODUCT_LIST_SORT_DESC,
  type ProductListAppliedFilters,
  type ProductListAppliedSort,
  type ProductListFilter,
  type ProductListSort
} from '~/api/namespaces/product'
import { LANG } from '~/api/client'

export type FormValues = Record<string, unknown>

export const SORT_KEY_PREFIX = 'sort_'

export const sorts: ProductListSort[] = [
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
    key: `${SORT_KEY_PREFIX}name_${LANG}`,
    label: 'Name',
    defaultValue: PRODUCT_LIST_FILTER_NONE,
    options: [
      { label: 'Name', value: PRODUCT_LIST_FILTER_NONE },
      { label: 'Name ↑', value: PRODUCT_LIST_SORT_ASC },
      { label: 'Name ↓', value: PRODUCT_LIST_SORT_DESC }
    ]
  }
]

export const convertFormValuesToAppliedFilters = (
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

export const convertFormValuesToSort = (data: FormValues, sorts: ProductListSort[]): ProductListAppliedSort => {
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

export const getDefaultFormValues = (filters: ProductListFilter[], sorts: ProductListSort[]): FormValues => {
  return {
    ...Object.fromEntries(
      filters
        .filter((filter) => filter.type === 'range')
        .map(({ key, options }) => [key, options.map(({ value }) => value)])
    ),
    ...Object.fromEntries(
      filters
        .filter((filter) => filter.type === 'boolean')
        .map(({ key }) => [
          key,
          PRODUCT_LIST_DEFAULT_APPLIED_FILTERS.find(
            (defaultAppliedFilter) => defaultAppliedFilter.type === 'boolean' && defaultAppliedFilter.key === key
          )?.value === PRODUCT_LIST_FILTER_TRUE
        ])
    ),
    ...Object.fromEntries(filters.filter((filter) => filter.type === 'set').map(({ key }) => [key, ''])),
    ...Object.fromEntries(sorts.map((sort) => [sort.key, sort.defaultValue]))
  }
}
