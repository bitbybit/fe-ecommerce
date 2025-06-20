import { type ReactElement } from 'react'
import { Controller } from 'react-hook-form'
import { FilterSwitch } from '../FilterSwitch'
import { type FilterFormFieldProps, getDefaultFilterValue, isBooleanFilterValue } from '../../FilterFormField.utils'

export function FilterSwitchController({ control, filter }: FilterFormFieldProps): ReactElement {
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
