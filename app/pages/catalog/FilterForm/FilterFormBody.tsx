import { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type ProductListFilter, type ProductListCategory, PRODUCT_LIST_ITEMS_PER_PAGE } from '~/api/namespaces/product'
import { Sidebar, SidebarContent, SidebarGroup, SidebarProvider, SidebarTrigger } from '~/components/ui/Sidebar'
import { Button } from '~/components/ui/Button'
import { Categories } from './Categories'
import { FilterFormFields } from './FilterFormFields'
import { type UseCatalogDataResult } from '../hooks/useCatalogData'
import {
  sorts,
  type FormValues,
  getDefaultFormValues,
  convertFormValuesToAppliedFilters,
  convertFormValuesToSort
} from './FilterForm.utils'

type FilterFormBodyProps = {
  filters: ProductListFilter[]
  categories: ProductListCategory[]
  fetch: UseCatalogDataResult['fetchProducts']
  onApply: () => void
}

export function FilterFormBody({ filters, categories, fetch, onApply }: FilterFormBodyProps): ReactElement {
  const defaultValues = getDefaultFormValues(filters, sorts)
  const form = useForm<FormValues>({ defaultValues })

  const handleApply = (data: FormValues): Promise<void> => {
    onApply()
    return fetch(
      { limit: PRODUCT_LIST_ITEMS_PER_PAGE },
      convertFormValuesToAppliedFilters(data, filters),
      convertFormValuesToSort(data, sorts)
    )
  }

  const handleReset = (): Promise<void> => {
    form.reset(defaultValues)
    return handleApply(form.getValues())
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent className="p-4">
          <form onSubmit={(event) => void form.handleSubmit(handleApply)(event)} className="space-y-4">
            <Categories categories={categories} onClick={onApply} />
            <FilterFormFields filters={filters} form={form} />
            <SidebarGroup>
              <div className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => void handleReset()}>
                  Reset
                </Button>
                <Button type="submit">Apply</Button>
              </div>
            </SidebarGroup>
          </form>
        </SidebarContent>
      </Sidebar>
      <SidebarTrigger />
    </SidebarProvider>
  )
}
