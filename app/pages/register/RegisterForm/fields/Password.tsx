import { type ReactElement } from 'react'
import { Input } from '~/components/ui/Input'
import { createFormField, type FormType } from '~/utils/form'
import { type SchemaType } from '../schema'

export const Password = (form: FormType<SchemaType>): ReactElement =>
  createFormField<SchemaType>({
    form,
    label: 'Password',
    name: 'password',
    render: (field) => <Input type="password" placeholder="Password" autoComplete="new-password" {...field} />
  })
