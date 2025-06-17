import { type ReactElement } from 'react'
import { Switch } from '~/components/ui/Switch'
import { Label } from '~/components/ui/Label'

type EditableSwitchProps = { value: boolean; onChange: (value: boolean) => void }

export function EditableSwitch({ value, onChange }: EditableSwitchProps): ReactElement {
  return (
    <div className="flex items-center gap-2 py-3">
      <Switch checked={value} onCheckedChange={onChange} id="editable-switch" />
      <Label className="space-y-0.5" htmlFor="editable-switch">
        Edit mode
      </Label>
    </div>
  )
}
