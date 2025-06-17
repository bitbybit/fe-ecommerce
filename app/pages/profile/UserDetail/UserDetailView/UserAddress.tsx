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

export const UserAddress = (props: UserAddressProps): ReactElement => {
  const isBilling = props.address.id === props.defaultBillingAddressId
  const isShipping = props.address.id === props.defaultShippingAddressId

  return (
    <div>
      <div className="flex gap-2 pb-2">
        {isBilling && <Badge>Default billing</Badge>}
        {isShipping && <Badge>Default shipping</Badge>}
      </div>
      <div className="grid gap-4 md:grid-cols-2 items-start">
        {[
          { label: 'First Name', value: props.address.firstName },
          { label: 'Last Name', value: props.address.lastName },
          { label: 'Country', value: countries[props.address.country] },
          { label: 'City', value: props.address.city },
          { label: 'Street name', value: props.address.streetName },
          { label: 'Postal code', value: props.address.postalCode }
        ].map((field) => (
          <UserAddressField label={field.label} value={field.value} key={field.label} />
        ))}
      </div>
    </div>
  )
}
