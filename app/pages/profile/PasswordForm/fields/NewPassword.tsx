import { type ReactElement } from 'react'
import { Input } from '~/components/ui/Input'
import { createFormField, type FormType } from '~/utils/form'
import { type SchemaType } from '../schema'

export const NewPassword = (form: FormType<SchemaType>): ReactElement =>
  createFormField<SchemaType>({
    form,
    label: 'New password',
    name: 'newPassword',
    render: (field) => <Input type="password" placeholder="New password" autoComplete="new-password" {...field} />
  })
