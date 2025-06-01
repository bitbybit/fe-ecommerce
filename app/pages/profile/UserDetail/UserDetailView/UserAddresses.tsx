import { type ReactElement } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/Card'
import { UserAddress } from './UserAddress'
import { useAppSelector } from '~/store/hooks'

export const UserAddresses = (): ReactElement => {
  const addresses = useAppSelector((state) => state.auth.customer?.addresses ?? [])
  const defaultBillingAddressId = useAppSelector((state) => state.auth.customer?.defaultBillingAddressId ?? '')
  const defaultShippingAddressId = useAppSelector((state) => state.auth.customer?.defaultShippingAddressId ?? '')

  return (
    <Card className="w-full max-w-full">
      <CardHeader>
        <CardTitle>ADDRESSES</CardTitle>
      </CardHeader>
      <CardContent className="divide-y space-y-4">
        {addresses.map((address) => (
          <UserAddress
            address={address}
            defaultBillingAddressId={defaultBillingAddressId}
            defaultShippingAddressId={defaultShippingAddressId}
            key={address.id}
          />
        ))}
      </CardContent>
    </Card>
  )
}
