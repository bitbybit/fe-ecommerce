import { type ReactElement } from 'react'
import { Switch } from '~/components/ui/Switch'
import { Label } from '~/components/ui/Label'

type FilterSwitchProps = {
  label: string
  onChange: (value: boolean) => void
  value: boolean
}

export function FilterSwitch(props: FilterSwitchProps): ReactElement {
  return (
    <div className="flex flex-row items-center justify-between rounded-md border p-2">
      <Label>{props.label}</Label>
      <Switch checked={props.value} onCheckedChange={props.onChange} />
    </div>
  )
}
