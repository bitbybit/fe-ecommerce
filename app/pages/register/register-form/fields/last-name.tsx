import { type ReactElement } from 'react'
import { createFormField, type FormType } from '~/utils/form'
import { type SchemaType } from '../schema'

export const LastName = (form: FormType<SchemaType>): ReactElement =>
  createFormField<SchemaType>({
    form,
    label: 'Last Name',
    name: 'lastName',
    props: { placeholder: 'Last name' }
  })
