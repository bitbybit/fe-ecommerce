import { type ReactElement } from 'react'
import { H5 } from '~/components/ui/typography'
import { Country } from './fields/Country'
import { City } from './fields/City'
import { StreetName } from './fields/StreetName'
import { PostalCode } from './fields/PostalCode'
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
