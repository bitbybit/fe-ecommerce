import { type ReactElement } from 'react'
import { type useForm, Controller } from 'react-hook-form'
import { PRODUCT_LIST_FILTER_NONE, type ProductListSort } from '~/api/namespaces/product'
import { FilterSelect } from './fields/FilterSelect'
import { type FormValues } from './FilterForm.utils'

type SortFormFieldProps = {
  form: ReturnType<typeof useForm<FormValues>>
  sort: ProductListSort
  sorts: ProductListSort[]
}

export function SortFormField({ form, sort, sorts }: SortFormFieldProps): ReactElement {
  const resetSortFields = (): void => {
    form.reset({
      ...form.getValues(),
      ...Object.fromEntries(sorts.map(({ key }) => [key, PRODUCT_LIST_FILTER_NONE]))
    })
  }

  return (
    <Controller
      key={sort.key}
      name={sort.key}
      control={form.control}
      defaultValue={sort.defaultValue}
      render={({ field }) => (
        <FilterSelect
          label={sort.label}
          options={sort.options}
          onChange={(...payload) => {
            resetSortFields()
            field.onChange(...payload)
          }}
          value={typeof field.value === 'string' ? field.value : sort.defaultValue}
        />
      )}
    />
  )
}
