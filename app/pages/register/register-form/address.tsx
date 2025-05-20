import { type ReactElement } from 'react'
import { H5 } from '~/components/ui/typography'
import { Country } from './fields/country'
import { City } from './fields/city'
import { StreetName } from './fields/street-name'
import { PostalCode } from './fields/postal-code'
import { type FormType } from '~/utils/form'
import { type AddressPath, type SchemaType } from './schema'

export const Address = ({
  form,
  path,
  title
}: {
  form: FormType<SchemaType>
  path: AddressPath
  title: string
}): ReactElement => {
  return (
    <>
      <H5 className="pt-4">{title}</H5>
      <div className="grid gap-4 md:grid-cols-2 items-start">
        <Country form={form} name={`${path}.country`} />
        <City form={form} name={`${path}.city`} />
        <StreetName form={form} name={`${path}.streetName`} />
        <PostalCode form={form} name={`${path}.postalCode`} />
      </div>
    </>
  )
}
