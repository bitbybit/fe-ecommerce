/* eslint-disable max-lines-per-function */
import { type ReactElement } from 'react'
import { type UseCatalogDataResult } from '~/pages/catalog/hooks/useCatalogData'
import { type ProductListFilter } from '~/api/namespaces/product'
import { Price } from './fields/Price'
import { AttributeSelect } from './fields/AttributeSelect'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/Button'

// TODO: refactor for form builder
export function FilterFormBody({
  filters,
  fetch
}: Readonly<{ filters: ProductListFilter[]; fetch: UseCatalogDataResult['fetchProducts'] }>): ReactElement {
  const { handleSubmit, setValue, getValues } = useForm()

  function handlePriceChange(range: [number, number]): void {
    setValue('price', [range[0], range[1]])
  }
  console.log(filters, 'form')

  function handleAttributeChange(name: string, value: string): void {
    setValue(name, value)
  }

  function onSubmit(): void {
    const values = getValues()
    void fetch(values)
  }

  return (
    <form
      className="w-2xs p-5 flex flex-col gap-y-[40px] shrink-0 shadow-md shadow-gray-300"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
    >
      {filters.length > 0 &&
        filters.map((field) => {
          if (field.type === 'range') {
            return (
              <Price
                key="price"
                range={[+field.options[0].value, +field.options[1].value]}
                onChange={handlePriceChange}
              />
            )
          }
          if (field.type === 'boolean') {
            return <div key=""></div>
          }
          if (field.type === 'set' || field.type === 'number' || field.type === 'text') {
            return (
              <AttributeSelect
                key={field.label}
                name={field.label}
                label={field.label}
                options={field.options}
                onChange={handleAttributeChange}
              />
            )
          }
        })}
      <Button variant="outline">Apply</Button>
    </form>
  )
}
