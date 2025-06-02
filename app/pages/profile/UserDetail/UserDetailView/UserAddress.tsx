import { type ReactElement } from 'react'
import { type Address } from '@commercetools/platform-sdk'
import { countries } from '~/utils/countries'
import { Badge } from '~/components/ui/Badge'
import { UserAddressField } from './UserAddressField'

export const UserAddress = (
  properties: Readonly<{ address: Address; defaultBillingAddressId: string; defaultShippingAddressId: string }>
): ReactElement => {
  const isBilling = properties.address.id === properties.defaultBillingAddressId
  const isShipping = properties.address.id === properties.defaultShippingAddressId

  return (
    <div>
      <div className="flex gap-2 pb-2">
        {isBilling && <Badge>Billing</Badge>}
        {isShipping && <Badge>Shipping</Badge>}
      </div>
      <div className="grid gap-4 md:grid-cols-2 items-start">
        <UserAddressField label="First Name" value={properties.address.firstName} />
        <UserAddressField label="Last Name" value={properties.address.lastName} />
        <UserAddressField label="Country" value={countries[properties.address.country]} />
        <UserAddressField label="City" value={properties.address.city} />
        <UserAddressField label="Street name" value={properties.address.streetName} />
        <UserAddressField label="Postal code" value={properties.address.postalCode} />
      </div>
    </div>
  )
}
