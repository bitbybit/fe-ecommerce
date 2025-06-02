import type { ProductListAppliedFilters, ProductListFilter } from '~/api/namespaces/product'
import { FilterType } from './FilterFormFields'

/**
 * transforms all form field values into a request object
 * @param values
 * @param filters
 * @returns objects array
 */
export function transformFormFieldValues(
  values: Record<string, string | [number, number]>,
  filters: ProductListFilter[]
): ProductListAppliedFilters {
  return Object.entries(values)
    .map(([key, value]) => {
      const filter = filters.find((filter) => filter.key === key)

      if (!filter) return

      if (filter.type === FilterType.Range && Array.isArray(value)) {
        return {
          key: filter.key,
          type: filter.type,
          value: value
        }
      } else if (filter.type !== FilterType.Range && typeof value === 'string') {
        return {
          key: filter.key,
          type: filter.type,
          value: value
        }
      }
    })
    .filter((item) => item !== undefined)
}
