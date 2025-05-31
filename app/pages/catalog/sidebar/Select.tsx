import type { TermFacetResult } from '@commercetools/platform-sdk'
import { useEffect, useState, type ReactElement } from 'react'
import { productApi } from '~/api/namespaces/product'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/Select'
import type { AttributeProperties } from './productAttributes'
import { formatAttributeValue } from './formatAttributeValue'

export function AttributeSelect({ name, label, type, onChange }: AttributeProperties): ReactElement {
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
