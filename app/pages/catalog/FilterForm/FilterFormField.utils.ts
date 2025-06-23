import { type Control } from 'react-hook-form'
import { type ProductListFilter } from '~/api/namespaces/product'

export type FilterFormFieldProps = {
  control: Control
  filter: ProductListFilter
}

export function getDefaultFilterValue(filter: ProductListFilter): number[] | boolean | string {
  if (filter.type === 'range') {
    return filter.options.map(({ value }) => value)
  }

  if (filter.type === 'boolean') {
    return false
  }

  if (filter.type === 'set') {
    return ''
  }

  throw new Error('Can not get default value for unknown filter type')
}

export function isRangeFilterValue(value: unknown): value is number[] {
  return Array.isArray(value) && typeof value?.[0] === 'number' && typeof value?.[1] === 'number'
}

export function isBooleanFilterValue(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

export function isSetFilterValue(value: unknown): value is string {
  return typeof value === 'string'
}
