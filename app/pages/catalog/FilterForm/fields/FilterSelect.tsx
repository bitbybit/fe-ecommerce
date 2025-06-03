import { type ReactElement } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/Select'

interface FilterSelectProperties {
  label: string
  options: {
    value: string
    label: string
  }[]
  onChange: (value: string) => void
  value: string
}

export function FilterSelect(properties: FilterSelectProperties): ReactElement {
  return (
    <Select onValueChange={properties.onChange} value={properties.value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={properties.label} />
      </SelectTrigger>
      <SelectContent>
        {properties.options.map((option, index) => {
          return (
            <SelectItem key={`${option.value}-${index}`} value={option.value}>
              {option.label}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
