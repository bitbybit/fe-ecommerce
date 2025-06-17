import { type ReactElement } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/Select'

type FilterSelectProps = {
  label: string
  options: {
    value: string
    label: string
  }[]
  onChange: (value: string) => void
  value: string
}

export function FilterSelect(props: FilterSelectProps): ReactElement {
  return (
    <Select onValueChange={props.onChange} value={props.value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={props.label} />
      </SelectTrigger>
      <SelectContent>
        {props.options.map((option, index) => {
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
