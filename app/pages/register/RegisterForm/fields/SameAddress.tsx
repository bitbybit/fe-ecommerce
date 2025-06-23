import { type ReactElement } from 'react'
import { FormControl, FormField, FormItem, FormLabel } from '~/components/ui/Form'
import { Switch } from '~/components/ui/Switch'
import { type FormType } from '~/utils/form'
import { type AddressPath, type SchemaType } from '../schema'

export const SameAddress = ({
  form,
  label,
  name
}: {
  form: FormType<SchemaType>
  label: string
  name: `${Exclude<AddressPath, 'addressMain'>}SameAsMain`
}): ReactElement => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <div className="space-y-0.5">
            <FormLabel>{label}</FormLabel>
          </div>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
        </FormItem>
      )}
    />
  )
}
