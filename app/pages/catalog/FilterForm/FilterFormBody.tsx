import { type ReactElement } from 'react'
import { type UseCatalogDataResult } from '~/pages/catalog/hooks/useCatalogData'
import { type ProductListFilter } from '~/api/namespaces/product'
import { Price } from './fields/Price'
import { AttributeSelect } from './fields/AttributeSelect'

// TODO: refactor for form builder
export function FilterFormBody({
  filters,
  fetch
}: Readonly<{ filters: ProductListFilter[]; fetch: UseCatalogDataResult['fetchProducts'] }>): ReactElement {
  // TODO: implement
  function handlePriceChange(range: [number, number]): void {
    console.log(filters, fetch, range)
  }

  // TODO: implement
  function handleAttributeChange(name: string, value: string): void {
    console.log(filters, fetch, name, value)
  }

  return (
    <div className="w-2xs p-5 flex flex-col gap-y-[40px] shrink-0 shadow-md shadow-gray-300">
      <Price onChange={handlePriceChange} />
      {[].map(({ name, label, type }) => {
        return <AttributeSelect key={name} name={name} label={label} type={type} onChange={handleAttributeChange} />
      })}
    </div>
  )
}
