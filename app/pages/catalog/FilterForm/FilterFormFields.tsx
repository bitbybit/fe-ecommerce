import { type ReactElement } from 'react'
import { type useForm } from 'react-hook-form'
import { type ProductListFilter } from '~/api/namespaces/product'
import { SidebarGroup, SidebarGroupLabel } from '~/components/ui/Sidebar'
import { FilterFormField } from './FilterFormField'
import { SortFormField } from './SortFormField'
import { type FormValues, sorts } from './FilterForm.utils'

type FilterFormFieldsProps = {
  filters: ProductListFilter[]
  form: ReturnType<typeof useForm<FormValues>>
}

export function FilterFormFields({ filters, form }: FilterFormFieldsProps): ReactElement {
  return (
    <>
      <SidebarGroup className="gap-3">
        <SidebarGroupLabel>Filters</SidebarGroupLabel>
        {filters.map((filter, index) => (
          <FilterFormField control={form.control} filter={filter} key={`${filter.type}-${filter.key}-${index}`} />
        ))}
      </SidebarGroup>
      <SidebarGroup className="gap-3">
        <SidebarGroupLabel>Sort</SidebarGroupLabel>
        {sorts.map((sort, index) => (
          <SortFormField sort={sort} sorts={sorts} key={`${sort.key}-${index}`} form={form} />
        ))}
      </SidebarGroup>
    </>
  )
}
