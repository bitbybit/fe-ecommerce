import { useState, type ReactElement } from 'react'
import { type UseCatalogDataResult } from '~/pages/catalog/hooks/useCatalogData'
import { type ProductListFilter } from '~/api/namespaces/product'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/Button'
import { transformFormFieldValues } from './transformFormValues'
import { FilterFormFields } from './FilterFormFields'
import { getFilterFormHandlers } from './filterFormHandlers'
import { splitValues } from './splitSortValues'
import { sort } from './fields/Sort'

export const PRODUCTS_LIMIT = 100
const KEY_INCREMENT = 1

// eslint-disable-next-line max-lines-per-function
export function FilterFormBody({
  filters,
  fetch
}: Readonly<{ filters: ProductListFilter[]; fetch: UseCatalogDataResult['fetchProducts'] }>): ReactElement {
  const { handleSubmit, setValue, getValues, reset } = useForm()
  const [formKey, setFormKey] = useState(0)
  const { setPriceRange, setAttributeValue } = getFilterFormHandlers(setValue)

  function onSubmit(): void {
    const values = getValues()
    const { sort, filter } = splitValues(values)
    console.log(sort)
    const transformedFilters = transformFormFieldValues(filter, filters)
    void fetch({ limit: PRODUCTS_LIMIT }, transformedFilters, sort)
  }

  function onReset(): void {
    reset()
    setFormKey((previous) => previous + KEY_INCREMENT)
    void fetch({ limit: PRODUCTS_LIMIT }, [])
  }
  return (
    <form
      className="w-2xs p-8 flex flex-col gap-y-[30px] shrink-0 shadow-md shadow-gray-300"
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
    >
      {filters.length > 0 &&
        filters.map((field) => (
          <FilterFormFields
            key={`${field.key}-${formKey}`}
            field={field}
            onPriceChange={setPriceRange}
            onAttributeChange={setAttributeValue}
          />
        ))}
      {[sort].map((field) => (
        <FilterFormFields field={field} onAttributeChange={setAttributeValue} />
      ))}
      <Button variant="outline">Apply</Button>
      <Button variant="outline" type="button" onClick={onReset}>
        Reset
      </Button>
    </form>
  )
}
