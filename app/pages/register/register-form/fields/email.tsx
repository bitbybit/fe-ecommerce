import { type ReactElement } from 'react'
import { createFormField, type FormType } from '~/utils/form'
import { type SchemaType } from '../schema'

export const Email = (form: FormType<SchemaType>): ReactElement =>
  createFormField<SchemaType>({
    form,
    label: 'Email',
    name: 'email',
    props: { type: 'email', placeholder: 'Email', autoComplete: 'email' }
  })
