import { type ReactElement } from 'react'
import { type Control, Controller } from 'react-hook-form'
import { type ProductListSort } from '~/api/namespaces/product'
import { FilterSelect } from './fields/FilterSelect'

type FilterFormFieldProperties = {
  control: Control
  sort: ProductListSort
}

export function SortFormField({ control, sort }: FilterFormFieldProperties): ReactElement {
  return (
    <Controller
      key={sort.key}
      name={sort.key}
      control={control}
      defaultValue={sort.defaultValue}
      render={({ field }) => (
        <FilterSelect
          label={sort.label}
          options={sort.options}
          onChange={field.onChange}
          value={typeof field.value === 'string' ? field.value : ''}
        />
      )}
    />
  )
}
