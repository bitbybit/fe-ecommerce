import { type ReactElement } from 'react'
import { Input } from '~/components/ui/Input'
import { createFormField, type FormType } from '~/utils/form'
import { type SchemaType } from '../schema'

export const City = (form: FormType<SchemaType>): ReactElement =>
  createFormField<SchemaType>({
    form,
    label: 'City',
    name: 'city',
    render: (field) => <Input placeholder="City" {...field} />
  })
