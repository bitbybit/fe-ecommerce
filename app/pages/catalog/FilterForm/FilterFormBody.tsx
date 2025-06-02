import { useState, type ReactElement } from 'react'
import { type UseCatalogDataResult } from '~/pages/catalog/hooks/useCatalogData'
import { type ProductListFilter } from '~/api/namespaces/product'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/Button'
import { transformFormFieldValues } from './transformFormValues'
import { FilterFormFields } from './FilterFormFields'
import { filterFormHandlers } from './filterFormHandlers'

export const PRODUCTS_LIMIT = 100

export function FilterFormBody({
  filters,
  fetch
}: Readonly<{ filters: ProductListFilter[]; fetch: UseCatalogDataResult['fetchProducts'] }>): ReactElement {
  const { handleSubmit, setValue, getValues, reset } = useForm()
  const [formKey, setFormKey] = useState(0)
  const { setPriceRange, setAttributeValue, setSwitcherState } = filterFormHandlers(setValue)
  function onSubmit(): void {
    const values = getValues()
    const transformedFilters = transformFormFieldValues(values, filters)
    void fetch({ limit: PRODUCTS_LIMIT }, transformedFilters)
  }
  function onReset(): void {
    reset()
    setFormKey((previous) => previous + 1)
    void fetch({ limit: PRODUCTS_LIMIT }, [])
  }
  return (
    <form
      className="w-2xs p-8 flex flex-col gap-y-[30px] shrink-0 shadow-md shadow-gray-300"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
    >
      {filters.length > 0 &&
        filters.map((field) => (
          <FilterFormFields
            key={`${field.key}-${formKey}`}
            field={field}
            onPriceChange={setPriceRange}
            onSwitcherChange={setSwitcherState}
            onAttributeChange={setAttributeValue}
          />
        ))}
      <Button variant="outline">Apply</Button>
      <Button variant="outline" type="button" onClick={onReset}>
        Reset
      </Button>
    </form>
  )
}
