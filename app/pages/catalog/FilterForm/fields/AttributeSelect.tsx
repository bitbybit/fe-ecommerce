import { useState, type ReactElement } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/Select'
import { type ProductListFilter } from '~/api/namespaces/product'

interface AttributeProperties {
  name: string
  label: string
  type: ProductListFilter['type']
  onChange?: (name: string, value: string) => void
}

function formatAttributeValue(attribute: string, value: string): string {
  const VALUE_FALSE = 'F'
  const VALUE_TRUE = 'T'
  if (value === VALUE_FALSE) return 'No'
  if (value === VALUE_TRUE) return 'Yes'

  if (attribute.includes('weight')) {
    return `${Number(value)} kg`
  }
  if (attribute.includes('height') || attribute.includes('width')) {
    return `${Number(value)} cm`
  }

  return value
}

// TODO: refactor for form builder
export function AttributeSelect({ name, label, onChange }: Readonly<AttributeProperties>): ReactElement {
  const [options] = useState<string[]>([])

  function handleSelectChange(selected: string): void {
    if (onChange) {
      const position = selected.indexOf('.')
      onChange(name, position === -1 ? selected : selected.slice(0, position))
    }
  }

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {options.map((item) => (
          <SelectItem key={item} value={item}>
            {formatAttributeValue(name, item)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
