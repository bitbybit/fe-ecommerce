import { type ReactElement } from 'react'
import { Controller } from 'react-hook-form'
import { FilterPrice } from '../FilterPrice'
import { type FilterFormFieldProps, getDefaultFilterValue, isRangeFilterValue } from '../../FilterFormField.utils'

export function FilterPriceController({ control, filter }: FilterFormFieldProps): ReactElement {
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
