import { type ReactElement } from 'react'
import { Input } from '~/components/ui/Input'
import { createFormField, type FormType } from '~/utils/form'
import { type AddressPath, type SchemaType } from '../schema'

export const StreetName = ({
  form,
  name
}: {
  form: FormType<SchemaType>
  name: `${AddressPath}.streetName`
}): ReactElement =>
  createFormField<SchemaType>({
    form,
    label: 'Street name',
    name,
    render: (field) => <Input placeholder="Street name" {...field} />
  })
