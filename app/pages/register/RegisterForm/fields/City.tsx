import { type ReactElement } from 'react'
import { Input } from '~/components/ui/Input'
import { createFormField, type FormType } from '~/utils/form'
import { type AddressPath, type SchemaType } from '../schema'

export const City = ({ form, name }: { form: FormType<SchemaType>; name: `${AddressPath}.city` }): ReactElement =>
  createFormField<SchemaType>({
    form,
    label: 'City',
    name,
    render: (field) => <Input placeholder="City" {...field} />
  })
