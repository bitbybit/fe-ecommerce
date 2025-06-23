import { type ReactElement } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/Card'
import { UserAddress } from './UserDetailView/UserAddress'
import { UserAddressFormBody } from './UserDetailEdit/UseAddressForm/UserAddressFormBody'
import { AddUserAddressFormBody } from './UserDetailEdit/UseAddressForm/AddUserAddressFormBody'
import { useAppSelector } from '~/store/hooks'

type UserAddressesProps = { isEdit: boolean }

export const UserAddresses = ({ isEdit }: UserAddressesProps): ReactElement => {
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
            const key = address.id ?? String(index)
            const commonProps = {
              address,
              defaultBillingAddressId,
              defaultShippingAddressId
            }

            if (isEdit) {
              return <UserAddressFormBody key={key} {...commonProps} />
            }

            return <UserAddress key={key} {...commonProps} />
          })}
        </CardContent>
      </Card>
      {isEdit ? <AddUserAddressFormBody /> : ''}
    </>
  )
}
