import { type ReactElement } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/Card'
import { UserAddress } from './UserDetailView/UserAddress'
import { UserAddressFormBody } from './UserDetailEdit/UseAddressForm/UserAddressFormBody'
import { AddUserAddressFormBody } from './UserDetailEdit/UseAddressForm/AddUserAddressFormBody'
import { useAppSelector } from '~/store/hooks'

type UserAddressesProperties = { isEdit: boolean }

export const UserAddresses = ({ isEdit }: UserAddressesProperties): ReactElement => {
  const addresses = useAppSelector((state) => state.auth.customer?.addresses ?? [])
  const defaultBillingAddressId = useAppSelector((state) => state.auth.customer?.defaultBillingAddressId ?? '')
  const defaultShippingAddressId = useAppSelector((state) => state.auth.customer?.defaultShippingAddressId ?? '')

  return (
    <>
      <Card className="w-full max-w-full">
        <CardHeader>
          <CardTitle>ADDRESSES</CardTitle>
        </CardHeader>
        <CardContent className="divide-y space-y-4">
          {addresses.map((address, index) => {
            const commonProperties = {
              address,
              defaultBillingAddressId,
              defaultShippingAddressId,
              key: address.id ?? String(index)
            }

            if (isEdit) {
              return <UserAddressFormBody {...commonProperties} />
            }

            return <UserAddress {...commonProperties} />
          })}
        </CardContent>
      </Card>
      {isEdit ? <AddUserAddressFormBody /> : ''}
    </>
  )
}
