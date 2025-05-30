import type { TermFacetResult } from '@commercetools/platform-sdk'
import { useEffect, useState, type ReactElement } from 'react'
import { productApi } from '~/api/namespaces/product'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import type { AttributeProperties } from './product-attributes'

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

export function AttributeSelect({ name, label, type }: AttributeProperties): ReactElement {
  const [options, setOptions] = useState<string[]>([])

  const facetKey = type === 'set:lenum' ? `variants.attributes.${name}.key` : `variants.attributes.${name}`

  useEffect(() => {
    async function fetchOptions(): Promise<void> {
      const response = await productApi.filterProducts({ facet: facetKey })
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const facet = response.body.facets?.[facetKey] as TermFacetResult
      const terms = facet?.terms
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const values = terms.map((term) => term.term as string)
      setOptions(values)
    }
    void fetchOptions()
  }, [facetKey])

  return (
    <Select>
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
