import { type ReactElement } from 'react'
import { Switch } from '~/components/ui/Switch'
import { Label } from '~/components/ui/Label'

interface FilterSwitchProperties {
  label: string
  onChange: (value: boolean) => void
  value: boolean
}

export function FilterSwitch(properties: FilterSwitchProperties): ReactElement {
  return (
    <div className="flex flex-row items-center justify-between rounded-md border p-2">
      <Label>{properties.label}</Label>
      <Switch checked={properties.value} onCheckedChange={properties.onChange} />
    </div>
  )
}
