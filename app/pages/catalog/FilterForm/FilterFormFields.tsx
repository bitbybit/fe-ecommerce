import type { ReactElement } from 'react'
import type { ProductListFilter } from '~/api/namespaces/product'
import { Price } from './fields/Price'
import { AttributeSwitch } from './fields/AttributeSwitch'
import { AttributeSelect } from './fields/AttributeSelect'
import { type ProductListSort } from './fields/Sort'

type FilterFormFieldsProperties = {
  field: ProductListFilter | ProductListSort
  onPriceChange?: (name: string, range: [number, number]) => void
  onAttributeChange?: (name: string, value: string) => void
}

export enum FilterType {
  Range = 'range',
  Boolean = 'boolean',
  Set = 'set'
}

export function FilterFormFields({
  field,
  onPriceChange,
  onAttributeChange
}: FilterFormFieldsProperties): ReactElement | undefined {
  if ('type' in field && field.type === FilterType.Range && onPriceChange) {
    const minPrice = +field.options[0].value
    const maxPrice = +field.options[1].value

    return <Price key={field.key} name={field.key} range={[minPrice, maxPrice]} onChange={onPriceChange} />
  }
  if ('type' in field && field.type === FilterType.Boolean && onAttributeChange) {
    return (
      <AttributeSwitch
        key={field.key}
        name={field.key}
        label={field.label}
        value={false}
        onChange={onAttributeChange}
      />
    )
  }
  if (onAttributeChange) {
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
