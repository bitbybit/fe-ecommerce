import { type ReactElement } from 'react'
import { Input } from '~/components/ui/input'
import { createFormField, type FormType } from '~/utils/form'
import { type AddressPath, type SchemaType } from '../schema'

export const PostalCode = ({
  form,
  name
}: {
  form: FormType<SchemaType>
  name: `${AddressPath}.postalCode`
}): ReactElement =>
  createFormField<SchemaType>({
    form,
    label: 'Postal code',
    name,
    render: (field) => <Input placeholder="Postal code" {...field} />
  })
