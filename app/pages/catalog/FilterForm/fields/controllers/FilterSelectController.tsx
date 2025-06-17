import { type ReactElement } from 'react'
import { Controller } from 'react-hook-form'
import { FilterSelect } from '../FilterSelect'
import { type FilterFormFieldProps, getDefaultFilterValue, isSetFilterValue } from '../../FilterFormField.utils'

export function FilterSelectController({ control, filter }: FilterFormFieldProps): ReactElement {
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
