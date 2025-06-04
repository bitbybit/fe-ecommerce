import { type ReactElement } from 'react'
import { type Control, Controller } from 'react-hook-form'
import { type ProductListFilter } from '~/api/namespaces/product'
import { FilterPrice } from './fields/FilterPrice'
import { FilterSwitch } from './fields/FilterSwitch'
import { FilterSelect } from './fields/FilterSelect'

type FilterFormFieldProperties = {
  control: Control
  filter: ProductListFilter
}

function getDefaultFilterValue(filter: ProductListFilter): number[] | boolean | string {
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

function isRangeFilterValue(value: unknown): value is number[] {
  return Array.isArray(value) && typeof value?.[0] === 'number' && typeof value?.[1] === 'number'
}

function isBooleanFilterValue(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

function isSetFilterValue(value: unknown): value is string {
  return typeof value === 'string'
}

export function FilterPriceController({ control, filter }: FilterFormFieldProperties): ReactElement {
  if (filter.type !== 'range') {
    throw new Error('Price filter controller must be a range type')
  }

  const defaultValue = getDefaultFilterValue(filter)

  if (!isRangeFilterValue(defaultValue)) {
    throw new TypeError('Range filter value must be a number tuple')
  }

  const [min, max] = defaultValue

  return (
    <Controller
      key={filter.key}
      name={filter.key}
      control={control}
      defaultValue={[min, max]}
      render={({ field }) => (
        <FilterPrice
          label={filter.label}
          value={isRangeFilterValue(field.value) ? field.value : [min, max]}
          range={[min, max]}
          onChange={field.onChange}
        />
      )}
    />
  )
}

export function FilterSwitchController({ control, filter }: FilterFormFieldProperties): ReactElement {
  if (filter.type !== 'boolean') {
    throw new Error('Switch filter controller must be a boolean type')
  }

  const defaultValue = getDefaultFilterValue(filter)

  if (!isBooleanFilterValue(defaultValue)) {
    throw new TypeError('Boolean filter value must be a boolean')
  }

  return (
    <Controller
      key={filter.key}
      name={filter.key}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FilterSwitch
          label={filter.label}
          onChange={field.onChange}
          value={isBooleanFilterValue(field.value) ? field.value : defaultValue}
        />
      )}
    />
  )
}

export function FilterSelectController({ control, filter }: FilterFormFieldProperties): ReactElement {
  if (filter.type !== 'set') {
    throw new Error('Select filter controller must be a set type')
  }

  const defaultValue = getDefaultFilterValue(filter)

  if (!isSetFilterValue(defaultValue)) {
    throw new TypeError('Set filter value must be a string')
  }

  return (
    <Controller
      key={filter.key}
      name={filter.key}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FilterSelect
          label={filter.label}
          options={filter.options.map((option) => ({
            ...option,
            value: option.value
          }))}
          onChange={field.onChange}
          value={isSetFilterValue(field.value) ? field.value : defaultValue}
        />
      )}
    />
  )
}

export function FilterFormField({ control, filter }: FilterFormFieldProperties): ReactElement {
  if (filter.type === 'range' && filter.key === 'price') {
    return <FilterPriceController control={control} filter={filter} />
  }

  if (filter.type === 'boolean') {
    return <FilterSwitchController control={control} filter={filter} />
  }

  if (filter.type === 'set') {
    return <FilterSelectController control={control} filter={filter} />
  }

  throw new Error('Can not get controller for unknown filter type')
}
