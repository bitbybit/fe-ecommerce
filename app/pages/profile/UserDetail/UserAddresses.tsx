import { type ReactElement } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/Card'
import { UserAddress } from './UserDetailView/UserAddress'
import { UserAddressFormBody } from './UserDetailEdit/UseAddressForm/UserAddressFormBody'
import { useAppSelector } from '~/store/hooks'
import { AddUserAddressFormBody } from '~/pages/profile/UserDetail/UserDetailEdit/UseAddressForm/AddUserAddressFormBody'

export const UserAddresses = ({ isEdit }: { isEdit: boolean }): ReactElement => {
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
          {addresses.map((address) => {
            if (isEdit) {
              return (
                <UserAddressFormBody
                  address={address}
                  defaultBillingAddressId={defaultBillingAddressId}
                  defaultShippingAddressId={defaultShippingAddressId}
                  key={address.id}
                />
              )
            }

            return (
              <UserAddress
                address={address}
                defaultBillingAddressId={defaultBillingAddressId}
                defaultShippingAddressId={defaultShippingAddressId}
                key={address.id}
              />
            )
          })}
        </CardContent>
      </Card>
      {isEdit ? <AddUserAddressFormBody /> : ''}
    </>
  )
}
