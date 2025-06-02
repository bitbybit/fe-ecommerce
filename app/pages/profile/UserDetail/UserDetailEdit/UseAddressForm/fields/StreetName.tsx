import { type ReactElement } from 'react'
import { Input } from '~/components/ui/Input'
import { createFormField, type FormType } from '~/utils/form'
import { type SchemaType } from '../schema'

export const StreetName = (form: FormType<SchemaType>): ReactElement =>
  createFormField<SchemaType>({
    form,
    label: 'Street name',
    name: 'streetName',
    render: (field) => <Input placeholder="Street name" {...field} />
  })
