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

export function FilterPriceController({ control, filter }: FilterFormFieldProperties): ReactElement {
  const [min, max] = filter.options.map(({ value }) => value)

  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('Range values must be a number')
  }

  return (
    <Controller
      key={filter.key}
      name={filter.key}
      control={control}
      defaultValue={[min, max]}
      render={({ field }) => (
        <FilterPrice
          label={filter.label}
          value={Array.isArray(field.value) ? field.value : [min, max]}
          range={[min, max]}
          onChange={field.onChange}
        />
      )}
    />
  )
}

export function FilterSwitchController({ control, filter }: FilterFormFieldProperties): ReactElement {
  return (
    <Controller
      key={filter.key}
      name={filter.key}
      control={control}
      defaultValue={false}
      render={({ field }) => (
        <FilterSwitch
          label={filter.label}
          onChange={field.onChange}
          value={typeof field.value === 'boolean' ? field.value : false}
        />
      )}
    />
  )
}

export function FilterSelectController({ control, filter }: FilterFormFieldProperties): ReactElement {
  return (
    <Controller
      key={filter.key}
      name={filter.key}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <FilterSelect
          label={filter.label}
          options={filter.options.map((option) => ({
            ...option,
            value: String(option.value)
          }))}
          onChange={field.onChange}
          value={typeof field.value === 'string' ? field.value : ''}
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

  throw new Error('Unknown field type')
}
