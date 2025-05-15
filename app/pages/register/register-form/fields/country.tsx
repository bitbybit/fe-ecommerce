import { type ReactElement } from 'react'
import { createFormField, type FormType } from '~/utils/form'
import { type SchemaType } from '../schema'

export const Country = (form: FormType<SchemaType>): ReactElement =>
  createFormField<SchemaType>({
    form,
    label: 'Country',
    name: 'country',
    props: { placeholder: 'Country' }
  })
