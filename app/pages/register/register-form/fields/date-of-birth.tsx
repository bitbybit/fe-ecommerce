import { type ReactElement } from 'react'
import { createFormField, type FormType } from '~/utils/form'
import { type SchemaType } from '../schema'

export const DateOfBirth = (form: FormType<SchemaType>): ReactElement =>
  createFormField<SchemaType>({
    form,
    label: 'Date of Birth',
    name: 'dateOfBirth',
    props: { placeholder: 'Date of Birth' }
  })
