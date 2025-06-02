import { type ProductListAppliedSort } from './fields/Sort'

/**
 * format the sort values sort=name-asc -> { key: 'name.en-US', value: 'asc'}
 * @param values
 * @returns
 */
export function splitValues(values: Record<string, string | [number, number]>): {
  sort: ProductListAppliedSort
  filter: Record<string, string | [number, number]>
} {
  const sort: ProductListAppliedSort = []
  const filter: Record<string, string | [number, number]> = {}

  for (const [key, value] of Object.entries(values)) {
    if (key.startsWith('sort') && typeof value === 'string') {
      const [field, direction] = value.split('-')

      if (field === 'name' && (direction === 'asc' || direction === 'desc')) {
        sort.push({ key: 'name.en-US', value: direction })
      } else if (field === 'price' && (direction === 'asc' || direction === 'desc')) {
        sort.push({ key: field, value: direction })
      }
    } else {
      filter[key] = value
    }
  }

  return { sort, filter }
}
