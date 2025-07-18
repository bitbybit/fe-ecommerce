import { type ReactElement } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/Select'
import { countries } from '~/utils/countries'
import { createFormField, type FormType } from '~/utils/form'
import { type AddressPath, type SchemaType } from '../schema'

const countryEntries = Object.entries(countries)

export const Country = ({ form, name }: { form: FormType<SchemaType>; name: `${AddressPath}.country` }): ReactElement =>
  createFormField<SchemaType>({
    form,
    label: 'Country',
    name,
    render: (field) => (
      <Select onValueChange={field.onChange} {...field}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Country" />
        </SelectTrigger>
        <SelectContent>
          {countryEntries.map(([code, name]) => (
            <SelectItem value={code} key={code}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  })
