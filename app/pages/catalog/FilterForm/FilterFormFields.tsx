import type { ReactElement } from 'react'
import type { ProductListFilter } from '~/api/namespaces/product'
import { Price } from './fields/Price'
import { AttributeSwitch } from './fields/AttributeSwitch'
import { AttributeSelect } from './fields/AttributeSelect'

type FilterFormFieldsProperties = {
  field: ProductListFilter
  onPriceChange: (name: string, range: [number, number]) => void
  onSwitcherChange: (name: string, switched: string) => void
  onAttributeChange: (name: string, value: string) => void
}

export enum FilterType {
  Range = 'range',
  Boolean = 'boolean',
  Set = 'set'
}

export function FilterFormFields({
  field,
  onPriceChange,
  onSwitcherChange,
  onAttributeChange
}: FilterFormFieldsProperties): ReactElement | undefined {
  if (field.type === FilterType.Range) {
    const minPrice = +field.options[0].value
    const maxPrice = +field.options[1].value

    return <Price key={field.key} name={field.key} range={[minPrice, maxPrice]} onChange={onPriceChange} />
  }
  if (field.type === FilterType.Boolean) {
    return (
      <AttributeSwitch key={field.key} name={field.key} label={field.label} value={false} onChange={onSwitcherChange} />
    )
  }
  if (field.type === FilterType.Set) {
    return (
      <AttributeSelect
        key={field.key}
        name={field.key}
        label={field.label}
        options={field.options}
        onChange={onAttributeChange}
      />
    )
  }
}
