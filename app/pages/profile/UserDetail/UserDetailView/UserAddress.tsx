import { type ReactElement } from 'react'
import { type Address } from '@commercetools/platform-sdk'
import { countries } from '~/utils/countries'
import { Badge } from '~/components/ui/Badge'
import { UserAddressField } from './UserAddressField'

type UserAddressProperties = Readonly<{
  address: Address
  defaultBillingAddressId: string
  defaultShippingAddressId: string
}>

export const UserAddress = (properties: UserAddressProperties): ReactElement => {
  const isBilling = properties.address.id === properties.defaultBillingAddressId
  const isShipping = properties.address.id === properties.defaultShippingAddressId

  return (
    <div>
      <div className="flex gap-2 pb-2">
        {isBilling && <Badge>Billing</Badge>}
        {isShipping && <Badge>Shipping</Badge>}
      </div>
      <div className="grid gap-4 md:grid-cols-2 items-start">
        {[
          { label: 'First Name', value: properties.address.firstName },
          { label: 'Last Name', value: properties.address.lastName },
          { label: 'Country', value: countries[properties.address.country] },
          { label: 'City', value: properties.address.city },
          { label: 'Street name', value: properties.address.streetName },
          { label: 'Postal code', value: properties.address.postalCode }
        ].map((field) => (
          <UserAddressField label={field.label} value={field.value} key={field.label} />
        ))}
      </div>
    </div>
  )
}
