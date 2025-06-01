import { useState, type ReactElement } from 'react'
import { Switch } from '~/components/ui/Switch'

interface SwitchProperties {
  name: string
  label: string
  value: boolean
  onChange: (name: string, value: string) => void
}

const QUERY_TRUE_VALUE = 'T'
const QUERY_FALSE_VALUE = 'F'

export function AttributeSwitch({ name, label, value, onChange }: Readonly<SwitchProperties>): ReactElement {
  const [switchValue, setSwitchValue] = useState<boolean>(value)

  function handleSwitchChange(checked: boolean): void {
    setSwitchValue(checked)
    onChange(name, checked ? QUERY_TRUE_VALUE : QUERY_FALSE_VALUE)
  }

  return (
    <div className="flex flex-row items-center justify-between rounded-md border p-2">
      <div>{label}</div>
      <Switch checked={switchValue} onCheckedChange={handleSwitchChange} />
    </div>
  )
}
