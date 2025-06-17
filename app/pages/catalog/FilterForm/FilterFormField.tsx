import { type ReactElement } from 'react'
import { type FilterFormFieldProps } from './FilterFormField.utils'
import { FilterPriceController } from './fields/controllers/FilterPriceController'
import { FilterSwitchController } from './fields/controllers/FilterSwitchController'
import { FilterSelectController } from './fields/controllers/FilterSelectController'

export function FilterFormField({ control, filter }: FilterFormFieldProps): ReactElement {
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
