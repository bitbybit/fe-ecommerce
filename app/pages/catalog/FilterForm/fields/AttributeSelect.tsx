import { type ReactElement } from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/Select'
import { type ProductListFilter } from '~/api/namespaces/product'
import type { ProductListSort } from './Sort'

interface AttributeProperties {
  name: string
  label: string
  options: ProductListFilter['options'] | ProductListSort['options']
  onChange: (name: string, value: string) => void
}

export function AttributeSelect({ name, label, options, onChange }: Readonly<AttributeProperties>): ReactElement {
  function handleSelectChange(selected: string): void {
    onChange(name, selected)
  }
  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {options.map((item) => {
          const key = 'key' in item ? `${item.key}-${item.value}` : `${item.value}`
          return (
            <SelectItem key={key} value={key}>
              {item.label}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
