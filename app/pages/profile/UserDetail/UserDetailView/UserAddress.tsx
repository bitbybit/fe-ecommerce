import { type ReactElement } from 'react'
import { type Address } from '@commercetools/platform-sdk'
import { countries } from '~/utils/countries'
import { Badge } from '~/components/ui/Badge'
import { UserAddressField } from './UserAddressField'

type UserAddressProps = {
  address: Address
  defaultBillingAddressId: string
  defaultShippingAddressId: string
}

export const UserAddress = ({
  address,
  defaultBillingAddressId,
  defaultShippingAddressId
}: UserAddressProps): ReactElement => {
  const isBilling = address.id === defaultBillingAddressId
  const isShipping = address.id === defaultShippingAddressId

  return (
    <div>
      <div className="flex gap-2 pb-2">
        {isBilling && <Badge>Default billing</Badge>}
        {isShipping && <Badge>Default shipping</Badge>}
      </div>
      <div className="grid gap-4 md:grid-cols-2 items-start">
        {[
          { label: 'First Name', value: address.firstName },
          { label: 'Last Name', value: address.lastName },
          { label: 'Country', value: countries[address.country] },
          { label: 'City', value: address.city },
          { label: 'Street name', value: address.streetName },
          { label: 'Postal code', value: address.postalCode }
        ].map((field) => (
          <UserAddressField label={field.label} value={field.value} key={field.label} />
        ))}
      </div>
    </div>
  )
}
