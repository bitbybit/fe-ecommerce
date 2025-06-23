import { type ReactElement } from 'react'
import { Input } from '~/components/ui/Input'
import { createFormField, type FormType } from '~/utils/form'
import { type SchemaType } from '../schema'

export const CurrentPassword = (form: FormType<SchemaType>): ReactElement =>
  createFormField<SchemaType>({
    form,
    label: 'Current password',
    name: 'currentPassword',
    render: (field) => (
      <Input type="password" autoComplete="current-password" placeholder="Current password" {...field} />
    )
  })
