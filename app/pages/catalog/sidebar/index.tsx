import type { ReactElement } from 'react'
import { Price } from './Price'
import { AttributeSelect } from './Select'
import { PRODUCT_ATTRIBUTES } from './productAttributes'
import type { Filters } from './createFilterQuery'

interface SidebarProperties {
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
}

export default function Sidebar({ setFilters }: SidebarProperties): ReactElement {
  function handlePriceChange(range: [number, number]): void {
    const [min, max] = range
    setFilters((previous) => ({ ...previous, price: { min: min * 100, max: max * 100 } }))
  }

  function handleAttributeChange(name: string, value: string): void {
    setFilters((previous) => ({ ...previous, [name]: value }))
  }

  return (
    <div className="w-2xs p-5 flex flex-col gap-y-[40px] shrink-0 shadow-md shadow-gray-300">
      <Price onChange={handlePriceChange} />
      {PRODUCT_ATTRIBUTES.map(({ name, label, type }) => {
        return <AttributeSelect key={name} name={name} label={label} type={type} onChange={handleAttributeChange} />
      })}
    </div>
  )
}
