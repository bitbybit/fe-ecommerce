import { type ReactElement } from 'react'
import { createFormField, type FormType } from '~/utils/form'
import { type SchemaType } from '../schema'

export const FirstName = (form: FormType<SchemaType>): ReactElement =>
  createFormField<SchemaType>({
    form,
    label: 'First Name',
    name: 'firstName',
    props: { placeholder: 'First name' }
  })
