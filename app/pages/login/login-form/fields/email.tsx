import { type ReactElement } from 'react'
import { Input } from '~/components/ui/input'
import { createFormField, type FormType } from '~/utils/form'
import { type SchemaType } from '../schema'

export const Email = (form: FormType<SchemaType>): ReactElement =>
  createFormField<SchemaType>({
    form,
    label: 'Email',
    name: 'email',
    render: (field) => <Input type="text" placeholder="Email" autoComplete="email" {...field} />
  })
