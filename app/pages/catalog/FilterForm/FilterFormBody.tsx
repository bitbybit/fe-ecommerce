import { type ReactElement } from 'react'
import { type UseCatalogDataResult } from '~/pages/catalog/hooks/useCatalogData'
import { type ProductListFilter } from '~/api/namespaces/product'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/Button'
import { transformFormFieldValues } from './transformFormValues'
import { FilterFormFields } from './FilterFormFields'

export const PRODUCTS_LIMIT = 100

export function FilterFormBody({
  filters,
  fetch
}: Readonly<{ filters: ProductListFilter[]; fetch: UseCatalogDataResult['fetchProducts'] }>): ReactElement {
  const { handleSubmit, setValue, getValues } = useForm()
  function handlePriceChange(name: string, range: [number, number]): void {
    setValue(name, [range[0], range[1]])
  }
  function handleAttributeChange(name: string, value: string): void {
    setValue(name, value)
  }
  function handleSwitcherChange(name: string, switched: string): void {
    setValue(name, switched)
  }

  function onSubmit(): void {
    const values = getValues()
    const transformedFilters = transformFormFieldValues(values, filters)
    void fetch({ limit: PRODUCTS_LIMIT }, transformedFilters)
  }
  return (
    <form
      className="w-2xs p-8 flex flex-col gap-y-[40px] shrink-0 shadow-md shadow-gray-300"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
    >
      {filters.length > 0 &&
        filters.map((field) => (
          <FilterFormFields
            key={field.key}
            field={field}
            onPriceChange={handlePriceChange}
            onSwitcherChange={handleSwitcherChange}
            onAttributeChange={handleAttributeChange}
          />
        ))}
      <Button variant="outline">Apply</Button>
    </form>
  )
}
