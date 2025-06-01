import { type ReactElement } from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/Select'
import { type ProductListFilter } from '~/api/namespaces/product'

interface AttributeProperties {
  name: string
  label: string
  options: ProductListFilter['options']
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
        {options.map((item) => (
          <SelectItem key={item.value} value={String(item.value)}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
