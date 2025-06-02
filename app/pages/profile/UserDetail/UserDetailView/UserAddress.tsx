import { type ReactElement } from 'react'
import { type Address } from '@commercetools/platform-sdk'
import { countries } from '~/utils/countries'
import { Label } from '~/components/ui/Label'
import { Badge } from '~/components/ui/Badge'

export const UserAddress = ({
  address,
  defaultBillingAddressId,
  defaultShippingAddressId
}: Readonly<{ address: Address; defaultBillingAddressId: string; defaultShippingAddressId: string }>): ReactElement => {
  const isBilling = address.id === defaultBillingAddressId
  const isShipping = address.id === defaultShippingAddressId

  return (
    <div>
      <div className="flex gap-2 pb-2">
        {isBilling && <Badge>Billing</Badge>}
        {isShipping && <Badge>Shipping</Badge>}
      </div>
      <div className="grid gap-4 md:grid-cols-2 items-start">
        <div className="flex flex-col gap-2">
          <Label>Country</Label>
          <div>{countries[address.country]}</div>
        </div>
        <div className="flex flex-col gap-2">
          <Label>City</Label>
          <div className="flex items-center h-9 w-full min-w-0 py-1 text-base md:text-sm">{address.city}</div>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Street name</Label>
          <div className="flex items-center h-9 w-full min-w-0 py-1 text-base md:text-sm">{address.streetName}</div>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Postal code</Label>
          <div className="flex items-center h-9 w-full min-w-0 py-1 text-base md:text-sm">{address.postalCode}</div>
        </div>
      </div>
    </div>
  )
}
