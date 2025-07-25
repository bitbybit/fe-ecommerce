import { type ReactElement } from 'react'
import { Input } from '~/components/ui/Input'
import { createFormField, type FormType } from '~/utils/form'
import { type SchemaType } from '../schema'

export const PostalCode = (form: FormType<SchemaType>): ReactElement =>
  createFormField<SchemaType>({
    form,
    label: 'Postal code',
    name: 'postalCode',
    render: (field) => <Input placeholder="Postal code" {...field} />
  })
