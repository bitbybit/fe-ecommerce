import { type ReactElement } from 'react'
import { Switch } from '~/components/ui/Switch'
import { Label } from '~/components/ui/Label'

export function EditableSwitch({
  value,
  onChange
}: Readonly<{ value: boolean; onChange: (value: boolean) => void }>): ReactElement {
  return (
    <div className="flex items-center gap-2 py-3">
      <Switch checked={value} onCheckedChange={onChange} id="editable-switch" />
      <Label className="space-y-0.5" htmlFor="editable-switch">
        Edit mode
      </Label>
    </div>
  )
}
