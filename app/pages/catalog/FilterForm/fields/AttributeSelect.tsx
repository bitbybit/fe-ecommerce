import { type ReactElement } from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/Select'
import { type ProductListFilter } from '~/api/namespaces/product'

interface AttributeProperties {
  name: string
  label: string
  options: ProductListFilter['options']
  onChange: (name: string, value: string) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

function getAttributeName(attributeLabel: string): string {
  switch (attributeLabel) {
    case 'Height (cm)': {
      return 'height'
    }
    case 'Width (cm)': {
      return 'width'
    }
    case 'Brand': {
      return 'brand'
    }
    case 'Material': {
      return 'material'
    }
    case 'Is Returnable': {
      return 'is-returnable'
    }
    default: {
      return 'color'
    }
  }
}

export function AttributeSelect({ name, label, options, onChange }: Readonly<AttributeProperties>): ReactElement {
  function handleSelectChange(selected: string): void {
    onChange(getAttributeName(name), selected)
  }

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[180px]">
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
